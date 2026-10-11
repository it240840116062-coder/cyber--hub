const { initDB } = require('./db/database');
const bcrypt = require('bcryptjs');

const posts = [
  {
    title: "What Is Ransomware and How to Protect Yourself",
    slug: "what-is-ransomware",
    category: "Malware",
    excerpt: "Ransomware encrypts your files and holds them hostage. Learn how this devastating malware works and how to prevent it.",
    image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    content: "<h2>Understanding Ransomware</h2><p>Ransomware is a type of malicious software designed to block access to a computer system until a sum of money is paid. It typically works by encrypting the victim's files, making them inaccessible.</p><h3>How it spreads</h3><p>Most ransomware is delivered via phishing emails containing malicious attachments or through drive-by downloading. Drive-by downloading occurs when a user unknowingly visits an infected website and then malware is downloaded and installed without the user's knowledge.</p><h3>How to Protect Yourself</h3><ul><li><strong>Backup, Backup, Backup:</strong> Follow the 3-2-1 rule. If your files are backed up securely, ransomware loses its power over you.</li><li><strong>Keep Software Updated:</strong> Regularly patch your OS and applications. Attackers often exploit known vulnerabilities.</li><li><strong>Use Reliable Antivirus:</strong> Use security software with behavioral-based detection to stop ransomware before it encrypts files.</li><li><strong>Never Pay the Ransom:</strong> There is no guarantee you will get your data back, and paying only encourages future attacks.</li></ul>"
  },
  {
    title: "10 Signs of a Phishing Email",
    slug: "10-signs-of-phishing",
    category: "Phishing",
    excerpt: "Don't get hooked! Here are 10 clear warning signs that the email in your inbox is actually a phishing attempt.",
    image_url: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80",
    content: "<h2>Spot the Hook</h2><p>Phishing remains one of the most effective ways for attackers to breach systems. They rely on human error rather than technical exploits. Here are the top signs to watch out for:</p><ul><li><strong>1. Generic Greetings:</strong> \"Dear Customer\" instead of your actual name.</li><li><strong>2. Sense of Urgency:</strong> \"Your account will be suspended in 24 hours!\"</li><li><strong>3. Suspicious Sender Address:</strong> Looks real at first glance, but the domain is slightly off (e.g., support@paypa1.com).</li><li><strong>4. Unexpected Attachments:</strong> Never open unexpected PDFs or ZIP files.</li><li><strong>5. Spelling and Grammar Mistakes:</strong> Professional organizations rarely make glaring errors.</li><li><strong>6. Requests for Personal Info:</strong> Legitimate companies will never ask for your password via email.</li><li><strong>7. Discrepancies in Links:</strong> Hover over the link. Does the URL match what the text says?</li><li><strong>8. Too Good to Be True:</strong> You didn't win a lottery you didn't enter.</li><li><strong>9. Unusual Formatting:</strong> Low-resolution logos or weird layouts.</li><li><strong>10. Threats or Intimidation:</strong> Threatening legal action if you don't comply.</li></ul><p>Always verify requests independently by going directly to the organization's website.</p>"
  },
  {
    title: "How to Create Unbreakable Passwords",
    slug: "create-unbreakable-passwords",
    category: "Privacy",
    excerpt: "Password123 isn't cutting it anymore. Discover the secrets to generating and managing secure passwords.",
    image_url: "https://images.unsplash.com/photo-1614064641913-a538a5b81a17?auto=format&fit=crop&w=800&q=80",
    content: "<h2>The Foundation of Security</h2><p>Your password is often the only thing standing between an attacker and your sensitive data. Unfortunately, humans are terrible at creating random strings of characters.</p><h3>The Problem with Complexity</h3><p>For years, we were told to use complex passwords: <code>T0p$3cr3t!</code>. But computers are very good at guessing these through brute force or dictionary attacks. Furthermore, complex passwords are hard to remember, leading people to write them down or reuse them.</p><h3>The Solution: Length and Managers</h3><p><strong>Length beats complexity.</strong> A passphrase like <code>correct horse battery staple</code> is mathematically harder to crack than <code>Tr0ub4dor&3</code>, and it's much easier for a human to remember.</p><p>However, the absolute best practice is to use a <strong>Password Manager</strong> (like Bitwarden, 1Password, or Proton Pass). A password manager generates a long, completely random password for every site you use (e.g., <code>k7$vF9#mL2qP5!xZ</code>) and remembers it for you. You only need to remember one strong Master Password to unlock the vault.</p>"
  },
  {
    title: "Understanding Zero-Day Vulnerabilities",
    slug: "zero-day-vulnerabilities",
    category: "Network Security",
    excerpt: "What happens when hackers find a flaw before the developers do? Explore the world of zero-day exploits.",
    image_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    content: "<h2>The Race Against Time</h2><p>A zero-day vulnerability is a software security flaw that is known to the software vendor but doesn't have a patch in place. The term \"zero-day\" refers to the fact that the vendor or developer has just learned of the flaw, meaning they have zero days to fix it.</p><h3>How Zero-Day Attacks Work</h3><p>A zero-day attack happens once that flaw, or software/hardware vulnerability, is exploited and attackers release malware before a developer has an opportunity to create a patch to fix the vulnerability.</p><h3>Why They Are Dangerous</h3><p>Zero-days are incredibly dangerous because, by definition, no patch exists when the attack occurs. Traditional signature-based antivirus cannot detect zero-day malware because the malware has never been seen before.</p><h3>Defense in Depth</h3><p>Protecting against zero-days requires a \"defense in depth\" strategy:</p><ul><li><strong>Behavioral Analysis:</strong> Modern security tools look for suspicious behavior (like an unknown program trying to modify system files) rather than relying solely on known signatures.</li><li><strong>Network Segmentation:</strong> Limit the lateral movement an attacker can make if they do breach a system.</li><li><strong>Zero Trust Architecture:</strong> Never trust, always verify. Strict access controls limit the damage a compromised account or system can do.</li></ul>"
  },
  {
    title: "Public Wi-Fi Dangers and How to Stay Safe",
    slug: "public-wifi-dangers",
    category: "Privacy",
    excerpt: "Free coffee shop Wi-Fi is great, but it comes with hidden risks. Learn how to browse safely on public networks.",
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    content: "<h2>The Convenience Trap</h2><p>We all love free public Wi-Fi at coffee shops, airports, and hotels. But these networks are notoriously insecure, and attackers know it.</p><h3>Common Public Wi-Fi Threats</h3><ul><li><strong>Man-in-the-Middle (MitM) Attacks:</strong> An attacker intercepts the communication between your device and the server. They can read your emails, see what websites you visit, and steal credentials.</li><li><strong>Rogue Hotspots:</strong> Attackers set up a fake Wi-Fi network with a legitimate-sounding name (e.g., \"Starbucks_Guest_Free\"). If you connect, all your traffic goes through the attacker's machine.</li><li><strong>Packet Sniffing:</strong> Attackers use software to capture packets of data transmitted over the unencrypted network.</li></ul><h3>How to Protect Yourself</h3><p>The single best way to protect yourself on public Wi-Fi is to use a <strong>Virtual Private Network (VPN)</strong>. A VPN creates a secure, encrypted tunnel between your device and the internet. Even if an attacker intercepts your data, all they will see is gibberish.</p><p>Additionally, always ensure you are visiting HTTPS websites (look for the padlock in the browser bar), and avoid conducting sensitive transactions (like banking) on public networks.</p>"
  },
  {
    title: "A Beginner's Guide to Ethical Hacking",
    slug: "beginners-guide-ethical-hacking",
    category: "Careers",
    excerpt: "Want to hack for good? Discover the fundamentals of ethical hacking and how to get started in penetration testing.",
    image_url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    content: "<h2>Hacking for Good</h2><p>Ethical hacking, or penetration testing, is the practice of testing a computer system, network, or web application to find security vulnerabilities that an attacker could exploit. The key difference between a malicious hacker and an ethical hacker is <strong>permission</strong>.</p><h3>The Phases of a Penetration Test</h3><ol><li><strong>Recognizance (Recon):</strong> Gathering information about the target system (IP addresses, domain details, employee info).</li><li><strong>Scanning:</strong> Using tools to identify open ports, live systems, and specific services running on the target.</li><li><strong>Vulnerability Assessment:</strong> Identifying potential weaknesses in the discovered services.</li><li><strong>Exploitation:</strong> Attempting to exploit the vulnerabilities to gain access or escalate privileges.</li><li><strong>Reporting:</strong> Documenting the findings, the methods used, and providing recommendations for remediation.</li></ol><h3>Getting Started</h3><p>If you're interested in this career path, start by learning networking fundamentals (TCP/IP, DNS, HTTP) and operating systems (especially Linux). Platforms like Hack The Box and TryHackMe offer legal, gamified environments to practice your skills safely.</p>"
  },
  {
    title: "Why Multi-Factor Authentication Matters",
    slug: "why-mfa-matters",
    category: "Privacy",
    excerpt: "Passwords are no longer enough. MFA is the single most effective way to secure your online accounts.",
    image_url: "https://images.unsplash.com/photo-1614064642224-b15394be5bc0?auto=format&fit=crop&w=800&q=80",
    content: "<h2>Beyond the Password</h2><p>As data breaches become more common, billions of usernames and passwords are available on the dark web. If you reuse passwords, an attacker who compromises one account can easily access your others. This is why Multi-Factor Authentication (MFA) is critical.</p><h3>What is MFA?</h3><p>MFA requires you to provide two or more verification factors to gain access to a resource. These factors fall into three categories:</p><ul><li><strong>Something you know:</strong> A password or PIN.</li><li><strong>Something you have:</strong> A smartphone (authenticator app) or a hardware token (YubiKey).</li><li><strong>Something you are:</strong> Biometrics (fingerprint, FaceID).</li></ul><h3>Why SMS isn't the best</h3><p>While receiving a code via text message (SMS) is better than nothing, it's vulnerable to SIM swapping attacks, where a hacker tricks your telecom provider into transferring your phone number to their SIM card. <strong>Authenticator apps</strong> (like Google Authenticator, Authy) or <strong>hardware security keys</strong> are much more secure options.</p>"
  },
  {
    title: "Top Cyber Security Trends of 2026",
    slug: "cyber-security-trends-2026",
    category: "News",
    excerpt: "From AI-driven attacks to quantum cryptography, explore the cutting-edge trends shaping the security landscape this year.",
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    content: "<h2>The Evolving Battlefield</h2><p>The cyber security landscape shifts rapidly. As defenders build better walls, attackers build better ladders. Here are the key trends defining 2026:</p><h3>1. AI-Powered Attacks and Defense</h3><p>Artificial Intelligence is a double-edged sword. Attackers are using generative AI to craft highly convincing, personalized phishing emails at scale, and to develop self-mutating malware. In response, defenders rely heavily on AI to analyze vast amounts of network data in real-time, identifying anomalies that human analysts would miss.</p><h3>2. The Rise of Quantum-Safe Cryptography</h3><p>With quantum computers becoming more powerful, the threat to traditional encryption algorithms (like RSA) is no longer theoretical. Organizations in 2026 are actively transitioning to quantum-safe algorithms to protect data from \"harvest now, decrypt later\" attacks.</p><h3>3. Supply Chain Attacks as the Norm</h3><p>Why attack a heavily fortified enterprise when you can compromise a small software vendor they rely on? Supply chain attacks remain a top concern, forcing companies to implement zero-trust architectures not just internally, but with all third-party partners.</p><h3>4. IoT and OT Convergence</h3><p>Operational Technology (OT) - the systems that control physical processes in manufacturing, energy, and infrastructure - is increasingly connected to IT networks. Securing this converged environment is critical, as a breach can now result in physical damage or disruption of essential services.</p>"
  }
];

async function seed() {
  try {
    const db = await initDB();
    
    // Check if admin exists
    const adminExists = await db.get(`SELECT id FROM users WHERE email = 'admin@example.com'`);
    let adminId;
    
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Admin@123', salt);
      
      const result = await db.run(`
        INSERT INTO users (fullName, username, email, password, role)
        VALUES ('System Administrator', 'admin', 'admin@example.com', ?, 'admin')
      `, [hashedPassword]);
      adminId = result.lastID;
      console.log('Admin user created: admin@example.com / Admin@123');
    } else {
      adminId = adminExists.id;
      console.log('Admin user already exists.');
    }

    // Check if posts exist
    const postCount = await db.get(`SELECT COUNT(*) as count FROM posts`);
    
    if (postCount.count === 0) {
      console.log('Seeding blog posts...');
      for (const post of posts) {
        await db.run(`
          INSERT INTO posts (title, slug, category, author_id, content, excerpt, image_url)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [post.title, post.slug, post.category, adminId, post.content, post.excerpt, post.image_url]);
      }
      console.log('8 blog posts successfully seeded.');
    } else {
      console.log('Posts already exist, skipping seed.');
    }
    
    console.log('Seed process completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
