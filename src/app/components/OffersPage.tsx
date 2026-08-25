import React, { useState, useEffect, useRef, useCallback } from "react";
import { Heart, ArrowRight, ShoppingCart, Plus, Minus, X, Star } from "lucide-react";
import { Product, ProductCard } from "../App";
import imgOffersBanner1 from "../../assets/oft1.png";
import imgOffersBanner2 from "../../assets/oft2.jpg";
import imgOffersBanner3 from "../../assets/oft3.jpg";
import imgLimOffer from "../../assets/lmoffer.png";
import imgLaste1 from "../../assets/laste.jpg";
import imgLaste2 from "../../assets/laste2.jpg";
import imgDealsVeg from "../../assets/grocery_deals_veg.jpg";
import imgDealsDairy from "../../assets/grocery_deals_dairy.jpg";
import imgDealsKitchen from "../../assets/grocery_deals_kitchen.jpg";
import imgDealsFruits from "../../assets/grocery_deals_fruits.jpg";
import imgDealsSnacks from "../../assets/grocery_deals_snacks.jpg";
import imgDealsDaily from "../../assets/grocery_deals_daily.jpg";
import imgFarmToHome from "../../assets/farm_to_home.jpg";
import imgMadeEasy from "../../assets/groceries_made_easy.jpg";

// Standard Unsplash images matching reference mockup
const imgGrainSaver = "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80";
const imgFreshFiesta = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80";
const imgDairyDelights = "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80";
const imgMonsoonMustHaves = "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&auto=format&fit=crop&q=80";

interface OffersPageProps {
  onOpenProduct: (p: Product) => void;
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onSub: (id: string) => void;
  wish: Set<string>;
  onWish: (id: string) => void;
}

// Custom Deals Modal for Category-specific deals
interface DealModalProps {
  title: string;
  categoryProducts: Product[];
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onSub: (id: string) => void;
  onClose: () => void;
  onOpenProduct: (p: Product) => void;
}

function DealModal({ title, categoryProducts, cart, onAdd, onSub, onClose, onOpenProduct }: DealModalProps) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end" onClick={onClose} style={{ backgroundColor: "rgba(0,0,0,0.55)" }}>
      <div
        className="bg-white rounded-t-3xl flex flex-col"
        style={{ maxHeight: "75%", animation: "slideUp 260ms cubic-bezier(.4,0,.2,1)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full absolute top-3 left-1/2 -translate-x-1/2" />
        <div className="flex items-center justify-between border-b border-gray-100 px-5 pt-5 pb-3 flex-shrink-0">
          <h3 className="font-bold text-gray-900 mt-1" style={{ fontSize: 16.5 }}>{title}</h3>
          <button onClick={onClose} className="cursor-pointer"><X style={{ width: 19, height: 19, color: "#9ca3af" }} /></button>
        </div>

        <div className="flex-1 overflow-y-auto hide-sb p-5 space-y-3">
          {categoryProducts.length === 0 ? (
            <p className="text-gray-400 text-center py-6">No active deals right now. Check back soon!</p>
          ) : (
            categoryProducts.map(p => {
              const qty = cart[p.id] || 0;
              return (
                <div key={p.id} className="flex items-center gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0" onClick={() => onOpenProduct(p)}>
                  <img src={p.img} alt={p.name} className="w-16 h-16 rounded-xl object-cover bg-gray-50 flex-shrink-0 cursor-pointer" />
                  <div className="flex-1 min-w-0 cursor-pointer">
                    <p className="font-semibold text-gray-900 truncate" style={{ fontSize: 13 }}>{p.name}</p>
                    <p className="text-gray-400" style={{ fontSize: 11 }}>{p.weight}</p>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="font-bold text-gray-900" style={{ fontSize: 13.5 }}>₹{p.price}</span>
                      <span className="text-gray-400 line-through" style={{ fontSize: 11 }}>₹{p.originalPrice}</span>
                      <span className="text-orange-500 font-bold" style={{ fontSize: 10.5 }}>{p.discount}% off</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0" onClick={e => e.stopPropagation()}>
                    {qty > 0 ? (
                      <div className="flex items-center border border-[#02616A]/30 rounded-full" style={{ gap: 5, padding: "3px 7px" }}>
                        <button onClick={() => onSub(p.id)} className="cursor-pointer"><Minus style={{ width: 12, height: 12, color: "#02616A" }} /></button>
                        <span className="font-bold text-center text-[12.5px]" style={{ minWidth: 14 }}>{qty}</span>
                        <button onClick={() => onAdd(p.id)} className="cursor-pointer"><Plus style={{ width: 12, height: 12, color: "#02616A" }} /></button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAdd(p.id)}
                        className="bg-[#02616A] text-white font-bold rounded-full px-3.5 py-1 text-[11.5px] cursor-pointer hover:bg-[#014f57] active:scale-95 transition-transform"
                      >
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}


export default function OffersPage({ onOpenProduct, cart, onAdd, onSub, wish, onWish }: OffersPageProps) {
  // Banner Slider State & Logic
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  const bannerTouchX = useRef<number | null>(null);
  const bannerTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advanceBanner = useCallback(() => {
    setActiveBannerIdx(i => (i + 1) % 3);
  }, []);

  const resetBannerTimer = useCallback(() => {
    if (bannerTimer.current) clearInterval(bannerTimer.current);
    bannerTimer.current = setInterval(advanceBanner, 3500);
  }, [advanceBanner]);

  useEffect(() => {
    resetBannerTimer();
    return () => {
      if (bannerTimer.current) clearInterval(bannerTimer.current);
    };
  }, [resetBannerTimer]);

  const onBannerTouchStart = (e: React.TouchEvent) => {
    bannerTouchX.current = e.touches[0].clientX;
  };

  const onBannerTouchEnd = (e: React.TouchEvent) => {
    if (bannerTouchX.current === null) return;
    const dx = e.changedTouches[0].clientX - bannerTouchX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        setActiveBannerIdx(i => (i + 1) % 3);
      } else {
        setActiveBannerIdx(i => (i - 1 + 3) % 3);
      }
      resetBannerTimer();
    }
    bannerTouchX.current = null;
  };

  const goToBanner = (i: number) => {
    setActiveBannerIdx(i);
    resetBannerTimer();
  };

  // Jersey Collection Slider State & Logic
  const [activeLasteIdx, setActiveLasteIdx] = useState(0);
  const [activeGroceryDealIdx, setActiveGroceryDealIdx] = useState(0);
  const lasteTouchX = useRef<number | null>(null);
  const lasteTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advanceLaste = useCallback(() => {
    setActiveLasteIdx(i => (i + 1) % 2);
  }, []);

  const resetLasteTimer = useCallback(() => {
    if (lasteTimer.current) clearInterval(lasteTimer.current);
    lasteTimer.current = setInterval(advanceLaste, 3500);
  }, [advanceLaste]);

  useEffect(() => {
    resetLasteTimer();
    return () => {
      if (lasteTimer.current) clearInterval(lasteTimer.current);
    };
  }, [resetLasteTimer]);

  const onLasteTouchStart = (e: React.TouchEvent) => {
    lasteTouchX.current = e.touches[0].clientX;
  };

  const onLasteTouchEnd = (e: React.TouchEvent) => {
    if (lasteTouchX.current === null) return;
    const dx = e.changedTouches[0].clientX - lasteTouchX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        setActiveLasteIdx(i => (i + 1) % 2);
      } else {
        setActiveLasteIdx(i => (i - 1 + 2) % 2);
      }
      resetLasteTimer();
    }
    lasteTouchX.current = null;
  };

  const goToLaste = (i: number) => {
    setActiveLasteIdx(i);
    resetLasteTimer();
  };

  // Modal State
  const [modalTitle, setModalTitle] = useState("");
  const [modalProducts, setModalProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDealsModal = (title: string, products: Product[]) => {
    setModalTitle(title);
    setModalProducts(products);
    setIsModalOpen(true);
  };

  // Products Category lists (linked to App.tsx registration)
  const dailyGroceriesDeals: Product[] = [
    { id: "deal-grain-rice", name: "Premium Basmati Rice Saver Pack", weight: "5 kg", price: 389, originalPrice: 550, discount: 29, badge: "OFFER", img: imgGrainSaver, desc: "Premium long-grain aged Basmati Rice, ideal for biryani and daily rice dishes." },
    { id: "d1", name: "Whole Wheat Atta", weight: "5 kg", price: 199, originalPrice: 275, discount: 27, badge: "OFFER", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300", desc: "Chakki Fresh | 100% Whole Wheat" },
    { id: "d5", name: "Premium Sunflower Oil", weight: "1 L", price: 119, originalPrice: 180, discount: 34, badge: "OFFER", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300", desc: "100% Pure & Refined | Cold Pressed" },
    { id: "d2", name: "Farm Fresh Eggs", weight: "6 pcs", price: 49, originalPrice: 68, discount: 28, badge: "OFFER", img: "https://images.unsplash.com/photo-1516448424440-9dbca97779c1?w=300", desc: "Grade A Brown Eggs | Pasture Raised" },
    { id: "d4", name: "Organic Forest Honey", weight: "450 g", price: 159, originalPrice: 255, discount: 38, badge: "OFFER", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300", desc: "Raw & Unfiltered | 100% Natural" }
  ];

  const snacksBeveragesDeals: Product[] = [
    { id: "bs1", name: "BRU Instant Coffee", weight: "200 g", price: 299, originalPrice: 379, discount: 21, badge: "OFFER", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300", desc: "Rich Aroma | 100% Pure Coffee" },
    { id: "d3", name: "Premium Black Tea", weight: "250 g", price: 79, originalPrice: 128, discount: 38, badge: "OFFER", img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=300", desc: "Organic Loose Leaf | Darjeeling Blend" },
    { id: "bs5", name: "Multigrain Chips", weight: "200 g", price: 98, originalPrice: 128, discount: 23, badge: "BEST", img: "https://images.unsplash.com/photo-1699666397768-0126340e880a?w=300", desc: "7 Grain Blend | 40% Less Fat" },
    { id: "monsoon-umbrella", name: "Windproof Compact Umbrella", weight: "1 unit", price: 249, originalPrice: 399, discount: 37, badge: "NEW", img: "https://images.unsplash.com/photo-1527788263495-315bd4d44158?w=300", desc: "Sturdy travel umbrella, water-resistant, auto open-close mechanism." }
  ];

  const monsoonSpecials: Product[] = [
    { id: "bs1", name: "BRU Instant Coffee", weight: "200 g", price: 299, originalPrice: 379, discount: 21, badge: "OFFER", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300", desc: "Rich Aroma | 100% Pure Coffee" },
    { id: "d3", name: "Premium Black Tea", weight: "250 g", price: 79, originalPrice: 128, discount: 38, badge: "OFFER", img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=300", desc: "Organic Loose Leaf | Darjeeling Blend" },
    { id: "monsoon-umbrella", name: "Windproof Compact Umbrella", weight: "1 unit", price: 249, originalPrice: 399, discount: 37, badge: "NEW", img: "https://images.unsplash.com/photo-1527788263495-315bd4d44158?w=300", desc: "Sturdy travel umbrella, water-resistant, auto open-close mechanism." }
  ];


  const todayDealsList: Product[] = [
    { id: "d5", name: "Premium Sunflower Oil", weight: "1 L", price: 119, originalPrice: 180, discount: 34, badge: "OFFER", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300", desc: "100% Pure & Refined | Cold Pressed" },
    { id: "d1", name: "Whole Wheat Atta", weight: "5 kg", price: 199, originalPrice: 275, discount: 27, badge: "OFFER", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300", desc: "Chakki Fresh | 100% Whole Wheat" },
    { id: "p3", name: "Organic Milk", weight: "1 L", price: 75, originalPrice: 90, discount: 17, badge: "NEW", img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300", desc: "Pasteurized | Certified Organic" }
  ];

  const groceryDeals = [
    {
      title: "FRESH VEGETABLES",
      img: imgDealsVeg,
      bg: "#E7F2CB",
      price: "STARTING ₹39*",
    },
    {
      title: "DAIRY ESSENTIALS",
      img: imgDealsDairy,
      bg: "#E2F1F8",
      price: "STARTING ₹29*",
    },
    {
      title: "KITCHEN ESSENTIALS",
      img: imgDealsKitchen,
      bg: "#F7ECD4",
      price: "STARTING ₹49*",
    },
    {
      title: "FRESH FRUITS",
      img: imgDealsFruits,
      bg: "#FCECE5",
      price: "STARTING ₹59*",
    },
    {
      title: "SNACKS & BEVERAGES",
      img: imgDealsSnacks,
      bg: "#EDE8F5",
      price: "STARTING ₹29*",
    },
    {
      title: "DAILY ESSENTIALS",
      img: imgDealsDaily,
      bg: "#FAF2DB",
      price: "STARTING ₹39*",
    },
  ];

  return (
    <div className="w-full bg-white select-none">
      {/* ── SECTION 1: DEALS OF THE DAY ── */}
      <section className="bg-white flex flex-col items-center">
        {/* Slider viewport */}
        <div 
          className="w-full max-w-[512px] overflow-hidden relative cursor-pointer select-none transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xs border-b border-gray-100/50 aspect-[2.3/1]"
          onTouchStart={onBannerTouchStart}
          onTouchEnd={onBannerTouchEnd}
        >
          <div 
            className="flex h-full transition-transform duration-370 ease-out"
            style={{ transform: `translateX(-${activeBannerIdx * 100}%)` }}
          >
            {/* Slide 0: Today Offers Banner */}
            <div className="w-full h-full flex-shrink-0">
              <img
                src={imgOffersBanner1}
                alt="Offers Banner 1"
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Slide 1: Daily Groceries Banner */}
            <div 
              className="w-full h-full flex-shrink-0"
              onClick={() => openDealsModal("Daily Groceries Deals", dailyGroceriesDeals)}
            >
              <img
                src={imgOffersBanner2}
                alt="Daily Groceries Banner"
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Slide 2: Snacks & Beverages Banner */}
            <div 
              className="w-full h-full flex-shrink-0"
              onClick={() => openDealsModal("Snacks & Beverages Deals", snacksBeveragesDeals)}
            >
              <img
                src={imgOffersBanner3}
                alt="Snacks and Beverages Banner"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
        </div>

        {/* Slider dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3 mb-3">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => goToBanner(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === activeBannerIdx ? "w-4 h-1.5 bg-[#02616A]" : "w-1.5 h-1.5 bg-[#02616A]/25"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── TODAY DEALS SECTION ── */}
      <section className="bg-white px-3.5 py-4 flex flex-col">
        <style>{`
          .theme-gold-deals .text-slate-900 {
            color: #000000 !important;
          }
          .theme-gold-deals .text-slate-500 {
            color: rgba(0, 0, 0, 0.7) !important;
          }
          .theme-gold-deals .text-slate-400 {
            color: rgba(0, 0, 0, 0.4) !important;
            text-decoration-color: rgba(0, 0, 0, 0.45) !important;
          }
          .theme-gold-deals .mt-0\\.5 span {
            color: #166534 !important; /* premium green */
          }
        `}</style>
        <div
          className="rounded-[28px] p-4 flex flex-col relative overflow-hidden theme-gold-deals bg-cover bg-center"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/ed/ed/c8/ededc85d7d1a9a552bcc149cd95cd184.jpg')",
          }}
        >
          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Title */}
            <h2 
              className="font-black italic tracking-tight text-white uppercase"
              style={{ fontSize: 21, fontFamily: "'Inter', sans-serif" }}
            >
              TODAY DEALS
            </h2>

            {/* LIMITED OFFER Graphic Sticker */}
            <img 
              src={imgLimOffer}
              alt="Limited Offer"
              className="h-14 w-auto object-contain select-none rotate-[2deg] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer filter drop-shadow-[0_2.5px_5px_rgba(0,0,0,0.18)]"
            />
          </div>

          {/* Horizontal Scroll list of product cards */}
          <div className="flex overflow-x-auto hide-sb gap-3.5 pb-1 px-0.5">
            {todayDealsList.map(p => (
              <ProductCard
                key={p.id}
                p={p}
                cart={cart}
                wish={wish}
                onAdd={onAdd}
                onSub={onSub}
                onWish={onWish}
                onOpen={onOpenProduct}
                isFullCover={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── JERSEY COLLECTION SLIDER SECTION ── */}
      <section className="bg-white px-3.5 py-4 flex flex-col items-center">
        {/* Slider viewport */}
        <div 
          className="w-full overflow-hidden relative rounded-[22px] cursor-pointer select-none transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          style={{ height: 126 }}
          onTouchStart={onLasteTouchStart}
          onTouchEnd={onLasteTouchEnd}
        >
          <div 
            className="flex h-full transition-transform duration-370 ease-out"
            style={{ transform: `translateX(-${activeLasteIdx * 100}%)` }}
          >
            {/* Slide 1 */}
            <div className="w-full h-full flex-shrink-0">
              <img
                src={imgLaste1}
                alt="Jersey Collection 1"
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Slide 2 */}
            <div className="w-full h-full flex-shrink-0">
              <img
                src={imgLaste2}
                alt="Jersey Collection 2"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>

        </div>

        {/* Dots Indicator below the card */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goToLaste(i); }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === activeLasteIdx ? "w-4 h-1.5 bg-[#02616A]" : "w-1.5 h-1.5 bg-[#02616A]/25"
              }`}
              aria-label={`Go to jersey slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── SECTION: GROCERY DEALS CAROUSEL ── */}
      <section className="bg-white px-3.5 py-4 flex flex-col">
        <div 
          className="rounded-[28px] py-5 px-3.5 flex flex-col relative overflow-hidden shadow-2xl border"
          style={{ 
            background: "radial-gradient(circle at 50% 50%, #1E6870 0%, #164F56 35%, #123F47 70%, #082F35 100%)",
            borderColor: "rgba(30, 104, 112, 0.35)",
            boxShadow: "0 20px 40px rgba(8, 47, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.15)"
          }}
        >
          {/* Header Row */}
          <div className="flex items-center justify-center mb-5 mt-1">
            {/* Left Accent */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B5E12E" strokeWidth="3" strokeLinecap="round" className="mr-1.5 opacity-95">
              <path d="M10 12H4M12 9L7 5M12 15L7 19" />
            </svg>
            {/* Title */}
            <h2 
              className="font-black italic tracking-tight text-white uppercase"
              style={{ fontSize: 22, fontFamily: "'Inter', sans-serif" }}
            >
              GROCERY DEALS
            </h2>
            {/* Right Accent */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B5E12E" strokeWidth="3" strokeLinecap="round" className="ml-1.5 opacity-95">
              <path d="M14 12h6M12 9l5-4M12 15l5 4" />
            </svg>
          </div>

          {/* Horizontal Scroll viewport */}
          <div 
            className="flex overflow-x-auto hide-sb gap-3 pb-2 px-1"
            onScroll={(e) => {
              const scrollLeft = e.currentTarget.scrollLeft;
              const index = Math.round(scrollLeft / 138); // card width (126) + gap (12)
              setActiveGroceryDealIdx(Math.min(5, Math.max(0, index)));
            }}
          >
            {groceryDeals.map((d, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col rounded-[20px] overflow-hidden relative transition-all duration-300 hover:scale-[1.01]"
                style={{ 
                  width: 126, 
                  height: 178, 
                  backgroundColor: d.bg 
                }}
              >
                {/* Product Photo as Card Background */}
                <img
                  src={d.img}
                  alt={d.title}
                  className="absolute inset-0 w-full h-full object-cover select-none transform hover:scale-105 transition-transform duration-370"
                />

                {/* Overlaid Card content */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 pb-0 z-10 pointer-events-none">
                  {/* Title (stacked words) */}
                  <h3 
                    className="font-extrabold tracking-tight uppercase leading-[1.1] text-[#08221E] flex flex-col pointer-events-auto"
                    style={{ fontSize: 10.5, fontFamily: "'Inter', sans-serif" }}
                  >
                    {d.title.split(" ").map((w, idx) => (
                      <span key={idx}>{w}</span>
                    ))}
                  </h3>

                  {/* Lime Green Price Strip */}
                  <div 
                    className="w-[calc(100%+24px)] -mx-3 bg-[#B5E12E] rounded-b-[20px] rounded-t-[6px] py-1.5 flex flex-col items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] pointer-events-auto"
                    style={{ minHeight: 42 }}
                  >
                  <span className="text-[7.5px] font-black uppercase tracking-wider text-[#08221E] opacity-75">STARTING</span>
                  <span className="text-[14px] font-extrabold text-[#08221E] mt-0.5 leading-none">
                    {d.price.replace("STARTING ", "")}
                  </span>
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* Dots Indicator below the container */}
          <div className="flex items-center justify-center gap-1.5 mt-4 mb-1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  i === activeGroceryDealIdx ? "w-3.5 h-1 bg-[#B5E12E]" : "w-1 h-1 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SIDE-BY-SIDE PROMO CARDS SECTION ── */}
      <section className="bg-white px-3.5 py-2 flex gap-3 pb-3">
        {/* Left Card: From Farm To Home */}
        <div 
          className="flex-1 rounded-[22px] overflow-hidden relative cursor-pointer select-none transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-sm border border-emerald-950/10"
          style={{ height: 130 }}
        >
          {/* Image Background */}
          <img
            src={imgFarmToHome}
            alt="From Farm To Home"
            className="absolute inset-0 w-full h-full object-cover object-right"
          />
          {/* Subtle Dark Left Overlay for Text Readability */}
          <div className="absolute inset-y-0 left-0 w-[80%] bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-3.5 z-10 pointer-events-none">
            <div className="flex flex-col">
              <h3 
                className="text-white font-black leading-[1.1] tracking-tight uppercase"
                style={{ fontSize: 13.5, fontFamily: "'Inter', sans-serif" }}
              >
                FROM FARM<br />TO HOME
              </h3>

            </div>
            <button className="self-start bg-white text-[#063D31] font-bold py-1.5 px-3 rounded-full hover:scale-105 active:scale-95 transition-transform uppercase select-none pointer-events-auto shadow-[0_2px_6px_rgba(0,0,0,0.12)] text-[9px] leading-none">
              Shop Fresh
            </button>
          </div>
        </div>

        {/* Right Card: Groceries Made Easy */}
        <div 
          className="flex-1 rounded-[22px] overflow-hidden relative cursor-pointer select-none transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-sm border border-[#D2EBE9]/40"
          style={{ height: 130 }}
        >
          {/* Image Background */}
          <img
            src={imgMadeEasy}
            alt="Groceries Made Easy"
            className="absolute inset-0 w-full h-full object-cover object-right"
          />
          {/* Subtle Light Left Overlay for Text Readability */}
          <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-[#D2EBE9]/50 to-transparent pointer-events-none" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-3.5 z-10 pointer-events-none">
            <div className="flex flex-col">
              <h3 
                className="text-[#063D31] font-black leading-[1.1] tracking-tight"
                style={{ fontSize: 13.5, fontFamily: "'Inter', sans-serif" }}
              >
                ALPHAGRO<br />Groceries<br />Made Easy.
              </h3>

            </div>
            <button className="self-start bg-[#063D31] text-white font-bold py-1.5 px-3 rounded-full hover:scale-105 active:scale-95 transition-transform uppercase select-none pointer-events-auto shadow-[0_2px_6px_rgba(6,61,49,0.15)] text-[9px] leading-none">
              Start Shopping
            </button>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DEALS MODAL ── */}
      {isModalOpen && (
        <DealModal
          title={modalTitle}
          categoryProducts={modalProducts}
          cart={cart}
          onAdd={onAdd}
          onSub={onSub}
          onClose={() => setIsModalOpen(false)}
          onOpenProduct={onOpenProduct}
        />
      )}
    </div>
  );
}
