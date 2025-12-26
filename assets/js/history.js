function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    function checkScroll() {
        const scrollPos = window.scrollY;
        const windowHeight = window.innerHeight;
        
        timelineItems.forEach((item) => {
            const itemTop = item.offsetTop;
            const itemHeight = item.offsetHeight;
            const itemMiddle = itemTop + (itemHeight / 2);
            
            const viewportMiddle = scrollPos + (windowHeight / 2);
            const distance = Math.abs(viewportMiddle - itemMiddle);
            
            if (distance < windowHeight / 2) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        if (scrollPos > 100 && scrollIndicator) {
            scrollIndicator.style.opacity = '0';
        } else if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

document.addEventListener('DOMContentLoaded', initTimeline);