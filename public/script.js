let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    setupEventListeners();
    fetchPlants();
    loadData();
});

function loadData() {
    fetchPlants();
    fetchExchangeOffers();
    //fetchExchangeHistory();
}

// Проверка авторизации
function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        currentUser = JSON.parse(localStorage.getItem('user'));
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('user-actions').style.display = 'block';
    }
}

// Регистрация пользователя
async function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        
        localStorage.setItem('user', JSON.stringify(data.user));
        currentUser = data.user;
        checkAuth();
        e.target.reset();
        showAlert('Регистрация успешна!', 'success');
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Добавление растения
async function addPlant(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        const species = formData.get('species').trim();
        const region = formData.get('region').trim();
        
        const response = await fetch('/api/plants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: Number(formData.get('user_id')),
                name: formData.get('name'),
                species: species, // Произвольный текст
                description: formData.get('description').trim(),
                region: region  // Произвольный текст
            })
        });
        
        if (!response.ok) throw new Error('Ошибка сервера');
        showAlert('Растение добавлено!', 'success');
        fetchPlants();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Создание предложения обмена
async function createOffer(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/api/offers', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'},
            body: JSON.stringify({
                sender_id: formData.get('sender_id'),
                receiver_id: formData.get('receiver_id'),
                plant_id: formData.get('plant_id')
            })
        });
        if (!response.ok) throw new Error('Ошибка сервера');
        showAlert('Предложение добавлено!', 'success');
        fetchPlants();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Подтверждение обмена
async function acceptOffer(offerId) {
    try {
        // Обновление статуса предложения
        await fetch(`/api/offers/${offerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'accepted' })
        });

        // Автоматическое добавление в историю
        await fetch('/api/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ offer_id: offerId })
        });

        showAlert('Обмен подтвержден!', 'success');
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Фильтрация растений
async function fetchPlants() {
    try {
        const response = await fetch(`/api/plants`);
        const plants = await response.json();
        renderPlants(plants);
    } catch (error) {
        showAlert('Ошибка загрузки растений', 'error');
    }
}

// Рендеринг растений
function renderPlants(plants) {
    const container = document.getElementById('plants-container');
    container.innerHTML = plants.map(plant => `
        <div class="plant-card">
            <h3>${plant.name}</h3>
            <p>Владелец: ${plant.owner_name} (${plant.owner_email})</p>
            <p>Тип: ${plant.species}</p>
            <p>Регион: ${plant.region}</p>
            ${plant.description ? `<p>Описание: ${plant.description}</p>` : ''}
        </div>
    `).join('');
}

function renderExchangeOffers(offers) {
    const container = document.getElementById('offers-container');
    container.innerHTML = offers.map(offer => `
        <div class="offer-card">
            <h3>Предложение #${offer.id}</h3>
            <p>Статус: ${offer.status}</p>
            <p>Растение: ${offer.plant_name || 'Не указано'}</p>
            <p>Отправитель: ${offer.sender_name || 'Не указано'}</p>
            <p>Получатель: ${offer.receiver_name || 'Не указано'}</p>
        </div>
    `).join('');
}

async function fetchExchangeOffers() {
    try {
        const response = await fetch('/api/offers');
        const offers = await response.json();
        renderExchangeOffers(offers);
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Утилиты
function setupEventListeners() {
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('add-plant-form').addEventListener('submit', addPlant);
    document.getElementById('create-offer-form').addEventListener('submit', createOffer);
}

function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    document.body.prepend(alert);
    setTimeout(() => alert.remove(), 3000);
}