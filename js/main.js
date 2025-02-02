// Configure Birthday Date (update this to actual date)
const BIRTHDAY_DATE = new Date("2025-02-04T00:00:00"); // Use format YYYY-MM-DD

// Sound Effects
const sounds = {
    click: new Howl({ src: ["assets/sounds/click.mp3"] }),
    reveal: new Howl({ src: ["assets/sounds/reveal.mp3"] }),
    success: new Howl({ src: ["assets/sounds/success.mp3"] }),
    celebration: new Howl({ src: ["assets/sounds/celebration.mp3"] }),
};

// Three.js Variables
let scene, camera, renderer, burger;

// Initialize Loader Animation
function initLoaderAnimation() {
    const loaderScene = new THREE.Scene();
    const loaderCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const loaderRenderer = new THREE.WebGLRenderer({ alpha: true });
    loaderRenderer.setSize(300, 300);
    document.getElementById("3d-loader").appendChild(loaderRenderer.domElement);

    // Create rotating burger loader
    const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff6347,
        shininess: 100,
    });
    const loaderBurger = new THREE.Mesh(geometry, material);
    loaderScene.add(loaderBurger);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    loaderScene.add(light);

    loaderCamera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        loaderBurger.rotation.x += 0.01;
        loaderBurger.rotation.y += 0.01;
        loaderRenderer.render(loaderScene, loaderCamera);
    }
    animate();
}

// Countdown Timer
function updateTimer() {
    const now = new Date().getTime();
    const diff = BIRTHDAY_DATE - now;

    if (diff <= 0) {
        revealWebsite();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
        .toString()
        .padStart(2, "0");
    document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");
}

// Confetti Animation
function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = Math.random() * 100 + "%";
        document.body.appendChild(confetti);

        anime({
            targets: confetti,
            translateY: [-100, window.innerHeight],
            translateX: ["-50%", Math.random() * 100 - 50 + "%"],
            rotate: Math.random() * 720,
            duration: 3000,
            easing: "easeOutQuad",
            complete: () => confetti.remove(),
        });
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     const burgerBase = document.querySelector(".burger-base");
//     const ingredients = document.querySelectorAll(".ingredient");
//     const secretModal = document.getElementById("secretMessageModal");
//     const secretText = document.querySelector(".secret-text");

//     const layerMessages = {
//         "bun-top": "Our first meeting - when everything began!",
//         lettuce: "Our first date at the burger place downtown!",
//         tomato: "That special moment when we first kissed!",
//         cheese: "Our amazing road trip adventures!",
//         patty: "Moving in together - building our home!",
//         "bun-bottom": "Here's to forever together! 💖",
//     };

//     ingredients.forEach((ingredient) => {
//         ingredient.addEventListener("click", () => {
//             const layerType = ingredient.dataset.layer;
//             addBurgerLayer(layerType);
//             showTemporaryMessage(layerMessages[layerType]);
//         });
//     });

//     function addBurgerLayer(layerType) {
//         const layer = document.createElement("div");
//         layer.className = `burger-layer ${layerType}`;
//         burgerBase.appendChild(layer);

//         setTimeout(() => {
//             layer.style.opacity = "1";
//             layer.style.transform = "translateY(0)";
//         }, 50);
//     }

//     function showTemporaryMessage(message) {
//         secretText.textContent = message;
//         secretModal.style.display = 'block';
//         setTimeout(() => {
//             secretModal.style.display = 'none';
//         }, 2000);
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    const burgerBase = document.querySelector(".burger-base");
    const ingredients = document.querySelectorAll(".ingredient");
    const secretModal = document.getElementById("secretMessageModal");
    const secretText = document.querySelector(".secret-text");

    const layerMessages = {
        "bun-top" : "Our first meeting - when everything began!",
        lettuce: "Our first date at the burger place downtown!",
        tomato: "That special moment when we first kissed!",
        cheese: "Our amazing road trip adventures!",
        patty: "Moving in together - building our home!",
        "bun-bottom": "Here's to forever together! 💖",
    };

    function addBurgerLayer(layerType) {
        if (document.querySelector(`.burger-layer.${layerType}`)) return; // Prevent duplicates

        const layer = document.createElement("div");
        layer.className = `burger-layer ${layerType}`;
        burgerBase.appendChild(layer);

        setTimeout(() => {
            layer.style.opacity = "1";
            layer.style.transform = "translateY(0)";
        }, 50);
    }

    function showTemporaryMessage(message) {
        secretText.textContent = message;
        secretModal.style.display = 'block';
        setTimeout(() => {
            secretModal.style.display = 'none';
        }, 2000);
    }

    ingredients.forEach((ingredient) => {
        ingredient.addEventListener("click", () => {
            const layerType = ingredient.dataset.layer;
            addBurgerLayer(layerType);
            showTemporaryMessage(layerMessages[layerType]);
        });
    });

    // Konami Code Implementation
    const konamiCode = [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
        "b", "a"
    ];
    let konamiIndex = 0;

    document.addEventListener("keydown", (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showSecretMessage();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function showSecretMessage() {
        secretModal.style.display = 'block';
        secretText.textContent = "Here's my secret message just for you... 💖";
    }

    // Close Secret Modal
    document.querySelector(".close").addEventListener("click", () => {
        secretModal.style.display = "none";
    });

    // Intersection Observer for Timeline Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const ingredientType = entry.target.dataset.ingredient;
                addBurgerLayer(ingredientType);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".milestone").forEach((milestone) => {
        observer.observe(milestone);
    });
});


// Video Recording with Preview
const recordButton = document.getElementById("recordButton");
const preview = document.getElementById("preview");
const recordingStatus = document.getElementById("recordingStatus");
let mediaRecorder;
let recordedChunks = [];

recordButton.addEventListener("click", async () => {
    try {
        if (!mediaRecorder || mediaRecorder.state === "inactive") {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            // Show preview
            preview.srcObject = stream;
            preview.classList.remove("hidden");
            recordingStatus.classList.remove("hidden");

            mediaRecorder = new MediaRecorder(stream, {
                mimeType: "video/webm; codecs=vp9",
            });

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
                const videoUrl = URL.createObjectURL(videoBlob);

                // Create download link
                const a = document.createElement("a");
                a.href = videoUrl;
                a.download = `birthday-message-${Date.now()}.webm`;
                document.body.appendChild(a);
                a.click();

                // Cleanup
                URL.revokeObjectURL(videoUrl);
                document.body.removeChild(a);
                recordedChunks = [];

                // Stop all tracks
                stream.getTracks().forEach((track) => track.stop());
            };

            mediaRecorder.start();
            recordButton.textContent = "⏹ Stop Recording";
            recordButton.style.backgroundColor = "#ff4444";
        } else {
            mediaRecorder.stop();
            recordButton.textContent = "🎙 Record Your Response";
            recordButton.style.backgroundColor = "#FF6347";
            preview.classList.add("hidden");
            recordingStatus.classList.add("hidden");
        }
    } catch (err) {
        console.error("Error accessing media devices:", err);
        alert("Error accessing camera/microphone! Please check permissions.");
    }
});


function startFireworks() {
    const fireworksContainer = document.getElementById("fireworks");
    fireworksContainer.classList.remove("hidden");

    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let balloons = [];

    class Particle {
        constructor(x, y, golden = false) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.color = golden ? `hsl(45, 100%, ${50 + Math.random() * 20}%)` : `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.velocity = {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10,
            };
            this.alpha = 1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= 0.01;
            this.size -= 0.1;
        }
    }

    class Balloon {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 50;
            this.size = Math.random() * 30 + 20;
            this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
            this.velocity = Math.random() * 2 + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Draw balloon string
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.size);
            ctx.lineTo(this.x, this.y + this.size + 50);
            ctx.strokeStyle = "#555";
            ctx.stroke();
        }

        update() {
            this.y -= this.velocity;
            if (this.y < -50) {
                this.y = canvas.height + 50;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5; // Fireworks appear in upper half

        for (let i = 0; i < 100; i++) {
            const golden = Math.random() > 0.5;
            particles.push(new Particle(x, y, golden));
        }
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create new fireworks randomly
        if (Math.random() < 0.1) {
            createFirework();
        }

        // Update and draw particles
        particles.forEach((particle, index) => {
            if (particle.alpha <= 0 || particle.size <= 0) {
                particles.splice(index, 1);
            } else {
                particle.draw();
                particle.update();
            }
        });

        // Update and draw balloons
        balloons.forEach(balloon => {
            balloon.draw();
            balloon.update();
        });

        requestAnimationFrame(animateFireworks);
    }

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create balloons
    for (let i = 0; i < 10; i++) {
        balloons.push(new Balloon());
    }

    animateFireworks();
}

const playlist = [
    "assets/music/song1.mp3",
    "assets/music/song2.mp3",
    "assets/music/song3.mp3"
];

let currentIndex = 0;
let bgMusic;

// Function to play background music
function playBackgroundMusic() {
    if (bgMusic) {
        bgMusic.stop(); // Stop previous music if playing
    }

    bgMusic = new Howl({
        src: [playlist[currentIndex]],
        autoplay: true,
        loop: true, // No loop since we will switch songs
        volume: 0.5,
        onend: function () {
            // Move to the next song in the playlist
            currentIndex = (currentIndex + 1) % playlist.length;
            if(currentIndex == playlist.length){
                currentIndex = 0;
            }
            playBackgroundMusic(); // Recursively play next song
        }
    });

    console.log(`Playing: ${playlist[currentIndex]}`);
    return bgMusic;
}

// Handle user interaction for autoplay restrictions
document.body.addEventListener("click", () => {
    if (!bgMusic || !bgMusic.playing()) {
        playBackgroundMusic();
    }
});


// // Function to play background music
// function playBackgroundMusic() {
//     const bgMusic = new Howl({
//         src: ["assets/music/song1.mp3"],
//         autoplay: true,  // Set to true for initial playback
//         loop: true,      // Loop the music for continuous play
//         volume: 0.5,
//         onplayerror: function () {
//             bgMusic.once("unlock", function () {
//                 bgMusic.play();
//             });
//         },
//         onloaderror: function () {
//             console.log("Error loading the background music.");
//         }
//     });

//     // Handle user click to bypass autoplay restrictions
//     document.body.addEventListener("click", () => {
//         if (!bgMusic.playing()) {
//             bgMusic.play();
//         }
//     });

//     console.log("Background music initialized.");
//     return bgMusic;  // Return the music instance to control it later
// }

let soundsPlayed = false;  // Flag to check if sounds have been played

function revealWebsite() {
    const loadingScreen = document.getElementById("loadingScreen");
    const mainContent = document.getElementById("mainContent");

    // Play sound effects only once
    if (!soundsPlayed) {
        sounds.celebration.play();
        startFireworks();
        sounds.success.play();
        soundsPlayed = true;  // Set the flag to true after playing the sounds

        // Stop the sound effects after 3 seconds
        setTimeout(() => {
            sounds.celebration.pause();
            sounds.success.pause();
            startFireworks();
            sounds.celebration.currentTime = 0;  // Reset the sound to start from the beginning
            sounds.success.currentTime = 0;  // Reset the sound to start from the beginning
        }, 5000); // Stop sounds after 3 seconds
    }

    // Trigger reveal animation
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
        loadingScreen.remove();
        mainContent.classList.remove("hidden");
        mainContent.classList.add("revealed");

        // Wait a bit before starting background music
        setTimeout(() => {
            // Start background music after a short delay (allow sound effects to finish)
            const music = playBackgroundMusic();
            if (!music.playing()) {
                music.play(); // Ensure music starts after interaction if needed
            }

            // Update play/pause button
            const playPauseBtn = document.getElementById("playPauseBtn");
            if (playPauseBtn) {
                playPauseBtn.textContent = "🎵 Pause";
            }
        }, 2000); // Delay background music for 2 seconds (adjust as needed)

        // Launch fireworks and balloons after the main content is revealed
        setTimeout(() => {
            // Start fireworks behind the content
        }, 3000); // Fireworks start 3 seconds after the website reveals (adjust timing if needed)

    }, 1000); // Remove loading screen after 1 second delay
}


// Initialize Everything
window.onload = () => {
    initLoaderAnimation();
    updateTimer();
    setInterval(updateTimer, 1000);

    // Check if birthday already passed
    if (new Date() >= BIRTHDAY_DATE) {
        revealWebsite();
    }
};
