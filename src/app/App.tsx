import { useState, useEffect, useRef, useCallback } from "react";
import {
  ShoppingCart, User, MapPin, ChevronDown, Search, Mic, Camera,
  Heart, Plus, Minus, Home, LayoutGrid, Award, Tag, BookOpen,
  X, Star, ShoppingBag,
} from "lucide-react";
import banner1 from "../assets/b-1.png";
import bsmall from "../assets/b-small.png";
// import logo from "../assets/logo.png";
import pocoBanner from "../assets/poco_banner.png";
import bannerImg from "../assets/newb.png";
import demoImg from "../assets/demo.png";
import imgChips from "../assets/multigrain_chips.jpg";
import imgCoffee from "../assets/bru_coffee.jpg";
import imgMilk from "../assets/organic_milk.jpg";
import imgRice from "../assets/matta_rice.jpg";
import imgVeggies from "../assets/fresh_vegetables.jpg";
import imgOil from "../assets/sunflower_oil.jpg";
import imgTea from "../assets/tea_powder.jpg";
import imgEggs from "../assets/fresh_eggs.jpg";
import imgHoney from "../assets/forest_honey.jpg";
import imgAtta from "../assets/wheat_atta.jpg";

import imgNewSunflowerOil from "../assets/new_sunflower_oil.jpg";
import imgNewWheatAtta from "../assets/new_wheat_atta.jpg";
import imgNewOrganicMilk from "../assets/new_organic_milk.jpg";
import imgNewMattaRice from "../assets/new_matta_rice.jpg";
import imgNewVeggiePack from "../assets/new_veggie_pack.jpg";

import diabeticCardSnacks from "../assets/diabetic_card_snacks.png";
import diabeticCardBeverages from "../assets/diabetic_card_beverages.png";
import diabeticCardSweeteners from "../assets/diabetic_card_sweeteners.png";
import diabeticCardRices from "../assets/diabetic_card_rices.png";
import diabeticCardHealth from "../assets/diabetic_card_health.png";
import diabeticCardEssentials from "../assets/diabetic_card_essentials.png";

import popCatFruits from "../assets/pop_cat_fruits.png";
import popCatDairy from "../assets/pop_cat_dairy.png";
import popCatSnacks from "../assets/pop_cat_snacks.png";
import popCatRice from "../assets/pop_cat_rice.png";
import popCatPersonal from "../assets/pop_cat_personal.png";
import popCatHome from "../assets/pop_cat_home.png";
import popCatBaby from "../assets/pop_cat_baby.png";
import popCatMasala from "../assets/pop_cat_masala.png";
import CategoriesPage from "./components/CategoriesPage";
import ProductDetailsPage from "./components/ProductDetailsPage";

// ─── Types ────────────────────────────────────────────────────────────────────

type Badge = "NEW" | "OFFER" | "BEST SELLER";

interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  discount: number;
  badge: Badge;
  img: string;
  desc?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEAL = "#02616A";

const POPULAR_CATEGORIES_8 = [
  { id: "fruits",   nameLine1: "Fruits &",     nameLine2: "Vegetables", img: popCatFruits },
  { id: "dairy",    nameLine1: "Dairy &",      nameLine2: "Eggs",       img: popCatDairy },
  { id: "snacks",   nameLine1: "Snacks &",     nameLine2: "Munchies",   img: popCatSnacks },
  { id: "rice",     nameLine1: "Rice, Atta &", nameLine2: "Pulses",     img: popCatRice },
  { id: "personal", nameLine1: "Personal",     nameLine2: "Care",       img: popCatPersonal },
  { id: "home",     nameLine1: "Home",         nameLine2: "Care",       img: popCatHome },
  { id: "baby",     nameLine1: "Baby",         nameLine2: "Care",       img: popCatBaby },
  { id: "masala",   nameLine1: "Masala &",     nameLine2: "Spices",     img: popCatMasala },
];

const DIABETIC_CARDS = [
  { id: "d-snacks", title: "Diabetic Snacks", img: diabeticCardSnacks },
  { id: "d-bev", title: "Diabetic Beverages", img: diabeticCardBeverages },
  { id: "d-sweet", title: "Diabetic Sweeteners", img: diabeticCardSweeteners },
  { id: "d-rice", title: "Diabetic Rices & Flours", img: diabeticCardRices },
  { id: "d-health", title: "Diabetic Health Foods", img: diabeticCardHealth },
  { id: "d-essentials", title: "Diabetic Essentials", img: diabeticCardEssentials },
];

const HERO_BANNERS = [
  {
    id: 1,
    title: "Seasonal specials",
    subtitle: "Best prices on seasonal fruits & veggies",
    cta: "Explore",
    img: banner1,
    isFullImage: true,
  },
  {
    id: 2,
    title: "POCO M8x 5G",
    subtitle: "Coming soon",
    cta: "Explore",
    img: pocoBanner,
    isFullImage: true,
  },
  {
    id: 3,
    title: "Fresh daily arrivals",
    subtitle: "Farm-fresh produce, right to your door",
    cta: "Order Now",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop",
  },
];

const ONAM_BANNERS = [
  { id: 1, subtitle: "Wishing you joy & prosperity" },
  { id: 2, subtitle: "Special festive deals await you" },
  { id: 3, subtitle: "Gift hampers for your loved ones" },
];

const QUICK_CATS = [
  { id: "all", label: "All" },
  { id: "fruits", label: "Fruits" },
  { id: "vegetables", label: "Vegetables" },
  { id: "dairy", label: "Dairy & Eggs" },
  { id: "snacks", label: "Snacks" },
  { id: "beverages", label: "Beverages" },
  { id: "staples", label: "Staples" },
  { id: "personal", label: "Personal Care" },
  { id: "homecare", label: "Home Care" },
];

const POP_CATS = [
  { id: "fv",     label: "Fruits & Veg",   img: "https://images.unsplash.com/photo-1506484381205-f7945653044d?w=160&auto=format&fit=crop" },
  { id: "db",     label: "Dairy & Bread",  img: "https://images.unsplash.com/photo-1678314745317-35103ab002e7?w=160&auto=format&fit=crop" },
  { id: "ra",     label: "Rice & Atta",    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=160&auto=format&fit=crop" },
  { id: "snacks", label: "Snacks",         img: "https://images.unsplash.com/photo-1699666397768-0126340e880a?w=160&auto=format&fit=crop" },
  { id: "bev",    label: "Beverages",      img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=160&auto=format&fit=crop" },
  { id: "pc",     label: "Personal Care",  img: "https://images.unsplash.com/photo-1594055103006-7871176f1a7e?w=160&auto=format&fit=crop" },
];

const PRODUCTS_NEW: Product[] = [
  { id: "ladies-fingers", name: "Ladies' Fingers", weight: "500 g", price: 30, originalPrice: 48.75, discount: 38, badge: "BEST", desc: "Fresh green okra / bhindi, locally sourced, tender and rich in fiber.", img: "https://images.unsplash.com/photo-1449339090384-d2cbf643f5f2?w=600&auto=format&fit=crop" },
  { id: "p1", name: "Premium Sunflower Oil",weight: "1 L",  price: 119, originalPrice: 180, discount: 34, badge: "NEW",   desc: "100% Pure & Refined | Cold Pressed", img: imgNewSunflowerOil },
  { id: "p2", name: "Whole Wheat Atta",    weight: "5 kg",  price: 199, originalPrice: 275, discount: 27, badge: "NEW",   desc: "Chakki Fresh | 100% Whole Wheat", img: imgNewWheatAtta },
  { id: "p3", name: "Organic Milk",        weight: "1 L",   price: 75,  originalPrice: 90,  discount: 17, badge: "NEW",   desc: "Pasteurized | Certified Organic", img: imgNewOrganicMilk },
  { id: "p4", name: "Palakkad Matta Rice", weight: "5 kg",  price: 449, originalPrice: 549, discount: 18, badge: "NEW",   desc: "Whole Grain | Naturally Healthy", img: imgNewMattaRice },
  { id: "p5", name: "Fresh Veggie Pack",   weight: "500 g", price: 75,  originalPrice: 95,  discount: 21, badge: "NEW",   desc: "Tomatoes · Carrots · Capsicum",   img: imgNewVeggiePack },
];

const PRODUCTS_BEST: Product[] = [
  { id: "ladies-fingers", name: "Ladies' Fingers", weight: "500 g", price: 30, originalPrice: 48.75, discount: 38, badge: "BEST", desc: "Fresh green okra / bhindi, locally sourced, tender and rich in fiber.", img: "https://images.unsplash.com/photo-1449339090384-d2cbf643f5f2?w=600&auto=format&fit=crop" },
  { id: "bs1", name: "BRU Instant Coffee",  weight: "200 g", price: 299, originalPrice: 379, discount: 21, badge: "OFFER", desc: "Rich Aroma | 100% Pure Coffee",   img: imgCoffee },
  { id: "bs2", name: "Organic Milk",        weight: "1 L",   price: 75,  originalPrice: 90,  discount: 17, badge: "OFFER", desc: "Pasteurized | Certified Organic", img: imgMilk },
  { id: "bs3", name: "Fresh Veggie Pack",   weight: "500 g", price: 75,  originalPrice: 95,  discount: 21, badge: "BEST",  desc: "Tomatoes · Carrots · Capsicum",   img: imgVeggies },
  { id: "bs4", name: "Palakkad Matta Rice", weight: "5 kg",  price: 449, originalPrice: 549, discount: 18, badge: "BEST",  desc: "Whole Grain | Naturally Healthy", img: imgRice },
  { id: "bs5", name: "Multigrain Chips",    weight: "200 g", price: 98,  originalPrice: 128, discount: 23, badge: "BEST",  desc: "7 Grain Blend | 40% Less Fat",    img: imgChips },
];

const PRODUCTS_DEALS: Product[] = [
  { id: "d1", name: "Whole Wheat Atta",    weight: "5 kg",  price: 199, originalPrice: 275, discount: 27, badge: "OFFER", desc: "Chakki Fresh | 100% Whole Wheat", img: imgAtta },
  { id: "d2", name: "Farm Fresh Eggs",     weight: "6 pcs", price: 49,  originalPrice: 68,  discount: 28, badge: "OFFER", desc: "Grade A Brown Eggs | Pasture Raised", img: imgEggs },
  { id: "d3", name: "Premium Black Tea",   weight: "250 g", price: 79,  originalPrice: 128, discount: 38, badge: "OFFER", desc: "Organic Loose Leaf | Darjeeling Blend", img: imgTea },
  { id: "d4", name: "Organic Forest Honey",weight: "450 g", price: 159, originalPrice: 255, discount: 38, badge: "OFFER", desc: "Raw & Unfiltered | 100% Natural", img: imgHoney },
  { id: "d5", name: "Premium Sunflower Oil",weight: "1 L",  price: 119, originalPrice: 180, discount: 34, badge: "OFFER", desc: "100% Pure & Refined | Cold Pressed", img: imgOil },
];

const ALL_PRODUCTS = [
  ...PRODUCTS_NEW,
  ...PRODUCTS_BEST,
  ...PRODUCTS_DEALS,
  { id: "ladies-fingers-500g", name: "Ladies' Fingers", weight: "500 g", price: 30, originalPrice: 48.75, discount: 38, badge: "BEST", desc: "Fresh green okra / bhindi, locally sourced, tender and rich in fiber.", img: "https://images.unsplash.com/photo-1449339090384-d2cbf643f5f2?w=600&auto=format&fit=crop" },
  { id: "ladies-fingers-250g", name: "Ladies' Fingers", weight: "250 g", price: 15.5, originalPrice: 25, discount: 38, badge: "BEST", desc: "Fresh green okra / bhindi, locally sourced, tender and rich in fiber.", img: "https://images.unsplash.com/photo-1449339090384-d2cbf643f5f2?w=600&auto=format&fit=crop" }
];

const PROMO_CARDS_6 = [
  {
    id: "card-1",
    title: "Fresh Picks",
    subtitle: "Fresh every day",
    offer: "UP TO 40% OFF",
    bg: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%)",
    badgeBg: "#EA580C",
    textColor: "#005361",
    subColor: "#64748B",
    img: imgVeggies,
  },
  {
    id: "card-2",
    title: "Pantry Restock",
    subtitle: "Stock up & save",
    offer: "UP TO 35% OFF",
    bg: "linear-gradient(135deg, #FEFCE8 0%, #FEF9C3 50%, #FEF08A 100%)",
    badgeBg: "#CA8A04",
    textColor: "#005361",
    subColor: "#64748B",
    img: imgOil,
  },
  {
    id: "card-3",
    title: "Breakfast Favourites",
    subtitle: "Start fresh every day",
    offer: "FROM ₹49",
    bg: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%)",
    badgeBg: "#0284C7",
    textColor: "#005361",
    subColor: "#64748B",
    img: imgMilk,
  },
  {
    id: "card-4",
    title: "Snack Time",
    subtitle: "Treat yourself today",
    offer: "UP TO 25% OFF",
    bg: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FECDD3 100%)",
    badgeBg: "#E11D48",
    textColor: "#005361",
    subColor: "#64748B",
    img: imgChips,
  },
  {
    id: "card-5",
    title: "Daily Essentials",
    subtitle: "Everything you need",
    offer: "DEALS FROM ₹49",
    bg: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 50%, #BBF7D0 100%)",
    badgeBg: "#0D9488",
    textColor: "#005361",
    subColor: "#64748B",
    img: imgHoney,
  },
  {
    id: "card-6",
    title: "Onam Specials",
    subtitle: "Celebrate with fresh picks",
    offer: "UP TO 50% OFF",
    bg: "linear-gradient(135deg, #005361 0%, #004450 50%, #003640 100%)",
    badgeBg: "#EAB308",
    badgeTextColor: "#005361",
    textColor: "#FFFFFF",
    subColor: "rgba(255, 255, 255, 0.85)",
    img: imgRice,
    isOnam: true,
  },
];

const ONAM_GRADIENTS = [
  "linear-gradient(135deg, #c97b06 0%, #a35c08 50%, #7d420a 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #d97706 60%, #b45309 100%)",
  "linear-gradient(135deg, #ea580c 0%, #c2410c 60%, #9a3412 100%)",
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useBannerSwipe(total: number, autoMs = 3500) {
  const [idx, setIdx] = useState(0);
  const touchX = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => setIdx(i => (i + 1) % total), [total]);

  const resetTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(advance, autoMs);
  }, [advance, autoMs]);

  useEffect(() => {
    resetTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [resetTimer]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) {
      setIdx(i => dx < 0 ? (i + 1) % total : (i - 1 + total) % total);
      resetTimer();
    }
    touchX.current = null;
  };
  const goTo = (i: number) => { setIdx(i); resetTimer(); };

  return { idx, onTouchStart, onTouchEnd, goTo };
}

// ─── Quick-category icon ──────────────────────────────────────────────────────

function QuickIcon({ id, active, color, size = 20 }: { id: string; active: boolean; color: string; size?: number }) {
  const c = color;
  const s = { width: size, height: size, shapeRendering: "geometricPrecision" } as const;

  if (id === "all") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.3)" : "rgba(0,83,97,0.2)") : "none"} />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.3)" : "rgba(0,83,97,0.2)") : "none"} />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.3)" : "rgba(0,83,97,0.2)") : "none"} />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.3)" : "rgba(0,83,97,0.2)") : "none"} />
    </svg>
  );

  if (id === "fruits") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20.5C7.5 20.5 4 17 4 12.5C4 8.5 7 5.5 11 5.05C12 3.5 13.5 2.5 15.5 2.5C15.5 4.5 14.5 6 13 6.8C17 7.5 20 10.5 20 14.5C20 18 16.5 20.5 12 20.5Z" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.25)" : "rgba(0,83,97,0.15)") : "none"} />
      <path d="M12 8.5V12.5" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  if (id === "vegetables") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21Z" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.25)" : "rgba(0,83,97,0.15)") : "none"} />
      <path d="M12 3.5C12 8 15.5 11.5 20 11.5" stroke={c} strokeWidth="2" />
      <path d="M12 3.5C12 8 8.5 11.5 4 11.5" stroke={c} strokeWidth="2" />
    </svg>
  );

  if (id === "dairy") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2.5H14V5L16 7.5V19.5C16 20.6 15.1 21.5 14 21.5H8C6.9 21.5 6 20.6 6 19.5V7.5L8 5V2.5Z" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.25)" : "rgba(0,83,97,0.15)") : "none"} />
      <line x1="6" y1="11.5" x2="16" y2="11.5" strokeWidth="2" />
      <circle cx="18.5" cy="17" r="2.5" stroke={c} strokeWidth="2" fill={active ? c : "none"} />
    </svg>
  );

  if (id === "snacks") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 6.5L6.5 20.5H17.5L19 6.5H5Z" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.25)" : "rgba(0,83,97,0.15)") : "none"} />
      <path d="M4 6.5C4 6.5 7 4.5 12 4.5C17 4.5 20 6.5 20 6.5" strokeWidth="2" />
      <path d="M9.5 11L12 13.5L14.5 11" strokeWidth="2" />
    </svg>
  );

  if (id === "beverages") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8.5H18L16.5 20.5H7.5L6 8.5Z" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.25)" : "rgba(0,83,97,0.15)") : "none"} />
      <line x1="4.5" y1="8.5" x2="19.5" y2="8.5" strokeWidth="2.2" />
      <path d="M14 8.5L16 2.5H18" strokeWidth="2" />
    </svg>
  );

  if (id === "staples") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20C6 14 10 9 18 8.5" strokeWidth="2.2" />
      <path d="M6 20C6 14 11 12 20 14" strokeWidth="2.2" />
      <path d="M6 20L3.5 22" strokeWidth="2.2" />
      <circle cx="16" cy="7" r="1.5" fill={c} />
      <circle cx="19" cy="11" r="1.5" fill={c} />
      <circle cx="13" cy="11" r="1.5" fill={c} />
    </svg>
  );

  if (id === "personal") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="10" width="10" height="11" rx="2" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.25)" : "rgba(0,83,97,0.15)") : "none"} />
      <path d="M9.5 10V6.5C9.5 5.12 10.62 4 12 4C13.38 4 14.5 5.12 14.5 6.5V10" strokeWidth="2" />
      <path d="M12 4V2" strokeWidth="2" />
      <path d="M12 2H15" strokeWidth="2" />
    </svg>
  );

  if (id === "homecare") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 10.5L7 20.5H17L14 10.5H10Z" fill={active ? (color === "#FFFFFF" ? "rgba(255,255,255,0.25)" : "rgba(0,83,97,0.15)") : "none"} />
      <path d="M10 10.5V7.5H14V10.5" strokeWidth="2" />
      <path d="M12 7.5V3.5" strokeWidth="2" />
      <path d="M12 3.5H16" strokeWidth="2" />
    </svg>
  );

  return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="3" />
    </svg>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

interface CardProps {
  p: Product;
  cart: Record<string, number>;
  wish: Set<string>;
  onAdd: (id: string) => void;
  onSub: (id: string) => void;
  onWish: (id: string) => void;
  onOpen: (p: Product) => void;
  isFullCover?: boolean;
}

function ProductCard({ p, cart, wish, onAdd, onSub, onWish, onOpen, isFullCover }: CardProps) {
  const qty = cart[p.id] || 0;
  const liked = wish.has(p.id);

  return (
    <div
      className="flex-shrink-0 cursor-pointer active:scale-[0.97] transition-all duration-200 ease-out flex flex-col select-none"
      style={{
        width: 114,
        height: 218,
      }}
      onClick={() => onOpen(p)}
    >
      {/* Top Image Container Box */}
      <div className="relative overflow-visible" style={{ height: 104 }}>
        {/* Inner Rounded Image Box */}
        <div
          className={`w-full h-full rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden flex items-center justify-center ${
            isFullCover ? "p-0" : "p-1.5"
          }`}
        >
          {/* Wishlist Heart Icon */}
          <button
            className="absolute top-1.5 right-1.5 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white/85 backdrop-blur-xs shadow-2xs border border-white/40"
            onClick={e => { e.stopPropagation(); onWish(p.id); }}
          >
            <Heart style={{ width: 13, height: 13, color: liked ? "#ef4444" : "#64748b", fill: liked ? "#ef4444" : "none", strokeWidth: 1.8 }} />
          </button>

          {/* Product Photo */}
          <img
            src={p.img}
            alt={p.name}
            className={
              isFullCover
                ? "w-full h-full object-cover block"
                : "w-full h-full object-contain p-0 transform scale-110 transition-transform duration-200"
            }
          />
        </div>

        {/* Prominent Big Floating Plus Button (Always 100% visible on top across ALL sections!) */}
        <button
          className="absolute -bottom-2 -right-1 z-30 w-8 h-8 bg-white border-2 flex items-center justify-center shadow-md active:scale-90 transition-all duration-200"
          style={{ borderColor: TEAL, borderRadius: 9 }}
          onClick={e => { e.stopPropagation(); onAdd(p.id); }}
          title="Add item"
        >
          <Plus style={{ width: 18, height: 18, color: TEAL, strokeWidth: 3 }} />
          {qty > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 text-white font-black rounded-full flex items-center justify-center border border-white shadow-xs"
              style={{ width: 16, height: 16, fontSize: 9, backgroundColor: TEAL }}
            >
              {qty}
            </span>
          )}
        </button>
      </div>

      {/* Info details below image box (Zero Gap Tight Flow Layout) */}
      <div className="pt-2.5 px-0.5 pb-0.5">
        {/* Row 1: Big 3D Green Price Pill + Strikethrough Original Price */}
        <div className="flex items-center gap-1.5">
          <span
            className="font-black text-white rounded-md flex items-center justify-center relative"
            style={{
              fontSize: 13,
              backgroundColor: "#1E8E3E",
              boxShadow: "0 2.5px 0 #12642B",
              padding: "2.5px 7.5px",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.01em"
            }}
          >
            ₹{p.price}
          </span>
          <span className="line-through text-slate-400 font-medium" style={{ fontSize: 11.5 }}>
            ₹{p.originalPrice}
          </span>
        </div>

        {/* Row 2: Big Savings Text directly below price row */}
        <div className="mt-0.5">
          <span className="font-extrabold tracking-tight" style={{ fontSize: 11, color: "#1E8E3E", fontFamily: "'Inter', sans-serif" }}>
            ₹{p.originalPrice - p.price} OFF
          </span>
        </div>

        {/* Row 3: Product Name (Tight mt-0.5, line-clamp-2) */}
        <p
          className="line-clamp-2 font-semibold text-slate-900 leading-[1.2] tracking-tight mt-0.5"
          style={{ fontSize: 12.5, fontFamily: "'Inter', sans-serif" }}
        >
          {p.name}
        </p>

        {/* Row 4: Weight / Pack Info (Tight mt-0.5 sitting DIRECTLY under product name!) */}
        <p className="text-slate-500 font-medium tracking-tight mt-0.5" style={{ fontSize: 11 }}>
          {p.weight}
        </p>
      </div>
    </div>
  );
}

// ─── Banner dots ──────────────────────────────────────────────────────────────

function Dots({ total, idx, onGo }: { total: number; idx: number; onGo: (i: number) => void }) {
  return (
    <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onGo(i)}
          style={{
            height: 6,
            width: i === idx ? 18 : 6,
            borderRadius: 3,
            backgroundColor: i === idx ? "white" : "rgba(255,255,255,0.4)",
            transition: "width 280ms, background-color 280ms",
          }}
        />
      ))}
    </div>
  );
}

// ─── Product detail sheet ─────────────────────────────────────────────────────

function ProductSheet({
  p, cart, onAdd, onSub, onClose,
}: {
  p: Product;
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onSub: (id: string) => void;
  onClose: () => void;
}) {
  const qty = cart[p.id] || 0;
  const badgeBg = p.badge === "NEW" ? "#22c55e" : p.badge === "OFFER" ? "#f97316" : "#16a34a";

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end" onClick={onClose} style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
      <div
        className="bg-white rounded-t-3xl px-5 pt-4 pb-6"
        onClick={e => e.stopPropagation()}
        style={{ animation: "slideUp 280ms cubic-bezier(.4,0,.2,1)" }}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
        <button className="absolute top-4 right-5" onClick={onClose}>
          <X style={{ width: 20, height: 20, color: "#9ca3af" }} />
        </button>

        <div className="flex gap-4 mb-4">
          <img src={p.img} alt={p.name} className="rounded-2xl object-cover bg-gray-100 flex-shrink-0" style={{ width: 110, height: 110 }} />
          <div className="flex-1 min-w-0">
            {p.badge && p.badge !== "OFFER" && (
              <span className="text-white font-bold rounded-full" style={{ fontSize: 9, backgroundColor: badgeBg, padding: "2px 8px" }}>{p.badge}</span>
            )}
            <h3 className="font-bold text-gray-900 leading-snug mt-1" style={{ fontSize: 18 }}>{p.name}</h3>
            <p className="text-gray-500" style={{ fontSize: 12 }}>{p.weight}</p>
            <div className="flex items-baseline gap-1.5 mt-1.5 flex-wrap">
              <span className="font-bold text-gray-900" style={{ fontSize: 22 }}>₹{p.price}</span>
              <span className="text-gray-400 line-through" style={{ fontSize: 13 }}>₹{p.originalPrice}</span>
              <span className="font-semibold text-orange-500" style={{ fontSize: 11 }}>{p.discount}% off</span>
            </div>
          </div>
        </div>

        <p className="text-gray-500 leading-relaxed mb-5" style={{ fontSize: 12 }}>
          Premium quality product sourced directly from farms. 100% organic, freshly stocked daily and delivered to your doorstep within 8 minutes.
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 border border-gray-200 rounded-full" style={{ padding: "8px 16px" }}>
            <button onClick={() => onSub(p.id)}>
              <Minus style={{ width: 16, height: 16, color: TEAL }} />
            </button>
            <span className="font-bold text-center" style={{ fontSize: 15, minWidth: 20 }}>{qty}</span>
            <button onClick={() => onAdd(p.id)}>
              <Plus style={{ width: 16, height: 16, color: TEAL }} />
            </button>
          </div>
          <button
            className="flex-1 text-white font-semibold rounded-full"
            style={{ backgroundColor: TEAL, fontSize: 14, padding: "13px 0" }}
            onClick={() => { onAdd(p.id); onClose(); }}
          >
            Add to Cart · ₹{p.price}
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper to resolve product details including dynamic alt sizes (ending with -alt)
const resolveProduct = (id: string): Product | undefined => {
  // 1. Try exact match
  const p = ALL_PRODUCTS.find(p => p.id === id);
  if (p) return p;

  // 2. Handle alt sizes (ending with -alt)
  if (id.endsWith("-alt")) {
    const baseId = id.substring(0, id.length - 4);
    const base = ALL_PRODUCTS.find(p => p.id === baseId);
    if (base) {
      const baseWeight = base.weight;
      const numMatch = baseWeight.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
      let newWeight = "Alt Size";
      let newPrice = base.price * 0.52;
      let newOrig = base.originalPrice * 0.52;

      if (numMatch) {
        const val = parseFloat(numMatch[1]);
        const unit = numMatch[2].toLowerCase();
        if (unit === "g" || unit === "ml") {
          newWeight = `${Math.round(val / 2)} ${numMatch[2]}`;
        } else if (unit === "kg" || unit === "l") {
          newWeight = val === 1 ? `500 ${unit === "kg" ? "g" : "ml"}` : `${Math.round(val / 5)} ${numMatch[2]}`;
          if (val > 1) {
            newPrice = base.price * 0.22;
            newOrig = base.originalPrice * 0.22;
          }
        } else {
          newWeight = `${val * 2} ${numMatch[2]}`;
          newPrice = base.price * 1.85;
          newOrig = base.originalPrice * 1.85;
        }
      }

      return {
        ...base,
        id: id,
        name: base.name,
        weight: newWeight,
        price: parseFloat(newPrice.toFixed(newWeight.includes("250 g") || newWeight.includes("250g") || newPrice % 1 !== 0 ? 2 : 0)),
        originalPrice: parseFloat(newOrig.toFixed(2)),
        discount: base.discount,
      };
    }
  }
  return undefined;
};

// ─── Cart sheet ───────────────────────────────────────────────────────────────

function CartSheet({
  cart, onAdd, onSub, onClose,
}: {
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onSub: (id: string) => void;
  onClose: () => void;
}) {
  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);
  const cartValue = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = resolveProduct(id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end" onClick={onClose} style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
      <div
        className="bg-white rounded-t-3xl flex flex-col"
        style={{ maxHeight: "78%", animation: "slideUp 280ms cubic-bezier(.4,0,.2,1)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 flex-shrink-0 relative" style={{ padding: "16px 20px 12px" }}>
          <div className="w-10 h-1 bg-gray-200 rounded-full absolute top-3 left-1/2 -translate-x-1/2" />
          <h3 className="font-bold text-gray-900 mt-1" style={{ fontSize: 17 }}>My Cart</h3>
          <button onClick={onClose}><X style={{ width: 20, height: 20, color: "#9ca3af" }} /></button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto hide-sb" style={{ padding: "12px 20px" }}>
          {cartCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <ShoppingCart style={{ width: 60, height: 60, color: "#e5e7eb" }} />
              <p className="text-gray-500 mt-3" style={{ fontSize: 14 }}>Your cart is empty</p>
              <button
                className="text-white font-semibold rounded-full mt-4"
                style={{ backgroundColor: TEAL, fontSize: 13, padding: "10px 24px" }}
                onClick={onClose}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            Object.entries(cart).map(([id, qty]) => {
              const p = resolveProduct(id);
              if (!p || qty === 0) return null;
              return (
                <div key={id} className="flex items-center gap-3 border-b border-gray-50 last:border-0" style={{ padding: "12px 0" }}>
                  <img src={p.img} alt={p.name} className="rounded-xl object-cover bg-gray-100 flex-shrink-0" style={{ width: 56, height: 56 }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate" style={{ fontSize: 13 }}>{p.name}</p>
                    <p className="text-gray-400" style={{ fontSize: 11 }}>{p.weight}</p>
                    <p className="font-bold text-gray-900 mt-0.5" style={{ fontSize: 13 }}>₹{p.price}</p>
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-full flex-shrink-0" style={{ gap: 6, padding: "4px 8px" }}>
                    <button onClick={() => onSub(id)}><Minus style={{ width: 14, height: 14, color: TEAL }} /></button>
                    <span className="font-bold text-center" style={{ fontSize: 12, minWidth: 14 }}>{qty}</span>
                    <button onClick={() => onAdd(id)}><Plus style={{ width: 14, height: 14, color: TEAL }} /></button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartCount > 0 && (
          <div className="flex-shrink-0 border-t border-gray-100" style={{ padding: "16px 20px" }}>
            <div className="flex justify-between mb-3" style={{ fontSize: 14 }}>
              <span className="text-gray-500">Total ({cartCount} items)</span>
              <span className="font-bold text-gray-900">₹{cartValue}</span>
            </div>
            <button
              className="w-full text-white font-semibold rounded-full"
              style={{ backgroundColor: TEAL, fontSize: 14, padding: "14px 0" }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeCat, setActiveCat]       = useState("all");
  const [activeNav, setActiveNav]       = useState("home");
  const [cart, setCart]                 = useState<Record<string, number>>({});
  const [wish, setWish]                 = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePage, setActivePage]     = useState<"dashboard" | "product-details">("dashboard");

  const handleOpenProduct = (p: Product) => {
    setSelectedProduct(p);
    setActivePage("product-details");
  };
  const [showCart, setShowCart]         = useState(false);
  const [isScrolled, setIsScrolled]     = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(true);
  const isScrolledRef = useRef(false);
  const showBottomNavRef = useRef(true);
  const lastScrollTop = useRef(0);
  const tickingRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery]   = useState("");

  const hero  = useBannerSwipe(HERO_BANNERS.length, 3500);
  const onam  = useBannerSwipe(ONAM_BANNERS.length, 5000);

  const filteredProducts = ALL_PRODUCTS.filter(p => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      (p.desc && p.desc.toLowerCase().includes(q)) ||
      p.badge.toLowerCase().includes(q) ||
      p.weight.toLowerCase().includes(q)
    );
  });

  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);

  const addToCart = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const subFromCart = (id: string) => setCart(c => {
    const n = { ...c };
    if ((n[id] || 0) > 1) n[id]--;
    else delete n[id];
    return n;
  });
  const toggleWish = (id: string) => setWish(w => {
    const n = new Set(w);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

const CustomHomeIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 3.5 L4 9.5 V20 H20 V9.5 M20 9.5 L17.5 7.6" />
    <line x1="10" y1="16" x2="14" y2="16" />
  </svg>
);

const CustomCategoriesIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="4" y="4" width="6" height="6" rx="1.8" />
    <rect x="14" y="4" width="6" height="6" rx="1.8" />
    <rect x="4" y="14" width="6" height="6" rx="1.8" />
    <rect x="14" y="14" width="6" height="6" rx="1.8" />
  </svg>
);

const CustomLoyaltyIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="4" y="5" width="16" height="14" rx="3.5" />
    <line x1="8" y1="15" x2="12" y2="15" />
  </svg>
);

const CustomOffersIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <circle cx="9.5" cy="9.5" r="1.2" fill="currentColor" />
    <circle cx="14.5" cy="14.5" r="1.2" fill="currentColor" />
  </svg>
);

const CustomFlyersIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 20 C9 20 4 18 4 18 V6 C4 6 9 8 12 8 C15 8 20 6 20 6 V18 C20 18 15 20 12 20 Z" />
    <path d="M12 8 V20" />
  </svg>
);

  const navItems = [
    { id: "home",       label: "Home",       Icon: CustomHomeIcon },
    { id: "categories", label: "Categories", Icon: CustomCategoriesIcon },
    { id: "loyalty",    label: "Loyalty",    Icon: CustomLoyaltyIcon },
    { id: "offers",     label: "Offers",     Icon: CustomOffersIcon },
    { id: "flyers",     label: "Flyers",     Icon: CustomFlyersIcon },
  ];

  return (
    <>
      <style>{`
        .hide-sb::-webkit-scrollbar { display: none; }
        .hide-sb { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @media (max-width: 425px) {
          .mobile-hide { display: none !important; }
        }
        @media (max-width: 525px) {
          .main-container {
            align-items: flex-start !important;
            background-color: #f7f7f7 !important;
          }
          .phone-frame {
            border: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
            height: 100dvh !important;
          }
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center main-container" style={{ backgroundColor: "#3e2d24" }}>
        <div
          className="w-full flex flex-col relative overflow-hidden phone-frame"
          style={{
            maxWidth: 420,
            height: "min(840px, 92dvh)",
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            backgroundColor: "#f7f7f7",
            borderRadius: 36,
            border: "10px solid #1a1a1a",
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          {activePage === "product-details" && selectedProduct ? (
            <ProductDetailsPage
              onBack={() => setActivePage("dashboard")}
              cart={cart}
              setCart={setCart}
              wish={wish}
              setWish={setWish}
              product={selectedProduct}
            />
          ) : (
            <>
              {/* ── UNIFIED HEADER & COMPACT SCROLL NAVIGATION AREA (Home page only) ───────────── */}
              {activeNav === "home" && (
            <div
              className="flex-shrink-0 relative transition-all duration-300 ease-in-out z-30"
              onWheel={(e) => {
                if (scrollContainerRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                  scrollContainerRef.current.scrollTop += e.deltaY;
                }
              }}
              style={{
                background: isScrolled
                  ? "#FFFFFF"
                  : "linear-gradient(180deg, #02616A 0%, #02616A 70%, #014f57 100%)",
                boxShadow: isScrolled
                  ? "0 4px 16px rgba(0, 0, 0, 0.06)"
                  : "0 8px 30px rgba(2, 97, 106, 0.25)",
                borderBottom: isScrolled ? "1px solid #f1f5f9" : "none"
              }}
            >
              {/* Top row: Brand logo, Cart & Profile (collapses smoothly on scroll) */}
              <div
                className="flex items-center justify-between transition-all duration-300 ease-in-out px-4"
                style={{
                  height: isScrolled ? 0 : 54,
                  opacity: isScrolled ? 0 : 1,
                  paddingTop: isScrolled ? 0 : 10,
                  paddingBottom: isScrolled ? 0 : 4,
                  overflow: "hidden"
                }}
              >
                {/* Delivery Time Badge */}
                <div className="flex items-center">
                  <span 
                    className="text-white"
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    8 minutes
                  </span>
                </div>

                {/* Cart & Profile Circle Icons */}
                <div className="flex items-center gap-2">
                  <button
                    className="relative w-9 h-9 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white rounded-full flex items-center justify-center transition-all shadow-sm"
                    onClick={() => setShowCart(true)}
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
                    className="w-9 h-9 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white rounded-full flex items-center justify-center transition-all shadow-sm"
                    title="Profile"
                  >
                    <User style={{ width: 19, height: 19, color: "white" }} />
                  </button>
                </div>
              </div>

              {/* Location row (collapses smoothly on scroll) */}
              <div
                className="flex items-center justify-between transition-all duration-300 ease-in-out px-4"
                style={{
                  height: isScrolled ? 0 : 36,
                  opacity: isScrolled ? 0 : 1,
                  paddingBottom: isScrolled ? 0 : 8,
                  overflow: "hidden"
                }}
              >
                <button className="flex items-center gap-1.5 group text-white">
                  <MapPin style={{ width: 16, height: 16, color: "white" }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
                    HOME - Chelambra, Kerala
                  </span>
                  <ChevronDown style={{ width: 15, height: 15, color: "white", opacity: 0.9 }} />
                </button>
                <span style={{ color: "rgba(255, 255, 255, 0.95)", fontSize: 13, fontWeight: 500 }}>
                  14-Aug
                </span>
              </div>

              {/* Search Bar Row (Smoothly morphs search input + profile icon) */}
              <div
                className="transition-all duration-300 ease-in-out px-3.5"
                style={{
                  paddingTop: isScrolled ? 8 : 2,
                  paddingBottom: isScrolled ? 8 : 10,
                }}
              >
                <div className="flex items-center gap-2.5">
                  {/* Search Bar Input Surface */}
                  <div
                    className="flex-1 rounded-2xl flex items-center gap-2 transition-all duration-300 ease-in-out shadow-sm overflow-hidden"
                    style={{
                      height: isScrolled ? 38 : 42,
                      padding: isScrolled ? "0 12px" : "0 14px",
                      backgroundColor: isScrolled ? "#FFFFFF" : "#FFFFFF",
                      border: isScrolled ? "1px solid #e2e8f0" : "1px solid rgba(255,255,255,0.4)"
                    }}
                  >
                    <Search style={{ width: isScrolled ? 16 : 18, height: isScrolled ? 16 : 18, color: TEAL, flexShrink: 0 }} />
                    <input
                      className="flex-1 bg-transparent outline-none text-gray-800 text-[13.5px] font-normal placeholder:text-gray-400 placeholder:font-normal"
                      placeholder={isScrolled ? 'Search "atta & more"' : "Search groceries, fruits, snacks..."}
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                    
                    {/* Voice / Camera action cluster */}
                    <div
                      className="flex items-center transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0"
                      style={{
                        maxWidth: isScrolled ? 0 : 72,
                        opacity: isScrolled ? 0 : 1,
                        paddingLeft: isScrolled ? 0 : 8,
                        borderLeft: isScrolled ? "none" : "1px solid #e2e8f0",
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <button className="p-1 hover:bg-teal-50 rounded-lg text-teal-800 transition-colors" title="Voice Search">
                          <Mic style={{ width: 17, height: 17, color: TEAL }} />
                        </button>
                        <button className="p-1 hover:bg-teal-50 rounded-lg text-teal-800 transition-colors" title="Scan Barcode">
                          <Camera style={{ width: 17, height: 17, color: TEAL }} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Icon button on compact scroll state */}
                  <div
                    className="transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0"
                    style={{
                      width: isScrolled ? 36 : 0,
                      opacity: isScrolled ? 1 : 0,
                      marginLeft: isScrolled ? 4 : 0
                    }}
                  >
                    <button
                      className="w-9 h-9 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-100 text-teal-800 rounded-full flex items-center justify-center transition-all shadow-sm"
                      title="Profile"
                    >
                      <User style={{ width: 18, height: 18, color: TEAL }} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Navigation Bar (Compact height & 16px icon size on scroll) */}
              <div
                className="transition-all duration-300 ease-in-out"
                style={{
                  paddingTop: isScrolled ? 2 : 6,
                  paddingBottom: isScrolled ? 4 : 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <div className="flex overflow-x-auto hide-sb items-center" style={{ gap: isScrolled ? 10 : 8 }}>
                  {QUICK_CATS.map(cat => {
                    const active = activeCat === cat.id;
                    const itemColor = isScrolled
                      ? (active ? TEAL : "#475569")
                      : (active ? "#FFFFFF" : "rgba(255, 255, 255, 0.85)");

                    return (
                      <button
                        key={cat.id}
                        className="flex-shrink-0 flex flex-col items-center justify-center relative transition-all duration-300 ease-in-out"
                        style={{
                          padding: isScrolled ? "2px 2px" : "4px 2px",
                          minWidth: 58
                        }}
                        onClick={() => setActiveCat(cat.id)}
                      >
                        {/* Small Icon sitting directly above text label */}
                        <div className="flex items-center justify-center mb-0.5 transition-all duration-300">
                          <QuickIcon id={cat.id} active={active} color={itemColor} size={isScrolled ? 16 : 20} />
                        </div>

                        {/* Category Label */}
                        <span
                          className="transition-all duration-300 whitespace-nowrap"
                          style={{
                            fontSize: isScrolled ? 11 : 11.5,
                            fontWeight: active ? (isScrolled ? 700 : 600) : 500,
                            color: itemColor,
                            fontFamily: "'Inter', sans-serif"
                          }}
                        >
                          {cat.label}
                        </span>

                        {/* Active Underline Pill Bar */}
                        <span
                          className="rounded-full transition-all duration-300 mt-1"
                          style={{
                            width: active ? "100%" : 0,
                            height: isScrolled ? 2 : 2.5,
                            backgroundColor: isScrolled ? TEAL : "#FFFFFF",
                            opacity: active ? 1 : 0
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        {/* ── SCROLLABLE CONTENT ───────────────────────────────────────── */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto hide-sb bg-white"
          style={{
            paddingBottom: showBottomNav ? 68 : 12,
            transition: "padding-bottom 300ms ease-in-out"
          }}
          onScroll={(e) => {
            const scrollTop = e.currentTarget.scrollTop;
            const scrollHeight = e.currentTarget.scrollHeight;
            const clientHeight = e.currentTarget.clientHeight;

            if (!tickingRef.current) {
              window.requestAnimationFrame(() => {
                // Guard isScrolled state updates to prevent unnecessary React renders & layout reflows
                if (scrollTop > 45 && !isScrolledRef.current) {
                  isScrolledRef.current = true;
                  setIsScrolled(true);
                } else if (scrollTop <= 15 && isScrolledRef.current) {
                  isScrolledRef.current = false;
                  setIsScrolled(false);
                }

                // Guard showBottomNav state updates
                const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
                if (isAtBottom) {
                  if (!showBottomNavRef.current) {
                    showBottomNavRef.current = true;
                    setShowBottomNav(true);
                  }
                } else {
                  const diff = scrollTop - lastScrollTop.current;
                  if (scrollTop < 10) {
                    if (!showBottomNavRef.current) {
                      showBottomNavRef.current = true;
                      setShowBottomNav(true);
                    }
                  } else if (diff > 12) {
                    if (showBottomNavRef.current) {
                      showBottomNavRef.current = false;
                      setShowBottomNav(false);
                    }
                  } else if (diff < -12) {
                    if (!showBottomNavRef.current) {
                      showBottomNavRef.current = true;
                      setShowBottomNav(true);
                    }
                  }
                }
                lastScrollTop.current = scrollTop;
                tickingRef.current = false;
              });
              tickingRef.current = true;
            }
          }}
        >
          {/* Content Container */}
          <div className={activeNav === "categories" ? "bg-white" : "bg-white pb-6 min-h-full"}>
            {activeNav === "categories" ? (
              <CategoriesPage
                onBack={() => setActiveNav("home")}
                onSelectCategory={(catId) => {
                  if (catId.includes("fruit") || catId.includes("veg")) setActiveCat("fruits");
                  else if (catId.includes("dairy") || catId.includes("egg")) setActiveCat("dairy");
                  else if (catId.includes("snack") || catId.includes("chip")) setActiveCat("snacks");
                  else if (catId.includes("rice") || catId.includes("atta")) setActiveCat("staples");
                  else if (catId.includes("personal")) setActiveCat("personal");
                  else if (catId.includes("home") || catId.includes("clean")) setActiveCat("homecare");
                  else setActiveCat("all");
                  setActiveNav("home");
                }}
                cartCount={cartCount}
                onOpenCart={() => setShowCart(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            ) : searchQuery.trim() !== "" ? (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
                    Search Results for "{searchQuery}"
                  </p>
                  <button
                    style={{ fontSize: 13, fontWeight: 500, color: TEAL }}
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </button>
                </div>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 justify-items-center">
                    {filteredProducts.map(p => (
                      <ProductCard
                        key={p.id}
                        p={p}
                        cart={cart}
                        wish={wish}
                        onAdd={addToCart}
                        onSub={subFromCart}
                        onWish={toggleWish}
                        onOpen={handleOpenProduct}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400" style={{ fontSize: 14 }}>No products found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            ) : activeCat !== "all" ? (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>
                      {QUICK_CATS.find(c => c.id === activeCat)?.label}
                    </h2>
                    <p style={{ fontSize: 12, color: "#6b7280" }}>Fresh items delivered in 8 mins</p>
                  </div>
                  <button
                    className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                    style={{ backgroundColor: TEAL }}
                    onClick={() => setActiveCat("all")}
                  >
                    View All Categories
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 justify-items-center mt-2">
                  {ALL_PRODUCTS.filter(p => {
                    if (activeCat === "fruits") return p.name.toLowerCase().includes("fruit") || p.name.toLowerCase().includes("veggie") || p.id === "p5" || p.id === "bs3" || p.id === "ladies-fingers";
                    if (activeCat === "vegetables") return p.name.toLowerCase().includes("veggie") || p.id === "p5" || p.id === "bs3" || p.id === "ladies-fingers";
                    if (activeCat === "dairy") return p.name.toLowerCase().includes("milk") || p.name.toLowerCase().includes("egg") || p.id === "p3" || p.id === "d2";
                    if (activeCat === "snacks") return p.name.toLowerCase().includes("chip") || p.name.toLowerCase().includes("coffee") || p.id === "p1" || p.id === "p2";
                    if (activeCat === "beverages") return p.name.toLowerCase().includes("coffee") || p.name.toLowerCase().includes("tea") || p.id === "p2" || p.id === "d3";
                    if (activeCat === "staples") return p.name.toLowerCase().includes("rice") || p.name.toLowerCase().includes("atta") || p.name.toLowerCase().includes("oil") || p.id === "p4" || p.id === "d1";
                    if (activeCat === "personal") return p.name.toLowerCase().includes("honey") || p.id === "d4" || p.id === "p2";
                    if (activeCat === "homecare") return p.name.toLowerCase().includes("oil") || p.id === "d5" || p.id === "d4";
                    return true;
                  }).map(p => (
                    <ProductCard
                      key={p.id}
                      p={p}
                      cart={cart}
                      wish={wish}
                      onAdd={addToCart}
                      onSub={subFromCart}
                      onWish={toggleWish}
                      onOpen={handleOpenProduct}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* FEATURED ONAM BANNER WITH 6 PROMO CARDS (Natural Scroll, NO Shrinking Height Animation) */}
                <div
                  className="w-full relative overflow-hidden"
                  style={{ height: 230 }}
                >
                  {/* Background Banner Image */}
                  <img
                    src={bannerImg}
                    alt="Onam Sale Up to 80% Off"
                    className="w-full h-full object-cover object-center block"
                  />

                  {/* 6 Premium Grocery Promotional Cards */}
                  <div className="absolute bottom-2 left-0 right-0 overflow-x-auto hide-sb z-10 py-1">
                    <div className="flex gap-2.5 items-center px-3">
                      {PROMO_CARDS_6.map(card => (
                        <div
                          key={card.id}
                          className="flex-shrink-0 rounded-2xl overflow-hidden relative flex flex-col justify-between transition-all duration-300 hover:scale-105 active:scale-95 border"
                          style={{
                            width: 105,
                            height: 106,
                            background: card.bg,
                            padding: "8px 8px 5px",
                            borderColor: card.isOnam ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.8)",
                            boxShadow: "0 6px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
                          }}
                        >
                          {/* Top/Left Text Hierarchy */}
                          <div className="z-10 relative pr-1">
                            <p
                              className="font-bold leading-tight tracking-tight line-clamp-1"
                              style={{
                                fontSize: 10.5,
                                color: card.textColor,
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {card.title}
                            </p>
                            <p
                              className="leading-tight mt-0.5 line-clamp-1"
                              style={{
                                fontSize: 7.5,
                                color: card.subColor,
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {card.subtitle}
                            </p>
                            <div
                              className="inline-block rounded-md font-bold uppercase tracking-wider mt-1.5 px-1.5 py-0.5 shadow-xs"
                              style={{
                                fontSize: 7,
                                backgroundColor: card.badgeBg,
                                color: card.badgeTextColor || "#FFFFFF",
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {card.offer}
                            </div>
                          </div>

                          {/* Lower/Right Product Photography with Soft Oil-Pastel Blend */}
                          <div className="relative w-full h-[54px] mt-auto overflow-hidden flex items-end justify-end">
                            <img
                              src={card.img}
                              alt={card.title}
                              className="w-[68px] h-[54px] object-contain object-bottom transition-transform duration-300 hover:scale-110"
                              style={{
                                mixBlendMode: card.isOnam ? "normal" : "multiply",
                                filter: card.isOnam ? "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" : "contrast(1.05) brightness(0.98)",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>



            {/* POPULAR CATEGORIES (Exact 4-column x 2-row grid matching reference image 100%) */}
            <div style={{ marginTop: 24, paddingLeft: 14, paddingRight: 14 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 18, fontWeight: 700, lineHeight: "22px", color: "#111827" }}>Popular Categories</p>
                <button
                  onClick={() => setActiveNav("categories")}
                  style={{ fontSize: 13, fontWeight: 600, color: TEAL }}
                  className="active:opacity-75 transition-opacity"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-4 gap-x-2.5 gap-y-3.5">
                {POPULAR_CATEGORIES_8.map(cat => (
                  <div key={cat.id} className="flex flex-col items-center cursor-pointer group">
                    {/* Soft warm cream/peach card matching reference image */}
                    <div
                      className="w-full rounded-2xl overflow-hidden transition-transform duration-200 group-active:scale-95"
                      style={{
                        backgroundColor: "#F7ECE2",
                        aspectRatio: "0.85"
                      }}
                    >
                      <img
                        src={cat.img}
                        alt={cat.nameLine1 + " " + cat.nameLine2}
                        className="w-full h-full object-cover block"
                      />
                    </div>

                    {/* Centered Category Text Label directly below */}
                    <div className="mt-1.5 text-center flex flex-col items-center justify-center">
                      <span
                        className="font-medium tracking-tight text-[#374151] leading-[1.25]"
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                        {cat.nameLine1}
                      </span>
                      <span
                        className="font-medium tracking-tight text-[#374151] leading-[1.25]"
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                        {cat.nameLine2}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NEW ARRIVALS (Full-Bleed Commercial Product Photography) */}
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 18, fontWeight: 700, lineHeight: "22px", color: "#111827", padding: "0 12px", marginBottom: 10 }}>New Arrivals</p>
              <div className="flex overflow-x-auto hide-sb" style={{ gap: 8, padding: "0 12px 2px" }}>
                {PRODUCTS_NEW.map(p => (
                  <ProductCard key={p.id} p={p} cart={cart} wish={wish} onAdd={addToCart} onSub={subFromCart} onWish={toggleWish} onOpen={handleOpenProduct} isFullCover={true} />
                ))}
              </div>
            </div>



            {/* DIABETIC FOOD (100% Real Coded UI Component) */}
            <div style={{ padding: "24px 12px 0" }}>
              <div
                className="rounded-3xl p-3.5"
                style={{
                  background: "linear-gradient(165deg, #6B3628 0%, #54281E 45%, #3E1B13 100%)",
                  border: "1px solid rgba(245, 198, 168, 0.28)",
                  boxShadow: "0 12px 32px rgba(62, 27, 19, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.18)"
                }}
              >
                {/* Header */}
                <div className="mb-3 px-1">
                  <h2 className="text-white font-bold text-[19px] tracking-tight">Diabetic Food</h2>
                </div>

                {/* 3x2 Category Cards Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {DIABETIC_CARDS.map(card => (
                    <div
                      key={card.id}
                      className="rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform duration-200 shadow-sm border border-[#5a2c20]/40"
                    >
                      <img src={card.img} alt={card.title} className="w-full h-auto block" />
                    </div>
                  ))}
                </div>

                {/* Bottom Best Deals Strip matching reference screenshot 100% */}
                <button
                  className="w-full mt-3.5 py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-transform"
                  style={{
                    background: "linear-gradient(180deg, #FDE6D7 0%, #F8CEB4 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.45)",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
                  }}
                >
                  {/* Tilted tag icon with % sign inside */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#7A2215] fill-[#7A2215]">
                    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8zM7 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm4.5 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3-3a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                  <span className="font-extrabold text-[14.5px] tracking-tight" style={{ color: "#7A2215", fontFamily: "'Inter', sans-serif" }}>
                    Best deals
                  </span>
                </button>
              </div>
            </div>

            {/* BEST SELLERS (Inter Bold 700 18px) */}
            <div style={{ marginTop: 24 }}>
              <div style={{ padding: "0 12px", marginBottom: 10 }}>
                <div className="flex items-center gap-1.5">
                  <p style={{ fontSize: 18, fontWeight: 700, lineHeight: "22px", color: "#111827" }}>Best Sellers</p>
                  <div className="flex items-center justify-center rounded-full" style={{ width: 18, height: 18, backgroundColor: "#22c55e" }}>
                    <Star style={{ width: 10, height: 10, color: "white", fill: "white" }} />
                  </div>
                </div>
                <p style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.3, color: "#6b7280", marginTop: 2 }}>Most loved by our customers</p>
              </div>
              <div className="flex overflow-x-auto hide-sb" style={{ gap: 8, padding: "0 12px 2px" }}>
                {PRODUCTS_BEST.map(p => (
                  <ProductCard key={p.id} p={p} cart={cart} wish={wish} onAdd={addToCart} onSub={subFromCart} onWish={toggleWish} onOpen={handleOpenProduct} />
                ))}
              </div>
            </div>

            {/* TOP DEALS (Inter Bold 700 18px) */}
            <div style={{ marginTop: 24, paddingBottom: 20 }}>
              <div className="flex items-center justify-between" style={{ padding: "0 12px", marginBottom: 10 }}>
                <p style={{ fontSize: 18, fontWeight: 700, lineHeight: "22px", color: "#111827" }}>Top Deals</p>
                <button style={{ fontSize: 13, fontWeight: 600, color: TEAL }}>View All</button>
              </div>
              <div className="flex overflow-x-auto hide-sb" style={{ gap: 8, padding: "0 12px 2px" }}>
                {PRODUCTS_DEALS.map(p => (
                  <ProductCard key={p.id} p={p} cart={cart} wish={wish} onAdd={addToCart} onSub={subFromCart} onWish={toggleWish} onOpen={handleOpenProduct} />
                ))}
              </div>
            </div>
          </>
        )}
          </div>
        </div>

          {/* ── BOTTOM NAV (Inter Medium 500 / SemiBold 600) ──────────────────────── */}
          <nav
            className="absolute bottom-0 left-0 right-0 bg-white flex items-center justify-around z-20 transition-transform duration-300 ease-in-out"
            style={{
              borderTop: "1px solid #efefef",
              padding: "6px 8px calc(10px + env(safe-area-inset-bottom, 0px))",
              transform: showBottomNav ? "translateY(0)" : "translateY(100%)",
            }}
          >
            {navItems.map(({ id, label, Icon }) => {
              const active = activeNav === id;
              return (
                <button
                  key={id}
                  className="flex flex-col items-center relative"
                  style={{ gap: 2, padding: "6px 10px 4px" }}
                  onClick={() => setActiveNav(id)}
                >
                  <Icon style={{ width: 22, height: 22, color: active ? TEAL : "#b0b8c4" }} />
                  <span style={{ fontSize: 10.5, fontWeight: active ? 600 : 500, color: active ? TEAL : "#8e99a8", lineHeight: 1 }}>{label}</span>
                  <span
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: 12,
                      height: 3,
                      backgroundColor: active ? TEAL : "transparent",
                      marginTop: 4
                    }}
                  />
                </button>
              );
            })}
          </nav>
        </>
      )}



          {/* ── CART SHEET ───────────────────────────────────────────────── */}
          {showCart && (
            <CartSheet
              cart={cart}
              onAdd={addToCart}
              onSub={subFromCart}
              onClose={() => setShowCart(false)}
            />
          )}

        </div>
      </div>
    </>
  );
}
