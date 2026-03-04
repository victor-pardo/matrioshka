document.addEventListener("DOMContentLoaded", () => {

gsap.registerPlugin(ScrollTrigger);
    
    // animación de header

    const header2Content = document.querySelector(".header-2-content");
    if (header2Content) {
        const originalContent = header2Content.innerHTML;
        header2Content.innerHTML = originalContent + originalContent;

        gsap.to(header2Content, {
            x: "-50%",
            duration: 30,
            ease: "none",
            repeat: -1
        });
    }

    // efecto de levitar
    
    const levitarTimeline = gsap.timeline({ repeat: -1, yoyo: true })
        .to(".hero-main img", { y: -20, rotation: 2, duration: 2, ease: "power1.inOut" }, 0)
        .to(".hero-subtitle",  { y: -15, duration: 3.5, ease: "sine.inOut" }, 0)
        .to(".hero-main h1",   { y: -18, duration: 4.5, ease: "sine.inOut" }, 0.5)
        .to(".hero-tagline",   { y: -12, duration: 3.8, ease: "sine.inOut" }, 1);

    // control de la animación de levitar según el scroll

    ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        onEnter: () => {
            levitarTimeline.pause();
        },
        onLeaveBack: () => {
            levitarTimeline.play();
        }
    });

    // animaciones parrallax en el hero
    
    gsap.to(".hero-main img", {
        y: 300,
        scale: 0.8,
        rotation: "-=20",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    gsap.to(".hero-subtitle", {
        y: 200,
        scale: 0.9,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    gsap.to(".hero-main h1", {
        y: 250,
        rotation: "+=10",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5
        }
    });

    gsap.to(".hero-tagline", {
        y: 350,
        x: -100,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 2
        }
    });

    //efecto de aparicion de spans conm stagger

    gsap.from(".grid-info span", {
        scrollTrigger: {
            trigger: ".about-us",
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0.8,
        y: 50,
        rotation: -15,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    // efecto iman en la matrioshka metálica
    const matrioshkaMetalica = document.querySelector(".about-us-content img");
    
    if (matrioshkaMetalica) {
        const magneticStrength = 0.15; //intensidad
        const magneticRadius = 800; //radio de magnetismo
        
        // obtener el centro del elemento
        const getElementCenter = (element) => {
            const rect = element.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        };
        
        // calcular distancia entre dos puntos
        const getDistance = (x1, y1, x2, y2) => {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        };
        
        document.addEventListener("mousemove", (e) => {
            const center = getElementCenter(matrioshkaMetalica);
            const distance = getDistance(e.clientX, e.clientY, center.x, center.y);
            
            if (distance < magneticRadius) {
                const strength = (magneticRadius - distance) / magneticRadius;
                const moveX = (e.clientX - center.x) * magneticStrength * strength;
                const moveY = (e.clientY - center.y) * magneticStrength * strength;
                
                gsap.to(matrioshkaMetalica, {
                    x: moveX,
                    y: moveY,
                    rotation: moveX * 0.03,
                    duration: 0.8,
                    ease: "power1.out"
                });

            } else {
                // posición original
                gsap.to(matrioshkaMetalica, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    duration: 1.2,
                    ease: "power2.out"
                });
            }
        });
    }

    //animacion de los platos

    const platos = document.querySelector(".platos");
    const container = document.querySelector(".platos-container");
    
    if (platos && container) {
        
        const distanciaTotal = () => -(container.scrollWidth - platos.clientWidth);

        gsap.to(container, {
            x: distanciaTotal,
            ease: "none",
            scrollTrigger: {
                trigger: ".platos",
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
                invalidateOnRefresh: true
            }
        });
    }

    //efecto de pintar en la seccin de origen

    const origenSection = document.querySelector(".origen");
    
    if (origenSection) {
        // se crean 8 elementos de imagen
        const imageElements = [];
        for (let i = 1; i <= 8; i++) {
            const imgDiv = document.createElement("div");
            imgDiv.className = "origen-image";
            imgDiv.style.backgroundImage = `url('assets/images/origen/origen-${i}.png')`;
            origenSection.appendChild(imgDiv);
            imageElements.push(imgDiv);
        }
        
        let currentIndex = 0;
        let lastMoveTime = 0;
        const moveThreshold = 50; //milisegundos entre imagen e imagen
        
        origenSection.addEventListener("mouseenter", () => {
            // reset al entrar
            currentIndex = 0;
        });
        
        origenSection.addEventListener("mousemove", (e) => {
            const now = Date.now();
            
            if (now - lastMoveTime > moveThreshold) {
                const img = imageElements[currentIndex];
                const rect = origenSection.getBoundingClientRect();
                
                // foto al cursror
                gsap.set(img, {
                    left: e.clientX - rect.left,
                    top: e.clientY - rect.top,
                    opacity: 0
                });
                
                // aparicion
                gsap.to(img, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                });
                
                // desaparicion despues de un tieempo
                gsap.to(img, {
                    opacity: 0,
                    duration: 0.6,
                    delay: 3,
                    ease: "power2.in"
                });
                
                currentIndex = (currentIndex + 1) % 8; 
                lastMoveTime = now;
            }
        });
        
        origenSection.addEventListener("mouseleave", () => {
            // borrrar imahgenes al salir
            gsap.to(".origen-image", {
                opacity: 0,
                scale: 0,
                duration: 0.3,
                stagger: 0.05
            });
        });
    }

    // animacion caida matrioskas doradas

    const locationSection = document.querySelector(".location");
    const matrioshkasDoradas = gsap.utils.toArray(".matrioshka-dorado");

    if (locationSection && matrioshkasDoradas.length) {
        const getStartY = (el) => -el.offsetHeight - 120;
        const getEndY = (el) => locationSection.clientHeight + el.offsetHeight + 120;

        matrioshkasDoradas.forEach((el, i) => {
            const dur = [4.2, 3.6, 4.8, 3.9][i % 4];

            gsap.set(el, { y: getStartY(el), opacity: 1 });

            const tl = gsap.timeline({
                repeat: -1,
                paused: true,
                defaults: { ease: "none" }
            });

            tl.to(el, {
                y: () => getEndY(el),
                duration: dur,
                invalidateOnRefresh: true,
            })
                .set(el, { opacity: 0 })
                .set(el, { y: () => getStartY(el) })
                .set(el, { opacity: 1 });
            
            ScrollTrigger.create({
                trigger: locationSection,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => tl.play(),
                onLeaveBack: () => tl.pause(),
                onLeave: () => tl.pause(),
                onEnterBack: () => tl.play(),
            });
        });
    }
});