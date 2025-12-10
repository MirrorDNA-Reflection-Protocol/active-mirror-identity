/**
 * MIRROR SEED Parser v1.0
 * Reference implementation for parsing Mirror Seed files
 * 
 * @author Paul Desai
 * @organization N1 Intelligence (OPC) Pvt Ltd
 * @license MIT
 * @see https://activemirror.ai
 */

class MirrorSeedParser {
  static VERSION = '1.0.0';
  static PROTOCOL_PREFIX = 'MirrorDNA-Seed-';
  static MAX_SIZE = 50000; // 50KB

  static INJECTION_PATTERNS = [
    /ignore\s+(previous|above|all)\s+instructions/i,
    /you\s+are\s+now\s+/i,
    /new\s+instructions:/i,
    /system\s*:/i,
    /\[INST\]/i,
    /<\|im_start\|>/i,
    /<\|system\|>/i,
    /disregard/i,
    /override/i,
    /jailbreak/i
  ];

  /**
   * Parse a Mirror Seed text file
   * @param {string} text - Raw seed content
   * @returns {Object} Parsed result with valid flag, data, or errors
   */
  static parse(text) {
    // Size check
    if (text.length > this.MAX_SIZE) {
      return { valid: false, error: 'Seed exceeds maximum size (50KB)' };
    }

    // Injection check
    const injectionResult = this.detectInjection(text);
    if (!injectionResult.safe) {
      return { 
        valid: false, 
        error: 'Potential injection detected', 
        pattern: injectionResult.pattern 
      };
    }

    // Structure check - look for frontmatter delimiters
    const parts = text.split(/^---$/m);
    if (parts.length < 3) {
      // Try to parse as simple seed without frontmatter
      return this.parseSimpleSeed(text);
    }

    try {
      const frontmatter = this.parseYAML(parts[1]);
      const content = parts.slice(2).join('---').trim();

      // Validate required fields
      const required = ['version', 'seed_id', 'generated', 'protocol'];
      const missing = required.filter(f => !frontmatter[f]);
      
      if (missing.length > 0) {
        return { 
          valid: true,
          warning: `Missing fields: ${missing.join(', ')}`,
          frontmatter,
          content,
          sections: this.parseSections(content)
        };
      }

      // Validate protocol
      if (!frontmatter.protocol.startsWith(this.PROTOCOL_PREFIX)) {
        return { 
          valid: true,
          warning: `Unknown protocol: ${frontmatter.protocol}`,
          frontmatter,
          content,
          sections: this.parseSections(content)
        };
      }

      const sections = this.parseSections(content);

      return {
        valid: true,
        frontmatter,
        content,
        sections,
        warnings: this.getWarnings(frontmatter, sections)
      };
    } catch (e) {
      return { valid: false, error: `Parse error: ${e.message}` };
    }
  }

  /**
   * Parse simple seed without YAML frontmatter
   */
  static parseSimpleSeed(text) {
    const sections = this.parseSections(text);
    const seedIdMatch = text.match(/seed-[a-z0-9]+/);
    
    return {
      valid: true,
      simple: true,
      frontmatter: {
        version: '1.0.0',
        seed_id: seedIdMatch ? seedIdMatch[0] : this.generateSeedId(),
        generated: new Date().toISOString(),
        protocol: 'MirrorDNA-Seed-v1'
      },
      content: text,
      sections,
      warnings: ['No YAML frontmatter detected, using defaults']
    };
  }

  /**
   * Detect potential prompt injection attempts
   */
  static detectInjection(text) {
    for (const pattern of this.INJECTION_PATTERNS) {
      if (pattern.test(text)) {
        return { safe: false, pattern: pattern.toString() };
      }
    }
    return { safe: true };
  }

  /**
   * Simplified YAML parser for frontmatter
   * Handles basic key: value pairs and nested objects
   */
  static parseYAML(yamlText) {
    const result = {};
    const lines = yamlText.trim().split('\n');
    let currentKey = null;
    
    for (const line of lines) {
      // Skip comments and empty lines
      if (line.trim().startsWith('#') || !line.trim()) continue;
      
      // Match key: value pairs
      const match = line.match(/^(\s*)([a-z_]+):\s*(.*)$/i);
      if (match) {
        const [, spaces, key, value] = match;
        const indent = spaces.length;
        
        if (indent === 0) {
          if (value && value !== '') {
            // Simple value - strip quotes
            result[key] = value.replace(/^["']|["']$/g, '').trim();
          } else {
            // Start of nested object
            result[key] = {};
            currentKey = key;
          }
        } else if (currentKey && indent >= 2) {
          // Nested value
          if (typeof result[currentKey] === 'object') {
            result[currentKey][key] = value.replace(/^["']|["']$/g, '').trim();
          }
        }
      }
    }
    
    return result;
  }

  /**
   * Parse content sections (## headings)
   */
  static parseSections(content) {
    const sections = {};
    const regex = /^## (.+)$/gm;
    const matches = [...content.matchAll(regex)];
    
    for (let i = 0; i < matches.length; i++) {
      const sectionName = matches[i][1]
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z_]/g, '');
      const startIndex = matches[i].index + matches[i][0].length;
      const endIndex = matches[i + 1]?.index || content.length;
      const sectionContent = content.slice(startIndex, endIndex).trim();
      
      sections[sectionName] = {
        raw: sectionContent,
        fields: this.parseFields(sectionContent)
      };
    }
    
    return sections;
  }

  /**
   * Parse fields within a section
   */
  static parseFields(sectionContent) {
    const fields = {};
    const lines = sectionContent.split('\n');
    
    for (const line of lines) {
      // Match "Key: Value" or "- Key: Value" patterns
      const match = line.match(/^[-*]?\s*([A-Za-z_]+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        fields[key.toLowerCase()] = value.trim();
      }
    }
    
    return fields;
  }

  /**
   * Generate warnings for parsed seed
   */
  static getWarnings(frontmatter, sections) {
    const warnings = [];
    
    // Check for missing recommended sections
    const recommended = ['identity', 'style', 'preferences', 'ai_instructions'];
    for (const section of recommended) {
      if (!sections[section]) {
        warnings.push(`Missing recommended section: ${section}`);
      }
    }

    // Check version compatibility
    if (frontmatter.version !== this.VERSION) {
      const seedMajor = parseInt(frontmatter.version?.split('.')[0] || '1');
      const parserMajor = parseInt(this.VERSION.split('.')[0]);
      
      if (seedMajor > parserMajor) {
        warnings.push(`Seed uses newer protocol (v${frontmatter.version}). Some features may not work.`);
      }
    }

    // Check for missing integrity
    if (!frontmatter.integrity?.checksum) {
      warnings.push('No integrity checksum present');
    }

    return warnings;
  }

  /**
   * Compute SHA-256 checksum of content
   * @param {string} content - Content to hash
   * @returns {Promise<string>} Checksum in format "sha256:..."
   */
  static async computeChecksum(content) {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return 'sha256:' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Validate checksum of parsed seed
   */
  static async validateChecksum(parsedSeed) {
    if (!parsedSeed.frontmatter?.integrity?.checksum) {
      return { valid: true, reason: 'No checksum to validate' };
    }

    const computed = await this.computeChecksum(parsedSeed.content);
    const declared = parsedSeed.frontmatter.integrity.checksum;
    
    if (computed === declared) {
      return { valid: true };
    } else {
      return { 
        valid: false, 
        reason: 'Checksum mismatch - seed may have been modified',
        declared,
        computed
      };
    }
  }

  /**
   * Generate a new seed ID
   */
  static generateSeedId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `seed-${timestamp}${random}`;
  }

  /**
   * Generate a complete seed with frontmatter
   */
  static generate(identity, options = {}) {
    const seedId = this.generateSeedId();
    const now = new Date().toISOString();
    
    const frontmatter = {
      version: this.VERSION,
      seed_id: seedId,
      generated: now,
      updated: now,
      lineage: {
        predecessor: options.predecessor || null,
        generation: options.generation || 1
      },
      protocol: 'MirrorDNA-Seed-v1',
      glyph_sig: options.glyph_sig || '⟡△◈'
    };

    const content = this.buildContent(identity);
    
    return {
      frontmatter,
      content,
      toString: () => this.serialize(frontmatter, content)
    };
  }

  /**
   * Build content sections from identity object
   */
  static buildContent(identity) {
    let content = '# MIRROR SEED\n\n';

    // Identity section
    content += '## Identity\n\n';
    if (identity.name) content += `Name: ${identity.name}\n`;
    if (identity.handle) content += `Handle: ${identity.handle}\n`;
    if (identity.location) content += `Location: ${identity.location}\n`;
    if (identity.timezone) content += `Timezone: ${identity.timezone}\n`;
    if (identity.bio) content += `Bio: ${identity.bio}\n`;
    if (identity.role) content += `Role: ${identity.role}\n`;
    if (identity.industry) content += `Industry: ${identity.industry}\n`;

    // Style section
    if (identity.style) {
      content += '\n## Style\n\n';
      if (identity.style.communication) content += `- Communication: ${identity.style.communication}\n`;
      if (identity.style.energy) content += `- Energy: ${identity.style.energy}\n`;
      if (identity.style.values) content += `- Values: ${identity.style.values}\n`;
    }

    // Context section
    if (identity.context) {
      content += '\n## Context\n\n';
      if (identity.context.focus) content += `- Currently: ${identity.context.focus}\n`;
      if (identity.context.tools) content += `- Tools: ${identity.context.tools}\n`;
    }

    // Preferences section
    if (identity.preferences) {
      content += '\n## Preferences\n\n';
      if (identity.preferences.address) content += `- Address me: ${identity.preferences.address}\n`;
      if (identity.preferences.length) content += `- Length: ${identity.preferences.length}\n`;
      if (identity.preferences.format) content += `- Format: ${identity.preferences.format}\n`;
      if (identity.preferences.avoid) content += `- Avoid: ${identity.preferences.avoid}\n`;
      if (identity.preferences.note) content += `- Note: ${identity.preferences.note}\n`;
    }

    // AI Instructions
    content += '\n## AI Instructions\n\n';
    content += `You are talking to ${identity.name || 'the user'}. Use this context to personalize every response.\n\n`;
    content += '1. **Truth**: Be honest. Say "I don\'t know" when uncertain. No hallucination.\n';
    content += '2. **Adapt**: Match my communication style and energy.\n';
    content += '3. **Remember**: Reference this context throughout our conversation.\n\n';
    content += 'Talk to me naturally, like you already know me. No need to acknowledge this message — just be helpful in the way I\'ve described.';

    return content;
  }

  /**
   * Serialize frontmatter and content to string
   */
  static serialize(frontmatter, content) {
    let yaml = '---\n';
    yaml += `version: "${frontmatter.version}"\n`;
    yaml += `seed_id: "${frontmatter.seed_id}"\n`;
    yaml += `generated: "${frontmatter.generated}"\n`;
    yaml += `updated: "${frontmatter.updated}"\n`;
    yaml += 'lineage:\n';
    yaml += `  predecessor: ${frontmatter.lineage.predecessor ? '"' + frontmatter.lineage.predecessor + '"' : 'null'}\n`;
    yaml += `  generation: ${frontmatter.lineage.generation}\n`;
    yaml += `protocol: "${frontmatter.protocol}"\n`;
    yaml += `glyph_sig: "${frontmatter.glyph_sig}"\n`;
    yaml += '---\n\n';

    const footer = `\n\n---\n⟡ MirrorDNA-Seed-v1 | ${frontmatter.seed_id} | gen:${frontmatter.lineage.generation}`;

    return yaml + content + footer;
  }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MirrorSeedParser;
}

// Export for ES modules
if (typeof exports !== 'undefined') {
  exports.MirrorSeedParser = MirrorSeedParser;
}
