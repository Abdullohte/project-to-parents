const carImages = {
    'jeep-diesel-2025': './img/jeep2025.png',
    'sedan-electric-2025': './img/sedan-elektro.webp',
    'suv-hybrid-2025': './img/9-1.png',
    'sports-car-2025': './img/sport-car.png',
    'minivan-2025': './img/minivan.jpg',
    'luxury-sedan-2025': './img/sedan.png',
    'compact-2025': './img/small.png',
    'pickup-truck-2025': './img/pickme.jpg'
};

const rentalPrices = {
    'jeep-diesel-2025': 120,
    'sedan-electric-2025': 90,
    'suv-hybrid-2025': 150,
    'sports-car-2025': 200,
    'minivan-2025': 110,
    'luxury-sedan-2025': 180,
    'compact-2025': 70,
    'pickup-truck-2025': 130
};

const carNames = {
    'jeep-diesel-2025': 'Jeep Diesel Model 2025',
    'sedan-electric-2025': 'Sedan Electric Model 2025',
    'suv-hybrid-2025': 'SUV Hybrid Model 2025',
    'sports-car-2025': 'Sports Car Model 2025',
    'minivan-2025': 'Family Minivan 2025',
    'luxury-sedan-2025': 'Luxury Sedan 2025',
    'compact-2025': 'Compact Car 2025',
    'pickup-truck-2025': 'Pickup Truck 2025'
};

const carPrices = {
    'jeep-diesel-2025': '$120/day',
    'sedan-electric-2025': '$90/day',
    'suv-hybrid-2025': '$150/day',
    'sports-car-2025': '$200/day',
    'minivan-2025': '$110/day',
    'luxury-sedan-2025': '$180/day',
    'compact-2025': '$70/day',
    'pickup-truck-2025': '$130/day'
};

document.addEventListener('DOMContentLoaded', function() {
    // Header sticky effect
    const header = document.querySelector("header");
    window.addEventListener("scroll", function() {
        header.classList.toggle("sticky", window.scrollY > 0);
    });
    
    // Mobile menu toggle
    const menuIcon = document.getElementById('menu-icon');
    const navigation = document.querySelector('.navigation');
    
    menuIcon.addEventListener('click', function() {
        navigation.classList.toggle('show');
    });
    
    // Car rental functionality
    const searchBtn = document.getElementById('search-btn');
    const buyBtn = document.getElementById('buy-btn');
    const carSelect = document.getElementById('car-select');
    const locationSelect = document.getElementById('location-select');
    const pickupDate = document.getElementById('pickup-date');
    const pickupTime = document.getElementById('pickup-time');
    const returnDate = document.getElementById('return-date');
    const returnTime = document.getElementById('return-time');
    const carDisplay = document.getElementById('car-display');
    const selectedCarImage = document.getElementById('selected-car-image');
    const confirmationPopup = document.getElementById('confirmation-popup');
    const rentedCarName = document.getElementById('rented-car-name');
    const defaultCarImage = document.getElementById('car-default-image');
    const rentButtons = document.querySelectorAll('.rent-btn');

    // Initialize Swiper for reviews
    const reviewSwiper = new Swiper('.review-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // Set today's date as minimum for date inputs
    const today = new Date().toISOString().split('T')[0];
    pickupDate.setAttribute('min', today);
    returnDate.setAttribute('min', today);

    // Search button handler
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!carSelect.value || !locationSelect.value || !pickupDate.value || 
            !pickupTime.value || !returnDate.value || !returnTime.value) {
            alert('Please fill all fields before searching');
            return;
        }
        
        defaultCarImage.classList.add('hidden');
        
        setTimeout(() => {
            selectedCarImage.src = carImages[carSelect.value];
            carDisplay.style.display = 'flex';
            setTimeout(() => {
                carDisplay.classList.add('show');
            }, 50);
        }, 600);
    });

    // Rent Now button handler
    buyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!carSelect.value) {
            alert('Please select a car first');
            return;
        }
        
        rentedCarName.textContent = carNames[carSelect.value];
        confirmationPopup.style.display = 'flex';
        setTimeout(() => {
            confirmationPopup.classList.add('show');
        }, 10);
        
        setTimeout(function() {
            confirmationPopup.classList.remove('show');
            setTimeout(() => {
                confirmationPopup.style.display = 'none';
            }, 300);
        }, 5000);
    });

    // Close popup when clicking outside
    confirmationPopup.addEventListener('click', function(e) {
        if (e.target === confirmationPopup) {
            confirmationPopup.classList.remove('show');
            setTimeout(() => {
                confirmationPopup.style.display = 'none';
            }, 300);
        }
    });
    
    // Car image hover effect
    selectedCarImage.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.03)';
    });
    
    selectedCarImage.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Rent buttons in Rental Deal section
    rentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const carId = this.getAttribute('data-car');
            carSelect.value = carId;
            
            // Trigger search to show the selected car
            defaultCarImage.classList.add('hidden');
            setTimeout(() => {
                selectedCarImage.src = carImages[carId];
                carDisplay.style.display = 'flex';
                setTimeout(() => {
                    carDisplay.classList.add('show');
                }, 50);
            }, 600);
            
            // Scroll to home section
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.navigation a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update active class
            document.querySelectorAll('.navigation a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Initialize Leaflet map
    const map = L.map('map').setView([40.7128, -74.0060], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add markers for branches
    const branches = [
        {
            position: [40.7128, -74.0060],
            title: "Main Office",
            address: "123 Main St, New York"
        },
        {
            position: [40.7196, -74.0027],
            title: "Downtown Branch",
            address: "456 Downtown Ave, New York"
        }
    ];

    branches.forEach(branch => {
        const marker = L.marker(branch.position).addTo(map);
        marker.bindPopup(`<b>${branch.title}</b><br>${branch.address}`);
        
        // Add click handler to info boxes
        document.querySelector(`.info-box[data-location="branch${branches.indexOf(branch) + 1}"]`)
            .addEventListener('click', () => {
                map.setView(branch.position, 16);
                marker.openPopup();
            });
    });
});
document.querySelector('.btn-1').addEventListener('click', function(e) {
    e.preventDefault();
    showAuthModal('Sign In');
});

document.querySelector('.btn-2').addEventListener('click', function(e) {
    e.preventDefault();
    showAuthModal('Sign Up');
});

// Функция для показа модального окна авторизации/регистрации
function showAuthModal(type) {
    const modalContent = `
        <div class="auth-modal">
            <h3>${type}</h3>
            <form class="auth-form">
                ${type === 'Sign Up' ? '<input type="text" placeholder="Full Name" required>' : ''}
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Password" required>
                <button type="submit" class="btn-2">${type}</button>
            </form>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            ${modalContent}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Обработчики закрытия модального окна
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.auth-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert(`${type} successful!`);
        document.body.removeChild(modal);
    });
    
    // Закрытие по клику вне модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Обновите обработчик кнопки Rent Now для расчета стоимости
buyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (!carSelect.value) {
        alert('Please select a car first');
        return;
    }
    
    // Расчет стоимости аренды
    const pickupDateTime = new Date(`${pickupDate.value}T${pickupTime.value}`);
    const returnDateTime = new Date(`${returnDate.value}T${returnTime.value}`);
    const diffTime = Math.abs(returnDateTime - pickupDateTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const pricePerDay = rentalPrices[carSelect.value];
    const totalPrice = diffDays * pricePerDay;
    
    rentedCarName.textContent = carNames[carSelect.value];
    

    document.querySelector('.popup-content').innerHTML = `
        <h3>You have rented <span id="rented-car-name">${carNames[carSelect.value]}</span></h3>
        <div class="rental-details">
            <p><strong>Pickup:</strong> ${pickupDate.value} at ${pickupTime.value}</p>
            <p><strong>Return:</strong> ${returnDate.value} at ${returnTime.value}</p>
            <p><strong>Duration:</strong> ${diffDays} day(s)</p>
            <p><strong>Price per day:</strong> $${pricePerDay}</p>
            <p class="total-price"><strong>Total:</strong> $${totalPrice}</p>
        </div>
        <p>We will deliver it to your location within 2 days.</p>
    `;
    
    confirmationPopup.style.display = 'flex';
    setTimeout(() => {
        confirmationPopup.classList.add('show');
    }, 10);
    
    setTimeout(function() {
        confirmationPopup.classList.remove('show');
        setTimeout(() => {
            confirmationPopup.style.display = 'none';
        }, 300);
    }, 10000); // Увеличил время показа до 10 секунд
});