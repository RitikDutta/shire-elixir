// @ts-nocheck
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Reuse Icons (Assume defined or imported) ---
const LeafIcon = ({ className = "w-6 h-6", colorVar = "--color-shire-green-dark" }: { className?: string; colorVar?: string }) => ( <svg className={className} style={{ color: `var(${colorVar})` }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> );
const ShineIcon = ({ className = "w-6 h-6", colorVar = "--color-shire-green-dark" }: { className?: string; colorVar?: string }) => ( <svg className={className} style={{ color: `var(${colorVar})` }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /> </svg> );
const ScienceIcon = ({ className = "w-6 h-6", colorVar = "--color-shire-green-dark" }: { className?: string; colorVar?: string }) => ( <svg className={className} style={{ color: `var(${colorVar})` }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path> </svg> );
const MoleculeIcon = ({ className = "w-6 h-6", colorVar = "--color-shire-green-dark" }: { className?: string; colorVar?: string }) => ( <svg className={className} style={{ color: `var(${colorVar})` }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.418a.563.563 0 01.372.94l-4.386 3.176a.563.563 0 00-.182.557l1.636 5.038a.563.563 0 01-.812.622l-4.47-3.131a.563.563 0 00-.65 0l-4.47 3.13a.563.563 0 01-.812-.622l1.636-5.038a.563.563 0 00-.182-.557l-4.386-3.176a.563.563 0 01.372-.94h5.418a.563.563 0 00.475-.31l2.125-5.11z"></path> </svg> );
const GithubIcon = ({ className = "w-6 h-6", colorVar = "--color-charcoal" }: { className?: string; colorVar?: string }) => ( <svg className={className} style={{ color: `var(${colorVar})` }} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/> </svg> );
// Simple check icon for lists
const CheckIcon = ({ className = "w-4 h-4", colorVar = "--color-shire-green" }: { className?: string; colorVar?: string }) => ( <svg className={className} style={{ color: `var(${colorVar})` }} fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" > <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /> </svg> );


// --- Image Path ---
const bottleImageUrl = "/serum_bottle_full.png";

gsap.registerPlugin(ScrollTrigger);

const ShopPage = () => {
  const shopPageRef = useRef<HTMLDivElement>(null);
  const productSectionRef = useRef<HTMLDivElement>(null);
  const ingredientsSectionRef = useRef<HTMLDivElement>(null);
  const scienceSectionRef = useRef<HTMLDivElement>(null);
  const githubSectionRef = useRef<HTMLDivElement>(null);

  // --- Placeholder Data (Keep the detailed ingredient data) ---
  const product = {
    name: "Shire Elixir",
    description: "Unisex Hair Serum - Open Research Formula",
    price: 39.99,
    currency: "USD",
    image: bottleImageUrl,
    githubLink: "YOUR_GITHUB_REPOSITORY_LINK_HERE",
    tags: ["Unisex", "Science-Backed", "Vegan", "Open Source", "Silicone-Free"], // Added tags
    ingredients: [
       { name: "Argan Oil", icon: LeafIcon, percentage: "~40%", sourcing: "Sustainably harvested Moroccan Argan kernels", extraction: "Cold-Pressed, Virgin", keyActives: "Vitamin E (Tocopherols), Oleic & Linoleic Acids, Polyphenols", role: "Deep Hydration, Repair, Shine Enhancement", benefit: "Penetrates the hair shaft to deliver intense moisture and antioxidants, repairing damage from within and smoothing the cuticle for a non-greasy, healthy sheen. Chosen for its proven restorative properties.", },
       { name: "Jojoba Oil", icon: ShineIcon, percentage: "~35%", sourcing: "Organically grown Sonoran Desert seeds", extraction: "Cold-Pressed, Unrefined", keyActives: "Wax Esters (similar to sebum), Vitamin E, B-complex Vitamins", role: "Scalp Balance, Lightweight Conditioning, Frizz Control", benefit: "Structurally similar to natural human sebum, it helps balance scalp oil production while providing lightweight moisture. Excellent for reducing frizz and enhancing natural softness without weighing hair down.", },
       { name: "Broccoli Seed Oil", icon: MoleculeIcon, percentage: "~15%", sourcing: "European Brassica oleracea seeds", extraction: "Cold-Pressed", keyActives: "Erucic Acid (Omega-9), Linoleic Acid (Omega-6), Vitamin A", role: "Natural Smoothing, Detangling, Gloss", benefit: "A unique botanical oil acting as a natural alternative to silicones. Its high Erucic Acid content provides exceptional slip for detangling and imparts a radiant gloss and smooth finish to the hair.", },
       { name: "Rosemary Extract", icon: ScienceIcon, percentage: "~1-2% (Std. Extract)", sourcing: "Mediterranean Rosmarinus officinalis leaves", extraction: "CO2 Extraction (Standardized)", keyActives: "Rosmarinic Acid, Carnosic Acid", role: "Scalp Stimulation, Antioxidant", benefit: "A potent antioxidant extract known for its invigorating effect on the scalp, potentially supporting microcirculation. We use a standardized extract to ensure consistent levels of beneficial compounds.", },
    ],
     scienceQuote: "We don't just create products, we document processes. Science guides our formulation, transparency defines our ethos.", // Added quote
    scienceText: "Shire Elixir isn't just mixed, it's meticulously formulated. We start with peer-reviewed research, identifying botanical extracts and oils with proven efficacy for hair health. Each ingredient is chosen for its specific function and synergistic potential. We document our sourcing, dilution ratios, stability tests, and rationale openly on GitHub. This transparency ensures you understand exactly what you're applying and why it works. We prioritize natural origin ingredients, backed by scientific validation, free from unnecessary synthetics.",
  };


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Initial Page Load Animation ---
      gsap.from(productSectionRef.current, { opacity: 0, y: 60, duration: 1.2, delay: 0.2, ease: "power3.out" });
      // Stagger animation for product details
      gsap.from(".product-detail-item", { opacity: 0, x: -30, duration: 0.8, stagger: 0.15, delay: 0.6, ease: "power2.out" });
      // Button animation
      gsap.from(".add-to-cart-btn", { opacity: 0, scale: 0.9, duration: 0.7, delay: 1.0, ease: "back.out(1.7)" });


      // --- Section Scroll Animations ---
      const animateSectionIn = (ref: React.RefObject<HTMLElement>, xOffset = 0, yOffset = 60) => {
        if (ref.current) {
          gsap.from(ref.current.children, { // Target children for stagger potential
            opacity: 0,
            x: xOffset,
            y: yOffset,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1, // Stagger children elements if applicable
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%", // Start a bit earlier
              toggleActions: "play none none reverse",
            },
          });
        }
      };

      // Apply animations with potential offsets
      animateSectionIn(scienceSectionRef, -50, 0); // Slide in from left
      animateSectionIn(ingredientsSectionRef); // Default slide up
      animateSectionIn(githubSectionRef); // Default slide up


      // Animate Ingredient Cards individually on scroll
       if (ingredientsSectionRef.current) {
           const cards = gsap.utils.toArray('.ingredient-card');
           cards.forEach((card: any) => {
               gsap.from(card, {
                   opacity: 0,
                   y: 50,
                   scale: 0.95,
                   duration: 0.8,
                   ease: "power2.out",
                   scrollTrigger: {
                       trigger: card,
                       start: "top 90%", // Trigger when card is almost visible
                       toggleActions: "play none none reverse",
                   }
               });
           });
       }


    }, shopPageRef);
    return () => ctx.revert();
  }, []);

  const handleAddToCart = () => {
    alert(`Added ${product.name} to cart! (Placeholder)`);
    console.log("Add to cart:", product.name, product.price);
  };

  return (
    // Added subtle gradient background to the whole page body potentially in index.css or here
    <div ref={shopPageRef} className="min-h-screen bg-gradient-to-b from-[var(--color-cream)] via-[#F8F5EF] to-[var(--color-water-blue-light)]/10 text-[var(--color-charcoal)] font-sans overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-16 md:pb-24 space-y-24 md:space-y-36"> {/* Increased spacing */}

        {/* --- Product Section --- (Enhanced Layout & Details) */}
        <section ref={productSectionRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Product Image with background element */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mx-0 order-last lg:order-first">
             {/* Subtle background shape/gradient */}
            <div className="absolute inset-0 -z-10 transform -rotate-6 scale-105 rounded-3xl bg-gradient-to-br from-[var(--color-water-blue-light)]/30 via-[var(--color-shire-green)]/10 to-transparent opacity-60 blur-xl"></div>
            <img
              src={product.image}
              alt={`${product.name} Bottle`}
              className="w-full h-auto object-contain rounded-lg relative z-10 drop-shadow-2xl" // Drop shadow
            />
          </div>

          {/* Product Details & Purchase */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-shire-green-dark)] mb-4 font-serif product-detail-item">
              {product.name}
            </h1>
            <p className="text-lg text-[var(--color-shire-green)] mb-6 product-detail-item">
              {product.description}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6 product-detail-item">
                {product.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium bg-[var(--color-shire-green)]/10 text-[var(--color-shire-green-dark)] px-3 py-1 rounded-full border border-[var(--color-shire-green)]/20">
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-4xl font-semibold text-[var(--color-charcoal)] mb-8 product-detail-item">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(product.price)}
            </p>
            <button
              onClick={handleAddToCart}
              // Added class for GSAP targeting
              className="add-to-cart-btn w-full lg:w-auto self-center lg:self-start px-10 py-4 bg-[var(--color-shire-green)] text-[var(--color-white)] rounded-full font-bold text-lg font-sans hover:bg-[var(--color-shire-green-dark)] transition duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-cream)] focus:ring-[var(--color-shire-green)]"
            >
              Add to Cart
            </button>
            <p className="text-sm mt-5 text-[var(--color-charcoal)]/70 italic product-detail-item">
              Experience the difference of transparency and efficacy.
            </p>
          </div>
        </section>

        {/* --- The Science & Soul Section --- (Improved Layout & Quote) */}
        <section ref={scienceSectionRef} className="relative py-16 md:py-20 px-6 md:px-10 bg-[var(--color-water-blue)]/10 rounded-xl shadow-lg overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-64 h-64 bg-[var(--color-shire-green)]/10 rounded-full blur-2xl opacity-50"></div>
            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
                 <div className="md:col-span-1 text-center md:text-left">
                     <ScienceIcon className="w-16 h-16 mx-auto md:mx-0 mb-4" colorVar="--color-shire-green-dark"/>
                     <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-shire-green-dark)] font-serif leading-tight">
                         The Science & Soul
                     </h2>
                 </div>
                 <div className="md:col-span-2">
                     {/* Quote */}
                    <blockquote className="border-l-4 border-[var(--color-shire-green)] pl-4 italic text-lg text-[var(--color-charcoal)]/90 mb-6">
                        "{product.scienceQuote}"
                    </blockquote>
                    <p className="text-base md:text-lg leading-relaxed text-[var(--color-charcoal)]/80">
                        {product.scienceText}
                    </p>
                 </div>
             </div>
        </section>

        {/* --- Key Ingredient Deep Dive Section (Richer Cards) --- */}
        <section ref={ingredientsSectionRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[var(--color-shire-green-dark)] mb-16 md:mb-20 font-serif">
            Inside the Elixir: Ingredient Spotlight
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {product.ingredients.map((ingredient, index) => (
              // Added class for GSAP targeting
              <div key={index} className="ingredient-card bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200/50 transition duration-300 ease-in-out hover:shadow-xl hover:border-[var(--color-shire-green)]/30 transform hover:-translate-y-2 flex flex-col">
                {/* Top part: Icon, Name, Percentage */}
                <div className='flex items-start mb-5'> {/* items-start for alignment */}
                    <ingredient.icon className="w-12 h-12 mr-5 flex-shrink-0 text-[var(--color-shire-green)]" />
                    <div className='flex-grow'>
                        <h3 className="text-2xl font-semibold text-[var(--color-shire-green-dark)] font-sans leading-tight mb-1">
                          {ingredient.name}
                        </h3>
                         <p className='text-sm font-medium text-[var(--color-shire-green)] opacity-90'>
                            ~ {ingredient.percentage} of formula
                        </p>
                    </div>
                </div>

                {/* Horizontal Divider */}
                <hr className="my-4 border-t border-[var(--color-shire-green)]/20" />

                 {/* Detailed Info List with Icons */}
                <div className="space-y-3 text-sm text-[var(--color-charcoal)]/90 mb-5">
                   <div className="flex items-center"><CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" /> <div><strong className='font-medium text-[var(--color-charcoal)]'>Role:</strong> {ingredient.role}</div></div>
                   <div className="flex items-center"><CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" /> <div><strong className='font-medium text-[var(--color-charcoal)]'>Source:</strong> {ingredient.sourcing}</div></div>
                   <div className="flex items-center"><CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" /> <div><strong className='font-medium text-[var(--color-charcoal)]'>Extraction:</strong> {ingredient.extraction}</div></div>
                   <div className="flex items-center"><CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" /> <div><strong className='font-medium text-[var(--color-charcoal)]'>Key Actives:</strong> {ingredient.keyActives}</div></div>
                </div>

                 {/* Benefit Text */}
                <p className="text-base leading-relaxed text-[var(--color-charcoal)] mt-auto pt-4 border-t border-dashed border-[var(--color-charcoal)]/10">
                  {ingredient.benefit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Open Research Commitment Section (Visual Flair) --- */}
        <section ref={githubSectionRef} className="relative py-16 md:py-20 px-6 md:px-10 bg-gradient-to-tr from-[var(--color-shire-green)]/5 via-[var(--color-water-blue)]/10 to-transparent rounded-xl border border-[var(--color-shire-green)]/20 overflow-hidden">
            {/* Subtle background pattern (e.g., faint lines or dots) */}
            <div className="absolute inset-0 -z-10 opacity-20" style={{backgroundImage: 'radial-gradient(var(--color-shire-green) 0.5px, transparent 0.5px)', backgroundSize: '10px 10px'}}></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <GithubIcon className="w-12 h-12 mx-auto mb-5 text-[var(--color-shire-green-dark)]"/>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-shire-green-dark)] mb-6 font-serif">
                    Commitment to Openness
                </h2>
                <p className="text-lg leading-relaxed text-[var(--color-charcoal)]/90 mb-10">
                    Transparency isn't an afterthought; it's our foundation. Dive deep into our methodology, ingredient choices, and data. We invite scrutiny and collaboration through our public repository.
                </p>
                <a
                    href={product.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    // Enhanced Button Style
                    className="inline-flex items-center px-10 py-4 bg-[var(--color-shire-green-dark)] text-[var(--color-white)] rounded-full font-bold text-lg font-sans hover:bg-[var(--color-charcoal)] transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-cream)] focus:ring-[var(--color-shire-green-dark)] group"
                >
                    <GithubIcon className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:rotate-[-12deg]" colorVar="--color-white" />
                     <span>Explore Research on GitHub</span>
                </a>
            </div>
        </section>

      </div>

        {/* Footer (Keep as is or enhance similarly) */}
        <footer className="py-10 bg-[var(--color-shire-green-dark)] text-[var(--color-shire-gold-light)] text-opacity-80 text-sm text-center font-sans border-t-4 border-[var(--color-shire-green)]/50">
             <p className="font-semibold mb-1 text-base text-[var(--color-shire-gold-light)]">Shire Elixir</p>
             <p>© {new Date().getFullYear()} Shire Botanicals (or Your Company Name).</p>
             <p className="italic mt-1">Open Science. Effective Wellness.</p>
        </footer>
    </div>
  );
};

export default ShopPage;