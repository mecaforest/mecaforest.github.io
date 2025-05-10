// --- Project and Lightbox Functions (GLOBAL) ---
let currentProject = '';
let currentImageIndex = 0;
let projectImages = [];
const projectFiles = {
    'projet1': ['1.jpg', '2.jpg'],
    'projet2': ['1.jpg', '2.jpg'],
    'projet3': ['1.jpg', '2.jpg', '3.jpg'],
    'projet4': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'],
};

function openProject(projectId) {
    currentProject = projectId;
    currentImageIndex = 0;
    loadProjectImages(projectId);
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function loadProjectImages(projectId) {
    projectImages = projectFiles[projectId] || [];
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightbox-img');
    if (projectImages.length > 0) {
        lightboxImg.onerror = function() {
            this.src = '';
            this.alt = 'Image non trouvée';
        };
        lightboxImg.src = `PROJETS/${currentProject}/${projectImages[currentImageIndex]}`;
    } else {
        lightboxImg.src = '';
        lightboxImg.alt = 'Image non trouvée';
    }
    updateThumbnails();
}

function updateThumbnails() {
    const container = document.getElementById('thumbnails-container');
    container.innerHTML = '';
    projectImages.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = `PROJETS/${currentProject}/${image}`;
        thumbnail.classList.add('thumbnail');
        thumbnail.onerror = function() {
            this.style.display = 'none';
        };
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }
        thumbnail.onclick = () => selectImage(index);
        container.appendChild(thumbnail);
    });
}

function selectImage(index) {
    currentImageIndex = index;
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = `PROJETS/${currentProject}/${projectImages[currentImageIndex]}`;
    document.querySelectorAll('.thumbnail').forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentImageIndex);
    });
}

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + projectImages.length) % projectImages.length;
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = `PROJETS/${currentProject}/${projectImages[currentImageIndex]}`;
    document.querySelectorAll('.thumbnail').forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentImageIndex);
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProject = '';
    currentImageIndex = 0;
    projectImages = [];
}

function loadProjects() {
    // Placeholder for any logic you want to run on DOMContentLoaded
}

// --- DOMContentLoaded: Attach Event Listeners ---
document.addEventListener('DOMContentLoaded', function() {
    // --- MENU DROPDOWN LOGIC ---
    var btn = document.getElementById('menuButton');
    var menu = document.getElementById('dropdownMenu');
    btn.onclick = function(e) {
        e.stopPropagation();
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    };
    document.addEventListener('click', function(e) {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = 'none';
        }
    });

    // --- PROJECT GALLERY LOGIC ---
    loadProjects();

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.style.display && lightbox.style.display !== 'none') {
            if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });

    // Contact form logic
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    formStatus.textContent = 'Message envoyé avec succès!';
                    formStatus.className = 'form-status success';
                    form.reset();
                } else {
                    throw new Error('Une erreur est survenue lors de l\'envoi du message.');
                }
            } catch (error) {
                formStatus.textContent = error.message;
                formStatus.className = 'form-status error';
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Envoyer';
            }
        });
    }

    // Any other DOM-dependent logic can go here
    console.log('DOM chargé, tous les scripts sont prêts.');
});

// Dropdown menu logic for the new 'Menu' button
const menuButton = document.getElementById('menuButton');
const menuContainer = document.querySelector('.menu-container');

menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    menuContainer.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!menuContainer.contains(e.target)) {
        menuContainer.classList.remove('show');
    }
});

// Smooth scroll for menu links
const menuLinks = document.querySelectorAll('.dropdown-content a');
menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            menuContainer.classList.remove('show');
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}); 