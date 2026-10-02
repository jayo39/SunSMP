const SERVER_IP = 'play.sunsmp.com';

// 1. Live Player Count Fetcher
async function fetchPlayerCount() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
        const data = await response.json();
        const countText = document.getElementById('live-player-count');
        
        if (data && data.online) {
            countText.innerText = `${data.players.online} / ${data.players.max} players online`;
        } else {
            countText.innerText = 'Server is currently offline';
        }
    } catch (error) {
        document.getElementById('live-player-count').innerText = 'Could not load player count';
    }
}

// 2. Tab Switcher for Java / Bedrock
function switchTab(platform) {
    const javaTab = document.getElementById('tab-java');
    const bedrockTab = document.getElementById('tab-bedrock');
    const stepsJava = document.getElementById('steps-java');
    const stepsBedrock = document.getElementById('steps-bedrock');

    if (platform === 'bedrock') {
        stepsJava.classList.add('hidden');
        stepsBedrock.classList.remove('hidden');
        bedrockTab.className = "btn-mc bg-sun-yellow text-sun-purple border-2 border-sun-orange shadow-[0_4px_0_#D96A20] px-6 py-2 transition-all";
        javaTab.className = "btn-mc bg-sun-carddark text-sun-light border-2 border-[#4A3B5D] shadow-[0_4px_0_#1A0F24] px-6 py-2 opacity-70 hover:opacity-100 transition-all";
    } else {
        stepsBedrock.classList.add('hidden');
        stepsJava.classList.remove('hidden');
        javaTab.className = "btn-mc bg-sun-yellow text-sun-purple border-2 border-sun-orange shadow-[0_4px_0_#D96A20] px-6 py-2 transition-all";
        bedrockTab.className = "btn-mc bg-sun-carddark text-sun-light border-2 border-[#4A3B5D] shadow-[0_4px_0_#1A0F24] px-6 py-2 opacity-70 hover:opacity-100 transition-all";
    }
}

// 3. Satisfying Click Particles Generator (BUG FIXED)
function spawnCopyParticles(e) {
    const colors = ['#FFD166', '#FF8C42', '#F49B36', '#FFF5E6'];
    const amount = 12; 
    
    for (let i = 0; i < amount; i++) {
        const particle = document.createElement('div');
        
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = (Math.random() * 6 + 4) + 'px'; 
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '2px'; 
        particle.style.pointerEvents = 'none'; // Critical for not blocking mouse hover
        particle.style.zIndex = '9999';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 3 + Math.random() * 5;
        const tx = Math.cos(angle) * velocity * 15;
        const ty = Math.sin(angle) * velocity * 15 - 20; 
        const rot = Math.random() * 360;
        
        // FIX: The animation now strictly holds the opacity: 0 state to prevent ghosting,
        // and safely deletes itself via the `.onfinish` callback.
        const animation = particle.animate([
            { transform: `translate(-50%, -50%) rotate(0deg) scale(1)`, opacity: 1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(0)`, opacity: 0 }
        ], {
            duration: 600 + Math.random() * 300,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            fill: 'forwards' 
        });
        
        animation.onfinish = () => {
            particle.remove();
        };

        document.body.appendChild(particle);
    }
}

// 4. IP Copy Logic
function copyIP(event, context) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const tempInput = document.createElement("input");
    tempInput.value = SERVER_IP;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    if (context === 'top') {
        const el = document.getElementById('copy-text');
        if (el) {
            el.innerHTML = '<span class="mt-[2px] sm:mt-0">Copied!</span>';
            el.classList.add('bg-green-500');
            
            setTimeout(() => {
                el.innerHTML = '<span class="mt-[2px] sm:mt-0">Click to copy</span>';
                el.classList.remove('bg-green-500');
            }, 2000);
        }
        
        const ipDisplay = document.getElementById('server-ip');
        if (ipDisplay) {
            ipDisplay.style.transform = 'scale(1.03)';
            ipDisplay.style.transition = 'transform 0.1s ease';
            setTimeout(() => {
                ipDisplay.style.transform = 'scale(1)';
            }, 150);
        }
    } 
    
    else if (context === 'step3' || context === 'step3bedrock') {
        spawnCopyParticles(event); 
        
        const el = event.currentTarget; 
        if (el) {
            el.innerText = 'Copied!';
            el.classList.add('bg-green-500', 'text-white', 'border-green-600');
            el.classList.remove('bg-sun-yellow/20', 'text-sun-yellow', 'border-sun-yellow/50');
            
            setTimeout(() => {
                el.innerText = context === 'step3bedrock' ? 'Copy IP' : 'Copy';
                el.classList.remove('bg-green-500', 'text-white', 'border-green-600');
                el.classList.add('bg-sun-yellow/20', 'text-sun-yellow', 'border-sun-yellow/50');
            }, 2000);
        }
    } 
    
    else if (context === 'bottom') {
        spawnCopyParticles(event); 
        
        const el = document.getElementById('bottom-copy-text');
        if (el) {
            el.innerText = 'Copied!';
            el.classList.add('text-green-400');
            
            setTimeout(() => {
                el.innerText = 'Click to copy';
                el.classList.remove('text-green-400');
            }, 2000);
        }
    }
}

// 5. Generate Ambient Background Particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return; 
    
    // Increased from 20 to 50 for more particles
    const particleCount = 50; 
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 4; 
        const posX = Math.random() * 100; 
        const posY = Math.random() * 100 + 100; 
        
        // Decreased max delay from 10s to 4s so they appear sooner
        const delay = Math.random() * 4; 
        
        // Decreased duration from (10 to 20s) to (6 to 12s) so they float faster
        const duration = Math.random() * 6 + 6; 
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        const colors = ['#FFD166', '#FF8C42', '#FFF5E6'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}

// Initialize everything on page load
window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    fetchPlayerCount();
    
    // Refresh player count every 60 seconds
    setInterval(fetchPlayerCount, 60000);
});