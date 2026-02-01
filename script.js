// ===== DOM Elements =====
const questionPage = document.getElementById('questionPage');
const successPage = document.getElementById('successPage');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hint = document.getElementById('hint');
const heartsContainer = document.getElementById('heartsContainer');
const confettiContainer = document.getElementById('confettiContainer');

// ===== Configuration =====
const config = {
    // Customize these for your date!
    location: "https://meet.google.com/ktd-rwpa-vai",
    time: "7:00 PM Tonight",
    // Fun messages when No button runs away
    hintMessages: [
        "Nice try! 😏",
        "The No button is scared of you! 😂",
        "That button is faster than you think! 🏃‍♂️",
        "You really thought it would be that easy? 😜",
        "The button prefers its freedom! 💨",
        "Come on, just click Yes already! 💕",
        "The button says: 'Not today!' 🙅",
        "You're only making this harder on yourself! 😄",
        "Persistence won't work here! 😝",
        "Accept your destiny... click Yes! 💖"
    ]
};

// ===== Track state =====
let noButtonAttempts = 0;
let isNoButtonRunaway = false;

// ===== Initialize floating hearts background =====
function createFloatingHearts() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '🩷'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart(hearts[Math.floor(Math.random() * hearts.length)]);
        }, i * 500);
    }

    // Continue creating hearts
    setInterval(() => {
        createHeart(hearts[Math.floor(Math.random() * hearts.length)]);
    }, 2000);
}

function createHeart(emoji) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = emoji;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 15000);
}

// ===== The Runaway No Button Logic =====
function moveNoButton() {
    noButtonAttempts++;

    // Make button fixed position if not already
    if (!isNoButtonRunaway) {
        isNoButtonRunaway = true;
        noBtn.classList.add('runaway');
    }

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate safe area (with padding from edges)
    const padding = 20;
    const maxX = viewportWidth - btnWidth - padding;
    const maxY = viewportHeight - btnHeight - padding;

    // Generate random position
    let newX = Math.floor(Math.random() * maxX);
    let newY = Math.floor(Math.random() * maxY);

    // Make sure position is within bounds
    newX = Math.max(padding, newX);
    newY = Math.max(padding, newY);

    // Apply new position
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';

    // Update hint message
    updateHintMessage();

    // Make Yes button grow slightly after multiple attempts
    if (noButtonAttempts > 3) {
        const scale = 1 + (noButtonAttempts * 0.03);
        yesBtn.style.transform = `scale(${Math.min(scale, 1.3)})`;
    }
}

function updateHintMessage() {
    const messageIndex = Math.min(noButtonAttempts - 1, config.hintMessages.length - 1);
    hint.textContent = config.hintMessages[messageIndex];
    hint.style.color = '#ff6b9d';
    hint.style.fontWeight = '600';

    // Add a little shake animation
    hint.style.animation = 'none';
    setTimeout(() => {
        hint.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
}

// ===== Add shake animation dynamically =====
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// ===== Event Listeners for No Button =====
// Mouse hover (desktop)
noBtn.addEventListener('mouseenter', moveNoButton);

// Touch events (mobile)
noBtn.addEventListener('touchstart', function (e) {
    e.preventDefault();
    moveNoButton();
}, { passive: false });

// Also handle mouse move near the button (extra tricky!)
noBtn.addEventListener('mousemove', function (e) {
    if (isNoButtonRunaway) {
        moveNoButton();
    }
});

// ===== Yes Button Click Handler =====
yesBtn.addEventListener('click', function () {
    // Play celebration
    showSuccessPage();
});

// ===== Show Success Page =====
function showSuccessPage() {
    // Update date details
    document.getElementById('locationText').textContent = config.location;
    document.getElementById('timeText').textContent = config.time;

    // Hide question page, show success page
    questionPage.classList.add('hidden');
    successPage.classList.remove('hidden');

    // Start confetti!
    createConfetti();

    // Create lots more floating hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createHeart(['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)]);
        }, i * 100);
    }
}

// ===== Confetti Effect =====
function createConfetti() {
    const colors = ['#ff6b9d', '#ff8fab', '#ffc2d1', '#ffd700', '#ff4081', '#ff69b4', '#fff'];
    const shapes = ['circle', 'square', 'heart'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];

            if (shape === 'heart') {
                confetti.textContent = '❤️';
                confetti.style.background = 'transparent';
                confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
            } else if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
                confetti.style.background = color;
            } else {
                confetti.style.background = color;
            }

            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';

            confettiContainer.appendChild(confetti);

            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }

    // Continue confetti for a bit
    setTimeout(() => createMoreConfetti(), 3000);
}

function createMoreConfetti() {
    const colors = ['#ff6b9d', '#ff8fab', '#ffc2d1', '#ffd700', '#ff4081'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.width = (Math.random() * 8 + 4) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 50);
    }
}

// ===== Prevent right-click on No button (extra tricky!) =====
noBtn.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    moveNoButton();
});

// ===== Handle window resize =====
window.addEventListener('resize', function () {
    if (isNoButtonRunaway) {
        // Re-position button if it's outside viewport after resize
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnRect = noBtn.getBoundingClientRect();

        if (btnRect.right > viewportWidth || btnRect.bottom > viewportHeight) {
            moveNoButton();
        }
    }
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function () {
    createFloatingHearts();

    // Add some initial sparkle
    setTimeout(() => {
        hint.style.opacity = '1';
    }, 1000);
});

// ===== Easter Egg: Keyboard shortcut =====
document.addEventListener('keydown', function (e) {
    // If user tries to press 'N' for No
    if (e.key.toLowerCase() === 'n') {
        moveNoButton();
        updateHintMessage();
    }
    // If user presses 'Y' for Yes
    if (e.key.toLowerCase() === 'y') {
        showSuccessPage();
    }
});

console.log('💕 Made with love! Press Y to say Yes, or try pressing N... 😏');
