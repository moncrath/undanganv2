document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // INITIAL STATE & CONFIG
    // ==========================================
    const state = {
        foundItems: {
            figures: false,
            map: false,
            guestbook: false,
            story: false,
            gift: false
        },
        currentStorySlide: 0,
        musicPlaying: false
    };

    // DOM References
    const preloader = document.getElementById("preloader");
    const startBtn = document.getElementById("start-btn");
    const bgMusic = document.getElementById("bg-music");
    const musicController = document.querySelector(".music-controller");
    const musicDisc = document.getElementById("music-disc");
    const foundCountLabel = document.getElementById("found-count");
    const progressFill = document.getElementById("progress-fill");
    
    // ==========================================
    // PRELOADER & START GAME
    // ==========================================
    // Simulate loading for 1.5 seconds, then reveal enter button
    setTimeout(() => {
        const loaderText = preloader.querySelector("p");
        loaderText.textContent = "Ruangan kenangan siap dibuka!";
        startBtn.style.display = "inline-block";
        startBtn.style.animation = "heartbeat 1.5s infinite ease-in-out";
    }, 1500);

    startBtn.addEventListener("click", () => {
        // Fade out preloader
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 600);

        // Auto-play music (if permitted by browser)
        playMusic();
        
        // Spawn romantic background particles
        startParticleGenerator();
    });

    // ==========================================
    // MUSIC PLAYER SYSTEM
    // ==========================================
    function playMusic() {
        bgMusic.play().then(() => {
            state.musicPlaying = true;
            musicDisc.classList.add("playing");
            document.querySelector(".music-tooltip").textContent = "Matikan Musik";
        }).catch((err) => {
            console.log("Autoplay blocked by browser. User interaction needed to play audio:", err);
            state.musicPlaying = false;
        });
    }

    function toggleMusic() {
        if (state.musicPlaying) {
            bgMusic.pause();
            state.musicPlaying = false;
            musicDisc.classList.remove("playing");
            document.querySelector(".music-tooltip").textContent = "Putar Musik";
        } else {
            bgMusic.play();
            state.musicPlaying = true;
            musicDisc.classList.add("playing");
            document.querySelector(".music-tooltip").textContent = "Matikan Musik";
        }
    }

    musicController.addEventListener("click", toggleMusic);

    // ==========================================
    // INTERACTIVE OBJECTS & PROGRESS
    // ==========================================
    const interactiveObjects = document.querySelectorAll(".interactive-object");
    const modalOverlays = document.querySelectorAll(".modal-overlay");
    const closeButtons = document.querySelectorAll(".modal-close");

    interactiveObjects.forEach(obj => {
        obj.addEventListener("click", () => {
            const targetModalId = obj.getAttribute("data-target");
            const modal = document.getElementById(targetModalId);
            
            if (modal) {
                // Open targeted modal
                modal.classList.add("active");
                
                // Mark object as found
                const objKey = obj.id.replace("obj-", "");
                if (state.foundItems.hasOwnProperty(objKey) && !state.foundItems[objKey]) {
                    state.foundItems[objKey] = true;
                    updateProgress();
                }
            }
        });
    });

    // Close Modal Event Handler
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove("active");
        }
    }

    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetModalId = btn.getAttribute("data-close");
            closeModal(targetModalId);
        });
    });

    // Close modal when clicking on the overlay background
    modalOverlays.forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.remove("active");
            }
        });
    });

    // Update Progress Bar (Protected with safe checks in case elements are removed)
    function updateProgress() {
        const total = Object.keys(state.foundItems).length;
        const found = Object.values(state.foundItems).filter(val => val === true).length;
        
        if (foundCountLabel) {
            foundCountLabel.textContent = found;
        }
        const percentage = (found / total) * 100;
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }

        // Delight Easter Egg Spell: Special celebration when all objects found
        if (found === total) {
            setTimeout(() => {
                showToast("Selamat! Kamu sudah menemukan semua detail undangan kami! ❤️✨");
                // Gentle pulse animation to progress fill
                if (progressFill) {
                    progressFill.style.animation = "heartbeat 2s infinite";
                }
            }, 800);
        }
    }

    // ==========================================
    // DIGITAL GUESTBOOK WITH LOCALSTORAGE
    // ==========================================
    const guestbookForm = document.getElementById("guestbook-form");
    const wishesList = document.getElementById("wishes-list");
    const wishCountSpan = document.getElementById("wish-count");
    const noWishesPlaceholder = document.getElementById("no-wishes");

    // Load existing wishes from LocalStorage on load
    let savedWishes = JSON.parse(localStorage.getItem("undangan_wishes")) || [];
    renderWishes();

    guestbookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("guest-name");
        const wishInput = document.getElementById("guest-wish");

        const newWish = {
            name: nameInput.value.trim(),
            wish: wishInput.value.trim(),
            time: new Date().toLocaleDateString("id-ID", { 
                day: "numeric", 
                month: "short", 
                year: "numeric" 
            })
        };

        // Prepend new wish
        savedWishes.unshift(newWish);
        localStorage.setItem("undangan_wishes", JSON.stringify(savedWishes));

        // Clear form fields
        nameInput.value = "";
        wishInput.value = "";

        // Re-render and show success toast
        renderWishes();
        showToast("Ucapanmu berhasil terkirim! Terima kasih ❤️");
    });

    function renderWishes() {
        wishCountSpan.textContent = savedWishes.length;

        if (savedWishes.length === 0) {
            noWishesPlaceholder.style.display = "block";
            wishesList.innerHTML = "";
            wishesList.appendChild(noWishesPlaceholder);
            return;
        }

        noWishesPlaceholder.style.display = "none";
        wishesList.innerHTML = "";

        savedWishes.forEach(item => {
            const wishItem = document.createElement("div");
            wishItem.className = "wish-item";

            wishItem.innerHTML = `
                <div class="wish-header">
                    <span class="wish-name">${escapeHTML(item.name)}</span>
                    <span class="wish-time">${item.time}</span>
                </div>
                <p class="wish-text">${escapeHTML(item.wish)}</p>
            `;

            wishesList.appendChild(wishItem);
        });
    }

    // Escape HTML to prevent XSS (Rule 5 Security)
    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // ==========================================
    // OUR STORY SLIDESHOW SYSTEM
    // ==========================================
    const slides = document.querySelectorAll(".story-slide");
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");
    const currentSlideNum = document.getElementById("current-slide-num");

    function showSlide(index) {
        // Boundary check
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;

        state.currentStorySlide = index;

        // Toggle active slide
        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });

        // Update nav indicator
        currentSlideNum.textContent = index + 1;

        // Toggle button states
        prevBtn.style.opacity = index === 0 ? "0.4" : "1";
        prevBtn.style.pointerEvents = index === 0 ? "none" : "auto";
        nextBtn.style.opacity = index === slides.length - 1 ? "0.4" : "1";
        nextBtn.style.pointerEvents = index === slides.length - 1 ? "none" : "auto";
    }

    prevBtn.addEventListener("click", () => {
        showSlide(state.currentStorySlide - 1);
    });

    nextBtn.addEventListener("click", () => {
        showSlide(state.currentStorySlide + 1);
    });

    // Initialize first slide UI
    showSlide(0);

    // ==========================================
    // ACCOUNT NUMBER COPY SYSTEM
    // ==========================================
    const copyBtns = document.querySelectorAll(".copy-norek-btn");
    const toast = document.getElementById("toast");

    copyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const textToCopy = document.getElementById(targetId).textContent.trim();

            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showToast("Nomor rekening berhasil disalin! ❤️");
                })
                .catch(err => {
                    console.error("Failed to copy account number: ", err);
                    // Fallback copy
                    const tempTextArea = document.createElement("textarea");
                    tempTextArea.value = textToCopy;
                    document.body.appendChild(tempTextArea);
                    tempTextArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(tempTextArea);
                    showToast("Nomor rekening berhasil disalin! ❤️");
                });
        });
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }

    // ==========================================
    // FLOATING PARTICLES GENERATOR
    // ==========================================
    function startParticleGenerator() {
        const particlesContainer = document.getElementById("particles-container");
        
        setInterval(() => {
            const isHeart = Math.random() > 0.6; // 40% hearts, 60% standard circles
            const particle = document.createElement("div");
            
            const randomX = Math.random() * 100; // random percentage width
            const randomSize = Math.random() * 8 + 4; // size between 4px and 12px
            const randomDuration = Math.random() * 6 + 6; // speed between 6s and 12s

            if (isHeart) {
                particle.className = "particle-heart";
                particle.innerHTML = '<i class="fa-solid fa-heart"></i>';
                particle.style.fontSize = `${randomSize + 6}px`;
            } else {
                particle.className = "particle";
                particle.style.width = `${randomSize}px`;
                particle.style.height = `${randomSize}px`;
            }

            particle.style.left = `${randomX}%`;
            particle.style.animationDuration = `${randomDuration}s`;
            
            particlesContainer.appendChild(particle);

            // Clean up old particle elements to prevent memory leaks
            setTimeout(() => {
                particle.remove();
            }, randomDuration * 1000);
            
        }, 500); // spawn every 500ms
    }

});
