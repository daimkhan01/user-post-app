const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db/db");

// Sign up user
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // JWT token with the user ID
    const token = jwt.sign(
      { id: result.insertId, name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(201).json({
      user: {
        id: result.insertId,
        name,
        email,
      },
      token,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Log in user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!user.length || !(await bcrypt.compare(password, user[0].password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // JWT token with the user ID
    const token = jwt.sign(
      { id: user[0].id, name: user[0].name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
