function populateDates(eventId, maxEvents) {
    const container = document.getElementById('datesEventsGrid');
    if (!container) return;

    container.innerHTML = '';
    const thisEvents = populateEventDates(eventId);
    let filteredEvents = thisEvents;

    if (maxEvents && thisEvents.length > maxEvents) {
        filteredEvents = thisEvents.slice(0, maxEvents);
    }

    if (filteredEvents.length === 0) {
        container.innerHTML = `
            <div class="dates-events-card">
                <div class="dates-events-content">
                    <div class="dates-events-info">
                        <div class="dates-events-day">TBA</div>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    else
    {
        if (filteredEvents.length === 1) {
            document.getElementById("dates-events-header").innerText = "Date and Time";
        }

        if (filteredEvents.length < thisEvents.length) {
            document.getElementById("dates-events-subheader").style.display = "block";
            document.getElementById("dates-events-subheader").innerText = `(Next ${maxEvents} Sessions)`;
        }

        filteredEvents.forEach(x => {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = dayNames[x.eventDate.getDay()];
            const monthDay = x.eventDate.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric'});
            const card = document.createElement('div');
            card.className = `dates-events-card`;
            card.innerHTML = `<div class="dates-events-content">
            <div class="dates-events-info">
                    <div class="dates-events-day">${x.event.start} ${dayName}, ${monthDay}</div>
                </div>
            </div>
        `;

          container.appendChild(card);
        });
    }
}

async function loadDates() {
    try {
        const response = await fetch('/assets/components/dates.html');
        const html = await response.text();

        const placeholder = document.getElementById('dates-placeholder');
        const backgroundImage = placeholder.dataset.backgroundImage;
        const eventId = placeholder.dataset.eventId;
        const maxEvents = placeholder.dataset.maxEvents || null;

        placeholder.innerHTML = html;

        document.getElementById("datesEventSection").style.backgroundImage = `linear-gradient(rgba(0, 141, 208, 0.9), rgba(0, 141, 208, 0.4)), url('${backgroundImage}') `;
        document.getElementById("datesEventSection").style.backgroundSize = "cover";
        document.getElementById("datesEventSection").style.backgroundPosition = "center";
        document.getElementById("datesEventSection").style.backgroundAttachment = "fixed";
        populateDates(eventId, maxEvents);

    } catch (error) {
        console.error('Error loading dates:', error);
    }
}


document.addEventListener('DOMContentLoaded', loadDates);