// Script to fix modal close button
(function() {
    console.log('Fix modal script executed');
    
    // Get modal elements
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModal = document.getElementById('close-modal');
    
    if (!modalOverlay || !closeModal) {
        console.error('Modal elements not found:', { modalOverlay, closeModal });
        return;
    }
    
    console.log('Modal elements found', { modalOverlay, closeModal });
    
    // Remove any existing event listeners
    const newCloseButton = closeModal.cloneNode(true);
    closeModal.parentNode.replaceChild(newCloseButton, closeModal);
    
    // Add new event listener
    newCloseButton.addEventListener('click', function(e) {
        console.log('Close button clicked');
        e.preventDefault();
        e.stopPropagation();
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        console.log('Modal closed');
    });
    
    // Also close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = '';
            console.log('Modal closed via Escape key');
        }
    });
    
    // Make sure details buttons work properly
    const detailsButtons = document.querySelectorAll('.details-btn');
    detailsButtons.forEach(button => {
        // Clone the button to remove existing event listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const courseType = this.getAttribute('data-course');
            const modalTitle = document.getElementById('modal-title');
            const modalContent = document.getElementById('modal-content');
            
            // Get course content from main script
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
                    `
                }
            };
            
            const courseInfo = courseDetails[courseType];
            
            if (courseInfo) {
                modalTitle.textContent = courseInfo.title;
                modalContent.innerHTML = courseInfo.content;
                modalOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                console.log('Modal opened via details button');
            }
        });
    });
    
    // Make sure enroll buttons scroll to the feedback form
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    enrollButtons.forEach(button => {
        // Clone the button to remove existing event listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const feedbackSection = document.getElementById('feedback');
            if (feedbackSection) {
                window.scrollTo({
                    top: feedbackSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                console.log('Scrolled to feedback form');
            }
        });
    });
    
    console.log('Fix modal script completed');
})();
