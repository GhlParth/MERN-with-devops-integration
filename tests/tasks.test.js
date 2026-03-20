const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

// ─────────────────────────────────────────────
// These tests run against MONGODB_URI_TEST
// Never against your production Atlas cluster
// ─────────────────────────────────────────────

let createdTaskId;

afterAll(async () => {
  // Clean up test data and close connection
  await mongoose.connection.dropCollection('tasks').catch(() => {});
  await mongoose.connection.close();
});

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
describe('GET /', () => {
  it('should return API running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/running/i);
  });
});

// ─────────────────────────────────────────────
// CREATE TASK
// ─────────────────────────────────────────────
describe('POST /api/tasks', () => {
  it('should create a task with valid data', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test task', priority: 'high', category: 'Work' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Test task');
    expect(res.body.data.priority).toBe('high');
    expect(res.body.data.completed).toBe(false);

    // Save for use in later tests
    createdTaskId = res.body.data._id;
  });

  it('should create task with default priority if not provided', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Default priority task' });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.priority).toBe('medium');
  });

  it('should reject task with no title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ description: 'Missing title' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject task with empty title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '   ' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject task with invalid priority value', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Bad priority', priority: 'critical' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject title exceeding 100 characters', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'a'.repeat(101) });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ─────────────────────────────────────────────
// GET ALL TASKS
// ─────────────────────────────────────────────
describe('GET /api/tasks', () => {
  it('should return all tasks', async () => {
    const res = await request(app).get('/api/tasks');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(typeof res.body.count).toBe('number');
  });

  it('should filter tasks by priority', async () => {
    const res = await request(app).get('/api/tasks?priority=high');

    expect(res.statusCode).toBe(200);
    res.body.data.forEach(task => {
      expect(task.priority).toBe('high');
    });
  });

  it('should filter tasks by completed status', async () => {
    const res = await request(app).get('/api/tasks?completed=false');

    expect(res.statusCode).toBe(200);
    res.body.data.forEach(task => {
      expect(task.completed).toBe(false);
    });
  });

  it('should return matching tasks for search query', async () => {
    const res = await request(app).get('/api/tasks?search=Test');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ─────────────────────────────────────────────
// GET SINGLE TASK
// ─────────────────────────────────────────────
describe('GET /api/tasks/:id', () => {
  it('should return a task by valid id', async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(createdTaskId);
  });

  it('should return 404 for non-existent id', async () => {
    const res = await request(app).get('/api/tasks/000000000000000000000000');

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('should return 500 for malformed id', async () => {
    const res = await request(app).get('/api/tasks/not-a-valid-id');

    expect(res.statusCode).toBe(500);
  });
});

// ─────────────────────────────────────────────
// UPDATE TASK
// ─────────────────────────────────────────────
describe('PATCH /api/tasks/:id', () => {
  it('should mark task as completed', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${createdTaskId}`)
      .send({ completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.completed).toBe(true);
  });

  it('should update task title', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${createdTaskId}`)
      .send({ title: 'Updated title' });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('Updated title');
  });

  it('should update task priority', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${createdTaskId}`)
      .send({ priority: 'low' });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.priority).toBe('low');
  });

  it('should return 404 for non-existent task', async () => {
    const res = await request(app)
      .patch('/api/tasks/000000000000000000000000')
      .send({ completed: true });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

// ─────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────
describe('GET /api/stats', () => {
  it('should return stats with all required fields', async () => {
    const res = await request(app).get('/api/stats');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('totalTasks');
    expect(res.body.data).toHaveProperty('completedTasks');
    expect(res.body.data).toHaveProperty('activeTasks');
    expect(res.body.data).toHaveProperty('highPriorityTasks');
    expect(res.body.data).toHaveProperty('completionRate');
    expect(res.body.data).toHaveProperty('priorityStats');
  });

  it('completionRate should be a valid number between 0 and 100', async () => {
    const res = await request(app).get('/api/stats');
    const rate = parseFloat(res.body.data.completionRate);

    expect(rate).toBeGreaterThanOrEqual(0);
    expect(rate).toBeLessThanOrEqual(100);
  });
});

// ─────────────────────────────────────────────
// BULK UPDATE
// ─────────────────────────────────────────────
describe('PATCH /api/tasks/bulk/update', () => {
  it('should reject bulk update with no ids', async () => {
    const res = await request(app)
      .patch('/api/tasks/bulk/update')
      .send({ ids: [], updates: { completed: true } });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should bulk update valid task ids', async () => {
    const res = await request(app)
      .patch('/api/tasks/bulk/update')
      .send({ ids: [createdTaskId], updates: { priority: 'medium' } });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ─────────────────────────────────────────────
// DELETE TASK
// ─────────────────────────────────────────────
describe('DELETE /api/tasks/:id', () => {
  it('should delete an existing task', async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should return 404 when deleting non-existent task', async () => {
    const res = await request(app).delete('/api/tasks/000000000000000000000000');

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

// ─────────────────────────────────────────────
// DELETE COMPLETED TASKS
// ─────────────────────────────────────────────
describe('DELETE /api/tasks/completed/cleanup', () => {
  it('should delete all completed tasks', async () => {
    // First create a completed task
    const create = await request(app)
      .post('/api/tasks')
      .send({ title: 'Cleanup test task' });

    await request(app)
      .patch(`/api/tasks/${create.body.data._id}`)
      .send({ completed: true });

    const res = await request(app).delete('/api/tasks/completed/cleanup');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

// ─────────────────────────────────────────────
// 404 HANDLER
// ─────────────────────────────────────────────
describe('Unknown routes', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown-route');

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});