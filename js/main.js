document.addEventListener('DOMContentLoaded', () => {
    
    // БАЗА ДАНИХ
    const servicesData = {
        'screen': {
            title: 'Заміна екрану',
            desc: 'Встановлюємо оригінальні дисплейні модулі або якісні копії. Зберігаємо роботу TrueTone.',
            prices: [{model:'iPhone 11',price:'2500 грн'},{model:'iPhone 13',price:'4500 грн'},{model:'Samsung S21',price:'4000 грн'}],
            icon: '<img src="img/icons/screen.svg" alt="">'
        },
        'battery': {
            title: 'Заміна акумулятора',
            desc: 'Замінимо батарею на нову за 20 хвилин. Використовуємо елементи підвищеної ємності.',
            prices: [{model:'iPhone X',price:'1200 грн'},{model:'iPhone 12',price:'1800 грн'},{model:'Samsung A51',price:'900 грн'}],
            icon: '<img src="img/icons/battery.svg" alt="">'
        },
        'water': {
            title: 'Ремонт після води',
            desc: 'Термінова чистка в ультразвуковій ванні. Чим швидше, тим краще.',
            prices: [{model:'Чистка плати',price:'від 800 грн'},{model:'Відновлення живлення',price:'від 1500 грн'}],
            icon: '<img src="img/icons/water.svg" alt="">'
        },
        'speaker': {
            title: 'Ремонт динаміків',
            desc: 'Чистка сіток або заміна динаміка для чистого звуку.',
            prices: [{model:'Чистка сіток',price:'300 грн'},{model:'Заміна (iPhone)',price:'від 800 грн'}],
            icon: '<img src="img/icons/speaker.svg" alt="">'
        },
        'camera': {
            title: 'Ремонт камери',
            desc: 'Заміна скла камери або основного модуля.',
            prices: [{model:'Скло камери',price:'500 грн'},{model:'Модуль iPhone 11',price:'1800 грн'}],
            icon: '<img src="img/icons/camera.svg" alt="">'
        },
        'board': {
            title: 'Ремонт плати',
            desc: 'Пайка BGA, заміна контролерів, складний ремонт.',
            prices: [{model:'Контролер U2',price:'1800 грн'},{model:'Аудіокодек',price:'2200 грн'}],
            icon: '<img src="img/icons/board.svg" alt="">'
        },
        'charging': {
            title: 'Заміна роз\'єму',
            desc: 'Якщо телефон не заряджається або відходить кабель.',
            prices: [{model:'Lightning',price:'800 грн'},{model:'Type-C',price:'600 грн'}],
            icon: '<img src="img/icons/charging.svg" alt="">'
        },
        'wifi': {
            title: 'Ремонт Wi-Fi',
            desc: 'Слабкий сигнал або не працює Bluetooth.',
            prices: [{model:'Заміна антени',price:'800 грн'},{model:'Модуль Wi-Fi',price:'2000 грн'}],
            icon: '<img src="img/icons/wifi.svg" alt="">'
        },
        'mic': {
            title: 'Ремонт мікрофону',
            desc: 'Вас погано чути? Заміна мікрофону.',
            prices: [{model:'Шлейф iPhone',price:'900 грн'},{model:'Пайка Android',price:'600 грн'}],
            icon: '<img src="img/icons/mic.svg" alt="">'
        },
        'sensor': {
            title: 'Ремонт сенсорів',
            desc: 'Відновлення Face ID та Touch ID.',
            prices: [{model:'Face ID',price:'від 1500 грн'},{model:'Touch ID',price:'1000 грн'}],
            icon: '<img src="img/icons/sensor.svg" alt="">'
        },
        'glass': {
            title: 'Захист екрану',
            desc: 'Поклейка 3D скла або гідрогелевої плівки.',
            prices: [{model:'Скло 3D',price:'300 грн'},{model:'Плівка',price:'400 грн'}],
            icon: '<img src="img/icons/glass.svg" alt="">'
        },
        'soft': {
            title: 'Прошивка',
            desc: 'Оновлення ПЗ, перенесення даних, розблокування.',
            prices: [{model:'Прошивка',price:'500 грн'},{model:'Скидання паролю',price:'800 грн'}],
            icon: '<img src="img/icons/soft.svg" alt="">'
        }
    };

    // МОДАЛЬНЕ ВІКНО
    const modal = document.getElementById('serviceModal');
    const cards = document.querySelectorAll('.service-card');
    const closeBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalIcon = document.getElementById('modalIcon');
    const modalPrices = document.getElementById('modalPrices');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.getAttribute('data-id');
            const data = servicesData[serviceId];
            if (data) {
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                modalIcon.innerHTML = data.icon;
                modalPrices.innerHTML = '';
                data.prices.forEach(item => {
                    modalPrices.innerHTML += `<tr><td>${item.model}</td><td>${item.price}</td></tr>`;
                });
                modal.style.display = 'flex';
            }
        });
    });

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target == modal) modal.style.display = 'none'; });

    // БУРГЕР
    const burger = document.getElementById('burgerMenu');
    const nav = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // СКРОЛ
    const headerHeight = document.querySelector('.header').offsetHeight;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    // АНІМАЦІЯ
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // МАСКА ТЕЛЕФОНУ
    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
            if (!x[2]) e.target.value = '+380'; 
            else e.target.value = !x[2] ? x[1] : '+' + x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '') + (x[5] ? ' ' + x[5] : '');
        });
    }

    // КАРТА
    if (document.getElementById('map')) {
        const map = L.map('map').setView([50.4501, 30.5234], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);
        const customIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        });
        L.marker([50.4501, 30.5234], {icon: customIcon}).addTo(map)
            .bindPopup('<b>PhoneFix</b><br>вул. Хрещатик, 10').openPopup();
    }
});