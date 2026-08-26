طراحی API مدیریت تسک‌ها

 1. ساختار تسک‌ها
هر تسک شامل:
 id: عدد
 title: متن 
 completed: true/false
 createdAt: تاریخ

2 . مسیرهای API

| کاری که کاربر می‌خواهد | آدرس | متد |
|------------------------|------|-----|
| دیدن همه تسک‌ها | /api/tasks | GET |
| دیدن یک تسک | /api/tasks/1 | GET |
| ساختن تسک جدید | /api/tasks | POST |
| عوض کردن تسک | /api/tasks/1 | PUT |
| پاک کردن تسک | /api/tasks/1 | DELETE |

3. کدهای وضعیت

| وضعیت | کد |
|-------|-----|
| موفقیت آمیز | 200 |
| ساخته شد | 201 |
| حذف شد | 204 |
| اشتباه در درخواست | 400 |
| پیدا نشد | 404 |

4. ساختار پوشه‌ها

task-manager/
├── server.js
├── routes/
│   └── tasks.js
├── controllers/
│   └── taskController.js
├── data/
│   └── tasks.json
└── uploads/