import React, { useRef, useLayoutEffect, useEffect } from "react";
import "./index.css"; // Import updated global styles with variables
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Icons (Unchanged) ---
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
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />{" "}
  </svg>
);
const ShieldIcon = ({
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
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />{" "}
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
  // --- Refs (Remove sec2BackgroundOverlayRef) ---
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
  // const sec2BackgroundOverlayRef = useRef<HTMLDivElement>(null); // REMOVED
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

  // --- GSAP Animations (Remove sec2BackgroundOverlayRef logic) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Hero Text Animation ---
      if (heroTitleRef.current && heroSubtitleRef.current) {
        gsap.from([heroTitleRef.current, heroSubtitleRef.current], {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
        });
      }
      // --- Hero Drop & Section 2 Reveal Animation ---
      if (
        heroRef.current &&
        insideDropRef.current &&
        insideDropContentRef.current &&
        // sec2BackgroundOverlayRef.current && // REMOVED Check
        heroContentWrapperRef.current &&
        heroTitleRef.current &&
        heroSubtitleRef.current &&
        bottleContainerRef.current &&
        bottleRef.current &&
        nozzleRef.current &&
        dropRef.current
      ) {
        const dropVisualCenterOrigin = "50% 11%";
        const maskStartSize = 5;
        const maskEndSize = 120;
        const nozzlePressDistance = 8;
        const viewportCenterY = window.innerHeight / 2;
        const dropImageTopToDropVisualTopOffset = 55;
        const pageScrollDistance = window.innerHeight * 0.8;
        const zoomCounterXPercent = -(
          50 - parseFloat(dropVisualCenterOrigin.split(" ")[0])
        );
        const zoomCounterYPercent = -(
          50 - parseFloat(dropVisualCenterOrigin.split(" ")[1])
        );
        const finalZoomScale = 250;
        const bottleContainerTop = bottleContainerRef.current?.offsetTop ?? 0;
        const dropVisualStartY =
          bottleContainerTop + dropImageTopToDropVisualTopOffset;
        const dropFallToCenterDistance = viewportCenterY - dropVisualStartY;

        gsap.set(dropRef.current, {
          transformOrigin: dropVisualCenterOrigin,
          opacity: 0,
          y: 0,
          scale: 1,
        });
        gsap.set(insideDropRef.current, {
          opacity: 0,
          "--mask-reveal-percent": `${maskStartSize}%`,
        });
        // gsap.set(sec2BackgroundOverlayRef.current, { opacity: 0 }); // REMOVED
        gsap.set(heroContentWrapperRef.current, { y: 0 });

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=4000",
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
          },
        });
        // ... (Rest of Hero Timeline remains the same)
        heroTl
          .to(
            nozzleRef.current,
            {
              y: `+=${nozzlePressDistance}px`,
              duration: 0.2,
              ease: "power1.inOut",
            },
            ">"
          )
          .to(
            nozzleRef.current,
            {
              y: `-=${nozzlePressDistance}px`,
              duration: 0.3,
              ease: "power1.inOut",
            },
            ">0.1"
          )
          .to(dropRef.current, { opacity: 1, duration: 0.2 }, "<")
          .addLabel("dropFalling")
          .to(
            dropRef.current,
            {
              y: `+=${dropFallToCenterDistance}px`,
              duration: 1.0,
              ease: "power1.in",
            },
            "dropFalling"
          )
          .addLabel("dropCentered", ">")
          .to(
            heroContentWrapperRef.current,
            { y: `-=${pageScrollDistance}px`, duration: 1.5, ease: "none" },
            "dropCentered"
          )
          .to(
            dropRef.current,
            { y: `+=${pageScrollDistance}px`, duration: 1.5, ease: "none" },
            "dropCentered"
          )
          .addLabel("startZoom", "dropCentered+=0.5")
          .to(
            [
              heroTitleRef.current,
              heroSubtitleRef.current,
              bottleRef.current,
              nozzleRef.current,
            ],
            { opacity: 0, duration: 0.5, ease: "power1.out" },
            "startZoom"
          )
          .to(
            dropRef.current,
            {
              scale: finalZoomScale,
              xPercent: zoomCounterXPercent,
              yPercent: zoomCounterYPercent,
              duration: 1.0,
              ease: "power2.in",
            },
            "startZoom"
          )
          .to(dropRef.current, { opacity: 0, duration: 0.3 }, ">-0.3")
          .to(
            insideDropRef.current,
            {
              opacity: 1,
              "--mask-reveal-percent": `${maskEndSize}%`,
              duration: 1.5,
              ease: "power1.inOut",
            },
            "startZoom+=0.4"
          );
      } else {
        // Updated error message
        console.error(
          "Refs missing for Hero/Section 2 setup (ensure insideDropRef, heroContentWrapperRef, heroTitleRef, etc. are present)"
        );
      }

      // --- Section 3 Content Animations (Unchanged) ---
      if (
        ingredientsSectionRef.current &&
        ingredientsContentRef.current &&
        ingredientsImageRef.current
      ) {
        // ... (Section 3 content animation logic remains identical) ...
        gsap.from(ingredientsContentRef.current, {
          opacity: 0,
          y: 100,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ingredientsSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.from(ingredientsImageRef.current, {
          opacity: 0,
          x: -100,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ingredientsSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
        if (ingredientsListRef.current) {
          gsap.from(ingredientsListRef.current.children, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ingredientsListRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      } else {
        console.error("Refs missing for Section 3 content animations");
      }

      // --- REMOVED Fade In Section 3 BG Overlay ---
      // The ScrollTrigger for sec2BackgroundOverlayRef is removed as the element is gone.

      // --- Gradually Fade Out Section 2 Content as Section 3 Scrolls In (Unchanged) ---
      if (insideDropContentRef.current && ingredientsSectionRef.current) {
        const sec2ContentElement = insideDropContentRef.current;
        gsap.to(sec2ContentElement, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ingredientsSectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        });
      } else {
        console.error("Refs missing for Section 2 content fade out animation");
      }

      // --- Sections 4+ Animations (Unchanged) ---
      // ... (Sections 4+ animation logic remains identical) ...
      const animateSectionIn = (
        sectionRef: React.RefObject<HTMLElement>,
        start = "top 85%"
      ) => {
        /* ... same logic ... */
        if (sectionRef.current) {
          const target =
            sectionRef.current.querySelector(
              ':scope > div:not([class*="absolute"])'
            ) ||
            sectionRef.current.children[0] ||
            sectionRef.current;
          if (target) {
            gsap.set(target, { willChange: "transform, opacity" });
            gsap.from(target, {
              opacity: 0,
              y: 60,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: start,
                toggleActions: "play none none reverse",
                onLeaveBack: () =>
                  gsap.set(target, { clearProps: "willChange" }),
                onLeave: () => gsap.set(target, { clearProps: "willChange" }),
              },
            });
          }
        }
      };
      animateSectionIn(benefitsSectionRef);
      animateSectionIn(howToUseSectionRef);
      animateSectionIn(ctaSectionRef);

      // Footer Animation (Unchanged)
      if (footerRef.current) {
        const footerContent = footerRef.current.children[0];
        if (footerContent) {
          gsap.set(footerContent, { willChange: "transform, opacity" });
          gsap.from(footerContent, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
              onComplete: () =>
                gsap.set(footerContent, { clearProps: "willChange" }),
            },
          });
        }
      }
    }, appRef);
    return () => ctx.revert();
  }, []);

  // --- Canvas Bubble Animation Effect (Unchanged) ---
  useEffect(() => {
    // ... (Bubble animation logic remains identical) ...
    const canvas = bubblesCanvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    canvasContextRef.current = context;
    const particles = 60;
    const minRadius = 4;
    const maxRadius = 18;
    const speedIncrement = 0.005;
    const bubbleColor = { h: 199, s: 28, l: 74 }; // Lighter blue HSL
    const baseAlpha = 0.5; // Slightly higher base alpha

    const initBubbles = (width: number, height: number) => {
      /* ... same ... */
      bubblesRef.current = [];
      const particleWidth = width / particles;
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
      /* ... same ... */
      const ctx = canvasContextRef.current;
      const canvasEl = bubblesCanvasRef.current;
      const bubbles = bubblesRef.current;
      const { width, height } = dimensionsRef.current;
      if (!ctx || !canvasEl || !bubbles || width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        const fadeInPoint = height * 0.9;
        const fadeOutPoint = height * 0.1;
        let alphaFactor = 1.0;
        if (b.y > fadeInPoint) {
          alphaFactor = 1.0 - (b.y - fadeInPoint) / (height * 0.1);
        } else if (b.y < fadeOutPoint) {
          alphaFactor = b.y / fadeOutPoint;
        }
        const alpha = Math.max(0, Math.min(baseAlpha, baseAlpha * alphaFactor));
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = `hsla(${bubbleColor.h}, ${bubbleColor.s}%, ${bubbleColor.l}%, ${alpha})`;
        ctx.fill();
        b.speed += speedIncrement;
        b.y -= b.speed;
        if (b.y + b.r < 0) {
          b.y = b.initialY;
          b.x = Math.random() * width;
          b.speed = 0.5 + Math.random() * 2;
        }
      }
    };
    const animate = () => {
      /* ... same ... */
      drawBubbleFrame();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      /* ... same ... */
      const section = ingredientsSectionRef.current;
      const canvasEl = bubblesCanvasRef.current;
      if (!section || !canvasEl) return;
      const newWidth = section.offsetWidth;
      const newHeight = section.offsetHeight;
      if (newWidth > 0 && newHeight > 0) {
        dimensionsRef.current = { width: newWidth, height: newHeight };
        canvasEl.width = newWidth;
        canvasEl.height = newHeight;
        initBubbles(newWidth, newHeight);
        if (!animationFrameRef.current) {
          animate();
        } else {
          drawBubbleFrame();
        }
      }
    };
    const debouncedHandleResize = () => {
      /* ... same ... */
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    handleResize();
    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      /* ... same cleanup ... */
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      window.removeEventListener("resize", debouncedHandleResize);
      bubblesRef.current = [];
      canvasContextRef.current = null;
      clearTimeout(resizeTimeout);
    };
  }, []);

  // --- JSX Structure ---
  return (
    <div ref={appRef} className="relative w-full">
      {/* Section 1: Hero (Unchanged) */}
      <section
        ref={heroRef}
        className={`h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-water-blue-light)] to-[var(--color-water-blue)]`}
      >
        {/* ... Hero content ... */}
        <div
          ref={heroContentWrapperRef}
          className="w-full flex flex-col items-center justify-center absolute top-0 left-0 h-full"
        >
          <div className="z-30 text-center relative mb-[-10vh] px-4 will-change-transform">
            <h1
              ref={heroTitleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--color-shire-green-dark)] mb-4 tracking-tight font-serif"
            >
              {" "}
              Shire Elixir{" "}
            </h1>
            <p
              ref={heroSubtitleRef}
              className="text-lg md:text-xl text-[var(--color-shire-green)] max-w-md mx-auto leading-relaxed font-sans"
            >
              {" "}
              Nature's essence, bottled for universally radiant hair.{" "}
            </p>
          </div>
          <div
            ref={bottleContainerRef}
            className="relative z-10 mt-8 grid place-items-center w-[80vw] sm:w-[60vw] md:w-[40vw] md:max-w-[350px]"
            style={{ height: "60vh" }}
          >
            <img
              ref={nozzleRef}
              src={nozzleImageUrl}
              alt=""
              className="col-start-1 row-start-1 w-full h-full object-contain z-0 will-change-transform"
              aria-hidden="true"
            />
            <img
              ref={bottleRef}
              src={bottleImageUrl}
              alt="Shire Elixir hair serum bottle"
              className="col-start-1 row-start-1 w-full h-full object-contain z-10 will-change-transform drop-shadow-lg"
            />
            <img
              ref={dropRef}
              src={dropImageUrl}
              alt="Shire Elixir serum drop"
              className="col-start-1 row-start-1 w-full h-full object-contain opacity-0 will-change-transform z-20 pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Inside Drop Content (Fixed & Masked) */}
      <section
        ref={insideDropRef}
        // UPDATED BACKGROUND: Solid Steel Blue. Mask class applied.
        className={`fixed inset-0 w-full h-screen opacity-0 z-10 bg-[var(--color-water-blue)] pointer-events-auto flex flex-col items-center justify-center radial-mask will-change-opacity`} /* CHANGED HERE */
      >
        {/* REMOVED Background Overlay Div */}

        {/* Content wrapper (Unchanged) */}
        <div
          ref={insideDropContentRef}
          className="relative z-0 text-[var(--color-charcoal)] px-6 md:px-10 pt-[15vh] md:pt-[20vh] max-w-3xl w-full will-change-opacity"
        >
          {/* ... Inside Drop content structure (headings, text, button) remains the same ... */}
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center text-[var(--color-shire-green-dark)] font-serif">
            Inside the Elixir
          </h2>
          <div className="space-y-6 text-lg text-center bg-white/70 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-xl leading-relaxed text-[var(--color-charcoal)] font-sans">
            <p>
              {" "}
              Discover the potent blend of nature's finest oils, meticulously
              chosen for hair vitality.{" "}
            </p>
            <p>
              {" "}
              Perfectly balanced and lightweight, our unisex formula caters to
              all hair types seeking health and shine.{" "}
            </p>
            <button className="mt-6 px-8 py-3 bg-[var(--color-shire-green)] text-[var(--color-white)] rounded-full font-semibold font-sans hover:bg-[var(--color-shire-green-dark)] transition duration-300 ease-in-out shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-shire-green)]">
              Explore Ingredients
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Ingredients (Unchanged from previous step) */}
      <section
        ref={ingredientsSectionRef}
        className={`relative w-full py-24 md:py-36 z-20 overflow-hidden`}
      >
        {/* Canvas Background: Solid Steel Blue. Mask applied. */}
        <canvas
          ref={bubblesCanvasRef}
          id="bubbles"
          className="absolute inset-0 w-full h-full -z-10 bg-[var(--color-water-blue)] vertical-linear-mask"
          width="1000"
          height="800"
          style={{ "--fade-height": "200px" }}
        ></canvas>
        {/* ... Ingredients content ... */}
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center relative z-0">
          <div
            ref={ingredientsContentRef}
            className={`max-w-none will-change-transform will-change-opacity text-[var(--color-charcoal)] font-sans`}
          >
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-shire-green-dark)] font-serif`}
            >
              {" "}
              Pure & Potent Ingredients{" "}
            </h2>
            <p className="mb-6 text-lg leading-relaxed">
              {" "}
              We meticulously source nature's most effective botanicals to
              create a serum that nourishes, protects, and adds brilliance
              without compromise.{" "}
            </p>
            <ul
              ref={ingredientsListRef}
              className="list-none p-0 mt-6 space-y-4"
            >
              <li className="flex items-start text-base">
                {" "}
                <LeafIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />{" "}
                <span>
                  {" "}
                  <strong className="font-semibold text-[var(--color-shire-green-dark)]">
                    {" "}
                    Argan Oil:{" "}
                  </strong>{" "}
                  Rich in Vitamin E and fatty acids for deep hydration and
                  repair.{" "}
                </span>{" "}
              </li>
              <li className="flex items-start text-base">
                {" "}
                <ShineIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />{" "}
                <span>
                  {" "}
                  <strong className="font-semibold text-[var(--color-shire-green-dark)]">
                    {" "}
                    Jojoba Oil:{" "}
                  </strong>{" "}
                  Mimics natural sebum, balancing scalp oils and adding
                  lightweight shine.{" "}
                </span>{" "}
              </li>
              <li className="flex items-start text-base">
                {" "}
                <ShieldIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />{" "}
                <span>
                  {" "}
                  <strong className="font-semibold text-[var(--color-shire-green-dark)]">
                    {" "}
                    Broccoli Seed Oil:{" "}
                  </strong>{" "}
                  Natural alternative to silicones for smoothness and gloss.{" "}
                </span>{" "}
              </li>
              <li className="flex items-start text-base">
                {" "}
                <LeafIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />{" "}
                <span>
                  {" "}
                  <strong className="font-semibold text-[var(--color-shire-green-dark)]">
                    {" "}
                    Rosemary Extract:{" "}
                  </strong>{" "}
                  Invigorates the scalp and adds a subtle, fresh herbal note.{" "}
                </span>{" "}
              </li>
            </ul>
            <p className="mt-6 text-base italic text-[var(--color-charcoal)] opacity-80">
              {" "}
              Free from harsh chemicals, parabens, silicones, and sulfates.
              Vegan & Cruelty-Free.{" "}
            </p>
          </div>
          <div className="mt-10 md:mt-0">
            {" "}
            <img
              ref={ingredientsImageRef}
              src={ingredientsImageUrl}
              alt="Natural ingredients like avocados, herbs, and oils spread on a surface"
              className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[500px] will-change-transform will-change-opacity"
            />{" "}
          </div>
        </div>
      </section>

      {/* Section 4: Benefits (Unchanged) */}
      <section
        ref={benefitsSectionRef}
        className={`relative w-full py-24 md:py-36 bg-gradient-to-br from-[var(--color-water-blue-light)] via-[var(--color-water-blue)] to-[var(--color-water-blue-dark)] z-20 text-[var(--color-water-blue-dark)] top-linear-mask`}
        style={{ "--fade-height": "200px" }}
      >
        {/* ... Benefits content ... */}
        <div className="container mx-auto px-6 text-center relative">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-16 font-serif`}
          >
            {" "}
            Unlock Your Hair's Potential{" "}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-md transition duration-300 ease-in-out hover:bg-white/95 hover:shadow-xl transform hover:-translate-y-2">
              {" "}
              <LeafIcon
                className="w-10 h-10 inline-block mb-4"
                colorVar="--color-water-blue-dark"
              />{" "}
              <h3 className="text-xl font-semibold mt-2 mb-3 text-[var(--color-water-blue-dark)] font-sans">
                {" "}
                Deep Nourishment{" "}
              </h3>{" "}
              <p className="text-base text-[var(--color-charcoal)] font-sans">
                {" "}
                Penetrates hair strands to moisturize and strengthen from
                within, reducing breakage.{" "}
              </p>{" "}
            </div>
            <div className="bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-md transition duration-300 ease-in-out hover:bg-white/95 hover:shadow-xl transform hover:-translate-y-2">
              {" "}
              <ShineIcon
                className="w-10 h-10 inline-block mb-4"
                colorVar="--color-water-blue-dark"
              />{" "}
              <h3 className="text-xl font-semibold mt-2 mb-3 text-[var(--color-water-blue-dark)] font-sans">
                {" "}
                Radiant Shine{" "}
              </h3>{" "}
              <p className="text-base text-[var(--color-charcoal)] font-sans">
                {" "}
                Leaves hair looking glossy, healthy, and vibrant without a
                greasy residue.{" "}
              </p>{" "}
            </div>
            <div className="bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-md transition duration-300 ease-in-out hover:bg-white/95 hover:shadow-xl transform hover:-translate-y-2">
              {" "}
              <ShieldIcon
                className="w-10 h-10 inline-block mb-4"
                colorVar="--color-water-blue-dark"
              />{" "}
              <h3 className="text-xl font-semibold mt-2 mb-3 text-[var(--color-water-blue-dark)] font-sans">
                {" "}
                Frizz Control & Smoothness{" "}
              </h3>{" "}
              <p className="text-base text-[var(--color-charcoal)] font-sans">
                {" "}
                Tames flyaways and smooths the hair cuticle for effortlessly
                manageable locks.{" "}
              </p>{" "}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: How To Use (Unchanged) */}
      <section
        ref={howToUseSectionRef}
        className="relative w-full py-24 md:py-36 bg-[var(--color-cream)] z-20"
      >
        {/* ... How To Use content ... */}
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-[var(--color-shire-green-dark)] font-serif">
            {" "}
            Simple Steps to Radiant Hair{" "}
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 text-center">
            <div className="flex flex-col items-center">
              {" "}
              <span className="text-6xl font-bold text-[var(--color-shire-green)] block mb-4 font-serif">
                {" "}
                1{" "}
              </span>{" "}
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shire-green-dark)] font-sans">
                {" "}
                Dispense{" "}
              </h3>{" "}
              <p className="text-base leading-relaxed text-[var(--color-charcoal)] font-sans">
                {" "}
                Apply 1-3 drops into your palm. Warm the elixir by rubbing hands
                together. Adjust amount for hair length and density.{" "}
              </p>{" "}
            </div>
            <div className="flex flex-col items-center">
              {" "}
              <span className="text-6xl font-bold text-[var(--color-shire-green)] block mb-4 font-serif">
                {" "}
                2{" "}
              </span>{" "}
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shire-green-dark)] font-sans">
                {" "}
                Apply{" "}
              </h3>{" "}
              <p className="text-base leading-relaxed text-[var(--color-charcoal)] font-sans">
                {" "}
                Gently work through damp or dry hair, focusing on mid-lengths
                and ends where hair needs the most care. Avoid scalp if prone to
                oiliness.{" "}
              </p>{" "}
            </div>
            <div className="flex flex-col items-center">
              {" "}
              <span className="text-6xl font-bold text-[var(--color-shire-green)] block mb-4 font-serif">
                {" "}
                3{" "}
              </span>{" "}
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shire-green-dark)] font-sans">
                {" "}
                Style{" "}
              </h3>{" "}
              <p className="text-base leading-relaxed text-[var(--color-charcoal)] font-sans">
                {" "}
                Style as usual. Perfect as a pre-styling heat protectant, a
                finishing serum for shine, or an overnight treatment.{" "}
              </p>{" "}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA (Unchanged) */}
      <section
        ref={ctaSectionRef}
        className="relative w-full py-28 md:py-44 bg-[var(--color-shire-green)] z-20 text-center overflow-hidden"
      >
        {/* ... CTA content ... */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-shire-green)] via-[var(--color-shire-green-dark)] to-[#1a2b1d] opacity-30 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-white)] font-serif">
            {" "}
            Ready for Your Best Hair Ever?{" "}
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-shire-gold-light)] max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            {" "}
            Experience the transformative power of Shire Elixir. Pure
            ingredients, radiant results, naturally.{" "}
          </p>
          <button className="px-10 py-4 bg-[var(--color-white)] text-[var(--color-shire-green)] rounded-full font-bold text-lg font-sans hover:bg-[var(--color-shire-gold-light)] hover:text-[var(--color-shire-green-dark)] transition duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-shire-green)] focus:ring-[var(--color-white)]">
            {" "}
            Shop Shire Elixir Now{" "}
          </button>
        </div>
      </section>

      {/* Footer (Unchanged) */}
      <footer
        ref={footerRef}
        className="relative w-full py-12 bg-[var(--color-shire-green-dark)] text-[var(--color-shire-gold-light)] text-opacity-80 text-center text-sm z-20 font-sans"
      >
        {/* ... Footer content ... */}
        <div className="px-6">
          <p className="font-semibold text-base mb-2 text-[var(--color-shire-gold-light)] text-opacity-100">
            {" "}
            Shire Elixir{" "}
          </p>
          <p>
            {" "}
            © {new Date().getFullYear()} Shire Botanicals. All rights reserved.{" "}
          </p>
          <p className="mt-1 italic">
            {" "}
            Inspired by Nature, Crafted with Care.{" "}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
