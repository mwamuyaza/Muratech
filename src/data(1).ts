/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CctvProduct, ServiceItem, PortfolioItem, BlogPost, FaqItem } from './types';

export const INITIAL_PRODUCTS: CctvProduct[] = [
  {
    id: 'prod-1',
    name: 'Muratech Enterprise 4K Bullet AI Dome',
    category: 'Bullet',
    brand: 'Muratech Pro',
    description: 'Ultra-high-definition 4K surveillance camera featuring next-generation AI perimeter protection, advanced face capturing, and license plate recognition. Specifically calibrated for low-light industrial yards and warehouse perimeters.',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&q=80&w=600',
    stock: 45,
    resolution: '4K (8MP)',
    features: ['Acusense AI Human/Vehicle Detection', '150ft Ultra Dark-Fighter IR Night Vision', 'IP67 Weatherproof & Vandal-proof', 'Power over Ethernet (PoE)'],
    salesCount: 120
  },
  {
    id: 'prod-2',
    name: 'Hikvision DarkFighter PTZ Ultra',
    category: 'PTZ',
    brand: 'Hikvision',
    description: 'Enterprise pan-tilt-zoom camera with 45x optical zoom and intelligent laser tracking. Perfect for large corporate campuses, shopping plazas, and multi-acre logistics yards in Nairobi Industrial Area.',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    stock: 12,
    resolution: '5MP',
    features: ['45x Optical Zoom, 16x Digital Zoom', 'Auto-Tracking Target Following', '300m Laser IR Distance', 'Smart Defog & Optical Image Stabilization'],
    salesCount: 65
  },
  {
    id: 'prod-3',
    name: 'Muratech Smart AI dome Camera',
    category: 'Dome',
    brand: 'Muratech Pro',
    description: 'Vandal-resistant intelligent dome camera with dual light smart audio. Built-in discrete microphone for localized corporate reception areas, executive suites, and secure high-value vaults.',
    price: 11500,
    image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&q=80&w=600',
    stock: 60,
    resolution: '5MP',
    features: ['High-Fidelity Built-in Audio Microphone', 'Vandal-Proof IK10 Rating', 'Smart Dual Light (Warm Light + IR)', 'Two-Way Audio Intercom Enabled'],
    salesCount: 95
  },
  {
    id: 'prod-4',
    name: 'Muratech NVR Elite 16-Channel 4K',
    category: 'NVR/DVR',
    brand: 'Muratech Pro',
    description: 'Professional grade Network Video Recorder with integrated 16-channel PoE ports, supporting dual-redundant 10TB Western Digital Purple hard drives. Pre-loaded with proprietary security analytics software.',
    price: 32500,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600',
    stock: 22,
    resolution: 'Up to 12MP Recording',
    features: ['Support 2 SATA HDDs up to 10TB each', '16 Port Direct PoE Plug and Play', 'H.265+ Ultra High Efficiency Compression', 'Dual Gigabit Uplink Ports'],
    salesCount: 42
  },
  {
    id: 'prod-5',
    name: 'Anker Eufy Cam Commercial Duo',
    category: 'Dome',
    brand: 'Anker',
    description: 'Wire-free high-resolution commercial surveillance pack with ultra-long battery backup and integrated high-performance solar panel charging system. Great for temporary sites or distant security outposts.',
    price: 24500,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=600',
    stock: 15,
    resolution: '2K QHD',
    features: ['365-Day Battery Life or Solar Powered', 'On-Device AI Local Human Detection', 'Military-Grade AES-128 Local Storage Encryption', 'No Monthly Surveillance Subscription Fees'],
    salesCount: 30
  },
  {
    id: 'prod-6',
    name: 'UniView Starlight Active Defense Bullet',
    category: 'Bullet',
    brand: 'UniView',
    description: 'High-visibility deterrence bullet camera equipped with an active red-and-blue warning strobe, integrated 110dB siren, and high-power white spotlight. Prevents trespassing instantly on high-security perimeters.',
    price: 15900,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
    stock: 35,
    resolution: '5MP',
    features: ['Active Warning Blue & Red Strobe Lights', 'High-Output 110dB Intrusive Siren', 'Full-Color Night Vision with Warm LED', 'Smart Intrusion Detection Alarm Zones'],
    salesCount: 55
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Enterprise CCTV Installation',
    description: 'Professional custom surveillance mapping, structured cabling (Cat6 Shielded), camera positioning, and server room configuration executed by certified security engineers.',
    icon: 'Shield',
    features: ['Detailed site mapping & camera positioning', 'Cat6 shielded weatherproof cabling', 'Clean rack termination & central PoE routing', 'Full-coverage blind-spot eradication analysis']
  },
  {
    id: 'srv-2',
    title: 'Preventative Maintenance Contracts',
    description: 'Scheduled multi-point hardware audits, lens refocusing, physical dusting and lens cleaning, system diagnostic tests, and firmware security hardening to prevent critical failure.',
    icon: 'Wrench',
    features: ['Quarterly physical lens detailing and hardware testing', 'NVR/DVR health, cooling fan & hard drive checkup', 'Firmware vulnerability patches and security updates', '24-hour priority emergency system recovery']
  },
  {
    id: 'srv-3',
    title: 'Remote View & Mobilization Setup',
    description: 'Sync your entire camera network to secure cloud gateways, enabling instant, real-time multi-device remote live feeds and instant push-alarm notifications on phones and laptops anywhere.',
    icon: 'Smartphone',
    features: ['Instant M-Pesa triggered smart alert configuration', 'Secure P2P multi-device synchronization', 'Sub-second latency video compression optimization', 'Custom admin, operator, and security guard access levels']
  },
  {
    id: 'srv-4',
    title: 'Legacy System Modernization',
    description: 'Cost-effective structural upgrades, converting old analog cameras to high-definition IP-based cameras, using existing coaxial lines with hybrid system integration.',
    icon: 'TrendingUp',
    features: ['Coaxial-to-IP hybrid bridge integration', 'NVR/DVR capacity expansions', 'Adding intelligent AI-driven motion detection to old cameras', 'Consolidated central network management interfaces']
  },
  {
    id: 'srv-5',
    title: 'Industrial & Big Corporate Protection',
    description: 'Complete integrated surveillance grids for high-traffic zones, manufacturing plants, and supply-chain depots with scale-ready automated video auditing tools.',
    icon: 'Building2',
    features: ['Continuous automated recording loops with backups', 'Heavy-duty explosion-proof camera installations', 'Perimeter thermal imaging sensors Integration', 'Scale-ready multi-site commercial security grids']
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Kilimani Corporate HQ Security Grid',
    client: 'Apex Financial Holdings Ltd',
    category: 'Corporate Office',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    description: 'Full layout structural planning and implementation of 64 networked AI Dome and PTZ cameras with automated facial logs across 5 corporate building floors and high-security basement parking.',
    location: 'Kilimani, Nairobi'
  },
  {
    id: 'port-2',
    title: 'Mombasa Road Logistics Center Grid',
    client: 'Kenya Trade & Cargo Depot',
    category: 'Industrial',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    description: 'Extreme-environment bullet camera deployment for continuous monitoring of loading bays, container stacks, and high-value cargo gates. Integrated with dynamic automatic license-plate capturing systems.',
    location: 'Mombasa Road, Nairobi'
  },
  {
    id: 'port-3',
    title: 'Upperhill Executive Suites Security',
    client: 'Sigma Towers Nairobi',
    category: 'Corporate Office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    description: 'Discrete dome camera installation and structured cabling. Featuring customized access levels for managers and general security desks with zero-downtime UPS backup power banks.',
    location: 'Upperhill, Nairobi'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Rise of AI Surveillance in Kenyan Enterprises',
    summary: 'How commercial AI facial recognition, intrusion zone modeling, and auto-alarms are saving Kenyan corporate parks millions in preventative security.',
    content: 'Corporate estates and high-value warehousing in Nairobi are moving fast towards preventative AI CCTV grids. Instead of just recording historical events, modern Muratech systems analyze video feeds in real-time. If a human crosses a virtual fence line at 2:00 AM, our active warning cameras flash red-and-blue strobes, sound a localized alarm, and send a high-priority push notification containing the camera snapshot directly to the security supervisor\'s phone. This sub-second automation eliminates human guard sleepiness or oversight, safeguarding corporate millions.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    category: 'Surveillance Tech',
    date: '2026-06-25',
    author: 'Eng. Moses Kimanzi'
  },
  {
    id: 'blog-2',
    title: 'Protecting NVR Systems Against Local Power Fluctuations',
    summary: 'A critical guide for Kenyan IT managers on keeping corporate surveillance networks online during utility power dips and surges.',
    content: 'In Kenya, commercial surveillance networks regularly suffer from power surges and grid drops. An unprotected NVR/DVR system is highly susceptible to hard-drive corruption, resulting in lost security logs right when you need them. To secure your data, we recommend setting up dedicated online-double-conversion Uninterruptible Power Supplies (UPS) paired with surge suppressors. In this guide, we discuss sizing UPS batteries for 12-hour continuous standby coverage and implementing automatic graceful shutdown software for enterprise NVR servers.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    category: 'Maintenance Tips',
    date: '2026-07-02',
    author: 'Tech Lead Kairu'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How long does a typical corporate CCTV installation take?',
    answer: 'For small offices with 4-8 cameras, installation is completed within 1 working day. Larger industrial depots or 5-story office towers with 32+ cameras typically require 3 to 5 business days, including detailed camera angle calibration, cable trunking, and NVR security configuration.',
    category: 'Installation'
  },
  {
    id: 'faq-2',
    question: 'Can we monitor our office cameras on our phones when traveling outside Nairobi?',
    answer: 'Absolutely. We configure highly secure, P2P encrypted remote cloud access. As long as your phone has internet coverage, you can access real-time live video streams, play back historical recordings, and manage pan-tilt-zoom angles globally through our dedicated app.',
    category: 'Technical Support'
  },
  {
    id: 'faq-3',
    question: 'What happens to the surveillance system when there is a KPLC power blackout?',
    answer: 'We design systems with high-quality, high-capacity backup batteries and automated UPS modules. Depending on your business needs, we scale backups to keep your entire security grid and NVR running seamlessly for 4, 8, or 24 hours, transitioning silently during grid blackouts.',
    category: 'Technical Support'
  },
  {
    id: 'faq-4',
    question: 'How do you support M-Pesa STK Push and receipt generation for procurement?',
    answer: 'We provide an integrated, seamless checkout workflow. Businesses can request an instant M-Pesa STK push prompt directly to their registered administrative lines. Once confirmed, our system instantly triggers automated inventory updates, logs the payment history, and renders a corporate invoice and PDF-printable receipt for your accounts team.',
    category: 'Pricing & Payment'
  },
  {
    id: 'faq-5',
    question: 'What warranty terms do you provide for hardware and installations?',
    answer: 'All our premium Muratech Pro cameras and Hikvision/Dahua enterprise-grade hardware come with a full 2-Year Manufacturer Warranty. Our direct cabling and on-site alignment works include a 1-Year Workmanship Warranty with free on-site service checks.',
    category: 'Warranty'
  }
];
