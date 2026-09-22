/**
 * UniStay - Global Client-Side Environment Configuration Module
 * 
 * This file registers environment tokens onto the global window context.
 * The Supabase JavaScript Client pulls these values directly to initialize 
 * connections with the Supabase Cloud database.
 * 
 * IMPORTANT FOR SECURITY: 
 * On a production environment, restrict your public anon key via Supabase 
 * dashboard policies (Row Level Security - RLS) to prevent unauthorized tables access.
 */

window.env = {
    // Live Supabase Project URL for the UniStay Instance
    SUPABASE_URL: "https://yokostimydhk.supabase.co",
    
    // Public Anon API Key Placeholder (Replace with your actual key in production)
    SUPABASE_KEY: "YOUR_ACTUAL_ANON_PUBLIC_KEY_HERE"
};

// Freeze the environment configuration to prevent dynamic mutations at runtime
if (typeof Object.freeze === 'function') {
    Object.freeze(window.env);
}