# 🛠️ Installation & Setup Instructions

Complete step-by-step guide to set up TaskFlow locally.

## 📋 Prerequisites

Ensure you have the following installed:

### Required
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### Required for Database
Choose one:
- **MongoDB Local** - [Install Community Edition](https://docs.mongodb.com/manual/installation/)
- **MongoDB Atlas** - [Cloud Database (Free)](https://www.mongodb.com/cloud/atlas)

### Optional but Recommended
- **Git** - [Download](https://git-scm.com/)
- **Postman** - [Download](https://www.postman.com/) (for API testing)
- **VS Code** - [Download](https://code.visualstudio.com/) (code editor)

---

## 🚀 Installation Steps

### Step 1: Download/Clone Project

**Option A: Using Git**
```bash
git clone https://github.com/your-username/task-app-mern.git
cd task-app-mern
```

**Option B: Manual Download**
1. Download the ZIP file
2. Extract it to your desired location
3. Open terminal/command prompt in the extracted folder

---

### Step 2: Backend Setup

#### 2a. Install Dependencies
```bash
# Make sure you're in the root project directory (task-app-mern)
npm install
```

This will install:
- Express.js (server framework)
- Mongoose (MongoDB ODM)
- CORS (cross-origin handling)
- dotenv (environment variables)
- And other dependencies

#### 2b. Configure Environment Variables

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Or manually create `.env` with:
```env
MONGODB_URI=mongodb://localhost:27017/taskapp
PORT=5000
NODE_ENV=development
JWT_SECRET=your_random_secret_key_here
```

#### 2c. MongoDB Setup (Choose One)

**Option A: Local MongoDB**

For **Windows**:
1. Install MongoDB Community Edition
2. Run MongoDB service (usually auto-starts)
3. Verify: `mongod` in terminal should show connection info

For **macOS**:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Verify
mongosh
```

For **Linux (Ubuntu)**:
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskapp
```

#### 2d. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

**Keep this terminal open!**

---

### Step 3: Frontend Setup

#### 3a. Open New Terminal Window

Keep the backend terminal open and open a new terminal in the same project directory.

#### 3b. Navigate to Client Directory
```bash
cd client
```

#### 3c. Install Dependencies
```bash
npm install
```

This will install:
- React 18
- ReactDOM
- Axios (HTTP client)
- Lucide React (icons)
- React Scripts
- And other dependencies

#### 3d. Start Frontend Server
```bash
npm start
```

This will automatically open your browser to:
```
http://localhost:3000
```

You should see the TaskFlow application!

---

## ✅ Verification Checklist

After startup, verify everything works:

- [ ] Backend running on `http://localhost:5000`
- [ ] Terminal shows "✅ MongoDB Connected"
- [ ] Frontend running on `http://localhost:3000`
- [ ] Browser displays TaskFlow app
- [ ] Header shows "TaskFlow" title
- [ ] Can see "Add New Task" form
- [ ] Can type in the task input field

---

## 🧪 Test the Application

### Test Task Creation
1. Type "Test Task" in the input field
2. Click "Add Task"
3. Task should appear below the form

### Test Task Completion
1. Click the checkbox on a task
2. Task should appear dimmed with strikethrough

### Test Task Deletion
1. Click the trash icon on a task
2. Confirm deletion
3. Task should disappear

### Test Search
1. Type a keyword in the search box
2. Tasks should filter in real-time

---

## 📁 Project Structure After Setup

```
task-app-mern/
├── node_modules/              # Backend dependencies (created by npm install)
├── client/
│   ├── node_modules/          # Frontend dependencies (created by npm install)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # All component files
│   │   ├── api/
│   │   │   └── taskAPI.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── .env                        # Your environment variables
├── .env.example               # Template (do not modify)
├── .gitignore
├── server.js                  # Backend server
├── package.json               # Backend dependencies
├── README.md
├── QUICK_START.md
├── API_TESTING.md
└── SETUP.md                   # This file
```

---

## 🔧 Troubleshooting Setup Issues

### Issue: "MongoDB not found"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Check MongoDB is running: `mongosh` or `mongo` in terminal
- Or use MongoDB Atlas cloud database
- Verify MONGODB_URI in .env

### Issue: "Port 5000 already in use"
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Or change PORT in .env:
```env
PORT=5001
```

### Issue: "Port 3000 already in use"
```
Something is already running on port 3000
```

**Solution:**
```bash
# Same as above for port 3000
# Or let npm find a different port
```

### Issue: "npm: command not found"
```
npm: command not found
```

**Solution:**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart terminal after installation
- Verify: `node --version` and `npm --version`

### Issue: Dependencies not installing
```
npm ERR! Could not resolve dependency...
```

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: React app shows blank page
```
White screen with no error
```

**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Clear browser cache: Ctrl+Shift+Delete
4. Restart React dev server: `npm start`

### Issue: API calls failing in frontend
```
Failed to fetch from http://localhost:5000
```

**Solution:**
- Verify backend is running on port 5000
- Check CORS is enabled in server.js
- Verify API_URL in client/src/api/taskAPI.js
- Check for typos in .env files

---

## 🔄 Daily Startup Process

### First Terminal (Backend)
```bash
cd task-app-mern
npm run dev
```

### Second Terminal (Frontend)
```bash
cd task-app-mern/client
npm start
```

Application opens automatically at `http://localhost:3000`

---

## 📦 Key Dependencies Installed

### Backend
- **express** - Web server framework
- **mongoose** - MongoDB object modeling
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **nodemon** (dev) - Auto-reload on changes

### Frontend
- **react** - UI library
- **react-dom** - React DOM rendering
- **axios** - HTTP client
- **lucide-react** - Icon library
- **react-scripts** - Build tools

---

## 🚀 Next Steps

1. **Explore the App** - Create some test tasks
2. **Read README.md** - Full documentation
3. **Check API_TESTING.md** - Test API endpoints
4. **Customize** - Modify colors, add features
5. **Deploy** - Push to Heroku and Vercel

---

## 💡 Helpful Commands

### Backend Development
```bash
npm run dev      # Start with auto-reload
npm start        # Start server
node server.js   # Run directly
```

### Frontend Development
```bash
npm start        # Start dev server
npm build        # Build for production
npm test         # Run tests
npm eject        # Expose build config (not reversible!)
```

### Useful System Commands
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check which process is using a port
lsof -i :5000        # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill a process
kill -9 <PID>        # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

---

## 🆘 Getting Help

1. Check browser console (F12) for errors
2. Check terminal output for error messages
3. Verify all prerequisites are installed
4. Review QUICK_START.md for quick fixes
5. Check README.md for detailed documentation

---

## ✨ You're All Set!

Your TaskFlow application is now ready to use. Happy coding! 🎉

Need help? Check the documentation files or review the troubleshooting section above.
