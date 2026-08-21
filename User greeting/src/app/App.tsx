import { useState, useEffect, useRef, useCallback } from "react";
import {
  ShoppingCart, User, MapPin, ChevronDown, Search, Mic, Camera,
  Heart, Plus, Minus, Home, LayoutGrid, Award, Tag, BookOpen,
  X, Star, ShoppingBag,
} from "lucide-react";

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
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEAL = "#0d6b5a";

const HERO_BANNERS = [
  {
    id: 1,
    title: "This week's fresh picks",
    subtitle: "100% organic, delivered within 15 mins...",
    cta: "Shop Now",
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Fresh daily arrivals",
    subtitle: "Farm-fresh produce, right to your door",
    cta: "Order Now",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Seasonal specials",
    subtitle: "Best prices on seasonal fruits & veggies",
    cta: "Explore",
    img: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=400&auto=format&fit=crop",
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
  { id: "dairy", label: "Dairy" },
  { id: "snacks", label: "Snacks" },
  { id: "beverages", label: "Beverages" },
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
  { id: "p1", name: "Blueberries",      weight: "125 g", price: 98,  originalPrice: 120, discount: 23, badge: "NEW",   img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=240&auto=format&fit=crop" },
  { id: "p2", name: "BRU Instant Coffee", weight: "50 g",  price: 159, originalPrice: 199, discount: 20, badge: "OFFER", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=240&auto=format&fit=crop" },
  { id: "p3", name: "Blueberries",      weight: "125 g", price: 98,  originalPrice: 120, discount: 23, badge: "NEW",   img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=240&auto=format&fit=crop" },
  { id: "p4", name: "Multigrain Chips", weight: "200 g", price: 98,  originalPrice: 120, discount: 18, badge: "NEW",   img: "https://images.unsplash.com/photo-1699666397768-0126340e880a?w=240&auto=format&fit=crop" },
];

const PRODUCTS_BEST: Product[] = [
  { id: "bs1", name: "Blueberries",      weight: "125 g", price: 98,  originalPrice: 120, discount: 23, badge: "BEST SELLER", img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=240&auto=format&fit=crop" },
  { id: "bs2", name: "BRU Instant Coffee", weight: "50 g",  price: 159, originalPrice: 199, discount: 20, badge: "BEST SELLER", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=240&auto=format&fit=crop" },
  { id: "bs3", name: "Multigrain Chips", weight: "200 g", price: 98,  originalPrice: 120, discount: 18, badge: "BEST SELLER", img: "https://images.unsplash.com/photo-1699666397768-0126340e880a?w=240&auto=format&fit=crop" },
  { id: "bs4", name: "Fresh Veggies",    weight: "500 g", price: 75,  originalPrice: 95,  discount: 21, badge: "BEST SELLER", img: "https://images.unsplash.com/photo-1562437243-4117943e59b8?w=240&auto=format&fit=crop" },
];

const PRODUCTS_DEALS: Product[] = [
  { id: "d1", name: "Organic Milk",    weight: "1 L",    price: 65,  originalPrice: 80,  discount: 19, badge: "OFFER", img: "https://images.unsplash.com/photo-1678314745317-35103ab002e7?w=240&auto=format&fit=crop" },
  { id: "d2", name: "Brown Rice",      weight: "1 kg",   price: 120, originalPrice: 150, discount: 20, badge: "OFFER", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=240&auto=format&fit=crop" },
  { id: "d3", name: "Fresh Tomatoes",  weight: "500 g",  price: 35,  originalPrice: 50,  discount: 30, badge: "OFFER", img: "https://images.unsplash.com/photo-1506484381205-f7945653044d?w=240&auto=format&fit=crop" },
  { id: "d4", name: "Sunscreen SPF 50", weight: "100 ml", price: 299, originalPrice: 399, discount: 25, badge: "OFFER", img: "https://images.unsplash.com/photo-1596980846062-81a524d170ee?w=240&auto=format&fit=crop" },
];

const ALL_PRODUCTS = [...PRODUCTS_NEW, ...PRODUCTS_BEST, ...PRODUCTS_DEALS];

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

function QuickIcon({ id, active }: { id: string; active: boolean }) {
  const c = active ? TEAL : "#aab0ba";
  const s = { width: 24, height: 24 } as const;
  if (id === "all") return <ShoppingBag style={{ ...s, color: c }} />;
  if (id === "fruits") return (
    <svg style={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3C8.5 3 5 7 5 11.5C5 17.5 12 22 12 22S19 17.5 19 11.5C19 7 15.5 3 12 3Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M12 3C12 3 14.5 5.5 12 9" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
  if (id === "vegetables") return (
    <svg style={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3C9 6 7 10 8 15C9 19 12 21 12 21S15 19 16 15C17 10 15 6 12 3Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M12 3C12 7 10.5 11 9.5 14.5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M12 3C12 7 13.5 11 14.5 14.5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
  if (id === "dairy") return (
    <svg style={s} viewBox="0 0 24 24" fill="none">
      <path d="M7.5 4.5L6.5 7H17.5L16.5 4.5H7.5Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M6.5 7L5.5 20H18.5L17.5 7H6.5Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 11H15" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (id === "snacks") return (
    <svg style={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="9" ry="7" stroke={c} strokeWidth="1.8"/>
      <circle cx="9"  cy="10" r="1" fill={c}/>
      <circle cx="13" cy="10" r="1" fill={c}/>
      <circle cx="11" cy="13.5" r="1" fill={c}/>
      <circle cx="15" cy="13.5" r="1" fill={c}/>
    </svg>
  );
  // beverages
  return (
    <svg style={s} viewBox="0 0 24 24" fill="none">
      <path d="M8 3H16L14.5 7H9.5L8 3Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9.5 7L9 20H15L14.5 7" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14.5 9.5H17C18.1 9.5 19 10.4 19 11.5S18.1 13.5 17 13.5H14.5" stroke={c} strokeWidth="1.6"/>
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
}

function ProductCard({ p, cart, wish, onAdd, onSub, onWish, onOpen }: CardProps) {
  const qty = cart[p.id] || 0;
  const liked = wish.has(p.id);
  const badgeBg = p.badge === "NEW" ? "#22c55e" : p.badge === "OFFER" ? "#f97316" : "#16a34a";

  return (
    <div
      className="flex-shrink-0 bg-white rounded-2xl overflow-hidden cursor-pointer active:scale-[.98] transition-transform"
      style={{ width: 148, border: "1px solid #efefef", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      onClick={() => onOpen(p)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50" style={{ height: 130 }}>
        <span
          className="absolute top-2 left-2 z-10 text-white font-bold rounded-full"
          style={{ fontSize: 9, backgroundColor: badgeBg, padding: "2px 7px" }}
        >
          {p.badge}
        </span>
        <button
          className="absolute top-2 right-2 z-10 flex items-center justify-center w-6 h-6"
          onClick={e => { e.stopPropagation(); onWish(p.id); }}
        >
          <Heart style={{ width: 18, height: 18, color: liked ? "#ef4444" : "#d1d5db", fill: liked ? "#ef4444" : "none" }} />
        </button>
        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="px-2.5 pt-2 pb-2.5">
        <div className="flex items-baseline gap-1 flex-wrap" style={{ minHeight: 20 }}>
          <span className="font-bold text-gray-900" style={{ fontSize: 14 }}>₹{p.price}</span>
          <span className="text-gray-400 line-through" style={{ fontSize: 10 }}>₹{p.originalPrice}</span>
          <span className="font-semibold text-orange-500" style={{ fontSize: 9 }}>{p.discount}% off</span>
        </div>
        <p className="font-semibold text-gray-900 leading-snug truncate mt-0.5" style={{ fontSize: 12 }}>{p.name}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-400" style={{ fontSize: 10 }}>{p.weight}</span>

          {qty === 0 ? (
            <button
              className="flex items-center justify-center rounded-full text-white flex-shrink-0"
              style={{ width: 28, height: 28, backgroundColor: TEAL }}
              onClick={e => { e.stopPropagation(); onAdd(p.id); }}
            >
              <Plus style={{ width: 15, height: 15, strokeWidth: 2.5 }} />
            </button>
          ) : (
            <div
              className="flex items-center rounded-full overflow-hidden"
              style={{ border: `1.5px solid ${TEAL}` }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="flex items-center justify-center"
                style={{ width: 22, height: 22, backgroundColor: TEAL }}
                onClick={e => { e.stopPropagation(); onSub(p.id); }}
              >
                <Minus style={{ width: 11, height: 11, color: "white", strokeWidth: 2.5 }} />
              </button>
              <span className="font-bold text-center" style={{ fontSize: 12, color: TEAL, minWidth: 20 }}>{qty}</span>
              <button
                className="flex items-center justify-center"
                style={{ width: 22, height: 22, backgroundColor: TEAL }}
                onClick={e => { e.stopPropagation(); onAdd(p.id); }}
              >
                <Plus style={{ width: 11, height: 11, color: "white", strokeWidth: 2.5 }} />
              </button>
            </div>
          )}
        </div>
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
            <span className="text-white font-bold rounded-full" style={{ fontSize: 9, backgroundColor: badgeBg, padding: "2px 8px" }}>{p.badge}</span>
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
          Premium quality product sourced directly from farms. 100% organic, freshly stocked daily and delivered to your doorstep within 15 minutes.
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
    const p = ALL_PRODUCTS.find(p => p.id === id);
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
              const p = ALL_PRODUCTS.find(p => p.id === id);
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
  const [openProduct, setOpenProduct]   = useState<Product | null>(null);
  const [showCart, setShowCart]         = useState(false);

  const hero  = useBannerSwipe(HERO_BANNERS.length, 3500);
  const onam  = useBannerSwipe(ONAM_BANNERS.length, 5000);

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

  const navItems = [
    { id: "home",       label: "Home",       Icon: Home },
    { id: "categories", label: "Categories", Icon: LayoutGrid },
    { id: "loyalty",    label: "Loyalty",    Icon: Award },
    { id: "offers",     label: "Offers",     Icon: Tag },
    { id: "flyers",     label: "Flyers",     Icon: BookOpen },
  ];

  return (
    <>
      <style>{`
        .hide-sb::-webkit-scrollbar { display: none; }
        .hide-sb { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>

      <div className="min-h-screen flex items-start justify-center" style={{ backgroundColor: "#d0d4d8" }}>
        <div
          className="w-full flex flex-col relative overflow-hidden"
          style={{
            maxWidth: 390,
            minHeight: "100svh",
            maxHeight: "100svh",
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "#f7f7f7",
          }}
        >

          {/* ── HEADER ───────────────────────────────────────────────────── */}
          <div className="flex-shrink-0" style={{ backgroundColor: TEAL }}>

            {/* Top row */}
            <div className="flex items-center justify-between" style={{ padding: "12px 16px 4px" }}>
              {/* Logo */}
              <div className="flex items-center gap-1.5">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <polygon points="14,3 25,23 3,23" fill="white" opacity="0.95"/>
                  <polygon points="14,10 20,21 8,21" fill={TEAL}/>
                </svg>
                <span className="text-white font-bold" style={{ fontSize: 19, letterSpacing: "0.02em" }}>alphagro</span>
              </div>
              {/* Icons */}
              <div className="flex items-center gap-3.5">
                <button className="relative" onClick={() => setShowCart(true)}>
                  <ShoppingCart style={{ width: 24, height: 24, color: "white" }} />
                  {cartCount > 0 && (
                    <span
                      className="absolute flex items-center justify-center text-white font-bold rounded-full"
                      style={{ top: -6, right: -6, minWidth: 17, height: 17, fontSize: 9, backgroundColor: "#f97316", padding: "0 3px" }}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>
                <button>
                  <User style={{ width: 24, height: 24, color: "white" }} />
                </button>
              </div>
            </div>

            {/* Location + date */}
            <div className="flex items-center justify-between" style={{ padding: "2px 16px 10px" }}>
              <button className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.88)", fontSize: 12 }}>
                <MapPin style={{ width: 13, height: 13 }} />
                <span>Chelambra, Kerala</span>
                <ChevronDown style={{ width: 13, height: 13 }} />
              </button>
              <span style={{ color: "rgba(255,255,255,0.88)", fontSize: 12 }}>14-Aug</span>
            </div>

            {/* Search bar */}
            <div style={{ padding: "0 16px 14px" }}>
              <div className="bg-white rounded-full flex items-center gap-2" style={{ padding: "10px 14px" }}>
                <Search style={{ width: 16, height: 16, color: "#9ca3af", flexShrink: 0 }} />
                <input
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: 13, color: "#374151" }}
                  placeholder="Search groceries, fruits, snacks..."
                />
                <Mic style={{ width: 15, height: 15, color: "#9ca3af", flexShrink: 0 }} />
                <Camera style={{ width: 15, height: 15, color: "#9ca3af", flexShrink: 0 }} />
              </div>
            </div>
          </div>

          {/* ── SCROLLABLE CONTENT ───────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto hide-sb" style={{ backgroundColor: "#f7f7f7" }}>

            {/* QUICK CATEGORIES */}
            <div className="bg-white" style={{ borderBottom: "1px solid #f0f0f0" }}>
              <div className="flex overflow-x-auto hide-sb">
                {QUICK_CATS.map(cat => (
                  <button
                    key={cat.id}
                    className="flex-shrink-0 flex flex-col items-center relative"
                    style={{ padding: "12px 18px 10px", gap: 4 }}
                    onClick={() => setActiveCat(cat.id)}
                  >
                    <QuickIcon id={cat.id} active={activeCat === cat.id} />
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: activeCat === cat.id ? TEAL : "#9ca3af",
                      }}
                    >
                      {cat.label}
                    </span>
                    {activeCat === cat.id && (
                      <span
                        className="absolute bottom-0 rounded-t-full"
                        style={{ left: 10, right: 10, height: 2.5, backgroundColor: TEAL }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* HERO BANNER */}
            <div style={{ padding: "12px 12px 0" }}>
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ height: 162 }}
                onTouchStart={hero.onTouchStart}
                onTouchEnd={hero.onTouchEnd}
              >
                <div
                  className="flex h-full"
                  style={{ transform: `translateX(-${hero.idx * 100}%)`, transition: "transform 370ms cubic-bezier(.4,0,.2,1)" }}
                >
                  {HERO_BANNERS.map(b => (
                    <div
                      key={b.id}
                      className="flex-shrink-0 w-full h-full flex items-stretch relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, #094d3e 0%, ${TEAL} 45%, #1a7f68 100%)` }}
                    >
                      <div className="flex-1 flex flex-col justify-center z-10" style={{ padding: "0 16px 0 20px" }}>
                        <p className="text-white font-bold leading-snug" style={{ fontSize: 18 }}>{b.title}</p>
                        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 6, lineHeight: 1.55 }}>{b.subtitle}</p>
                        <button
                          className="self-start text-white font-semibold rounded-full"
                          style={{ marginTop: 14, backgroundColor: "#0a2920", fontSize: 11, padding: "7px 16px" }}
                        >
                          {b.cta}
                        </button>
                      </div>
                      <div className="flex-shrink-0 relative overflow-hidden" style={{ width: 140 }}>
                        <img
                          src={b.img}
                          alt="fresh produce"
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ opacity: 0.88 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Dots total={HERO_BANNERS.length} idx={hero.idx} onGo={hero.goTo} />
              </div>
            </div>

            {/* OFFERS FOR YOU */}
            <div style={{ padding: "16px 12px 0" }}>
              <p className="font-bold text-gray-900" style={{ fontSize: 16, marginBottom: 10 }}>Offers for You</p>
              <div className="flex gap-2.5">
                {/* Card 1 — Fresh Fruits */}
                <button
                  className="flex-1 rounded-xl overflow-hidden relative text-left"
                  style={{ height: 100, background: "linear-gradient(135deg, #3d1a02 0%, #6b2e08 60%, #8b3e10 100%)" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=200&auto=format&fit=crop"
                    alt="fresh fruits"
                    className="absolute right-0 top-0 h-full object-cover"
                    style={{ width: "55%", opacity: 0.72 }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-center" style={{ paddingLeft: 12 }}>
                    <p style={{ color: "#fcd34d", fontSize: 9, fontWeight: 600 }}>Fresh Fruits</p>
                    <p className="text-white font-bold leading-tight" style={{ fontSize: 14 }}>Up to 40% Off</p>
                    <div
                      className="self-start text-white font-bold rounded-full"
                      style={{ marginTop: 8, backgroundColor: "#f97316", fontSize: 9, padding: "4px 10px" }}
                    >
                      SHOP NOW →
                    </div>
                  </div>
                </button>

                {/* Card 2 — Sun protection */}
                <button
                  className="flex-1 rounded-xl overflow-hidden relative text-left"
                  style={{ height: 100, background: "linear-gradient(135deg, #c8e5f8 0%, #e5f3ff 100%)" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1596980846062-81a524d170ee?w=200&auto=format&fit=crop"
                    alt="sun protection"
                    className="absolute right-1 bottom-0 object-contain"
                    style={{ height: "92%", width: "55%" }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-center" style={{ paddingLeft: 12 }}>
                    <p className="font-bold leading-tight" style={{ color: "#1a4f7c", fontSize: 12 }}>sun<br/>protection</p>
                    <div
                      className="self-start text-white font-bold"
                      style={{ marginTop: 6, backgroundColor: "#22c55e", fontSize: 10, padding: "2px 7px", borderRadius: 3 }}
                    >
                      40% off
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* POPULAR CATEGORIES */}
            <div style={{ padding: "16px 12px 0" }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                <p className="font-bold text-gray-900" style={{ fontSize: 16 }}>Popular Categories</p>
                <button className="font-semibold" style={{ fontSize: 13, color: TEAL }}>View All</button>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {POP_CATS.map(cat => (
                  <button key={cat.id} className="flex flex-col items-center group" style={{ gap: 6 }}>
                    <div className="w-full rounded-xl overflow-hidden bg-gray-100" style={{ aspectRatio: "1" }}>
                      <img
                        src={cat.img}
                        alt={cat.label}
                        className="w-full h-full object-cover group-active:scale-95 transition-transform duration-150"
                      />
                    </div>
                    <span className="text-gray-700 font-medium text-center leading-tight" style={{ fontSize: 11 }}>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* NEW ARRIVALS */}
            <div style={{ marginTop: 16 }}>
              <p className="font-bold text-gray-900" style={{ fontSize: 16, padding: "0 12px 10px" }}>New Arrivals</p>
              <div className="flex overflow-x-auto hide-sb" style={{ gap: 10, padding: "0 12px 2px" }}>
                {PRODUCTS_NEW.map(p => (
                  <ProductCard key={p.id} p={p} cart={cart} wish={wish} onAdd={addToCart} onSub={subFromCart} onWish={toggleWish} onOpen={setOpenProduct} />
                ))}
              </div>
            </div>

            {/* ONAM BANNER */}
            <div style={{ padding: "16px 12px 0" }}>
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ height: 145 }}
                onTouchStart={onam.onTouchStart}
                onTouchEnd={onam.onTouchEnd}
              >
                <div
                  className="flex h-full"
                  style={{ transform: `translateX(-${onam.idx * 100}%)`, transition: "transform 370ms cubic-bezier(.4,0,.2,1)" }}
                >
                  {ONAM_BANNERS.map((b, bi) => (
                    <div
                      key={b.id}
                      className="flex-shrink-0 w-full h-full relative overflow-hidden flex items-center justify-center"
                      style={{ background: ONAM_GRADIENTS[bi] }}
                    >
                      {/* Glow circles */}
                      <div className="absolute rounded-full" style={{ right: 40, top: "50%", transform: "translateY(-50%)", width: 90, height: 90, backgroundColor: "rgba(255,255,255,0.14)" }} />
                      <div className="absolute rounded-full" style={{ right: 55, top: "50%", transform: "translateY(-50%)", width: 58, height: 58, backgroundColor: "rgba(255,255,255,0.1)" }} />
                      {/* Boat silhouette */}
                      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 390 52" style={{ height: 52 }} preserveAspectRatio="none">
                        <path d="M0 40 Q80 24 195 28 Q310 32 390 34 L390 52 L0 52Z" fill="rgba(0,0,0,0.28)"/>
                        <path d="M85 28 L85 12 L195 12 L195 28" fill="rgba(0,0,0,0.22)"/>
                        <path d="M95 12 L95 5 L185 5 L185 12" fill="rgba(0,0,0,0.18)"/>
                        <circle cx="95" cy="5" r="4" fill="rgba(0,0,0,0.22)"/>
                      </svg>
                      {/* Text */}
                      <div className="flex flex-col items-center z-10">
                        <p className="font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Happy</p>
                        <p
                          className="text-white font-bold leading-none"
                          style={{ fontFamily: "'Dancing Script', cursive", fontSize: 44, textShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
                        >
                          Onam
                        </p>
                        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 4 }}>{b.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Dots total={ONAM_BANNERS.length} idx={onam.idx} onGo={onam.goTo} />
              </div>
            </div>

            {/* BEST SELLERS */}
            <div style={{ marginTop: 16 }}>
              <div style={{ padding: "0 12px 10px" }}>
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-gray-900" style={{ fontSize: 16 }}>Best Sellers</p>
                  <div className="flex items-center justify-center rounded-full" style={{ width: 20, height: 20, backgroundColor: "#22c55e" }}>
                    <Star style={{ width: 11, height: 11, color: "white", fill: "white" }} />
                  </div>
                </div>
                <p className="text-gray-400" style={{ fontSize: 11, marginTop: 2 }}>Most loved by our customers</p>
              </div>
              <div className="flex overflow-x-auto hide-sb" style={{ gap: 10, padding: "0 12px 2px" }}>
                {PRODUCTS_BEST.map(p => (
                  <ProductCard key={p.id} p={p} cart={cart} wish={wish} onAdd={addToCart} onSub={subFromCart} onWish={toggleWish} onOpen={setOpenProduct} />
                ))}
              </div>
            </div>

            {/* TOP DEALS */}
            <div style={{ marginTop: 16, paddingBottom: 24 }}>
              <div className="flex items-center justify-between" style={{ padding: "0 12px 10px" }}>
                <p className="font-bold text-gray-900" style={{ fontSize: 16 }}>Top Deals</p>
                <button className="font-semibold" style={{ fontSize: 13, color: TEAL }}>View All</button>
              </div>
              <div className="flex overflow-x-auto hide-sb" style={{ gap: 10, padding: "0 12px 2px" }}>
                {PRODUCTS_DEALS.map(p => (
                  <ProductCard key={p.id} p={p} cart={cart} wish={wish} onAdd={addToCart} onSub={subFromCart} onWish={toggleWish} onOpen={setOpenProduct} />
                ))}
              </div>
            </div>

          </div>

          {/* ── BOTTOM NAV ───────────────────────────────────────────────── */}
          <nav
            className="flex-shrink-0 bg-white flex items-center justify-around z-20"
            style={{ borderTop: "1px solid #efefef", padding: "6px 8px 10px" }}
          >
            {navItems.map(({ id, label, Icon }) => {
              const active = activeNav === id;
              return (
                <button
                  key={id}
                  className="flex flex-col items-center relative"
                  style={{ gap: 3, padding: "4px 10px" }}
                  onClick={() => setActiveNav(id)}
                >
                  {active && (
                    <span
                      className="absolute rounded-full"
                      style={{ top: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 2.5, backgroundColor: TEAL }}
                    />
                  )}
                  <Icon style={{ width: 22, height: 22, color: active ? TEAL : "#b0b8c4" }} />
                  <span style={{ fontSize: 10, fontWeight: 500, color: active ? TEAL : "#b0b8c4" }}>{label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── PRODUCT DETAIL SHEET ─────────────────────────────────────── */}
          {openProduct && (
            <ProductSheet
              p={openProduct}
              cart={cart}
              onAdd={addToCart}
              onSub={subFromCart}
              onClose={() => setOpenProduct(null)}
            />
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
