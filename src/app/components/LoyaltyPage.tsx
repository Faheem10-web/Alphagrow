import React from "react";
import { ShoppingCart, User, Gift, Calendar, Star, PlusCircle, Sparkles, ShieldCheck, Truck, Tag, ChevronRight, ArrowRight } from "lucide-react";

interface LoyaltyPageProps {
  cartCount: number;
  onOpenCart: () => void;
}

// Vector Barcode Component
const Barcode = () => {
  const barWidths = [
    3, 1, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 
    2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 3, 1
  ];
  return (
    <div className="flex items-stretch justify-center h-10 px-4 bg-white" style={{ gap: 1.8 }}>
      {barWidths.map((w, idx) => (
        <div
          key={idx}
          className="bg-gray-900"
          style={{
            width: w,
            opacity: idx % 5 === 0 ? 0.75 : 1
          }}
        />
      ))}
    </div>
  );
};

export default function LoyaltyPage({ cartCount, onOpenCart }: LoyaltyPageProps) {
  return (
    <div className="w-full bg-[#f8fafc] text-gray-900 select-none pb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-30 flex flex-col pt-1.5"
        style={{
          background: "linear-gradient(180deg, #02616A 0%, #02616A 70%, #014f57 100%)",
          boxShadow: "0 8px 30px rgba(2, 97, 106, 0.15)",
        }}
      >
        <div className="flex items-center justify-between px-4 pt-2.5 pb-3">
          <span className="text-white text-[20px] font-bold tracking-tight">
            Loyalty
          </span>
          <div className="flex items-center gap-2">
            <button
              className="relative w-9 h-9 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer"
              onClick={onOpenCart}
              title="Cart"
            >
              <ShoppingCart style={{ width: 19, height: 19, color: "white" }} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-amber-500 text-white font-black rounded-full flex items-center justify-center border-2 border-[#005361] shadow-md"
                  style={{ minWidth: 17, height: 17, fontSize: 9, padding: "0 3px" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="w-9 h-9 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer"
              title="Profile"
            >
              <User style={{ width: 19, height: 19, color: "white" }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO REWARDS SECTION ────────────────────────────────────────── */}
      <div className="relative px-4 pt-5 pb-4 bg-white border-b border-gray-100 flex items-center justify-between overflow-hidden">
        <div className="flex flex-col z-10 max-w-[60%]">
          <h2 className="text-[24px] font-black text-gray-900 tracking-tight leading-tight">
            Your Rewards
          </h2>
          <p className="text-[13.5px] mt-1.5 text-gray-600 font-medium">
            Shop more. <span className="text-[#02616A] font-bold">Earn more.</span> Save more.
          </p>
          <p className="text-[11.5px] mt-2.5 text-gray-400 font-normal leading-relaxed">
            Thank you for being a valuable Alphagro member.
          </p>
        </div>

        {/* Vector SVG Premium Shopping Bag */}
        <div className="relative z-10 mr-1">
          <svg width="105" height="115" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-md">
            {/* Peeking Veggies & Items */}
            {/* Salad Greens */}
            <path d="M30 35 C22 18, 38 12, 45 28 Z" fill="#22C55E" />
            <path d="M42 32 C38 15, 52 10, 58 26 Z" fill="#4ADE80" />
            <path d="M55 35 C52 18, 68 15, 72 30 Z" fill="#15803D" />
            {/* Tomato */}
            <circle cx="28" cy="38" r="9" fill="#EF4444" />
            <path d="M28 29 L28 26" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M26 29 C27 29 28 28 28 26 C28 28 29 29 30 29" fill="#15803D" />
            {/* Orange Carrot */}
            <path d="M72 26 L80 42 L74 44 Z" fill="#F97316" />
            <path d="M72 26 C68 20, 68 22, 66 16" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M72 26 C72 20, 74 22, 76 16" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />

            {/* Bag Body shadow/depth */}
            <path d="M15 36 L85 36 L78 102 L22 102 Z" fill="#013f37" opacity="0.1" />
            {/* Bag Body */}
            <path d="M18 38 L82 38 L75 100 L25 100 Z" fill="#024D44" />
            <path d="M18 38 L25 100 L25 38 Z" fill="#013630" /> {/* Side Shadow */}
            
            {/* White Logo Leaf */}
            <path d="M50 56 C44 56 40 62 40 66 C40 70 44 74 50 74 C56 74 60 70 60 66 C60 62 56 56 50 56 Z" fill="#FFFFFF" opacity="0.9" />
            <path d="M50 74 L50 56" stroke="#024D44" strokeWidth="1.2" />
            <path d="M44 67 C46 67 48 65 50 62" stroke="#024D44" strokeWidth="0.8" />
            
            {/* ALPHAGRO Text */}
            <text x="50" y="85" fill="#FFFFFF" fontSize="6.5" fontWeight="900" textAnchor="middle" letterSpacing="0.4" fontFamily="sans-serif">ALPHAGRO</text>
            
            {/* Gold Handles */}
            <path d="M36 38 C36 22, 45 22, 45 38" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M55 38 C55 22, 64 22, 64 38" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* ── DIGITAL MEMBER CARD ─────────────────────────────────────────── */}
      <div className="px-4 mt-4">
        <div
          className="w-full rounded-[28px] p-5 relative overflow-hidden flex flex-col justify-between"
          style={{
            background: "linear-gradient(135deg, #02616A 0%, #004d40 100%)",
            boxShadow: "0 12px 24px -6px rgba(2, 97, 106, 0.45)",
            height: 205
          }}
        >
          {/* Golden background wave highlights */}
          <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
            <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-50 180 C100 120, 200 220, 450 130" stroke="#F59E0B" strokeWidth="15" strokeLinecap="round" />
              <path d="M-50 210 C150 150, 220 250, 450 160" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>

          {/* Card Top Row */}
          <div className="flex items-center justify-between z-10">
            {/* Logo */}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-white/95 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 1 C3 1 2 4 2 6 C2 8 3.5 9 5 9 C6.5 9 8 8 8 6 C8 4 7 1 5 1 Z" fill="#02616A" />
                </svg>
              </div>
              <span className="text-white text-xs font-black tracking-widest">ALPHAGRO</span>
            </div>

            {/* Active Pill Badge */}
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-white font-bold uppercase tracking-wider">Active</span>
            </div>
          </div>

          {/* Card Middle Row */}
          <div className="flex items-end justify-between mt-3.5 z-10">
            <div className="flex flex-col">
              {/* Gold Badge */}
              <div className="inline-flex items-center gap-1 bg-[#EAB308] text-gray-900 px-2.5 py-0.5 rounded-md shadow-xs mb-1.5">
                <Sparkles style={{ width: 10, height: 10, fill: "#111827" }} />
                <span className="text-[9px] font-black uppercase tracking-wider">GOLD MEMBER</span>
              </div>

              {/* Member details */}
              <h3 className="text-white text-[17px] font-bold tracking-tight">Faheem A V</h3>
              <p className="text-white/60 text-[11px] font-medium mt-0.5 tracking-wider">AG 88 24 9901 0042</p>
            </div>

            {/* Points Balance display */}
            <div className="flex flex-col items-end leading-none">
              <span className="text-[#EAB308] text-[34px] font-black tracking-tight">2,450</span>
              <span className="text-white/80 text-[10px] font-black uppercase tracking-widest mt-1">POINTS</span>
            </div>
          </div>

          {/* Barcode box */}
          <div className="w-full bg-white rounded-xl py-1.5 px-3.5 flex flex-col items-center justify-between gap-1 shadow-md mt-3 z-10">
            <Barcode />
            <span className="text-gray-400 text-[8.5px] font-bold uppercase tracking-wider">
              Show this barcode at the checkout
            </span>
          </div>
        </div>
      </div>

      {/* ── REWARDS BALANCE BLOCK ───────────────────────────────────────── */}
      <div className="px-4 mt-5">
        <div className="w-full bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <h4 className="text-gray-500 text-[13px] font-bold uppercase tracking-wider">
            Rewards Balance
          </h4>
          
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-black text-gray-900 tracking-tight">12,450</span>
              <span className="text-gray-400 text-sm font-semibold">Points</span>
            </div>

            {/* Green Rewards Value bubble */}
            <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#DCFCE7] px-3.5 py-2 rounded-2xl">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Gift style={{ width: 15, height: 15 }} />
              </div>
              <div className="flex flex-col">
                <span className="text-emerald-700 text-sm font-extrabold leading-none">₹245</span>
                <span className="text-emerald-600/80 text-[9px] font-bold mt-0.5">Rewards Value</span>
              </div>
            </div>
          </div>

          {/* Progression Indicator */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
              <span>Gold Tier</span>
              <span className="text-[#02616A]">2,550 pts to Platinum</span>
            </div>
            
            {/* Custom styled progress bar */}
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500" 
                style={{ 
                  width: "72%",
                  background: "linear-gradient(90deg, #02616A 0%, #0D9488 100%)"
                }} 
              />
            </div>
          </div>

          <hr className="my-4.5 border-gray-100" />

          {/* Three Column Footer stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7.5 h-7.5 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                <Calendar style={{ width: 14, height: 14 }} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 font-bold uppercase">Valid till</span>
                <span className="text-[11px] text-gray-700 font-extrabold leading-tight">31 Dec 2025</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-x border-gray-100 px-2 justify-center">
              <div className="w-7.5 h-7.5 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                <Star style={{ width: 14, height: 14 }} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 font-bold uppercase">Expired</span>
                <span className="text-[11px] text-gray-700 font-extrabold leading-tight">200 Points</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-2 justify-end">
              <div className="w-7.5 h-7.5 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                <PlusCircle style={{ width: 14, height: 14 }} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 font-bold uppercase">Gained</span>
                <span className="text-[11px] text-gray-700 font-extrabold leading-tight">690 Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MEMBER BENEFITS CAROUSEL ────────────────────────────────────── */}
      <div className="mt-5.5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h4 className="text-gray-900 text-[15.5px] font-black tracking-tight">
            Member Benefits
          </h4>
          <button className="flex items-center gap-0.5 text-xs font-bold text-[#02616A] active:opacity-75">
            View all <ChevronRight style={{ width: 14, height: 14 }} />
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="flex overflow-x-auto gap-3 px-4 hide-sb py-1">
          {/* Benefit 1 */}
          <div className="flex-shrink-0 w-32 bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] flex flex-col justify-between h-28">
            <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#02616A]">
              <Sparkles style={{ width: 16, height: 16 }} />
            </div>
            <div>
              <p className="text-[11.5px] font-extrabold text-gray-900 leading-tight">Exclusive Discounts</p>
              <p className="text-[9.5px] text-gray-400 mt-0.5 leading-tight">Special prices for members</p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex-shrink-0 w-32 bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] flex flex-col justify-between h-28">
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-[#EAB308]">
              <Star style={{ width: 16, height: 16, fill: "#EAB308" }} />
            </div>
            <div>
              <p className="text-[11.5px] font-extrabold text-gray-900 leading-tight">Earn More Points</p>
              <p className="text-[9.5px] text-gray-400 mt-0.5 leading-tight">Get extra points on order</p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="flex-shrink-0 w-32 bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] flex flex-col justify-between h-28">
            <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-emerald-600">
              <Truck style={{ width: 16, height: 16 }} />
            </div>
            <div>
              <p className="text-[11.5px] font-extrabold text-gray-900 leading-tight">Free Delivery</p>
              <p className="text-[9.5px] text-gray-400 mt-0.5 leading-tight">Free shipping on orders</p>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="flex-shrink-0 w-32 bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] flex flex-col justify-between h-28">
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Tag style={{ width: 16, height: 16 }} />
            </div>
            <div>
              <p className="text-[11.5px] font-extrabold text-gray-900 leading-tight">Member Offers</p>
              <p className="text-[9.5px] text-gray-400 mt-0.5 leading-tight">Access to custom deals</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── VIEW REWARDS & OFFERS CTA BUTTON ──────────────────────────────── */}
      <div className="px-4 mt-6">
        <button
          className="w-full h-12 rounded-2xl bg-[#014D44] hover:bg-[#003B33] active:scale-95 text-white flex items-center justify-between px-5 font-bold tracking-tight shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Gift style={{ width: 18, height: 18 }} />
            <span>VIEW REWARDS & OFFERS</span>
          </div>
          <ArrowRight style={{ width: 18, height: 18 }} />
        </button>
      </div>
    </div>
  );
}
