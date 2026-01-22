# ⟡ UNIVERSAL DEVICE TRANSPORT PROTOCOL (UDTP) v0.1

## The Cockroach Layer

**What survives when everything else fails?**

UDTP is a transport-agnostic primitive that allows the Sovereign Mesh to communicate over *any* available physical layer — Bluetooth, WiFi, IR, ultrasonic, LoRa, even visual codes. When one transport dies, messages route over another. When all transports die, messages wait.

---

## △ The Problem

| Today's Internet | The Gap |
|------------------|---------|
| Assumes always-on connectivity | Falls apart when offline |
| Single transport (TCP/IP) | No graceful degradation |
| Centralized DNS/routing | Single points of failure |
| Identity tied to accounts | Platform-dependent |
| Messages are ephemeral | Lost if not delivered instantly |

**UDTP inverts these assumptions:**
- Connection is opportunistic, not guaranteed
- Messages are patient, not urgent
- Identity travels with the user
- Any physical layer will do

---

## ⧉ Core Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         APPLICATION LAYER                        │
│           (Sovereign Mesh, MirrorDNA, User Apps)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                     ┌───────────────────┐                        │
│                     │   UDTP ROUTER     │                        │
│                     │   (Path Selection │                        │
│                     │    + Queue Mgmt)  │                        │
│                     └─────────┬─────────┘                        │
│                               │                                  │
│            ┌──────────────────┼──────────────────┐               │
│            │                  │                  │               │
│     ┌──────▼──────┐   ┌───────▼───────┐  ┌──────▼──────┐        │
│     │  ADAPTERS   │   │   ADAPTERS    │  │  ADAPTERS   │        │
│     │  (Radio)    │   │   (Optical)   │  │  (Acoustic) │        │
│     └──────┬──────┘   └───────┬───────┘  └──────┬──────┘        │
│            │                  │                  │               │
├────────────┼──────────────────┼──────────────────┼───────────────┤
│     ┌──────▼──────┐   ┌───────▼───────┐  ┌──────▼──────┐        │
│     │ BLE / WiFi  │   │    IR / QR    │  │  Ultrasonic │        │
│     │   / LoRa    │   │  / Barcodes   │  │   / Audio   │        │
│     └─────────────┘   └───────────────┘  └─────────────┘        │
│                        PHYSICAL LAYER                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## ◈ The UDTP Envelope

Every message in UDTP is wrapped in a universal envelope that's transport-independent:

```
┌─────────────────────────────────────────────────────────────────┐
│                      UDTP ENVELOPE v1                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  HEADER (64 bytes)                                               │
│  ├── version        : u8          (protocol version)            │
│  ├── flags          : u8          (priority, encrypted, etc)    │
│  ├── ttl            : u32         (seconds until expiry)        │
│  ├── hop_count      : u8          (max hops remaining)          │
│  ├── message_id     : u128        (unique across mesh)          │
│  ├── created_at     : u64         (unix timestamp ms)           │
│  ├── payload_length : u32         (bytes)                       │
│  └── checksum       : u32         (CRC32 of header)             │
│                                                                  │
│  ROUTING (variable)                                              │
│  ├── sender_id      : 32 bytes    (Ed25519 public key)          │
│  ├── recipient_id   : 32 bytes    (Ed25519 public key or "any") │
│  ├── via_nodes      : [32 bytes]  (optional relay hints)        │
│  └── delivery_proof : optional    (for acknowledgments)         │
│                                                                  │
│  PAYLOAD (variable)                                              │
│  ├── content_type   : u16         (message type enum)           │
│  ├── content        : bytes       (encrypted if flag set)       │
│  └── signature      : 64 bytes    (Ed25519 over all above)      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Envelope Properties

| Field | Purpose |
|-------|---------|
| `ttl` | Messages expire — prevents eternal circulation |
| `hop_count` | Prevents routing loops |
| `message_id` | Deduplication across transports |
| `sender_id` | Cryptographic identity, not account |
| `recipient_id` | Can be specific node or "any" for broadcast |

---

## ⧉ Transport Adapters

Each physical transport implements the same interface:

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional, AsyncIterator
from enum import Enum

class TransportState(Enum):
    UNAVAILABLE = "unavailable"  # Hardware not present
    DISABLED = "disabled"        # Present but off
    SCANNING = "scanning"        # Looking for peers
    CONNECTED = "connected"      # Active peer connections
    ERROR = "error"              # Failure state

@dataclass
class TransportCapability:
    """What can this transport do?"""
    max_payload_bytes: int       # Single transmission limit
    typical_latency_ms: int      # Expected delay
    range_meters: int            # Approximate range
    power_draw_mw: int           # Battery impact
    bidirectional: bool          # Can receive as well as send?
    broadcast_capable: bool      # Can send to multiple peers?
    requires_pairing: bool       # Needs handshake first?

@dataclass  
class Peer:
    """A node we can communicate with."""
    node_id: bytes               # 32-byte Ed25519 public key
    address: str                 # Transport-specific address
    rssi: Optional[int]          # Signal strength if available
    last_seen: float             # Unix timestamp
    transports: list[str]        # Which transports reach this peer

class TransportAdapter(ABC):
    """Abstract interface for all physical transports."""
    
    name: str                    # "ble", "wifi_direct", "ultrasonic", etc.
    capability: TransportCapability
    
    @abstractmethod
    async def get_state(self) -> TransportState:
        """Current transport state."""
        pass
    
    @abstractmethod
    async def enable(self) -> bool:
        """Activate this transport. Returns success."""
        pass
    
    @abstractmethod
    async def disable(self) -> None:
        """Deactivate this transport."""
        pass
    
    @abstractmethod
    async def discover_peers(self, timeout_ms: int = 5000) -> list[Peer]:
        """Find nearby nodes using this transport."""
        pass
    
    @abstractmethod
    async def send(self, peer: Peer, envelope: bytes) -> bool:
        """
        Send envelope to specific peer.
        Returns True if peer acknowledged receipt.
        """
        pass
    
    @abstractmethod
    async def broadcast(self, envelope: bytes) -> int:
        """
        Broadcast envelope to all nearby peers.
        Returns number of peers that received.
        """
        pass
    
    @abstractmethod
    def receive_stream(self) -> AsyncIterator[tuple[Peer, bytes]]:
        """Async generator yielding (sender, envelope) pairs."""
        pass
```

### Adapter Implementations

| Adapter | Payload | Latency | Range | Power | Notes |
|---------|---------|---------|-------|-------|-------|
| **BLE Mesh** | 512 B | 50ms | 100m | Low | Most ubiquitous |
| **WiFi Direct** | 64 KB | 10ms | 200m | Medium | Fast, but pair required |
| **LoRa** | 256 B | 500ms | 15km | Very Low | Off-grid king |
| **Ultrasonic** | 64 B | 200ms | 5m | Low | Works through walls |
| **QR Stream** | 2 KB | 1000ms | 10m | Zero | Camera-to-screen |
| **IR Burst** | 256 B | 50ms | 5m | Very Low | Line-of-sight |
| **NFC Tap** | 4 KB | 10ms | 4cm | Micro | Physical proximity required |

---

## ⧉ The Router

The UDTP Router makes intelligent decisions about which transport to use:

```python
from dataclasses import dataclass, field
from typing import Optional
from collections import deque
import asyncio
import time

@dataclass
class QueuedMessage:
    """A message waiting for delivery."""
    envelope: bytes
    recipient_id: bytes
    priority: int                # 0 = low, 255 = urgent
    created_at: float
    ttl_seconds: int
    attempts: int = 0
    last_attempt: float = 0
    preferred_transport: Optional[str] = None

@dataclass
class DeliveryResult:
    success: bool
    transport_used: Optional[str]
    latency_ms: int
    hops: int

class UDTPRouter:
    """Routes messages across available transports."""
    
    def __init__(self, node_id: bytes, adapters: list[TransportAdapter]):
        self.node_id = node_id
        self.adapters = {a.name: a for a in adapters}
        self.queue: deque[QueuedMessage] = deque(maxlen=10000)
        self.seen_ids: set[bytes] = set()  # Deduplication
        self.peer_cache: dict[bytes, list[tuple[str, Peer]]] = {}
        self.running = False
    
    async def send(
        self, 
        recipient_id: bytes, 
        payload: bytes,
        encrypted: bool = True,
        priority: int = 128,
        ttl_seconds: int = 86400  # 24 hours default
    ) -> str:
        """
        Queue a message for delivery.
        Returns message_id for tracking.
        """
        envelope = self._build_envelope(
            recipient_id=recipient_id,
            payload=payload,
            encrypted=encrypted,
            ttl_seconds=ttl_seconds
        )
        
        message = QueuedMessage(
            envelope=envelope,
            recipient_id=recipient_id,
            priority=priority,
            created_at=time.time(),
            ttl_seconds=ttl_seconds
        )
        
        self.queue.append(message)
        return envelope[16:32].hex()  # message_id from header
    
    async def _delivery_loop(self):
        """Main loop: attempt delivery of queued messages."""
        while self.running:
            # Sort by priority (high first) then age (old first)
            pending = sorted(
                self.queue,
                key=lambda m: (-m.priority, m.created_at)
            )
            
            for msg in pending:
                if self._is_expired(msg):
                    self.queue.remove(msg)
                    continue
                
                result = await self._attempt_delivery(msg)
                if result.success:
                    self.queue.remove(msg)
                else:
                    msg.attempts += 1
                    msg.last_attempt = time.time()
            
            await asyncio.sleep(1)  # Check every second
    
    async def _attempt_delivery(self, msg: QueuedMessage) -> DeliveryResult:
        """Try to deliver via best available transport."""
        
        # Find transports that can reach recipient
        viable = await self._find_routes(msg.recipient_id)
        
        if not viable:
            # No direct route — try broadcast/gossip
            return await self._gossip_route(msg)
        
        # Sort by: battery state, signal strength, latency
        ranked = self._rank_transports(viable, msg)
        
        for transport_name, peer in ranked:
            adapter = self.adapters[transport_name]
            start = time.time()
            
            success = await adapter.send(peer, msg.envelope)
            
            if success:
                return DeliveryResult(
                    success=True,
                    transport_used=transport_name,
                    latency_ms=int((time.time() - start) * 1000),
                    hops=1
                )
        
        return DeliveryResult(success=False, transport_used=None, latency_ms=0, hops=0)
    
    def _rank_transports(
        self, 
        routes: list[tuple[str, Peer]], 
        msg: QueuedMessage
    ) -> list[tuple[str, Peer]]:
        """Rank routes by efficiency."""
        
        def score(route: tuple[str, Peer]) -> float:
            transport_name, peer = route
            cap = self.adapters[transport_name].capability
            
            # Prefer:
            # - Low latency for urgent messages
            # - Low power when battery is low
            # - High throughput for large payloads
            
            latency_score = 1000 / max(cap.typical_latency_ms, 1)
            power_score = 100 / max(cap.power_draw_mw, 1)
            signal_score = (peer.rssi or -100) + 100  # Normalize RSSI
            
            # Weight by priority
            if msg.priority > 200:
                return latency_score * 2 + signal_score
            else:
                return power_score * 2 + signal_score
        
        return sorted(routes, key=score, reverse=True)
    
    async def _gossip_route(self, msg: QueuedMessage) -> DeliveryResult:
        """No direct route — broadcast and hope for relay."""
        
        # Decrement hop count
        envelope = self._decrement_hops(msg.envelope)
        if envelope is None:
            return DeliveryResult(success=False, transport_used=None, latency_ms=0, hops=0)
        
        # Broadcast on all capable transports
        total_reached = 0
        for adapter in self.adapters.values():
            if adapter.capability.broadcast_capable:
                reached = await adapter.broadcast(envelope)
                total_reached += reached
        
        # Consider "success" if anyone heard it
        return DeliveryResult(
            success=total_reached > 0,
            transport_used="gossip",
            latency_ms=0,
            hops=-1  # Unknown
        )
```

---

## ⧉ Store-and-Forward

The killer feature: **messages are patient**.

```python
class PersistentQueue:
    """Messages survive device restarts."""
    
    def __init__(self, db_path: str):
        self.db = sqlite3.connect(db_path)
        self._init_schema()
    
    def _init_schema(self):
        self.db.execute("""
            CREATE TABLE IF NOT EXISTS pending_messages (
                message_id BLOB PRIMARY KEY,
                envelope BLOB NOT NULL,
                recipient_id BLOB NOT NULL,
                priority INTEGER DEFAULT 128,
                created_at REAL NOT NULL,
                ttl_seconds INTEGER NOT NULL,
                attempts INTEGER DEFAULT 0,
                last_attempt REAL,
                preferred_transport TEXT
            )
        """)
        
        self.db.execute("""
            CREATE TABLE IF NOT EXISTS delivered_messages (
                message_id BLOB PRIMARY KEY,
                delivered_at REAL NOT NULL,
                transport_used TEXT,
                hops INTEGER
            )
        """)
        
        # Index for efficient expiry checks
        self.db.execute("""
            CREATE INDEX IF NOT EXISTS idx_expiry 
            ON pending_messages (created_at, ttl_seconds)
        """)
    
    def enqueue(self, msg: QueuedMessage) -> None:
        """Persist a message."""
        self.db.execute("""
            INSERT OR REPLACE INTO pending_messages
            (message_id, envelope, recipient_id, priority, 
             created_at, ttl_seconds, attempts, preferred_transport)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            msg.envelope[16:32],  # message_id from header
            msg.envelope,
            msg.recipient_id,
            msg.priority,
            msg.created_at,
            msg.ttl_seconds,
            msg.attempts,
            msg.preferred_transport
        ))
        self.db.commit()
    
    def mark_delivered(self, message_id: bytes, transport: str, hops: int) -> None:
        """Move from pending to delivered."""
        self.db.execute("""
            INSERT INTO delivered_messages 
            (message_id, delivered_at, transport_used, hops)
            SELECT message_id, ?, ?, ?
            FROM pending_messages WHERE message_id = ?
        """, (time.time(), transport, hops, message_id))
        
        self.db.execute("DELETE FROM pending_messages WHERE message_id = ?", (message_id,))
        self.db.commit()
    
    def get_pending(self, limit: int = 100) -> list[QueuedMessage]:
        """Retrieve messages to attempt delivery."""
        now = time.time()
        
        cursor = self.db.execute("""
            SELECT envelope, recipient_id, priority, created_at, 
                   ttl_seconds, attempts, last_attempt, preferred_transport
            FROM pending_messages
            WHERE created_at + ttl_seconds > ?
            ORDER BY priority DESC, created_at ASC
            LIMIT ?
        """, (now, limit))
        
        return [
            QueuedMessage(
                envelope=row[0],
                recipient_id=row[1],
                priority=row[2],
                created_at=row[3],
                ttl_seconds=row[4],
                attempts=row[5],
                last_attempt=row[6] or 0,
                preferred_transport=row[7]
            )
            for row in cursor.fetchall()
        ]
    
    def purge_expired(self) -> int:
        """Remove expired messages. Returns count removed."""
        now = time.time()
        cursor = self.db.execute("""
            DELETE FROM pending_messages
            WHERE created_at + ttl_seconds < ?
        """, (now,))
        self.db.commit()
        return cursor.rowcount
```

---

## ⧉ Opportunistic Sync

When devices come into proximity, they sync:

```python
class OpportunisticSync:
    """Sync state when devices are nearby."""
    
    def __init__(self, router: UDTPRouter, queue: PersistentQueue):
        self.router = router
        self.queue = queue
    
    async def on_peer_discovered(self, peer: Peer):
        """Called when a new peer is detected."""
        
        # 1. Check if we have messages for this peer
        for msg in self.queue.get_pending():
            if msg.recipient_id == peer.node_id:
                # Direct delivery opportunity!
                await self._deliver_direct(msg, peer)
        
        # 2. Exchange routing tables
        await self._exchange_routes(peer)
        
        # 3. Relay any gossip messages they might need
        await self._relay_gossip(peer)
    
    async def _deliver_direct(self, msg: QueuedMessage, peer: Peer):
        """We found the recipient! Deliver immediately."""
        
        for transport_name in peer.transports:
            adapter = self.router.adapters.get(transport_name)
            if adapter:
                success = await adapter.send(peer, msg.envelope)
                if success:
                    message_id = msg.envelope[16:32]
                    self.queue.mark_delivered(
                        message_id, 
                        transport_name, 
                        hops=1
                    )
                    return
    
    async def _exchange_routes(self, peer: Peer):
        """Share knowledge of reachable nodes."""
        
        # Build our routing table summary
        our_routes = {
            node_id.hex(): [t for t, _ in transports]
            for node_id, transports in self.router.peer_cache.items()
        }
        
        # Send to peer
        route_envelope = self._build_control_envelope(
            type="route_update",
            payload=json.dumps(our_routes).encode()
        )
        
        for transport in peer.transports:
            adapter = self.router.adapters.get(transport)
            if adapter:
                await adapter.send(peer, route_envelope)
                break
    
    async def _relay_gossip(self, peer: Peer):
        """Check if peer can relay any of our pending gossip."""
        
        for msg in self.queue.get_pending():
            # If this is a gossip message AND peer might know recipient
            if msg.preferred_transport == "gossip":
                # Ask peer if they know the recipient
                query = self._build_control_envelope(
                    type="route_query",
                    payload=msg.recipient_id
                )
                # ... handle response ...
```

---

## ◈ Special Transports

### Ultrasonic (GGWAVE-based)

Data over sound — works even when WiFi/BLE are jammed:

```python
class UltrasonicAdapter(TransportAdapter):
    """Send data via inaudible sound waves."""
    
    name = "ultrasonic"
    capability = TransportCapability(
        max_payload_bytes=64,
        typical_latency_ms=200,
        range_meters=5,
        power_draw_mw=50,
        bidirectional=True,
        broadcast_capable=True,
        requires_pairing=False
    )
    
    def __init__(self):
        self.ggwave = ggwave.init()  # GGWAVE library
        self.audio = AudioInterface()
    
    async def send(self, peer: Peer, envelope: bytes) -> bool:
        """Encode data as ultrasonic audio and play."""
        
        # Compress envelope for limited bandwidth
        compressed = zlib.compress(envelope)
        
        if len(compressed) > self.capability.max_payload_bytes:
            # Split into chunks, add sequence numbers
            chunks = self._chunk(compressed, 60)
            for i, chunk in enumerate(chunks):
                header = bytes([i, len(chunks)])
                payload = header + chunk
                waveform = ggwave.encode(self.ggwave, payload)
                await self.audio.play(waveform)
                await asyncio.sleep(0.3)  # Gap between chunks
        else:
            waveform = ggwave.encode(self.ggwave, compressed)
            await self.audio.play(waveform)
        
        return True  # No ACK in broadcast mode
```

### QR Stream (Visual)

For air-gapped transfer:

```python
class QRStreamAdapter(TransportAdapter):
    """Transfer data via animated QR codes."""
    
    name = "qr_stream"
    capability = TransportCapability(
        max_payload_bytes=2048,
        typical_latency_ms=1000,
        range_meters=10,
        power_draw_mw=0,  # Uses screen backlight only
        bidirectional=False,  # Display only
        broadcast_capable=True,
        requires_pairing=False
    )
    
    async def broadcast(self, envelope: bytes) -> int:
        """Display envelope as animated QR sequence."""
        
        compressed = zlib.compress(envelope)
        
        # Split into QR-sized chunks (< 512 bytes each)
        chunks = self._chunk(compressed, 500)
        
        for i, chunk in enumerate(chunks):
            # Header: chunk index, total chunks, checksum
            header = struct.pack('>BBH', i, len(chunks), crc16(chunk))
            qr_data = header + chunk
            
            qr = qrcode.make(qr_data)
            self.display.show(qr)
            
            await asyncio.sleep(0.5)  # Half-second per frame
        
        return 1  # Assume someone might be watching
```

---

## ⧉ Security

### Identity

Every node has an Ed25519 keypair:

```python
from nacl.signing import SigningKey, VerifyKey
from nacl.public import PrivateKey, PublicKey, Box
from nacl.encoding import Base64Encoder

class UDTPIdentity:
    """Cryptographic identity for a UDTP node."""
    
    def __init__(self, seed: Optional[bytes] = None):
        if seed:
            self.signing_key = SigningKey(seed)
        else:
            self.signing_key = SigningKey.generate()
        
        self.verify_key = self.signing_key.verify_key
        self.node_id = bytes(self.verify_key)
        
        # Derive encryption keypair from signing key
        private_bytes = self.signing_key.encode()
        self.encryption_key = PrivateKey(hashlib.sha256(private_bytes).digest())
        self.encryption_public = self.encryption_key.public_key
    
    def sign(self, message: bytes) -> bytes:
        """Sign a message."""
        return self.signing_key.sign(message).signature
    
    def encrypt_for(self, recipient_public: bytes, plaintext: bytes) -> bytes:
        """Encrypt payload for specific recipient."""
        recipient_key = PublicKey(recipient_public)
        box = Box(self.encryption_key, recipient_key)
        return box.encrypt(plaintext)
    
    def decrypt_from(self, sender_public: bytes, ciphertext: bytes) -> bytes:
        """Decrypt payload from specific sender."""
        sender_key = PublicKey(sender_public)
        box = Box(self.encryption_key, sender_key)
        return box.decrypt(ciphertext)
```

### Envelope Signing

Every envelope is signed by the sender:

```python
def build_envelope(
    identity: UDTPIdentity,
    recipient_id: bytes,
    payload: bytes,
    encrypted: bool = True,
    ttl_seconds: int = 86400
) -> bytes:
    """Construct a signed UDTP envelope."""
    
    # Encrypt payload if required
    if encrypted and recipient_id != b'\x00' * 32:  # Not broadcast
        payload = identity.encrypt_for(recipient_id, payload)
    
    # Build header
    header = struct.pack(
        '>BBIBQ16sI',
        1,                          # version
        0x01 if encrypted else 0,   # flags
        ttl_seconds,                # ttl
        8,                          # max hops
        uuid.uuid4().bytes,         # message_id (16 bytes)
        int(time.time() * 1000),    # created_at
        len(payload)                # payload_length
    )
    header += struct.pack('>I', crc32(header))  # checksum
    
    # Build routing
    routing = identity.node_id + recipient_id
    
    # Build full envelope (minus signature)
    envelope_unsigned = header + routing + payload
    
    # Sign
    signature = identity.sign(envelope_unsigned)
    
    return envelope_unsigned + signature

def verify_envelope(envelope: bytes) -> tuple[bool, bytes, bytes]:
    """
    Verify envelope signature.
    Returns (valid, sender_id, payload) or (False, None, None).
    """
    
    # Parse header
    header = envelope[:64]
    version, flags, ttl, hops, message_id, created_at, payload_len = struct.unpack(
        '>BBIBQ16sI', header[:48]
    )
    
    # Verify header checksum
    stored_crc = struct.unpack('>I', header[48:52])[0]
    if crc32(header[:48]) != stored_crc:
        return (False, None, None)
    
    # Parse routing
    sender_id = envelope[64:96]
    recipient_id = envelope[96:128]
    
    # Extract payload and signature
    payload = envelope[128:128 + payload_len]
    signature = envelope[128 + payload_len:]
    
    if len(signature) != 64:
        return (False, None, None)
    
    # Verify signature
    envelope_unsigned = envelope[:-64]
    try:
        verify_key = VerifyKey(sender_id)
        verify_key.verify(envelope_unsigned, signature)
        return (True, sender_id, payload)
    except:
        return (False, None, None)
```

---

## ⧉ 2050 Properties

This protocol is designed to survive:

| Threat | UDTP Defense |
|--------|--------------|
| **Internet shutdown** | Routes over BLE/LoRa/ultrasonic |
| **DNS collapse** | No DNS — identity is public key |
| **Cell network failure** | Mesh routing, store-and-forward |
| **Device seizure** | Messages encrypted at rest |
| **Surveillance** | Onion-layered routing possible |
| **Quantum computers** | Upgrade path to post-quantum sigs |
| **EMP** | LoRa devices with minimal electronics |
| **Platform bans** | No central platform — just nodes |

---

## 📐 Implementation Roadmap

### Phase 1: Core (Q1 2026)
- [ ] UDTP envelope format
- [ ] BLE Mesh adapter
- [ ] WiFi Direct adapter
- [ ] Basic router with store-and-forward
- [ ] SQLite-backed persistent queue

### Phase 2: Diverse Transports (Q2 2026)
- [ ] Ultrasonic adapter (GGWAVE)
- [ ] QR stream adapter
- [ ] LoRa adapter (Meshtastic integration)
- [ ] NFC adapter

### Phase 3: Smart Routing (Q3 2026)
- [ ] Multi-hop gossip protocol
- [ ] Routing table exchange
- [ ] Quality-of-service hints
- [ ] Power-aware transport selection

### Phase 4: Mesh Integration (Q4 2026)
- [ ] Sovereign Mesh identity binding
- [ ] Proof-of-Memory attestation for messages
- [ ] Onion routing for privacy
- [ ] Cross-mesh gateway protocol

---

## ⟡ Why This Matters

2050 might look like:
- Internet fragmented by borders
- Cell networks unreliable or surveilled
- Platforms come and go
- But **people still need to communicate**

UDTP is the cockroach layer — the primitive that survives everything.

Your message will get there. Eventually. Over whatever works.

---

⟡ MirrorDNA Standard | UDTP Protocol v0.1
Author: Paul Desai | N1 Intelligence  
License: CC-BY-ND 4.0 (Spec) | MIT (Reference Implementation)
