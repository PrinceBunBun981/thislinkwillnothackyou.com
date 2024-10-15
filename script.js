let lastScrollTop = 0;

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener("scroll", debounce(function () {
    const header = document.querySelector("header");
    const tipsAnchor = document.querySelector("#tips");

    const headerRect = header.getBoundingClientRect();
    const isHeaderVisible = headerRect.bottom > 0 && headerRect.top < window.innerHeight;

    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop && isHeaderVisible) {
        const tipsPosition = tipsAnchor.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: tipsPosition - 20,
            behavior: "smooth"
        });
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}, 100));
