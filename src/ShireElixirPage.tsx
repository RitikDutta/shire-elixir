// @ts-nocheck
// ShireElixirPage.tsx
import React, { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Re-use Icons (or import from a shared file if preferred) ---
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
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12l2.846.813a4.5 4.5 0 013.09 3.09L24.75 18l-.813 2.846a4.5 4.5 0 01-3.09 3.09L18.75 24l-2.846-.813a4.5 4.5 0 01-3.09-3.09L12 18.75l.813-2.846a4.5 4.5 0 013.09-3.09L18.75 12z"
    />
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
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);
const ScienceIcon = ({
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
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.418a.563.563 0 01.372.94l-4.386 3.176a.563.563 0 00-.182.557l1.636 5.038a.563.563 0 01-.812.622l-4.47-3.131a.563.563 0 00-.65 0l-4.47 3.13a.563.563 0 01-.812-.622l1.636-5.038a.563.563 0 00-.182-.557l-4.386-3.176a.563.563 0 01.372-.94h5.418a.563.563 0 00.475-.31l2.125-5.11z"
    ></path>
  </svg>
);
const GithubIcon = ({
  className = "w-6 h-6",
  colorVar = "--color-charcoal",
}: {
  className?: string;
  colorVar?: string;
}) => (
  <svg
    className={className}
    style={{ color: `var(${colorVar})` }}
    fill="currentColor"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);
const ChevronLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);
const ShoppingCartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);


// --- Image Paths (Adjust as needed) ---
const bottleImageUrl = "/serum_bottle.png"; // Reuse existing bottle image
const ingredientsImageUrl =
"https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"; // Reuse existing ingredients image
const researchImageUrl = "https://images.unsplash.com/photo-1581093450021-ae16563702f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"; // Example image for science/research section
const usageImageUrl = "https://images.unsplash.com/photo-1596496096040-e4a2a63a4e9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"; // Example image for usage section

gsap.registerPlugin(ScrollTrigger);

// Define Product Details (Replace with actual data)
const PRODUCT_NAME = "Shire Elixir";
const PRODUCT_PRICE = "$48.00"; // Example Price
const PRODUCT_SIZE = "30ml / 1 fl oz";
const GITHUB_LINK = "YOUR_GITHUB_REPOSITORY_LINK_HERE"; // **** IMPORTANT: REPLACE ****

interface ShireElixirPageProps {
  onGoBack: () => void; // Function to go back to the main landing page
}

const ShireElixirPage: React.FC<ShireElixirPageProps> = ({ onGoBack }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const detailsSectionRef = useRef<HTMLElement>(null);
  const ingredientsSectionRef = useRef<HTMLElement>(null);
  const researchSectionRef = useRef<HTMLElement>(null);
  const howToUseSectionRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // --- Page Entrance Animation ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(pageRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut"
      });

      // --- Section Stagger Animation on Scroll ---
      const sections = [
        heroSectionRef.current,
        detailsSectionRef.current,
        ingredientsSectionRef.current,
        researchSectionRef.current,
        howToUseSectionRef.current,
        ctaSectionRef.current,
        footerRef.current
      ].filter(Boolean); // Filter out null refs if any section is removed

      sections.forEach((section) => {
        if (!section) return;
        const content = section.querySelector(':scope > div:not([class*="absolute"])') || section.children[0] || section; // Target the main content div
        gsap.from(content, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%", // Start animation when section is 85% from top
            toggleActions: "play none none reverse",
          },
        });
      });

        // --- Hero Specific Animations (Example: Price Animation) ---
        gsap.from(".product-price-anim", {
            textContent: "0.00",
            duration: 1.5,
            ease: "power1.inOut",
            snap: { textContent: 0.01 }, // Snap to 2 decimal places
            delay: 0.5, // Start after page fade-in
            scrollTrigger: {
                trigger: heroSectionRef.current,
                start: "top 70%",
            }
        });
         gsap.from(".add-to-cart-anim", {
             scale: 0.8,
             opacity: 0,
             duration: 0.8,
             ease: "back.out(1.7)",
             delay: 0.8,
             scrollTrigger: {
                trigger: heroSectionRef.current,
                start: "top 70%",
            }
         })


    }, pageRef); // Scope animations to the page component

    return () => ctx.revert(); // Cleanup animations
  }, []);


  // Smooth scroll to section (optional helper)
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  return (
    <div ref={pageRef} className="relative w-full bg-[var(--color-cream)] overflow-x-hidden">
      {/* --- Back Button --- */}
      <button
          onClick={onGoBack}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-50 p-2 rounded-full bg-[var(--color-shire-green)]/80 text-[var(--color-white)] hover:bg-[var(--color-shire-green-dark)] transition-all duration-300 shadow-md backdrop-blur-sm"
          aria-label="Go back to homepage"
        >
          <ChevronLeftIcon className="w-6 h-6" />
      </button>

      {/* --- Section 1: Product Hero --- */}
      <section
        ref={heroSectionRef}
        className="relative min-h-screen flex items-center justify-center pt-20 pb-10 md:pt-24 md:pb-16 lg:pb-20 bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-water-blue-light)]/30 to-[var(--color-water-blue)]/50 overflow-hidden"
      >
          {/* Optional Subtle Background Elements */}
          <div className="absolute inset-0 opacity-20 mix-blend-multiply">
              {/* Add subtle texture or gradient if desired */}
          </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative z-10">
          {/* Product Image Column */}
          <div className="flex justify-center items-center md:order-2">
             <img
                src={bottleImageUrl} // Use the same bottle image
                alt={`${PRODUCT_NAME} bottle`}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Product Details Column */}
          <div className="text-center md:text-left md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-shire-green-dark)] mb-3 lg:mb-4 font-serif tracking-tight">
              {PRODUCT_NAME}
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-shire-green)] mb-4 font-sans">
              Radically Transparent Hair Wellness.
            </p>
            <p className="text-base text-[var(--color-charcoal)]/90 mb-6 lg:mb-8 font-sans max-w-md mx-auto md:mx-0">
                Experience the difference of science-backed, openly researched hair care. Naturally derived, precisely formulated for universal benefit.
            </p>

            <div className="mb-6 lg:mb-8">
              <span className="text-3xl md:text-4xl font-bold text-[var(--color-shire-green-dark)] font-serif product-price-anim">
                {PRODUCT_PRICE}
              </span>
              <span className="text-sm text-[var(--color-charcoal)]/70 ml-2">
                {PRODUCT_SIZE}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button className="add-to-cart-anim inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-[var(--color-shire-green)] text-[var(--color-white)] rounded-full font-bold text-base md:text-lg font-sans hover:bg-[var(--color-shire-green-dark)] transition duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-cream)] focus:ring-[var(--color-shire-green)]">
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Add to Cart
            </button>

             {/* Learn More Links (Scroll to sections) */}
             <div className="mt-8 text-sm font-sans">
                <a onClick={() => scrollToSection(ingredientsSectionRef)} className="text-[var(--color-shire-green)] hover:text-[var(--color-shire-green-dark)] underline cursor-pointer mr-4 transition-colors">Key Ingredients</a>
                <a onClick={() => scrollToSection(researchSectionRef)} className="text-[var(--color-shire-green)] hover:text-[var(--color-shire-green-dark)] underline cursor-pointer transition-colors">Our Research</a>
             </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: The Shire Difference (Brief USP) --- */}
      <section ref={detailsSectionRef} className="py-16 md:py-24 bg-[var(--color-white)]">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[var(--color-shire-green-dark)] font-serif">
                Built on Transparency & Science
            </h2>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
                 {/* Feature 1: Open Research */}
                 <div className="flex flex-col items-center p-6 bg-[var(--color-cream)]/50 rounded-lg transition duration-300 hover:shadow-md">
                    <GithubIcon className="w-10 h-10 mb-4" colorVar="--color-shire-green-dark" />
                    <h3 className="text-xl font-semibold mb-2 text-[var(--color-shire-green-dark)] font-sans">
                        Open Research
                    </h3>
                    <p className="text-sm text-[var(--color-charcoal)]/90 font-sans leading-relaxed">
                        Full access to our formulation, sourcing, and testing data. Verify our claims.
                    </p>
                    <a
                        href={GITHUB_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-sm font-semibold text-[var(--color-shire-green)] hover:text-[var(--color-shire-green-dark)] transition-colors duration-200"
                    >
                        Explore GitHub →
                    </a>
                </div>
                {/* Feature 2: Science-Backed */}
                <div className="flex flex-col items-center p-6 bg-[var(--color-cream)]/50 rounded-lg transition duration-300 hover:shadow-md">
                    <ScienceIcon className="w-10 h-10 mb-4" colorVar="--color-shire-green-dark" />
                    <h3 className="text-xl font-semibold mb-2 text-[var(--color-shire-green-dark)] font-sans">
                        Precision Formulated
                    </h3>
                    <p className="text-sm text-[var(--color-charcoal)]/90 font-sans leading-relaxed">
                        Leveraging scientific data for optimal ingredient synergy, concentration, and hair health.
                    </p>
                </div>
                {/* Feature 3: Universally Effective */}
                <div className="flex flex-col items-center p-6 bg-[var(--color-cream)]/50 rounded-lg transition duration-300 hover:shadow-md">
                    <LeafIcon className="w-10 h-10 mb-4" colorVar="--color-shire-green-dark" />
                    <h3 className="text-xl font-semibold mb-2 text-[var(--color-shire-green-dark)] font-sans">
                        Universally Effective
                    </h3>
                    <p className="text-sm text-[var(--color-charcoal)]/90 font-sans leading-relaxed">
                        Designed for all hair types and textures, promoting fundamental hair wellness.
                    </p>
                </div>
            </div>
         </div>
      </section>

      {/* --- Section 3: Inside the Elixir (Ingredients Deep Dive) --- */}
      <section
        ref={ingredientsSectionRef}
        className="py-20 md:py-32 bg-gradient-to-b from-[var(--color-water-blue)]/60 via-[var(--color-water-blue-light)]/40 to-[var(--color-cream)] relative"
      >
          {/* Optional: Add subtle background texture or pattern */}
         <div className="container mx-auto px-6 relative z-10">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-[var(--color-shire-green-dark)] font-serif">
             Inside the Elixir: Key Ingredients
           </h2>

           {/* Ingredient Grid/List */}
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {/* Ingredient Card 1: Argan Oil */}
             <div className="bg-[var(--color-white)]/80 backdrop-blur-md p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <LeafIcon className="w-8 h-8 mb-3" colorVar="--color-shire-green-dark" />
                <h3 className="text-lg font-semibold mb-2 text-[var(--color-shire-green-dark)] font-sans">Argan Oil</h3>
                <p className="text-sm text-[var(--color-charcoal)]/90 font-sans mb-3 leading-relaxed">
                    Rich in Vitamin E & fatty acids. Chosen for scientifically validated hydration and strand repair properties.
                </p>
                <a href={`${GITHUB_LINK}#argan-oil-research`} /* Example link to section in README */ target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[var(--color-shire-green)] hover:text-[var(--color-shire-green-dark)] transition-colors">View Research →</a>
             </div>

             {/* Ingredient Card 2: Jojoba Oil */}
              <div className="bg-[var(--color-white)]/80 backdrop-blur-md p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <ShineIcon className="w-8 h-8 mb-3" colorVar="--color-shire-green-dark" />
                <h3 className="text-lg font-semibold mb-2 text-[var(--color-shire-green-dark)] font-sans">Jojoba Oil</h3>
                <p className="text-sm text-[var(--color-charcoal)]/90 font-sans mb-3 leading-relaxed">
                    Structurally similar to natural sebum. Selected for balanced scalp conditioning and non-greasy shine.
                </p>
                <a href={`${GITHUB_LINK}#jojoba-oil-research`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[var(--color-shire-green)] hover:text-[var(--color-shire-green-dark)] transition-colors">View Research →</a>
             </div>

             {/* Ingredient Card 3: Broccoli Seed Oil */}
             <div className="bg-[var(--color-white)]/80 backdrop-blur-md p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <MoleculeIcon className="w-8 h-8 mb-3" colorVar="--color-shire-green-dark" />
                <h3 className="text-lg font-semibold mb-2 text-[var(--color-shire-green-dark)] font-sans">Broccoli Seed Oil</h3>
                <p className="text-sm text-[var(--color-charcoal)]/90 font-sans mb-3 leading-relaxed">
                    High Erucic Acid content. Included as a researched natural silicone alternative for smoothness and gloss.
                </p>
                <a href={`${GITHUB_LINK}#broccoli-seed-oil-research`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[var(--color-shire-green)] hover:text-[var(--color-shire-green-dark)] transition-colors">View Research →</a>
             </div>

             {/* Ingredient Card 4: Rosemary Extract */}
             <div className="bg-[var(--color-white)]/80 backdrop-blur-md p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <ScienceIcon className="w-8 h-8 mb-3" colorVar="--color-shire-green-dark" />
                <h3 className="text-lg font-semibold mb-2 text-[var(--color-shire-green-dark)] font-sans">Rosemary Extract</h3>
                <p className="text-sm text-[var(--color-charcoal)]/90 font-sans mb-3 leading-relaxed">
                    Standardized for active compounds. Utilized for documented scalp-stimulating & antioxidant effects.
                </p>
                 <a href={`${GITHUB_LINK}#rosemary-extract-research`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[var(--color-shire-green)] hover:text-[var(--color-shire-green-dark)] transition-colors">View Research →</a>
             </div>
           </div>

            <p className="mt-12 text-center text-base italic text-[var(--color-charcoal)]/80 font-sans">
              Free from parabens, silicones, sulfates, and artificial fragrances. Vegan & Cruelty-Free. <br />
              <a
                  href={GITHUB_LINK} // Link to full list / concentrations
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold not-italic text-[var(--color-shire-green)] hover:text-[var(--color-shire-green-dark)] underline transition-colors duration-200"
              >
                  See full ingredient list & concentrations on GitHub
              </a>.
            </p>
         </div>
      </section>

       {/* --- Section 4: The Science & Process --- */}
      <section ref={researchSectionRef} className="py-20 md:py-32 bg-[var(--color-cream)]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image Column */}
            <div>
                <img
                    src={researchImageUrl}
                    alt="Scientist working in a lab with plants"
                    className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[500px]"
                />
            </div>
            {/* Content Column */}
            <div className="text-[var(--color-charcoal)] font-sans">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-shire-green-dark)] font-serif">
                    Our Open Process
                </h2>
                <p className="mb-4 text-lg leading-relaxed">
                    Shire Elixir isn't just mixed; it's meticulously developed. We believe the "how" is as important as the "what".
                </p>
                 <ul className="space-y-3 mb-6 list-disc list-inside text-base">
                    <li><strong className="font-semibold text-[var(--color-shire-green-dark)]">Ingredient Rationale:</strong> Every component is chosen based on published scientific evidence, which we link to directly.</li>
                    <li><strong className="font-semibold text-[var(--color-shire-green-dark)]">Sourcing Transparency:</strong> We document our supplier choices and quality control methods.</li>
                    <li><strong className="font-semibold text-[var(--color-shire-green-dark)]">Formulation Logs:</strong> Precise concentrations and mixing procedures are version-controlled and public.</li>
                    <li><strong className="font-semibold text-[var(--color-shire-green-dark)]">Testing Data:</strong> Stability tests, user feedback (anonymized), and performance metrics are shared openly.</li>
                 </ul>
                 <div className="mt-8 p-4 bg-[var(--color-water-blue-light)]/30 rounded-lg border border-[var(--color-shire-green)]/20 inline-block">
                    <p className="text-base flex items-center">
                        <GithubIcon className="w-5 h-5 mr-2 flex-shrink-0" colorVar="--color-shire-green-dark" />
                        <span>
                            Dive deep into our entire process on our public{' '}
                            <a
                            href={GITHUB_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[var(--color-shire-green-dark)] underline hover:text-[var(--color-shire-green)] transition-colors duration-200"
                            >
                            GitHub repository
                            </a>.
                        </span>
                    </p>
                 </div>
            </div>
        </div>
      </section>


       {/* --- Section 5: How To Use (Similar to Landing Page, Refined) --- */}
      <section
        ref={howToUseSectionRef}
        className="relative w-full py-20 md:py-28 bg-[var(--color-white)] z-10"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-[var(--color-shire-green-dark)] font-serif">
            Integrate Into Your Ritual
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 text-center max-w-6xl mx-auto">
             {/* Step 1 */}
            <div className="flex flex-col items-center p-4 transition duration-300 hover:scale-105">
              <span className="text-6xl font-bold text-[var(--color-shire-green)] block mb-4 font-serif">1</span>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shire-green-dark)] font-sans">Dispense</h3>
              <p className="text-base leading-relaxed text-[var(--color-charcoal)] font-sans">
                Start with 1-3 drops (adjust per hair type - see <a href={`${GITHUB_LINK}#usage-guide`} target="_blank" rel="noopener noreferrer" className="text-[var(--color-shire-green)] underline">guide</a>). Warm between palms.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center p-4 transition duration-300 hover:scale-105">
              <span className="text-6xl font-bold text-[var(--color-shire-green)] block mb-4 font-serif">2</span>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shire-green-dark)] font-sans">Apply</h3>
              <p className="text-base leading-relaxed text-[var(--color-charcoal)] font-sans">
                Smooth through damp or dry hair, mid-lengths to ends. Use sparingly on scalp if needed (patch test recommended).
              </p>
            </div>
             {/* Step 3 */}
            <div className="flex flex-col items-center p-4 transition duration-300 hover:scale-105">
              <span className="text-6xl font-bold text-[var(--color-shire-green)] block mb-4 font-serif">3</span>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shire-green-dark)] font-sans">Style & Treat</h3>
              <p className="text-base leading-relaxed text-[var(--color-charcoal)] font-sans">
                Style as usual. Ideal as pre-styling primer, finishing serum, or overnight treatment for deeper conditioning.
              </p>
            </div>
          </div>
           <div className="mt-12 text-center">
                 <img src={usageImageUrl} alt="Person applying serum to hair" className="max-w-xl mx-auto rounded-lg shadow-md"/>
           </div>
        </div>
      </section>

      {/* --- Section 6: Final CTA --- */}
      <section
        ref={ctaSectionRef}
        className="relative w-full py-24 md:py-36 bg-gradient-to-br from-[var(--color-shire-green)] to-[var(--color-shire-green-dark)] z-10 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[var(--color-white)]/5 to-transparent opacity-50 z-0"></div>
         {/* Floating elements for depth */}
         <LeafIcon className="absolute top-1/4 left-1/4 w-20 h-20 text-[var(--color-white)]/10 transform rotate-12 opacity-50 -z-10" />
         <ShineIcon className="absolute bottom-1/3 right-1/4 w-16 h-16 text-[var(--color-white)]/10 transform -rotate-6 opacity-50 -z-10"/>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-white)] font-serif">
             Ready for Radically Honest Hair Care?
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-shire-gold-light)] max-w-xl mx-auto mb-10 leading-relaxed font-sans">
             Invest in your hair's health with Shire Elixir. Transparently sourced, scientifically proven, universally effective.
          </p>

          <div className="mb-8">
              <span className="text-3xl md:text-4xl font-bold text-[var(--color-white)] font-serif">
                {PRODUCT_PRICE}
              </span>
              <span className="text-sm text-[var(--color-shire-gold-light)]/80 ml-2">
                {PRODUCT_SIZE}
              </span>
          </div>

          <button className="inline-flex items-center justify-center px-10 py-4 bg-[var(--color-white)] text-[var(--color-shire-green)] rounded-full font-bold text-lg font-sans hover:bg-[var(--color-shire-gold-light)] hover:text-[var(--color-shire-green-dark)] transition duration-300 ease-in-out shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-shire-green)] focus:ring-[var(--color-white)]">
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Add Shire Elixir to Cart
          </button>
        </div>
      </section>

      {/* --- Footer (Re-use or adapt from App.tsx) --- */}
        <footer
            ref={footerRef}
            className="relative w-full py-12 bg-[var(--color-shire-green-dark)] text-[var(--color-shire-gold-light)] text-opacity-80 text-sm z-10 font-sans"
        >
            <div className="container mx-auto px-6 text-center">
                <p className="font-semibold text-base mb-2 text-[var(--color-shire-gold-light)] text-opacity-100">
                    Shire Elixir
                </p>
                <p className="mb-2">
                    © {new Date().getFullYear()} Shire Botanicals (or Your Company Name). All rights reserved.
                </p>
                <p className="mb-3 italic">
                    Inspired by Nature, Proven by Science, Open by Design.
                </p>
                {/* GitHub Link */}
                <a
                    href={GITHUB_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[var(--color-shire-gold-light)] hover:text-[var(--color-white)] transition-colors duration-200 text-opacity-90 hover:text-opacity-100"
                    title="Explore our research on GitHub"
                    >
                    <GithubIcon className="w-4 h-4 mr-1.5" />
                    <span>View Open Research</span>
                </a>
                 {/* Back to Top or Home Link */}
                 <button
                    onClick={onGoBack}
                    className="mt-4 text-xs text-[var(--color-shire-gold-light)]/70 hover:text-[var(--color-white)] underline"
                 >
                    Back to Home
                 </button>
            </div>
        </footer>
    </div>
  );
};

export default ShireElixirPage;