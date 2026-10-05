document.addEventListener('DOMContentLoaded', () => {
    
    // UI Elements
    const mainNavLinks = document.querySelectorAll('.main-nav-link');
    const wikiSections = document.querySelectorAll('.wiki-section');
    
    const dungeonToggle = document.getElementById('dungeon-menu-toggle');
    const dungeonSubMenu = document.getElementById('dungeon-sub-menu');
    const dungeonNavLinks = document.querySelectorAll('.dungeon-nav-link');
    const dungeonCards = document.querySelectorAll('.dungeon-card');

    const economyToggle = document.getElementById('economy-menu-toggle');
    const economySubMenu = document.getElementById('economy-sub-menu');
    const economyNavLinks = document.querySelectorAll('.economy-nav-link');
    const economyCards = document.querySelectorAll('.economy-card');

    // Helper: Reset ALL sidebar link highlights
    function resetAllHighlights() {
        mainNavLinks.forEach(l => {
            l.classList.remove('text-sun-orange', 'font-bold');
            l.classList.add('text-sun-brown');
        });
        if (dungeonToggle) {
            dungeonToggle.classList.remove('text-sun-orange', 'font-bold');
            dungeonToggle.classList.add('text-sun-brown');
        }
        if (economyToggle) {
            economyToggle.classList.remove('text-sun-orange', 'font-bold');
            economyToggle.classList.add('text-sun-brown');
        }
        
        // Clear sub-menu highlights so they don't stay darkened when you leave the section
        dungeonNavLinks.forEach(t => t.classList.remove('active'));
        economyNavLinks.forEach(t => t.classList.remove('active'));
    }

    // Helper: Hide all main sections
    function hideAllSections() {
        wikiSections.forEach(sec => {
            sec.classList.add('hidden');
            sec.classList.remove('block');
        });
    }

    // Helper: Close all submenus
    function closeAllSubmenus(except = null) {
        if (except !== 'dungeons' && dungeonSubMenu) {
            dungeonSubMenu.classList.add('hidden');
            if (dungeonToggle) dungeonToggle.classList.remove('expanded');
        }
        if (except !== 'economy' && economySubMenu) {
            economySubMenu.classList.add('hidden');
            if (economyToggle) economyToggle.classList.remove('expanded');
        }
    }

    // 1. MAIN SIDEBAR NAVIGATION (Non-Dropdown Links)
    mainNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            closeAllSubmenus(); // Close all open dropdowns
            resetAllHighlights();
            
            link.classList.remove('text-sun-brown');
            link.classList.add('text-sun-orange', 'font-bold');
            
            hideAllSections();
            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('block');
            }
        });
    });

    // 2. TOGGLE DUNGEONS SUBMENU
    if (dungeonToggle) {
        dungeonToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            closeAllSubmenus('dungeons'); // Close Economy if open
            dungeonSubMenu.classList.toggle('hidden');
            dungeonToggle.classList.toggle('expanded');
            
            // We deliberately do NOT change the visible section or highlights here.
            // It simply expands/collapses the menu while letting the user stay on their current page.
        });
    }

    // 3. DUNGEON SUB-TAB NAVIGATION
    dungeonNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            closeAllSubmenus('dungeons');
            hideAllSections();
            document.getElementById('section-dungeons').classList.remove('hidden');
            document.getElementById('section-dungeons').classList.add('block');
            
            resetAllHighlights();
            dungeonToggle.classList.remove('text-sun-brown');
            dungeonToggle.classList.add('text-sun-orange', 'font-bold');

            // Manage sub-tab active states
            link.classList.add('active');
            
            dungeonCards.forEach(card => {
                card.classList.remove('block');
                card.classList.add('hidden');
            });
            
            const targetId = link.getAttribute('data-dungeon');
            const targetCard = document.getElementById(targetId);
            if (targetCard) {
                targetCard.classList.remove('hidden');
                targetCard.classList.add('block');
            }
            
            if(window.innerWidth < 768) {
                window.scrollTo({ top: targetCard.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // 4. TOGGLE ECONOMY SUBMENU
    if (economyToggle) {
        economyToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            closeAllSubmenus('economy'); // Close Dungeons if open
            economySubMenu.classList.toggle('hidden');
            economyToggle.classList.toggle('expanded');
            
            // We deliberately do NOT change the visible section or highlights here.
        });
    }

    // 5. ECONOMY SUB-TAB NAVIGATION
    economyNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            closeAllSubmenus('economy');
            hideAllSections();
            document.getElementById('section-economy').classList.remove('hidden');
            document.getElementById('section-economy').classList.add('block');
            
            resetAllHighlights();
            economyToggle.classList.remove('text-sun-brown');
            economyToggle.classList.add('text-sun-orange', 'font-bold');

            // Manage sub-tab active states
            link.classList.add('active');
            
            economyCards.forEach(card => {
                card.classList.remove('block');
                card.classList.add('hidden');
            });
            
            const targetId = link.getAttribute('data-economy');
            const targetCard = document.getElementById(targetId);
            if (targetCard) {
                targetCard.classList.remove('hidden');
                targetCard.classList.add('block');
            }
            
            if(window.innerWidth < 768) {
                window.scrollTo({ top: targetCard.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

});