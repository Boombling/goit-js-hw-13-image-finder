export default function getRefs() {
    return {
        searchRef: document.querySelector('.search-form'),
        cardContainer: document.querySelector('.gallery'),
        loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    };
}