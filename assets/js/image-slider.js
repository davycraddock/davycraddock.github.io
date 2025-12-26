function generateSliderImages(imageFolderPath, sliderId, numberOfImages) {

    let currentIndex = 0;
    const imagesPerSlide = 4;
    const totalSlides = Math.ceil(numberOfImages / imagesPerSlide);    
    const slider = document.getElementById(sliderId);

    slider.innerHTML = '';
    
    for (let i = 0; i < numberOfImages; i += imagesPerSlide) {
        const slideDiv = document.createElement('div');
        slideDiv.className = `slide-image-container`;
        
        for (let j = 0; j < imagesPerSlide && (i + j) < numberOfImages; j++) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'slide-image';
            
            const img = document.createElement('img');
            img.src = imageFolderPath + `image${i+j+1}.jpg`;
            img.alt = `image${i+j+1}`;
            img.loading = 'lazy';
            
            imageContainer.appendChild(img);           
            slideDiv.appendChild(imageContainer);
        }
        
        slider.appendChild(slideDiv);
    }

    function goToNextSlide() {

        currentIndex = (currentIndex + 1) % totalSlides;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(goToNextSlide, 5000);
}

async function loadImageSlider() {
    try {

        const placeholders = document.querySelectorAll('.image-slider-placeholder');

        placeholders.forEach(async (placeholder) => {
            const response = await fetch('/assets/components/image-slider.html');
            const html = await response.text();

            const id = placeholder.dataset.id;
            const folder = placeholder.dataset.folder;
            const numberOfImages = parseInt(placeholder.dataset.numberOfImages);
            placeholder.innerHTML = html;

            const track = placeholder.querySelector('.slider-image-track');
            track.id = id;

            generateSliderImages(folder, id, numberOfImages);
        });
    } catch (error) {
        console.error('Error loading title:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadImageSlider);
