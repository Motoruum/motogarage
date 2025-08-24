# MotoGarage Production Deployment Guide

## FTP Bilgileri
- **FTP Host:** ftp://195.35.49.18
- **FTP Username:** u456124799.minigaraj.store
- **FTP Port:** 21
- **Upload Folder:** public_html

## Deployment Adımları

### 1. Sunucu Hazırlığı

#### PostgreSQL Kurulumu
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# PostgreSQL servisini başlat
sudo systemctl start postgresql
sudo systemctl enable postgresql

# PostgreSQL kullanıcısına geç
sudo -u postgres psql

# Veritabanı oluştur
CREATE DATABASE motogarage;
CREATE USER motogarage_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE motogarage TO motogarage_user;
\q
```

#### Java 17 Kurulumu
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# Java versiyonunu kontrol et
java -version
```

#### Nginx Kurulumu
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# Nginx servisini başlat
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. Dosya Yükleme

#### FTP ile Dosya Yükleme
1. **FileZilla** veya **SmartFTP** kullanarak FTP'ye bağlan
2. `public_html` klasörüne geç
3. Aşağıdaki dosyaları yükle:

**Frontend Dosyaları:**
- `frontend-build/` klasörünün içindeki tüm dosyaları `public_html/` klasörüne yükle

**Backend Dosyaları:**
- `backend.jar` → `public_html/backend/`
- `application-prod.properties` → `public_html/backend/`
- `start-backend.sh` → `public_html/backend/`

**Nginx Konfigürasyonu:**
- `nginx.conf` → sunucu root dizinine (genellikle `/etc/nginx/sites-available/`)

### 3. Sunucu Konfigürasyonu

#### Nginx Konfigürasyonu
```bash
# Nginx konfigürasyonunu kopyala
sudo cp nginx.conf /etc/nginx/sites-available/minigaraj.store

# Symlink oluştur
sudo ln -s /etc/nginx/sites-available/minigaraj.store /etc/nginx/sites-enabled/

# Nginx syntax kontrolü
sudo nginx -t

# Nginx'i yeniden başlat
sudo systemctl reload nginx
```

#### Backend Servis Oluşturma
```bash
# Systemd service dosyası oluştur
sudo nano /etc/systemd/system/motogarage-backend.service
```

Service dosyası içeriği:
```ini
[Unit]
Description=MotoGarage Backend Service
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/html/backend
ExecStart=/usr/bin/java -jar backend.jar --spring.config.location=file:./application-prod.properties
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# Servisi etkinleştir ve başlat
sudo systemctl daemon-reload
sudo systemctl enable motogarage-backend
sudo systemctl start motogarage-backend
```

### 4. Güvenlik Ayarları

#### Firewall Konfigürasyonu
```bash
# UFW firewall kurulumu
sudo apt install ufw

# SSH, HTTP, HTTPS portlarını aç
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Firewall'u etkinleştir
sudo ufw enable
```

#### SSL Sertifikası (Opsiyonel)
```bash
# Certbot kurulumu
sudo apt install certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d minigaraj.store -d www.minigaraj.store
```

### 5. Test ve Doğrulama

#### Servis Durumu Kontrolü
```bash
# Backend servis durumu
sudo systemctl status motogarage-backend

# Nginx servis durumu
sudo systemctl status nginx

# PostgreSQL servis durumu
sudo systemctl status postgresql
```

#### Log Kontrolü
```bash
# Backend logları
sudo journalctl -u motogarage-backend -f

# Nginx logları
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

#### API Test
```bash
# API endpoint test
curl http://minigaraj.store/api/stock
curl http://minigaraj.store/health
```

### 6. Monitoring ve Bakım

#### Otomatik Backup
```bash
# PostgreSQL backup script
#!/bin/bash
BACKUP_DIR="/var/backups/motogarage"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump motogarage > $BACKUP_DIR/motogarage_$DATE.sql
```

#### Log Rotation
```bash
# Logrotate konfigürasyonu
sudo nano /etc/logrotate.d/motogarage-backend
```

## Sorun Giderme

### Yaygın Sorunlar

1. **Backend Başlamıyor**
   - Java versiyonunu kontrol et
   - Port 8080'in açık olduğunu kontrol et
   - Veritabanı bağlantısını kontrol et

2. **Frontend Yüklenmiyor**
   - Nginx konfigürasyonunu kontrol et
   - Dosya izinlerini kontrol et
   - SSL sertifikasını kontrol et

3. **API Çalışmıyor**
   - Backend servisinin çalıştığını kontrol et
   - Proxy ayarlarını kontrol et
   - CORS ayarlarını kontrol et

## İletişim
Sorun yaşarsanız logları kontrol edin ve gerekirse sistem yöneticisi ile iletişime geçin.
