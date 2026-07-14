package com.muratech.cctv.service;

import com.muratech.cctv.entity.*;
import com.muratech.cctv.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@Service
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Autowired
    private FaqRepository faqRepository;

    @Autowired
    private TestimonialRepository testimonialRepository;

    @Autowired
    private ServiceItemRepository serviceItemRepository;

    @Autowired
    private GalleryItemRepository galleryItemRepository;

    @Autowired
    private ContactInfoRepository contactInfoRepository;

    @Autowired
    private SeoSettingsRepository seoSettingsRepository;

    @Autowired
    private AdminCredentialRepository adminCredentialRepository;

    @Override
    public void run(String... args) throws Exception {
        seedAdminCredentials();
        seedContactInfo();
        seedSeoSettings();
        seedProducts();
        seedBlogPosts();
        seedFaqs();
        seedTestimonials();
        seedServiceItems();
        seedGalleryItems();
    }

    private void seedAdminCredentials() {
        if (adminCredentialRepository.count() == 0) {
            AdminCredentialEntity cred = AdminCredentialEntity.builder()
                    .id("default")
                    .username("admin")
                    .passwordHash("admin123") // Plaintext fallback. In production, use BCrypt.
                    .updatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .build();
            adminCredentialRepository.save(cred);
        }
    }

    private void seedContactInfo() {
        if (contactInfoRepository.count() == 0) {
            ContactInfoEntity info = ContactInfoEntity.builder()
                    .id("default")
                    .phone("+254 729 716092")
                    .email("info@muratech.co.ke")
                    .address("Muratech CCTV Offices, River Road, Nairobi, Kenya")
                    .facebook("https://facebook.com/muratechcctv")
                    .twitter("https://twitter.com/muratechcctv")
                    .tiktok("https://tiktok.com/@muratechcctv")
                    .instagram("https://instagram.com/muratechcctv")
                    .build();
            contactInfoRepository.save(info);
        }
    }

    private void seedSeoSettings() {
        if (seoSettingsRepository.count() == 0) {
            SeoSettingsEntity seo = SeoSettingsEntity.builder()
                    .id("default")
                    .metaTitle("Muratech CCTV | Commercial Surveillance & Security Systems Nairobi")
                    .metaDescription("Certified CCTV installations and surveillance engineering in Kenya. We secure offices, warehouses, ports, and estates with high-definition IP cameras.")
                    .keywords(Arrays.asList("cctv installation kenya", "security cameras nairobi", "ip cameras", "surveillance engineering", "hikvision kenya"))
                    .canonicalUrl("https://www.muratech.co.ke")
                    .build();
            seoSettingsRepository.save(seo);
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            ProductEntity p1 = ProductEntity.builder()
                    .id("p1")
                    .name("Pro Bullet Ultra-HD IP Camera")
                    .description("8MP resolution bullet camera with advanced DarkFighter night vision, motorized varifocal lens (2.8mm - 12mm), and IP67 weatherproofing.")
                    .price(new BigDecimal("12500"))
                    .category("bullet")
                    .image("https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80")
                    .stock(45)
                    .features(Arrays.asList("8MP Ultra-HD", "Varifocal Motorized Lens", "Advanced DarkFighter Night Vision", "IP67 Weatherproof", "Power-over-Ethernet (PoE)"))
                    .resolution("4K UHD (3840x2160)")
                    .isWireless(false)
                    .rating(new BigDecimal("4.8"))
                    .modelNumber("MT-CAM-8MPB")
                    .build();

            ProductEntity p2 = ProductEntity.builder()
                    .id("p2")
                    .name("Smart Dome AI Security Camera")
                    .description("4MP dome camera featuring AI human and vehicle categorization, built-in active deterrence strobe and audio alarm, and vandal-resistant IK10 glass.")
                    .price(new BigDecimal("9800"))
                    .category("dome")
                    .image("https://images.unsplash.com/photo-1524055988636-436cfa46e2c1?auto=format&fit=crop&w=400&q=80")
                    .stock(60)
                    .features(Arrays.asList("4MP Resolution", "AI Analytics Face Recognition", "Built-in Speaker & Flash Alarm", "IK10 Vandal-Proof", "H.265+ Compression"))
                    .resolution("2K (2560x1440)")
                    .isWireless(false)
                    .rating(new BigDecimal("4.7"))
                    .modelNumber("MT-CAM-4MPD")
                    .build();

            ProductEntity p3 = ProductEntity.builder()
                    .id("p3")
                    .name("360° PTZ High-Speed Patrol Dome")
                    .description("Enterprise-grade high speed dome with 32x optical zoom, laser infrared up to 150m, smart auto-tracking, and robust patrol preset algorithms.")
                    .price(new BigDecimal("34500"))
                    .category("ptz")
                    .image("https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=400&q=80")
                    .stock(12)
                    .features(Arrays.asList("32x Optical Zoom", "Laser Smart IR 150m", "Auto-Tracking Target Following", "Endless 360° Pan", "Defog and Smart Image Enhancement"))
                    .resolution("1080P Full HD")
                    .isWireless(false)
                    .rating(new BigDecimal("4.9"))
                    .modelNumber("MT-PTZ-32XZ")
                    .build();

            productRepository.saveAll(Arrays.asList(p1, p2, p3));
        }
    }

    private void seedBlogPosts() {
        if (blogPostRepository.count() == 0) {
            BlogPostEntity b1 = BlogPostEntity.builder()
                    .id("b1")
                    .title("Preventing Industrial Breaches: Thermal vs Optical CCTV")
                    .summary("An in-depth analysis on why logistics ports and manufacturing yards are shifting to dual-sensor thermal cameras for perimeter breach deterrence.")
                    .content("With increasing warehouse and cargo yard expansions, security perimeters have grown wider and harder to monitor. Traditional optical video systems often fail under poor lighting, rain, fog, or dust storms. Thermal imaging cameras detect heat signatures from humans and vehicles up to 500 meters away, making them virtually immune to atmospheric conditions. This post details how to combine thermal and optical systems to achieve 100% perimeter containment.")
                    .category("technology")
                    .author("Eng. Denis Gichure")
                    .date("July 02, 2026")
                    .image("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80")
                    .isNews(true)
                    .isEvent(false)
                    .build();

            blogPostRepository.save(b1);
        }
    }

    private void seedFaqs() {
        if (faqRepository.count() == 0) {
            FaqEntity f1 = FaqEntity.builder()
                    .id("f1")
                    .question("What is the difference between IP and Analog CCTV systems?")
                    .answer("IP (Internet Protocol) cameras encode and transmit digital video data over standard Cat6 ethernet networks. They offer far higher resolutions (4K+), built-in AI analytics, and Power-over-Ethernet (PoE) convenience. Analog cameras transmit raw coax feeds to a DVR, which has lower resolution ceilings and fewer advanced capabilities.")
                    .category("technical")
                    .build();

            FaqEntity f2 = FaqEntity.builder()
                    .id("f2")
                    .question("Does Muratech offer maintenance SLAs after installation?")
                    .answer("Yes, we provide standard 12-month and 24-month maintenance SLAs for commercial setups. This includes monthly camera cleanings, lens adjustments, NVR system diagnostics, hard-drive health checks, and a 24/7 priority emergency dispatch line.")
                    .category("general")
                    .build();

            faqRepository.saveAll(Arrays.asList(f1, f2));
        }
    }

    private void seedTestimonials() {
        if (testimonialRepository.count() == 0) {
            TestimonialEntity t1 = TestimonialEntity.builder()
                    .id("t1")
                    .author("Francis Mwanzia")
                    .company("Delta Logistics Port")
                    .text("Muratech CCTV designed our warehouse optical loop. The 8MP IP DarkFighter cameras resolved all our blind spots and their WhatsApp invoice dispatch simplified our bookkeeping. Stellar engineering.")
                    .rating(5)
                    .avatar("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80")
                    .build();

            testimonialRepository.save(t1);
        }
    }

    private void seedServiceItems() {
        if (serviceItemRepository.count() == 0) {
            ServiceItemEntity s1 = ServiceItemEntity.builder()
                    .id("s1")
                    .title("Corporate Site Survey & System Design")
                    .description("Full structural site inspection by a certified security architect. We map blind spots, plan optimal cabling paths, and engineer a layout blueprint.")
                    .iconName("HardHat")
                    .features(Arrays.asList("Blind spot thermal heat-mapping", "Optical camera focal depth calculations", "Full digital layout architecture design", "M-Pesa integrated Quotation"))
                    .basePrice(new BigDecimal("5000"))
                    .build();

            serviceItemRepository.save(s1);
        }
    }

    private void seedGalleryItems() {
        if (galleryItemRepository.count() == 0) {
            GalleryItemEntity g1 = GalleryItemEntity.builder()
                    .id("g1")
                    .type("image")
                    .url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80")
                    .caption("Industrial Control Room Integration at Upper Hill Offices")
                    .category("enterprise")
                    .build();

            galleryItemRepository.save(g1);
        }
    }
}
