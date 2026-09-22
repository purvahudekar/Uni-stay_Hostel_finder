const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const dbPath = path.resolve(__dirname, 'unistay.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        db.serialize(() => {
            // Clean up old tables
            db.run(`DROP TABLE IF EXISTS users`);
            db.run(`DROP TABLE IF EXISTS hostels`);

            // Create students table
            db.run(`CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fullname TEXT NOT NULL,
                username TEXT UNIQUE NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL
            )`, (err) => {
                if (err) console.error("Error creating students table:", err.message);
                else console.log("Students table is ready.");
            });

            // Create hostel_owners table
            db.run(`CREATE TABLE IF NOT EXISTS hostel_owners (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fullname TEXT NOT NULL,
                username TEXT UNIQUE NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                phone TEXT NOT NULL,
                hostelName TEXT
            )`, (err) => {
                if (err) console.error("Error creating hostel_owners table:", err.message);
                else console.log("Hostel_owners table is ready.");
            });

            // Create hostels table
            db.run(`CREATE TABLE IF NOT EXISTS hostels (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                owner_name TEXT NOT NULL,
                hostel_name TEXT NOT NULL,
                address TEXT,
                type TEXT,
                facilities_and_amenities TEXT,
                ac_availability TEXT,
                bed_type TEXT,
                monthly_rent TEXT,
                security_deposit TEXT,
                security_info TEXT,
                staff_gender TEXT,
                mess_quality_and_type TEXT,
                curfew_timings TEXT,
                hostel_photos TEXT,
                verification_documents TEXT
            )`, (err) => {
                if (err) console.error("Error creating hostels table:", err.message);
                else console.log("Hostels table is ready.");
            });
        });
    }
});

module.exports = db;