import React, { useRef, useLayoutEffect } from 'react';
import './index.css'; // Ensure Tailwind styles are imported
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Mock Icons (Replace with actual SVGs or an icon library like react-icons) ---
const LeafIcon = () => <svg className="w-8 h-8 inline-block mr-2 text-shire-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; // Example placeholder
const ShineIcon = () => <svg className="w-8 h-8 inline-block mr-2 text-shire-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>; // Example placeholder
const ShieldIcon = () => <svg className="w-8 h-8 inline-block mr-2 text-shire-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>; // Example placeholder
// ----------------------------------------------------------------------------------

gsap.registerPlugin(ScrollTrigger);

// --- Image Paths ---
const bottleImageUrl = '/serum_bottle.png';
const nozzleImageUrl = '/nozzle.png';
const dropImageUrl = '/drop.png';
// Add placeholder paths for new sections (replace with real images)
const ingredientsImageUrl = 'https://images.unsplash.com/photo-1505063057545-c40473bbb6a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'; // Example herbs
const hairLifestyleImageUrl = 'https://images.unsplash.com/photo-1617059070474-a63e1aa8a3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80'; // Example hair

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  // Hero Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentWrapperRef = useRef<HTMLDivElement>(null);
  const bottleContainerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const nozzleRef = useRef<HTMLImageElement>(null);
  const dropRef = useRef<HTMLImageElement>(null);
  const insideDropRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  // Refs for new sections/animations
  const ingredientsSectionRef = useRef<HTMLDivElement>(null);
  const ingredientsImageRef = useRef<HTMLImageElement>(null);
  const benefitsSectionRef = useRef<HTMLDivElement>(null);
  const howToUseSectionRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Hero Animation Timeline (Existing Code) ---
      if (heroRef.current && heroContentWrapperRef.current && bottleRef.current && nozzleRef.current && dropRef.current && insideDropRef.current && heroContentRef.current && bottleContainerRef.current) {
          const nozzlePressDistance = 8;
          const viewportCenterY = window.innerHeight / 2;
          const dropImageTopToDropVisualTopOffset = 55;
          const pageScrollDistance = window.innerHeight * 0.8;
          const dropVisualCenterOrigin = "50% 11%";
          const zoomCounterXPercent = -(50 - parseFloat(dropVisualCenterOrigin.split(' ')[0]));
          const zoomCounterYPercent = -(50 - parseFloat(dropVisualCenterOrigin.split(' ')[1]));
          const finalZoomScale = 400;
          const bottleContainerTop = bottleContainerRef.current.offsetTop;
          const dropVisualStartY = bottleContainerTop + dropImageTopToDropVisualTopOffset;
          const dropFallToCenterDistance = viewportCenterY - dropVisualStartY;

          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: '+=6000',
              scrub: 1.5,
              pin: true,
              anticipatePin: 1,
              // markers: true, // Keep off for cleaner look, enable for debug
            },
          });

          heroTl.set(heroContentWrapperRef.current, { y: 0 });
          heroTl.set(dropRef.current, { opacity: 0, y: 0, scale: 1, transformOrigin: dropVisualCenterOrigin });
          heroTl.to(nozzleRef.current, { y: `+=${nozzlePressDistance}px`, duration: 0.2, ease: 'power1.inOut' }, ">")
            .to(nozzleRef.current, { y: `-=${nozzlePressDistance}px`, duration: 0.3, ease: 'power1.inOut' }, ">0.1")
            .to(dropRef.current, { opacity: 1, duration: 0.2, ease: 'power1.out' }, "<");
          heroTl.addLabel("dropFalling")
            .to(dropRef.current, { y: `+=${dropFallToCenterDistance}px`, duration: 1.0, ease: 'power1.in' }, "dropFalling");
          heroTl.addLabel("dropCentered", ">")
            .to(heroContentWrapperRef.current, { y: `-=${pageScrollDistance}px`, duration: 1.5, ease: 'none' }, "dropCentered")
            .to(dropRef.current, { y: `+=${pageScrollDistance}px`, duration: 1.5, ease: 'none' }, "dropCentered");
          heroTl.addLabel("startZoom", "dropCentered+=0.5")
             .to([heroContentRef.current, bottleRef.current, nozzleRef.current], { opacity: 0, duration: 0.5, ease: 'power2.out' }, "startZoom")
             .to(dropRef.current, { scale: finalZoomScale, xPercent: zoomCounterXPercent, yPercent: zoomCounterYPercent, duration: 1.5, ease: 'power2.in' }, "startZoom");
          heroTl.to(insideDropRef.current, { opacity: 1, backdropFilter: 'blur(5px) saturate(150%)', duration: 0.8, ease: 'power2.out' }, ">-0.5")
            .set(dropRef.current, { opacity: 0 });
      } else {
         console.error("One or more HERO refs are not assigned.");
      }

      // --- Animations for New Sections ---

      // Utility function for simple fade/slide-in
      const animateSectionIn = (sectionRef: React.RefObject<HTMLElement>) => {
        if (sectionRef.current) {
          gsap.from(sectionRef.current.children, { // Animate direct children
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%', // Trigger when section top is 85% from viewport top
              toggleActions: 'play none none none', // Play once on enter
              // markers: true // for debugging section triggers
            }
          });
        }
      };

      // Apply basic fade-in to multiple sections
      animateSectionIn(ingredientsSectionRef);
      animateSectionIn(benefitsSectionRef);
      animateSectionIn(howToUseSectionRef);
      animateSectionIn(ctaSectionRef);

      // Specific Animations:

      // Ingredients Section - Parallax Image
      if (ingredientsImageRef.current) {
        gsap.to(ingredientsImageRef.current, {
          yPercent: -15, // Move image up slightly faster than scroll
          ease: 'none',
          scrollTrigger: {
            trigger: ingredientsSectionRef.current, // Trigger based on the whole section
            start: 'top bottom', // Start when section top hits viewport bottom
            end: 'bottom top', // End when section bottom hits viewport top
            scrub: true, // Link animation to scroll position
            // markers: true // for debugging parallax
          }
        });
      }

      // Benefits Section - Icon Animation (Example: Scale)
      if (benefitsSectionRef.current) {
          const icons = benefitsSectionRef.current.querySelectorAll('.benefit-icon');
          if (icons.length > 0) {
              gsap.from(icons, {
                  scale: 0.5,
                  opacity: 0,
                  duration: 0.6,
                  stagger: 0.2,
                  ease: 'back.out(1.7)',
                  scrollTrigger: {
                      trigger: benefitsSectionRef.current,
                      start: 'top 80%',
                      toggleActions: 'play none none reset', // Replay if scrolling back up
                  }
              });
          }
      }

      // How To Use - Number Reveal
       if (howToUseSectionRef.current) {
           const steps = howToUseSectionRef.current.querySelectorAll('.step-number');
           if (steps.length > 0) {
                gsap.from(steps, {
                   opacity: 0,
                   scale: 0,
                   rotation: -90,
                   duration: 0.7,
                   stagger: 0.3,
                   ease: 'back.out(1.7)',
                   scrollTrigger: {
                       trigger: howToUseSectionRef.current,
                       start: 'top 75%',
                       toggleActions: 'play none none reset',
                   }
               });
           }
       }


    }, appRef); // Scope GSAP context

    // --- Cleanup ---
    return () => ctx.revert(); // Cleanup all GSAP animations & ScrollTriggers

  }, []); // Empty dependency array

  return (
    // Added font-sans as the base body font
    <div ref={appRef} className="relative bg-shire-gold-light font-sans text-shire-green-dark min-h-[850vh] overflow-x-hidden">

      {/* Section 1: Hero (Pinned Section) */}
      <section ref={heroRef} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-shire-gold-light via-emerald-50 to-shire-green-light"> {/* Keep gradient here */}
        <div ref={heroContentWrapperRef} className="w-full flex flex-col items-center justify-center absolute top-0 left-0 h-full">
            {/* Hero Text Content - Apply fonts */}
            <div ref={heroContentRef} className="z-30 text-center relative mb-[-10vh] px-4">
                {/* Added font-serif for heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-shire-green-dark mb-6 font-serif tracking-tight">
                    Shire Elixir
                </h1>
                {/* font-sans is inherited, added leading-relaxed for better readability */}
                <p className="text-lg md:text-xl text-shire-green max-w-md mx-auto leading-relaxed">
                    Nature's essence, bottled for radiant hair. Unisex formula.
                </p>
            </div>
            {/* Bottle Container */}
            <div ref={bottleContainerRef} className="relative z-10 mt-8 grid place-items-center w-[80vw] sm:w-[60vw] md:w-[40vw] md:max-w-[350px]" style={{ height: '60vh' }}>
                <img ref={nozzleRef} src={nozzleImageUrl} alt="" className="col-start-1 row-start-1 w-full h-full object-contain z-0 will-change-transform" aria-hidden="true"/>
                <img ref={bottleRef} src={bottleImageUrl} alt="Shire Elixir hair serum bottle" className="col-start-1 row-start-1 w-full h-full object-contain z-10 will-change-transform"/>
                <img ref={dropRef} src={dropImageUrl} alt="Serum drop" className="col-start-1 row-start-1 w-full h-full object-contain z-20 opacity-0 will-change-transform"/>
            </div>
        </div>
      </section>

       {/* Section 2: Inside Drop */}
       <section ref={insideDropRef} className="absolute top-0 left-0 w-full h-screen opacity-0 pointer-events-none z-40" style={{ backgroundColor: 'rgba(232, 184, 107, 0.1)', WebkitBackdropFilter: 'blur(0px) saturate(100%)', backdropFilter: 'blur(0px) saturate(100%)', pointerEvents: 'none'}}>
           <div className="w-full h-full flex flex-col items-center justify-center text-shire-green-dark p-10 pt-[15vh]" style={{ pointerEvents: 'auto' }}>
                {/* Apply fonts */}
                <h2 className="text-4xl md:text-6xl font-bold font-serif mb-8 text-center">Inside the Elixir</h2>
                <div className="max-w-3xl space-y-6 text-lg text-center bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-lg font-sans leading-relaxed">
                    <p>Discover the potent blend of natural oils and botanical extracts that make Shire Elixir unique. Our serum penetrates deep to nourish, strengthen, and add a luminous shine.</p>
                    <p>Perfectly balanced for all hair types, Shire Elixir tames frizz, protects against environmental stressors, and promotes healthy growth, leaving your hair feeling soft, manageable, and revitalized.</p>
                    <button className="mt-6 px-8 py-3 bg-shire-green text-white rounded-full font-semibold hover:bg-shire-green-dark transition duration-300 shadow-md transform hover:scale-105">
                        Explore Ingredients
                    </button>
                </div>
           </div>
       </section>

      {/* --- New Sections Start Here --- */}

      {/* Section 3: Ingredients */}
      <section ref={ingredientsSectionRef} className="relative py-20 md:py-32 bg-white z-50 overflow-hidden"> {/* Ensure z-index is higher than hero */}
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Content Column */}
            <div className="prose lg:prose-lg max-w-none font-sans">
                 <h2 className="font-serif text-3xl md:text-4xl font-bold text-shire-green-dark mb-6">Pure Botanical Power</h2>
                 <p className="leading-relaxed text-gray-600 mb-8">
                     We meticulously source the finest natural ingredients, known for their hair-enhancing properties. Experience the synergy of nature and science.
                 </p>
                 <ul className="space-y-3 text-gray-700">
                     {/* Add stagger animation target */}
                     <li className="flex items-center"><LeafIcon /> <strong>Argan Oil:</strong> Deeply moisturizes and adds shine.</li>
                     <li className="flex items-center"><LeafIcon /> <strong>Jojoba Seed Oil:</strong> Mimics natural sebum, balances scalp.</li>
                     <li className="flex items-center"><LeafIcon /> <strong>Rosemary Extract:</strong> Stimulates follicles, promotes growth.</li>
                     <li className="flex items-center"><LeafIcon /> <strong>Vitamin E:</strong> Powerful antioxidant, protects hair.</li>
                 </ul>
            </div>
             {/* Image Column with Parallax */}
             <div className="relative h-80 md:h-full min-h-[400px] overflow-hidden rounded-lg shadow-xl">
                 <img
                     ref={ingredientsImageRef}
                     src={ingredientsImageUrl}
                     alt="Botanical ingredients"
                     className="absolute inset-0 w-full h-full object-cover object-center"
                     // style={{ height: '130%' }} // Start slightly taller for parallax range
                 />
                 {/* Optional overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-shire-green/20 to-transparent"></div>
            </div>
        </div>
      </section>

      {/* Section 4: Benefits */}
      <section ref={benefitsSectionRef} className="py-20 md:py-32 bg-shire-green-light/20 z-50 relative">
        <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-shire-green-dark mb-4">Unlock Radiant Hair</h2>
            <p className="text-lg text-shire-green mb-12 max-w-2xl mx-auto leading-relaxed">
                Shire Elixir works harmoniously to transform your hair from within.
            </p>
            <div className="grid md:grid-cols-3 gap-10">
                {/* Benefit 1 */}
                <div className="bg-white p-8 rounded-lg shadow-md text-center benefit-icon">
                    <ShineIcon />
                    <h3 className="font-serif text-xl font-semibold text-shire-green-dark mt-4 mb-2">Luminous Shine</h3>
                    <p className="text-gray-600 font-sans text-sm leading-relaxed">Enhances natural gloss without greasy residue.</p>
                </div>
                 {/* Benefit 2 */}
                <div className="bg-white p-8 rounded-lg shadow-md text-center benefit-icon">
                    <LeafIcon />
                    <h3 className="font-serif text-xl font-semibold text-shire-green-dark mt-4 mb-2">Deep Nourishment</h3>
                    <p className="text-gray-600 font-sans text-sm leading-relaxed">Penetrates strands to repair and strengthen.</p>
                </div>
                 {/* Benefit 3 */}
                 <div className="bg-white p-8 rounded-lg shadow-md text-center benefit-icon">
                    <ShieldIcon />
                    <h3 className="font-serif text-xl font-semibold text-shire-green-dark mt-4 mb-2">Frizz Control & Protection</h3>
                    <p className="text-gray-600 font-sans text-sm leading-relaxed">Tames flyaways and guards against damage.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Section 5: How to Use */}
      <section ref={howToUseSectionRef} className="py-20 md:py-32 bg-white z-50 relative">
         <div className="container mx-auto px-6 text-center">
             <h2 className="font-serif text-3xl md:text-4xl font-bold text-shire-green-dark mb-12">Simple Ritual, Lasting Results</h2>
             <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                 {/* Step 1 */}
                 <div className="text-center">
                     <div className="step-number bg-shire-gold text-shire-green-dark w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold font-serif mx-auto mb-4 shadow-md">1</div>
                     <h3 className="font-serif text-lg font-semibold mb-2">Dispense</h3>
                     <p className="text-gray-600 text-sm leading-relaxed">Apply 2-4 drops onto your palm (adjust for hair length/thickness).</p>
                 </div>
                 {/* Step 2 */}
                  <div className="text-center">
                     <div className="step-number bg-shire-gold text-shire-green-dark w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold font-serif mx-auto mb-4 shadow-md">2</div>
                     <h3 className="font-serif text-lg font-semibold mb-2">Warm & Apply</h3>
                     <p className="text-gray-600 text-sm leading-relaxed">Rub hands together, then gently work through damp or dry hair, focusing on mid-lengths and ends.</p>
                 </div>
                 {/* Step 3 */}
                 <div className="text-center">
                     <div className="step-number bg-shire-gold text-shire-green-dark w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold font-serif mx-auto mb-4 shadow-md">3</div>
                     <h3 className="font-serif text-lg font-semibold mb-2">Style</h3>
                     <p className="text-gray-600 text-sm leading-relaxed">Style as usual. Can be used daily or as needed for extra nourishment.</p>
                 </div>
             </div>
         </div>
      </section>

       {/* Section 6: Call to Action / Lifestyle */}
       <section ref={ctaSectionRef} className="relative py-24 md:py-40 bg-shire-green z-50 text-center overflow-hidden">
           {/* Background Image with Parallax */}
            <img
                src={hairLifestyleImageUrl}
                alt="Healthy vibrant hair"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
                style={{ transform: 'translateY(-10%)' }} // Initial position for parallax
                data-speed="0.8" // Example speed for a simple parallax library if used, or control with GSAP
            />
            <div className="relative z-10 container mx-auto px-6">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Experience the Elixir</h2>
                <p className="text-lg text-shire-gold-light mb-10 max-w-xl mx-auto leading-relaxed">
                    Ready to embrace naturally beautiful, healthy hair?
                </p>
                <button className="px-10 py-4 bg-shire-gold text-shire-green-dark rounded-full font-bold text-lg hover:bg-shire-gold-dark transition duration-300 shadow-lg transform hover:scale-105">
                    Shop Shire Elixir Now
                </button>
            </div>
        </section>

        {/* Footer Placeholder */}
        <footer className="py-12 bg-shire-green-dark text-shire-gold-light/70 text-center text-sm z-50 relative">
            <div className="container mx-auto px-6">
                © {new Date().getFullYear()} Shire Elixir. All Rights Reserved. | Placeholder Footer Links
            </div>
        </footer>

    </div> // End App Container
  );
}

export default App;