# Informatika Test Portali

Login orqali kiriladigan, ustoz test fayllarini joylaydigan va oquvchi ozi akkaunt ochib kiradigan sayt.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/abror27/TEST)

## Imkoniyatlar

- Ustoz login qilib PDF, DOCX, PPTX, XLSX, TXT, ZIP, RAR, JPG, PNG fayllarni yuklaydi
- Oquvchi ozi royxatdan otib login qiladi
- Oquvchi login qilib testlar royxatini koradi
- Student profil va parolni ozi boshqaradi
- Ustoz studentlarni bloklaydi, ochiradi va fayllarni edit/delete qiladi
- Online quiz yaratish, ishlash va natijalarni korish mumkin
- Yuklangan fayllar `storage/uploads` ichiga saqlanadi
- Fayl metamalumotlari `storage/tests.json` ichiga yoziladi
- Foydalanuvchilar `storage/users.json` ichiga saqlanadi
- Notification, activity, quiz va natijalar ham local fayllarda saqlanadi
- Sessiya `httpOnly` cookie bilan ishlaydi

## Ishga tushirish

1. `.env.example` dan nusxa olib `.env.local` oching
2. Kerak bolsa login va parollarni ozgartiring
3. Quyidagini ishga tushiring:

```bash
npm run dev
```

Brauzerda `http://localhost:3000` ni oching.

## Standart loginlar

- Ustoz: `ustoz` / `ustoz123`
- Oquvchi: `/register` sahifasi orqali ozi akkaunt ochadi

## Eslatma

- Hozirgi versiya demo uchun file-based storage ishlatadi
- Production uchun keyingi bosqichda database va haqiqiy user management qoshish tavsiya qilinadi

## Production deploy

Bu loyiha `static export` yoki `serverless` hosting uchun mos emas, chunki unda:

- `app/api/*` route-lar bor
- `httpOnly` cookie sessiya ishlatiladi
- fayl upload va JSON saqlash lokal diskka yoziladi

Shuning uchun saytni `Node.js server` yoki `Docker` bilan, persistent disk ulanadigan hostingga deploy qilish kerak.

Mos variantlar:

- VPS yoki oddiy Linux server
- Railway / Render / Coolify tipidagi Node host
- Docker ishlaydigan server

Mos emas:

- GitHub Pages
- oddiy static hosting
- Vercel serverless funksiyalari bilan default deploy

### Render bilan eng tez deploy

Repo ichida `render.yaml` tayyorlangan. Bir klik bilan deploy qilish uchun yuqoridagi Render tugmasini bosing yoki shu linkni oching:

`https://render.com/deploy?repo=https://github.com/abror27/TEST`

Deploy vaqtida:

- `TEACHER_PASSWORD` ni o'zingiz kiriting
- kerak bo'lsa servis nomini o'zgartiring
- persistent disk `/app/storage` ga ulanadi

Deploy tugagach sayt live URL bilan ochiladi.

### Kerakli environment

`.env.local` yoki server env ichida kamida quyidagilar bo'lsin:

```env
SESSION_SECRET=uzun-va-yashirin-secret
TEACHER_USERNAME=ustoz
TEACHER_PASSWORD=kuchli-parol
TEACHER_NAME=Informatika ustoz
DATA_DIR=./storage
HOSTNAME=0.0.0.0
PORT=3000
```

`DATA_DIR` ni absolute yo'lga ham berish mumkin. Masalan: `/var/lib/test-portal`.

### Node.js bilan deploy

Serverda:

```bash
npm ci
npm run build
npm run start
```

Sayt `PORT` va `HOSTNAME` env qiymatlari bilan ishga tushadi.

### Docker bilan deploy

Image build:

```bash
docker build -t test-portal .
```

Persistent volume bilan run:

```bash
docker run -d \
  --name test-portal \
  -p 3000:3000 \
  --env-file .env.local \
  -e DATA_DIR=/app/storage \
  -v test-portal-data:/app/storage \
  test-portal
```

### Reverse proxy

Productionda `nginx` yoki boshqa reverse proxy qo'yish tavsiya qilinadi:

- HTTPS
- upload hajmi limiti
- rate limiting
- request buffering va basic security

### OneDrive build eslatmasi

Loyiha OneDrive ichida bo'lsa, `.next` fayllari lock bo'lib qolishi mumkin. Shunda buildni boshqa papkaga chiqaring:

```powershell
$env:NEXT_DIST_DIR=".next-release"
npm run build
```
