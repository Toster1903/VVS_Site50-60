document.addEventListener('DOMContentLoaded', function() {
    // Fixed header on scroll
    const header = document.getElementById('header');
    const scrollWatcher = () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
        } else {
            header.style.padding = '20px 0';
        }
    };
    window.addEventListener('scroll', scrollWatcher);

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealElementsOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealElementsOnScroll);
    window.addEventListener('load', revealElementsOnScroll);
    
    // Дополнительные анимации для карточек курсов
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        // Добавляем небольшую задержку для каждой карточки, чтобы они появлялись поочередно
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Добавляем эффект при наведении
        card.addEventListener('mouseenter', function() {
            // Подсвечиваем соседние карточки
            courseCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Возвращаем обычное состояние
            courseCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });

    // Course details modal
    const modalOverlay = document.getElementById('modal-overlay');
    const courseModal = document.getElementById('course-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    const detailsButtons = document.querySelectorAll('.details-btn');
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
    // Debug logging
    console.log('Modal elements:', {
        modalOverlay: modalOverlay,
        courseModal: courseModal,
        modalTitle: modalTitle,
        modalContent: modalContent,
        closeModal: closeModal,
        detailsButtons: detailsButtons.length
    });

    // Make sure the modal is hidden initially
    if (modalOverlay) {
        modalOverlay.classList.add('hidden');
        console.log('Modal hidden on initial load');
    }
    
    // Course details content
    const courseDetails = {
        basic: {
            title: 'Базовый курс',
            content: `
                <h3>Программа курса:</h3>
                <ul>
                    <li>Модуль 1: Основы работы с компьютером и интернетом</li>
                    <li>Модуль 2: Работа с базовыми офисными программами</li>
                    <li>Модуль 3: Облачные технологии и совместная работа</li>
                    <li>Модуль 4: Информационная безопасность</li>
                    <li>Модуль 5: Работа с данными</li>
                </ul>
                <h3>Длительность:</h3>
                <p>4 недели (8 занятий по 2 часа)</p>
                <h3>Формат обучения:</h3>
                <p>Онлайн-вебинары, практические задания, индивидуальные консультации</p>
                <h3>Результат:</h3>
                <p>По окончании курса вы получите сертификат и базовые навыки работы с современными цифровыми инструментами.</p>
            `
        },
        accounting: {
            title: 'Углублённый курс для бухгалтеров',
            content: `
                <h3>Программа курса:</h3>
                <ul>
                    <li>Модуль 1: Работа с программой 1С:Бухгалтерия</li>
                    <li>Модуль 2: Электронный документооборот</li>
                    <li>Модуль 3: Онлайн-отчётность</li>
                    <li>Модуль 4: Облачная бухгалтерия</li>
                    <li>Модуль 5: Автоматизация рутинных операций</li>
                </ul>
                <h3>Длительность:</h3>
                <p>6 недель (12 занятий по 2 часа)</p>
                <h3>Формат обучения:</h3>
                <p>Онлайн-вебинары, практические задания, индивидуальные консультации</p>
                <h3>Результат:</h3>
                <p>По окончании курса вы сможете эффективно использовать цифровые инструменты в бухгалтерской работе, что значительно повысит вашу производительность.</p>
            `
        },
        medical: {
            title: 'Углублённый курс для медработников',
            content: `
                <h3>Программа курса:</h3>
                <ul>
                    <li>Модуль 1: Медицинские информационные системы</li>
                    <li>Модуль 2: Электронная медицинская карта</li>
                    <li>Модуль 3: Телемедицина и онлайн-консультации</li>
                    <li>Модуль 4: Защита персональных данных пациентов</li>
                    <li>Модуль 5: Мобильные приложения в здравоохранении</li>
                </ul>
                <h3>Длительность:</h3>
                <p>6 недель (12 занятий по 2 часа)</p>
                <h3>Формат обучения:</h3>
                <p>Онлайн-вебинары, практические задания, индивидуальные консультации</p>
                <h3>Результат:</h3>
                <p>По окончании курса вы сможете эффективно использовать современные цифровые технологии в медицинской практике, что повысит качество обслуживания пациентов.</p>
            `
        },
        logistics: {
            title: 'Углублённый курс для логистов',
            content: `
                <h3>Программа курса:</h3>
                <ul>
                    <li>Модуль 1: Транспортные информационные системы</li>
                    <li>Модуль 2: Электронный документооборот в логистике</li>
                    <li>Модуль 3: GPS-трекинг и мониторинг</li>
                    <li>Модуль 4: Оптимизация маршрутов</li>
                    <li>Модуль 5: Аналитика и отчетность</li>
                </ul>
                <h3>Длительность:</h3>
                <p>6 недель (12 занятий по 2 часа)</p>
                <h3>Формат обучения:</h3>
                <p>Онлайн-вебинары, практические задания, индивидуальные консультации</p>
                <h3>Результат:</h3>
                <p>По окончании курса вы сможете эффективно использовать цифровые технологии для оптимизации логистических процессов и сокращения издержек.</p>
            `
        }
    };

    // Open modal with course details
    if (detailsButtons.length > 0 && modalOverlay) {
        detailsButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default button behavior
                const courseType = this.getAttribute('data-course');
                const courseInfo = courseDetails[courseType];
                
                if (courseInfo) {
                    modalTitle.textContent = courseInfo.title;
                    modalContent.innerHTML = courseInfo.content;
                    modalOverlay.classList.remove('hidden');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });
    }

    // Close modal
    if (closeModal && modalOverlay) {
        console.log('Adding event listener to close button');
        closeModal.addEventListener('click', function(e) {
            console.log('Close button clicked');
            e.preventDefault();
            e.stopPropagation();
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
            console.log('Modal closed via close button');
        });
    } else {
        console.error('Close button or modal overlay not found:', { closeModal, modalOverlay });
    }

    // Also handle the case when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && !modalOverlay.classList.contains('hidden')) {
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
            console.log('Modal closed via Escape key');
        }
    });

    // Close modal when clicking outside
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
                console.log('Modal closed via outside click');
            }
        });
    }

    // Scroll to feedback form when clicking "Записаться"
    if (enrollButtons.length > 0) {
        enrollButtons.forEach(button => {
            button.addEventListener('click', function() {
                const feedbackSection = document.getElementById('feedback');
                if (feedbackSection) {
                    window.scrollTo({
                        top: feedbackSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Form validation
    const feedbackForm = document.getElementById('feedback-form');
    const formSuccess = document.getElementById('form-success');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                document.querySelector('[for="name"]').nextElementSibling.nextElementSibling.textContent = 'Пожалуйста, введите ваше имя';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                document.querySelector('[for="email"]').nextElementSibling.nextElementSibling.textContent = 'Пожалуйста, введите корректный email';
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                document.querySelector('[for="message"]').nextElementSibling.nextElementSibling.textContent = 'Пожалуйста, введите ваш вопрос или комментарий';
                isValid = false;
            }
            
            if (isValid) {
                // Hide form and show success message
                feedbackForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                
                // Reset form
                feedbackForm.reset();
                
                // You would typically send the form data to a server here
                // For this example, we're just showing the success message
                
                // Reset form after 5 seconds (in a real application, you might not want to do this)
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                    feedbackForm.classList.remove('hidden');
                }, 5000);
            }
        });
    }
}); 