import React from "react";
import { Search, ShoppingCart, User, MapPin, ChevronDown } from "lucide-react";

// Asset imports
import imgFruitsVeg from "../../assets/categories/cat_fruits_veg.jpg";
import imgDairyEggs from "../../assets/categories/cat_dairy_eggs.jpg";
import imgSnacksMunchies from "../../assets/categories/cat_snacks_munchies.jpg";
import imgRiceAttaPulses from "../../assets/categories/cat_rice_atta_pulses.jpg";

import imgAttaRiceDal from "../../assets/categories/cat_atta_rice_dal.jpg";
import imgOilGheeMasala from "../../assets/categories/cat_oil_ghee_masala.jpg";
import imgDryfruitsCereals from "../../assets/categories/cat_dryfruits_cereals.jpg";
import imgKitchenMustHaves from "../../assets/categories/cat_kitchen_musthaves.jpg";

import imgBeverages from "../../assets/categories/cat_beverages.jpg";
import imgNamkeenChips from "../../assets/categories/cat_namkeen_chips.jpg";
import imgBiscuitsCookies from "../../assets/categories/cat_biscuits_cookies.jpg";
import imgInstantFrozen from "../../assets/categories/cat_instant_frozen.jpg";

import imgPersonalCare from "../../assets/categories/cat_personal_care.jpg";
import imgHomeCare from "../../assets/categories/cat_home_care.jpg";
import imgBabyCare from "../../assets/categories/cat_baby_care.jpg";
import imgMasalaSpices from "../../assets/categories/cat_masala_spices.jpg";

export interface CategoryCardData {
  id: string;
  nameLine1: string;
  nameLine2?: string;
  img: string;
}

export interface SectionData {
  id: string;
  title: string;
  cards: CategoryCardData[];
}

export const CATEGORY_SECTIONS: SectionData[] = [
  {
    id: "fresh",
    title: "Fresh",
    cards: [
      {
        id: "fruits_veg",
        nameLine1: "Fruits &",
        nameLine2: "Vegetables",
        img: imgFruitsVeg,
      },
      {
        id: "dairy_eggs",
        nameLine1: "Dairy &",
        nameLine2: "Eggs",
        img: imgDairyEggs,
      },
      {
        id: "snacks_munchies",
        nameLine1: "Snacks &",
        nameLine2: "Munchies",
        img: imgSnacksMunchies,
      },
      {
        id: "rice_atta_pulses",
        nameLine1: "Rice, Atta &",
        nameLine2: "Pulses",
        img: imgRiceAttaPulses,
      },
    ],
  },
  {
    id: "grocery_kitchen",
    title: "Grocery & Kitchen",
    cards: [
      {
        id: "atta_rice_dal",
        nameLine1: "Atta, Rice,",
        nameLine2: "Dal & More",
        img: imgAttaRiceDal,
      },
      {
        id: "oil_ghee_masala",
        nameLine1: "Oil, Ghee &",
        nameLine2: "Masala",
        img: imgOilGheeMasala,
      },
      {
        id: "dryfruits_cereals",
        nameLine1: "Dry Fruits &",
        nameLine2: "Cereals",
        img: imgDryfruitsCereals,
      },
      {
        id: "kitchen_musthaves",
        nameLine1: "Kitchen",
        nameLine2: "Must-Haves",
        img: imgKitchenMustHaves,
      },
    ],
  },
  {
    id: "snacks_drinks",
    title: "Snacks & Drinks",
    cards: [
      {
        id: "beverages",
        nameLine1: "Hot & Cold",
        nameLine2: "Beverages",
        img: imgBeverages,
      },
      {
        id: "namkeen_chips",
        nameLine1: "Namkeen &",
        nameLine2: "Chips",
        img: imgNamkeenChips,
      },
      {
        id: "biscuits_cookies",
        nameLine1: "Biscuits &",
        nameLine2: "Cookies",
        img: imgBiscuitsCookies,
      },
      {
        id: "instant_frozen",
        nameLine1: "Instant &",
        nameLine2: "Frozen Food",
        img: imgInstantFrozen,
      },
    ],
  },
  {
    id: "personal_home",
    title: "Personal & Home Care",
    cards: [
      {
        id: "personal_care",
        nameLine1: "Personal",
        nameLine2: "Care",
        img: imgPersonalCare,
      },
      {
        id: "home_care",
        nameLine1: "Home",
        nameLine2: "Care",
        img: imgHomeCare,
      },
      {
        id: "baby_care",
        nameLine1: "Baby",
        nameLine2: "Care",
        img: imgBabyCare,
      },
      {
        id: "masala_spices",
        nameLine1: "Masala &",
        nameLine2: "Spices",
        img: imgMasalaSpices,
      },
    ],
  },
];

interface CategoriesPageProps {
  onBack?: () => void;
  onSelectCategory?: (catId: string, catName: string) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function CategoriesPage({
  onBack,
  onSelectCategory,
  cartCount = 0,
  onOpenCart
}: CategoriesPageProps) {
  return (
    <div className="w-full bg-white text-gray-900 select-none">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 flex flex-col pt-1.5">
        {/* Row 1: Brand & Icons */}
        <div className="flex items-center justify-between px-4 pt-2 pb-1.5">
          <span 
            className="text-gray-900"
            style={{
              fontSize: 22,
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.03em",
              color: "#111827"
            }}
          >
            8 minutes
          </span>
          <div className="flex items-center gap-2">
            <button
              className="relative w-9 h-9 bg-gray-100 hover:bg-gray-200 active:scale-95 border border-gray-200 text-gray-800 rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer"
              onClick={onOpenCart}
              title="Cart"
            >
              <ShoppingCart style={{ width: 19, height: 19, color: "#1f2937" }} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-amber-500 text-white font-black rounded-full flex items-center justify-center border-2 border-white shadow-md"
                  style={{ minWidth: 17, height: 17, fontSize: 9, padding: "0 3px" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="w-9 h-9 bg-gray-100 hover:bg-gray-200 active:scale-95 border border-gray-200 text-gray-800 rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer"
              title="Profile"
            >
              <User style={{ width: 19, height: 19, color: "#1f2937" }} />
            </button>
          </div>
        </div>

        {/* Row 2: Location banner */}
        <div className="flex items-center justify-between px-4 pb-2">
          <button className="flex items-center gap-1.5 group text-gray-700 cursor-pointer">
            <MapPin style={{ width: 16, height: 16, color: "#4b5563" }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#374151", fontFamily: "'Inter', sans-serif" }}>
              HOME - Chelambra, Kerala
            </span>
            <ChevronDown style={{ width: 15, height: 15, color: "#4b5563", opacity: 0.9 }} />
          </button>
          <span style={{ color: "#4b5563", fontSize: 13, fontWeight: 500 }}>
            14-Aug
          </span>
        </div>

        {/* Row 3: Categories & Search Icon */}
        <div className="px-4 py-2.5 flex items-center justify-between border-t border-gray-100">
          <h1
            className="text-[20px] font-bold text-[#111827] tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Categories
          </h1>

          <button
            className="p-1.5 text-gray-900 active:scale-90 transition-transform cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5.5 h-5.5 stroke-[2.2]" />
          </button>
        </div>
      </header>

      {/* ── 4 SECTIONS WITH 4-COLUMN GRID ──────────────────────────────────── */}
      <main className="px-3.5 pt-1.5 pb-3 space-y-4.5">
        {CATEGORY_SECTIONS.map((section) => (
          <section key={section.id} className="space-y-3">
            {/* Section Title */}
            <h2
              className="text-[17px] font-bold text-[#111827] tracking-tight px-0.5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {section.title}
            </h2>

            {/* Exact 4-Column Grid */}
            <div className="grid grid-cols-4 gap-x-2.5 gap-y-3.5">
              {section.cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() =>
                    onSelectCategory?.(
                      card.id,
                      `${card.nameLine1} ${card.nameLine2 || ""}`.trim()
                    )
                  }
                  className="flex flex-col items-center cursor-pointer group select-none active:scale-[0.96] transition-transform duration-150"
                >
                  {/* Rounded-Square Card Container */}
                  <div
                    className="w-full relative rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#f3e7dc]/70 group-hover:shadow-md transition-shadow duration-200"
                    style={{
                      backgroundColor: "#F7ECE2",
                      aspectRatio: "0.88",
                    }}
                  >
                    <img
                      src={card.img}
                      alt={`${card.nameLine1} ${card.nameLine2 || ""}`}
                      className="w-full h-full object-cover object-center block group-hover:scale-[1.03] transition-transform duration-200"
                      loading="lazy"
                    />
                  </div>

                  {/* Centered Typography Directly Below */}
                  <div className="mt-1.5 text-center flex flex-col items-center justify-center leading-[1.25]">
                    <span
                      className="text-[11px] font-medium text-[#374151] tracking-tight line-clamp-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {card.nameLine1}
                    </span>
                    {card.nameLine2 && (
                      <span
                        className="text-[11px] font-medium text-[#374151] tracking-tight line-clamp-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {card.nameLine2}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
