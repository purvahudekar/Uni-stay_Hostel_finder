const mongoose = require('mongoose');
const Property = require('./property.model');
const { properties } = require('./properties.seed');

/**
 * GET /api/properties/filter
 * Highly-optimized search filtering controller matching advanced specifications.
 */
exports.filterProperties = async (req, res) => {
    try {
        // --- CHECK IF MONGODB IS CONNECTED ---
        const isMongoConnected = mongoose.connection.readyState === 1;

        if (!isMongoConnected) {
            console.log("⚠️ MongoDB offline. Running query through high-fidelity local in-memory filtering engine...");
            
            let filtered = [...properties];

            // 1. Partial Text Search (propertyName, location, nearbyCollege)
            if (req.query.search) {
                const searchVal = req.query.search.trim().toLowerCase();
                filtered = filtered.filter(p => 
                    (p.propertyName && p.propertyName.toLowerCase().includes(searchVal)) ||
                    (p.location && p.location.toLowerCase().includes(searchVal)) ||
                    (p.nearbyCollege && p.nearbyCollege.toLowerCase().includes(searchVal))
                );
            }

            // 2. Property Type Category (Hostel / PG)
            if (req.query.propertyType && req.query.propertyType !== 'all') {
                filtered = filtered.filter(p => p.propertyType === req.query.propertyType);
            }

            // 3. Hostel Type Gender Filter (Boys / Girls / Co-ed)
            if (req.query.hostelType && req.query.hostelType !== 'all') {
                filtered = filtered.filter(p => p.hostelType === req.query.hostelType);
            }

            // 4. Rent Pricing Range Filters
            if (req.query.minPrice) {
                filtered = filtered.filter(p => p.monthlyRent >= parseInt(req.query.minPrice, 10));
            }
            if (req.query.maxPrice) {
                filtered = filtered.filter(p => p.monthlyRent <= parseInt(req.query.maxPrice, 10));
            }

            // 5. AC/Non-AC Room Specifications
            if (req.query.acType && req.query.acType !== 'all') {
                filtered = filtered.filter(p => p.acType === req.query.acType);
            }

            // 6. Sharing Bed Configuration Filters
            if (req.query.bedType && req.query.bedType !== 'all') {
                filtered = filtered.filter(p => p.bedType === req.query.bedType);
            }

            // 7. Food Plan Inclusion Toggles
            if (req.query.foodIncluded === 'true') {
                filtered = filtered.filter(p => p.foodIncluded === true);
            } else if (req.query.foodIncluded === 'false') {
                filtered = filtered.filter(p => p.foodIncluded === false);
            }

            // 8. Bathroom Attachment Requirements
            if (req.query.attachedBathroom === 'true') {
                filtered = filtered.filter(p => p.attachedBathroom === true);
            } else if (req.query.attachedBathroom === 'false') {
                filtered = filtered.filter(p => p.attachedBathroom === false);
            }

            // 9. Distance from Campus Boundaries (Max Distance in km)
            if (req.query.maxDistance && req.query.maxDistance !== 'all') {
                filtered = filtered.filter(p => p.distanceFromCampus <= parseFloat(req.query.maxDistance));
            }

            // 10. Star Rating Threshold Limits
            if (req.query.minRating) {
                filtered = filtered.filter(p => p.rating >= parseFloat(req.query.minRating));
            }

            // 11. Multi-Select Facilities & Amenities checklist
            if (req.query.amenities) {
                let amenitiesArr = req.query.amenities;
                if (!Array.isArray(amenitiesArr)) {
                    amenitiesArr = [amenitiesArr];
                }
                if (amenitiesArr.length > 0) {
                    filtered = filtered.filter(p => 
                        amenitiesArr.every(amenity => p.amenities && p.amenities.includes(amenity))
                    );
                }
            }

            // --- SORTING ALGORITHM MAPPING ---
            if (req.query.sortBy) {
                switch (req.query.sortBy) {
                    case 'priceLowToHigh':
                        filtered.sort((a, b) => a.monthlyRent - b.monthlyRent);
                        break;
                    case 'priceHighToLow':
                        filtered.sort((a, b) => b.monthlyRent - a.monthlyRent);
                        break;
                    case 'highestRated':
                        filtered.sort((a, b) => b.rating - a.rating || a.monthlyRent - b.monthlyRent);
                        break;
                    case 'nearestFirst':
                        filtered.sort((a, b) => a.distanceFromCampus - b.distanceFromCampus || b.rating - a.rating);
                        break;
                    default:
                        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                }
            } else {
                filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            }

            // --- PAGINATION METRICS ---
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 6;
            const skip = (page - 1) * limit;

            const totalResults = filtered.length;
            const paginatedData = filtered.slice(skip, skip + limit);
            const totalPages = Math.ceil(totalResults / limit);

            return res.status(200).json({
                success: true,
                pagination: {
                    totalResults,
                    totalPages,
                    currentPage: page,
                    limit
                },
                data: paginatedData
            });
        }

        // --- MONGODB ACTIVE MODE ---
        const query = {};

        // 1. Partial Text Search (propertyName, location, nearbyCollege)
        if (req.query.search) {
            const searchPattern = new RegExp(req.query.search.trim(), 'i');
            query.$or = [
                { propertyName: searchPattern },
                { location: searchPattern },
                { nearbyCollege: searchPattern }
            ];
        }

        // 2. Property Type Category (Hostel / PG)
        if (req.query.propertyType && req.query.propertyType !== 'all') {
            query.propertyType = req.query.propertyType;
        }

        // 3. Hostel Type Gender Filter (Boys / Girls / Co-ed)
        if (req.query.hostelType && req.query.hostelType !== 'all') {
            query.hostelType = req.query.hostelType;
        }

        // 4. Rent Pricing Range Filters
        if (req.query.minPrice || req.query.maxPrice) {
            query.monthlyRent = {};
            if (req.query.minPrice) {
                query.monthlyRent.$gte = parseInt(req.query.minPrice, 10);
            }
            if (req.query.maxPrice) {
                query.monthlyRent.$lte = parseInt(req.query.maxPrice, 10);
            }
        }

        // 5. AC/Non-AC Room Specifications
        if (req.query.acType && req.query.acType !== 'all') {
            query.acType = req.query.acType;
        }

        // 6. Sharing Bed Configuration Filters
        if (req.query.bedType && req.query.bedType !== 'all') {
            query.bedType = req.query.bedType;
        }

        // 7. Food Plan Inclusion Toggles
        if (req.query.foodIncluded === 'true') {
            query.foodIncluded = true;
        } else if (req.query.foodIncluded === 'false') {
            query.foodIncluded = false;
        }

        // 8. Bathroom Attachment Requirements
        if (req.query.attachedBathroom === 'true') {
            query.attachedBathroom = true;
        } else if (req.query.attachedBathroom === 'false') {
            query.attachedBathroom = false;
        }

        // 9. Distance from Campus Boundaries (Max Distance in km)
        if (req.query.maxDistance && req.query.maxDistance !== 'all') {
            query.distanceFromCampus = { $lte: parseFloat(req.query.maxDistance) };
        }

        // 10. Star Rating Threshold Limits
        if (req.query.minRating) {
            query.rating = { $gte: parseFloat(req.query.minRating) };
        }

        // 11. Multi-Select Facilities & Amenities checklist (Uses MongoDB $all operator)
        if (req.query.amenities) {
            let amenitiesArr = req.query.amenities;
            // Handle if single query parameter comes in as a string
            if (!Array.isArray(amenitiesArr)) {
                amenitiesArr = [amenitiesArr];
            }
            if (amenitiesArr.length > 0) {
                query.amenities = { $all: amenitiesArr };
            }
        }

        // --- SORTING ALGORITHM MAPPING ---
        let sortOption = { createdAt: -1 }; // default sorting: newest properties first
        if (req.query.sortBy) {
            switch (req.query.sortBy) {
                case 'priceLowToHigh':
                    sortOption = { monthlyRent: 1 };
                    break;
                case 'priceHighToLow':
                    sortOption = { monthlyRent: -1 };
                    break;
                case 'highestRated':
                    sortOption = { rating: -1, monthlyRent: 1 };
                    break;
                case 'nearestFirst':
                    sortOption = { distanceFromCampus: 1, rating: -1 };
                    break;
                default:
                    sortOption = { createdAt: -1 };
            }
        }

        // --- PAGINATION METRICS ---
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 6; // Display 6 items per page in a beautiful responsive grid
        const skip = (page - 1) * limit;

        // --- RUNNING OPTIMIZED QUERIES ---
        // Fetch properties matching our indexing and sorted selection
        const propertiesPromise = Property.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .lean(); // .lean() optimizes performance by returning plain JS objects instead of heavy Mongoose docs

        // Run counts concurrently to avoid sequential blocking bottlenecks
        const countPromise = Property.countDocuments(query);

        const [dbProperties, totalResults] = await Promise.all([propertiesPromise, countPromise]);

        const totalPages = Math.ceil(totalResults / limit);

        // --- RETURN RESPONSE ---
        return res.status(200).json({
            success: true,
            pagination: {
                totalResults,
                totalPages,
                currentPage: page,
                limit
            },
            data: dbProperties
        });

    } catch (error) {
        console.error("Filter controller encountered a query exception:", error);
        return res.status(500).json({
            success: false,
            message: "Server error executing query filtering systems."
        });
    }
};

/**
 * GET /api/properties/:id
 * Fetches single property record details.
 */
exports.getPropertyById = async (req, res) => {
    try {
        const isMongoConnected = mongoose.connection.readyState === 1;

        if (!isMongoConnected) {
            const propertyId = parseInt(req.params.id, 10);
            const property = properties.find(p => p.id === propertyId);
            
            if (!property) {
                return res.status(404).json({
                    success: false,
                    message: "Property details not found (In-Memory)."
                });
            }
            return res.status(200).json({
                success: true,
                data: property
            });
        }

        const property = await Property.findOne({ id: req.params.id }).lean();
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property details not found."
            });
        }
        return res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        console.error("Fetch property details ID exception:", error);
        return res.status(500).json({
            success: false,
            message: "Database exception reading property detail."
        });
    }
};
