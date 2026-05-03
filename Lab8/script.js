document.addEventListener('DOMContentLoaded', () => {
    // 1. Анімоване Меню (Гамбургер)
    const hamBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // 2. Функціонал Каруселі
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dots');
    const nextBtn = document.getElementById('btn-next');
    const prevBtn = document.getElementById('btn-prev');

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoPlay;

    // Створення крапок
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetTimer();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        goToSlide(currentIndex);
    }

    // Слухачі кнопок
    nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    // Автоматична зміна (Кожні 5 секунд)
    function startTimer() {
        autoPlay = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
        clearInterval(autoPlay);
        startTimer();
    }

    startTimer();
});
