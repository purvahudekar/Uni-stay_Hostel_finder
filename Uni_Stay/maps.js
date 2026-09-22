let map;
let markers = [];
let userLocationMarker = null;

// OpenStreetMap uses free Nominatim API for geocoding
// Note: It has a rate limit of 1 request per second
const sleep = ms => new Promise(r => setTimeout(r, ms));

function initMainMap() {
    if (!map && document.getElementById('map')) {
        // User requested coordinates for Pune
        map = L.map('map').setView([18.5204, 73.8567], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    }
}

async function addHostelMarkers(hostels) {
    if (!map && document.getElementById('map')) {
        initMainMap();
    }
    if (!map) return;
    
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    let bounds = [];
    
    for (const hostel of hostels) {
        try {
            let lat = null;
            let lon = null;

            // Direct Coordinate Check (Preloaded coordinates from seed/DB)
            if (hostel.lat && (hostel.lng || hostel.lon)) {
                lat = parseFloat(hostel.lat);
                lon = parseFloat(hostel.lng || hostel.lon);
            } 
            // Geocoding Fallback Engine (Nominatim)
            else {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(hostel.address + ', India')}`);
                const data = await response.json();
                
                if (data && data.length > 0) {
                    lat = parseFloat(data[0].lat);
                    lon = parseFloat(data[0].lon);
                    
                    // Respect Nominatim rate limit only when geocoding dynamically
                    if (hostels.length > 1) {
                        await sleep(1000); 
                    }
                }
            }
            
            if (lat && lon) {
                const marker = L.marker([lat, lon]).addTo(map);
                
                const popupContent = `
                    <div style="padding: 5px;">
                        <h4 style="margin: 0 0 5px 0;">${hostel.hostel_name || hostel.name}</h4>
                        <p style="margin: 0 0 5px 0; font-size: 0.85rem;">📍 ${hostel.address || hostel.location}</p>
                        <p style="margin: 0; font-weight: bold; color: var(--primary, #7c3aed);">${hostel.monthly_rent || hostel.price}</p>
                    </div>
                `;
                
                marker.bindPopup(popupContent);
                markers.push(marker);
                bounds.push([lat, lon]);
            }
        } catch (error) {
            console.error("Geocoding failed for", hostel.hostel_name, error);
        }
    }
    
    if (bounds.length > 0 && !userLocationMarker) {
        map.fitBounds(bounds);
    }
}

function getUserLocation() {
    if (!map && document.getElementById('map')) {
        initMainMap();
    }
    
    if (navigator.geolocation) {
        const btn = document.getElementById('findMeBtn');
        if (btn) btn.innerHTML = 'Locating...';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                if (map) {
                    map.setView([lat, lon], 15);
                    
                    if (userLocationMarker) map.removeLayer(userLocationMarker);
                    
                    userLocationMarker = L.circleMarker([lat, lon], {
                        radius: 8,
                        fillColor: "#3b82f6",
                        color: "#fff",
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 1
                    }).addTo(map);
                    userLocationMarker.bindPopup("You are here").openPopup();
                }
                if (btn) btn.innerHTML = 'Find Near Me';
            },
            (err) => {
                console.error(err);
                alert("Error: The Geolocation service failed or permission denied.");
                const btn = document.getElementById('findMeBtn');
                if (btn) btn.innerHTML = 'Find Near Me';
            }
        );
    } else {
        alert("Error: Your browser doesn't support geolocation.");
    }
}

async function initDetailMap(hostel) {
    const detailMapEl = document.getElementById('map');
    if (!detailMapEl || !hostel) return;
    
    if (!map) {
        map = L.map('map').setView([18.5204, 73.8567], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    }
    
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(hostel.address + ', India')}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            
            map.setView([lat, lon], 15);
            L.marker([lat, lon]).addTo(map).bindPopup(hostel.hostel_name || hostel.name).openPopup();
            
            detailMapEl.dataset.lat = lat;
            detailMapEl.dataset.lon = lon;
        }
    } catch (error) {
        console.error("Geocoding failed", error);
    }
}

function getDirections() {
    const detailMapEl = document.getElementById('map');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const startLat = position.coords.latitude;
                const startLon = position.coords.longitude;
                
                const endLat = detailMapEl?.dataset.lat;
                const endLon = detailMapEl?.dataset.lon;
                
                if (endLat && endLon) {
                    // OpenStreetMap routing engine
                    window.open(`https://www.openstreetmap.org/directions?engine=osrm_car&route=${startLat},${startLon};${endLat},${endLon}`, '_blank');
                } else {
                    const addressText = document.getElementById('detailLocation')?.innerText || 'Hostel';
                    window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(addressText)}`, '_blank');
                }
            },
            () => {
                const addressText = document.getElementById('detailLocation')?.innerText || 'Hostel';
                window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(addressText)}`, '_blank');
            }
        );
    } else {
        const addressText = document.getElementById('detailLocation')?.innerText || 'Hostel';
        window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(addressText)}`, '_blank');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page with a map and initialize
    if (document.getElementById('map') && !window.location.pathname.includes('hostel-detail.html')) {
        initMainMap();
    }
});
