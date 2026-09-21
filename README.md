# Task Manager API

یه REST API برای مدیریت فروشگاه اینترنتی، نوشته شده با Node.js و Express. کاربرها می‌تونن ثبت‌نام کنن، لاگین کنن (با JWT)، محصول اضافه کنن (همراه با آپلود عکس)، و کل عملیات CRUD روی محصولات و سفارش‌ها رو انجام بدن.

## چی داره

- احراز هویت با JWT
- آپلود فایل (Multer)
- اعتبارسنجی ورودی‌ها با express-validator
- دیتابیس SQLite از طریق Prisma
- مدیریت خطا به‌صورت متمرکز (یه middleware واحد برای همه‌ی ارورها)
- یه کالکشن Postman آماده برای تست سریع اندپوینت‌ها

## تکنولوژی‌ها

Node.js، Express، Prisma + SQLite، JWT، bcrypt، multer، express-validator، dotenv

## قبل از شروع لازم داری

- Node.js نسخه ۱۸ به بالا
- npm یا yarn

## راه‌اندازی

اول پروژه رو کلون کن:

```bash
git clone https://github.com/USERNAME/task-manager.git
cd task-manager
```

بعدش پکیج‌ها رو نصب کن:

```bash
npm install
```

یه فایل `.env` بساز و متغیرهای لازم (مثل `DATABASE_URL` و `JWT_SECRET`) رو توش تنظیم کن.

دیتابیس رو با Prisma بساز:

```bash
npx prisma migrate dev
```

و در نهایت پروژه رو اجرا کن:

```bash
npm run dev
```