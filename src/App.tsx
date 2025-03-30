// src/App.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Internal Component Definitions ---

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  useRef?: React.RefObject<HTMLElement>;
  bgElement?: React.ReactNode; // Optional background element for layering
}

// Section with optional background element slot
const Section: React.FC<SectionProps> = ({ children, className = '', id, useRef: sectionRef, bgElement }) => {
  return (
    <section ref={sectionRef} id={id} className={`py-28 md:py-40 overflow-hidden relative ${className}`}>
      {bgElement && <div className="absolute inset-0 z-0">{bgElement}</div>}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
};

interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: 'square' | 'video' | 'custom' | 'portrait' | 'landscape' | 'cinematic'; // Added cinematic
  className?: string;
  heightClass?: string;
}

// More refined placeholder
const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label,
  aspectRatio = 'video',
  className = '',
  heightClass = 'h-[500px]', // Taller default for custom
}) => {
  let aspectClass = '';
  if (aspectRatio === 'square') aspectClass = 'aspect-square';
  if (aspectRatio === 'video') aspectClass = 'aspect-[16/9]';
  if (aspectRatio === 'portrait') aspectClass = 'aspect-[9/16]'; // Taller portrait
  if (aspectRatio === 'landscape') aspectClass = 'aspect-[3/2]'; // Common landscape
  if (aspectRatio === 'cinematic') aspectClass = 'aspect-[21/9]'; // Wider cinematic


  return (
    // Using a subtle gradient and maybe a border that appears on load/hover
    <div
      className={`img-placeholder bg-gradient-to-bl from-slate-200 via-slate-100 to-slate-200/70 backdrop-blur-sm border border-transparent flex items-center justify-center text-slate-500 rounded-lg overflow-hidden ${aspectRatio === 'custom' ? heightClass : aspectClass} ${className}`}
    >
      <span className="text-center p-6 text-base md:text-lg font-light tracking-wide opacity-70">{label}</span>
    </div>
  );
};

interface FeatureItemProps {
    iconPlaceholder: React.ReactNode;
    title: string;
    description: string;
    number: string; // Feature number for styling
}

// Feature Item redesigned with number and more style
const FeatureItem: React.FC<FeatureItemProps> = ({ iconPlaceholder, title, description, number }) => (
    <div className="feature-item relative pl-16 md:pl-20 group"> {/* Left padding for number */}
        <span className="absolute left-0 top-0 font-serif text-6xl md:text-7xl text-brand-primary-light/80 group-hover:text-brand-primary/30 transition-colors duration-300 -z-10">{number}</span>
        <div className="relative z-10 mb-4 inline-block">
             <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-primary-light text-brand-primary text-2xl md:text-3xl transition-all duration-400 ease-out group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white shadow-sm group-hover:shadow-md">
                {iconPlaceholder}
            </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-3 text-brand-text transition-colors duration-300 group-hover:text-brand-primary">{title}</h3>
        <p className="text-brand-text-light leading-relaxed text-base md:text-lg">{description}</p>
    </div>
);

interface TestimonialCardProps {
    quote: string;
    author: string;
    title: string;
    imageLabel: string;
    className?: string;
}

// Testimonial Card - more luxurious feel
const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, title, imageLabel, className }) => (
    <div className={`testimonial-card bg-gradient-to-br from-white via-slate-50 to-white p-8 md:p-10 rounded-xl shadow-premium border border-slate-200/70 relative overflow-hidden transition-all duration-300 hover:shadow-premium-lg hover:border-slate-300 ${className}`}>
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-brand-primary-light/50 rounded-bl-full opacity-50 -z-0"></div>
        <div className="relative z-10">
             <p className="text-brand-text font-serif italic text-xl md:text-2xl mb-6 leading-snug">"{quote}"</p>
             <div className="flex items-center">
                 <div className="w-16 h-16 mr-5 rounded-full bg-gradient-to-tr from-slate-300 to-slate-400 flex items-center justify-center text-base font-semibold text-white shadow-lg shrink-0 border-2 border-white">
                     {imageLabel}
                </div>
                 <div>
                     <p className="font-semibold text-brand-text text-lg tracking-wide">{author}</p>
                     <p className="text-sm text-brand-secondary font-medium uppercase tracking-widest">{title}</p>
                 </div>
             </div>
        </div>
    </div>
);


// --- Main App Component ---

const App: React.FC = () => {
  const appContainerRef = useRef<HTMLDivElement>(null);
  // Refs
  const heroRef = useRef<HTMLElement>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const heroImageWrapperRef = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLElement>(null);
  const alchemySectionRef = useRef<HTMLElement>(null);
  const alchemyImageRef = useRef<HTMLDivElement>(null);
  const alchemyContentRef = useRef<HTMLDivElement>(null);
  const storiesSectionRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // GSAP Animations Setup
    const ctx = gsap.context(() => {

      // --- Navbar Fade In ---
       if (navRef.current) {
           gsap.from(navRef.current, {
               y: -100,
               opacity: 0,
               duration: 0.8,
               delay: 0.5, // Let hero start first slightly
               ease: 'power3.out'
           });
       }

      // --- Hero Animation ---
      if (heroRef.current && heroHeadlineRef.current && heroImageWrapperRef.current) {
        // Simulate SplitText for headline reveal (character level would need SplitText plugin)
        // We'll animate lines/words here for simplicity without external plugins
        const heroTl = gsap.timeline({ delay: 0.1 });
        heroTl
          .from(heroHeadlineRef.current.querySelectorAll('.hero-line span'), { // Target spans inside lines
            yPercent: 105,
            opacity: 0,
            rotationZ: 5,
            stagger: 0.1,
            duration: 1.0,
            ease: 'power4.out',
          })
          .from(heroRef.current.querySelector('.hero-subline'), {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
          }, "-=0.7")
          .from(heroRef.current.querySelector('.hero-cta'), {
            opacity: 0,
            scale: 0.8,
            duration: 1.0,
            ease: 'elastic.out(1, 0.7)',
          }, "-=0.6")
          .from(heroImageWrapperRef.current, {
            opacity: 0,
            scale: 0.95,
            yPercent: 10,
            filter: 'blur(10px)', // Start blurred
            duration: 1.2,
            ease: 'power3.out',
          }, 0.4); // Start image reveal slightly later

          // Parallax for Hero Image
          gsap.to(heroImageWrapperRef.current.querySelector('.img-placeholder'), { // Target the placeholder inside
              yPercent: -20,
              ease: "none",
              scrollTrigger: {
                  trigger: heroRef.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1.5 // Slower, smoother scrub
              }
          });
      }

      // --- Features Section Animation (Reveal with offset) ---
      if (featuresSectionRef.current) {
        featuresSectionRef.current.querySelectorAll('.feature-item').forEach((item, index) => {
          gsap.from(item, {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50, // Alternate direction
            y: 50,
            scale: 0.98,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              // toggleActions: 'play none none reverse',
            },
          });
        });
         // Animate the decorative lines if they exist
         gsap.from(featuresSectionRef.current.querySelectorAll('.feature-divider'), {
            scaleX: 0,
            duration: 1.0,
            ease: 'power3.out',
            stagger: 0.2,
             scrollTrigger: {
              trigger: featuresSectionRef.current.querySelector('.features-grid'), // Trigger based on grid
              start: 'top 80%',
            },
         })
      }

      // --- Alchemy Section Animation (More layered reveal) ---
      if (alchemySectionRef.current && alchemyImageRef.current && alchemyContentRef.current) {
         const alchemyTl = gsap.timeline({
             scrollTrigger: {
                trigger: alchemySectionRef.current,
                start: 'top 65%',
                // toggleActions: 'play none none reverse',
             }
         });
         alchemyTl
            // Animate background shapes first (subtly)
            .from(alchemySectionRef.current.querySelectorAll('.alchemy-bg-shape'), {
                opacity: 0,
                scale: 0.8,
                rotate: (index) => index * 15,
                stagger: 0.1,
                duration: 1.0,
                ease: 'power2.out',
            })
            // Reveal image with a simulated mask effect (using clip-path or just scale/opacity)
            .from(alchemyImageRef.current, {
                opacity: 0,
                scale: 1.05, // Start slightly larger
                // clipPath: 'inset(0 100% 0 0)', // Reveal from left (needs vendor prefixes or careful testing)
                duration: 1.2,
                ease: 'power4.out',
            }, "-=0.7") // Overlap slightly with bg shapes
            .from(alchemyContentRef.current.querySelectorAll('.alchemy-text-animate'), {
                opacity: 0,
                y: 40,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.15,
            }, "-=0.8"); // Overlap more significantly

             // Parallax for the content moving slightly faster than scroll
             gsap.to(alchemyContentRef.current, {
                yPercent: -5, // Less intense parallax
                ease: "none",
                scrollTrigger: {
                    trigger: alchemySectionRef.current,
                    start: "top center",
                    end: "bottom center+=100", // Extend end point slightly
                    scrub: 1.5
                }
           });
      }

      // --- Stories Section Animation (Subtle 3D perspective shift) ---
      if (storiesSectionRef.current) {
         // Set perspective on the parent container for 3D effect
         gsap.set(storiesSectionRef.current.querySelector('.stories-grid'), { perspective: 1000 });

         gsap.from(storiesSectionRef.current.querySelectorAll('.testimonial-card'), {
           opacity: 0,
           scale: 0.95,
           rotationY: (index) => (index % 2 === 0 ? -30 : 30), // Tilt effect
           y: 60,
           duration: 1.0,
           ease: 'power3.out',
           stagger: {
              amount: 0.6,
              from: 'center' // Animate from center outwards
           },
           scrollTrigger: {
             trigger: storiesSectionRef.current.querySelector('.stories-grid'),
             start: 'top 80%',
             // toggleActions: 'play none none reverse',
           },
         });
      }

      // --- CTA Section Animation (More dramatic reveal) ---
       if (ctaSectionRef.current) {
         const ctaTl = gsap.timeline({
            scrollTrigger: {
                trigger: ctaSectionRef.current,
                start: 'top 75%', // Trigger slightly later
            }
         });
         ctaTl
            .from(ctaSectionRef.current.querySelector('.cta-bg-element'), { // Animate background element first
                opacity: 0,
                scale: 0.7,
                rotate: -20,
                duration: 1.5,
                ease: 'power3.out'
            })
            .from(ctaSectionRef.current.querySelectorAll('.cta-animate'), {
                opacity: 0,
                y: 60,
                scale: 0.98,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.2,
            }, "-=1.0"); // Overlap significantly with bg animation

         // Enhanced Button Hover (Can be done with CSS too, but GSAP allows more control if needed)
         const ctaButton = ctaSectionRef.current.querySelector('.cta-button');
         if (ctaButton) {
            const hoverTl = gsap.timeline({ paused: true });
            hoverTl.to(ctaButton, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
                   .to(ctaButton.querySelector('.cta-button-bg'), { scale: 1.1, opacity: 0.7, duration: 0.4, ease: 'power2.out'}, 0); // Subtle bg pulse

            ctaButton.addEventListener('mouseenter', () => hoverTl.play());
            ctaButton.addEventListener('mouseleave', () => hoverTl.reverse());
         }
       }

       // Image Placeholder Reveal Animation (Simple fade/border)
        gsap.utils.toArray('.img-placeholder').forEach((img: Element) => {
           gsap.from(img, {
               opacity: 0.7,
               // scale: 1.02, // Optional slight scale-in
               // filter: 'brightness(0.9)', // Optional subtle brightness effect
               borderWidth: '2px', // Animate border width if desired
               borderColor: 'rgba(203, 213, 225, 0.5)', // Slate 300 with opacity
               duration: 1.0,
               ease: 'power2.out',
               scrollTrigger: {
                   trigger: img,
                   start: 'top 90%',
               }
           })
        });


    }, appContainerRef); // Scope animations

    // Cleanup
    return () => ctx.revert();

  }, []);

  // Helper to wrap text lines/words in spans for animation
  const wrapLines = (text: string, className: string) => {
    return text.split('<br/>').map((line, lineIndex) => (
      <span key={lineIndex} className={`${className} block overflow-hidden`}>
        <span className="inline-block"> {/* Inner span for transform */}
          {line}
        </span>
      </span>
    ));
  };


  return (
    <div ref={appContainerRef} className="font-sans bg-brand-bg text-brand-text relative isolate antialiased overflow-x-hidden"> {/* Added overflow-x-hidden */}
      {/* --- Navbar --- */}
      <nav ref={navRef} className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-[100] border-b border-slate-200/60"> {/* Increased z-index */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 h-20 md:h-24 flex justify-between items-center">
          <a href="#" aria-label="Shire Elixir Home" className="text-3xl md:text-4xl font-serif font-bold text-brand-primary hover:text-brand-primary-dark transition-colors duration-300">
            Shire Elixir
          </a>
          <div className="hidden md:flex space-x-10 lg:space-x-12 items-center">
             <a href="#features" className="nav-link">Essence</a>
             <a href="#ingredients" className="nav-link">Alchemy</a>
             <a href="#testimonials" className="nav-link">Stories</a>
             <a href="#shop" className="bg-brand-secondary hover:bg-brand-secondary-dark text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base tracking-wide">
               Acquire
             </a>
          </div>
           <div className="md:hidden">
             <button aria-label="Open Menu" className="text-brand-text focus:outline-none p-2 -mr-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"></path></svg>
             </button>
          </div>
        </div>
      </nav>
        {/* Quick Nav Link Styling using @apply (Add to index.css or keep here if truly single file) */}
        <style>{`
            .nav-link { @apply text-brand-text-light hover:text-brand-primary transition duration-300 font-medium text-base tracking-wide relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-brand-primary after:transition-all after:duration-300 hover:after:w-full; }
        `}</style>

      {/* --- Hero Section --- */}
      <section ref={heroRef} id="home" className="relative overflow-hidden bg-gradient-to-br from-emerald-50/30 via-white to-emerald-100/20 pt-28 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40">
          {/* Subtle background elements */}
           <div className="absolute inset-0 -z-10 opacity-30">
               <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-brand-primary-light/50 rounded-full filter blur-3xl animate-pulse-slow"></div>
               <div className="absolute bottom-1/4 right-1/4 w-56 h-56 md:w-80 md:h-80 bg-brand-secondary/30 rounded-full filter blur-3xl animation-delay-2000 animate-pulse-slow"></div>
           </div>
             {/* Add keyframes for pulse-slow if not using Tailwind defaults */}
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.05); }
                }
                .animate-pulse-slow { animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
            `}</style>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              {/* Text Content */}
              <div className="text-center md:text-left">
                <h1 ref={heroHeadlineRef} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-extrabold mb-6 md:mb-8 !leading-tight text-brand-text"> {/* Use !important if needed */}
                    {/* Wrap lines/words for animation */}
                    {wrapLines("Luminous Hair.<br/>Pure Alchemy.", "hero-line")}
                </h1>
                <p className="hero-subline text-lg md:text-xl lg:text-2xl text-brand-text-light mb-10 md:mb-12 leading-relaxed max-w-lg mx-auto md:mx-0">
                    Experience the transformative essence of Shire Elixir. Nature refined for unparalleled radiance and strength.
                </p>
                <div className="hero-cta">
                    <a
                    href="#shop"
                    className="inline-block bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-4 px-12 md:py-5 md:px-16 rounded-full text-lg md:text-xl transition duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1.5"
                    >
                    Begin Your Ritual
                    </a>
                </div>
              </div>
              {/* Image Content - Overlapping slightly on larger screens */}
              <div ref={heroImageWrapperRef} className="relative flex justify-center md:justify-start lg:-mr-16 xl:-mr-24">
                 <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl transform md:rotate-2">
                    <ImagePlaceholder
                        label="Shire Elixir Bottle - Evocative, soft-focus shot"
                        aspectRatio="portrait" // Changed to portrait
                        className="shadow-premium-lg"
                    />
                 </div>
              </div>
            </div>
          </div>
      </section>


      {/* --- Features/Essence Section --- */}
      <Section id="features" className="bg-brand-bg-alt" useRef={featuresSectionRef}>
         <div className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-brand-text">
                The Essence Within
            </h2>
             <p className="text-xl md:text-2xl text-brand-text-light leading-relaxed mb-8">
                Three pillars define the Shire Elixir experience, crafted for transformative results.
            </p>
             {/* Decorative Element */}
             <div className="inline-block w-3 h-3 bg-brand-secondary rounded-full"></div>
             <div className="inline-block w-16 h-[2px] bg-brand-secondary/50 mx-3 align-middle"></div>
             <div className="inline-block w-3 h-3 bg-brand-secondary rounded-full"></div>
         </div>
         {/* Using a slightly different grid/layout */}
         <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-20 items-start">
            <FeatureItem
                number="01"
                iconPlaceholder={'🌿'}
                title="Pure Botanicals"
                description="Harnessing potent Argan, Rosemary & Biotin for deep nourishment."
            />
             {/* Optional decorative divider */}
             <div className="hidden md:block feature-divider h-full w-[1px] bg-gradient-to-b from-transparent via-slate-300 to-transparent justify-self-center"></div>
            <FeatureItem
                number="02"
                iconPlaceholder={'✨'}
                title="Silken Radiance"
                description="Unlocking unparalleled shine and smoothness, taming frizz naturally."
            />
             {/* Optional decorative divider */}
             <div className="hidden md:block feature-divider h-full w-[1px] bg-gradient-to-b from-transparent via-slate-300 to-transparent justify-self-center"></div>
             <FeatureItem
                 number="03"
                 iconPlaceholder={'💧'}
                 title="Weightless Luxury"
                 description="Absorbs instantly for daily indulgence without residue."
            />
         </div>
      </Section>

      {/* --- Alchemy/Ingredients Section --- */}
      <Section id="ingredients" className="bg-white" useRef={alchemySectionRef} bgElement={
          // More complex background shapes
          <>
             <div className="alchemy-bg-shape absolute top-10 left-[-5%] w-64 h-64 bg-brand-primary-light/30 rounded-full blur-3xl opacity-70 transform -rotate-12"></div>
             <div className="alchemy-bg-shape absolute bottom-10 right-[-5%] w-80 h-80 bg-brand-secondary/20 rounded-2xl blur-3xl opacity-60 transform rotate-12"></div>
             <div className="alchemy-bg-shape absolute top-1/2 left-[45%] w-40 h-40 border-2 border-dashed border-brand-primary/20 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
          </>
      }>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Image on the right this time */}
            <div ref={alchemyContentRef} className="order-2 lg:order-1 text-center lg:text-left">
                 <h2 className="alchemy-text-animate text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 text-brand-text">
                    The Alchemist's Art
                </h2>
                <p className="alchemy-text-animate text-xl md:text-2xl text-brand-text-light mb-10 leading-relaxed">
                    A precise symphony of nature's finest, amplified by science for profound hair vitality.
                </p>
                <ul className="alchemy-text-animate text-left space-y-6 mb-12 text-lg">
                    <li className="flex items-start group">
                        <span className="text-brand-primary text-3xl mr-5 mt-0 font-serif italic transition-transform duration-300 group-hover:translate-x-1">•</span>
                        <div><span className="font-semibold text-brand-text block tracking-wide">Moroccan Argan Oil:</span> <span className="text-brand-text-light">Deep hydration, luminous shine catalyst.</span></div>
                    </li>
                     <li className="flex items-start group">
                        <span className="text-brand-primary text-3xl mr-5 mt-0 font-serif italic transition-transform duration-300 group-hover:translate-x-1">•</span>
                        <div><span className="font-semibold text-brand-text block tracking-wide">Fortifying Complex:</span> <span className="text-brand-text-light">Biotin & Keratin rebuild strength from within.</span></div>
                     </li>
                     <li className="flex items-start group">
                        <span className="text-brand-primary text-3xl mr-5 mt-0 font-serif italic transition-transform duration-300 group-hover:translate-x-1">•</span>
                         <div><span className="font-semibold text-brand-text block tracking-wide">Herbal Infusion:</span> <span className="text-brand-text-light">Lavender & Rosemary invigorate scalp health.</span></div>
                     </li>
                </ul>
                <div className="alchemy-text-animate">
                    <a href="#" className="inline-flex items-center text-brand-primary hover:text-brand-primary-dark font-semibold group text-xl tracking-wide">
                        Explore the Formula
                        <svg className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </div>
             {/* Image */}
             <div ref={alchemyImageRef} className="order-1 lg:order-2 relative">
                 <div className="relative transform lg:scale-110 lg:translate-x-8"> {/* Scale up image slightly */}
                    <ImagePlaceholder
                        label="Abstract render of swirling golden elixir with botanical fragments"
                        aspectRatio="square" // Changed to square
                        className="shadow-premium-lg rounded-xl"
                    />
                 </div>
             </div>
        </div>
      </Section>

      {/* --- Stories/Testimonials Section --- */}
      <Section id="testimonials" className="bg-gradient-to-b from-emerald-50/20 via-brand-bg-alt to-brand-bg" useRef={storiesSectionRef}>
         <div className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
             <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-brand-text">
                Woven into Stories
             </h2>
             <p className="text-xl md:text-2xl text-brand-text-light leading-relaxed mb-8">
                Real experiences, shared by those who embrace the Elixir ritual.
            </p>
             <div className="inline-block w-3 h-3 bg-brand-primary rounded-full"></div>
             <div className="inline-block w-16 h-[2px] bg-brand-primary/50 mx-3 align-middle"></div>
             <div className="inline-block w-3 h-3 bg-brand-primary rounded-full"></div>
         </div>
         {/* Grid for testimonials */}
         <div className="stories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-stretch"> {/* Use items-stretch */}
            <TestimonialCard
                className="lg:transform lg:-rotate-1" // Slight tilt
                quote="Life-changing. My dry, brittle hair is completely transformed. Soft, shiny, manageable... I'm obsessed."
                author="Isabelle Moreau"
                title="Elixir Devotee"
                imageLabel="IM"
            />
            <TestimonialCard
                className="lg:transform lg:scale-[1.03] lg:z-10" // Slightly larger & forward
                quote="As a professional, I seek results. Shire Elixir delivers. Clients adore the immediate difference in texture and shine."
                author="Kenji Tanaka"
                title="Lead Stylist"
                imageLabel="KT"
            />
             <TestimonialCard
                 className="lg:transform lg:rotate-1" // Opposite tilt
                quote="Finally! A natural serum that works wonders on fine hair without weighing it down. The scent is divine too."
                author="Ava Sinclair"
                title="Grateful Customer"
                imageLabel="AS"
            />
         </div>
      </Section>

       {/* --- Call to Action (Shop) Section --- */}
      <Section id="shop" className="bg-brand-text text-white text-center relative !py-32 md:!py-48" useRef={ctaSectionRef}>
         {/* More dramatic background */}
         <div className="cta-bg-element absolute inset-0 z-0 overflow-hidden">
            {/* Simulating swirling lights/energy */}
            <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 bg-gradient-radial from-emerald-600/50 via-brand-primary/30 to-transparent opacity-70 animate-spin-slow"></div>
                <div className="absolute inset-10 bg-gradient-radial from-brand-secondary/30 via-amber-600/10 to-transparent opacity-50 animate-spin-slower animation-delay-1000"></div>
            </div>
         </div>
         <style>{`
            @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .animate-spin-slow { animation: spin-slow 25s linear infinite; }
            @keyframes spin-slower { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
            .animate-spin-slower { animation: spin-slower 35s linear infinite; }
         `}</style>

         <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="cta-animate text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 !leading-tight">
              Embrace Your Hair's<br/> True Radiance.
            </h2>
            <p className="cta-animate text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              The ritual awaits. Step into a world of luminous, resilient hair with Shire Elixir.
            </p>
            <div className="cta-animate">
                <a
                    href="#shop-link"
                    className="cta-button inline-block relative bg-brand-secondary text-brand-primary-dark font-bold py-5 px-16 rounded-full text-lg md:text-xl transition duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1.5 overflow-hidden group"
                >
                  {/* Background element for hover effect */}
                  <span className="cta-button-bg absolute inset-0 bg-white/30 scale-0 opacity-0 rounded-full transition-all duration-400 ease-out group-hover:scale-100 group-hover:opacity-100"></span>
                  <span className="relative z-10 tracking-wider">Acquire Your Elixir</span>
                </a>
            </div>
         </div>
      </Section>


      {/* --- Footer --- */}
      <footer className="bg-brand-text text-brand-bg/80 py-20 border-t-4 border-brand-primary/40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-10">
                 {/* Column 1: Brand & Tagline */}
                 <div className="lg:col-span-2 text-center md:text-left">
                    <p className="font-serif text-4xl font-bold text-white mb-5">Shire Elixir</p>
                    <p className="text-lg text-brand-bg/70 leading-relaxed max-w-md mx-auto md:mx-0 italic mb-6">"Where nature's purity meets hair's potential."</p>
                    <p className="text-xs text-brand-bg/50">© {new Date().getFullYear()} Shire Elixir Alchemists. Crafted with Intention.</p>
                </div>
                 {/* Column 2: Explore */}
                 <div className="text-center md:text-left">
                     <h5 className="font-semibold text-white mb-5 uppercase tracking-widest text-sm">Explore</h5>
                     <ul className="space-y-3 text-base">
                         <li><a href="#features" className="footer-link">Essence</a></li>
                         <li><a href="#ingredients" className="footer-link">Alchemy</a></li>
                         <li><a href="#testimonials" className="footer-link">Stories</a></li>
                         <li><a href="#shop" className="footer-link">Acquire</a></li>
                     </ul>
                </div>
                 {/* Column 3: Connect & Legal */}
                 <div className="text-center md:text-left">
                     <h5 className="font-semibold text-white mb-5 uppercase tracking-widest text-sm">Connect</h5>
                     <div className="flex justify-center md:justify-start space-x-6 mb-6">
                         <a href="#" aria-label="Instagram" className="footer-icon">[IG]</a>
                         <a href="#" aria-label="Pinterest" className="footer-icon">[PIN]</a>
                         <a href="#" aria-label="Facebook" className="footer-icon">[FB]</a>
                     </div>
                     <h5 className="font-semibold text-white mb-3 uppercase tracking-widest text-sm mt-4">Legal</h5>
                     <ul className="space-y-2 text-xs">
                          <li><a href="#privacy" className="hover:text-white transition duration-300 text-brand-bg/60">Privacy</a></li>
                          <li><a href="#terms" className="hover:text-white transition duration-300 text-brand-bg/60">Terms</a></li>
                     </ul>
                </div>
            </div>
        </div>
         {/* Footer Link Styling */}
         <style>{`
            .footer-link { @apply text-brand-bg/70 hover:text-white transition duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-brand-secondary after:transition-all after:duration-300 hover:after:w-4/5; }
            .footer-icon { @apply text-brand-bg/70 hover:text-white hover:scale-110 transition-all duration-300 text-2xl; }
         `}</style>
      </footer>
    </div>
  );
};

export default App;