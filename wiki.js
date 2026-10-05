document.addEventListener('DOMContentLoaded', () => {
            
            // UI Elements
            const mainNavLinks = document.querySelectorAll('.main-nav-link');
            const wikiSections = document.querySelectorAll('.wiki-section');
            const dungeonToggle = document.getElementById('dungeon-menu-toggle');
            const dungeonSubMenu = document.getElementById('dungeon-sub-menu');
            const dungeonNavLinks = document.querySelectorAll('.dungeon-nav-link');
            const dungeonCards = document.querySelectorAll('.dungeon-card');

            // 1. MAIN SIDEBAR NAVIGATION (Non-Dungeon Links)
            mainNavLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Reset styling on all main sidebar links
                    mainNavLinks.forEach(l => {
                        l.classList.remove('text-sun-orange', 'font-bold');
                        l.classList.add('text-sun-brown');
                    });
                    
                    // Add active styling to clicked link
                    link.classList.remove('text-sun-brown');
                    link.classList.add('text-sun-orange', 'font-bold');
                    
                    // Hide all main sections
                    wikiSections.forEach(sec => {
                        sec.classList.add('hidden');
                        sec.classList.remove('block');
                    });
                    
                    // Show target main section
                    const targetId = link.getAttribute('data-section');
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.classList.remove('hidden');
                        targetSection.classList.add('block');
                    }
                    
                    // Close the Dungeons submenu if we click a different main link
                    if(targetId !== 'section-dungeons') {
                        dungeonSubMenu.classList.add('hidden');
                        dungeonToggle.classList.remove('expanded');
                        dungeonToggle.classList.remove('text-sun-orange', 'font-bold');
                        dungeonToggle.classList.add('text-sun-brown');
                    }
                });
            });

            // 2. TOGGLE DUNGEONS SUBMENU
            dungeonToggle.addEventListener('click', (e) => {
                e.preventDefault();
                dungeonSubMenu.classList.toggle('hidden');
                dungeonToggle.classList.toggle('expanded');
                
                // Styling the main "DUNGEONS" label when open
                if(!dungeonSubMenu.classList.contains('hidden')) {
                    // Reset other main links
                    mainNavLinks.forEach(l => {
                        l.classList.remove('text-sun-orange', 'font-bold');
                        l.classList.add('text-sun-brown');
                    });
                    dungeonToggle.classList.remove('text-sun-brown');
                    dungeonToggle.classList.add('text-sun-orange', 'font-bold');
                    
                    // Switch right side to the Dungeons wrapper
                    wikiSections.forEach(sec => {
                        sec.classList.add('hidden');
                        sec.classList.remove('block');
                    });
                    document.getElementById('section-dungeons').classList.remove('hidden');
                    document.getElementById('section-dungeons').classList.add('block');
                    
                    // By default, if no card is visible, show "General Info"
                    const anyVisible = Array.from(dungeonCards).some(c => c.classList.contains('block'));
                    if(!anyVisible) {
                        document.getElementById('general').classList.add('block');
                        document.getElementById('general').classList.remove('hidden');
                    }
                } else {
                    dungeonToggle.classList.remove('text-sun-orange', 'font-bold');
                    dungeonToggle.classList.add('text-sun-brown');
                }
            });

            // 3. DUNGEON SUB-TAB NAVIGATION
            dungeonNavLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Remove active state background from all submenu links
                    dungeonNavLinks.forEach(t => t.classList.remove('active'));
                    
                    // Add active state to clicked sub-tab
                    link.classList.add('active');
                    
                    // Hide all dungeon cards
                    dungeonCards.forEach(card => {
                        card.classList.remove('block');
                        card.classList.add('hidden');
                    });
                    
                    // Show target dungeon card
                    const targetId = link.getAttribute('data-dungeon');
                    const targetCard = document.getElementById(targetId);
                    if (targetCard) {
                        targetCard.classList.remove('hidden');
                        targetCard.classList.add('block');
                    }
                    
                    // Smooth scroll up to top on mobile
                    if(window.innerWidth < 768) {
                        window.scrollTo({
                            top: targetCard.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });