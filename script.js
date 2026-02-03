// ===== DOM Elements =====
const questionPage = document.getElementById('questionPage');
const successPage = document.getElementById('successPage');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hint = document.getElementById('hint');
const instruction = document.getElementById('instruction');
const attemptCount = document.getElementById('attemptCount');
const gameInstruction = document.querySelector('.game-instruction');
const heartsBg = document.getElementById('heartsBg');
const typewriter = document.getElementById('typewriter');

// ===== Typewriter Effect =====
const typewriterTexts = [
    "I've been thinking about you... 💭",
    "You make my heart skip a beat 💓",
    "I have something special to ask... ✨"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterDelay = 100;

function typeWrite() {
    const currentText = typewriterTexts[textIndex];

    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typewriterDelay = 50;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typewriterDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typewriterDelay = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        typewriterDelay = 500;
    }

    setTimeout(typeWrite, typewriterDelay);
}

// Start typewriter after a delay
setTimeout(typeWrite, 1500);

// ===== Cursor Heart Trail =====
let lastHeartTime = 0;
const heartTrailEmojis = ['💕', '💖', '💗', '💓', '✨', '💝'];

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastHeartTime > 150) { // Limit frequency
        lastHeartTime = now;
        createCursorHeart(e.clientX, e.clientY);
    }
});

function createCursorHeart(x, y) {
    const heart = document.createElement('span');
    heart.className = 'cursor-heart';
    heart.textContent = heartTrailEmojis[Math.floor(Math.random() * heartTrailEmojis.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
}

// ===== 3D Floating Hearts =====
const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '🩷', '💜', '🧡', '💝', '💘', '💞'];

function createFloatingHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';

    const layer = Math.floor(Math.random() * 3) + 1;
    heart.classList.add(`layer-${layer}`);

    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    heart.style.left = Math.random() * 100 + 'vw';

    const duration = 10 + Math.random() * 10 + (layer * 2);
    heart.style.animationDuration = duration + 's';

    heart.style.animationDelay = Math.random() * 2 + 's';

    const opacity = layer === 1 ? 0.75 : layer === 2 ? 0.5 : 0.3;
    heart.style.setProperty('--heart-opacity', opacity);

    const drift = (Math.random() - 0.5) * 100;
    heart.style.setProperty('--drift', drift + 'px');

    heartsBg.appendChild(heart);

    setTimeout(() => heart.remove(), (duration + 2) * 1000);
}

function initHearts() {
    for (let i = 0; i < 18; i++) {
        setTimeout(() => createFloatingHeart(), i * 200);
    }
    setInterval(createFloatingHeart, 800);
}

initHearts();

// ===== State =====
let attempts = 0;
let noMovesRemaining = 15;

// ===== Messages - Sweet & Playful =====
const noMessages = [
    "Aww, nice try! 😏",
    "Nope! Can't escape this easily!",
    "You can't run from love! 💕",
    "Accept your destiny, cutie!",
    "Just say Yes already! 💖",
    "I know you want to say Yes!",
    "Stop playing hard to get! 😘",
    "That button is scared of you!",
    "The Yes button is lonely!",
    "Give up yet? 😂",
    "You're only making this fun!",
    "Resistance is futile! 💕",
    "One more try... or just say Yes!",
    "I see you smiling! 😉",
    "You're adorable when you try!",
    "The No button doesn't like you!"
];

// ===== Confetti Effect =====
function createConfetti() {
    const colors = ['#ff6b9d', '#e91e63', '#ffd700', '#ff4081', '#ff8fab', '#ffb6c1', '#fff', '#9c27b0', '#e040fb'];
    const shapes = ['circle', 'square', 'heart'];

    for (let i = 0; i < 120; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 12 + 8;

            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.backgroundColor = color;
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';

            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'heart') {
                confetti.textContent = '💕';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.fontSize = size + 'px';
            }

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 25);
    }
}

// ===== Animate counter =====
function bumpCounter() {
    attemptCount.classList.remove('bump');
    void attemptCount.offsetWidth;
    attemptCount.classList.add('bump');
}

// ===== Pulse instruction =====
function pulseInstruction() {
    gameInstruction.classList.remove('pulse');
    void gameInstruction.offsetWidth;
    gameInstruction.classList.add('pulse');
}

// ===== No Button Handler =====
function handleNoHover() {
    noMovesRemaining--;
    attempts++;
    attemptCount.textContent = attempts;
    bumpCounter();

    if (noMovesRemaining <= 0) {
        hint.textContent = "The No button ran away forever! 😂";
        hint.classList.add('emphasis');
        noBtn.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        noBtn.style.transform = 'scale(0) rotate(720deg)';
        noBtn.style.opacity = '0';
        setTimeout(() => {
            noBtn.style.display = 'none';
        }, 600);
        instruction.textContent = "💕 Only Yes remains!";
        pulseInstruction();
        return;
    }

    const msg = noMessages[Math.floor(Math.random() * noMessages.length)];
    hint.textContent = msg;
    hint.classList.add('emphasis');

    noBtn.classList.add('runaway');

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const bw = noBtn.offsetWidth || 100;
    const bh = noBtn.offsetHeight || 50;
    const pad = 80;

    const maxX = Math.max(pad, vw - bw - pad);
    const maxY = Math.max(pad, vh - bh - pad);
    const x = Math.floor(Math.random() * (maxX - pad)) + pad;
    const y = Math.floor(Math.random() * (maxY - pad)) + pad;

    noBtn.style.left = Math.min(x, vw - bw - 20) + 'px';
    noBtn.style.top = Math.min(y, vh - bh - 20) + 'px';

    // Random rotation for fun
    noBtn.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;
}

// ===== Yes Button Click =====
function handleYesClick() {
    // Burst of hearts around button
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const rect = yesBtn.getBoundingClientRect();
            createCursorHeart(
                rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
                rect.top + rect.height / 2 + (Math.random() - 0.5) * 60
            );
        }, i * 50);
    }

    // Create confetti celebration!
    createConfetti();

    questionPage.style.animation = 'card-exit 0.5s ease forwards';

    setTimeout(() => {
        questionPage.classList.add('hidden');
        successPage.classList.remove('hidden');

        // More confetti on success page!
        setTimeout(() => createConfetti(), 400);
    }, 400);
}

// Add exit animation
const exitStyle = document.createElement('style');
exitStyle.textContent = `
    @keyframes card-exit {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.9) translateY(30px); }
    }
`;
document.head.appendChild(exitStyle);

// ===== Event Listeners =====

// Yes button
yesBtn.addEventListener('click', handleYesClick);

// Add extra hover effect for Yes button
yesBtn.addEventListener('mouseenter', () => {
    instruction.textContent = "💖 Click me!";
    pulseInstruction();
});

yesBtn.addEventListener('mouseleave', () => {
    instruction.textContent = "💕 Choose your answer...";
});

// No button - runs away!
noBtn.addEventListener('mouseenter', handleNoHover);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleNoHover();
}, { passive: false });

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleNoHover();
});

noBtn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    handleNoHover();
});

// ===== Keyboard =====
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'n') {
        handleNoHover();
    }
    if (e.key.toLowerCase() === 'y') {
        handleYesClick();
    }
});

// ===== Resize =====
window.addEventListener('resize', () => {
    if (noBtn.classList.contains('runaway')) {
        const rect = noBtn.getBoundingClientRect();
        const pad = 40;
        if (rect.right > window.innerWidth) {
            noBtn.style.left = (window.innerWidth - noBtn.offsetWidth - pad) + 'px';
        }
        if (rect.bottom > window.innerHeight) {
            noBtn.style.top = (window.innerHeight - noBtn.offsetHeight - pad) + 'px';
        }
    }
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    hint.textContent = "What will you choose? 💕";
});
