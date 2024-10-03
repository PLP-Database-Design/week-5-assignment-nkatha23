const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();  // Load .env file into process.env

const app = express();
app.use(express.json());  // Parse JSON bodies

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test the connection to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Question 3: Filter patients by First Name
app.get('/patients/:first_name', (req, res) => {
    const firstName = req.params.first_name;
    const sql = 'SELECT * FROM patients WHERE first_name = ?';
    db.query(sql, [firstName], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Question 4: Retrieve all providers by their specialty
app.get('/providers/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const sql = 'SELECT * FROM providers WHERE provider_specialty = ?';
    db.query(sql, [specialty], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
