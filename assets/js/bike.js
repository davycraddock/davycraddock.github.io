function populateBikeDates() {
    const container = document.getElementById('event-date-header');
    if (!container) return;

    container.innerHTML = '';

    const thisEvents = populateEventDates('bike');

    if (thisEvents.length === 0) {
        container.innerHTML = `
            <div class="no-events-message">
                TBA
            </div>
        `;
        return;
    }
    else
    {
        thisEvents.forEach(x => {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = dayNames[x.eventDate.getDay()];
            const monthDay = x.eventDate.toLocaleDateString('en-AU', { month: 'short', day: 'numeric'});

            const eventDate = document.createElement('h1');
            eventDate.className = `event-date ${x.event.type}`;
                eventDate.innerHTML = `
             <h1>${dayName}, ${monthDay}</h1>
        `;

          container.appendChild(eventDate);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    populateBikeDates();
});