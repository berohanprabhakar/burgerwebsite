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



function addTimelineObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {  // When the element enters the viewport
                entry.target.classList.add('visible');  // Add the visible class to animate
            }
        });
    }, { threshold: 0.5 });  // Trigger when 50% of the element is in view

    document.querySelectorAll(".milestone").forEach(milestone => {
        observer.observe(milestone);  // Observe each milestone element
    });
}

document.addEventListener('DOMContentLoaded', () => {
    addTimelineObserver();  // Start observing the timeline milestones
});



function showSecretMessage() {
    secretModal.style.display = 'block';
    secretText.textContent = "Here's my secret message just for you... 💖";
}


function startFireworks() {
    const fireworksContainer = document.getElementById("fireworks");
    fireworksContainer.classList.remove("hidden");

    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let balloons = [];

    class Particle {
        constructor(x, y, golden = true) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.color = golden ? `hsl(45, 100%, ${50 + Math.random() * 20}%)` : `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.velocity = {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
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
            this.size -= 0.05;
        }
    }

    

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height; // Fireworks appear in upper half

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
    "assets/music/jhol.mp3",
    "assets/music/chaldiye.mp3",
    "assets/music/song2.mp3",
    
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
        loop: false, // No loop since we will switch songs
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
            sounds.celebration.currentTime = 0;  // Reset the sound to start from the beginning
            sounds.success.currentTime = 0;  // Reset the sound to start from the beginning
        }, 9000); // Stop sounds after 3 seconds
    }

    // Trigger reveal animation
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
        loadingScreen.remove();
        mainContent.classList.remove("hidden");
        mainContent.classList.add("revealed");

    
            // Start background music after a short delay (allow sound effects to finish)
            const music = playBackgroundMusic();
            if (!music.playing()) {
                music.play(); // Ensure music starts after interaction if needed
            }

    }, 3000); // Remove loading screen after 1 second delay
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

const images = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 
    'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg', 
    'img13.jpg', 'img14.jpg', 'img15.jpg', 'img16.jpg', 'img17.jpg', 'img18.jpg', 'img20.jpg',  'img22.jpg', 'img23.jpg', 'img24.jpg',
    'img25.jpg', 'img21.jpg', 'img26.jpg', 'img27.jpg', 'img28.jpg', 'img29.jpg', 'img30.jpg'
];

const photoScrollContainer = document.getElementById('photoScrollContainer');

// Function to create image elements
function createImages() {
    images.forEach(image => {
        const photoFrame = document.createElement('div');
        photoFrame.classList.add('photo-frame');
        
        const imgElement = document.createElement('img');
        imgElement.src = `./assets/allimg/${image}`;
        imgElement.alt = image;
        
        photoFrame.appendChild(imgElement);
        photoScrollContainer.appendChild(photoFrame);
    });
}

// **Create images twice for a seamless infinite scroll**
createImages();

