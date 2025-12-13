// ===== FONCTIONS POUR LA PAGE CONTACT =====
function initContactPage() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Réinitialiser les messages d'erreur
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.style.display = 'none';
        });

        // Valider le formulaire
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Validation du nom
        if (name === '') {
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }

        // Validation du message
        if (message === '') {
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        }

        // Si le formulaire est valide
        if (isValid) {
            // Simuler l'envoi du formulaire
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Afficher le message de succès
                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    successMessage.style.display = 'block';
                }

                // Réinitialiser le formulaire
                contactForm.reset();

                // Réactiver le bouton
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Masquer le message de succès après 5 secondes
                setTimeout(() => {
                    if (successMessage) {
                        successMessage.style.display = 'none';
                    }
                }, 5000);
            }, 1500);
        }
    });
}

// Initialiser la page contact au chargement
document.addEventListener('DOMContentLoaded', initContactPage);