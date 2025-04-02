// @ts-nocheck

import React, { useRef, useLayoutEffect, useEffect } from "react";
import "./index.css"; // Assuming this contains the necessary CSS variables and base styles
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Icons (Using existing and Molecule Icon) ---
const LeafIcon = ({
  className = "w-6 h-6",
  colorVar = "--color-shire-green",
}: {
  className?: string;
  colorVar?: string;
}) => (
  <svg
    className={className}
    style={{ color: `var(${colorVar})` }}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />{" "}
  </svg>
);
const ShineIcon = ({
  className = "w-6 h-6",
  colorVar = "--color-shire-green",
}: {
  className?: string;
  colorVar?: string;
}) => (
  <svg
    className={className}
    style={{ color: `var(${colorVar})` }}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />{" "}
  </svg>
);
// --- Updated Shield Icon to represent Research/Science/Precision (Beaker/Flask) ---
const ScienceIcon = ({ // Renamed from ShieldIcon for clarity
  className = "w-6 h-6",
  colorVar = "--color-shire-green",
}: {
  className?: string;
  colorVar?: string;
}) => (
  <svg
    className={className}
    style={{ color: `var(${colorVar})` }}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
  </svg>
);

// --- Molecule Icon (Kept as requested) ---
const MoleculeIcon = ({
  className = "w-6 h-6",
  colorVar = "--color-shire-green",
}: {
  className?: string;
  colorVar?: string;
}) => (
  <svg
    className={className}
    style={{ color: `var(${colorVar})` }}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.418a.563.563 0 01.372.94l-4.386 3.176a.563.563 0 00-.182.557l1.636 5.038a.563.563 0 01-.812.622l-4.47-3.131a.563.563 0 00-.65 0l-4.47 3.13a.563.563 0 01-.812-.622l1.636-5.038a.563.563 0 00-.182-.557l-4.386-3.176a.563.563 0 01.372-.94h5.418a.563.563 0 00.475-.31l2.125-5.11z" // Keeping this simpler atom/star representation
    ></path>
  </svg>
);

// --- GitHub Icon ---
const GithubIcon = ({
  className = "w-6 h-6",
  colorVar = "--color-charcoal", // Default color for icon
}: {
  className?: string;
  colorVar?: string;
}) => (
  <svg
    className={className}
    style={{ color: `var(${colorVar})` }}
    fill="currentColor" // GitHub icon usually uses fill
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);


gsap.registerPlugin(ScrollTrigger);

// --- Image Paths (Unchanged) ---
const bottleImageUrl = "/serum_bottle.png";
const nozzleImageUrl = "/nozzle.png";
const dropImageUrl = "/drop.png";
const ingredientsImageUrl =
  "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  // --- Refs (Unchanged) ---
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentWrapperRef = useRef<HTMLDivElement>(null);
  const bottleContainerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const nozzleRef = useRef<HTMLImageElement>(null);
  const dropRef = useRef<HTMLImageElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const insideDropRef = useRef<HTMLDivElement>(null);
  const insideDropContentRef = useRef<HTMLDivElement>(null);
  const ingredientsSectionRef = useRef<HTMLDivElement>(null);
  const ingredientsContentRef = useRef<HTMLDivElement>(null);
  const ingredientsImageRef = useRef<HTMLImageElement>(null);
  const ingredientsListRef = useRef<HTMLUListElement>(null);
  const bubblesCanvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const benefitsSectionRef = useRef<HTMLDivElement>(null);
  const howToUseSectionRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // --- GSAP Animations (Unchanged Logic) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Animation
      if (heroTitleRef.current && heroSubtitleRef.current) {
        gsap.from([heroTitleRef.current, heroSubtitleRef.current], {
          opacity: 0, y: 30, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5,
        });
      }
      // Hero Drop & Section 2 Reveal Animation
      if (
        heroRef.current && insideDropRef.current && insideDropContentRef.current &&
        heroContentWrapperRef.current && heroTitleRef.current && heroSubtitleRef.current &&
        bottleContainerRef.current && bottleRef.current && nozzleRef.current && dropRef.current
      ) {
        const dropVisualCenterOrigin = "50% 11%"; const maskStartSize = 5; const maskEndSize = 120;
        const nozzlePressDistance = 8; const viewportCenterY = window.innerHeight / 2;
        const dropImageTopToDropVisualTopOffset = 55; const pageScrollDistance = window.innerHeight * 0.8;
        const zoomCounterXPercent = -(50 - parseFloat(dropVisualCenterOrigin.split(" ")[0]));
        const zoomCounterYPercent = -(50 - parseFloat(dropVisualCenterOrigin.split(" ")[1]));
        const finalZoomScale = 250; const bottleContainerTop = bottleContainerRef.current?.offsetTop ?? 0;
        const dropVisualStartY = bottleContainerTop + dropImageTopToDropVisualTopOffset;
        const dropFallToCenterDistance = viewportCenterY - dropVisualStartY;

        gsap.set(dropRef.current, { transformOrigin: dropVisualCenterOrigin, opacity: 0, y: 0, scale: 1 });
        gsap.set(insideDropRef.current, { opacity: 0, "--mask-reveal-percent": `${maskStartSize}%` });
        gsap.set(heroContentWrapperRef.current, { y: 0 });

        const heroTl = gsap.timeline({
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=4000", scrub: 1.5, pin: true, anticipatePin: 1 },
        });
        heroTl
          .to(nozzleRef.current, { y: `+=${nozzlePressDistance}px`, duration: 0.2, ease: "power1.inOut" }, ">")
          .to(nozzleRef.current, { y: `-=${nozzlePressDistance}px`, duration: 0.3, ease: "power1.inOut" }, ">0.1")
          .to(dropRef.current, { opacity: 1, duration: 0.2 }, "<")
          .addLabel("dropFalling")
          .to(dropRef.current, { y: `+=${dropFallToCenterDistance}px`, duration: 1.0, ease: "power1.in" }, "dropFalling")
          .addLabel("dropCentered", ">")
          .to(heroContentWrapperRef.current, { y: `-=${pageScrollDistance}px`, duration: 1.5, ease: "none" }, "dropCentered")
          .to(dropRef.current, { y: `+=${pageScrollDistance}px`, duration: 1.5, ease: "none" }, "dropCentered")
          .addLabel("startZoom", "dropCentered+=0.5")
          .to([heroTitleRef.current, heroSubtitleRef.current, bottleRef.current, nozzleRef.current], { opacity: 0, duration: 0.5, ease: "power1.out" }, "startZoom")
          .to(dropRef.current, { scale: finalZoomScale, xPercent: zoomCounterXPercent, yPercent: zoomCounterYPercent, duration: 1.0, ease: "power2.in" }, "startZoom")
          .to(dropRef.current, { opacity: 0, duration: 0.3 }, ">-0.3")
          .to(insideDropRef.current, { opacity: 1, "--mask-reveal-percent": `${maskEndSize}%`, duration: 1.5, ease: "power1.inOut" }, "startZoom+=0.4");
      } else { console.error("Refs missing for Hero/Section 2 setup"); }

      // Section 3 Content Animations
      if (ingredientsSectionRef.current && ingredientsContentRef.current && ingredientsImageRef.current) {
        gsap.from(ingredientsContentRef.current, {
          opacity: 0, y: 100, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ingredientsSectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        });
        gsap.from(ingredientsImageRef.current, {
          opacity: 0, x: -100, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ingredientsSectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        });
        if (ingredientsListRef.current) {
          gsap.from(ingredientsListRef.current.children, {
            opacity: 0, x: -30, duration: 0.6, stagger: 0.2, ease: "power2.out",
            scrollTrigger: { trigger: ingredientsListRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          });
        }
      } else { console.error("Refs missing for Section 3 content animations"); }

      // Gradually Fade Out Section 2 Content as Section 3 Scrolls In
      if (insideDropContentRef.current && ingredientsSectionRef.current) {
        gsap.to(insideDropContentRef.current, {
          opacity: 0, ease: "none",
          scrollTrigger: { trigger: ingredientsSectionRef.current, start: "top bottom", end: "top top", scrub: 1 },
        });
      } else { console.error("Refs missing for Section 2 content fade out animation"); }

      // Sections 4+ Animations
      const animateSectionIn = (sectionRef: React.RefObject<HTMLElement>, start = "top 85%") => {
        if (sectionRef.current) {
          const target = sectionRef.current.querySelector(':scope > div:not([class*="absolute"])') || sectionRef.current.children[0] || sectionRef.current;
          if (target) {
            gsap.set(target, { willChange: "transform, opacity" });
            gsap.from(target, {
              opacity: 0, y: 60, duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current, start: start, toggleActions: "play none none reverse",
                onLeaveBack: () => gsap.set(target, { clearProps: "willChange" }),
                onLeave: () => gsap.set(target, { clearProps: "willChange" }),
              },
            });
          }
        }
      };
      animateSectionIn(benefitsSectionRef);
      animateSectionIn(howToUseSectionRef);
      animateSectionIn(ctaSectionRef);

      // Footer Animation
      if (footerRef.current) {
        const footerContent = footerRef.current.children[0];
        if (footerContent) {
          gsap.set(footerContent, { willChange: "transform, opacity" });
          gsap.from(footerContent, {
            opacity: 0, y: 30, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current, start: "top 95%", toggleActions: "play none none none",
              onComplete: () => gsap.set(footerContent, { clearProps: "willChange" }),
            },
          });
        }
      }
    }, appRef);
    return () => ctx.revert();
  }, []);

  // --- Canvas Bubble Animation Effect (Unchanged Logic) ---
  useEffect(() => {
    const canvas = bubblesCanvasRef.current; if (!canvas) return;
    const context = canvas.getContext("2d"); if (!context) return;
    canvasContextRef.current = context; const particles = 60;
    const minRadius = 4; const maxRadius = 18; const speedIncrement = 0.005;
    const bubbleColor = { h: 199, s: 28, l: 74 }; const baseAlpha = 0.5;

    const initBubbles = (width: number, height: number) => {
      bubblesRef.current = []; const particleWidth = width / particles;
      for (let i = 0; i < particles; i++) {
        bubblesRef.current.push({
          x: i * particleWidth + Math.random() * particleWidth,
          y: height + Math.random() * height * 0.5,
          r: minRadius + Math.random() * (maxRadius - minRadius),
          speed: 0.5 + Math.random() * 2,
          initialY: height + Math.random() * height * 0.5,
        });
      }
    };
    const drawBubbleFrame = () => {
      const ctx = canvasContextRef.current; const canvasEl = bubblesCanvasRef.current;
      const bubbles = bubblesRef.current; const { width, height } = dimensionsRef.current;
      if (!ctx || !canvasEl || !bubbles || width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i]; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        const fadeInPoint = height * 0.9; const fadeOutPoint = height * 0.1;
        let alphaFactor = 1.0;
        if (b.y > fadeInPoint) { alphaFactor = 1.0 - (b.y - fadeInPoint) / (height * 0.1); }
        else if (b.y < fadeOutPoint) { alphaFactor = b.y / fadeOutPoint; }
        const alpha = Math.max(0, Math.min(baseAlpha, baseAlpha * alphaFactor));
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = `hsla(${bubbleColor.h}, ${bubbleColor.s}%, ${bubbleColor.l}%, ${alpha})`; ctx.fill();
        b.speed += speedIncrement; b.y -= b.speed;
        if (b.y + b.r < 0) {
          b.y = b.initialY; b.x = Math.random() * width; b.speed = 0.5 + Math.random() * 2;
        }
      }
    };
    const animate = () => { drawBubbleFrame(); animationFrameRef.current = requestAnimationFrame(animate); };
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      const section = ingredientsSectionRef.current; const canvasEl = bubblesCanvasRef.current;
      if (!section || !canvasEl) return;
      const newWidth = section.offsetWidth; const newHeight = section.offsetHeight;
      if (newWidth > 0 && newHeight > 0) {
        dimensionsRef.current = { width: newWidth, height: newHeight };
        canvasEl.width = newWidth; canvasEl.height = newHeight; initBubbles(newWidth, newHeight);
        if (!animationFrameRef.current) { animate(); } else { drawBubbleFrame(); }
      }
    };
    const debouncedHandleResize = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(handleResize, 100); };
    handleResize(); window.addEventListener("resize", debouncedHandleResize);
    return () => {
      if (animationFrameRef.current) { cancelAnimationFrame(animationFrameRef.current); animationFrameRef.current = null; }
      window.removeEventListener("resize", debouncedHandleResize);
      bubblesRef.current = []; canvasContextRef.current = null; clearTimeout(resizeTimeout);
    };
  }, []);

  // --- JSX Structure ---
  return (
    <div ref={appRef} className="relative w-full">
      {/* Section 1: Hero (Updated Content) */}
      <section
        ref={heroRef}
        className={`h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-water-blue-light)] to-[var(--color-water-blue)]`}
      >
        <div
          ref={heroContentWrapperRef}
          className="w-full flex flex-col items-center justify-center absolute top-0 left-0 h-full"
        >
          <div className="z-30 text-center relative mb-[-10vh] px-4 will-change-transform">
            <h1
              ref={heroTitleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--color-shire-green-dark)] mb-4 tracking-tight font-serif"
            >
              Shire Elixir
            </h1>
            <p
              ref={heroSubtitleRef}
              className="text-lg md:text-xl text-[var(--color-shire-green)] max-w-lg mx-auto leading-relaxed font-sans" // Slightly wider max-w
            >
              {/* UPDATED Subtitle */}
              Radically transparent, science-backed hair wellness. Formulated for all, open to all.
            </p>
          </div>
          {/* Bottle images remain the same */}
          <div
            ref={bottleContainerRef}
            className="relative z-10 mt-8 grid place-items-center w-[80vw] sm:w-[60vw] md:w-[40vw] md:max-w-[350px]"
            style={{ height: "60vh" }}
          >
            <img ref={nozzleRef} src={nozzleImageUrl} alt="" className="col-start-1 row-start-1 w-full h-full object-contain z-0 will-change-transform" aria-hidden="true"/>
            <img ref={bottleRef} src={bottleImageUrl} alt="Shire Elixir hair serum bottle" className="col-start-1 row-start-1 w-full h-full object-contain z-10 will-change-transform drop-shadow-lg"/>
            <img ref={dropRef} src={dropImageUrl} alt="Shire Elixir serum drop" className="col-start-1 row-start-1 w-full h-full object-contain opacity-0 will-change-transform z-20 pointer-events-none"/>
          </div>
        </div>
      </section>

      {/* Section 2: Inside Drop Content (Updated Content) */}
      <section
        ref={insideDropRef}
        className={`fixed inset-0 w-full h-screen opacity-0 z-10 bg-[var(--color-water-blue)] pointer-events-auto flex flex-col items-center justify-center radial-mask will-change-opacity`}
      >
        <div
          ref={insideDropContentRef}
          className="relative z-0 text-[var(--color-charcoal)] px-4 md:px-8 max-w-4xl w-full will-change-opacity flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-10 text-center text-[var(--color-shire-green-dark)] font-serif">
            The Science of Shire
          </h2>

          <div className="w-full bg-[var(--color-cream)]/80 backdrop-blur-lg p-6 md:p-10 rounded-xl shadow-2xl text-center max-w-3xl">
             {/* UPDATED Paragraph */}
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-[var(--color-charcoal)] font-sans">
              Shire Elixir is born from a commitment to open research and scientific precision. We believe in effective, honest hair care, transparently developed for universal benefit.
            </p>

            {/* UPDATED Feature Grid - reflecting USP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
              {/* Feature 1: Open Research */}
              <div className="flex flex-col items-center">
                 <GithubIcon className="w-10 h-10 mb-3" colorVar="--color-shire-green-dark" />
                <h3 className="text-lg font-semibold mb-2 text-[var(--color-shire-green-dark)] font-sans">
                  Open Research
                </h3>
                <p className="text-sm text-[var(--color-charcoal)]/90 font-sans leading-relaxed">
                  Our formulas, ingredient sourcing, and test results are fully documented and publicly available.
                </p>
              </div>
              {/* Feature 2: Science-Backed */}
              <div className="flex flex-col items-center">
                <ScienceIcon className="w-10 h-10 mb-3" colorVar="--color-shire-green-dark" />
                <h3 className="text-lg font-semibold mb-2 text-[var(--color-shire-green-dark)] font-sans">
                  Precision Formulated
                </h3>
                <p className="text-sm text-[var(--color-charcoal)]/90 font-sans leading-relaxed">
                   Leveraging scientific data for optimal ingredient synergy, concentration, and hair health.
                </p>
              </div>
              {/* Feature 3: Unisex Design */}
              <div className="flex flex-col items-center">
                 <LeafIcon className="w-10 h-10 mb-3" colorVar="--color-shire-green-dark" /> {/* Kept Leaf for 'Natural' aspect of Universal */}
                <h3 className="text-lg font-semibold mb-2 text-[var(--color-shire-green-dark)] font-sans">
                  Universally Effective
                </h3>
                <p className="text-sm text-[var(--color-charcoal)]/90 font-sans leading-relaxed">
                   Designed for all hair types and textures, promoting fundamental hair health for everyone.
                </p>
              </div>
            </div>

            <p className="text-base italic text-[var(--color-charcoal)]/70 mb-8 font-sans">
              Explore the meticulously chosen ingredients that power Shire Elixir.
            </p>

            {/* Button can remain, or link to ingredients section/GitHub */}
            {/* Example: Link to Ingredients Section (requires setting up scroll-to functionality) */}
            <button
              onClick={() => ingredientsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-2 px-8 py-3 bg-[var(--color-shire-green)] text-[var(--color-white)] rounded-full font-semibold font-sans hover:bg-[var(--color-shire-green-dark)] transition duration-300 ease-in-out shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-shire-green)]">
              See The Ingredients
            </button>
             {/* Or a link to GitHub */}
             {/* <a href="YOUR_GITHUB_LINK_HERE" target="_blank" rel="noopener noreferrer" className="...">Explore Research</a> */}
          </div>
        </div>
      </section>

      {/* Section 3: Ingredients (Updated Content to emphasize USP) */}
      <section
        ref={ingredientsSectionRef}
        className={`relative w-full py-24 md:py-36 z-20 overflow-hidden`}
      >
        {/* Canvas Background (Unchanged) */}
        <canvas ref={bubblesCanvasRef} id="bubbles" className="absolute inset-0 w-full h-full -z-10 bg-[var(--color-water-blue)] vertical-linear-mask" width="1000" height="800" style={{ "--fade-height": "200px" }}></canvas>
        {/* Ingredients Content (UPDATED) */}
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center relative z-0">
          <div
            ref={ingredientsContentRef}
            className={`max-w-none will-change-transform will-change-opacity text-[var(--color-charcoal)] font-sans`}
          >
             {/* UPDATED Title */}
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-shire-green-dark)] font-serif`}
            >
              Transparently Sourced, Scientifically Chosen
            </h2>
             {/* UPDATED Paragraph - Emphasizing USP */}
            <p className="mb-6 text-lg leading-relaxed">
              We believe in full transparency. Every ingredient in Shire Elixir is selected based on rigorous scientific research for its efficacy and safety. Our formulation process, ingredient rationale, dilution accuracy, and testing data are meticulously logged and openly shared.
            </p>
             {/* UPDATED GitHub Link/Mention */}
             <div className="mb-6 p-4 bg-[var(--color-cream)] rounded-lg border border-[var(--color-shire-green)]/30 inline-block">
                <p className="text-base flex items-center">
                    <GithubIcon className="w-5 h-5 mr-2 flex-shrink-0" colorVar="--color-shire-green-dark" />
                    <span>
                        Explore our complete research, formulation logs, and testing data on our public{' '}
                        <a
                          href="YOUR_GITHUB_REPOSITORY_LINK_HERE" // <-- **** REPLACE WITH YOUR ACTUAL GITHUB LINK ****
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[var(--color-shire-green-dark)] underline hover:text-[var(--color-shire-green)] transition-colors duration-200"
                        >
                          GitHub repository
                        </a>.
                    </span>
                </p>
             </div>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-[var(--color-shire-green-dark)] font-sans">Key Active Ingredients:</h3>
            {/* Ingredient List - Wording potentially refined slightly */}
            <ul
              ref={ingredientsListRef}
              className="list-none p-0 mt-2 space-y-4"
            >
              <li className="flex items-start text-base">
                <LeafIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" colorVar="--color-shire-green-dark" />
                <span>
                  <strong className="font-semibold text-[var(--color-shire-green-dark)]">
                    Argan Oil:
                  </strong>{" "}
                  Chosen for its proven high Vitamin E and fatty acid content, promoting deep hydration and structural repair.
                </span>
              </li>
              <li className="flex items-start text-base">
                <ShineIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" colorVar="--color-shire-green-dark" />
                <span>
                  <strong className="font-semibold text-[var(--color-shire-green-dark)]">
                    Jojoba Oil:
                  </strong>{" "}
                  Selected for its molecular similarity to natural sebum, ensuring balanced scalp conditioning and lightweight shine.
                </span>
              </li>
              <li className="flex items-start text-base">
                 <MoleculeIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" colorVar="--color-shire-green-dark"/> {/* Using Molecule for 'alternative' */}
                <span>
                  <strong className="font-semibold text-[var(--color-shire-green-dark)]">
                    Broccoli Seed Oil:
                  </strong>{" "}
                  Included as a researched natural alternative to silicones, providing smoothing and gloss effects via fatty acid profile.
                </span>
              </li>
              <li className="flex items-start text-base">
                 <ScienceIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" colorVar="--color-shire-green-dark"/> {/* Using Science for 'extract' */}
                <span>
                  <strong className="font-semibold text-[var(--color-shire-green-dark)]">
                    Rosemary Extract (Standardized):
                  </strong>{" "}
                  Utilized for its documented scalp-stimulating properties and antioxidant benefits.
                </span>
              </li>
            </ul>
            <p className="mt-8 text-base italic text-[var(--color-charcoal)] opacity-80">
              Precisely formulated. Free from harsh chemicals, parabens, silicones, and sulfates. Vegan & Cruelty-Free. See GitHub for full ingredient list and concentrations.
            </p>
          </div>
          {/* Image remains the same */}
          <div className="mt-10 md:mt-0">
            <img ref={ingredientsImageRef} src={ingredientsImageUrl} alt="Natural ingredients like avocados, herbs, and oils spread on a surface" className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[500px] will-change-transform will-change-opacity"/>
          </div>
        </div>
      </section>

       {/* Section 4: Benefits (Content largely unchanged, icons updated) */}
      <section
        ref={benefitsSectionRef}
        className={`relative w-full py-24 md:py-36 bg-gradient-to-br from-[var(--color-water-blue-light)] via-[var(--color-water-blue)] to-[var(--color-water-blue-dark)] z-20 text-[var(--color-water-blue-dark)] top-linear-mask`}
        style={{ "--fade-height": "200px" }}
      >
        <div className="container mx-auto px-6 text-center relative">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-16 font-serif text-[var(--color-shire-green-dark)]`}
          >
            Experience the Proven Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Benefit Card 1 */}
            <div className="bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-md transition duration-300 ease-in-out hover:bg-white/95 hover:shadow-xl transform hover:-translate-y-2">
              <LeafIcon // Kept Leaf for Nourishment
                className="w-10 h-10 inline-block mb-4"
                colorVar="--color-water-blue-dark"
              />
              <h3 className="text-xl font-semibold mt-2 mb-3 text-[var(--color-water-blue-dark)] font-sans">
                Deep Nourishment
              </h3>
              <p className="text-base text-[var(--color-charcoal)] font-sans">
                Penetrates hair strands to moisturize and strengthen from
                within, reducing breakage.
              </p>
            </div>
             {/* Benefit Card 2 */}
            <div className="bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-md transition duration-300 ease-in-out hover:bg-white/95 hover:shadow-xl transform hover:-translate-y-2">
              <ShineIcon
                className="w-10 h-10 inline-block mb-4"
                colorVar="--color-water-blue-dark"
              />
              <h3 className="text-xl font-semibold mt-2 mb-3 text-[var(--color-water-blue-dark)] font-sans">
                Healthy Radiance
              </h3>
              <p className="text-base text-[var(--color-charcoal)] font-sans">
                Leaves hair looking glossy and vibrant without artificial coatings or greasy residue.
              </p>
            </div>
             {/* Benefit Card 3 */}
            <div className="bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-md transition duration-300 ease-in-out hover:bg-white/95 hover:shadow-xl transform hover:-translate-y-2">
               <MoleculeIcon // Using Molecule for Smoothness/Control
                className="w-10 h-10 inline-block mb-4"
                colorVar="--color-water-blue-dark"
              />
              <h3 className="text-xl font-semibold mt-2 mb-3 text-[var(--color-water-blue-dark)] font-sans">
                Manageability & Smoothness
              </h3>
              <p className="text-base text-[var(--color-charcoal)] font-sans">
                Tames flyaways and enhances the natural texture for effortlessly smooth, manageable hair.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: How To Use (Unchanged) */}
      <section
        ref={howToUseSectionRef}
        className="relative w-full py-24 md:py-36 bg-[var(--color-cream)] z-20"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-[var(--color-shire-green-dark)] font-serif">
            Simple Steps to Healthier Hair
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 text-center">
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold text-[var(--color-shire-green)] block mb-4 font-serif">1</span>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shire-green-dark)] font-sans">Dispense</h3>
              <p className="text-base leading-relaxed text-[var(--color-charcoal)] font-sans">
                Apply 1-3 drops into palm. Warm elixir between hands. Adjust amount based on hair length/density (refer to usage notes on GitHub for precision).
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold text-[var(--color-shire-green)] block mb-4 font-serif">2</span>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shire-green-dark)] font-sans">Apply</h3>
              <p className="text-base leading-relaxed text-[var(--color-charcoal)] font-sans">
                Gently work through damp or dry hair, focusing mid-lengths to ends. Can be used on scalp depending on individual needs (see research notes).
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold text-[var(--color-shire-green)] block mb-4 font-serif">3</span>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shire-green-dark)] font-sans">Style</h3>
              <p className="text-base leading-relaxed text-[var(--color-charcoal)] font-sans">
                Style as usual. Effective as a pre-styling treatment, finishing serum, or overnight deep conditioner. Versatility backed by formulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA (Updated Content) */}
      <section
        ref={ctaSectionRef}
        className="relative w-full py-28 md:py-44 bg-[var(--color-shire-green)] z-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-shire-green)] via-[var(--color-shire-green-dark)] to-[#1a2b1d] opacity-30 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
           {/* UPDATED Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-white)] font-serif">
            Choose Transparent Hair Wellness
          </h2>
           {/* UPDATED Paragraph */}
          <p className="text-lg md:text-xl text-[var(--color-shire-gold-light)] max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            Invest in hair care built on science and openness. Experience the Shire Elixir difference – effective, honest, and accessible to all.
          </p>
          {/* Button text could be updated slightly if desired, e.g., "Shop Transparently" */}
          <button className="px-10 py-4 bg-[var(--color-white)] text-[var(--color-shire-green)] rounded-full font-bold text-lg font-sans hover:bg-[var(--color-shire-gold-light)] hover:text-[var(--color-shire-green-dark)] transition duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-shire-green)] focus:ring-[var(--color-white)]">
            Shop Shire Elixir
          </button>
        </div>
      </section>

      {/* Footer (Updated Content - Added GitHub Link) */}
      <footer
        ref={footerRef}
        className="relative w-full py-12 bg-[var(--color-shire-green-dark)] text-[var(--color-shire-gold-light)] text-opacity-80 text-sm z-20 font-sans"
      >
        <div className="px-6 text-center">
          <p className="font-semibold text-base mb-2 text-[var(--color-shire-gold-light)] text-opacity-100">
            Shire Elixir
          </p>
          <p className="mb-2">
            © {new Date().getFullYear()} Shire Botanicals (or Your Company Name). All rights reserved.
          </p>
          <p className="mb-3 italic">
            Inspired by Nature, Proven by Science, Open by Design.
          </p>
           {/* ADDED GitHub Link */}
           <a
              href="YOUR_GITHUB_REPOSITORY_LINK_HERE" // <-- **** REPLACE WITH YOUR ACTUAL GITHUB LINK ****
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[var(--color-shire-gold-light)] hover:text-[var(--color-white)] transition-colors duration-200 text-opacity-90 hover:text-opacity-100"
              title="Explore our research on GitHub"
            >
                <GithubIcon className="w-4 h-4 mr-1.5" />
                <span>View Open Research</span>
            </a>
        </div>
      </footer>
    </div>
  );
}

export default App;