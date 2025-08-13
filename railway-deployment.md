# Railway ile Ücretsiz Deployment

## 🚀 Railway - Tamamen Ücretsiz Platform

### Avantajlar
- ✅ **Tamamen ücretsiz** (500 saat/ay)
- ✅ **Otomatik deployment**
- ✅ **SSL sertifikası otomatik**
- ✅ **PostgreSQL database dahil**
- ✅ **GitHub entegrasyonu**
- ✅ **Custom domain desteği**

## 1. Railway Hesabı Oluşturma

1. [railway.app](https://railway.app) adresine gidin
2. GitHub hesabınızla giriş yapın
3. "New Project" butonuna tıklayın

## 2. Proje Yükleme

### Seçenek 1: GitHub Repository
```bash
# Projenizi GitHub'a yükleyin
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/motogarage.git
git push -u origin main
```

### Seçenek 2: Manuel Upload
1. Railway'de "Deploy from GitHub" seçin
2. Repository'nizi seçin
3. "Deploy Now" butonuna tıklayın

## 3. Environment Variables

Railway dashboard'da şu environment variables'ları ekleyin:

```env
# Database (Railway otomatik oluşturur)
DATABASE_URL=postgresql://...

# Spring Boot
SPRING_PROFILES_ACTIVE=production
SERVER_PORT=$PORT

# Frontend
REACT_APP_API_URL=https://your-app.railway.app/api
```

## 4. Railway Configuration

### railway.json dosyası oluşturun:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE"
  },
  "deploy": {
    "startCommand": "docker-compose up",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

## 5. Docker Compose Güncelleme

Railway için `docker-compose.yml` dosyasını güncelleyin:

```yaml
version: '3.8'

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: motogarage
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 3

  backend:
    build: ./backend
    environment:
      SPRING_DATASOURCE_URL: ${DATABASE_URL}
      SPRING_PROFILES_ACTIVE: production
      SERVER_PORT: ${PORT}
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "${PORT}:${PORT}"

  frontend:
    build: ./frontend
    environment:
      REACT_APP_API_URL: ${REACT_APP_API_URL}
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

## 6. Backend Dockerfile Güncelleme

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

## 7. Frontend Dockerfile Güncelleme

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
```

## 8. Deployment Adımları

1. **Railway'de proje oluşturun**
2. **GitHub repository'nizi bağlayın**
3. **Environment variables ekleyin**
4. **Deploy butonuna tıklayın**

## 9. Custom Domain (İsteğe Bağlı)

1. Railway dashboard'da "Settings" sekmesine gidin
2. "Domains" bölümünde domain'inizi ekleyin
3. DNS ayarlarını yapın

## 10. Monitoring

Railway dashboard'da:
- **Logs**: Canlı log görüntüleme
- **Metrics**: CPU, RAM kullanımı
- **Deployments**: Deployment geçmişi

## 🎉 Sonuç

Uygulamanız şu adreste çalışacak:
- **Railway URL**: `https://your-app.railway.app`
- **Custom Domain**: `https://your-domain.com` (isteğe bağlı)

## 💡 İpuçları

1. **Database**: Railway otomatik PostgreSQL oluşturur
2. **SSL**: Otomatik olarak aktif
3. **Scaling**: Gerektiğinde ücretli plana geçebilirsiniz
4. **Backup**: Railway otomatik backup alır

## 🔧 Troubleshooting

### Yaygın Sorunlar:
1. **Port hatası**: `$PORT` environment variable kullanın
2. **Database bağlantısı**: `DATABASE_URL` kontrol edin
3. **Build hatası**: Dockerfile'ları kontrol edin

### Log Kontrolü:
```bash
# Railway CLI ile log görüntüleme
railway login
railway logs
```

## 📊 Maliyet: $0/ay

Railway ile tamamen ücretsiz hosting!
