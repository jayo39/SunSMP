document.addEventListener('DOMContentLoaded', () => {
    // --- WIKI SEARCH LOGIC ---
    const searchInput = document.getElementById('wiki-search-input');
    const searchResults = document.getElementById('wiki-search-results');
    let searchIndex = [];

    // 1. Build an index of all text content in the wiki dynamically
    function buildSearchIndex() {
        const sections = document.querySelectorAll('.wiki-section');
        
        sections.forEach(section => {
            const sectionId = section.id;
            const navLink = document.querySelector(`a[data-section="${sectionId}"]`);
            const sectionName = navLink ? navLink.innerText : (section.querySelector('h1') ? section.querySelector('h1').innerText : 'Wiki');

            const articles = section.querySelectorAll('.dungeon-card');
            
            if (articles.length > 0) {
                // Index multi-page sections (like Dungeons)
                articles.forEach(article => {
                    const articleId = article.id;
                    const articleTitle = article.querySelector('h1') ? article.querySelector('h1').innerText : 'Dungeon';
                    indexElements(article, sectionId, sectionName, articleId, articleTitle);
                });
            } else {
                // Index single-page sections
                indexElements(section, sectionId, sectionName, null, null);
            }
        });
    }

    // 2. Helper to group paragraphs under their respective headings
    function indexElements(container, sectionId, sectionName, subSectionId, subSectionName) {
        let currentChunk = null;
        const elements = container.querySelectorAll('h1, h2, h3, h4, p, li');
        
        elements.forEach(el => {
            const tag = el.tagName;
            if (['H1', 'H2', 'H3', 'H4'].includes(tag)) {
                if (currentChunk && currentChunk.content.trim() !== '') searchIndex.push(currentChunk);
                
                // Add an ID to the heading if it doesn't have one so we can scroll to it
                if (!el.id) el.id = 'target-' + Math.random().toString(36).substr(2, 9);
                
                let breadcrumb = sectionName;
                if (subSectionName && tag !== 'H1') breadcrumb += ` › ${subSectionName}`;
                
                currentChunk = {
                    title: el.innerText.trim(),
                    breadcrumb: breadcrumb,
                    content: '',
                    sectionId: sectionId,
                    subSectionId: subSectionId,
                    elementId: el.id
                };
            } else if (currentChunk) {
                // Accumulate text under the current heading
                currentChunk.content += ' ' + el.innerText.replace(/\s+/g, ' ').trim();
            }
        });
        if (currentChunk && currentChunk.content.trim() !== '') searchIndex.push(currentChunk);
    }

    // 3. Highlight text and generate context snippet
    function getSnippet(text, query) {
        if (!text) return "";
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(query);
        
        let snippet = text;
        if (index !== -1) {
            const start = Math.max(0, index - 35);
            const end = Math.min(text.length, index + query.length + 50);
            snippet = text.substring(start, end);
            if (start > 0) snippet = "..." + snippet;
            if (end < text.length) snippet = snippet + "...";
        } else {
            snippet = text.substring(0, 85) + (text.length > 85 ? "..." : "");
        }
        
        const regex = new RegExp(`(${query})`, 'gi');
        return snippet.replace(regex, `<strong class="text-sun-orange font-black">$1</strong>`);
    }

    // 4. Handle user typing
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }

        const filtered = searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            searchResults.innerHTML = `<div class="p-4 text-sm text-sun-brown/60 text-center">No results found for "${e.target.value}"</div>`;
        } else {
            searchResults.innerHTML = filtered.map(item => `
                <div onclick="gotoSearchResult('${item.sectionId}', '${item.subSectionId || ''}', '${item.elementId}')" 
                     class="p-3 border-b border-sun-brown/10 cursor-pointer hover:bg-sun-brown/10 transition-colors">
                    <div class="font-bold text-sun-brown text-[15px] mb-0.5">${item.title.replace(new RegExp(`(${query})`, 'gi'), '<strong class="text-sun-orange font-black">$1</strong>')}</div>
                    <div class="text-[11px] font-bold uppercase tracking-wider text-sun-brown/50 mb-1.5">${item.breadcrumb}</div>
                    <div class="text-sm text-sun-brown/80 leading-snug">${getSnippet(item.content, query)}</div>
                </div>
            `).join('');
        }
        searchResults.classList.remove('hidden');
    });

    // 5. Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });

    // Run indexer
    buildSearchIndex();
});

// 6. Navigation Logic when a result is clicked
window.gotoSearchResult = function(sectionId, subSectionId, elementId) {
    // Hide all main sections & show target
    document.querySelectorAll('.wiki-section').forEach(sec => sec.classList.add('hidden', 'block') && sec.classList.remove('block'));
    document.querySelectorAll('.wiki-section').forEach(sec => sec.classList.add('hidden'));
    const targetSec = document.getElementById(sectionId);
    if(targetSec) { targetSec.classList.remove('hidden'); targetSec.classList.add('block'); }

    // Reset main sidebar links
    document.querySelectorAll('.main-nav-link').forEach(l => {
        l.classList.remove('text-sun-orange', 'font-bold');
        l.classList.add('text-sun-brown');
    });

    // Highlight target sidebar link
    const mainLink = document.querySelector(`a[data-section="${sectionId}"]`);
    if(mainLink) { mainLink.classList.remove('text-sun-brown'); mainLink.classList.add('text-sun-orange', 'font-bold'); }

    // Handle Dungeon / Sub-menu Routing
    const dungeonToggle = document.getElementById('dungeon-menu-toggle');
    const dungeonSubMenu = document.getElementById('dungeon-sub-menu');
    
    if (subSectionId) {
        dungeonSubMenu.classList.remove('hidden');
        dungeonToggle.classList.add('expanded', 'text-sun-orange', 'font-bold');
        dungeonToggle.classList.remove('text-sun-brown');

        document.querySelectorAll('.dungeon-card').forEach(card => {
            card.classList.remove('block');
            card.classList.add('hidden');
        });
        
        const targetCard = document.getElementById(subSectionId);
        if(targetCard) { targetCard.classList.remove('hidden'); targetCard.classList.add('block'); }

        document.querySelectorAll('.dungeon-nav-link').forEach(l => l.classList.remove('active'));
        const subLink = document.querySelector(`a[data-dungeon="${subSectionId}"]`);
        if(subLink) subLink.classList.add('active');
    } else {
        dungeonSubMenu.classList.add('hidden');
        dungeonToggle.classList.remove('expanded', 'text-sun-orange', 'font-bold');
        dungeonToggle.classList.add('text-sun-brown');
    }

    // Clean up search UI
    document.getElementById('wiki-search-results').classList.add('hidden');
    document.getElementById('wiki-search-input').value = '';
    
    // Smooth scroll to the specific paragraph/heading
    setTimeout(() => {
        const targetEl = document.getElementById(elementId);
        if(targetEl) {
            const y = targetEl.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for the sticky nav
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    }, 50);
};