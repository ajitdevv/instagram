const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database(path.join(__dirname, 'database', 'users.db'), (err) => {
  if (err) {
    console.error('Failed to open database:', err);
  } else {
    console.log('Connected to SQLite database');
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error.' });
    }

    if (row) {
      if (row.password === password) {
        return res.json({ success: true, message: 'Login successful', user: { id: row.id, username: row.username } });
      }

      return res.status(401).json({ success: false, message: 'Invalid password.' });
    }

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function (insertErr) {
      if (insertErr) {
        if (insertErr.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ success: false, message: 'Username already exists.' });
        }
        return res.status(500).json({ success: false, message: 'Unable to create user.' });
      }

      return res.json({ success: true, message: 'Account created and logged in successfully', user: { id: this.lastID, username } });
    });
  });
});

app.get('/api/users', (req, res) => {
  db.all('SELECT id, username, password, email, created_at FROM users ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error.' });
    }
    return res.json({ success: true, users: rows });
  });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
