# 🍃 MongoDB Installation & Setup Guide (Windows)

## Problem
```
❌ Error connecting to MongoDB: connect ECONNREFUSED ::1:27017
```

This error means MongoDB is not installed or not running on your system.

---

## Solution - Install MongoDB on Windows

### **Option 1: Install MongoDB Community Server (Recommended)**

#### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or higher)
   - Platform: Windows
   - Package: MSI
3. Click **Download**

#### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **Complete** installation
3. ✅ **IMPORTANT**: Check "Install MongoDB as a Service"
4. ✅ **IMPORTANT**: Check "Install MongoDB Compass" (GUI tool)
5. Complete the installation

#### Step 3: Verify Installation
Open PowerShell and run:
```powershell
mongod --version
```

You should see MongoDB version information.

#### Step 4: Start MongoDB Service
```powershell
# Start MongoDB service
net start MongoDB

# Check if MongoDB is running
Get-Service MongoDB
```

If service is already running, you'll see:
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Server
```

---

### **Option 2: Use MongoDB Atlas (Cloud - Free)**

If you don't want to install MongoDB locally, use MongoDB Atlas (cloud database):

#### Step 1: Create Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Create a free cluster (M0 - FREE tier)

#### Step 2: Setup Database
1. Create a database user (username + password)
2. Whitelist your IP (0.0.0.0/0 for development)
3. Get connection string

#### Step 3: Update .env file
Replace the connection string in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/office_management?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and the cluster URL with your actual values.

---

## Quick Fix - Test Without MongoDB

Your server is now updated to run even without MongoDB. You can:

1. **Continue with Phase 2** - Create models
2. **Install MongoDB later** - When you're ready to test database operations

The server will show a warning but won't crash.

---

## Verify MongoDB Connection

### Method 1: Using Browser
Open: http://localhost:5000/api/health

If MongoDB is connected, you'll see the health check response.

### Method 2: Using MongoDB Compass
1. Open MongoDB Compass (installed with MongoDB)
2. Connect to: `mongodb://localhost:27017`
3. You should see connection successful

### Method 3: Using PowerShell
```powershell
# Connect to MongoDB shell
mongosh

# OR (older version)
mongo
```

If it connects, MongoDB is running!

---

## Common MongoDB Commands (Windows)

```powershell
# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Restart MongoDB service
net stop MongoDB; net start MongoDB

# Check MongoDB status
Get-Service MongoDB

# Connect to MongoDB shell
mongosh
# OR
mongo
```

---

## Troubleshooting

### Issue 1: MongoDB Service Not Found
**Solution**: MongoDB is not installed. Follow Option 1 above.

### Issue 2: Access Denied
**Solution**: Run PowerShell as Administrator
```powershell
# Right-click PowerShell → Run as Administrator
net start MongoDB
```

### Issue 3: Port 27017 Already in Use
**Solution**: Another process is using port 27017
```powershell
# Find process using port 27017
netstat -ano | findstr :27017

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue 4: MongoDB Doesn't Start
**Solution**: Check MongoDB logs
```
C:\Program Files\MongoDB\Server\7.0\log\mongod.log
```

---

## Alternative: Use Docker (Advanced)

If you have Docker installed:

```powershell
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Check if running
docker ps

# Stop MongoDB
docker stop mongodb

# Start MongoDB
docker start mongodb
```

---

## Recommended Action

### For Quick Setup (5 minutes):
✅ **Use MongoDB Atlas (Option 2)** - No installation needed, just update .env

### For Local Development (15 minutes):
✅ **Install MongoDB Community Server (Option 1)** - Full control, works offline

---

## After MongoDB is Running

1. Restart your backend server:
```powershell
cd backend
npm run dev
```

2. You should see:
```
✅ MongoDB Connected: localhost
📊 Database: office_management
```

3. Continue with **Phase 2** to create database models!

---

## Need Help?

If you're still having issues:
1. Share the error message
2. Tell me which option you chose (Local or Atlas)
3. I'll help you debug!

---

**For now, your server is running without MongoDB. You can continue with Phase 2 to create models, and we'll test them once MongoDB is set up!** 🚀
