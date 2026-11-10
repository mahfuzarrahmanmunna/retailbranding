"use client";

import { useSyncExternalStore } from "react";

/**
 * Lightweight bilingual UI microcopy (blueprint §12).
 *
 * The toggle switches interface labels between English and Bangla in the
 * browser. Full Bangla content routes (/bn with hreflang, §16) should be added
 * once professionally translated page copy is available — machine-translated
 * duplicates are explicitly discouraged.
 */
export type Lang = "en" | "bn";

const dict = {
  exploreProducts: { en: "Explore Products", bn: "প্রোডাক্ট দেখুন" },
  customizeSign: { en: "Customize Your Sign", bn: "আপনার সাইনবোর্ড কাস্টমাইজ করুন" },
  customizeGetPrice: { en: "Customize & Get Price", bn: "কাস্টমাইজ করে মূল্য দেখুন" },
  requestQuote: { en: "Request a Quote", bn: "কোটেশন নিন" },
  uploadLogo: { en: "Upload Your Logo", bn: "আপনার লোগো আপলোড করুন" },
  selectMaterial: { en: "Select Material", bn: "ম্যাটেরিয়াল নির্বাচন করুন" },
  enterWidth: { en: "Enter Width", bn: "প্রস্থ লিখুন" },
  enterHeight: { en: "Enter Height", bn: "উচ্চতা লিখুন" },
  estimatedPrice: { en: "Estimated Price", bn: "আনুমানিক মূল্য" },
  finalAfterReview: { en: "Final price after review", bn: "যাচাইয়ের পর চূড়ান্ত মূল্য জানানো হবে" },
  installationRequired: { en: "Installation Required?", bn: "ইনস্টলেশন প্রয়োজন?" },
  addToCart: { en: "Add to Cart", bn: "কার্টে যোগ করুন" },
  proceedCheckout: { en: "Proceed to Checkout", bn: "অর্ডার সম্পন্ন করতে এগিয়ে যান" },
  talkExpert: { en: "Talk to an Expert", bn: "বিশেষজ্ঞের সাথে কথা বলুন" },
  artworkReview: { en: "Artwork Needs Review", bn: "ডিজাইন ফাইল যাচাই করা প্রয়োজন" },
  orderConfirmed: { en: "Order Confirmed", bn: "অর্ডার নিশ্চিত হয়েছে" },
  weWillContact: { en: "We will contact you", bn: "আমাদের টিম আপনার সাথে যোগাযোগ করবে" },
  quoteRequired: { en: "Quote required", bn: "কোটেশন প্রয়োজন" },
  fixedPrice: { en: "Fixed price", bn: "নির্ধারিত মূল্য" },
  cart: { en: "Cart", bn: "কার্ট" },
  home: { en: "Home", bn: "হোম" },
  categories: { en: "Categories", bn: "ক্যাটাগরি" },
  customize: { en: "Customize", bn: "কাস্টমাইজ" },
  help: { en: "Help", bn: "সাহায্য" },
  menu: { en: "Menu", bn: "মেনু" },
  quantity: { en: "Quantity", bn: "পরিমাণ" },
  width: { en: "Width", bn: "প্রস্থ" },
  height: { en: "Height", bn: "উচ্চতা" },
} as const;

export type DictKey = keyof typeof dict;

const KEY = "rb-lang";
const listeners = new Set<() => void>();

function read(): Lang {
  try {
    return localStorage.getItem(KEY) === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
}

export function setLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* storage unavailable */
  }
  document.documentElement.lang = lang;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "en");
}

export function useT() {
  const lang = useLang();
  return (key: DictKey) => dict[key][lang];
}
