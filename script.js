// Bascule du menu de navigation
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fermer le menu mobile lors d'un clic à l'extérieur
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Défilement fluide pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Fermer le menu mobile s'il est ouvert
            navLinks.classList.remove('active');
            
            // Défilement fluide vers la cible
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lien de navigation actif basé sur la position de défilement
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

let currentProject = '';
let currentImageIndex = 0;
let projectImages = [];

// Définir les fichiers des projets (l'administrateur modifie uniquement ici)
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
    // Mettre à jour la miniature active
    document.querySelectorAll('.thumbnail').forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentImageIndex);
    });
}

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + projectImages.length) % projectImages.length;
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = `PROJETS/${currentProject}/${projectImages[currentImageIndex]}`;
    // Mettre à jour la miniature active
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

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    // Répond uniquement si la visionneuse est visible (display n'est pas 'none')
    if (lightbox.style.display && lightbox.style.display !== 'none') {
        if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

const form = document.querySelector('.contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Désactiver le bouton d'envoi et afficher l'état de chargement
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Succès
            formStatus.textContent = 'Message envoyé avec succès!';
            formStatus.className = 'form-status success';
            form.reset(); // Réinitialiser le formulaire
        } else {
            // Erreur
            throw new Error('Une erreur est survenue lors de l\'envoi du message.');
        }
    } catch (error) {
        // Gérer l'erreur
        formStatus.textContent = error.message;
        formStatus.className = 'form-status error';
    } finally {
        // Réactiver le bouton d'envoi
        submitButton.disabled = false;
        submitButton.textContent = 'Envoyer';
    }
});

// Charger les projets au démarrage
console.log('Script chargé, attente du chargement du DOM...');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, chargement des projets...');
    loadProjects();
}); 