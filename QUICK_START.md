# 🚀 TaskFlow - Quick Start Guide

Get TaskFlow running in 5 minutes!

## ⚡ Quick Start

### Prerequisites
- Node.js installed
- MongoDB running (local or Atlas)

### 1️⃣ Backend Setup (Terminal 1)

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your MongoDB URL (if needed)

# Start backend
npm run dev
```

**Backend ready at:** `http://localhost:5000`

### 2️⃣ Frontend Setup (Terminal 2)

```bash
cd client

# Install dependencies
npm install

# Start frontend
npm start
```

**Frontend opens at:** `http://localhost:3000`

## ✨ That's It! 

You now have a fully functional task management app running locally.

---

## 📚 Common Commands

### Backend
```bash
npm run dev    # Start with auto-reload (development)
npm start      # Start server (production)
```

### Frontend
```bash
npm start      # Start dev server
npm build      # Build for production
npm test       # Run tests
```

## 🔧 Useful Configurations

### Change MongoDB Connection
Edit `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/taskapp
```

Or use MongoDB Atlas (cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskapp
```

### Change Ports
Edit `.env`:
```env
PORT=5000      # Backend port
```

Frontend port is configured in `client/package.json` (usually 3000)

## 🎯 Features Overview

✅ **Create Tasks** - Add new tasks with title, description, priority
📝 **Edit Tasks** - Click edit icon or double-click to modify
✓ **Mark Complete** - Click checkbox to mark done
🔍 **Search & Filter** - Find tasks by title, priority, or status
📊 **View Statistics** - See completion rate and task counts
🗑️ **Delete Tasks** - Remove individual or all completed tasks

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB not connecting | Ensure MongoDB is running or update `MONGODB_URI` in `.env` |
| Port 5000 in use | Change `PORT` in `.env` or kill process: `lsof -i :5000` |
| API not responding | Verify backend is running and check console for errors |
| Frontend shows blank | Clear browser cache and restart `npm start` |
| Styling not loading | Ensure all files in `client/src/components/` have matching CSS files |

## 📱 Testing the App

1. **Add a Task**
   - Type "Learn MERN Stack"
   - Select priority "High"
   - Click "Add Task"

2. **Edit a Task**
   - Click the edit icon on the task
   - Change the title or priority
   - Click "Save"

3. **Complete a Task**
   - Click the checkbox to mark as complete
   - Task will appear dimmed

4. **Filter Tasks**
   - Click "Active" to show incomplete tasks
   - Click "High" to show high-priority tasks
   - Use search to find specific tasks

5. **Delete Tasks**
   - Click trash icon to delete individual task
   - Click "Clear Completed" to delete all completed tasks

## 🌐 API Endpoints (Quick Reference)

```
GET    /api/tasks                    - Get all tasks
POST   /api/tasks                    - Create task
PATCH  /api/tasks/:id                - Update task
DELETE /api/tasks/:id                - Delete task
GET    /api/stats                    - Get statistics
DELETE /api/tasks/completed/cleanup  - Delete completed tasks
```

## 📦 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/taskapp
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎨 Customization Tips

### Change Colors
Edit `client/src/App.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Change these hex colors to your preference */
```

### Change Font
Edit `client/public/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

### Add Categories
Edit `client/src/components/TaskForm.js`:
```javascript
const categories = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Learning', 'YOUR_CATEGORY'];
```

## 📚 File Descriptions

| File | Purpose |
|------|---------|
| `server.js` | Express server with all API routes |
| `client/src/App.js` | Main React component |
| `client/src/api/taskAPI.js` | Axios API client |
| `client/src/components/TaskForm.js` | Task creation form |
| `client/src/components/TaskItem.js` | Individual task component |
| `client/src/components/FilterBar.js` | Filter controls |
| `client/src/components/Stats.js` | Statistics display |

## 🚀 Next Steps

1. **Deploy Backend** - Push to Heroku or your cloud provider
2. **Deploy Frontend** - Deploy to Vercel or Netlify
3. **Add Features** - Authentication, task sharing, reminders, etc.
4. **Customize** - Adjust colors, fonts, and layout to match your brand
5. **Optimize** - Add caching, implement service workers for offline support

## 💡 Tips

- Use `Ctrl+Enter` to save when editing a task
- Press `Esc` to cancel editing
- Search works on both task title and description
- Statistics update in real-time
- Mobile-friendly - works great on phones and tablets

## 📞 Need Help?

1. Check the full README.md for detailed documentation
2. Review error messages in browser console (F12)
3. Verify backend is running with `http://localhost:5000`
4. Check that MongoDB is connected in terminal output

---

**Enjoy using TaskFlow! 🎉**

Happy task managing! 📝
