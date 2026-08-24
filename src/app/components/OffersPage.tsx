import React, { useState } from "react";
import { Heart, ArrowRight, ShoppingCart, Plus, Minus, X, Star } from "lucide-react";
import { Product } from "../App";
import imgDailyGroceriesBanner from "../../assets/daily_groceries_banner.jpg";
import imgSnacksBeveragesBanner from "../../assets/snacks_beverages_banner.jpg";

// Standard Unsplash images matching reference mockup
const imgGrainSaver = "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80";
const imgFreshFiesta = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80";
const imgDairyDelights = "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80";
const imgMonsoonMustHaves = "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&auto=format&fit=crop&q=80";
const imgBed = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&auto=format&fit=crop&q=80";
const imgTrolley = "https://images.unsplash.com/photo-1591081658714-f576fb7ea3ed?w=400&auto=format&fit=crop&q=80";
const imgWardrobe = "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&auto=format&fit=crop&q=80";
const imgSpices = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80";
const imgYoga = "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&auto=format&fit=crop&q=80";
const imgFitness = "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&auto=format&fit=crop&q=80";
const imgKids = "https://images.unsplash.com/photo-1515488042361-404e9250afef?w=400&auto=format&fit=crop&q=80";

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

function AnimatedOffersBanner() {
  return (
    <>
      <style>{`
        @keyframes pulse-sparkle {
          0%, 100% { transform: scale(0.9) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.1) rotate(20deg); opacity: 1; }
        }
        @keyframes pulse-sparkle-delayed {
          0%, 100% { transform: scale(1.1) rotate(20deg); opacity: 1; }
          50% { transform: scale(0.9) rotate(0deg); opacity: 0.8; }
        }
        @keyframes float-banner {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes shimmer-sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-sparkle {
          animation: pulse-sparkle 2.5s ease-in-out infinite;
        }
        .animate-sparkle-delay {
          animation: pulse-sparkle-delayed 2.5s ease-in-out infinite;
        }
        .animate-float {
          animation: float-banner 4s ease-in-out infinite;
        }
        .text-shimmer {
          background: linear-gradient(120deg, #0f172a 35%, #4f46e5 50%, #0f172a 65%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-sweep 6s linear infinite;
        }
      `}</style>

      <div
        className="w-full max-w-[512px] rounded-3xl p-4.5 flex flex-col items-center justify-center relative cursor-pointer select-none transition-all duration-500 hover:scale-[1.03] animate-float border border-white/40"
        style={{
          background: "linear-gradient(to bottom, #FED766 0%, #FFFDF9 50%, #9cb2ff 100%)",
          boxShadow: "inset 0 2px 2px rgba(255, 255, 255, 0.6)",
          height: 112,
        }}
      >
        {/* Sparkles & TODAY OFFERS Row */}
        <div className="flex items-center justify-center gap-3">
          {/* Sparkle Left */}
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-slate-800 text-slate-800 animate-sparkle flex-shrink-0">
            <path d="M12 0L15 9L24 12L15 15L12 24L9 15L0 12L9 9Z" />
          </svg>

          {/* Main Title */}
          <h1
            className="font-black italic text-center tracking-tight leading-none text-shimmer pr-2"
            style={{
              fontSize: 27,
              fontFamily: "'Inter', sans-serif",
              paddingRight: "6px" // Prevents italic 'S' from clipping in WebKit browsers
            }}
          >
            TODAY OFFERS
          </h1>

          {/* Sparkle Right */}
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-slate-800 text-slate-800 animate-sparkle-delay flex-shrink-0">
            <path d="M12 0L15 9L24 12L15 15L12 24L9 15L0 12L9 9Z" />
          </svg>
        </div>

        {/* Divider & BEST DEALS FOR YOU Row */}
        <div className="flex items-center justify-center gap-2.5 w-full mt-2 px-1">
          {/* Left tapered line */}
          <div
            className="h-[1.5px] flex-1 rounded-full"
            style={{
              background: "linear-gradient(to right, transparent, #1e293b 85%)",
            }}
          />
          
          <span
            className="font-bold tracking-[0.2em] text-[10.5px] text-slate-800 uppercase whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            BEST DEALS FOR YOU
          </span>

          {/* Right tapered line */}
          <div
            className="h-[1.5px] flex-1 rounded-full"
            style={{
              background: "linear-gradient(to left, transparent, #1e293b 85%)",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default function OffersPage({ onOpenProduct, cart, onAdd, onSub, wish, onWish }: OffersPageProps) {
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

  const furnitureProducts: Product[] = [
    { id: "furniture-bed", name: "Bed", weight: "1 Unit", price: 7338, originalPrice: 9999, discount: 26, badge: "OFFER", img: imgBed, desc: "Sturdy wooden platform bed frame, modern minimalist design." },
    { id: "furniture-trolley", name: "Kitchen trolley", weight: "1 Unit", price: 403, originalPrice: 699, discount: 42, badge: "OFFER", img: imgTrolley, desc: "3-tier mobile cart on wheels, perfect for kitchen, bathroom, or storage organize." },
    { id: "furniture-wardrobe", name: "Wardrobe", weight: "1 Unit", price: 3960, originalPrice: 5999, discount: 34, badge: "OFFER", img: imgWardrobe, desc: "Multilayer fabric-and-metal wardrobe closet with zipper cover for clothes storage." }
  ];

  const spiceProducts: Product[] = [
    { id: "spice-combo", name: "Premium Masala Combo Pack", weight: "3 x 100g", price: 189, originalPrice: 250, discount: 24, badge: "BEST", img: imgSpices, desc: "Special combo of Eastern Sambhar, MDH Garam Masala, and Aachi Chicken Masala." }
  ];

  const yogaProducts: Product[] = [
    { id: "play-yoga-mat", name: "Eco-Friendly Yoga Mat", weight: "6mm Thick", price: 599, originalPrice: 999, discount: 40, badge: "NEW", img: imgYoga, desc: "High-density foam, non-slip textured yoga mat with carrying strap." }
  ];

  const fitnessProducts: Product[] = [
    { id: "play-dumbbells", name: "Fitness Dumbbell Set", weight: "5kg x 2", price: 1299, originalPrice: 1999, discount: 35, badge: "NEW", img: imgFitness, desc: "Hexagonal iron dumbbells with protective neoprene coating." }
  ];

  const kidsProducts: Product[] = [
    { id: "play-toy-train", name: "Kids Zone Toy Train", weight: "1 Box", price: 499, originalPrice: 799, discount: 37, badge: "NEW", img: imgKids, desc: "Classic wooden toy train set with magnetic connector blocks." }
  ];

  return (
    <div className="w-full bg-white select-none">
      {/* ── SECTION 1: DEALS OF THE DAY (1 row 2 card e-commerce banners) ── */}
      <section className="bg-white pt-3 pb-4 flex flex-col">
        {/* Animated offers header banner */}
        <div className="flex justify-center px-4 pt-1.5 pb-3">
          <AnimatedOffersBanner />
        </div>

        {/* 1 Row 2 Cards E-Commerce Banners Grid */}
        <div className="grid grid-cols-2 gap-3 px-4 py-1">
          {/* Card 1: Daily Groceries */}
          <div
            onClick={() => openDealsModal("Daily Groceries Deals", dailyGroceriesDeals)}
            className="relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 aspect-[1] border border-gray-100/50"
          >
            <img
              src={imgDailyGroceriesBanner}
              alt="Daily Groceries Banner"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Card 2: Snacks & Beverages */}
          <div
            onClick={() => openDealsModal("Snacks & Beverages Deals", snacksBeveragesDeals)}
            className="relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 aspect-[1] border border-gray-100/50"
          >
            <img
              src={imgSnacksBeveragesBanner}
              alt="Snacks and Beverages Banner"
              className="w-full h-full object-cover block"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: MONSOON MUST HAVES CAROUSEL ── */}
      <section className="bg-white px-3 pb-5 flex flex-col">
        <div
          onClick={() => openDealsModal("Monsoon Must Haves", monsoonSpecials)}
          className="rounded-3xl p-4 flex justify-between relative overflow-hidden cursor-pointer active:scale-[0.99] transition-transform shadow-lg border border-white/5"
          style={{
            background: "linear-gradient(135deg, #445447 0%, #2f3b31 100%)",
            height: 148,
          }}
        >
          <div className="flex flex-col justify-center z-10 max-w-[50%]">
            <h2 className="text-white font-extrabold text-[15px] leading-tight tracking-tight uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              MONSOON<br />MUST HAVES
            </h2>
            <p className="text-gray-200 text-[10px] font-medium mt-1 leading-snug">
              Stay ready. Stay fresh.
            </p>
            <button
              className="bg-[#243527] text-white font-extrabold text-[9.5px] tracking-wider px-3.5 py-1.5 rounded-full mt-3 w-fit uppercase border border-white/10 flex items-center gap-1 active:scale-95 shadow-sm"
            >
              SHOP NOW
            </button>
          </div>
          {/* Couple under umbrella Unsplash image */}
          <div className="absolute right-0 top-0 bottom-0 w-[50%] overflow-hidden flex items-center justify-end">
            <img
              src={imgMonsoonMustHaves}
              alt="Monsoon"
              className="w-full h-full object-cover object-center block"
              style={{
                maskImage: "linear-gradient(to left, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 0%)",
                WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 0%)"
              }}
            />
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <span className="w-4 h-1.5 rounded-full bg-[#02616A] transition-all duration-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#02616A]/25 transition-all duration-300" />
        </div>
      </section>

      {/* ── SECTION 3: DEALS ON FURNITURE (Teal Brand Grid Background) ── */}
      <section className="bg-[#fff2f2]/60 px-3.5 py-5 flex flex-col">
        <div
          className="rounded-3xl p-4 flex flex-col relative overflow-hidden border border-teal-800/10 shadow-md"
          style={{
            backgroundColor: "#02616A",
            // Teal grid background overlay
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        >
          {/* Section title */}
          <h2 className="text-white font-extrabold text-[17px] tracking-tight mb-3 px-1">
            Deals on Furniture
          </h2>

          {/* 3 Furniture Items Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {furnitureProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onOpenProduct(p)}
                className="flex flex-col items-center cursor-pointer select-none active:scale-[0.97] transition-transform"
              >
                {/* White card image holder */}
                <div className="w-full aspect-square rounded-2xl bg-white p-2.5 overflow-hidden flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#014f57]/10">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover rounded-xl block hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Rounded badge badge */}
                <div
                  className="rounded-full font-black text-center mt-2 px-2.5 py-1 flex items-center justify-center shadow-sm"
                  style={{
                    backgroundColor: "#e6f4f5", // very light teal
                    border: "1.2px solid #004d54",
                  }}
                >
                  <span className="text-[#004d54] text-[9.5px] font-black tracking-tight whitespace-nowrap">
                    {p.id === "furniture-bed" ? "Just ₹7,338" : p.id === "furniture-trolley" ? "Under ₹403" : "Under ₹3,960"}
                  </span>
                </div>

                {/* Label text */}
                <span className="text-teal-50 font-bold text-[11.5px] tracking-tight mt-1.5 truncate max-w-full text-center">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SPICE UP YOUR KITCHEN ── */}
      <section className="bg-white px-3.5 py-4">
        <div
          onClick={() => openDealsModal("Spice Up Your Kitchen Deals", spiceProducts)}
          className="rounded-3xl p-4 flex justify-between relative overflow-hidden cursor-pointer active:scale-[0.99] transition-transform shadow-md border border-[#edd7c4]/40"
          style={{
            background: "linear-gradient(135deg, #f4edd9 0%, #ebd7c1 100%)",
            height: 126,
          }}
        >
          <div className="flex flex-col justify-center z-10 max-w-[55%]">
            <h2 className="text-[#563625] font-extrabold text-[14px] leading-tight tracking-tight uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              SPICE UP YOUR KITCHEN
            </h2>
            <p className="text-[#7c5d4b] text-[10px] font-semibold mt-1 leading-snug">
              Premium spices & masalas at best prices
            </p>
            <button
              className="bg-[#6b4731] text-white font-extrabold text-[9px] tracking-wider px-3.5 py-1.5 rounded-full mt-2.5 w-fit uppercase active:scale-95 shadow-sm border border-white/5"
            >
              SHOP NOW
            </button>
          </div>
          {/* Spices Unsplash image */}
          <div className="absolute right-0 top-0 bottom-0 w-[45%] overflow-hidden flex items-end justify-end">
            <img
              src={imgSpices}
              alt="Spices"
              className="w-full h-full object-cover object-center block"
              style={{
                maskImage: "linear-gradient(to left, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 0%)",
                WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 0%)"
              }}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 5: PICK YOUR PLAY (Black background cards) ── */}
      <section className="bg-white p-4 flex flex-col">
        <div className="bg-[#0c0e15] rounded-3xl p-3.5 flex border border-white/5 shadow-lg">
          {/* Left Vertical stacked text */}
          <div className="w-[30%] flex flex-col justify-center pl-1">
            <p className="text-emerald-400 font-extrabold text-[15px] leading-[1.08] tracking-tight uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              PICK<br />YOUR<br />PLAY
            </p>
          </div>

          {/* Right 3 Cards Grid */}
          <div className="w-[70%] grid grid-cols-3 gap-2">
            {/* Card 1: Yoga Essentials */}
            <div
              onClick={() => openDealsModal("Yoga Essentials", yogaProducts)}
              className="rounded-2xl bg-[#141822] overflow-hidden flex flex-col cursor-pointer active:scale-95 transition-transform border border-white/5"
            >
              <div className="p-1.5 flex flex-col min-h-[42px] leading-tight">
                <span className="text-[#a7f3d0] font-extrabold text-[7.5px] tracking-wide uppercase">YOGA</span>
                <span className="text-[#a7f3d0] font-extrabold text-[7.5px] tracking-wide uppercase mt-0.5">ESSENTIALS</span>
              </div>
              <div className="relative aspect-[0.9] w-full overflow-hidden bg-[#1f2636]">
                <img src={imgYoga} alt="Yoga" className="w-full h-full object-cover object-top block" />
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                  <ArrowRight className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
            </div>

            {/* Card 2: Fitness Equipments */}
            <div
              onClick={() => openDealsModal("Fitness Equipments", fitnessProducts)}
              className="rounded-2xl bg-[#141822] overflow-hidden flex flex-col cursor-pointer active:scale-95 transition-transform border border-white/5"
            >
              <div className="p-1.5 flex flex-col min-h-[42px] leading-tight">
                <span className="text-blue-300 font-extrabold text-[7.5px] tracking-wide uppercase">FITNESS</span>
                <span className="text-blue-300 font-extrabold text-[7.5px] tracking-wide uppercase mt-0.5">EQUIPMENTS</span>
              </div>
              <div className="relative aspect-[0.9] w-full overflow-hidden bg-[#1f2636]">
                <img src={imgFitness} alt="Fitness" className="w-full h-full object-cover object-center block" />
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                  <ArrowRight className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
            </div>

            {/* Card 3: Kids Zone */}
            <div
              onClick={() => openDealsModal("Kids Zone", kidsProducts)}
              className="rounded-2xl bg-[#141822] overflow-hidden flex flex-col cursor-pointer active:scale-95 transition-transform border border-[#1f2636]"
            >
              <div className="p-1.5 flex flex-col min-h-[42px] leading-tight">
                <span className="text-purple-300 font-extrabold text-[7.5px] tracking-wide uppercase">KIDS</span>
                <span className="text-purple-300 font-extrabold text-[7.5px] tracking-wide uppercase mt-0.5">ZONE</span>
              </div>
              <div className="relative aspect-[0.9] w-full overflow-hidden bg-[#1f2636]">
                <img src={imgKids} alt="Kids" className="w-full h-full object-cover object-center block" />
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center shadow-md">
                  <ArrowRight className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
            </div>
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
