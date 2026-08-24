import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Search, Share, Heart, ChevronRight, ChevronUp, ChevronDown, Truck, Plus, Minus, X, Check, ShoppingCart } from "lucide-react";

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
}: ProductDetailsPageProps) {
  // State for gallery
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // State for product specs
  const [selectedPack, setSelectedPack] = useState<"500g" | "250g">("500g");
  const [isFavorited, setIsFavorited] = useState(wish.has(product.id));
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("Kozhikode");

  // Accordion overall toggle
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

  // Keep state in sync when product changes
  useEffect(() => {
    setSelectedPack("500g");
    setIsFavorited(wish.has(product.id));
    setActiveImageIdx(0);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
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
  const cartQty = cart[currentProduct.id] || 0;
  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);

  // Cart operations
  const handleAddToCart = () => {
    setCart(prev => ({
      ...prev,
      [currentProduct.id]: (prev[currentProduct.id] || 0) + 1,
    }));
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  const handleIncrement = () => {
    setCart(prev => ({
      ...prev,
      [currentProduct.id]: (prev[currentProduct.id] || 0) + 1,
    }));
  };

  const handleDecrement = () => {
    setCart(prev => {
      const next = { ...prev };
      if ((next[currentProduct.id] || 0) > 1) {
        next[currentProduct.id]--;
      } else {
        delete next[currentProduct.id];
      }
      return next;
    });
  };

  // Share action
  const handleShare = async () => {
    const shareData = {
      title: `${product.name} on AlphaGro`,
      text: `Check out fresh ${product.name} on AlphaGro Grocery App!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert("Product URL copied to clipboard!");
    }
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
    <div className="flex flex-col h-full bg-[#F7F7F7] relative select-none">
      {/* Scrollable container for main details */}
      <div className="flex-1 overflow-y-auto hide-sb pb-24">
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

          {/* Navigation Overlay Buttons */}
          <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-10">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-all text-slate-800"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Search and Share */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={onBack} // Back to home and search
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-all text-slate-800"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-all text-slate-800"
              >
                <Share className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Pagination dots overlay */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    const width = scrollRef.current.offsetWidth;
                    scrollRef.current.scrollTo({ left: idx * width, behavior: "smooth" });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  idx === activeImageIdx ? "bg-slate-800" : "bg-white/80 shadow-[0_0.5px_1px_rgba(0,0,0,0.15)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 2. Product Summary Card */}
        <div className="mx-4 mt-4 bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] border border-slate-100">
          <div className="flex items-start justify-between">
            <div>
              {/* Brand Label */}
              <span className="inline-flex items-center text-[#1E8E3E] font-medium text-[13px] lowercase mb-1">
                {brandName} <ChevronRight className="w-3.5 h-3.5 ml-0.5 stroke-[2.5]" />
              </span>
              {/* Product Title */}
              <h1 className="text-[#202124] font-semibold text-[22px] tracking-tight leading-tight mt-0.5">
                {product.name}
              </h1>
            </div>

            {/* Favorite toggle */}
            <button
              onClick={toggleFavorite}
              className="w-10 h-10 rounded-full bg-[#F1F3F4] flex items-center justify-center active:scale-90 transition-all text-[#5F6368]"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
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
        <div className="mx-4 mt-3 bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] border border-slate-100">
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
        <div className="mx-4 mt-3 bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100/50">
          
          {/* Header overall accordion toggle */}
          <button
            onClick={() => setShowAccordionGroup(!showAccordionGroup)}
            className="w-full flex items-center justify-center py-4 border-b border-slate-100 text-slate-700 font-semibold text-sm gap-1 active:bg-slate-50/50 transition-colors"
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
            <div className="divide-y divide-slate-100">
              
              {/* About the Product */}
              <div className="p-4">
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
              <div className="p-4">
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
              <div className="p-4">
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
              <div className="p-4">
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
              <div className="p-4">
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

        {/* 5. Delivery Card */}
        <button
          onClick={() => setShowLocationModal(true)}
          className="mx-4 mt-3 w-[calc(100%-2rem)] flex items-center gap-3.5 bg-[#EFF2F3] hover:bg-[#E7EAEB] rounded-[24px] p-4 border border-[#E0E4E6]/50 transition-colors text-left"
        >
          {/* Circular green icon */}
          <div className="w-[42px] h-[42px] rounded-full bg-[#004D40] flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 text-[#8AD8B1] stroke-[2.5]" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-[#002D30] font-normal text-[14px] tracking-tight">
              Delivery Today, 4:00 PM - 6:00 PM
            </h4>
            <p className="text-[#5F6368] text-[11px] font-normal mt-0.5 flex items-center">
              Delivering to&nbsp;<span className="text-[#202124] font-normal flex items-center">{deliveryLocation}<ChevronDown className="w-3 h-3 ml-0.5 stroke-[3] text-[#5F6368]" /></span>
            </p>
          </div>
        </button>

      </div>

      {/* 6. Fixed Bottom Purchase CTA Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-2.5 px-4 z-20 flex items-center gap-3 pb-[calc(10px+env(safe-area-inset-bottom,0px))]">
        {/* Left Cart Button with Badge */}
        <button
          onClick={onOpenCart}
          className="w-12 h-12 rounded-[14px] border border-slate-200 bg-white flex items-center justify-center relative flex-shrink-0 active:scale-95 transition-all text-slate-800"
        >
          <ShoppingCart className="w-5 h-5 stroke-[2]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#F03A60] text-white text-[9.5px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          )}
        </button>

        {/* Right Button (Add or Qty Selector) */}
        <div className="flex-1 h-12">
          {cartQty === 0 ? (
            <button
              onClick={handleAddToCart}
              style={{ backgroundColor: TEAL }}
              className="w-full h-full text-white font-extrabold text-sm rounded-[14px] active:scale-[0.98] active:bg-[#014f57] transition-all flex items-center justify-center shadow-md shadow-teal-900/10 cursor-pointer"
            >
              Add to Cart
            </button>
          ) : (
            <div
              style={{ backgroundColor: TEAL }}
              className="w-full h-full text-white font-extrabold text-sm rounded-[14px] flex items-center justify-between px-4 shadow-md shadow-teal-900/10"
            >
              {/* Decrement */}
              <button
                onClick={handleDecrement}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center active:scale-90 hover:bg-white/20 transition-all text-white"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>

              {/* Qty and price details */}
              <div className="flex flex-col items-center">
                <span className="text-[13px] tracking-tight font-extrabold">
                  {cartQty} in Cart
                </span>
                <span className="text-[9px] text-white/80 font-semibold mt-0.5">
                  Total: ₹{(cartQty * currentProduct.price).toFixed(selectedPack === "250g" ? 2 : 0)}
                </span>
              </div>

              {/* Increment */}
              <button
                onClick={handleIncrement}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center active:scale-90 hover:bg-white/20 transition-all text-white"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
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

      {/* Location Picker Modal */}
      {showLocationModal && (
        <div
          className="absolute inset-0 bg-black/40 z-50 flex items-end justify-center"
          onClick={() => setShowLocationModal(false)}
        >
          <div
            className="w-full bg-white rounded-t-3xl p-5 pb-8 max-w-[420px]"
            onClick={e => e.stopPropagation()}
            style={{ animation: "slideUp 250ms cubic-bezier(.4,0,.2,1)" }}
          >
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 font-extrabold text-base">Select Delivery Location</h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {["Kozhikode", "Ernakulam", "Trivandrum", "Bengaluru", "Chennai"].map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    setDeliveryLocation(loc);
                    setShowLocationModal(false);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                    deliveryLocation === loc
                      ? "border-[#02616A] bg-[#02616A]/[0.02] text-teal-800"
                      : "border-slate-100 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{loc}</span>
                  {deliveryLocation === loc && <Check className="w-4 h-4 text-teal-800 stroke-[3.5]" />}
                </button>
              ))}
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
