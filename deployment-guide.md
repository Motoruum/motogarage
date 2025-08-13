# Motorcycle Stock Management - Deployment Guide

## 1. VPS Kurulumu

### Sunucu Gereksinimleri
- **RAM**: Minimum 2GB (4GB önerilen)
- **CPU**: 2 vCPU
- **Disk**: 20GB SSD
- **OS**: Ubuntu 20.04 LTS veya üzeri

### Temel Kurulum
```bash
# Sistem güncellemesi
sudo apt update && sudo apt upgrade -y

# Docker kurulumu
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose kurulumu
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Kullanıcıyı docker grubuna ekle
sudo usermod -aG docker $USER
```

## 2. Uygulama Deployment

### Proje Dosyalarını Sunucuya Yükleme
```bash
# Git kurulumu
sudo apt install git -y

# Projeyi klonlayın
git clone <your-repository-url>
cd motogarage

# Veya dosyaları manuel olarak yükleyin
# scp -r motogarage/ user@your-server-ip:/home/user/
```

### Environment Ayarları
```bash
# Production environment dosyası oluşturun
cp .env.example .env

# .env dosyasını düzenleyin
nano .env
```

`.env` dosyası içeriği:
```env
# Database
DB_HOST=db
DB_PORT=5432
DB_NAME=motogarage
DB_USER=postgres
DB_PASSWORD=your_secure_password

# Application
SPRING_PROFILES_ACTIVE=production
SERVER_PORT=8080

# Frontend
REACT_APP_API_URL=http://your-domain.com/api
```

### Docker Compose ile Çalıştırma
```bash
# Uygulamayı başlatın
docker-compose up -d

# Logları kontrol edin
docker-compose logs -f

# Servisleri kontrol edin
docker-compose ps
```

## 3. Domain ve SSL Kurulumu

### Domain Ayarları
1. Domain sağlayıcınızda A kaydı oluşturun
2. Sunucu IP adresinizi domain'e yönlendirin

### Nginx Kurulumu (Reverse Proxy)
```bash
# Nginx kurulumu
sudo apt install nginx -y

# Nginx konfigürasyonu
sudo nano /etc/nginx/sites-available/motogarage
```

Nginx konfigürasyonu:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Site'ı etkinleştirin
sudo ln -s /etc/nginx/sites-available/motogarage /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL Sertifikası (Let's Encrypt)
```bash
# Certbot kurulumu
sudo apt install certbot python3-certbot-nginx -y

# SSL sertifikası alın
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Otomatik yenileme için cron job
sudo crontab -e
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 4. Güvenlik Ayarları

### Firewall Kurulumu
```bash
# UFW kurulumu
sudo apt install ufw -y

# Firewall kuralları
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Database Güvenliği
```bash
# PostgreSQL güvenlik ayarları
sudo nano /etc/postgresql/13/main/postgresql.conf
# listen_addresses = 'localhost'

sudo nano /etc/postgresql/13/main/pg_hba.conf
# local all postgres peer
```

## 5. Backup Stratejisi

### Otomatik Backup Script
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup"
DB_CONTAINER="motogarage_db_1"

# Database backup
docker exec $DB_CONTAINER pg_dump -U postgres motogarage > $BACKUP_DIR/db_backup_$DATE.sql

# Application files backup
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz /home/user/motogarage

# 30 günden eski backup'ları sil
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

```bash
# Cron job ekleyin
crontab -e
# 0 2 * * * /home/user/backup.sh
```

## 6. Monitoring ve Logging

### Docker Compose ile Monitoring
```yaml
# docker-compose.yml'e ekleyin
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

## 7. Troubleshooting

### Yaygın Sorunlar
1. **Port çakışması**: `netstat -tulpn | grep :8080`
2. **Docker servisleri**: `docker-compose ps`
3. **Log kontrolü**: `docker-compose logs [service-name]`
4. **Disk alanı**: `df -h`

### Performans Optimizasyonu
```bash
# Docker cleanup
docker system prune -a

# Database index'leri kontrol edin
docker exec -it motogarage_db_1 psql -U postgres -d motogarage -c "\d+"
```

## 8. Güncelleme Süreci

### Uygulama Güncelleme
```bash
# Yeni versiyonu çekin
git pull origin main

# Servisleri yeniden başlatın
docker-compose down
docker-compose up -d --build

# Veritabanı migration'ları otomatik çalışır
```

## 9. Maliyet Tahmini

### Aylık Maliyet (DigitalOcean)
- **Basic Droplet (2GB RAM, 1 vCPU)**: ~$12/ay
- **Domain**: ~$10-15/yıl
- **SSL**: Ücretsiz (Let's Encrypt)
- **Toplam**: ~$12-15/ay

## 10. Son Kontroller

Deployment sonrası kontrol edilecekler:
- [ ] Uygulama erişilebilir mi?
- [ ] SSL sertifikası çalışıyor mu?
- [ ] Database bağlantısı var mı?
- [ ] Backup sistemi çalışıyor mu?
- [ ] Monitoring aktif mi?
- [ ] Güvenlik duvarı açık mı?

## Destek

Sorun yaşarsanız:
1. Docker loglarını kontrol edin
2. Nginx error loglarını inceleyin
3. Database bağlantısını test edin
4. Firewall ayarlarını kontrol edin
