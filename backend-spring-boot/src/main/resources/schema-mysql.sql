-- Muratech CCTV Enterprise Security System
-- Production-Ready MySQL Database Schema Initialization Script

CREATE DATABASE IF NOT EXISTS muratech_cctv_db;
USE muratech_cctv_db;

-- 1. Contact Information Table (Singleton-like configuration)
CREATE TABLE IF NOT EXISTS contact_info (
    id VARCHAR(50) PRIMARY KEY,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    facebook VARCHAR(255),
    twitter VARCHAR(255),
    tiktok VARCHAR(255),
    instagram VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. SEO & Meta Settings Table (Singleton-like configuration)
CREATE TABLE IF NOT EXISTS seo_settings (
    id VARCHAR(50) PRIMARY KEY,
    meta_title VARCHAR(255) NOT NULL,
    meta_description TEXT NOT NULL,
    keywords TEXT NOT NULL, -- Stored as comma-separated list
    canonical_url VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Products Marketplace Table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'dome' | 'bullet' | 'ptz' | 'nvr' | 'accessories' | 'package'
    image TEXT NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    features TEXT NOT NULL, -- Stored as JSON string or comma-separated list
    resolution VARCHAR(50) NOT NULL,
    is_wireless BOOLEAN NOT NULL DEFAULT FALSE,
    rating DECIMAL(3, 2) NOT NULL DEFAULT 5.00,
    model_number VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Service Engineering Items Table
CREATE TABLE IF NOT EXISTS service_items (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(100) NOT NULL,
    features TEXT NOT NULL, -- Stored as JSON string or comma-separated list
    base_price DECIMAL(12, 2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Blogs & Security Intelligence Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'security' | 'technology' | 'installation' | 'corporate'
    author VARCHAR(100) NOT NULL,
    date VARCHAR(50) NOT NULL,
    image TEXT NOT NULL,
    is_news BOOLEAN NOT NULL DEFAULT FALSE,
    is_event BOOLEAN NOT NULL DEFAULT FALSE,
    event_date VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Gallery Showcase Table
CREATE TABLE IF NOT EXISTS gallery_items (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(20) NOT NULL, -- 'image' | 'video'
    url TEXT NOT NULL,
    caption TEXT NOT NULL,
    category VARCHAR(50) NOT NULL -- 'enterprise' | 'installation' | 'products' | 'team'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. FAQ Database Table
CREATE TABLE IF NOT EXISTS faqs (
    id VARCHAR(50) PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50) NOT NULL -- 'technical' | 'billing' | 'installation' | 'general'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Customer Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id VARCHAR(50) PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    text TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5,
    avatar TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Enterprise Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'mpesa_stk' | 'mpesa_c2b' | 'whatsapp'
    payment_status VARCHAR(50) NOT NULL, -- 'pending' | 'completed' | 'failed'
    date VARCHAR(50) NOT NULL,
    invoice_number VARCHAR(100) NOT NULL,
    receipt_number VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Relational Order Purchased Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Security Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(50) PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'create' | 'update' | 'delete' | 'payment' | 'email' | 'system'
    user VARCHAR(100) NOT NULL,
    timestamp VARCHAR(50) NOT NULL,
    details TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Security Settings / Admin Password Credentials
CREATE TABLE IF NOT EXISTS admin_credentials (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    updated_at VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
