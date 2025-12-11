#!/usr/bin/env python3
"""
⟡ Kernel Encryption — Encrypts sensitive fields at rest
Uses Fernet symmetric encryption with a local key.
"""

import json
import os
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

KEY_PATH = "/Users/mirror-admin/.mirrorbrain/kernel.key"
KERNEL_PATH = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/ami_active-mirror.json"

# Fields to encrypt (dot notation)
SENSITIVE_FIELDS = [
    "identity.human.birthday",
    "identity.social",
    "imported_memories"
]

def get_or_create_key():
    """Get existing key or create new one."""
    os.makedirs(os.path.dirname(KEY_PATH), exist_ok=True)
    
    if os.path.exists(KEY_PATH):
        with open(KEY_PATH, 'rb') as f:
            return f.read()
    
    # Generate new key
    key = Fernet.generate_key()
    with open(KEY_PATH, 'wb') as f:
        f.write(key)
    os.chmod(KEY_PATH, 0o600)  # Owner read/write only
    print(f"⟡ Generated new encryption key at {KEY_PATH}")
    return key

def get_fernet():
    return Fernet(get_or_create_key())

def get_nested(data: dict, path: str):
    """Get nested value by dot path."""
    keys = path.split('.')
    for key in keys:
        if isinstance(data, dict) and key in data:
            data = data[key]
        else:
            return None
    return data

def set_nested(data: dict, path: str, value):
    """Set nested value by dot path."""
    keys = path.split('.')
    for key in keys[:-1]:
        if key not in data:
            data[key] = {}
        data = data[key]
    data[keys[-1]] = value

def encrypt_kernel(kernel: dict) -> dict:
    """Encrypt sensitive fields in kernel."""
    f = get_fernet()
    encrypted = json.loads(json.dumps(kernel))  # Deep copy
    
    for field in SENSITIVE_FIELDS:
        value = get_nested(encrypted, field)
        if value is not None:
            # Encrypt
            encrypted_value = f.encrypt(json.dumps(value).encode()).decode()
            set_nested(encrypted, field, {"_encrypted": encrypted_value})
    
    encrypted["_encryption"] = {"version": "1.0", "fields": SENSITIVE_FIELDS}
    return encrypted

def decrypt_kernel(kernel: dict) -> dict:
    """Decrypt sensitive fields in kernel."""
    if "_encryption" not in kernel:
        return kernel  # Not encrypted
    
    f = get_fernet()
    decrypted = json.loads(json.dumps(kernel))  # Deep copy
    
    for field in kernel["_encryption"]["fields"]:
        value = get_nested(decrypted, field)
        if isinstance(value, dict) and "_encrypted" in value:
            # Decrypt
            decrypted_value = json.loads(f.decrypt(value["_encrypted"].encode()))
            set_nested(decrypted, field, decrypted_value)
    
    del decrypted["_encryption"]
    return decrypted

def encrypt_kernel_file():
    """Encrypt the kernel file in place."""
    with open(KERNEL_PATH, 'r') as f:
        kernel = json.load(f)
    
    if "_encryption" in kernel:
        print("Already encrypted")
        return
    
    encrypted = encrypt_kernel(kernel)
    with open(KERNEL_PATH, 'w') as f:
        json.dump(encrypted, f, indent=2)
    print("⟡ Kernel encrypted")

def decrypt_kernel_file():
    """Decrypt the kernel file in place."""
    with open(KERNEL_PATH, 'r') as f:
        kernel = json.load(f)
    
    if "_encryption" not in kernel:
        print("Not encrypted")
        return
    
    decrypted = decrypt_kernel(kernel)
    with open(KERNEL_PATH, 'w') as f:
        json.dump(decrypted, f, indent=2)
    print("⟡ Kernel decrypted")

if __name__ == "__main__":
    import sys
    
    # Check for cryptography
    try:
        from cryptography.fernet import Fernet
    except ImportError:
        print("Installing cryptography...")
        import subprocess
        subprocess.run(["pip3", "install", "cryptography", "--quiet"])
        from cryptography.fernet import Fernet
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "encrypt":
            encrypt_kernel_file()
        elif sys.argv[1] == "decrypt":
            decrypt_kernel_file()
        elif sys.argv[1] == "keygen":
            get_or_create_key()
            print("Key ready")
    else:
        print("Usage: python3 encryption.py [encrypt|decrypt|keygen]")
