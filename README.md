# 📝 Next.js 15 Blog App 🚀  

A **full-stack blog application** built with **Next.js 15**, **MongoDB**, and **Tailwind CSS**. This app allows users to **sign up, log in, create, edit, and delete blog posts**. Admin users have access to an **admin dashboard** for managing posts and users.  

## 🌟 Features  
✅ **User Authentication** – Sign up, log in, and manage sessions using email & password.  
✅ **Blog Post Management** – Create, update, and delete blog posts.  
✅ **Admin Dashboard** – Admin users can manage posts and users.  
✅ **Protected Routes** – Access control for user and admin sections.  
✅ **Session Handling** – Secure cookies for authentication.  
✅ **SEO Friendly** – Optimized with metadata and fast performance.  
✅ **Fully Responsive** – Mobile-friendly UI with Tailwind CSS.  

## 🛠️ Tech Stack  
- **Frontend**: Next.js 15, React, Tailwind CSS  
- **Backend**: Next.js API Routes, Node.js, Express  
- **Database**: MongoDB (Mongoose ORM)  
- **Authentication**: Session-based with encrypted cookies  
- **Deployment**: Vercel / DigitalOcean  

## 📂 Folder Structure  
/src ├── app/ │ ├── dashboard/ # Admin dashboard (protected) │ ├── posts/ # Blog post pages │ ├── auth/ # Login & Register pages │ ├── home/ # Main home page ├── components/ # Reusable UI components ├── lib/ # Utility functions & database connections ├── middleware.js # Middleware for route protection ├── styles/ # Global styles ├── pages/api/ # API routes (Next.js backend)   
## 🚀 Getting Started  
### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/yourusername/nextjs15-blog-app.git
cd nextjs15-blog-app

npm install
Set Up Environment Variables
Create a .env.local file in the root directory and add:

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
npm run dev
