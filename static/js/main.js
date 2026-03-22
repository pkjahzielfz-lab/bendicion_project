// main.js - Funcionalidades interactivas para La Bendición de Dios

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initCarousel();
    initSmoothScroll();
    initWhatsAppButton();
});

// Función para inicializar el carrusel
function initCarousel() {
    const carousel = document.querySelector('.carousel-productos');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    // Si no existe el carrusel, no hacer nada
    if (!carousel) return;
    
    // Cargar las fotos de la tienda
    loadFotosTienda(carousel);
    
    // Event listeners para los botones del carrusel (si existen)
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
        
        // Mostrar/ocultar botones según la posición del scroll
        carousel.addEventListener('scroll', () => {
            const scrollLeft = carousel.scrollLeft;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            
            prevBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            prevBtn.style.pointerEvents = scrollLeft > 0 ? 'auto' : 'none';
            
            nextBtn.style.opacity = scrollLeft < maxScroll ? '1' : '0.5';
            nextBtn.style.pointerEvents = scrollLeft < maxScroll ? 'auto' : 'none';
        });
        
        // Trigger initial check
        setTimeout(() => {
            carousel.dispatchEvent(new Event('scroll'));
        }, 500);
    }
}

// Función para cargar las fotos de la tienda en el carrusel
function loadFotosTienda(carousel) {
    // DATOS DE LAS FOTOS DE TU TIENDA - Coloca aquí tus imágenes
    const fotosTienda = [
        {
            id: 1,
            titulo: 'Entrada de la tienda',
            descripcion: 'Vista principal de nuestro negocio',
            imagen: '/static/productos/1.jpeg'
        },
        {
            id: 2,
            titulo: 'Mostrador principal',
            descripcion: 'Atención al cliente',
            imagen: '/static/productos/2.jpeg'
        },
        {
            id: 3,
            titulo: 'Zona de productos',
            descripcion: 'Variedad de artículos disponibles',
            imagen: '/static/productos/3.jpeg'
        },
        {
            id: 4,
            titulo: 'Compra',
            descripcion: 'Compra de Productos por Mayoreo',
            imagen: '/static/productos/4.jpeg'
        },
        {
            id: 5,
            titulo: 'Zona de productos',
            descripcion: 'Variedad de artículos disponibles',
            imagen: '/static/productos/5.jpeg'
        },        {
            id: 6,
            titulo: 'Zona de productos',
            descripcion: 'Variedad de artículos disponibles',
            imagen: '/static/productos/6.jpeg'
        },
        {
            id: 7,
            titulo: 'Zona de productos',
            descripcion: 'Variedad de artículos disponibles',
            imagen: '/static/productos/7.jpeg'
        }
    ];
    
    // Limpiar el carrusel
    carousel.innerHTML = '';
    
    // Agregar cada foto al carrusel
    fotosTienda.forEach(foto => {
        const card = createFotoCard(foto);
        carousel.appendChild(card);
    });
    
    // Agregar event listeners a las cards
    addFotoCardListeners();
    
    // Precargar imágenes después de cargar
    setTimeout(preloadImages, 500);
}

// Función para crear una tarjeta de foto de la tienda
function createFotoCard(foto) {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.setAttribute('data-foto-id', foto.id);
    
    // Intentar cargar la imagen, si no existe mostrar un placeholder
    const imgSrc = foto.imagen;
    
    card.innerHTML = `
        <div class="producto-imagen">
            <img src="${imgSrc}" 
                 alt="${foto.titulo}" 
                 loading="lazy"
                 onerror="this.src='https://via.placeholder.com/280x200/e9ecef/8c6d46?text=Tienda'">
        </div>
        <div class="producto-info">
            <h3 class="producto-nombre">${foto.titulo}</h3>
            <p class="producto-descripcion">${foto.descripcion}</p>
        </div>
    `;
    
    return card;
}

// Función para agregar listeners a las cards de fotos
function addFotoCardListeners() {
    const cards = document.querySelectorAll('.producto-card');
    
    cards.forEach(card => {
        // Click en la card para ver la imagen más grande
        card.addEventListener('click', () => {
            const fotoId = card.dataset.fotoId;
            showFotoModal(fotoId);
        });
        
        // Efectos hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Función para mostrar la foto en grande
function showFotoModal(fotoId) {
    const card = document.querySelector(`.producto-card[data-foto-id="${fotoId}"]`);
    if (!card) return;
    
    const titulo = card.querySelector('.producto-nombre').textContent;
    const descripcion = card.querySelector('.producto-descripcion').textContent;
    const imgSrc = card.querySelector('img').src;
    
    // Crear un modal simple con la imagen más grande
    const modalHtml = `
        <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:9999; cursor:pointer;" onclick="this.remove()">
            <div style="max-width:90%; max-height:90%; text-align:center; background:white; padding:20px; border-radius:10px;">
                <img src="${imgSrc}" style="max-width:100%; max-height:70vh; object-fit:contain;" alt="${titulo}">
                <h3 style="color:#594433; margin-top:15px;">${titulo}</h3>
                <p style="color:#666;">${descripcion}</p>
                <p style="color:#8c6d46; font-size:0.9rem;">Haz clic en cualquier parte para cerrar</p>
            </div>
        </div>
    `;
    
    // Agregar el modal al body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Función para scroll suave
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para mejorar el botón de WhatsApp
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            // Personalizar mensaje según la hora del día
            const hour = new Date().getHours();
            let saludo = '';
            
            if (hour < 12) {
                saludo = '¡Buenos días!';
            } else if (hour < 18) {
                saludo = '¡Buenas tardes!';
            } else {
                saludo = '¡Buenas noches!';
            }
            
            // Actualizar el mensaje con el saludo
            const mensajeBase = `${saludo} Vengo de la página web. Me interesan tus productos.`;
            const currentUrl = whatsappBtn.href;
            
            if (currentUrl.includes('text=')) {
                const newUrl = currentUrl.replace(/text=.*?(&|$)/, `text=${encodeURIComponent(mensajeBase)}$1`);
                whatsappBtn.href = newUrl;
            }
        });
    }
}

// Función adicional: Precargar imágenes del carrusel
function preloadImages() {
    const images = document.querySelectorAll('.producto-imagen img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.includes('placeholder')) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
}