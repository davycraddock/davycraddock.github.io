// Load header component
async function loadFooter() {
    try {
        const response = await fetch('/assets/components/footer.html');
        const html = await response.text();
        document.getElementById('footer-placeholder').innerHTML = html;
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadFooter);