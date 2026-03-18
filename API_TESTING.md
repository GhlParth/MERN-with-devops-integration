# TaskFlow API Testing Guide

## Using Postman or cURL to Test API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

## 📋 Endpoints

### 1. Get All Tasks
**Endpoint:** `GET /api/tasks`

```bash
curl -X GET http://localhost:5000/api/tasks
```

**Query Parameters (Optional):**
```bash
# Filter by priority
curl -X GET "http://localhost:5000/api/tasks?priority=high"

# Filter by completion status
curl -X GET "http://localhost:5000/api/tasks?completed=true"

# Filter by category
curl -X GET "http://localhost:5000/api/tasks?category=Work"

# Search by keyword
curl -X GET "http://localhost:5000/api/tasks?search=learn"
```

---

### 2. Get Single Task
**Endpoint:** `GET /api/tasks/:id`

```bash
curl -X GET http://localhost:5000/api/tasks/TASK_ID_HERE
```

---

### 3. Create Task
**Endpoint:** `POST /api/tasks`

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn MERN Stack",
    "description": "Complete the MERN stack tutorial and build a project",
    "priority": "high",
    "category": "Learning",
    "tags": ["coding", "backend", "javascript"]
  }'
```

**Minimal Request:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Task"
  }'
```

---

### 4. Update Task
**Endpoint:** `PATCH /api/tasks/:id`

```bash
curl -X PATCH http://localhost:5000/api/tasks/TASK_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task Title",
    "description": "Updated description",
    "completed": true,
    "priority": "medium",
    "category": "Work"
  }'
```

**Mark as Complete:**
```bash
curl -X PATCH http://localhost:5000/api/tasks/TASK_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

**Change Priority:**
```bash
curl -X PATCH http://localhost:5000/api/tasks/TASK_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "priority": "high"
  }'
```

---

### 5. Delete Task
**Endpoint:** `DELETE /api/tasks/:id`

```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID_HERE
```

---

### 6. Get Statistics
**Endpoint:** `GET /api/stats`

```bash
curl -X GET http://localhost:5000/api/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTasks": 10,
    "completedTasks": 6,
    "activeTasks": 4,
    "highPriorityTasks": 2,
    "completionRate": 60,
    "priorityStats": [
      { "_id": "high", "count": 3 },
      { "_id": "medium", "count": 5 },
      { "_id": "low", "count": 2 }
    ]
  }
}
```

---

### 7. Bulk Update Tasks
**Endpoint:** `PATCH /api/tasks/bulk/update`

```bash
curl -X PATCH http://localhost:5000/api/tasks/bulk/update \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["TASK_ID_1", "TASK_ID_2", "TASK_ID_3"],
    "updates": {
      "completed": true,
      "category": "Work"
    }
  }'
```

---

### 8. Delete Completed Tasks
**Endpoint:** `DELETE /api/tasks/completed/cleanup`

```bash
curl -X DELETE http://localhost:5000/api/tasks/completed/cleanup
```

---

## 🧪 Postman Collection Example

Import this into Postman as a collection:

```json
{
  "info": {
    "name": "TaskFlow API",
    "description": "Complete API for TaskFlow application"
  },
  "item": [
    {
      "name": "Get All Tasks",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/tasks"
      }
    },
    {
      "name": "Create Task",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/tasks",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"title\": \"New Task\", \"priority\": \"high\"}"
        }
      }
    }
  ]
}
```

---

## 📝 Request/Response Examples

### Create Task - Full Request/Response

**Request:**
```http
POST /api/tasks HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "title": "Build TaskFlow App",
  "description": "Create a full-stack task management application",
  "priority": "high",
  "category": "Work",
  "tags": ["mern", "full-stack"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Build TaskFlow App",
    "description": "Create a full-stack task management application",
    "completed": false,
    "priority": "high",
    "category": "Work",
    "tags": ["mern", "full-stack"],
    "dueDate": null,
    "createdAt": "2024-03-17T10:30:00Z",
    "updatedAt": "2024-03-17T10:30:00Z"
  }
}
```

---

### Update Task - Full Request/Response

**Request:**
```http
PATCH /api/tasks/507f1f77bcf86cd799439011 HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "completed": true,
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Build TaskFlow App",
    "description": "Create a full-stack task management application",
    "completed": true,
    "priority": "medium",
    "category": "Work",
    "tags": ["mern", "full-stack"],
    "dueDate": null,
    "createdAt": "2024-03-17T10:30:00Z",
    "updatedAt": "2024-03-17T10:35:00Z"
  }
}
```

---

## ✅ Success Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

---

## ❌ Error Response Format

```json
{
  "success": false,
  "message": "Error description here"
}
```

**Common Error Responses:**

```json
// Invalid task title
{
  "success": false,
  "message": "Task title is required"
}

// Task not found
{
  "success": false,
  "message": "Task not found"
}

// Validation error
{
  "success": false,
  "message": "Task title cannot be more than 100 characters"
}
```

---

## 🧬 Data Validation

### Task Title
- Required
- Max 100 characters
- Cannot be empty

### Description
- Optional
- Max 500 characters

### Priority
- Enum: `low`, `medium`, `high`
- Default: `medium`

### Category
- Any string
- Default: `General`
- Common values: Work, Personal, Shopping, Health, Learning

### Tags
- Array of strings
- Optional

### DueDate
- ISO date string
- Optional

---

## 🔍 Query Parameters Examples

```bash
# Get all high priority tasks
GET /api/tasks?priority=high

# Get all completed tasks
GET /api/tasks?completed=true

# Get active work tasks
GET /api/tasks?completed=false&category=Work

# Search for tasks containing "meeting"
GET /api/tasks?search=meeting

# Combine multiple filters
GET /api/tasks?priority=high&completed=false&category=Work&search=important
```

---

## 📊 Statistics Response

```json
{
  "success": true,
  "data": {
    "totalTasks": 25,
    "completedTasks": 15,
    "activeTasks": 10,
    "highPriorityTasks": 3,
    "completionRate": "60.00",
    "priorityStats": [
      {
        "_id": "high",
        "count": 5
      },
      {
        "_id": "medium",
        "count": 12
      },
      {
        "_id": "low",
        "count": 8
      }
    ]
  }
}
```

---

## 🧪 Testing with JavaScript/Fetch

```javascript
// Get all tasks
fetch('http://localhost:5000/api/tasks')
  .then(res => res.json())
  .then(data => console.log(data));

// Create task
fetch('http://localhost:5000/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Task',
    priority: 'high'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Update task
fetch('http://localhost:5000/api/tasks/TASK_ID', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    completed: true
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Delete task
fetch('http://localhost:5000/api/tasks/TASK_ID', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 💡 Tips

- Always include `Content-Type: application/json` header for POST/PATCH requests
- Task IDs are MongoDB ObjectIds (24-character hex strings)
- All timestamps are in ISO 8601 format (UTC)
- Empty query parameter values are ignored
- Use filters to reduce response data size
- Bulk operations can update up to 100 tasks at once

---

Happy testing! 🚀
