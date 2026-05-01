document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Гамбургер меню ---
    const hamBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Анімація появи через CSS
    });

    // --- 2. Карусель ---
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dots');
    const nextBtn = document.getElementById('btn-next');
    const prevBtn = document.getElementById('btn-prev');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Створення індикаторів
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if(i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveCarousel(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function moveCarousel(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    // Кнопки
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        moveCarousel(currentSlide);
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        moveCarousel(currentSlide);
    });

    // Автоматична зміна
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        moveCarousel(currentSlide);
    }, 5000);
});
