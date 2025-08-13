# GitHub Repository Kurulumu

## 1. GitHub'da Repository Oluşturun

1. [GitHub.com](https://github.com) adresine gidin
2. Sağ üst köşedeki "+" butonuna tıklayın
3. "New repository" seçin
4. Repository adını girin: `motogarage`
5. "Public" seçin (ücretsiz için)
6. "Create repository" butonuna tıklayın

## 2. Projeyi GitHub'a Yükleyin

GitHub'da repository oluşturduktan sonra, size verilen komutları kullanın:

```bash
# Remote repository'yi ekleyin (URL'yi kendi repository'nizle değiştirin)
git remote add origin https://github.com/KULLANICI_ADINIZ/motogarage.git

# Main branch'e geçin
git branch -M main

# Projeyi GitHub'a yükleyin
git push -u origin main
```

## 3. Railway'e Geçin

GitHub'a yükledikten sonra:

1. [Railway.app](https://railway.app) adresine gidin
2. GitHub hesabınızla giriş yapın
3. "New Project" butonuna tıklayın
4. "Deploy from GitHub repo" seçin
5. `motogarage` repository'nizi seçin
6. "Deploy Now" butonuna tıklayın

## 4. Environment Variables Ekleyin

Railway dashboard'da:
1. "Variables" sekmesine gidin
2. Şu değişkenleri ekleyin:

```
DATABASE_URL=postgresql://postgres:password@db:5432/motogarage
SPRING_PROFILES_ACTIVE=production
SERVER_PORT=8080
REACT_APP_API_URL=https://your-app.railway.app/api
DB_PASSWORD=your_secure_password_here
```

## 5. Database Ekleme

Railway'de:
1. "New" butonuna tıklayın
2. "Database" seçin
3. "PostgreSQL" seçin
4. Database otomatik oluşturulacak

## 6. Deployment

Railway otomatik olarak:
- Projeyi build edecek
- Database'i bağlayacak
- SSL sertifikası verecek
- Uygulamayı yayınlayacak

## 🎉 Sonuç

Uygulamanız şu adreste çalışacak:
`https://your-app.railway.app`

## 🔧 Sorun Giderme

Eğer hata alırsanız:
1. Railway logs'u kontrol edin
2. Environment variables'ları kontrol edin
3. Database bağlantısını kontrol edin
