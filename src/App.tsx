import React, { useRef, useLayoutEffect, useEffect } from 'react'; // Added useEffect
import './index.css'; // Ensure Tailwind styles are imported
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Mock Icons ---
// Adjusted icon colors for potentially better contrast with blue/white canvas BG
const LeafIcon = () => <svg className="w-6 h-6 inline-block mr-2 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343m11.314 11.314a8 8 0 00-11.314-11.314m11.314 11.314L6.343 7.343" /></svg>;
const ShineIcon = () => <svg className="w-6 h-6 inline-block mr-2 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const ShieldIcon = () => <svg className="w-6 h-6 inline-block mr-2 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;


gsap.registerPlugin(ScrollTrigger);

// --- Image Paths ---
const bottleImageUrl = '/serum_bottle.png';
const nozzleImageUrl = '/nozzle.png';
const dropImageUrl = '/drop.png';
const ingredientsImageUrl = 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80';
const hairLifestyleImageUrl = 'https://images.unsplash.com/photo-1525478416217-85683f508187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80';

const waterBlue = 'sky-400';
// Define text color for Section 3, suitable for the new bubble background
const section3TextColor = 'sky-900'; // Darker blue/sky color for contrast

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  // Hero Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentWrapperRef = useRef<HTMLDivElement>(null);
  const bottleContainerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const nozzleRef = useRef<HTMLImageElement>(null);
  const dropRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  // Section 2 Ref
  const insideDropRef = useRef<HTMLDivElement>(null);

  // --- Section 3 Refs ---
  const ingredientsSectionRef = useRef<HTMLDivElement>(null);
  const ingredientsContentRef = useRef<HTMLDivElement>(null);
  const ingredientsImageRef = useRef<HTMLImageElement>(null);
  const ingredientsListRef = useRef<HTMLUListElement>(null);
  // ---> Ref for the canvas element
  const bubblesCanvasRef = useRef<HTMLCanvasElement>(null);
  // ---> Refs to manage animation state without causing re-renders
  const bubblesRef = useRef<any[]>([]); // To store bubble data
  const animationFrameRef = useRef<number | null>(null); // To store requestAnimationFrame ID
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 }); // Store canvas dimensions

  // Other section refs
  const benefitsSectionRef = useRef<HTMLDivElement>(null);
  const howToUseSectionRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);


  // --- GSAP Animations (Hero, Section 2, Section 3 Content) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
       // --- Hero & Section 2 Animation ---
      if (heroRef.current && /* ... other hero/sec2 refs ... */ insideDropRef.current) {
          // ... (Keep existing Hero and Section 2 GSAP setup and timeline) ...
            const dropVisualCenterOrigin = "50% 11%";
            const maskStartSize = 5;
            const maskEndSize = 110;
            const nozzlePressDistance = 8;
            const viewportCenterY = window.innerHeight / 2;
            const dropImageTopToDropVisualTopOffset = 55;
            const pageScrollDistance = window.innerHeight * 0.8;
            const zoomCounterXPercent = -(50 - parseFloat(dropVisualCenterOrigin.split(' ')[0]));
            const zoomCounterYPercent = -(50 - parseFloat(dropVisualCenterOrigin.split(' ')[1]));
            const finalZoomScale = 250;
            const bottleContainerTop = bottleContainerRef.current.offsetTop;
            const dropVisualStartY = bottleContainerTop + dropImageTopToDropVisualTopOffset;
            const dropFallToCenterDistance = viewportCenterY - dropVisualStartY;

            gsap.set(dropRef.current, { transformOrigin: dropVisualCenterOrigin });
            gsap.set(insideDropRef.current, {
                opacity: 0,
                '--mask-reveal-percent': maskStartSize
            });

            const heroTl = gsap.timeline({
                scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: '+=4000',
                scrub: 1.5,
                pin: true,
                anticipatePin: 1,
                // markers: true,
                },
            });

            heroTl.set(heroContentWrapperRef.current, { y: 0 });
            heroTl.set(dropRef.current, { opacity: 0, y: 0, scale: 1 });

            heroTl.to(nozzleRef.current, { y: `+=${nozzlePressDistance}px`, duration: 0.2 }, ">")
                .to(nozzleRef.current, { y: `-=${nozzlePressDistance}px`, duration: 0.3 }, ">0.1")
                .to(dropRef.current, { opacity: 1, duration: 0.2 }, "<");

            heroTl.addLabel("dropFalling")
                .to(dropRef.current, { y: `+=${dropFallToCenterDistance}px`, duration: 1.0, ease: 'power1.in' }, "dropFalling");

            heroTl.addLabel("dropCentered", ">")
                .to(heroContentWrapperRef.current, { y: `-=${pageScrollDistance}px`, duration: 1.5, ease: 'none' }, "dropCentered")
                .to(dropRef.current, { y: `+=${pageScrollDistance}px`, duration: 1.5, ease: 'none' }, "dropCentered");

            heroTl.addLabel("startZoom", "dropCentered+=0.5")
                .to([heroContentRef.current, bottleRef.current, nozzleRef.current], { opacity: 0, duration: 0.5 }, "startZoom")
                .to(dropRef.current, {
                    scale: finalZoomScale,
                    xPercent: zoomCounterXPercent,
                    yPercent: zoomCounterYPercent,
                    duration: 1.0,
                    ease: 'power2.in'
                }, "startZoom")
                .to(dropRef.current, { opacity: 0, duration: 0.3 }, ">-0.3")
                .to(insideDropRef.current, {
                    opacity: 1,
                    '--mask-reveal-percent': maskEndSize,
                    duration: 1.5,
                    ease: 'power1.inOut'
                }, "startZoom+=0.4");
      } else {
          console.error("One or more critical refs for Hero/Section 2 are not assigned.");
      }

      // --- Section 3: Ingredients Content Animations ---
      if (ingredientsSectionRef.current && ingredientsContentRef.current && ingredientsImageRef.current) {
         // ... (Keep existing Section 3 CONTENT animations - GSAP part) ...
          gsap.from(ingredientsContentRef.current, {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: ingredientsSectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });
        gsap.from(ingredientsImageRef.current, {
            opacity: 0,
            x: -100, // Slide in from left (or keep previous animation)
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: ingredientsSectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
            }
        });
        if (ingredientsListRef.current) {
            gsap.from(ingredientsListRef.current.children, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: ingredientsListRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            });
        }
      } else {
           console.error("One or more refs for Section 3 content animation are not assigned.");
      }

      // --- Animations for Sections 4+ ---
      // ... (Keep existing animations for sections 4+) ...
        const animateSectionIn = (sectionRef: React.RefObject<HTMLElement>) => { /* ... */ };
        animateSectionIn(benefitsSectionRef);
        animateSectionIn(howToUseSectionRef);
        animateSectionIn(ctaSectionRef);
        if (footerRef.current) { /* ... */ }

    }, appRef); // Scope GSAP context

    return () => ctx.revert(); // Cleanup GSAP

  }, []); // Empty dependency array for GSAP setup


  // --- Canvas Bubble Animation Effect ---
  useEffect(() => {
    const canvas = bubblesCanvasRef.current;
    if (!canvas) return; // Exit if canvas not ready

    const context = canvas.getContext('2d');
    if (!context) return; // Exit if context couldn't be created
    canvasContextRef.current = context;

    // Animation Parameters (from original JS)
    const particles = 60;
    const minRadius = 5;
    const maxRadius = 20;
    const speedIncrement = 0.01; // Renamed 'speed' to avoid conflict

    // Initialize Bubbles function
    const initBubbles = (width: number, height: number) => {
        bubblesRef.current = []; // Clear existing bubbles
        const particleWidth = width / particles;
        for (let i = 0; i < particles; i++) {
            bubblesRef.current.push({
                x: i * particleWidth + Math.random() * particleWidth, // Spread bubbles more evenly
                y: height * Math.random(),
                r: minRadius + Math.random() * (maxRadius - minRadius),
                speed: 1 + Math.random() * 4 // Adjusted initial speed slightly
            });
        }
    };

    // Bubble drawing function (adapted from original JS)
    const drawBubbleFrame = () => {
        const ctx = canvasContextRef.current;
        const canvasEl = bubblesCanvasRef.current;
        const bubbles = bubblesRef.current;
        const { width, height } = dimensionsRef.current;

        if (!ctx || !canvasEl || !bubbles || width === 0 || height === 0) return;

        // Clear canvas (important for animation)
        // Alternatively, draw the gradient background here each frame if needed,
        // but setting it via CSS/Tailwind is usually more performant.
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < bubbles.length; i++) {
            const b = bubbles[i];

            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);

            const alpha = Math.max(0, Math.min(0.6, 0.6 * (b.y / height))); // Clamp alpha
            b.speed += speedIncrement;

            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)"; // Adjusted alpha slightly
            ctx.stroke();
            // Using HSL for color: hsla(203, 75%, 69%, alpha) -> approx Tailwind sky-400/sky-500
            ctx.fillStyle = `hsla(203, 75%, 69%, ${alpha})`;
            ctx.fill();

            b.y -= b.speed;

            // Reset bubble if it goes off the top
            if (b.y + b.r < 0) { // Check based on radius
                b.y = height + b.r; // Reset below the screen
                b.x = Math.random() * width; // Randomize x on reset
                b.speed = 1 + Math.random() * 4; // Reset speed
                b.r = minRadius + Math.random() * (maxRadius - minRadius); // Optional: randomize radius on reset
            }
        }
    };

    // Main animation loop function
    const animate = () => {
        drawBubbleFrame();
        animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Resize handler
    const handleResize = () => {
        const section = ingredientsSectionRef.current; // Use section dimensions
        const canvasEl = bubblesCanvasRef.current;
        if (!section || !canvasEl) return;

        // Use section's dimensions for canvas sizing
        const newWidth = section.offsetWidth;
        const newHeight = section.offsetHeight;

        dimensionsRef.current = { width: newWidth, height: newHeight };
        canvasEl.width = newWidth;
        canvasEl.height = newHeight;

        // Re-initialize bubbles based on new dimensions if desired, or just let them adapt
        initBubbles(newWidth, newHeight); // Re-create bubbles for new size

        // No need to call draw() directly, requestAnimationFrame loop handles it
    };

    // --- Initialization and Cleanup ---
    handleResize(); // Initial setup
    animate(); // Start animation loop
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener('resize', handleResize);
        bubblesRef.current = []; // Clear bubble data on unmount
        canvasContextRef.current = null;
    };

  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount


  return (
    <div ref={appRef} className="relative bg-shire-gold-light/10 font-sans text-shire-green-dark min-h-[600vh] overflow-x-hidden">

      {/* Section 1: Hero */}
      <section ref={heroRef} className={`h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-shire-gold-light to-${waterBlue}`}>
         {/* ... Hero content ... */}
         <div ref={heroContentWrapperRef} className="w-full flex flex-col items-center justify-center absolute top-0 left-0 h-full">
             <div ref={heroContentRef} className="z-30 text-center relative mb-[-10vh] px-4 will-change-transform">
                 {/* ... */} <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-shire-green-dark mb-6 font-serif tracking-tight">Shire Elixir</h1><p className="text-lg md:text-xl text-shire-green max-w-md mx-auto leading-relaxed">Nature's essence, bottled for radiant hair. Unisex formula.</p>
             </div>
             <div ref={bottleContainerRef} className="relative z-10 mt-8 grid place-items-center w-[80vw] sm:w-[60vw] md:w-[40vw] md:max-w-[350px]" style={{ height: '60vh' }}>
                <img ref={nozzleRef} src={nozzleImageUrl} alt="" className="col-start-1 row-start-1 w-full h-full object-contain z-0 will-change-transform" aria-hidden="true"/>
                <img ref={bottleRef} src={bottleImageUrl} alt="Shire Elixir hair serum bottle" className="col-start-1 row-start-1 w-full h-full object-contain z-10 will-change-transform"/>
                <img ref={dropRef} src={dropImageUrl} alt="Serum drop" className="col-start-1 row-start-1 w-full h-full object-contain opacity-0 will-change-transform z-20 pointer-events-none"/>
             </div>
         </div>
      </section>

      {/* Section 2: Inside Drop Content - FIXED & MASKED */}
      <section
        ref={insideDropRef}
        className="fixed inset-0 w-full h-screen opacity-0 z-10 bg-emerald-50/80 pointer-events-auto flex flex-col items-center justify-center will-change-opacity" // z-10
        style={{ /* ... mask styles ... */
           '--mask-reveal-percent': '5%',
           maskImage: `radial-gradient(circle at 50% 50%, black calc(var(--mask-reveal-percent) - 15%), transparent var(--mask-reveal-percent))`, WebkitMaskImage: `radial-gradient(circle at 50% 50%, black calc(var(--mask-reveal-percent) - 15%), transparent var(--mask-reveal-percent))`, maskSize: 'cover', WebkitMaskSize: 'cover', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center center', WebkitMaskPosition: 'center center'
        }}
      >
          {/* ... Content wrapper ... */}
           <div className="text-shire-green-dark p-10 pt-[15vh] md:pt-[20vh] max-w-3xl w-full">
                 <h2 className="text-4xl md:text-6xl font-bold font-serif mb-8 text-center">Inside the Elixir</h2>
                 <div className="space-y-6 text-lg text-center bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg font-sans leading-relaxed">
                     <p>Discover the potent blend of natural oils and botanical extracts...</p> <p>Perfectly balanced for all hair types...</p> <button className="mt-6 px-8 py-3 bg-shire-green text-white rounded-full font-semibold hover:bg-shire-green-dark transition duration-300 shadow-md transform hover:scale-105"> Explore Ingredients </button>
                 </div>
            </div>
      </section>


      {/* Section 3: Ingredients (Scrolls OVER Section 2 with CANVAS Background) */}
      {/* REMOVED background class from section, added relative, z-20 */}
      <section
        ref={ingredientsSectionRef}
        className={`relative py-20 md:py-32 z-20 overflow-hidden text-${section3TextColor}`} // Ensure text color has contrast
      >
         {/* Canvas Element for Background */}
         <canvas
            ref={bubblesCanvasRef}
            id="bubbles"
            // Position canvas behind content, apply gradient
            className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-t from-blue-200 to-white" // Tailwind gradient matching CSS
            // Set initial width/height, JS will update on resize
            width="1000"
            height="800"
         ></canvas>

         {/* Content Container (stays on top of canvas due to z-index layering) */}
         <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-0"> {/* Content needs relative z-0 or higher if needed */}
            {/* Text Content (Animated) */}
            <div ref={ingredientsContentRef} className={`prose prose-lg max-w-none will-change-transform,opacity text-${section3TextColor}`}>
                 <h2 className={`text-3xl md:text-4xl font-bold font-serif mb-6 text-${section3TextColor}`}>Pure & Potent Ingredients</h2>
                 <p>We meticulously source the finest natural components...</p>
                 {/* List */}
                 <ul ref={ingredientsListRef} className="list-none p-0 mt-4 space-y-2">
                    <li className="flex items-start"><LeafIcon /><span>**Argan Oil:** Rich in Vitamin E...</span></li>
                    <li className="flex items-start"><ShineIcon /><span>**Jojoba Oil:** Mimics natural scalp sebum...</span></li>
                    <li className="flex items-start"><ShieldIcon /><span>**Broccoli Seed Oil:** Natural alternative to silicones...</span></li>
                    <li className="flex items-start"><LeafIcon /><span>**Rosemary Extract:** Known to invigorate the scalp...</span></li>
                 </ul>
                 <p className="mt-4">Free from harsh chemicals...</p>
            </div>
            {/* Image (Animated) */}
            <div className="mt-10 md:mt-0">
                <img
                    ref={ingredientsImageRef}
                    src={ingredientsImageUrl}
                    alt="Natural ingredients like herbs, fruits, and oils"
                    className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[500px] will-change-transform,opacity"
                 />
            </div>
         </div>
      </section>

      {/* Sections 4+ - Ensure they also have relative and z-20 + OPAQUE background */}
      <section ref={benefitsSectionRef} className="relative py-20 md:py-32 bg-shire-green-light/30 z-20">
           {/* ... content ... */}
            <div className="container mx-auto px-6 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold font-serif mb-12 text-shire-green-dark">Why You'll Love It</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/80 p-6 rounded-lg shadow-md backdrop-blur-sm text-shire-green-dark"> <LeafIcon /> <h3 className="text-xl font-semibold mt-2 mb-2">Deep Nourishment</h3> <p>Penetrates hair strands...</p> </div>
                    <div className="bg-white/80 p-6 rounded-lg shadow-md backdrop-blur-sm text-shire-green-dark"> <ShineIcon /> <h3 className="text-xl font-semibold mt-2 mb-2">Radiant Shine</h3> <p>Leaves hair looking glossy...</p> </div>
                    <div className="bg-white/80 p-6 rounded-lg shadow-md backdrop-blur-sm text-shire-green-dark"> <ShieldIcon /> <h3 className="text-xl font-semibold mt-2 mb-2">Frizz Control</h3> <p>Tames flyaways...</p> </div>
                </div>
           </div>
      </section>

      <section ref={howToUseSectionRef} className="relative py-20 md:py-32 bg-white z-20">
          {/* ... content ... */}
           <div className="container mx-auto px-6 text-shire-green-dark">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-12 text-center">Simple Steps to Radiant Hair</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div> <span className="text-5xl font-bold text-shire-green block mb-2">1</span> <h3 className="text-xl font-semibold mb-2">Dispense</h3> <p>Apply 2-3 drops...</p> </div>
                    <div> <span className="text-5xl font-bold text-shire-green block mb-2">2</span> <h3 className="text-xl font-semibold mb-2">Apply</h3> <p>Rub palms together...</p> </div>
                    <div> <span className="text-5xl font-bold text-shire-green block mb-2">3</span> <h3 className="text-xl font-semibold mb-2">Style</h3> <p>Style as usual...</p> </div>
                </div>
          </div>
      </section>

      <section ref={ctaSectionRef} className="relative py-24 md:py-40 bg-shire-green z-20 text-center overflow-hidden">
            {/* ... content ... */}
             <div className="container mx-auto px-6 relative z-10">
                 <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-white">Ready for Your Best Hair?</h2>
                 <p className="text-lg md:text-xl text-shire-gold-light/90 max-w-xl mx-auto mb-8">Experience the magic...</p>
                 <button className="px-10 py-4 bg-white text-shire-green rounded-full font-bold text-lg hover:bg-shire-gold-light transition duration-300 shadow-lg transform hover:scale-105"> Shop Now </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-800 to-shire-green opacity-50 z-0"></div>
      </section>

      <footer ref={footerRef} className="relative py-12 bg-shire-green-dark text-shire-gold-light/70 text-center text-sm z-20">
             {/* ... content ... */}
              <p>© {new Date().getFullYear()} Shire Botanicals. All rights reserved.</p> <p className="mt-1">Inspired by Nature, Crafted with Care.</p>
      </footer>

    </div>
  );
}

export default App;