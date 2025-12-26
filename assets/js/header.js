async function loadHeader() {
    try {
        const response = await fetch('/assets/components/header.html');
        const html = await response.text();
        document.getElementById('header-placeholder').innerHTML = html;
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHeader);
