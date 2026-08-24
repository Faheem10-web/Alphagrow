import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Search, Share, Heart, ChevronRight, ChevronUp, ChevronDown, Plus, Minus, X, Check, Copy, Send, Mail } from "lucide-react";
import { resolveProduct } from "../App";

// --- Types ---
interface ProductDetailsPageProps {
  onBack: () => void;
  cart: Record<string, number>;
  setCart: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  wish: Set<string>;
  setWish: React.Dispatch<React.SetStateAction<Set<string>>>;
  product: {
    id: string;
    name: string;
    weight: string;
    price: number;
    originalPrice: number;
    discount: number;
    badge: string;
    img: string;
    desc?: string;
  };
  onOpenCart?: () => void;
  onSelectProduct?: (p: any) => void;
  allProducts?: any[];
}

const OKRA_IMAGES = [
  "https://images.unsplash.com/photo-1449339090384-d2cbf643f5f2?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1627931325756-3c66f54c9c10?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&auto=format&fit=crop",
];

const TEAL = "#02616A";
const DARK_TEAL = "#014F57";

export default function ProductDetailsPage({
  onBack,
  cart,
  setCart,
  wish,
  setWish,
  product,
  onOpenCart,
  onSelectProduct,
  allProducts = [],
}: ProductDetailsPageProps) {
  // State for gallery
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMainScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // State for product specs
  const [selectedPack, setSelectedPack] = useState<"500g" | "250g">("500g");
  const [isFavorited, setIsFavorited] = useState(wish.has(product.id));
  const [showAccordionGroup, setShowAccordionGroup] = useState(true);

  // Individual accordion items states
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    about: true, // "About the Product" expanded by default
    sourcing: false,
    storage: false,
    info: false,
    weight: false,
  });

  // Success toast state
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const mainScrollRef = useRef<HTMLDivElement>(null);

  // Keep state in sync when product changes
  useEffect(() => {
    setSelectedPack("500g");
    setIsFavorited(wish.has(product.id));
    setActiveImageIdx(0);
    setScrollTop(0);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [product.id, wish]);

  // Sync favorites with App.tsx wish state
  const toggleFavorite = () => {
    setIsFavorited(prev => {
      const next = !prev;
      setWish(w => {
        const newWish = new Set(w);
        if (next) newWish.add(product.id);
        else newWish.delete(product.id);
        return newWish;
      });
      return next;
    });
  };

  // Determine helper information
  const isOkra = product.id.includes("ladies-fingers");
  
  // Gallery Images
  const galleryImages = isOkra ? OKRA_IMAGES : (
    product.img.includes("unsplash.com") ? [
      product.img,
      product.img + "&sig=1",
      product.img + "&sig=2",
      product.img + "&sig=3",
    ] : [product.img, product.img, product.img, product.img]
  );

  // Brand Name
  const brandName = product.name.toLowerCase().includes("bru") ? "BRU"
    : product.name.toLowerCase().includes("matta") ? "palakkad"
    : product.name.toLowerCase().includes("sunflower") ? "gold drop"
    : "fresho!";

  // Accordion text
  const aboutText = product.desc || (
    isOkra ? "In the rich tapestry of Indian cuisine, Ladies' Fingers, known locally as \"bhindi\" or \"okra,\" holds a prominent place. This versatile vegetable, with its elongated shape and tender texture, is celebrated for its culinary adaptability. Often used in curries, stir-fries, and even as a crispy side dish, bhindi adds a unique mucilaginous quality that thickens gravies and enhances flavours. Its popularity spans across regional variations, from spicy masalas in the North to coconut-infused preparations in the South."
    : `High quality, freshly sourced ${product.name} from the best origins. Hand-selected for premium grade, processed under strict hygienic conditions to retain maximum freshness, flavor, and natural nutrients.`
  );

  // Dynamic Pack Sizes
  const baseWeight = product.weight;
  const numMatch = baseWeight.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
  
  let size1 = baseWeight;
  let size2 = "Alt Size";
  let price1 = product.price;
  let price2 = parseFloat((product.price * 0.52).toFixed(2));
  let orig1 = product.originalPrice;
  let orig2 = parseFloat((product.originalPrice * 0.52).toFixed(2));
  let unitPrice1 = "";
  let unitPrice2 = "";

  if (numMatch) {
    const val = parseFloat(numMatch[1]);
    const unit = numMatch[2].toLowerCase();
    if (unit === "g" || unit === "ml") {
      size2 = `${Math.round(val / 2)} ${numMatch[2]}`;
      unitPrice1 = `₹${((price1 / val) * 100).toFixed(0)}/100g`;
      unitPrice2 = `₹${((price2 / (val / 2)) * 100).toFixed(0)}/100g`;
    } else if (unit === "kg" || unit === "l") {
      if (val === 1) {
        size2 = `500 ${unit === "kg" ? "g" : "ml"}`;
        unitPrice1 = `₹${price1.toFixed(0)}/${unit}`;
        unitPrice2 = `₹${((price2 / 0.5) * 0.1).toFixed(1)}/100g`;
      } else {
        size2 = `${Math.round(val / 5)} ${numMatch[2]}`;
        price2 = parseFloat((product.price * 0.22).toFixed(2));
        orig2 = parseFloat((product.originalPrice * 0.22).toFixed(2));
        unitPrice1 = `₹${(price1 / val).toFixed(0)}/${unit}`;
        unitPrice2 = `₹${(price2 / (val / 5)).toFixed(0)}/${unit}`;
      }
    } else {
      size2 = `${val * 2} ${numMatch[2]}`;
      price2 = parseFloat((product.price * 1.85).toFixed(2));
      orig2 = parseFloat((product.originalPrice * 1.85).toFixed(2));
      unitPrice1 = `₹${(price1 / val).toFixed(0)}/pc`;
      unitPrice2 = `₹${(price2 / (val * 2)).toFixed(0)}/pc`;
    }
  }

  const packDetails = {
    "500g": {
      id: isOkra ? "ladies-fingers-500g" : product.id,
      name: product.name,
      size: size1,
      price: price1,
      originalPrice: orig1,
      discount: `${product.discount}% OFF`,
      unitPrice: unitPrice1 || `₹${price1.toFixed(0)}/unit`,
    },
    "250g": {
      id: isOkra ? "ladies-fingers-250g" : product.id + "-alt",
      name: product.name,
      size: size2,
      price: price2,
      originalPrice: orig2,
      discount: `${product.discount}% OFF`,
      unitPrice: unitPrice2 || `₹${price2.toFixed(0)}/unit`,
    },
  };

  const currentProduct = packDetails[selectedPack];
  
  // Find cart quantity by matching product name and weight
  const cartQty = (() => {
    const existingEntry = Object.entries(cart).find(([cartId]) => {
      const cartP = resolveProduct(cartId);
      return cartP && cartP.name.toLowerCase() === currentProduct.name.toLowerCase() && cartP.weight.toLowerCase() === currentProduct.size.toLowerCase();
    });
    return existingEntry ? existingEntry[1] : 0;
  })();

  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);

  // Cart operations
  const handleAddToCart = () => {
    setCart(prev => {
      const existingEntry = Object.entries(prev).find(([cartId]) => {
        const cartP = resolveProduct(cartId);
        return cartP && cartP.name.toLowerCase() === currentProduct.name.toLowerCase() && cartP.weight.toLowerCase() === currentProduct.size.toLowerCase();
      });
      
      if (existingEntry) {
        const [existingId, qty] = existingEntry;
        return { ...prev, [existingId]: qty + 1 };
      } else {
        return { ...prev, [currentProduct.id]: 1 };
      }
    });
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  const handleBuyNow = () => {
    if (cartQty === 0) {
      setCart(prev => {
        const existingEntry = Object.entries(prev).find(([cartId]) => {
          const cartP = resolveProduct(cartId);
          return cartP && cartP.name.toLowerCase() === currentProduct.name.toLowerCase() && cartP.weight.toLowerCase() === currentProduct.size.toLowerCase();
        });
        
        if (existingEntry) {
          return prev;
        } else {
          return { ...prev, [currentProduct.id]: 1 };
        }
      });
    }
    onOpenCart?.();
  };

  const handleIncrement = () => {
    setCart(prev => {
      const existingEntry = Object.entries(prev).find(([cartId]) => {
        const cartP = resolveProduct(cartId);
        return cartP && cartP.name.toLowerCase() === currentProduct.name.toLowerCase() && cartP.weight.toLowerCase() === currentProduct.size.toLowerCase();
      });
      
      if (existingEntry) {
        const [existingId, qty] = existingEntry;
        return { ...prev, [existingId]: qty + 1 };
      } else {
        return { ...prev, [currentProduct.id]: 1 };
      }
    });
  };

  const handleDecrement = () => {
    setCart(prev => {
      const existingEntry = Object.entries(prev).find(([cartId]) => {
        const cartP = resolveProduct(cartId);
        return cartP && cartP.name.toLowerCase() === currentProduct.name.toLowerCase() && cartP.weight.toLowerCase() === currentProduct.size.toLowerCase();
      });
      
      if (existingEntry) {
        const [existingId, qty] = existingEntry;
        const next = { ...prev };
        if (qty > 1) {
          next[existingId] = qty - 1;
        } else {
          delete next[existingId];
        }
        return next;
      }
      return prev;
    });
  };

  // Share action
  const handleShare = () => {
    setShowShareSheet(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Scroll gallery logic to update dots
  const handleScroll = () => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const idx = Math.round(scrollLeft / width);
      setActiveImageIdx(idx);
    }
  };

  // Toggle individual accordion row
  const toggleAccordionItem = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white relative select-none">
      {/* Dynamic Fixed Header */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 transition-all duration-300 flex items-center justify-between px-4 pb-3 pt-6 ${
          scrollTop > 60
            ? "bg-white border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            : "bg-transparent"
        }`}
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100/50 shadow-sm active:scale-95 transition-all text-slate-800"
        >
          <ArrowLeft className="w-4.5 h-4.5 stroke-[2.5]" />
        </button>

        {/* Scrolled Content Preview */}
        <div
          className={`flex-1 flex items-center gap-2.5 mx-3 min-w-0 transition-all duration-300 ${
            scrollTop > 60 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-9 h-9 object-cover rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0"
          />
          <div className="flex flex-col min-w-0 text-left">
            <span className="text-[13px] font-semibold text-slate-800 truncate leading-tight">
              {product.name}
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-slate-900">
                ₹{currentProduct.price.toFixed(selectedPack === "250g" || currentProduct.price % 1 !== 0 ? 2 : 0)}
              </span>
              {currentProduct.originalPrice > currentProduct.price && (
                <span className="text-[10px] text-slate-400 line-through">
                  ₹{currentProduct.originalPrice.toFixed(0)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100/50 shadow-sm active:scale-95 transition-all text-slate-800"
          >
            <Search className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100/50 shadow-sm active:scale-95 transition-all text-slate-800"
          >
            <Share className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Scrollable container for main details */}
      <div ref={mainScrollRef} onScroll={handleMainScroll} className="flex-1 overflow-y-auto hide-sb pb-[88px]">
        {/* 1. Top Product Image Area */}
        <div className="w-full relative bg-white aspect-square overflow-hidden">
          {/* Scrollable Gallery */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-sb scroll-smooth"
          >
            {galleryImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className="w-full h-full flex-shrink-0 snap-start flex items-center justify-center cursor-pointer"
                onClick={() => setIsFullscreenOpen(true)}
              >
                <img
                  src={imgUrl}
                  alt={`${product.name} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Pagination dots overlay */}
          <div className="absolute bottom-9 left-0 right-0 flex justify-center gap-2 z-10">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    const width = scrollRef.current.offsetWidth;
                    scrollRef.current.scrollTo({ left: idx * width, behavior: "smooth" });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeImageIdx ? "w-6 bg-[#02616A]" : "w-2 bg-[#CFD8DC]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Unified Product Details Container (Full width, rounded top) */}
        <div className="bg-white rounded-t-[32px] -mt-6 relative z-10 pt-6 pb-2 border-t border-slate-100/50 shadow-[0_-8px_30px_rgba(0,0,0,0.025)]">
          
          {/* 2. Product Summary Area */}
          <div className="px-5 pb-4 border-b border-slate-100/80">
            <div className="flex items-start justify-between">
              <div>
                {/* Product Title */}
                <h1 className="text-[#202124] font-semibold text-[22px] tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Favorite toggle */}
              <button
                onClick={toggleFavorite}
                className="w-10 h-10 rounded-full bg-[#F1F3F4] flex items-center justify-center active:scale-90 transition-all text-[#5F6368]"
              >
                <Heart
                  className={`w-4.5 h-4.5 transition-colors ${
                    isFavorited ? "fill-red-500 stroke-red-500" : "stroke-[#5F6368]"
                  }`}
                />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center bg-[#FEF7E0] text-[#B06000] text-[11px] font-bold px-2 py-0.5 rounded-[6px]">
                4.8 ★
              </span>
              <span className="text-[#5F6368] text-xs font-semibold">(126 reviews)</span>
            </div>

            {/* Price details */}
            <div className="flex items-baseline mt-4 pt-1">
              <span className="text-[#202124] font-semibold text-[28px] tracking-tight leading-none">
                ₹{currentProduct.price.toFixed(selectedPack === "250g" || currentProduct.price % 1 !== 0 ? 2 : 0)}
              </span>
              <span className="text-[#5F6368] line-through text-base ml-2.5 font-normal">
                ₹{currentProduct.originalPrice.toFixed(2)}
              </span>
              <span className="inline-block bg-[#E6F4EA] text-[#137333] text-xs font-bold px-2.5 py-1 rounded-[6px] ml-2.5">
                {currentProduct.discount}
              </span>
            </div>
          </div>

          {/* 3. Pack Size Selector */}
          <div className="px-5 py-4 border-b border-slate-100/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-800 text-[15px] font-normal tracking-tight">
                Pack sizes: <span className="font-semibold text-slate-800">{currentProduct.size}</span>
              </h3>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            {/* Pack Options Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Option 1 */}
              <button
                onClick={() => setSelectedPack("500g")}
                className={`rounded-[18px] border-2 p-3 flex flex-col items-center justify-center text-center transition-all ${
                  selectedPack === "500g"
                    ? "border-[#1E8E3E] bg-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="bg-[#F1F3F4] text-[#202124] rounded-[10px] text-xs font-bold py-1.5 w-full block text-center mb-2">
                  {packDetails["500g"].size}
                </div>
                <div className="flex items-baseline justify-center gap-1 w-full">
                  <span className="font-semibold text-sm text-[#202124]">
                    ₹{packDetails["500g"].price.toFixed(packDetails["500g"].price % 1 !== 0 ? 2 : 0)}
                  </span>
                  <span className="text-[10px] text-[#5F6368] font-normal">({packDetails["500g"].unitPrice})</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1 w-full text-[10px]">
                  <span className="text-[#5F6368] line-through">₹{packDetails["500g"].originalPrice.toFixed(2)}</span>
                  <span className="text-[#137333] font-bold">{packDetails["500g"].discount}</span>
                </div>
              </button>

              {/* Option 2 */}
              <button
                onClick={() => setSelectedPack("250g")}
                className={`rounded-[18px] border-2 p-3 flex flex-col items-center justify-center text-center transition-all ${
                  selectedPack === "250g"
                    ? "border-[#1E8E3E] bg-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="bg-[#F1F3F4] text-[#202124] rounded-[10px] text-xs font-bold py-1.5 w-full block text-center mb-2">
                  {packDetails["250g"].size}
                </div>
                <div className="flex items-baseline justify-center gap-1 w-full">
                  <span className="font-semibold text-sm text-[#202124]">
                    ₹{packDetails["250g"].price.toFixed(packDetails["250g"].price % 1 !== 0 ? 2 : 0)}
                  </span>
                  <span className="text-[10px] text-[#5F6368] font-normal">({packDetails["250g"].unitPrice})</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1 w-full text-[10px]">
                  <span className="text-[#5F6368] line-through">₹{packDetails["250g"].originalPrice.toFixed(2)}</span>
                  <span className="text-[#137333] font-bold">{packDetails["250g"].discount}</span>
                </div>
              </button>
            </div>
          </div>

          {/* 4. Product Details Accordion Container */}
          <div className="px-5 py-4 border-b border-slate-100/80">
            {/* Header overall accordion toggle */}
            <button
              onClick={() => setShowAccordionGroup(!showAccordionGroup)}
              className="w-full flex items-center justify-center py-2 text-slate-700 font-semibold text-sm gap-1 active:bg-slate-50/50 transition-colors"
            >
              <span>{showAccordionGroup ? "Hide product details" : "Show product details"}</span>
              {showAccordionGroup ? (
                <ChevronUp className="w-4 h-4 text-slate-500 stroke-[2]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500 stroke-[2]" />
              )}
            </button>

            {/* Accordion Content Block */}
            {showAccordionGroup && (
              <div className="divide-y divide-slate-100 mt-2">
                
                {/* About the Product */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordionItem("about")}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-800"
                  >
                    <span>About the Product</span>
                    {expandedItems.about ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                  {expandedItems.about && (
                    <p className="mt-2 text-slate-600 text-xs leading-relaxed font-normal antialiased">
                      {aboutText}
                    </p>
                  )}
                </div>

                {/* Sourcing */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordionItem("sourcing")}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-800"
                  >
                    <span>Sourcing</span>
                    {expandedItems.sourcing ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                  {expandedItems.sourcing && (
                    <p className="mt-2 text-slate-600 text-xs leading-relaxed font-normal">
                      {isOkra ? "Directly sourced from certified local organic farms around Kerala. Harvested daily in the early morning hours and brought immediately to our temperature-controlled centers to ensure farm-fresh quality."
                        : `Sourced from select quality farms and certified producers. Quality checked and sealed at origin to ensure premium packaging and long shelf life.`}
                    </p>
                  )}
                </div>

                {/* Storage */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordionItem("storage")}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-800"
                  >
                    <span>Storage</span>
                    {expandedItems.storage ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                  {expandedItems.storage && (
                    <p className="mt-2 text-slate-600 text-xs leading-relaxed font-normal">
                      {isOkra ? "To keep ladies' fingers fresh, do not wash them until you are ready to cook. Store them in a dry, ventilated paper bag inside the crisper drawer of your refrigerator. Best consumed within 3-4 days of purchase."
                        : `Store in a cool, dry place away from direct sunlight. Once opened, transfer the contents to an airtight container to preserve freshness and prevent moisture.`}
                    </p>
                  )}
                </div>

                {/* Other Product Info */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordionItem("info")}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-800"
                  >
                    <span>Other Product Info</span>
                    {expandedItems.info ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                  {expandedItems.info && (
                    <div className="mt-2 text-slate-600 text-xs space-y-1 font-normal">
                      <div><strong>Net Quantity:</strong> {currentProduct.size}</div>
                      <div><strong>Category:</strong> {isOkra ? "Fresh Produce / Vegetables" : "Groceries / Food Items"}</div>
                      <div><strong>FSSAI License No:</strong> 12345678901234</div>
                      <div><strong>Packer Address:</strong> AlphaGro Solutions, Chelambra, Kozhikode, KL - 673634</div>
                    </div>
                  )}
                </div>

                {/* Variable Weight */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordionItem("weight")}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-800"
                  >
                    <span>Variable Weight</span>
                    {expandedItems.weight ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                  {expandedItems.weight && (
                    <p className="mt-2 text-slate-600 text-xs leading-relaxed font-normal">
                      Weights can vary slightly between packaging and delivery. The final invoice amount will reflect the exact item weight determined at dispatch. If the weight is lower than ordered, the difference is credited back immediately.
                    </p>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Similar Products Section */}
          {(() => {
            const query = product.name.toLowerCase();
            const isVegOrFruit = query.includes("fingers") || query.includes("veggie") || query.includes("fresh") || product.id.includes("ladies-fingers");
            const isRiceOrAtta = query.includes("rice") || query.includes("atta") || query.includes("wheat") || query.includes("matta");
            const isBeverage = query.includes("coffee") || query.includes("tea") || query.includes("bru");
            const isDairyOrEggs = query.includes("milk") || query.includes("egg");
            
            const candidates = (allProducts || []).filter((p: any) => {
              if (p.id === product.id) return false;
              if (p.id.includes("ladies-fingers") && product.id.includes("ladies-fingers")) return false;
              return true;
            });

            const scored = candidates.map((p: any) => {
              let score = 0;
              const name = p.name.toLowerCase();
              if (isVegOrFruit && (name.includes("veggie") || name.includes("fingers") || name.includes("fresh") || p.id.includes("ladies-fingers"))) score += 10;
              if (isRiceOrAtta && (name.includes("rice") || name.includes("atta") || name.includes("wheat") || name.includes("matta"))) score += 10;
              if (isBeverage && (name.includes("coffee") || name.includes("tea") || name.includes("bru"))) score += 10;
              if (isDairyOrEggs && (name.includes("milk") || name.includes("egg"))) score += 10;
              
              const queryWords = query.split(/\s+/);
              queryWords.forEach(word => {
                if (word.length > 2 && name.includes(word)) score += 5;
              });
              return { product: p, score };
            });

            const similarList = scored
              .sort((a, b) => b.score - a.score)
              .map(item => item.product)
              .slice(0, 5);

            if (similarList.length === 0) return null;

            return (
              <div className="px-5 py-5 border-t border-slate-100/80">
                <h3 className="text-slate-800 text-[15px] font-bold tracking-tight mb-4 text-left">
                  Similar Products
                </h3>
                
                <div className="flex gap-4 overflow-x-auto pb-2 hide-sb scroll-smooth">
                  {similarList.map((p) => {
                    const qty = (() => {
                      const existingEntry = Object.entries(cart).find(([cartId]) => {
                        const cartP = resolveProduct(cartId);
                        return cartP && cartP.name.toLowerCase() === p.name.toLowerCase() && cartP.weight.toLowerCase() === p.weight.toLowerCase();
                      });
                      return existingEntry ? existingEntry[1] : 0;
                    })();
                    const isOkraImg = p.id.includes("ladies-fingers");
                    const displayImg = isOkraImg ? OKRA_IMAGES[0] : p.img;
                    
                    return (
                      <div
                        key={p.id}
                        className="flex-shrink-0 cursor-pointer active:scale-[0.97] transition-all duration-200 ease-out flex flex-col select-none text-left"
                        style={{ width: 114 }}
                        onClick={() => onSelectProduct?.(p)}
                      >
                        {/* Image Box */}
                        <div className="relative" style={{ height: 104 }}>
                          <div className="w-full h-full rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden flex items-center justify-center p-1.5">
                            <img
                              src={displayImg}
                              alt={p.name}
                              className="w-full h-full object-contain transform scale-110 transition-transform duration-200"
                            />
                          </div>
                          
                          {/* Plus Button */}
                          <button
                            className="absolute -bottom-2 -right-1 z-10 w-8 h-8 bg-white border-2 flex items-center justify-center shadow-md active:scale-90 transition-all duration-200 cursor-pointer"
                            style={{ borderColor: TEAL, borderRadius: 9 }}
                            onClick={e => {
                              e.stopPropagation();
                              setCart(prev => {
                                const existingEntry = Object.entries(prev).find(([cartId]) => {
                                  const cartP = resolveProduct(cartId);
                                  return cartP && cartP.name.toLowerCase() === p.name.toLowerCase() && cartP.weight.toLowerCase() === p.weight.toLowerCase();
                                });
                                if (existingEntry) {
                                  const [existingId, itemQty] = existingEntry;
                                  return { ...prev, [existingId]: itemQty + 1 };
                                } else {
                                  return { ...prev, [p.id]: 1 };
                                }
                              });
                            }}
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
                        
                        {/* Details */}
                        <div className="pt-2.5 px-0.5 pb-0.5">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="font-black text-white rounded-md flex items-center justify-center relative"
                              style={{
                                fontSize: 12,
                                backgroundColor: "#1E8E3E",
                                boxShadow: "0 2.5px 0 #12642B",
                                padding: "2px 6px",
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              ₹{p.price}
                            </span>
                            {p.originalPrice > p.price && (
                              <span className="line-through text-slate-400 font-medium" style={{ fontSize: 10.5 }}>
                                ₹{p.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          <p className="line-clamp-2 font-semibold text-slate-900 leading-[1.2] tracking-tight mt-1.5" style={{ fontSize: 11.5 }}>
                            {p.name}
                          </p>
                          
                          <p className="text-[#5F6368] text-[10px] mt-0.5 font-semibold">
                            {p.weight}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

      </div>

      {/* 6. Fixed Bottom Purchase CTA Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100/50 py-3.5 px-5 z-20 flex items-center gap-3.5 rounded-t-[28px] shadow-[0_-8px_30px_rgba(0,0,0,0.035)] pb-[calc(12px+env(safe-area-inset-bottom,0px))]">
        {/* Left Button (Add to cart or Qty Selector) */}
        <div className="flex-1 h-12">
          {cartQty === 0 ? (
            <button
              onClick={handleAddToCart}
              className="w-full h-full border-2 bg-white text-sm rounded-[14px] active:scale-[0.98] transition-all flex items-center justify-center font-extrabold cursor-pointer hover:bg-slate-50/40"
              style={{ borderColor: TEAL, color: TEAL }}
            >
              Add to cart
            </button>
          ) : (
            <div
              className="w-full h-full border-2 bg-white text-sm rounded-[14px] flex items-center justify-between px-3"
              style={{ borderColor: TEAL, color: TEAL }}
            >
              {/* Decrement */}
              <button
                onClick={handleDecrement}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center active:scale-90 hover:bg-slate-200 transition-all cursor-pointer"
                style={{ color: TEAL }}
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>

              {/* Qty */}
              <span className="text-[13px] tracking-tight font-extrabold">
                {cartQty} in Cart
              </span>

              {/* Increment */}
              <button
                onClick={handleIncrement}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center active:scale-90 hover:bg-slate-200 transition-all cursor-pointer"
                style={{ color: TEAL }}
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>

        {/* Right Button (Buy Now) */}
        <button
          onClick={handleBuyNow}
          style={{ backgroundColor: TEAL }}
          className="flex-1 h-12 text-white rounded-[14px] active:scale-[0.98] active:bg-[#014f57] transition-all flex flex-col items-center justify-center shadow-md shadow-teal-900/10 cursor-pointer"
        >
          <span className="text-[13px] tracking-tight font-extrabold leading-tight">
            Buy now
          </span>
          <span className="text-[10px] text-white/80 font-semibold mt-0.5">
            at ₹{currentProduct.price.toFixed(selectedPack === "250g" || currentProduct.price % 1 !== 0 ? 2 : 0)}
          </span>
        </button>
      </div>

      {/* Fullscreen Image Viewer Modal */}
      {isFullscreenOpen && (
        <div className="absolute inset-0 bg-black/95 z-50 flex flex-col justify-between p-4" onClick={() => setIsFullscreenOpen(false)}>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setIsFullscreenOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-full flex-1 flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img
              src={OKRA_IMAGES[activeImageIdx]}
              alt="Ladies' Fingers Zoom"
              className="max-w-full max-h-[70vh] object-contain rounded-xl"
            />
          </div>

          <div className="text-center text-white/60 text-xs pb-4">
            Image {activeImageIdx + 1} of {OKRA_IMAGES.length}
          </div>
        </div>
      )}



      {/* Share Drawer Modal */}
      {showShareSheet && (
        <div
          className="absolute inset-0 bg-black/40 z-50 flex items-end justify-center"
          onClick={() => setShowShareSheet(false)}
        >
          <div
            className="w-full bg-white rounded-t-3xl p-5 pb-8 max-w-[420px]"
            onClick={e => e.stopPropagation()}
            style={{ animation: "slideUp 250ms cubic-bezier(.4,0,.2,1)" }}
          >
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 font-bold text-base">Share Product</h3>
              <button
                onClick={() => setShowShareSheet(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Product Preview Info */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-5">
              <img
                src={product.img}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-xl border border-slate-200/60 bg-white"
              />
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-[13px] font-bold text-slate-800 truncate">{product.name}</h4>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">{currentProduct.size} • ₹{currentProduct.price}</p>
              </div>
            </div>

            {/* Social Share Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out fresh ${product.name} on AlphaGro: ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                <div className="w-11 h-11 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center border border-[#C8E6C9]/40">
                  <Send className="w-5 h-5 -rotate-45 translate-x-0.5 -translate-y-0.5" />
                </div>
                <span className="text-[10px] text-slate-600 font-semibold">WhatsApp</span>
              </a>

              {/* Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out fresh ${product.name} on AlphaGro!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                <div className="w-11 h-11 rounded-full bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center border border-[#B3E5FC]/40">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-600 font-semibold">Telegram</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(`Fresh ${product.name} on AlphaGro`)}&body=${encodeURIComponent(`Check it out: ${window.location.href}`)}`}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                <div className="w-11 h-11 rounded-full bg-[#FFEBEE] text-[#C62828] flex items-center justify-center border border-[#FFCDD2]/40">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-600 font-semibold">Email</span>
              </a>

              {/* System Share */}
              <button
                onClick={async () => {
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: product.name,
                        text: `Check out fresh ${product.name} on AlphaGro!`,
                        url: window.location.href,
                      });
                      setShowShareSheet(false);
                    } catch (e) {
                      console.log(e);
                    }
                  } else {
                    handleCopyLink();
                  }
                }}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                <div className="w-11 h-11 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/40">
                  <Share className="w-4.5 h-4.5" />
                </div>
                <span className="text-[10px] text-slate-600 font-semibold">System</span>
              </button>
            </div>

            {/* Copier link block */}
            <div className="flex items-center gap-2 bg-slate-100 p-2 pl-3 rounded-2xl border border-slate-200/40">
              <span className="text-xs text-slate-500 font-bold truncate flex-1 text-left">
                {window.location.origin}/?p={product.id}
              </span>
              <button
                onClick={handleCopyLink}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  isCopied
                    ? "bg-[#E6F4EA] text-[#137333]"
                    : "bg-[#02616A] text-white hover:bg-[#014f57]"
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-teal-800 text-white font-semibold text-xs py-2.5 px-5 rounded-full shadow-lg flex items-center gap-2 border border-teal-700 animate-bounce">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          Added {currentProduct.size} to Cart!
        </div>
      )}
    </div>
  );
}
