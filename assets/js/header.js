async function loadHeader() {
    try {
        const response = await fetch('/assets/components/header.html');
        const html = await response.text();
        document.getElementById('header-placeholder').innerHTML = html;

        const dropdowns = document.querySelectorAll('.nav-dropdown');

        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.nav-dropdown-toggle');
            
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            const isCurrentlyOpen = dropdown.classList.contains('active');
            
            dropdowns.forEach(d => d.classList.remove('active'));
            
            if (!isCurrentlyOpen) {
                dropdown.classList.add('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHeader);
