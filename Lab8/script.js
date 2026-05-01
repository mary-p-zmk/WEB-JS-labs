(function() {
    "use strict";

    // --- Логіка меню Гамбургер ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Анімація іконки гамбургера
        hamburger.classList.toggle('toggle');
    });

    // --- Логіка Каруселі ---
    const slideContainer = document.getElementById('carousel-slide');
    const slides = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');

    let currentIndex = 0;
    const totalSlides = slides.length;
    const intervalTime = 5000; // 5 секунд (автоматична зміна)

    // Створення індикаторів
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateUI() {
        slideContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateUI();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateUI();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateUI();
    }

    // Слухачі подій
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Автоматична зміна слайдів (Завдання 1.2.3.2)
    let autoSlide = setInterval(nextSlide, intervalTime);

    // Зупинка таймера при взаємодії користувача
    const resetTimer = () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, intervalTime);
    };

    [prevBtn, nextBtn, indicatorsContainer].forEach(el => {
        el.addEventListener('click', resetTimer);
    });

})();
