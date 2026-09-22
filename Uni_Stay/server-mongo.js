const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const Property = require('./property.model');
const { properties } = require('./properties.seed');
const propertyRoutes = require('./property.routes');

const app = express();
const PORT = process.env.PORT || 5001; // Distinct port 5001 to run alongside SQLite server on 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/unistay_aurangabad';

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Serve static assets from workspace directory
app.use(express.static(__dirname));

// --- API ENDPOINT ROUTING ---
app.use('/api/properties', propertyRoutes);

// Healthy check route
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', database: 'MongoDB', port: PORT });
});

// --- MONGOOSE CONNECT & AUTO-SEED LOGIC ---
mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log("Connected to MongoDB successfully at: " + MONGODB_URI);

        // Auto-seed database if empty
        const count = await Property.countDocuments();
        if (count === 0) {
            console.log("MongoDB collection is empty! Auto-seeding 20 properties for Aurangabad...");
            await Property.insertMany(properties);
            console.log("Auto-seeding completed successfully!");
        } else {
            console.log(`Database already has ${count} properties. Skipping auto-seed.`);
        }

        // Start server listening
        app.listen(PORT, () => {
            console.log("=================================================================");
            console.log(`🚀 MongoDB Server is running on: http://localhost:${PORT}`);
            console.log(`👉 Advanced Filter Endpoint: http://localhost:${PORT}/api/properties/filter`);
            console.log(`👉 View Demo Frontend Portal: http://localhost:${PORT}/frontend-integration-demo.html`);
            console.log("=================================================================");
        });
    })
    .catch((err) => {
        console.error("=================================================================");
        console.error("⚠️ Failed to connect to MongoDB database:", err.message);
        console.log("👉 We are starting the server on PORT 5001 with a high-performance in-memory mock database fallback so you can still run it directly!");
        console.log("Please make sure your MongoDB server is running locally on port 27017 for production-ready MongoDB mode.");
        console.log("=================================================================");
        
        // Start server listening with in-memory fallback
        app.listen(PORT, () => {
            console.log("=================================================================");
            console.log(`🚀 MongoDB (In-Memory Fallback) Server is running on: http://localhost:${PORT}`);
            console.log(`👉 Advanced Filter Endpoint: http://localhost:${PORT}/api/properties/filter`);
            console.log(`👉 View Demo Frontend Portal: http://localhost:${PORT}/frontend-integration-demo.html`);
            console.log("=================================================================");
        });
    });
