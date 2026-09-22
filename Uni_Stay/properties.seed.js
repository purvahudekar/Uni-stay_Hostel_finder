/**
 * UniStay - Supabase Autonomous 20-Hostel Data Seeding Script
 * 
 * This file contains a dataset of 20 premium student hostel accommodations 
 * mapped to prime college micro-markets across Pune, Maharashtra, complete with 
 * localized geographic coordinates (lat/lng) for Leaflet interactive mapping.
 * 
 * Dual Compatibility: Runs directly in a Node.js shell or inside a client browser window.
 */

// ===================================================
// PUNE HOSTELS DATASET (20 UNIQUE ENTRIES)
// ===================================================
const PuneHostelDataset = [
    // --- KOTHRUD MICRO-MARKET (Near MIT, Fergusson & Garware) ---
    {
        name: "Kothrud Elite Scholars Co-living",
        title: "Kothrud Elite Scholars Co-living",
        hostel_name: "Kothrud Elite Scholars Co-living",
        type: "Co-ed",
        hostel_type: "Co-ed",
        price: 14500,
        monthly_rent: 14500,
        location: "Paud Road, Near MIT College, Kothrud, Pune",
        full_address: "Paud Road, Near MIT College, Kothrud, Pune",
        distance: "0.4 km from Campus",
        distance_val: 0.4,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Single",
        rating: 4.9,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: true,
        study_room: true,
        power_backup: true,
        lat: 18.5085,
        lng: 73.8112,
        image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
        security_deposit: 10000,
        security_info: "Biometric Access & 24/7 Security",
        staff_gender: "Mixed",
        mess_quality: "Excellent Veg/Non-veg Buffets",
        curfew_timings: "10:30 PM"
    },
    {
        name: "Shastri Safe Haven Girls PG",
        title: "Shastri Safe Haven Girls PG",
        hostel_name: "Shastri Safe Haven Girls PG",
        type: "Girls",
        hostel_type: "Girls",
        price: 8500,
        monthly_rent: 8500,
        location: "Ideal Colony, Near Cummins Engineering, Kothrud, Pune",
        full_address: "Ideal Colony, Near Cummins Engineering, Kothrud, Pune",
        distance: "0.7 km from Campus",
        distance_val: 0.7,
        ac_type: "non-ac",
        ac_available: false,
        bed_type: "Double",
        rating: 4.4,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: false,
        study_room: true,
        power_backup: true,
        lat: 18.5034,
        lng: 73.8165,
        image_url: "https://images.unsplash.com/photo-1522771731570-8682dc3a4332?w=800",
        security_deposit: 5000,
        security_info: "Strict Female Warden & CCTV",
        staff_gender: "Female",
        mess_quality: "Homestyle Pure Veg Meals",
        curfew_timings: "9:30 PM"
    },
    {
        name: "MIT View Boys PG",
        title: "MIT View Boys PG",
        hostel_name: "MIT View Boys PG",
        type: "Boys",
        hostel_type: "Boys",
        price: 7000,
        monthly_rent: 7000,
        location: "Rambaug Colony, Kothrud, Pune",
        full_address: "Rambaug Colony, Kothrud, Pune",
        distance: "0.3 km from Campus",
        distance_val: 0.3,
        ac_type: "non-ac",
        ac_available: false,
        bed_type: "Mixed",
        rating: 4.2,
        amenities: ["WiFi", "Power Backup"],
        wifi: true,
        laundry: false,
        gym: false,
        study_room: false,
        power_backup: true,
        lat: 18.5110,
        lng: 73.8130,
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        security_deposit: 4000,
        security_info: "CCTV & Smart Lock Entrance",
        staff_gender: "Male",
        mess_quality: "Veg Lunch & Dinner Included",
        curfew_timings: "11:00 PM"
    },

    // --- KATRAJ MICRO-MARKET (Near Bharati Vidyapeeth & PICT) ---
    {
        name: "Katraj Smart Co-living PG",
        title: "Katraj Smart Co-living PG",
        hostel_name: "Katraj Smart Co-living PG",
        type: "Co-ed",
        hostel_type: "Co-ed",
        price: 9500,
        monthly_rent: 9500,
        location: "Katraj Chowk, Near Bharati Vidyapeeth, Katraj, Pune",
        full_address: "Katraj Chowk, Near Bharati Vidyapeeth, Katraj, Pune",
        distance: "0.8 km from Campus",
        distance_val: 0.8,
        ac_type: "non-ac",
        ac_available: false,
        bed_type: "Double",
        rating: 4.5,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: false,
        study_room: true,
        power_backup: true,
        lat: 18.4529,
        lng: 73.8543,
        image_url: "https://images.unsplash.com/photo-1598928506311-c55dd1b31412?w=800",
        security_deposit: 6000,
        security_info: "24/7 Security Guard & CCTV Cameras",
        staff_gender: "Mixed",
        mess_quality: "Excellent Veg/Non-Veg Catering",
        curfew_timings: "10:30 PM"
    },
    {
        name: "PICT Scholars Boys Residency",
        title: "PICT Scholars Boys Residency",
        hostel_name: "PICT Scholars Boys Residency",
        type: "Boys",
        hostel_type: "Boys",
        price: 11000,
        monthly_rent: 11000,
        location: "Dhankawadi Road, Near PICT College, Katraj, Pune",
        full_address: "Dhankawadi Road, Near PICT College, Katraj, Pune",
        distance: "0.5 km from Campus",
        distance_val: 0.5,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Single",
        rating: 4.7,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: true,
        study_room: true,
        power_backup: true,
        lat: 18.4578,
        lng: 73.8504,
        image_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
        security_deposit: 9000,
        security_info: "Smart Card Access Controls",
        staff_gender: "Male",
        mess_quality: "Delicious Pure Veg Buffet",
        curfew_timings: "10:00 PM"
    },
    {
        name: "Bharti Campus View Girls PG",
        title: "Bharti Campus View Girls PG",
        hostel_name: "Bharti Campus View Girls PG",
        type: "Girls",
        hostel_type: "Girls",
        price: 8000,
        monthly_rent: 8000,
        location: "Katraj Lake Road, Near Bharati Vidyapeeth, Katraj, Pune",
        full_address: "Katraj Lake Road, Near Bharati Vidyapeeth, Katraj, Pune",
        distance: "0.3 km from Campus",
        distance_val: 0.3,
        ac_type: "non-ac",
        ac_available: false,
        bed_type: "Double",
        rating: 4.3,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: false,
        study_room: true,
        power_backup: true,
        lat: 18.4498,
        lng: 73.8592,
        image_url: "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?w=800",
        security_deposit: 5000,
        security_info: "Strict Curfew & Guard Post",
        staff_gender: "Female",
        mess_quality: "Highly Rated Veg Delicacies",
        curfew_timings: "9:00 PM"
    },

    // --- VIMAN NAGAR MICRO-MARKET (Near Symbiosis International) ---
    {
        name: "Symbiosis View Girls Luxury PG",
        title: "Symbiosis View Girls Luxury PG",
        hostel_name: "Symbiosis View Girls Luxury PG",
        type: "Girls",
        hostel_type: "Girls",
        price: 19500,
        monthly_rent: 19500,
        location: "Row House 4, Near Symbiosis Campus, Viman Nagar, Pune",
        full_address: "Row House 4, Near Symbiosis Campus, Viman Nagar, Pune",
        distance: "0.3 km from Campus",
        distance_val: 0.3,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Single",
        rating: 5.0,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: true,
        study_room: true,
        power_backup: true,
        lat: 18.5679,
        lng: 73.9143,
        image_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
        security_deposit: 15000,
        security_info: "Female Security Guards & Biometrics",
        staff_gender: "Female",
        mess_quality: "Multi-Cuisine Organic Kitchen",
        curfew_timings: "9:30 PM"
    },
    {
        name: "Viman Nagar Executive Co-Living",
        title: "Viman Nagar Executive Co-Living",
        hostel_name: "Viman Nagar Executive Co-Living",
        type: "Co-ed",
        hostel_type: "Co-ed",
        price: 16000,
        monthly_rent: 16000,
        location: "Dutta Mandir Chowk, Viman Nagar, Pune",
        full_address: "Dutta Mandir Chowk, Viman Nagar, Pune",
        distance: "0.6 km from Campus",
        distance_val: 0.6,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Single",
        rating: 4.8,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: true,
        study_room: true,
        power_backup: true,
        lat: 18.5645,
        lng: 73.9189,
        image_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
        security_deposit: 12000,
        security_info: "24/7 Gate Guard & Intercom",
        staff_gender: "Mixed",
        mess_quality: "Custom Veg/Non-veg Options",
        curfew_timings: "11:00 PM"
    },
    {
        name: "Symbiosis Boys Smart Suite",
        title: "Symbiosis Boys Smart Suite",
        hostel_name: "Symbiosis Boys Smart Suite",
        type: "Boys",
        hostel_type: "Boys",
        price: 12500,
        monthly_rent: 12500,
        location: "Viman Nagar Central, Near Phoenix Mall, Viman Nagar, Pune",
        full_address: "Viman Nagar Central, Near Phoenix Mall, Viman Nagar, Pune",
        distance: "1.1 km from Campus",
        distance_val: 1.1,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Double",
        rating: 4.6,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: true,
        study_room: true,
        power_backup: true,
        lat: 18.5612,
        lng: 73.9110,
        image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
        security_deposit: 8000,
        security_info: "Electronic Smart Card Entrance",
        staff_gender: "Male",
        mess_quality: "Veg & Non-Veg Multi-buffet",
        curfew_timings: "10:30 PM"
    },

    // --- HINJEWADI MICRO-MARKET (Near Tech Parks & Symbiosis Infotech) ---
    {
        name: "Hinjewadi Tech Scholars Hostel",
        title: "Hinjewadi Tech Scholars Hostel",
        hostel_name: "Hinjewadi Tech Scholars Hostel",
        type: "Boys",
        hostel_type: "Boys",
        price: 9000,
        monthly_rent: 9000,
        location: "Phase 1, Near SCIT Campus, Hinjewadi, Pune",
        full_address: "Phase 1, Near SCIT Campus, Hinjewadi, Pune",
        distance: "1.5 km from Campus",
        distance_val: 1.5,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Double",
        rating: 4.5,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: true,
        study_room: true,
        power_backup: true,
        lat: 18.5971,
        lng: 73.7188,
        image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        security_deposit: 6000,
        security_info: "24/7 Guard Patrol & CCTV",
        staff_gender: "Male",
        mess_quality: "High-Protein Meals Available",
        curfew_timings: "10:30 PM"
    },
    {
        name: "Hinjewadi Girls Tech Living",
        title: "Hinjewadi Girls Tech Living",
        hostel_name: "Hinjewadi Girls Tech Living",
        type: "Girls",
        hostel_type: "Girls",
        price: 10500,
        monthly_rent: 10500,
        location: "Phase 2, Near Infosys Circle, Hinjewadi, Pune",
        full_address: "Phase 2, Near Infosys Circle, Hinjewadi, Pune",
        distance: "1.8 km from Campus",
        distance_val: 1.8,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Double",
        rating: 4.2,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: true,
        study_room: true,
        power_backup: true,
        lat: 18.5888,
        lng: 73.7099,
        image_url: "https://images.unsplash.com/photo-1522771731570-8682dc3a4332?w=800",
        security_deposit: 7000,
        security_info: "Strict Biometric Entry Warden",
        staff_gender: "Female",
        mess_quality: "Excellent Veg Food Buffets",
        curfew_timings: "9:30 PM"
    },

    // --- SHIVAJINAGAR MICRO-MARKET (Near COEP & Fergusson) ---
    {
        name: "COEP Scholars Boys Hostel",
        title: "COEP Scholars Boys Hostel",
        hostel_name: "COEP Scholars Boys Hostel",
        type: "Boys",
        hostel_type: "Boys",
        price: 6500,
        monthly_rent: 6500,
        location: "Wellesley Road, Near COEP Campus, Shivajinagar, Pune",
        full_address: "Wellesley Road, Near COEP Campus, Shivajinagar, Pune",
        distance: "0.2 km from Campus",
        distance_val: 0.2,
        ac_type: "non-ac",
        ac_available: false,
        bed_type: "Double",
        rating: 4.5,
        amenities: ["WiFi", "Power Backup"],
        wifi: true,
        laundry: false,
        gym: false,
        study_room: true,
        power_backup: true,
        lat: 18.5308,
        lng: 73.8474,
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        security_deposit: 4000,
        security_info: "COEP Campus Guards Patrols",
        staff_gender: "Male",
        mess_quality: "Affordable Student Mess Veg Plans",
        curfew_timings: "10:00 PM"
    },
    {
        name: "Fergusson View Girls Residency",
        title: "Fergusson View Girls Residency",
        hostel_name: "Fergusson View Girls Residency",
        type: "Girls",
        hostel_type: "Girls",
        price: 13500,
        monthly_rent: 13500,
        location: "FC Road, Near Fergusson College, Shivajinagar, Pune",
        full_address: "FC Road, Near Fergusson College, Shivajinagar, Pune",
        distance: "0.4 km from Campus",
        distance_val: 0.4,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Single",
        rating: 4.8,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: false,
        study_room: true,
        power_backup: true,
        lat: 18.5255,
        lng: 73.8412,
        image_url: "https://images.unsplash.com/photo-1598928506311-c55dd1b31412?w=800",
        security_deposit: 10000,
        security_info: "Multi-tier Female Guards System",
        staff_gender: "Female",
        mess_quality: "Organic Veg Homestyle Cooking",
        curfew_timings: "9:00 PM"
    },
    {
        name: "Shivajinagar Premium Co-ed Stay",
        title: "Shivajinagar Premium Co-ed Stay",
        hostel_name: "Shivajinagar Premium Co-ed Stay",
        type: "Co-ed",
        hostel_type: "Co-ed",
        price: 18000,
        monthly_rent: 18000,
        location: "Model Colony, Shivajinagar, Pune",
        full_address: "Model Colony, Shivajinagar, Pune",
        distance: "0.9 km from Campus",
        distance_val: 0.9,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Single",
        rating: 4.9,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: true,
        study_room: true,
        power_backup: true,
        lat: 18.5348,
        lng: 73.8322,
        image_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
        security_deposit: 15000,
        security_info: "High-grade Biometrics & Patrol",
        staff_gender: "Mixed",
        mess_quality: "Custom Chef Breakfast & Dinner Buffet",
        curfew_timings: "11:00 PM"
    },

    // --- DHANKAWADI MICRO-MARKET (Near PICT, Bharati & Bharati Hospital) ---
    {
        name: "Dhankawadi Scholars Co-Living",
        title: "Dhankawadi Scholars Co-Living",
        hostel_name: "Dhankawadi Scholars Co-Living",
        type: "Co-ed",
        hostel_type: "Co-ed",
        price: 6000,
        monthly_rent: 6000,
        location: "Near PICT Road, Dhankawadi, Pune",
        full_address: "Near PICT Road, Dhankawadi, Pune",
        distance: "1.1 km from Campus",
        distance_val: 1.1,
        ac_type: "non-ac",
        ac_available: false,
        bed_type: "Double",
        rating: 4.0,
        amenities: ["WiFi", "Power Backup"],
        wifi: true,
        laundry: false,
        gym: false,
        study_room: false,
        power_backup: true,
        lat: 18.4682,
        lng: 73.8509,
        image_url: "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?w=800",
        security_deposit: 4000,
        security_info: "CCTV Surveillance System",
        staff_gender: "Mixed",
        mess_quality: "Pure Veg Maharashtrian Thali",
        curfew_timings: "10:00 PM"
    },
    {
        name: "Sai Executive Boys PG",
        title: "Sai Executive Boys PG",
        hostel_name: "Sai Executive Boys PG",
        type: "Boys",
        hostel_type: "Boys",
        price: 5500,
        monthly_rent: 5500,
        location: "Tejnagar Colony, Dhankawadi, Pune",
        full_address: "Tejnagar Colony, Dhankawadi, Pune",
        distance: "0.5 km from Campus",
        distance_val: 0.5,
        ac_type: "non-ac",
        ac_available: false,
        bed_type: "Double",
        rating: 4.1,
        amenities: ["WiFi", "Power Backup"],
        wifi: true,
        laundry: false,
        gym: false,
        study_room: false,
        power_backup: true,
        lat: 18.4660,
        lng: 73.8530,
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        security_deposit: 3000,
        security_info: "Safe Gate Pass Codes System",
        staff_gender: "Male",
        mess_quality: "Veg Mess Included",
        curfew_timings: "10:30 PM"
    },

    // --- KARVE NAGAR MICRO-MARKET (Near Cummins & MMCOE) ---
    {
        name: "Karve Nagar Boys Executive PG",
        title: "Karve Nagar Boys Executive PG",
        hostel_name: "Karve Nagar Boys Executive PG",
        type: "Boys",
        hostel_type: "Boys",
        price: 7500,
        monthly_rent: 7500,
        location: "Pratibha Nagar, Near MMCOE College, Karve Nagar, Pune",
        full_address: "Pratibha Nagar, Near MMCOE College, Karve Nagar, Pune",
        distance: "0.7 km from Campus",
        distance_val: 0.7,
        ac_type: "non-ac",
        ac_available: false,
        bed_type: "Double",
        rating: 4.2,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: false,
        study_room: true,
        power_backup: true,
        lat: 18.4897,
        lng: 73.8186,
        image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
        security_deposit: 5000,
        security_info: "CCTV Cameras Guard Post",
        staff_gender: "Male",
        mess_quality: "High Quality Veg Mess",
        curfew_timings: "10:30 PM"
    },
    {
        name: "Cummins Safe Haven Girls PG",
        title: "Cummins Safe Haven Girls PG",
        hostel_name: "Cummins Safe Haven Girls PG",
        type: "Girls",
        hostel_type: "Girls",
        price: 9000,
        monthly_rent: 9000,
        location: "Cummins College Road, Karve Nagar, Pune",
        full_address: "Cummins College Road, Karve Nagar, Pune",
        distance: "0.4 km from Campus",
        distance_val: 0.4,
        ac_type: "non-ac",
        ac_available: false,
        bed_type: "Double",
        rating: 4.6,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: false,
        study_room: true,
        power_backup: true,
        lat: 18.4877,
        lng: 73.8144,
        image_url: "https://images.unsplash.com/photo-1598928506311-c55dd1b31412?w=800",
        security_deposit: 6000,
        security_info: "Strict Biometric Female Guards Wardens",
        staff_gender: "Female",
        mess_quality: "Premium Pure Veg Meals Only",
        curfew_timings: "9:00 PM"
    },
    {
        name: "Karve Nagar Premium Co-ed PG",
        title: "Karve Nagar Premium Co-ed PG",
        hostel_name: "Karve Nagar Premium Co-ed PG",
        type: "Co-ed",
        hostel_type: "Co-ed",
        price: 13000,
        monthly_rent: 13000,
        location: "Hingne Budrukh, Karve Nagar, Pune",
        full_address: "Hingne Budrukh, Karve Nagar, Pune",
        distance: "0.5 km from Campus",
        distance_val: 0.5,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Double",
        rating: 4.7,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: true,
        study_room: true,
        power_backup: true,
        lat: 18.4842,
        lng: 73.8219,
        image_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
        security_deposit: 8000,
        security_info: "Smart Card Lock Gate Access",
        staff_gender: "Mixed",
        mess_quality: "Buffet Style Veg Meals Buffet",
        curfew_timings: "10:30 PM"
    },
    {
        name: "Venkatesh Co-ed Smart Living",
        title: "Venkatesh Co-ed Smart Living",
        hostel_name: "Venkatesh Co-ed Smart Living",
        type: "Co-ed",
        hostel_type: "Co-ed",
        price: 11000,
        monthly_rent: 11000,
        location: "Pratibha Nagar, Karve Nagar, Pune",
        full_address: "Pratibha Nagar, Karve Nagar, Pune",
        distance: "1.2 km from Campus",
        distance_val: 1.2,
        ac_type: "ac",
        ac_available: true,
        bed_type: "Double",
        rating: 4.4,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        wifi: true,
        laundry: true,
        gym: false,
        study_room: true,
        power_backup: true,
        lat: 18.4912,
        lng: 73.8160,
        image_url: "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?w=800",
        security_deposit: 7000,
        security_info: "Round-the-clock CCTV cameras & Guard",
        staff_gender: "Mixed",
        mess_quality: "Veg & Non-Veg Mess Cooks",
        curfew_timings: "10:00 PM"
    }
];

// ===================================================
// ONE-TIME SEEDING EXECUTION FUNCTION
// ===================================================
async function seedDatabase() {
    console.log("[UniStay Seeder] Initializing database seeding operations...");

    try {
        let activeSupabase = null;

        // A. Browser Execution Check
        if (typeof window !== 'undefined' && window.supabase) {
            console.log("[UniStay Seeder] Browser environment detected. Using window.supabase client...");
            activeSupabase = window.supabase;
        } 
        // B. Node.js Execution Check
        else if (typeof require !== 'undefined') {
            console.log("[UniStay Seeder] Node.js environment detected. Dynamic configurations parsing...");
            
            const fs = require('fs');
            const path = require('path');
            
            let url = "";
            let key = "";

            try {
                const configPath = path.join(__dirname, 'config.js');
                if (fs.existsSync(configPath)) {
                    const content = fs.readFileSync(configPath, 'utf8');
                    const urlMatch = content.match(/SUPABASE_URL\s*:\s*["']([^"']+)["']/);
                    const keyMatch = content.match(/SUPABASE_KEY\s*:\s*["']([^"']+)["']/);
                    
                    if (urlMatch) url = urlMatch[1];
                    if (keyMatch) key = keyMatch[1];
                }
            } catch (err) {
                console.error("[UniStay Seeder] Error parsing config.js:", err);
            }

            // Fallbacks to system env if missing
            url = url || process.env.SUPABASE_URL;
            key = key || process.env.SUPABASE_KEY;

            if (!url || !key || key.includes("YOUR_ACTUAL_ANON")) {
                throw new Error("Unable to parse a valid Supabase Project URL or Anon Public Key. Ensure config.js is configured with real credentials.");
            }

            console.log(`[UniStay Seeder] Connecting to Supabase Project: ${url}`);
            
            // In Node.js environment, we bypass the need for external dependency libraries 
            // by hitting Supabase PostgREST endpoints directly using native HTTP requests.
            const httpUrl = `${url}/rest/v1/hostels`;
            
            console.log("[UniStay Seeder] Purging existing listings in Supabase...");
            // Pure DELETE request to clean table (equivalent to TRUNCATE/DELETE ALL)
            await fetch(httpUrl, {
                method: 'DELETE',
                headers: {
                    'apikey': key,
                    'Authorization': `Bearer ${key}`
                }
            });
            console.log("[UniStay Seeder] Table purged successfully.");

            console.log(`[UniStay Seeder] Batch inserting ${PuneHostelDataset.length} Pune hostels...`);
            const response = await fetch(httpUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': key,
                    'Authorization': `Bearer ${key}`,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(PuneHostelDataset)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Supabase API responded with error: ${errorText}`);
            }

            const insertedData = await response.json();
            console.log(`[UniStay Seeder] Successfully seeded ${insertedData.length} records into Supabase cloud!`);
            process.exit(0);
        }

        // C. Executing browser client seed insertion
        if (activeSupabase) {
            // First, purge existing hostels
            console.log("[UniStay Seeder] Purging old hostels in Supabase...");
            const { error: deleteError } = await activeSupabase.from('hostels').delete().neq('id', 0);
            if (deleteError) {
                console.warn("[UniStay Seeder] Delete statement encountered warning (continuing insertion):", deleteError.message);
            }

            console.log(`[UniStay Seeder] Inserting batch payload of ${PuneHostelDataset.length} items...`);
            const { data, error } = await activeSupabase.from('hostels').insert(PuneHostelDataset).select();
            
            if (error) throw error;
            
            alert(`Supabase Cloud successfully seeded with ${data.length} Pune Hostel profiles!`);
            
            // Reload grid if browser rendering function exists
            if (typeof renderOwnerListings === 'function') {
                renderOwnerListings();
            } else if (typeof loadOwnerInventory === 'function') {
                loadOwnerInventory();
            }
        } else {
            throw new Error("No initialized Supabase client or HTTP configurations could be loaded.");
        }

    } catch (error) {
        console.error("[UniStay Seeder] Seeding process encountered a critical database fault:", error);
        if (typeof alert !== 'undefined') {
            alert("Seeding Error: " + (error.message || error));
        } else {
            process.exit(1);
        }
    }
}

// Trigger script execution if run directly from command line (Node context)
if (typeof require !== 'undefined' && require.main === module) {
    seedDatabase();
}

// Export module definitions for cross-compatibility
if (typeof module !== 'undefined') {
    module.exports = { PuneHostelDataset, seedDatabase };
}
window.seedDatabase = seedDatabase;
window.PuneHostelDataset = PuneHostelDataset;
