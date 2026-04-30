let categoriesData = []; // Зберігання категорій для функції Specials

function loadCategories() {
    fetch('categories.json')
        .then(response => response.json())
        .then(data => {
            categoriesData = data;
            renderCategories(data);
        })
        .catch(err => console.error("Помилка завантаження:", err));
}

function renderCategories(data) {
    const container = document.getElementById('main-content');
    let html = '<h2 class="text-center mb-4">Наш Каталог</h2><div class="row row-cols-1 row-cols-md-3 g-4">';
    
    data.forEach(cat => {
        html += `
            <div class="col">
                <div class="card h-100 cursor-pointer shadow-sm" onclick="loadCategoryItems('${cat.shortname}')">
                    <div class="card-body">
                        <h5 class="card-title text-primary">${cat.name}</h5>
                        <p class="card-text text-muted small">${cat.notes || 'Опис відсутній'}</p>
                    </div>
                </div>
            </div>`;
    });

    // Додавання посилання Specials
    html += `
        <div class="col">
            <div class="card h-100 cursor-pointer shadow-sm border-warning" onclick="loadRandomCategory()">
                <div class="card-body bg-warning bg-opacity-10 text-center">
                    <h5 class="card-title text-dark">Specials</h5> 
                    <p class="card-text">Випадкова категорія</p>
                </div>
            </div>
        </div>`;

    html += '</div>';
    container.innerHTML = html;
}

// Завантаження товарів обраної категорії
function loadCategoryItems(shortname) {
    fetch(`${shortname}.json`)
        .then(res => res.json())
        .then(data => {
            renderItems(data);
        });
}

// Побудова списку товарів (id, name, description, price)
function renderItems(data) {
    const container = document.getElementById('main-content');
    
    let html = `<h2 class="text-center mb-4">Категорія: ${data.category_name}</h2><div class="row">`;

    data.items.forEach(item => {
        html += `
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <img src="${item.image}" 
                         class="card-img-top" 
                         alt="${item.name}" 
                         style="width: 200px; height: 200px; object-fit: cover; margin: 0 auto;">
                    <div class="card-body text-center">
                        <h5>${item.name}</h5>
                        <p class="small text-muted">${item.description}</p>
                        <p><strong>${item.price} грн</strong></p>
                    </div>
                </div>
            </div>`;
    });

    html += '</div><div class="text-center mt-4"><button class="btn btn-secondary" onclick="loadCategories()">Назад до каталогу</button></div>';
    container.innerHTML = html;
}

// Логіка для випадкового вибору категорії (Math.random)
function loadRandomCategory() {
    if (categoriesData.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoriesData.length); 
        loadCategoryItems(categoriesData[randomIndex].shortname);
    }
}
