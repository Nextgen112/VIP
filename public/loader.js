// Load the game mod
function loadGameMod() {
    const gameFrame = document.getElementById('game-frame');
    gameFrame.innerHTML = '<div class="loader">Loading game mod...</div>';
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'vip.js?v=' + Date.now(); // Cache busting
    script.onload = () => {
        console.log('Game mod loaded successfully');
        // Call any initialization functions from your mod here
        if (typeof gameInit === 'function') {
            gameInit();
        }
    };
    script.onerror = () => {
        gameFrame.innerHTML = '<div class="error">Failed to load game mod</div>';
    };
    
    document.body.appendChild(script);
}

// Auto-reload every 5 minutes (optional)
const AUTO_RELOAD_INTERVAL = 5 * 60 * 1000;
let reloadInterval;

function setupAutoReload() {
    reloadInterval = setInterval(() => {
        console.log('Auto-reloading game mod...');
        loadGameMod();
    }, AUTO_RELOAD_INTERVAL);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load the game immediately
    loadGameMod();
    
    // Set up auto-reload
    setupAutoReload();
    
    // Manual reload button
    document.getElementById('reload-btn').addEventListener('click', () => {
        console.log('Manual reload triggered');
        clearInterval(reloadInterval);
        loadGameMod();
        setupAutoReload();
    });
    
    // Check for mod updates periodically
    setInterval(checkForUpdates, 60000);
});

// Update checker
function checkForUpdates() {
    fetch('vip.js?check=' + Date.now(), { method: 'HEAD' })
        .then(response => {
            const lastModified = new Date(response.headers.get('Last-Modified'));
            const currentVersion = document.getElementById('mod-version').textContent;
            
            // Compare with known version (you would need to implement version tracking)
            console.log('Last modified:', lastModified);
            // Implement your version comparison logic here
        })
        .catch(error => console.error('Update check failed:', error));
}
