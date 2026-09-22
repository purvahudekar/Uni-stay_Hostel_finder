/**
 * UniStay — Client-Side Application Engine (Production v3.0)
 *
 * Responsibilities:
 *  • Serve the multi-city pan-India dataset from Express SQLite server or Supabase Cloud
 *  • Render dynamic split-layout hostel cards into #hostelList / .hostel-grid
 *  • Dynamic Leaflet viewport centering based on search result centroids (flyTo)
 *  • Power the advanced filter sidebar
 *  • Handle Logout (localStorage.clear → index.html) and Messages navigation
 *  • Drive owner dashboard: Add / Edit / Delete listings + modal form
 */

'use strict';

// ============================================================
// SECTION 1 — CORE PUNE HOSTEL DATASET  (20 entries, hardcoded fallback)
// This dataset is the fallback source of truth for the student
// dashboard if the database is initially offline.
// ============================================================
const PUNE_HOSTELS = [
    {
        id: 1,
        name: "Zolo Scholar Stay",
        type: "Boys",
        price: 8500,
        location: "Katraj, Pune",
        address: "Katraj, Pune",
        distance: "0.5 km",
        ac_type: "ac",
        bed_type: "Double",
        rating: 4.5,
        lat: 18.4529,
        lng: 73.8565,
        amenities: ["WiFi", "Power Backup", "Laundry"],
        image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
        security_deposit: 7000,
        security_info: "24/7 CCTV & Security Guard",
        staff_gender: "Male",
        mess_quality: "Veg Mess Included",
        curfew_timings: "10:30 PM"
    },
    {
        id: 2,
        name: "Stanza Living Dublin House",
        type: "Girls",
        price: 12000,
        location: "Kothrud, Pune",
        address: "Kothrud, Pune",
        distance: "0.8 km",
        ac_type: "ac",
        bed_type: "Single",
        rating: 4.8,
        lat: 18.5074,
        lng: 73.8077,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1522771731570-8682dc3a4332?w=800",
        security_deposit: 10000,
        security_info: "Biometric Access & Female Warden",
        staff_gender: "Female",
        mess_quality: "Organic Veg Kitchen",
        curfew_timings: "9:30 PM"
    },
    {
        id: 3,
        name: "Youthopia Student Living",
        type: "Co-ed",
        price: 9500,
        location: "Viman Nagar, Pune",
        address: "Viman Nagar, Pune",
        distance: "1.2 km",
        ac_type: "non-ac",
        bed_type: "Mixed",
        rating: 4.2,
        lat: 18.5679,
        lng: 73.9143,
        amenities: ["WiFi", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1598928506311-c55dd1b31412?w=800",
        security_deposit: 6000,
        security_info: "CCTV & Guard Post",
        staff_gender: "Mixed",
        mess_quality: "Veg/Non-Veg Mess",
        curfew_timings: "10:30 PM"
    },
    {
        id: 4,
        name: "Elite Boys Hostel",
        type: "Boys",
        price: 6500,
        location: "Dhankawadi, Pune",
        address: "Dhankawadi, Pune",
        distance: "0.3 km",
        ac_type: "non-ac",
        bed_type: "Double",
        rating: 3.9,
        lat: 18.4654,
        lng: 73.8598,
        amenities: ["WiFi", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        security_deposit: 4000,
        security_info: "CCTV Surveillance",
        staff_gender: "Male",
        mess_quality: "Affordable Veg Mess",
        curfew_timings: "11:00 PM"
    },
    {
        id: 5,
        name: "Serene Alpine Girls PG",
        type: "Girls",
        price: 14000,
        location: "Shivajinagar, Pune",
        address: "Shivajinagar, Pune",
        distance: "0.4 km",
        ac_type: "ac",
        bed_type: "Single",
        rating: 4.9,
        lat: 18.5312,
        lng: 73.8445,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        security_deposit: 12000,
        security_info: "Multi-tier Female Guards & Biometrics",
        staff_gender: "Female",
        mess_quality: "Premium Pure Veg Meals",
        curfew_timings: "9:00 PM"
    },
    {
        id: 6,
        name: "Oxford Living Spaces",
        type: "Co-ed",
        price: 11000,
        location: "Hinjewadi, Pune",
        address: "Hinjewadi, Pune",
        distance: "2.5 km",
        ac_type: "ac",
        bed_type: "Double",
        rating: 4.4,
        lat: 18.5913,
        lng: 73.7389,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
        security_deposit: 9000,
        security_info: "Smart Card Access & 24/7 Patrol",
        staff_gender: "Mixed",
        mess_quality: "Multi-Cuisine Buffet",
        curfew_timings: "10:30 PM"
    },
    {
        id: 7,
        name: "Cozy Nest Hostel",
        type: "Girls",
        price: 7500,
        location: "Karve Nagar, Pune",
        address: "Karve Nagar, Pune",
        distance: "1.1 km",
        ac_type: "non-ac",
        bed_type: "Mixed",
        rating: 4.1,
        lat: 18.4912,
        lng: 73.8189,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?w=800",
        security_deposit: 5000,
        security_info: "Warden & CCTV",
        staff_gender: "Female",
        mess_quality: "Homestyle Pure Veg Meals",
        curfew_timings: "9:30 PM"
    },
    {
        id: 8,
        name: "Balaji Executive Boys PG",
        type: "Boys",
        price: 5500,
        location: "Katraj, Pune",
        address: "Katraj, Pune",
        distance: "1.5 km",
        ac_type: "non-ac",
        bed_type: "Triple",
        rating: 3.8,
        lat: 18.4498,
        lng: 73.8521,
        amenities: ["WiFi", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        security_deposit: 3000,
        security_info: "Gate Pass System & CCTV",
        staff_gender: "Male",
        mess_quality: "Veg Mess Included",
        curfew_timings: "10:30 PM"
    },
    {
        id: 9,
        name: "The Nest Premium Living",
        type: "Girls",
        price: 16000,
        location: "Kothrud, Pune",
        address: "Kothrud, Pune",
        distance: "0.6 km",
        ac_type: "ac",
        bed_type: "Single",
        rating: 4.7,
        lat: 18.5023,
        lng: 73.8012,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
        security_deposit: 14000,
        security_info: "Biometric Entry & Female Security",
        staff_gender: "Female",
        mess_quality: "Organic Multi-Cuisine Kitchen",
        curfew_timings: "9:30 PM"
    },
    {
        id: 10,
        name: "Campus Hub Accommodations",
        type: "Co-ed",
        price: 8000,
        location: "Dhankawadi, Pune",
        address: "Dhankawadi, Pune",
        distance: "0.7 km",
        ac_type: "non-ac",
        bed_type: "Double",
        rating: 4.0,
        lat: 18.4612,
        lng: 73.8541,
        amenities: ["WiFi", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1598928506311-c55dd1b31412?w=800",
        security_deposit: 5000,
        security_info: "CCTV & Security Guard",
        staff_gender: "Mixed",
        mess_quality: "Pure Veg Maharashtrian Thali",
        curfew_timings: "10:00 PM"
    },
    {
        id: 11,
        name: "Sai Premier Hostel",
        type: "Boys",
        price: 7000,
        location: "Shivajinagar, Pune",
        address: "Shivajinagar, Pune",
        distance: "0.9 km",
        ac_type: "non-ac",
        bed_type: "Double",
        rating: 4.2,
        lat: 18.5285,
        lng: 73.8398,
        amenities: ["WiFi", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        security_deposit: 4500,
        security_info: "24/7 Guard Patrol & CCTV",
        staff_gender: "Male",
        mess_quality: "Affordable Student Veg Mess",
        curfew_timings: "10:00 PM"
    },
    {
        id: 12,
        name: "Symbi-Stay Residences",
        type: "Co-ed",
        price: 13500,
        location: "Viman Nagar, Pune",
        address: "Viman Nagar, Pune",
        distance: "0.3 km",
        ac_type: "ac",
        bed_type: "Single",
        rating: 4.6,
        lat: 18.5621,
        lng: 73.9099,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1522771731570-8682dc3a4332?w=800",
        security_deposit: 11000,
        security_info: "Smart Card Access & Patrol",
        staff_gender: "Mixed",
        mess_quality: "Custom Veg/Non-Veg Options",
        curfew_timings: "11:00 PM"
    },
    {
        id: 13,
        name: "Royal Comfort PG",
        type: "Boys",
        price: 9000,
        location: "Karve Nagar, Pune",
        address: "Karve Nagar, Pune",
        distance: "1.4 km",
        ac_type: "ac",
        bed_type: "Double",
        rating: 4.3,
        lat: 18.4876,
        lng: 73.8234,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
        security_deposit: 6500,
        security_info: "CCTV & Gate Pass System",
        staff_gender: "Male",
        mess_quality: "High Quality Veg Mess",
        curfew_timings: "10:30 PM"
    },
    {
        id: 14,
        name: "Aditi Girls Residency",
        type: "Girls",
        price: 6000,
        location: "Katraj, Pune",
        address: "Katraj, Pune",
        distance: "1.0 km",
        ac_type: "non-ac",
        bed_type: "Triple",
        rating: 4.0,
        lat: 18.4555,
        lng: 73.8502,
        amenities: ["WiFi", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?w=800",
        security_deposit: 4000,
        security_info: "Strict Curfew & Warden",
        staff_gender: "Female",
        mess_quality: "Pure Veg Homestyle Meals",
        curfew_timings: "9:00 PM"
    },
    {
        id: 15,
        name: "Tech-Hub Co-Living",
        type: "Co-ed",
        price: 10500,
        location: "Hinjewadi, Pune",
        address: "Hinjewadi, Pune",
        distance: "1.8 km",
        ac_type: "ac",
        bed_type: "Double",
        rating: 4.4,
        lat: 18.5885,
        lng: 73.7421,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        security_deposit: 8000,
        security_info: "Electronic Smart Card Entrance",
        staff_gender: "Mixed",
        mess_quality: "Multi-Cuisine Buffet",
        curfew_timings: "11:00 PM"
    },
    {
        id: 16,
        name: "Fergusson View Boys PG",
        type: "Boys",
        price: 8000,
        location: "Shivajinagar, Pune",
        address: "Shivajinagar, Pune",
        distance: "0.2 km",
        ac_type: "non-ac",
        bed_type: "Double",
        rating: 4.5,
        lat: 18.5222,
        lng: 73.8411,
        amenities: ["WiFi", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        security_deposit: 5500,
        security_info: "COEP Campus Guard Patrols",
        staff_gender: "Male",
        mess_quality: "Affordable Student Mess Plans",
        curfew_timings: "10:00 PM"
    },
    {
        id: 17,
        name: "Shree Girls Luxury Home",
        type: "Girls",
        price: 15000,
        location: "Kothrud, Pune",
        address: "Kothrud, Pune",
        distance: "0.5 km",
        ac_type: "ac",
        bed_type: "Single",
        rating: 4.8,
        lat: 18.5111,
        lng: 73.8099,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
        security_deposit: 13000,
        security_info: "Biometric Entry & Female Guards",
        staff_gender: "Female",
        mess_quality: "Chef-Prepared Organic Veg Meals",
        curfew_timings: "9:00 PM"
    },
    {
        id: 18,
        name: "Metro Station Living",
        type: "Co-ed",
        price: 12500,
        location: "Shivajinagar, Pune",
        address: "Shivajinagar, Pune",
        distance: "0.5 km",
        ac_type: "ac",
        bed_type: "Double",
        rating: 4.6,
        lat: 18.5350,
        lng: 73.8490,
        amenities: ["WiFi", "Laundry", "Gym", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
        security_deposit: 10000,
        security_info: "High-grade Biometrics & Patrol",
        staff_gender: "Mixed",
        mess_quality: "Custom Chef Breakfast & Dinner",
        curfew_timings: "11:00 PM"
    },
    {
        id: 19,
        name: "MIT Junction Residency",
        type: "Boys",
        price: 8800,
        location: "Kothrud, Pune",
        address: "Kothrud, Pune",
        distance: "0.7 km",
        ac_type: "non-ac",
        bed_type: "Double",
        rating: 4.3,
        lat: 18.5140,
        lng: 73.8150,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        security_deposit: 6000,
        security_info: "CCTV & Smart Lock Entrance",
        staff_gender: "Male",
        mess_quality: "Veg Lunch & Dinner Included",
        curfew_timings: "11:00 PM"
    },
    {
        id: 20,
        name: "Silver Birch Girls Hostel",
        type: "Girls",
        price: 11000,
        location: "Viman Nagar, Pune",
        address: "Viman Nagar, Pune",
        distance: "1.5 km",
        ac_type: "ac",
        bed_type: "Double",
        rating: 4.4,
        lat: 18.5695,
        lng: 73.9190,
        amenities: ["WiFi", "Laundry", "Power Backup"],
        image_url: "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?w=800",
        security_deposit: 8500,
        security_info: "Strict Biometric Female Guards",
        staff_gender: "Female",
        mess_quality: "Premium Pure Veg Meals",
        curfew_timings: "9:30 PM"
    }
];

// Expose dataset globally so seed scripts and owner panel can access it
window.PuneHostelDataset = PUNE_HOSTELS;
window.puneHostels       = PUNE_HOSTELS;

// ============================================================
// SECTION 2 — SUPABASE (optional enhancement, non-blocking)
// ============================================================
let supabaseClient = null;

async function bootstrapSupabase() {
    if (supabaseClient) return supabaseClient;
    try {
        const cfg = window.env || {};
        const url = cfg.SUPABASE_URL || '';
        const key = cfg.SUPABASE_KEY || '';
        const isPlaceholder = !key || key.includes('YOUR_ACTUAL') || key.includes('PASTE_YOUR');

        if (url && !isPlaceholder && window.supabase && typeof window.supabase.createClient === 'function') {
            supabaseClient    = window.supabase.createClient(url, key);
            window.supabase   = supabaseClient;   // replace the CDN namespace ref
            console.log('[UniStay] Supabase client initialised.');
        } else {
            console.warn('[UniStay] Supabase key not configured — running on embedded dataset.');
        }
    } catch (err) {
        console.error('[UniStay] Supabase bootstrap failed silently:', err);
    }
    return supabaseClient;
}

// Fire async, never block rendering
bootstrapSupabase();

// ============================================================
// SECTION 3 — ACTIVE HOSTEL WORKING COPY & CLIENT CACHE
// allHostels always starts from PUNE_HOSTELS.
// Supabase/Local database data will replace it fully upon fetch.
// ============================================================
let allHostels = [];
let fetchedHostels = []; // Global client cache array variable holding database entries

function seedAllHostels(source) {
    allHostels = source.map(h => ({
        id            : h.id,
        name          : h.hostel_name || h.name || h.title || 'Premium Hostel',
        hostel_name   : h.hostel_name || h.name || h.title || 'Premium Hostel',
        type          : h.hostel_type || h.type || 'Co-ed',
        price         : typeof h.monthly_rent === 'number' ? h.monthly_rent : (h.price || 8000),
        monthly_rent  : typeof h.monthly_rent === 'number' ? h.monthly_rent : (h.price || 8000),
        location      : h.full_address || h.address || h.location || 'Pune, Maharashtra',
        address       : h.full_address || h.address || h.location || 'Pune, Maharashtra',
        distance      : h.distance || '1.0 km',
        distance_val  : h.distance_val || parseFloat((h.distance || '1.0').match(/[\d.]+/)?.[0] || '1.0'),
        ac_type       : (h.ac_available === true || h.ac_type === 'ac' || h.ac_availability === 1 || h.ac_availability === true) ? 'ac' : 'non-ac',
        bed_type      : h.bed_type || 'Single',
        rating        : parseFloat(h.rating) || 4.5,
        lat           : h.lat,
        lng           : h.lng || h.lon,
        amenities     : Array.isArray(h.amenities) ? h.amenities : buildAmenitiesArray(h),
        image_url     : h.image_url || h.hostel_photos || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        security_deposit : h.security_deposit || 5000,
        security_info    : h.security_info  || '24/7 Security',
        staff_gender     : h.staff_gender   || 'Mixed',
        mess_quality     : h.mess_quality || h.mess_quality_and_type || 'Veg/Non-Veg Available',
        curfew_timings   : h.curfew_timings || '10:00 PM',
        wifi             : h.wifi  || (h.amenities || []).some(a => a.toLowerCase() === 'wifi') || (h.facilities_and_amenities || '').toLowerCase().includes('wifi'),
        laundry          : h.laundry || (h.amenities || []).some(a => a.toLowerCase() === 'laundry') || (h.facilities_and_amenities || '').toLowerCase().includes('laundry'),
        gym              : h.gym    || (h.amenities || []).some(a => a.toLowerCase() === 'gym') || (h.facilities_and_amenities || '').toLowerCase().includes('gym'),
        power_backup     : h.power_backup || (h.amenities || []).some(a => a.toLowerCase().includes('power')) || (h.facilities_and_amenities || '').toLowerCase().includes('power')
    }));
    fetchedHostels = allHostels; // Sync cache array with live working copy
}

function buildAmenitiesArray(h) {
    const list = [];
    const rawAmen = (h.facilities_and_amenities || '').toLowerCase();
    if (h.wifi || h.wifi === true || rawAmen.includes('wifi'))                 list.push('WiFi');
    if (h.laundry || h.laundry === true || rawAmen.includes('laundry'))         list.push('Laundry');
    if (h.gym || h.gym === true || rawAmen.includes('gym'))                     list.push('Gym');
    if (h.power_backup || rawAmen.includes('power') || rawAmen.includes('generator')) list.push('Power Backup');
    return list;
}

// ============================================================
// SECTION 4 — CARD RENDERING & LAYOUT ENGINE
// ============================================================

/**
 * Builds HTML template for high-fidelity horizontal split cards
 * strictly aligned to prevent vertical compression, clipping, or squishing.
 */
function buildHostelCardHtml(h) {
    const stars = buildStarHtml(h.rating);
    const acBadge = h.ac_type === 'ac'
        ? '<span style="background:#d1fae5;color:#065f46;padding:2px 8px;border-radius:9999px;font-size:0.7rem;font-weight:700;letter-spacing:0.02em;">❄ AC</span>'
        : '<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:9999px;font-size:0.7rem;font-weight:700;letter-spacing:0.02em;">Non-AC</span>';
    
    const typeBadgeColor = h.type === 'Girls' ? '#fdf2f8' : h.type === 'Boys' ? '#eff6ff' : '#f0fdf4';
    const typeBadgeText  = h.type === 'Girls' ? '#9d174d' : h.type === 'Boys' ? '#1e40af' : '#065f46';
    
    const amenityChips = (h.amenities || []).slice(0, 3).map(a =>
        `<span style="background:var(--primary-light,rgba(124,58,237,0.1));color:var(--primary,#7c3aed);padding:2px 8px;border-radius:9999px;font-size:0.7rem;font-weight:600;white-space:nowrap;">${a}</span>`
    ).join('');

    return `
    <div class="hostel-card glass animate-slide-up" onclick="viewHostel(${h.id})" 
         style="cursor:pointer; border-radius:var(--border-radius, 16px); overflow:hidden; display:flex; flex-direction:row; gap:0; transition:transform 0.2s ease, box-shadow 0.2s ease; width:100%; min-height:140px; height:auto; flex-shrink:0; box-sizing:border-box;" 
         onmouseenter="this.style.transform='translateY(-4px)';this.style.boxShadow='0 20px 40px rgba(0,0,0,0.18)'" 
         onmouseleave="this.style.transform='translateY(0)';this.style.boxShadow=''">
        
        <!-- Left Side Image Preview Cover -->
        <div style="position:relative; width:180px; min-width:180px; max-width:180px; height:auto; overflow:hidden; flex-shrink:0;">
            <img src="${h.image_url}" alt="${h.name}" loading="lazy" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.src='https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'">
            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%);"></div>
        </div>
        
        <!-- Premium Horizontal Split Content Panel -->
        <div style="display:flex; flex-direction:row; flex:1; padding:1.25rem; gap:1.25rem; box-sizing:border-box; align-items:stretch; overflow:hidden;">
            
            <!-- LEFT COLUMN: tags, name, location, spec badges, and amenities -->
            <div style="display:flex; flex-direction:column; flex:1; justify-content:space-between; gap:0.5rem; text-align:left; overflow:hidden;">
                <div>
                    <!-- Badges -->
                    <div style="display:flex; gap:0.5rem; align-items:center; margin-bottom:0.35rem; flex-wrap:wrap;">
                        <span style="background:${typeBadgeColor}; color:${typeBadgeText}; padding:2px 8px; border-radius:9999px; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.02em;">${h.type}</span>
                        ${acBadge}
                    </div>
                    
                    <!-- Title -->
                    <h3 style="font-size:1.1rem; font-weight:800; margin:0 0 0.25rem; color:var(--text-main); line-height:1.25; white-space:normal; word-break:break-word;">${h.name}</h3>
                    
                    <!-- Location and Specs -->
                    <p style="font-size:0.82rem; color:var(--text-muted); margin:0 0 0.25rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">📍 ${h.location}</p>
                    <p style="font-size:0.78rem; color:var(--text-muted); margin:0;">🚶 ${h.distance} from campus &nbsp;|&nbsp; 🛏 ${h.bed_type}</p>
                </div>
                <!-- Amenities -->
                <div style="display:flex; gap:0.35rem; flex-wrap:wrap; margin-top:0.15rem;">${amenityChips}</div>
            </div>
            
            <!-- Structural Divider -->
            <div style="width:1px; background:var(--border); margin:0 0.25rem; flex-shrink:0;"></div>
            
            <!-- RIGHT COLUMN: rating, pricing, billing intervals, Details button -->
            <div style="display:flex; flex-direction:column; width:160px; min-width:160px; max-width:160px; justify-content:space-between; text-align:right; align-items:flex-end; flex-shrink:0;">
                <!-- Rating badge info -->
                <div style="color:#fbbf24; font-size:0.85rem; font-weight:700; display:flex; align-items:center; gap:0.25rem;">
                    <span style="font-size:0.85rem;">${stars}</span>
                    <span style="background:rgba(251,191,36,0.1); color:#d97706; padding:2px 6px; border-radius:6px; font-size:0.72rem; font-weight:700;">${h.rating.toFixed(1)}</span>
                </div>
                
                <!-- Price and Interval tags -->
                <div style="margin:auto 0; text-align:right;">
                    <div style="color:var(--text-main); font-size:1.3rem; font-weight:800; line-height:1.1;">₹${h.price.toLocaleString('en-IN')}</div>
                    <span style="font-size:0.72rem; color:var(--text-muted); font-weight:600; display:block; margin-top:0.15rem;">per month</span>
                </div>
                
                <!-- Primary Action Button -->
                <button class="btn btn-primary" style="width:100%; padding:0.5rem; font-size:0.8rem; border-radius:9999px; font-weight:700; white-space:nowrap; margin-top:0.25rem;">View Details →</button>
            </div>
            
        </div>
    </div>
    `;
}

function renderHostels(filters) {
    filters = filters || {};

    const hostelList = document.getElementById('hostelList') || document.querySelector('.hostel-grid');
    if (!hostelList) return;

    // Guarantee allHostels is seeded, even if nothing else ran
    if (!allHostels || allHostels.length === 0) {
        seedAllHostels(PUNE_HOSTELS);
    }

    // ---- Apply filters ----
    const filtered = allHostels.filter(h => {
        // Broadened Text search scanning: hostel_name, full_address, and hostel_type
        if (filters.searchTerm) {
            const q = filters.searchTerm.toLowerCase();
            const nameStr    = (h.hostel_name || h.name || h.title || '').toLowerCase();
            const addressStr = (h.full_address || h.address || h.location || '').toLowerCase();
            const typeStr    = (h.hostel_type || h.type || '').toLowerCase();
            
            if (!nameStr.includes(q) && !addressStr.includes(q) && !typeStr.includes(q)) return false;
        }

        // Hostel type
        if (filters.hType && filters.hType !== 'all') {
            if (h.type.toLowerCase() !== filters.hType.toLowerCase()) return false;
        }

        // Price ceiling
        if (filters.maxPrice) {
            if (h.price > parseInt(filters.maxPrice)) return false;
        }

        // AC type
        if (filters.ac && filters.ac !== 'all') {
            if (h.ac_type !== filters.ac) return false;
        }

        // Bed type
        if (filters.bed && filters.bed !== 'all') {
            if (h.bed_type.toLowerCase() !== filters.bed.toLowerCase()) return false;
        }

        // Distance
        if (filters.maxDistance && filters.maxDistance !== 'all') {
            if (h.distance_val > parseFloat(filters.maxDistance)) return false;
        }

        // Minimum rating
        if (filters.minRating && parseInt(filters.minRating) > 1) {
            if (h.rating < parseInt(filters.minRating)) return false;
        }

        // Amenities
        if (filters.amenities && filters.amenities.length > 0) {
            const hAmenities = h.amenities.map(a => a.toLowerCase());
            const allMatch = filters.amenities.every(a => hAmenities.includes(a.toLowerCase()));
            if (!allMatch) return false;
        }

        return true;
    });

    // ---- Update results badge dynamically (exact string format) ----
    const badge = document.getElementById('resultsCountBadge');
    if (badge) {
        badge.textContent = `${filtered.length} Results Found`;
    }

    // ---- Clear existing content ----
    hostelList.innerHTML = '';

    // ---- Empty state ----
    if (filtered.length === 0) {
        hostelList.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:3rem 1rem;" class="animate-fade-in">
                <p style="font-size:3rem; margin-bottom:0.75rem;">🔍</p>
                <p style="font-size:1.1rem; font-weight:600;">No hostels match your filters.</p>
                <p style="font-size:0.875rem; margin-top:0.25rem;">Try adjusting your search criteria or click Reset.</p>
            </div>`;
        if (typeof displayHostelsOnMap === 'function') displayHostelsOnMap([]);
        return;
    }

    // ---- Render split layout cards ----
    hostelList.innerHTML = filtered.map(h => buildHostelCardHtml(h)).join('');

    // ---- Dynamic Centering Flight for Leaflet Viewport ----
    const validCoords = filtered.filter(h => h.lat && h.lng);
    if (validCoords.length > 0 && typeof map !== 'undefined' && map) {
        const avgLat = validCoords.reduce((sum, h) => sum + parseFloat(h.lat), 0) / validCoords.length;
        const avgLng = validCoords.reduce((sum, h) => sum + parseFloat(h.lng), 0) / validCoords.length;
        map.flyTo([avgLat, avgLng], 12);
    }

    // ---- Push to Leaflet map ----
    if (typeof displayHostelsOnMap === 'function') {
        displayHostelsOnMap(filtered);
    } else if (typeof addHostelMarkers === 'function') {
        addHostelMarkers(filtered);
    }
}

function buildStarHtml(rating) {
    const full  = Math.floor(rating);
    const half  = rating % 1 >= 0.5 ? 1 : 0;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '★';
    if (half)                            stars += '⭐';
    return stars;
}

// Expose displayHostelsOnMap as a bridge to maps.js addHostelMarkers
window.displayHostelsOnMap = function(hostels) {
    if (typeof addHostelMarkers === 'function') {
        addHostelMarkers(hostels);
    }
};

// ============================================================
// SECTION 5 — FILTER HANDLERS
// ============================================================
function applyAdvancedFilters() {
    const filters = {
        searchTerm  : (document.getElementById('searchFilter') || document.getElementById('searchCollege'))?.value.trim() || '',
        hType       : document.querySelector('input[name="hType"]:checked')?.value || 'all',
        maxPrice    : document.getElementById('priceRange')?.value || null,
        ac          : document.getElementById('acFilter')?.value || 'all',
        bed         : document.getElementById('bedFilter')?.value || 'all',
        maxDistance : document.getElementById('distanceFilter')?.value || 'all',
        minRating   : document.getElementById('ratingFilter')?.value || 1,
        amenities   : Array.from(document.querySelectorAll('.amenity-cb:checked')).map(cb => cb.value)
    };
    renderHostels(filters);
}

/**
 * Dynamic location and name real-time filter function
 * Captures query, converts to lowercase, and filters the client cache fetchedHostels.
 * Scans name, address, and type parameters, flying viewport centering directly.
 */
function applyLocationFilter() {
    const searchInput = document.getElementById('searchFilter') || document.getElementById('searchCollege');
    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();

    // Loop through global cache variable and match name, address, or type
    const filteredHostels = fetchedHostels.filter(h => {
        const nameStr    = (h.name || h.hostel_name || h.title || '').toLowerCase();
        const addressStr = (h.full_address || h.address || h.location || '').toLowerCase();
        const typeStr    = (h.type || h.hostel_type || '').toLowerCase();
        return nameStr.includes(query) || addressStr.includes(query) || typeStr.includes(query);
    });

    const hostelList = document.getElementById('hostelList') || document.querySelector('.hostel-grid');
    if (hostelList) {
        hostelList.innerHTML = '';

        if (filteredHostels.length === 0) {
            hostelList.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:3rem 1rem;" class="animate-fade-in">
                    <p style="font-size:3rem; margin-bottom:0.75rem;">🔍</p>
                    <p style="font-size:1.1rem; font-weight:600;">No hostels match your filters.</p>
                    <p style="font-size:0.875rem; margin-top:0.25rem;">Try adjusting your search criteria or click Reset.</p>
                </div>`;
        } else {
            // Render the matched split card layouts using the unified build function
            hostelList.innerHTML = filteredHostels.map(h => buildHostelCardHtml(h)).join('');
        }
    }

    // Update the results counter badge text dynamically with exact dynamic length matching
    const badge = document.getElementById('resultsCountBadge');
    if (badge) {
        badge.textContent = `${filteredHostels.length} Results Found`;
    }

    // Calculate dynamic geographical centroid (centering search city) and fly viewport
    const validCoords = filteredHostels.filter(h => h.lat && h.lng);
    if (validCoords.length > 0 && typeof map !== 'undefined' && map) {
        const avgLat = validCoords.reduce((sum, h) => sum + parseFloat(h.lat), 0) / validCoords.length;
        const avgLng = validCoords.reduce((sum, h) => sum + parseFloat(h.lng), 0) / validCoords.length;
        map.flyTo([avgLat, avgLng], 12);
    }

    // Clear Leaflet map and re-render only active search markers
    if (typeof displayHostelsOnMap === 'function') {
        displayHostelsOnMap(filteredHostels);
    }
}

function resetFilters() {
    const searchEl = document.getElementById('searchFilter') || document.getElementById('searchCollege');
    if (searchEl) searchEl.value = '';

    const allRadio = document.querySelector('input[name="hType"][value="all"]');
    if (allRadio) allRadio.checked = true;

    const priceEl = document.getElementById('priceRange');
    if (priceEl) {
        priceEl.value = 25000;
        const priceVal = document.getElementById('priceVal');
        if (priceVal) priceVal.innerText = 'Up to ₹25,000';
    }

    const acEl = document.getElementById('acFilter');
    if (acEl) acEl.value = 'all';

    const bedEl = document.getElementById('bedFilter');
    if (bedEl) bedEl.value = 'all';

    const distEl = document.getElementById('distanceFilter');
    if (distEl) distEl.value = 'all';

    const ratingEl = document.getElementById('ratingFilter');
    if (ratingEl) {
        ratingEl.value = 1;
        const ratingVal = document.getElementById('ratingVal');
        if (ratingVal) ratingVal.innerText = 'All';
    }

    document.querySelectorAll('.amenity-cb').forEach(cb => cb.checked = false);
    renderHostels();
}

window.applyAdvancedFilters = applyAdvancedFilters;
window.applyLocationFilter   = applyLocationFilter;
window.resetFilters          = resetFilters;

// ============================================================
// SECTION 6 — HOSTEL DETAIL NAVIGATION
// ============================================================
function viewHostel(id) {
    localStorage.setItem('selectedHostelId', id);
    // Store the full object so hostel-detail.html can read it
    const hostel = allHostels.find(h => h.id === id);
    if (hostel) localStorage.setItem('selectedHostel', JSON.stringify(hostel));
    window.location.href = 'hostel-detail.html';
}
window.viewHostel = viewHostel;

// ============================================================
// SECTION 7 — LOGOUT + GLOBAL NAVIGATION HANDLER
// Scans all buttons/links for "Logout" or "Sign Out" text.
// Messages link toggles the messages panel.
// ============================================================
function handleLogout(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    localStorage.clear();
    console.log('[UniStay] Session cleared. Redirecting to login page.');
    window.location.href = 'index.html';
}

function handleMessagesNav(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    // If on owner dashboard, switch to the messages tab
    if (typeof switchOwnerTab === 'function') {
        switchOwnerTab('messages');
        return;
    }
    // Fallback: show an alert panel
    const existing = document.getElementById('uniStayMsgPanel');
    if (existing) { existing.remove(); return; }
    const panel = document.createElement('div');
    panel.id = 'uniStayMsgPanel';
    panel.style.cssText = 'position:fixed;bottom:2rem;right:2rem;z-index:9999;background:var(--surface,#1e1b2e);border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:1.5rem 2rem;min-width:300px;box-shadow:0 20px 40px rgba(0,0,0,0.35);animation:slideUp 0.3s ease;';
    panel.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 style="margin:0;font-size:1rem;font-weight:700;color:var(--text-main,#f1f5f9);">💬 Messages</h3>
            <button onclick="document.getElementById('uniStayMsgPanel').remove()" style="background:none;border:none;font-size:1.25rem;cursor:pointer;color:var(--text-muted,#94a3b8);">×</button>
        </div>
        <p style="color:var(--text-muted,#94a3b8);font-size:0.875rem;margin:0;">No new messages at the moment.</p>
        <p style="color:var(--text-muted,#94a3b8);font-size:0.8rem;margin-top:0.5rem;">Inquiries from students will appear here.</p>`;
    document.body.appendChild(panel);
}

function bindGlobalNavHandlers() {
    document.querySelectorAll('button, a, [data-action]').forEach(el => {
        const text = el.textContent.trim().toLowerCase();
        if (text.includes('logout') || text.includes('sign out')) {
            // Remove any previous handler to avoid double-firing
            el.removeEventListener('click', handleLogout);
            el.addEventListener('click', handleLogout);
        }
        if (text === 'messages' || text.includes('message') && !text.includes('no message')) {
            el.removeEventListener('click', handleMessagesNav);
            el.addEventListener('click', handleMessagesNav);
        }
    });
}

window.logout       = handleLogout;
window.handleLogout = handleLogout;

// ============================================================
// SECTION 8 — OWNER DASHBOARD: TAB SWITCHING
// ============================================================
function switchOwnerTab(tabId) {
    console.log('[UniStay] Switching owner tab to:', tabId);

    document.querySelectorAll('.owner-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(pane => pane.classList.remove('active'));

    document.querySelectorAll('.owner-tab').forEach(btn => {
        if ((btn.getAttribute('onclick') || '').includes(tabId)) {
            btn.classList.add('active');
        }
    });

    const pane = document.getElementById('tab-' + tabId);
    if (pane) pane.classList.add('active');

    if (tabId === 'listings') {
        if (typeof loadOwnerInventory === 'function') loadOwnerInventory();
    } else if (tabId === 'messages') {
        renderMessages();
    }
}
window.switchOwnerTab = switchOwnerTab;

// ============================================================
// SECTION 9 — OWNER DASHBOARD: ADD/EDIT HOSTEL MODAL
// ============================================================
let editingHostelId = null;
window.editingHostelId = null;

function openListingForm() {
    const modal = document.getElementById('hostelFormModal') || document.getElementById('formModal') || document.getElementById('ownerFormModal');
    if (!modal) {
        console.error('[UniStay] Could not find hostel form modal element in DOM.');
        return;
    }
    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('[UniStay] Listing form modal opened.');
}

function closeListingForm() {
    const modal = document.getElementById('hostelFormModal') || document.getElementById('formModal') || document.getElementById('ownerFormModal');
    if (modal) {
        modal.classList.remove('active');
        // Give CSS transition time before hiding
        setTimeout(() => { modal.style.display = ''; }, 300);
        document.body.style.overflow = '';
    }
    editingHostelId        = null;
    window.editingHostelId = null;

    const form = document.getElementById('addHostelForm');
    if (form) form.reset();

    const submitBtn = document.querySelector('#addHostelForm button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Publish Detailed Listing';
}

window.openListingForm  = openListingForm;
window.closeListingForm = closeListingForm;

// ============================================================
// SECTION 10 — OWNER DASHBOARD: FORM SUBMISSION HANDLER
// ============================================================
async function handleAddHostel(e) {
    e.preventDefault();

    const nameEl     = document.getElementById('hName');
    const typeEl     = document.getElementById('hType');
    const priceEl    = document.getElementById('hPrice');
    const addrEl     = document.getElementById('hAddress');
    const distEl     = document.getElementById('hDistance');
    const acEl       = document.getElementById('hAc');
    const bedsEl     = document.getElementById('hBeds');
    const depositEl  = document.getElementById('hDeposit');
    const timingsEl  = document.getElementById('hTimings');
    const secureEl   = document.getElementById('hSecurity');
    const staffEl    = document.getElementById('hStaff');
    const messEl     = document.getElementById('hMess');

    if (!nameEl || !nameEl.value.trim()) {
        alert('Please enter a hostel name.');
        if (nameEl) nameEl.focus();
        return;
    }

    const hostelName  = nameEl.value.trim();
    const hostelType  = typeEl?.value || 'Boys';
    const monthlyRent = parseFloat(priceEl?.value) || 8000;
    const address     = addrEl?.value.trim() || 'Pune, Maharashtra';
    const distVal     = parseFloat(distEl?.value) || 1.0;
    const acVal       = acEl?.value || 'non-ac';
    const bedsVal     = bedsEl?.value || 'Single';
    const depositVal  = parseFloat(depositEl?.value) || 5000;
    const timings     = timingsEl?.value || '10:00 PM';
    const security    = secureEl?.value || '24/7 Guards & CCTV';
    const staffGender = staffEl?.value || 'Mixed';
    const messQuality = messEl?.value || 'Veg/Non-Veg Available';

    const features = Array.from(document.querySelectorAll('input[name="hFeature"]:checked')).map(cb => cb.value);

    // Auto-geocode based on address keywords
    let lat = 18.5204, lng = 73.8567;
    const lc = address.toLowerCase();
    if      (lc.includes('kothrud'))      { lat = 18.5074; lng = 73.8077; }
    else if (lc.includes('katraj'))       { lat = 18.4529; lng = 73.8543; }
    else if (lc.includes('viman'))        { lat = 18.5679; lng = 73.9143; }
    else if (lc.includes('hinjewadi'))    { lat = 18.5913; lng = 73.7389; }
    else if (lc.includes('shivajinagar')) { lat = 18.5308; lng = 73.8474; }
    else if (lc.includes('dhankawadi'))   { lat = 18.4682; lng = 73.8509; }
    else if (lc.includes('karve'))        { lat = 18.4897; lng = 73.8186; }

    const payload = {
        hostel_name     : hostelName,
        name            : hostelName,
        title           : hostelName,
        hostel_type     : hostelType,
        type            : hostelType,
        monthly_rent    : monthlyRent,
        price           : monthlyRent,
        full_address    : address,
        address         : address,
        location        : address,
        distance        : `${distVal} km`,
        distance_val    : distVal,
        ac_available    : acVal === 'ac',
        ac_type         : acVal,
        bed_type        : bedsVal,
        rating          : 4.5,
        amenities       : features,
        wifi            : features.map(f => f.toLowerCase()).includes('wifi'),
        laundry         : features.map(f => f.toLowerCase()).includes('laundry'),
        gym             : features.map(f => f.toLowerCase()).includes('gym'),
        power_backup    : features.map(f => f.toLowerCase()).includes('power backup'),
        security_deposit: depositVal,
        curfew_timings  : timings,
        security_info   : security,
        staff_gender    : staffGender,
        mess_quality    : messQuality,
        lat             : lat,
        lng             : lng,
        image_url       : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    };

    try {
        const sbClient = await bootstrapSupabase();
        let dbError = null;

        if (sbClient) {
            if (editingHostelId) {
                const { error } = await sbClient.from('hostels').update(payload).eq('id', editingHostelId);
                dbError = error;
            } else {
                const { error } = await sbClient.from('hostels').insert([payload]);
                dbError = error;
            }
            if (dbError) throw dbError;
            alert(editingHostelId ? '✅ Listing updated successfully in Supabase!' : '✅ New hostel published to Supabase Cloud!');
        } else {
            // Offline fallback: update in-memory dataset
            if (editingHostelId) {
                const idx = window.PuneHostelDataset.findIndex(x => x.id == editingHostelId);
                if (idx > -1) {
                    window.PuneHostelDataset[idx] = { ...window.PuneHostelDataset[idx], ...payload };
                    allHostels = [];
                }
            } else {
                payload.id = Date.now();
                window.PuneHostelDataset.push(payload);
                allHostels = [];
            }
            alert('✅ Hostel saved locally (offline mode — Supabase not configured).');
        }

        closeListingForm();
        allHostels = [];  // Flush render cache

        if (typeof loadOwnerInventory === 'function') loadOwnerInventory();
        if (document.getElementById('hostelList')) {
            seedAllHostels(PUNE_HOSTELS);
            renderHostels();
        }

    } catch (err) {
        console.error('[UniStay] Form submission error:', err);
        alert('❌ Operation failed: ' + (err.message || String(err)));
    }
}

// ============================================================
// SECTION 11 — OWNER DASHBOARD: EDIT & DELETE
// ============================================================
async function editHostel(id) {
    try {
        const sbClient = await bootstrapSupabase();
        let hostel = null;

        if (sbClient) {
            const { data, error } = await sbClient.from('hostels').select('*').eq('id', id).single();
            if (!error && data) hostel = data;
        }

        if (!hostel) {
            hostel = window.PuneHostelDataset.find(h => h.id == id) || null;
        }

        if (!hostel) { alert('Could not find hostel with ID ' + id); return; }

        editingHostelId        = id;
        window.editingHostelId = id;

        // Populate form fields
        const setVal = (elId, val) => { const el = document.getElementById(elId); if (el) el.value = val || ''; };
        setVal('hName',     hostel.hostel_name || hostel.name || '');
        setVal('hAddress',  hostel.full_address || hostel.address || hostel.location || '');
        setVal('hPrice',    hostel.monthly_rent || hostel.price || '');
        setVal('hDistance', hostel.distance_val || parseFloat((hostel.distance || '').match(/[\d.]+/)?.[0] || '1') || '');
        setVal('hDeposit',  hostel.security_deposit || '');
        setVal('hTimings',  hostel.curfew_timings || '');
        setVal('hSecurity', hostel.security_info || '');
        setVal('hMess',     hostel.mess_quality || '');

        const typeEl = document.getElementById('hType');
        if (typeEl) typeEl.value = hostel.hostel_type || hostel.type || 'Boys';

        const acEl = document.getElementById('hAc');
        if (acEl) acEl.value = (hostel.ac_available || hostel.ac_type === 'ac') ? 'ac' : 'non-ac';

        const bedsEl = document.getElementById('hBeds');
        if (bedsEl) bedsEl.value = hostel.bed_type || 'Single';

        const staffEl = document.getElementById('hStaff');
        if (staffEl) staffEl.value = hostel.staff_gender || 'Mixed';

        document.querySelectorAll('input[name="hFeature"]').forEach(cb => {
            const feat = cb.value.toLowerCase();
            if (feat === 'wifi')         cb.checked = !!hostel.wifi;
            else if (feat === 'laundry') cb.checked = !!hostel.laundry;
            else if (feat === 'gym')     cb.checked = !!hostel.gym;
            else if (feat.includes('power')) cb.checked = !!hostel.power_backup;
        });

        const submitBtn = document.querySelector('#addHostelForm button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Update Listing';

        openListingForm();
    } catch (err) {
        console.error('[UniStay] editHostel error:', err);
    }
}

async function deleteHostel(id) {
    if (!confirm('Are you sure you want to permanently delete this listing?')) return;
    try {
        const sbClient = await bootstrapSupabase();

        if (sbClient) {
            const { error } = await sbClient.from('hostels').delete().eq('id', id);
            if (error) throw error;
        }

        // Remove from in-memory dataset too
        const idx = window.PuneHostelDataset.findIndex(h => h.id == id);
        if (idx > -1) window.PuneHostelDataset.splice(idx, 1);

        allHostels = [];
        alert('✅ Hostel deleted successfully.');

        if (typeof loadOwnerInventory === 'function') loadOwnerInventory();
    } catch (err) {
        console.error('[UniStay] deleteHostel error:', err);
        alert('❌ Delete failed: ' + (err.message || String(err)));
    }
}

window.editHostel   = editHostel;
window.deleteHostel = deleteHostel;

// ============================================================
// SECTION 12 — OWNER DASHBOARD: INVENTORY LIST RENDERER
// (Used as fallback when owner-dashboard.html inline loadOwnerInventory is absent)
// ============================================================
async function renderOwnerListings() {
    const container = document.getElementById('ownerListings');
    const badge     = document.getElementById('inventoryCountBadge');
    if (!container) return;

    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;"><div style="width:36px;height:36px;border:4px solid var(--primary-light,rgba(124,58,237,0.2));border-top-color:var(--primary,#7c3aed);border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 1rem;"></div><p style="color:var(--text-muted);">Loading inventory...</p></div>`;

    let listings = [];
    try {
        const sbClient = await bootstrapSupabase();
        if (sbClient) {
            const { data, error } = await sbClient.from('hostels').select('*').order('id', { ascending: false });
            if (!error && data && data.length > 0) listings = data;
        }
    } catch (_) {}

    if (listings.length === 0) {
        listings = window.PuneHostelDataset || PUNE_HOSTELS;
    }

    if (badge) badge.textContent = listings.length + ' Listings';

    if (listings.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);"><p style="font-size:2.5rem;">🏢</p><p>No listings found. Click "+ Add New Hostel" to publish your first property.</p></div>`;
        return;
    }

    container.innerHTML = listings.map(h => {
        const titleVal = h.hostel_name || h.name || h.title || 'Premium Hostel';
        const addrVal  = h.full_address || h.address || h.location || 'Pune';
        const priceVal = typeof (h.monthly_rent || h.price) === 'number'
            ? (h.monthly_rent || h.price).toLocaleString('en-IN')
            : (h.monthly_rent || h.price || 0);
        const typeVal  = h.hostel_type || h.type || 'Co-ed';
        return `
        <div class="inventory-card glass animate-slide-up" style="border-radius:var(--border-radius,14px);padding:1.5rem;background:var(--surface);box-shadow:var(--shadow-md);border-top:4px solid var(--primary,#7c3aed);transition:transform 0.2s;" onmouseenter="this.style.transform='translateY(-3px)'" onmouseleave="this.style.transform='translateY(0)'">
            <h3 style="font-size:1.1rem;font-weight:700;margin:0 0 0.4rem;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${titleVal}</h3>
            <p style="font-size:0.85rem;color:var(--text-muted);margin:0 0 0.35rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">📍 ${addrVal}</p>
            <p style="font-size:1rem;font-weight:700;color:var(--primary,#7c3aed);margin:0 0 1.25rem;">₹${priceVal}/mo <span style="font-weight:400;font-size:0.8rem;color:var(--text-muted);">(${typeVal})</span></p>
            <div style="display:flex;gap:0.75rem;border-top:1px solid var(--border);padding-top:1rem;">
                <button class="btn btn-outline" onclick="editHostel(${h.id})" style="flex:1;padding:0.45rem 1rem;font-size:0.85rem;border-radius:8px;">✏ Edit</button>
                <button class="btn" onclick="deleteHostel(${h.id})" style="flex:1;padding:0.45rem 1rem;font-size:0.85rem;border-radius:8px;border:1px solid var(--danger,#ef4444);color:var(--danger,#ef4444);background:transparent;">🗑 Delete</button>
            </div>
        </div>`;
    }).join('');
}

// If loadOwnerInventory is not already defined by the inline script in owner-dashboard.html,
// fall back to renderOwnerListings
if (typeof window.loadOwnerInventory !== 'function') {
    window.loadOwnerInventory = renderOwnerListings;
}
window.renderOwnerListings = renderOwnerListings;

// ============================================================
// SECTION 13 — MESSAGING SYSTEM (Owner Dashboard)
// ============================================================
let currentActiveMsgId = null;

function renderMessages() {
    const listContainer = document.getElementById('msgList');
    if (!listContainer) return;

    const msgs = JSON.parse(localStorage.getItem('ownerMessages') || '[]');

    if (msgs.length === 0) {
        listContainer.innerHTML = `<div style="padding:2rem;text-align:center;color:var(--text-muted);"><p style="font-size:2rem;">💬</p><p style="font-size:0.9rem;">No student inquiries yet.</p></div>`;
        const detail = document.getElementById('msgDetail');
        if (detail) detail.innerHTML = `<div style="flex:1;display:flex;align-items:center;justify-content:center;color:var(--text-muted);">Select a message to view</div>`;
        return;
    }

    listContainer.innerHTML = msgs.map(m => `
        <div class="msg-item ${m.status === 'unread' ? 'unread' : ''} ${currentActiveMsgId === m.id ? 'active' : ''}"
             onclick="viewMessage(${m.id})" style="cursor:pointer;">
            <div style="display:flex;justify-content:space-between;margin-bottom:0.25rem;">
                <h4 style="font-size:0.95rem;font-weight:700;margin:0;">${m.studentName || 'Student'}</h4>
                <span style="font-size:0.75rem;color:var(--text-muted);">${m.date || ''}</span>
            </div>
            <p style="margin:0;font-size:0.85rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${m.text || ''}</p>
        </div>`).join('');

    if (msgs.length > 0 && !currentActiveMsgId) viewMessage(msgs[0].id);
}

function viewMessage(id) {
    currentActiveMsgId = id;
    const msgs  = JSON.parse(localStorage.getItem('ownerMessages') || '[]');
    const msg   = msgs.find(m => m.id === id);
    if (!msg) return;

    if (msg.status === 'unread') {
        msg.status = 'read';
        localStorage.setItem('ownerMessages', JSON.stringify(msgs));
        renderMessages();
        return;
    }

    renderMessages();

    const detail = document.getElementById('msgDetail');
    if (!detail) return;

    let chatHtml = `<div class="chat-bubble received"><strong style="display:block;font-size:0.8rem;margin-bottom:0.25rem;">${msg.studentName || 'Student'}</strong>${msg.text || ''}</div>`;
    if (msg.replies && msg.replies.length > 0) {
        chatHtml += msg.replies.map(r => `<div class="chat-bubble ${r.sender === 'owner' ? 'sent' : 'received'}">${r.text}</div>`).join('');
    }

    detail.innerHTML = `
        <div style="border-bottom:1px solid var(--border);padding-bottom:1rem;margin-bottom:1rem;">
            <h3 style="margin:0;font-size:1.1rem;font-weight:700;">Conversation with ${msg.studentName || 'Student'}</h3>
            <p style="font-size:0.85rem;color:var(--text-muted);margin:0.25rem 0 0;">Inquiry about your listing</p>
        </div>
        <div id="chatHistory" style="display:flex;flex-direction:column;gap:1rem;overflow-y:auto;flex:1;max-height:380px;padding:0.25rem 0;">${chatHtml}</div>
        <div style="display:flex;gap:0.5rem;margin-top:1rem;border-top:1px solid var(--border);padding-top:1rem;">
            <input type="text" id="replyInput" class="form-control" placeholder="Type your reply…"
                   onkeypress="if(event.key==='Enter')replyMessage(${id})">
            <button class="btn btn-primary" onclick="replyMessage(${id})" style="padding:0.5rem 1.25rem;border-radius:12px;">Send</button>
        </div>`;

    const ch = document.getElementById('chatHistory');
    if (ch) ch.scrollTop = ch.scrollHeight;
}

function replyMessage(id) {
    const input = document.getElementById('replyInput');
    if (!input || !input.value.trim()) return;
    const text  = input.value.trim();
    const msgs  = JSON.parse(localStorage.getItem('ownerMessages') || '[]');
    const idx   = msgs.findIndex(m => m.id === id);
    if (idx > -1) {
        if (!msgs[idx].replies) msgs[idx].replies = [];
        msgs[idx].replies.push({ sender: 'owner', text });
        localStorage.setItem('ownerMessages', JSON.stringify(msgs));
        viewMessage(id);
    }
}

window.viewMessage   = viewMessage;
window.replyMessage  = replyMessage;
window.renderMessages = renderMessages;

// ============================================================
// SECTION 14 — SEED UTILITY (for ⚡ Seed 20 Pune Hostels button)
// ============================================================
async function seedDatabase() {
    const btn = document.querySelector('button[onclick="seedDatabase()"]');
    if (btn) btn.textContent = '⏳ Seeding…';

    try {
        const sbClient = await bootstrapSupabase();
        if (sbClient) {
            const { error } = await sbClient.from('hostels').insert(
                PUNE_HOSTELS.map(h => ({
                    hostel_name     : h.name,
                    hostel_type     : h.type,
                    monthly_rent    : h.price,
                    full_address    : h.location,
                    distance_val    : parseFloat(h.distance),
                    ac_available    : h.ac_type === 'ac',
                    bed_type        : h.bed_type,
                    rating          : h.rating,
                    lat             : h.lat,
                    lng             : h.lng,
                    wifi            : h.amenities.map(a=>a.toLowerCase()).includes('wifi'),
                    laundry         : h.amenities.map(a=>a.toLowerCase()).includes('laundry'),
                    gym             : h.amenities.map(a=>a.toLowerCase()).includes('gym'),
                    power_backup    : h.amenities.map(a=>a.toLowerCase()).includes('power backup'),
                    security_deposit: h.security_deposit,
                    security_info   : h.security_info,
                    staff_gender    : h.staff_gender,
                    mess_quality    : h.mess_quality,
                    curfew_timings  : h.curfew_timings,
                    image_url       : h.image_url
                }))
            );
            if (error) throw error;
            alert('✅ 20 Pune hostels seeded to Supabase!');
        } else {
            alert('ℹ Supabase not configured. Dataset is already available locally.');
        }
    } catch (err) {
        alert('❌ Seed failed: ' + (err.message || String(err)));
    } finally {
        if (btn) btn.textContent = '⚡ Seed 20 Pune Hostels';
        if (typeof loadOwnerInventory === 'function') loadOwnerInventory();
    }
}
window.seedDatabase = seedDatabase;

// ============================================================
// SECTION 15 — DOMContentLoaded LIFECYCLE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('[UniStay] DOM ready — initialising application…');

    // ----- Clear any corrupted localStorage hostel cache -----
    // This prevents stale data from a broken previous session
    // from blocking the dataset load.
    const cachedRaw = localStorage.getItem('uniStayHostels');
    if (cachedRaw) {
        try {
            const parsed = JSON.parse(cachedRaw);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                localStorage.removeItem('uniStayHostels');
            }
        } catch (_) {
            localStorage.removeItem('uniStayHostels');
        }
    }

    // ----- Seed the working copy from the canonical dataset -----
    seedAllHostels(PUNE_HOSTELS);

    // ----- Display current user name -----
    try {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            const u = JSON.parse(userStr);
            const nameEl = document.getElementById('userNameDisplay');
            if (nameEl) nameEl.textContent = u.username || u.name || u.email || 'User';
        }
    } catch (_) {}

    // ----- Bind all logout / messages nav elements -----
    bindGlobalNavHandlers();

    // ----- Student Dashboard init -----
    const hostelListEl = document.getElementById('hostelList') || document.querySelector('.hostel-grid');
    if (hostelListEl) {
        // Render immediately — synchronous fallback
        renderHostels();

        // Wire up real-time search input with 200ms debounce
        const searchInput = document.getElementById('searchFilter') || document.getElementById('searchCollege');
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    applyLocationFilter();
                }, 200);
            });
        }

        // Wire up other live filter controls
        document.querySelectorAll('input[name="hType"]').forEach(r => r.addEventListener('change', applyAdvancedFilters));
        document.getElementById('priceRange')?.addEventListener('input', applyAdvancedFilters);
        document.getElementById('acFilter')?.addEventListener('change', applyAdvancedFilters);
        document.getElementById('bedFilter')?.addEventListener('change', applyAdvancedFilters);
        document.getElementById('distanceFilter')?.addEventListener('change', applyAdvancedFilters);
        document.getElementById('ratingFilter')?.addEventListener('input', applyAdvancedFilters);
        document.querySelectorAll('.amenity-cb').forEach(cb => cb.addEventListener('change', applyAdvancedFilters));

        // Load complete pan-India database entries (e.g. 60 items) from Express local server SQLite or Supabase
        fetch('/api/hostels')
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Local server response not OK');
            })
            .then(data => {
                if (data && data.length > 0) {
                    seedAllHostels(data); // Seed entire array directly
                    renderHostels();      // Render fully with 60 pan-India entries
                    console.log('[UniStay] Successfully loaded all ' + data.length + ' entries from Express server.');
                }
            })
            .catch(err => {
                console.warn('[UniStay] Local backend endpoint failed, trying Supabase Cloud...', err);
                
                // Fallback to Supabase Cloud query
                bootstrapSupabase().then(async sbClient => {
                    if (!sbClient) return;
                    try {
                        const { data, error } = await sbClient.from('hostels').select('*');
                        if (!error && data && data.length > 0) {
                            seedAllHostels(data);
                            renderHostels();
                            console.log('[UniStay] Successfully loaded all ' + data.length + ' entries from Supabase.');
                        }
                    } catch (_) {}
                });
            });
    }

    // ----- Owner Dashboard init -----
    if (document.getElementById('ownerListings')) {
        // Bind the add form submit handler
        const addForm = document.getElementById('addHostelForm');
        if (addForm && !addForm.dataset.boundSubmit) {
            addForm.addEventListener('submit', handleAddHostel);
            addForm.dataset.boundSubmit = '1';
        }

        // Ensure the + Add New Hostel button is correctly wired
        document.querySelectorAll('button').forEach(btn => {
            if (btn.textContent.includes('Add New Hostel')) {
                btn.onclick = openListingForm;
            }
        });

        // Initial tab load
        switchOwnerTab('listings');
    }
});