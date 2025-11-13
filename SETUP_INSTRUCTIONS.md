# 🚀 Phase 1 Setup Instructions

## ✅ Phase 1 Complete - Files Created!

All configuration files and folder structure have been created successfully!

## 📦 Next Steps - Install Dependencies

### Step 1: Install Backend Dependencies
Open a terminal in the backend folder and run:
```bash
cd backend
npm install
```

This will install:
- express
- mongoose
- dotenv
- cors
- axios
- express-validator
- bcryptjs
- jsonwebtoken
- nodemon (dev dependency)

### Step 2: Install Frontend Dependencies
Open another terminal in the frontend folder and run:
```bash
cd frontend
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- react-icons
- react-hook-form
- tailwindcss
- postcss
- autoprefixer
- vite
- And other dev dependencies

### Step 3: Verify MongoDB is Running
Make sure MongoDB is installed and running on your system:
- Windows: Start MongoDB service
- Mac/Linux: `sudo systemctl start mongod` or `brew services start mongodb-community`

### Step 4: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

## 🎉 What's Been Set Up

### Backend ✅
- ✅ Express server configuration
- ✅ MongoDB connection setup
- ✅ Environment variables (.env)
- ✅ Project structure (MVC pattern)
- ✅ CORS configuration
- ✅ Error handling middleware
- ✅ Health check endpoint

### Frontend ✅
- ✅ Vite + React setup
- ✅ Tailwind CSS configuration
- ✅ React Router setup
- ✅ Project structure (components, pages, services, etc.)
- ✅ Custom CSS utilities
- ✅ Proxy configuration for API calls

### Files Created:
```
Backend:
- package.json (with all dependencies)
- server.js (main server file)
- .env (environment variables)
- .env.example (template)
- .gitignore
- config/database.js (MongoDB connection)

Frontend:
- package.json (updated with dependencies)
- tailwind.config.js
- postcss.config.js
- vite.config.ts (updated with proxy)
- src/index.css (with Tailwind)
- src/App.tsx (updated)
- Folder structure (components, pages, services, context, utils)
```

## 🔍 Quick Test

After installing dependencies and starting both servers:

1. **Test Backend**: 
   - Open http://localhost:5000/api/health
   - You should see a JSON response

2. **Test Frontend**: 
   - Open http://localhost:5173
   - You should see the Office Management System welcome page

## 📝 Ready for Phase 2!

Once dependencies are installed and servers are running, you're ready to move to:
**Phase 2: Database Models** (Department & Employee models)

Just say: "**Start Phase 2**" when ready!

## ⚠️ Common Issues

**MongoDB Connection Error:**
- Make sure MongoDB is installed and running
- Check the connection string in backend/.env

**Port Already in Use:**
- Change PORT in backend/.env
- Change port in frontend/vite.config.ts

**Dependencies Installation Issues:**
- Try: `npm install --legacy-peer-deps`
- Or: Delete node_modules and package-lock.json, then run npm install again

---

**Status**: Phase 1 Setup Complete! 🎉
