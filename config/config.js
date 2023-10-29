console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://llimsnoqrgrynlublsbm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsaW1zbm9xcmdyeW5sdWJsc2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMzY3MzUsImV4cCI6MjAxMTkxMjczNX0.sJGU2pq-O6cLKb03hYXzkbJEoGGnUvU4qQGWptj7IQo'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});


export { supa }