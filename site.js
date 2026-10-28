/* Shared behavior. Publication data remains in data.js. */
(() => {
    'use strict';

    const page = document.body.dataset.page;

    // Keep existing bookmarks to the former single-page sections working.
    if (page === 'home') {
        const movedSections = {
            '#publications': 'publications.html',
            '#teaching': 'teaching.html'
        };
        const destination = movedSections[window.location.hash];
        if (destination) {
            window.location.replace(new URL(destination, document.baseURI).href);
            return;
        }
    }

    // Preserve the original rotating profile photo on every page.
    // const profilePhotos = ['files/tim.jpg', 'files/tim2.jpg', 'files/tim3.jpg'];
    const profile = document.getElementById('profile-pic');
    if (profile) {
        profile.addEventListener('load', () => { profile.hidden = false; });
        profile.addEventListener('error', () => { profile.hidden = true; });
        // profile.src = profilePhotos[Math.floor(Math.random() * profilePhotos.length)];
        if (profile.complete && profile.naturalWidth > 0) profile.hidden = false;
    }

    // Home and Publications share the same publication data and renderer.
    if (page !== 'home' && page !== 'publications') return;

    const list = document.getElementById(page === 'home' ? 'selected-pub-list' : 'pub-list');
    if (!list) return;

    if (typeof recentPublications === 'undefined' ||
        typeof mlPublications === 'undefined' ||
        typeof chemPublications === 'undefined') {
        list.textContent = 'Publication data could not be loaded. Please reload the page.';
        return;
    }

    // Newest year first. Entries from the same year retain their data.js order.
    const yearOf = paper => Number(paper.year) || 0;
    const allPublications = [
        ...recentPublications,
        ...mlPublications,
        ...chemPublications
    ].sort((a, b) => yearOf(b) - yearOf(a));

    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined && text !== null) node.textContent = String(text);
        return node;
    }

    // textContent keeps names, apostrophes, and other text from being treated as HTML.
    function externalLink(text, url, className = '') {
        const link = element('a', className, text);
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        return link;
    }

    function renderPaper(paper) {
        const article = element('article', 'publication-entry');
        const title = element('h3', 'publication-title');
        title.append(paper.url
            ? externalLink(paper.title, paper.url)
            : document.createTextNode(paper.title || 'Untitled publication'));
        article.append(title);

        const authors = element('p', 'publication-authors');
        (Array.isArray(paper.authors) ? paper.authors : []).forEach((author, index) => {
            if (index > 0) authors.append(document.createTextNode(', '));
            if (typeof author === 'string') {
                authors.append(document.createTextNode(author));
            } else if (author && author.url) {
                authors.append(externalLink(author.name, author.url));
            } else if (author && author.name) {
                authors.append(document.createTextNode(author.name));
            }
        });
        article.append(authors);

        const venue = element('p', 'publication-venue', paper.venue || '');
        if (paper.award) venue.append(element('span', 'award', paper.award));
        if (paper.journal) venue.append(element('span', 'publication-journal', paper.journal));
        article.append(venue);

        const extraLinks = [paper.extraLink, paper.extraLink2].filter(link => link && link.url);
        if (extraLinks.length > 0) {
            const extra = element('div', 'publication-extra');
            extraLinks.forEach(link => extra.append(externalLink(link.text, link.url, 'text-primary')));
            article.append(extra);
        }
        return article;
    }

    function renderPublications(papers, emptyMessage) {
        const contents = document.createDocumentFragment();
        papers.forEach(paper => contents.append(renderPaper(paper)));
        if (papers.length === 0) {
            contents.append(element('p', 'muted', emptyMessage));
        }
        list.replaceChildren(contents);
    }

    // Selected papers appear only on Home, controlled by selected: true in data.js.
    if (page === 'home') {
        renderPublications(
            allPublications.filter(paper => paper.selected === true),
            'No selected publications yet.'
        );
        return;
    }

    const controls = document.getElementById('publication-filters');
    if (!controls) return;
    const buttons = [...controls.querySelectorAll('[data-publication-filter]')];
    const validFilters = new Set(buttons.map(button => button.dataset.publicationFilter));

    function filterFromLocation() {
        const requested = new URLSearchParams(window.location.search).get('filter');
        // Missing, unknown, or retired "selected" links open All publications.
        return validFilters.has(requested) ? requested : 'all';
    }

    let activeFilter;
    function showPublications(filter) {
        activeFilter = validFilters.has(filter) ? filter : 'all';
        const papers = allPublications.filter(paper => {
            if (activeFilter === 'all') return true;
            return Array.isArray(paper.categories) && paper.categories.includes(activeFilter);
        });
        renderPublications(papers, 'No publications match this filter.');
        buttons.forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.publicationFilter === activeFilter));
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.publicationFilter;
            if (filter === activeFilter) return;
            showPublications(filter);
            // Shareable filters; Back/Forward restores the prior filter.
            const url = new URL(window.location.href);
            if (filter === 'all') url.searchParams.delete('filter');
            else url.searchParams.set('filter', filter);
            try {
                window.history.pushState(null, '', url.href);
            } catch (error) {
                // Some file:// environments restrict History API updates.
                // Filtering still works when opening the files directly.
            }
        });
    });
    window.addEventListener('popstate', () => showPublications(filterFromLocation()));
    showPublications(filterFromLocation());
    controls.hidden = false;
})();
