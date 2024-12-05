const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Student = require('./models/StudentTable');
const Professor = require('./models/ProffessorTable'); // Ensure you have a Professor model

const port = 3000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Connect to Database
mongoose.connect("mongodb+srv://collegeDB:collegeDB12345@collegedb.lbu3t.mongodb.net/yourdbname?retryWrites=true&w=majority&appName=CollegeDB")
  .then(() => console.log("Connected Successfully"))
  .catch((error) => console.log("Error when connecting to database", error));

// Home Route (serve frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    console.log('Received request body:', req.body);

    let user;
    let redirectUrl;

    if (userType === 'student') {
      user = await Student.findOne({ email });
      redirectUrl = '/indexS.html'; // Redirect to student home page
    } else if (userType === 'professor') {
      user = await Professor.findOne({ email });
      redirectUrl = '/indexP.html'; // Redirect to professor home page
    }
    console.log('Database user result:', user);

    if (!user) {
      return res.status(400).send("Email not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (isMatch) {
      console.log("Login successful, redirecting to", redirectUrl);
      return res.redirect(redirectUrl); // Redirect based on user type
    } else {
      return res.status(400).send("Invalid password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Wrong details");
  }
});

// Create a new student for testing purposes
app.get("/students/add", async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash("111", 10); // Hashing the password before saving
    
    const newStudent = new Student({
      email: "badawycs@gmail.com",
      password: passwordHash
    });

    await newStudent.save();
    console.log("New student saved:", newStudent);
    res.json({ message: "New student has been saved successfully", newStudent });
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(500).json({ message: "Error saving student", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
