const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.register = (req, res) => {
  const { username, password } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    const query = "INSERT INTO Users (username, password) VALUES (?, ?)";
    db.query(query, [username, hash], (err) => {
      if (err) throw err;
      res.send("User registered successfully!");
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM Users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(401).send("Invalid credentials");
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        res.send("Login successful!");
      } else {
        res.status(401).send("Invalid credentials");
      }
    });
  });
};
