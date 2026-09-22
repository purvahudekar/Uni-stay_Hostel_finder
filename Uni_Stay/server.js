// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// const PORT = 5000;
// const SECRET_KEY = "unistay_secret_key"; // Keep this simple for now

// // --- MIDDLEWARES ---
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.static(__dirname));

// // Serve the "uploads" folder publicly so the frontend can see the pictures
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // --- MULTER STORAGE CONFIGURATION ---
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Make sure to create an empty folder named 'uploads' in your backend directory!
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Saves file as something like: 17182938472.jpg
//     }
// });

// const upload = multer({ storage: storage });

// // --- MOCK DATABASE ---
// const users = [
//     { username: 'student', password: '123', role: 'student', name: 'John Doe' },
//     { username: 'owner', password: '123', role: 'owner', name: 'Mr. Landlord' }
// ];

// // FIXED: Declared 'hostels' ONLY ONCE with initial data included
// let hostels = [
//     {
//         id: 1,
//         name: "Sunshine Residency",
//         location: "2.5 km from Campus",
//         address: "123 University Road, Sector 4",
//         price: "₹8,500",
//         type: "Boys",
//         ac: true,
//         beds: "Double",
//         rating: 4.8,
//         reviews: 124,
//         image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//         gallery: [
//             "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//             "https://images.unsplash.com/photo-1522771731570-8682dc3a4332?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//             "https://images.unsplash.com/photo-1598928506311-c55dd1b31412?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//             "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//             "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//         ],
//         owner: "Rahul Sharma",
//         staffGender: "Male",
//         messQuality: "Excellent (Veg/Non-Veg)",
//         timings: "6:00 AM to 10:00 PM",
//         security: "24/7 Guards & CCTV",
//         features: ["WiFi", "Laundry", "AC", "Gym"],
//         feeStructure: { monthly: 8500, advance: 15000, deposit: 5000 },
//         reviewsList: [
//             { name: "Rahul Verma", date: "Oct 12, 2025", rating: 5, text: "Amazing hostel! The food is great and the gym is well-maintained.", isAnonymous: false },
//             { name: "Anonymous", date: "Sep 28, 2025", rating: 4, text: "Good place to stay. Security is strict which is good for safety.", isAnonymous: true },
//             { name: "Karan Singh", date: "Aug 15, 2025", rating: 5, text: "Highly recommend. Owner is very responsive to any issues.", isAnonymous: false }
//         ]
//     }
// ];

// // --- API ENDPOINTS ---

// // 1. Login Endpoint
// app.post('/api/login', (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username && u.password === password);

//     if (user) {
//         const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
//         res.json({ 
//             success: true, 
//             token: token, 
//             user: { name: user.name, role: user.role } 
//         });
//     } else {
//         res.status(401).json({ success: false, message: "Invalid credentials" });
//     }
// });

// // 2. Fetch all hostels (For Student Dashboard)
// app.get('/api/hostels', (req, res) => {
//     res.json(hostels);
// });

// // 3. Add a new hostel with Dynamic Multi-part Image File Uploads
// // Change upload middleware configuration to accept multiple specified fields
// const hostelUploadFields = upload.fields([
//     { name: 'hImage', maxCount: 1 },
//     { name: 'hDoc', maxCount: 1 }
// ]);

// app.post('/api/hostels', hostelUploadFields, (req, res) => {
//     try {
//         const bodyData = req.body; 

//         // Extract uploaded paths safely from req.files
//         let imageUrl = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800";
//         if (req.files && req.files['hImage']) {
//             imageUrl = `http://localhost:5000/uploads/${req.files['hImage'][0].filename}`;
//         }

//         let docUrl = "";
//         if (req.files && req.files['hDoc']) {
//             docUrl = `http://localhost:5000/uploads/${req.files['hDoc'][0].filename}`;
//         }

//         const newHostel = {
//             id: hostels.length > 0 ? hostels[hostels.length - 1].id + 1 : 1,
//             name: bodyData.name,
//             location: bodyData.location || "0.5 km from Campus",
//             address: bodyData.address,
//             price: bodyData.price,
//             type: bodyData.type,
//             ac: bodyData.ac === 'true',
//             beds: bodyData.beds,
//             rating: 5.0,
//             reviews: 0,
//             image: imageUrl,
//             document: docUrl, // SAVED DOCUMENT LINK REFRESHED HERE!
//             security: bodyData.security || "24/7 Guards",
//             staffGender: bodyData.staffGender || "Male",
//             messQuality: bodyData.messQuality || "Good Quality",
//             timings: bodyData.timings || "Flexible",
//             features: bodyData.features ? JSON.parse(bodyData.features) : ["Basic Amenities"],
//             gallery: [imageUrl],
//             reviewsList: [],
//             availableBeds: parseInt(bodyData.availableBeds) || 5
//         };

//         hostels.push(newHostel);
//         res.status(201).json({ success: true, hostel: newHostel });
//     } catch (error) {
//         console.error("Error adding hostel files:", error);
//         res.status(500).json({ success: false, message: "Server error processing assets" });
//     }
// });

// // --- START SERVER ---
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 5000;
const SECRET_KEY = "unistay_secret_key";

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve the "uploads" folder publicly so the frontend can see the pictures
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- MULTER STORAGE CONFIGURATION ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure an empty folder named 'uploads' exists in your backend folder!
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// --- DATABASE INTEGRATION ---
// Using SQLite database from db.js

let hostels = [];

// --- API ENDPOINTS ---

// Signup
app.post('/api/signup', (req, res) => {
    const { role, fullname, username, email, password, phone, hostelName } = req.body;

    const table = role === 'owner' ? 'hostel_owners' : 'students';

    // Check if user exists in their respective table
    db.get(`SELECT id FROM ${table} WHERE username = ? OR email = ?`, [username, email], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        if (row) {
            return res.status(400).json({ success: false, message: "Username or Email already exists" });
        }

        // Insert new user
        if (role === 'owner') {
            const stmt = db.prepare(`INSERT INTO hostel_owners (fullname, username, email, password, phone, hostelName) VALUES (?, ?, ?, ?, ?, ?)`);
            stmt.run([fullname, username, email, password, phone || '', hostelName || ''], function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: "Failed to register owner" });
                }
                res.status(201).json({ success: true, message: "Owner account created successfully" });
            });
            stmt.finalize();
        } else {
            const stmt = db.prepare(`INSERT INTO students (fullname, username, email, password) VALUES (?, ?, ?, ?)`);
            stmt.run([fullname, username, email, password], function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: "Failed to register student" });
                }
                res.status(201).json({ success: true, message: "Student account created successfully" });
            });
            stmt.finalize();
        }
    });
});

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // First try student
    db.get(`SELECT *, 'student' as role FROM students WHERE username = ? AND password = ?`, [username, password], (err, student) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (student) {
            const token = jwt.sign({ username: student.username, role: student.role }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({
                success: true,
                token: token,
                user: { name: student.fullname, role: student.role }
            });
        }

        // Try owner
        db.get(`SELECT *, 'owner' as role FROM hostel_owners WHERE username = ? AND password = ?`, [username, password], (err, owner) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (owner) {
                const token = jwt.sign({ username: owner.username, role: owner.role }, SECRET_KEY, { expiresIn: '1h' });
                return res.json({
                    success: true,
                    token: token,
                    user: { name: owner.fullname, role: owner.role, username: owner.username }
                });
            }

            // Fallback for hardcoded mock data
            if ((username === 'student' || username === 'owner') && password === '123') {
                const role = username;
                const token = jwt.sign({ username, role }, SECRET_KEY, { expiresIn: '1h' });
                return res.json({
                    success: true,
                    token: token,
                    user: { name: username === 'student' ? 'John Doe' : 'Mr. Landlord', role, username }
                });
            }
            res.status(401).json({ success: false, message: "Invalid credentials" });
        });
    });
});

// Fetch all hostels
app.get('/api/hostels', (req, res) => {
    const owner = req.query.owner_name;
    if (owner) {
        db.all(`SELECT * FROM hostels WHERE owner_name = ?`, [owner], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Database error" });
            }
            res.json(rows);
        });
    } else {
        db.all(`SELECT * FROM hostels`, [], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Database error" });
            }
            res.json(rows);
        });
    }
});

// NEW: Fetch a single hostel by ID (Crucial for the details page!)
app.get('/api/hostels/:id', (req, res) => {
    db.get(`SELECT * FROM hostels WHERE id = ?`, [req.params.id], (err, hostel) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        if (hostel) {
            res.json(hostel);
        } else {
            res.status(404).json({ success: false, message: "Hostel not found" });
        }
    });
});

// Add a new hostel with files
const hostelUploadFields = upload.fields([
    { name: 'hImage', maxCount: 1 },
    { name: 'hDoc', maxCount: 1 }
]);

app.post('/api/hostels', hostelUploadFields, (req, res) => {
    try {
        const bodyData = req.body;

        let imageUrl = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800";
        if (req.files && req.files['hImage'] && req.files['hImage'][0]) {
            imageUrl = `http://localhost:5000/uploads/${req.files['hImage'][0].filename}`;
        }

        let docUrl = "";
        if (req.files && req.files['hDoc'] && req.files['hDoc'][0]) {
            docUrl = `http://localhost:5000/uploads/${req.files['hDoc'][0].filename}`;
        }

        const stmt = db.prepare(`INSERT INTO hostels (
            owner_name, hostel_name, address, type, facilities_and_amenities, ac_availability, bed_type, monthly_rent, security_deposit, security_info, staff_gender, mess_quality_and_type, curfew_timings, hostel_photos, verification_documents
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

        stmt.run([
            bodyData.owner_name || 'unknown',
            bodyData.hostel_name || 'New Hostel',
            bodyData.address || 'Campus Road',
            bodyData.type || 'Boys',
            bodyData.facilities_and_amenities || '[]',
            bodyData.ac_availability || 'non-ac',
            bodyData.bed_type || 'Single',
            bodyData.monthly_rent || '8000',
            bodyData.security_deposit || '5000',
            bodyData.security_info || 'Guards',
            bodyData.staff_gender || 'Male',
            bodyData.mess_quality_and_type || 'Good',
            bodyData.curfew_timings || 'Flexible',
            imageUrl,
            docUrl
        ], function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Database error inserting hostel" });
            }
            res.status(201).json({ success: true, hostel: { id: this.lastID } });
        });
        stmt.finalize();
    } catch (error) {
        console.error("Error adding hostel files:", error);
        res.status(500).json({ success: false, message: "Server error processing assets" });
    }
    //////////////
    //     const Tesseract = require('tesseract.js');

    // // Inside your app.post('/api/hostels', upload.fields([...]), async (req, res) => {
    // // Detect if the document is valid
    // try {
    //     const docFile = req.files['hDoc'][0]; // your uploaded document file

    //     // Run OCR text extraction on the uploaded file buffer/path
    //     const { data: { text } } = await Tesseract.recognize(docFile.path, 'eng');

    //     // Define structural verification keywords
    //     const validKeywords = ['registration', 'certificate', 'license', 'municipality', 'tax', 'bill', 'official'];

    //     // Check if at least one official keyword exists in the extracted text
    //     const isValidDocument = validKeywords.some(keyword => text.toLowerCase().includes(keyword));

    //     if (!isValidDocument) {
    //         // Delete the uploaded file from server storage to keep it clean
    //         fs.unlinkSync(docFile.path); 
    //         return res.status(400).json({ 
    //             success: false, 
    //             message: "Verification Rejected: The uploaded document does not appear to be a valid official hostel certificate or license." 
    //         });
    //     }

    //     // Proceed with saving to database if valid...
    // } catch (error) {
    //     console.error("OCR Verification failed", error);
    // }
    //////////////

});

// DELETE hostel
app.delete('/api/hostels/:id', (req, res) => {
    db.run(`DELETE FROM hostels WHERE id = ?`, [req.params.id], function (err) {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        if (this.changes === 0) return res.status(404).json({ success: false, message: "Hostel not found" });
        res.json({ success: true, message: "Hostel deleted successfully" });
    });
});

// PUT hostel (Edit)
app.put('/api/hostels/:id', hostelUploadFields, (req, res) => {
    try {
        const bodyData = req.body;
        const id = req.params.id;

        db.get(`SELECT hostel_photos, verification_documents FROM hostels WHERE id = ?`, [id], (err, row) => {
            if (err) return res.status(500).json({ success: false, message: "Database error" });
            if (!row) return res.status(404).json({ success: false, message: "Hostel not found" });

            let imageUrl = row.hostel_photos;
            if (req.files && req.files['hImage'] && req.files['hImage'][0]) {
                imageUrl = `http://localhost:5000/uploads/${req.files['hImage'][0].filename}`;
            }

            let docUrl = row.verification_documents;
            if (req.files && req.files['hDoc'] && req.files['hDoc'][0]) {
                docUrl = `http://localhost:5000/uploads/${req.files['hDoc'][0].filename}`;
            }

            const stmt = db.prepare(`UPDATE hostels SET 
                hostel_name = ?, address = ?, type = ?, facilities_and_amenities = ?, ac_availability = ?, bed_type = ?, monthly_rent = ?, security_deposit = ?, security_info = ?, staff_gender = ?, mess_quality_and_type = ?, curfew_timings = ?, hostel_photos = ?, verification_documents = ?
                WHERE id = ?`);

            stmt.run([
                bodyData.hostel_name || 'New Hostel',
                bodyData.address || 'Campus Road',
                bodyData.type || 'Boys',
                bodyData.facilities_and_amenities || '[]',
                bodyData.ac_availability || 'non-ac',
                bodyData.bed_type || 'Single',
                bodyData.monthly_rent || '8000',
                bodyData.security_deposit || '5000',
                bodyData.security_info || 'Guards',
                bodyData.staff_gender || 'Male',
                bodyData.mess_quality_and_type || 'Good',
                bodyData.curfew_timings || 'Flexible',
                imageUrl,
                docUrl,
                id
            ], function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: "Database error updating hostel" });
                }
                res.status(200).json({ success: true, message: "Hostel updated successfully" });
            });
            stmt.finalize();
        });
    } catch (error) {
        console.error("Error updating hostel files:", error);
        res.status(500).json({ success: false, message: "Server error processing assets" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


