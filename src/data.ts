/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ServiceItem, BlogPost, GalleryItem, FAQItem, Testimonial, SEOSettings, ContactInfo } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Muratech AI-Dome Pro 8MP',
    description: 'Enterprise-grade 4K Dome Camera featuring deep-learning AI facial detection, smart intrusion analytics, and 40m infrared night vision. Ideal for indoor/outdoor office perimeter monitoring and server rooms.',
    price: 18500,
    category: 'dome',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
    stock: 145,
    features: ['4K UHD Resolution', 'AI Face Recognition', 'IP67 Weatherproof', 'IK10 Vandal-Proof', 'H.265+ Compression', 'PoE Enabled'],
    resolution: '8MP (3840 x 2160)',
    isWireless: false,
    rating: 4.9,
    modelNumber: 'MT-DOME-8MP-AI'
  },
  {
    id: 'prod-2',
    name: 'Muratech Bullet LaserPTZ Long-Range',
    description: 'High-performance active deterrence bullet camera with built-in laser illuminators up to 150m, 25x optical zoom, and flashing alarm alerts. Designed for large industrial parks, warehouses, and yard security.',
    price: 48900,
    category: 'bullet',
    image: 'https://images.unsplash.com/photo-1524413840003-05174b1e7d58?auto=format&fit=crop&w=600&q=80',
    stock: 82,
    features: ['25x Optical Zoom', '150m Laser Night Vision', 'Active Deterrence Sirens', 'Dual-way Audio', 'Auto-Tracking AI', 'Vehicle Classification'],
    resolution: '6MP (3072 x 2048)',
    isWireless: false,
    rating: 5.0,
    modelNumber: 'MT-BULL-25X-LSR'
  },
  {
    id: 'prod-3',
    name: 'Muratech 360° PTZ Speed Dome Ultra',
    description: 'Full 360-degree high-speed pan-tilt-zoom camera with auto-tracking, starlight ultra-low light sensors, and dual thermal-optical lenses for thermal scanning of factory machinery or warehouse cargo.',
    price: 85000,
    category: 'ptz',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=600&q=80',
    stock: 34,
    features: ['360° Endless Pan', 'Starlight Ultra-Low Light', 'Thermal & Optical Dual Imaging', 'Auto-Defog System', 'Weatherproof IP68', 'Advanced Smart Tracking'],
    resolution: '12MP (4000 x 3000)',
    isWireless: false,
    rating: 4.8,
    modelNumber: 'MT-PTZ-360-DUAL'
  },
  {
    id: 'prod-4',
    name: 'Muratech Nexus-64 NVR Rack Server',
    description: 'Industrial-strength 64-Channel Network Video Recorder with redundant RAID-5 controller, hot-swappable enterprise bays, dual 10G networks, and AI-powered metadata video search engines.',
    price: 195000,
    category: 'nvr',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    stock: 15,
    features: ['64 Channels Recording', 'RAID 0,1,5,6,10 Support', 'Redundant Power Supply', '8 SATA Hot-Swap Bays (up to 128TB)', 'Dual 10Gbps SFP+ Ports', 'Smart AI Analytic Decoders'],
    resolution: 'Up to 32MP Video Decodes',
    isWireless: false,
    rating: 5.0,
    modelNumber: 'MT-NVR-64-RACK'
  },
  {
    id: 'prod-5',
    name: 'Muratech Wireless Flex-Cam 4MP',
    description: 'Solar-powered dual-antenna 4G LTE wireless CCTV camera with PIR human motion sensor and local SD-card storage backup. Perfect for construction sites, agricultural land, and remote locations with no WiFi/electricity.',
    price: 24500,
    category: 'dome',
    image: 'https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=600&q=80',
    stock: 60,
    features: ['Solar Powered Backup', '4G LTE / WiFi Dual Connect', 'PIR Thermal Detection', 'MicroSD Local Recording (256GB)', 'Low Power Consumption', 'Quick Mount Base'],
    resolution: '4MP (2560 x 1440)',
    isWireless: true,
    rating: 4.7,
    modelNumber: 'MT-WIRE-SOLAR-4G'
  },
  {
    id: 'prod-6',
    name: 'Heavy Duty CCTV Steel Pole Mount Bracket',
    description: 'Corrosion-resistant steel security column pole mount adapter with double strapping bands. Tailored for mounting heavy speed domes and multi-spectral sensors on enterprise estates.',
    price: 4500,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    stock: 250,
    features: ['Corrosion-Resistant Steel', 'Universal Mounting Grid', 'Double Steel Straps', 'Holds up to 50KG', 'Wind Resistance Configured'],
    resolution: 'N/A',
    isWireless: false,
    rating: 4.8,
    modelNumber: 'MT-ACC-POLE-HVY'
  },
  {
    id: 'prod-7',
    name: 'Complete Corporate Security Bundle (4-Cam)',
    description: 'Complete high-performance setup for medium corporate offices. Includes 4x Muratech AI-Dome Pro 8MP cameras, 1x Nexus-16 Channel PoE NVR, 1x 2TB Seagate SkyHawk Surveillance HDD, and professional routing cat6 cables.',
    price: 115000,
    category: 'package',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
    stock: 30,
    features: ['4x AI-Dome 8MP Cameras', '1x 16-Ch PoE NVR Recorder', '1x 2TB Surveillance HDD', '300m Cat6 Copper Cable', 'Mobile Remote Setup Included', '1 Year Maintenance Free'],
    resolution: '8MP Per Camera UHD',
    isWireless: false,
    rating: 4.9,
    modelNumber: 'MT-PKG-CORP-04'
  },
  {
    id: 'prod-8',
    name: 'Industrial Estate Multi-Sensor Package (8-Cam)',
    description: 'Our flagship commercial package. Includes 4x Speed Dome PTZ cameras, 4x Long-Range Bullet Deterrence cameras, a 32-Channel RAID server, industrial fiber media converters, rack casing, and professional enterprise installation.',
    price: 495000,
    category: 'package',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    stock: 12,
    features: ['4x Auto-Tracking PTZ Speed Domes', '4x Active-Deterrence Bullet Cams', '1x 32-Ch RAID Enterprise NVR', '1x 8TB Surveillance Storage Server', 'Industrial Fiber Converters & Rack Casing', 'Full Infrastructure Installation & Fine-Tuning'],
    resolution: 'Mixed 8MP & 6MP PTZ Sensor Grid',
    isWireless: false,
    rating: 5.0,
    modelNumber: 'MT-PKG-IND-08'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Enterprise CCTV Installation',
    description: 'Professional, structure-aligned camera deployment with structural pipe routing, metal arm mountings, high-shielded Cat6/Fiber cables, and calibrated camera field-of-view alignments for maximum estate coverage.',
    iconName: 'ShieldCheck',
    basePrice: 15000,
    features: [
      'Structural route mapping and camera angle simulation',
      'High-durability metal piping and weather conduits',
      'Professional terminations and rack patch panels',
      'Post-installation angle fine-tuning and safety certificates'
    ]
  },
  {
    id: 'srv-2',
    title: 'Proactive System Maintenance & SLA',
    description: 'Ensure 100% uptime with scheduled on-site cleanings, lens defogging, thermal checks of wiring, hard drive health audits, firmware hardening, and instant swap-out camera support when hardware fails.',
    iconName: 'Activity',
    basePrice: 8500,
    features: [
      'Monthly physical camera cleaning & focus tuning',
      'NVR storage and health diagnostic checkups',
      'Secure security patch updates and backup checks',
      '4-Hour emergency on-site response in Nairobi & Environs'
    ]
  },
  {
    id: 'srv-3',
    title: 'Remote View Secure Setup',
    description: 'Encrypted mobile and computer monitoring setup. Stream crystal-clear live or recorded footage securely over the web with bank-level encryption, multi-user permissions, and instant AI push alerts on your phone.',
    iconName: 'Smartphone',
    basePrice: 5000,
    features: [
      'Encrypted mobile app (iOS/Android) configuration',
      'Command center workstation software installation',
      'Secure multi-account role and permission setup',
      'Dynamic Domain Name Server (DDNS) setup for static access'
    ]
  },
  {
    id: 'srv-4',
    title: 'Legacy System Modernization & Upgrades',
    description: 'Upgrade your existing low-resolution analog setup to ultra-high-definition IP cameras without replacing existing cable pathways where appropriate, saving substantial hardware costs.',
    iconName: 'RefreshCw',
    basePrice: 12000,
    features: [
      'Audit of existing analog/IP cabling infrastructure',
      'Dynamic hybrid DVR/NVR unit integration',
      'Replacement of key focus points with 4K/8K cameras',
      'Enhanced local search speed and cloud proxy configuration'
    ]
  },
  {
    id: 'srv-5',
    title: 'Complete Corporate & Office Protection',
    description: 'End-to-end multi-tier workspace protection integrating high-definition visual CCTV surveillance with facial recognition, RFID turnstiles, fire safety alerts, and panic integrations.',
    iconName: 'Building2',
    basePrice: 45000,
    features: [
      'Biometric / RFID card entry-exit integration',
      'CCTV visual event-trigger alarms with door locks',
      'Central security cabin console command software',
      'Intruder sirens and emergency light linkages'
    ]
  },
  {
    id: 'srv-6',
    title: 'Smart Home Vigilance & Smart Lock Connect',
    description: 'Fully automated home security incorporating hidden ultra-slim dome cameras, automated gate camera integration, perimeter smart-beam lasers, and smart lock controls from a unified dashboard.',
    iconName: 'Home',
    basePrice: 18000,
    features: [
      'Sleek, low-profile decorative indoor security cameras',
      'Perimeter laser motion sensors with direct SMS alert system',
      'Smart video doorbell and automated gate system link',
      'Siri, Google Assistant, & Alexa custom integration'
    ]
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why AI Facial Detection is Crucial for Nairobi Office Perimeters',
    summary: 'Explore how advanced deep learning and face classification in CCTV cameras are reducing false security alarms by 95% in Kenyan business zones.',
    content: `Security is the bedrock of corporate productivity, particularly in high-density urban zones such as Nairobi's CBD, Upper Hill, and Westlands. Traditional CCTV systems functioned merely as passive recorders, meaning business owners only reviewed the footage after an incident had already occurred. 

Modern commercial operations demand proactive defense. 

### Enter AI-Powered CCTV Cameras

By utilizing deep learning networks integrated directly into the camera processors (Edge Computing), contemporary security cameras don't just "see"—they analyze in real-time.

1. **Human vs. Object Classification**: Standard motion-detecting cameras trigger alarms for wind-blown debris, passing stray animals, or rain. Muratech's AI-enabled dome cameras classify movement, only raising alert states when a human form or vehicle is identified inside forbidden geometric zones.
2. **Facial Indexing**: Registered employees, VIP clients, and security teams can be white-listed. Unrecognized profiles entering high-security storage bays or server rooms are immediately reported via encrypted push notifications to central security rooms.
3. **Behavioral Trajectory Tracking**: The camera can track a suspect's trajectory. If a subject loiters near an exit door for more than 120 seconds, the active deterrence strobe lights engage, warning the trespasser that they are being monitored.

For large enterprises, this reduces false-alarm fatigue among security guards, ensuring they are vigilant when a genuine threat arises. Investing in smart systems translates to lower long-term security staffing costs and absolute operational peace of mind.`,
    category: 'security',
    author: 'Eng. David Kimanzi',
    date: '2026-06-25',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
    isNews: true
  },
  {
    id: 'blog-2',
    title: 'Comprehensive Guide to Maintaining Optical Clarity on CCTV Lenses',
    summary: 'A pristine camera system is useless if dust, cobwebs, and condensation obscure the lens. Learn our corporate maintenance checklist.',
    content: `In the CCTV installation sector, we often say that a camera system is only as good as its optical line-of-sight. Yet, over 60% of commercial systems suffer from degraded image clarity due to simple environmental neglected maintenance factors. 

Dust, spiderwebs, vehicle exhaust film, and ambient moisture buildup form a cloudy residue on the protective bubble of dome and bullet cameras. This degrades 4K crystal video into fuzzy, unidentifiable shapes, rendering evidence useless during security investigations.

### The Professional Camera Maintenance Protocol

To preserve the effectiveness of your enterprise security investment, your technical or maintenance crew should perform the following sequence quarterly:

#### 1. Clear Outer Debris and Webs
Spiders are attracted to the subtle warmth generated by infrared (IR) LEDs on cameras. They spin webs across the lenses, which glow brightly when IR engages at night, completely blinding the sensor. Use long telescoping soft duster poles to remove surrounding insect nests.

#### 2. Clean with Specialized Optical Solutions
Never use abrasive glass cleaners or standard paper towels on polycarbonate camera domes. They introduce micro-scratches that cause IR light to scatter in circular halo patterns at night, ruining nighttime vision.
*   **Do**: Use microfiber lint-free cloths.
*   **Do**: Use dedicated lens cleaning fluid or diluted isopropyl alcohol.
*   **Do**: Wipe gently in single-direction strokes rather than circular scrubbing.

#### 3. Inspect Casing Seals and Desiccant Packs
When cameras are installed in humid areas like Mombasa or rainy regions like Kericho, thermal changes can draw moisture inside the camera enclosure. Ensure the internal rubber gaskets are seated perfectly and replace the internal silica desiccant packs inside the housing during audit cycles to absorb latent moisture.

#### 4. Audit NVR Hard Drives
Hard drives built for desktop PCs will fail rapidly under continuous 24/7 surveillance write cycles. Always verify your storage array utilizes dedicated surveillance drives (such as Western Digital Purple or Seagate SkyHawk) and run S.M.A.R.T diagnostic logs periodically to catch failing drives before data is permanently lost.

Alternatively, partnering with an enterprise provider under a Structured Service Level Agreement (SLA) ensures certified engineers systematically handle these parameters, allowing your operations team to focus on core productivity.`,
    category: 'installation',
    author: 'Kairu Kimanzi',
    date: '2026-06-18',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    isNews: false
  },
  {
    id: 'blog-3',
    title: 'Muratech Expands Enterprise Operations with Nairobi CBD Hub',
    summary: 'Muratech CCTV announces the launching of a highly equipped service support center in Nairobi, enabling rapid emergency tech dispatches.',
    content: `NAIROBI, KENYA — In a bid to streamline system deployment times and provide unmatched support services, Muratech CCTV is proud to announce the official commissioning of our new central support hub.

This strategically selected location enables our technical emergency dispatch units to arrive at any corporate enterprise site within Nairobi County, Upper Hill, Kilimani, Westlands, and Industrial Area in under 60 minutes.

### What This Means For Our Corporate Clients

1. **Guaranteed 4-Hour SLA Response**: For large industrial plants and financial institutions running complex multi-site networks, downtime is a critical vulnerability. Our new CBD headquarters will house a dedicated crew of senior engineers and rapid response technicians equipped with hot-swap cameras, redundant network components, and calibration gears.
2. **Interactive Live Demonstration Showroom**: Corporate security chiefs, procurement directors, and business owners can now visit our showroom to experience live comparison tests of 8MP AI Dome Cameras, thermal scanners, active deterrence bullet alarms, and 64-Channel RAID server configurations.
3. **Certified Client Training Academy**: We believe our clients should feel fully empowered. The new facility features a custom training lab where our customers' internal security operators can learn to leverage AI search engines, manage footage backups, set up remote security channels, and troubleshoot secondary routing paths.

As Kenya moves toward a more digital, connected economy, secure business perimeters form the crucial foundation of commercial expansion. Muratech is committed to delivering state-of-the-art visual surveillance architecture paired with customer support that sets the standard across East Africa.`,
    category: 'corporate',
    author: 'Press Relations Team',
    date: '2026-07-01',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    isNews: true,
    isEvent: true,
    eventDate: '2026-07-15'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    caption: 'Muratech 8MP Dome camera aligned for main lobby corporate security in Upper Hill, Nairobi.',
    category: 'installation'
  },
  {
    id: 'gal-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    caption: 'Long-range active deterrence bullet camera overlooking heavy vehicle loading dock in Mombasa Port.',
    category: 'enterprise'
  },
  {
    id: 'gal-3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    caption: 'Central Server Rack with high-capacity Nexus NVR servers and managed fiber-optic POE network switches.',
    category: 'products'
  },
  {
    id: 'gal-4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    caption: 'Senior technician fine-tuning multi-sensor PTZ speed dome tracking angles at an industrial facility.',
    category: 'team'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do you provide security systems and installation for locations outside Nairobi?',
    answer: 'Yes, absolutely. While our primary administrative and tech hub is located in Nairobi, Muratech executes professional installations and full SLA support agreements nationwide, including Mombasa, Kisumu, Nakuru, Eldoret, Thika, and major industrial centers across East Africa.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'What is the difference between IP cameras and traditional analog CCTV systems?',
    answer: 'IP (Internet Protocol) cameras convert video into digital network packets directly at the camera, delivering far superior clarity (up to 4K/12MP), advanced AI analytical tracking (face recognition, tripwires), secure encryption, and the ability to route power and data through a single Ethernet cable (PoE). Analog systems rely on coaxial cables, have lower resolution limits, and lack edge intelligent processing.',
    category: 'technical'
  },
  {
    id: 'faq-3',
    question: 'How does M-Pesa payment integration work for purchase and installation deposits?',
    answer: 'Muratech provides an automated, secure billing interface. During checkout, you can choose "M-Pesa STK Push" which prompts a secure PIN request directly on your mobile device, or "M-Pesa C2B Paybill" instructions. Once completed, our system instantly issues an official PDF receipt and structured project invoice. Alternatively, clients can opt for direct "WhatsApp Order Validation" to complete custom wire transfer procedures with our account executives.',
    category: 'billing'
  },
  {
    id: 'faq-4',
    question: 'Can I monitor my cameras remotely on my phone when I am traveling abroad?',
    answer: 'Yes. Every system we deploy is configured with remote streaming capabilities. Using our highly secure, encrypted mobile app and desktop monitoring suite, you can stream live high-definition footage, browse stored archives, and receive immediate push alerts for perimeter intrusions anywhere globally with internet access.',
    category: 'technical'
  },
  {
    id: 'faq-5',
    question: 'What warranty and post-installation support do you provide to corporate organizations?',
    answer: 'All Muratech hardware is protected by a 12-month direct replacement warranty. Following installation, we offer custom Service Level Agreements (SLAs) that cover scheduled physical lens cleaning, diagnostic storage audits, firmware patches, security hardening updates, and rapid 4-hour emergency technician dispatches.',
    category: 'installation'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Peter Ondieki',
    company: 'Safaricom Plaza Logistics Center',
    text: 'Muratech deployed an extensive 48-camera intelligent surveillance network across our regional sorting warehouse. The AI facial index and license plate classification have dramatically streamlined security audit processes. Their technical expertise and SLA responsiveness are second to none.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-2',
    author: 'Amina Mohamed',
    company: 'Apex Towers Management',
    text: 'We modernised our entire 12-floor commercial property from low-quality analog lines to Muratech 4K IP Dome cameras. The image clarity is absolute day and night, and our tenants feel extremely secure knowing the perimeter is under real-time AI perimeter tripwire vigilance.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-3',
    author: 'Eng. Julius Wambua',
    company: 'East African Breweries Logistics Hub',
    text: 'For high-risk environments, you need rugged, professional components. Muratech provided exceptional, explosion-proof, multi-sensor PTZ speed dome cameras for our factory yards, coupled with redundant NVR server racks. Truly world-class security engineers.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
  }
];

export const INITIAL_SEO_SETTINGS: SEOSettings = {
  metaTitle: 'Muratech CCTV - Enterprise CCTV Sales & Professional Installation Kenya',
  metaDescription: 'Muratech CCTV is Kenyas leading enterprise surveillance provider. We sell and install 4K AI security cameras, speed domes, NVR storage servers, and thermal scanners. Best CCTV price, remote view setup, and technical maintenance in Nairobi.',
  keywords: ['CCTV Kenya', 'Muratech CCTV', 'CCTV installation Nairobi', 'AI CCTV security', 'Buy security cameras Kenya', 'M-Pesa CCTV store', 'NVR rack server Kenya', 'Safaricom CCTV supplier', 'Hikvision Kenya partner', 'Dahua Nairobi installer'],
  canonicalUrl: 'https://muratech-cctv.co.ke'
};

export const INITIAL_CONTACT_INFO: ContactInfo = {
  phone: '0729716092',
  email: 'kimanzikairu007@gmail.com',
  address: 'Muratech Security Solutions Plaza, Luthuli Avenue & River Road, Nairobi, Kenya',
  facebook: 'https://facebook.com/muratech',
  twitter: 'https://twitter.com/muratech',
  tiktok: 'https://tiktok.com/@muratech',
  instagram: 'https://instagram.com/muratech'
};

export const CORPORATE_PARTNERS = [
  { name: 'Safaricom PLC', logo: 'S' },
  { name: 'KCB Bank Group', logo: 'K' },
  { name: 'Equity Bank', logo: 'E' },
  { name: 'KenGen Kenya', logo: 'KG' },
  { name: 'Nairobi City County', logo: 'NC' },
  { name: 'Bamburi Cement', logo: 'BC' }
];
