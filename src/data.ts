import { Product, BlogPost, Review, ThemeSettings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Handmade Wooden Lounge Chair',
    category: 'Furniture',
    price: 850,
    oldPrice: 1200,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600&auto=format&fit=crop',
    isSale: true,
    isNew: false,
    stock: 12,
    description: 'Beautifully hand-crafted lounge chair made of sustainably sourced teak wood. Perfect for modern living rooms or minimalist cozy corners. Includes a detachable linen cushion designed for superior ergonomic support.',
    features: [
      '100% Solid Teak Wood Construction',
      'Artisanal hand-jointed details',
      'Premium linen upholstered cushion included',
      'Durable matte oil finish protection'
    ]
  },
  {
    id: 'prod-2',
    title: 'Premium Minimalist Walnut Desk',
    category: 'Furniture',
    price: 1500,
    oldPrice: 1800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1530018607912-eff2df11a116?q=80&w=600&auto=format&fit=crop',
    isSale: false,
    isNew: true,
    stock: 5,
    description: 'Elevate your workspace with this high-density solid mahogany and walnut desk. Designed with subtle built-in cable management channels and a sleek storage compartment.',
    features: [
      'Authentic Dark American Walnut layer',
      'Integrated wireless charging hub ready slot',
      'Dual powder-coated steel legs',
      'Toxin-free environmental sealing'
    ]
  },
  {
    id: 'prod-3',
    title: 'De-Luxe Organic Rosehip Face Oil',
    category: 'Health & Beauty',
    price: 450,
    oldPrice: 650,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop',
    isSale: true,
    isNew: false,
    stock: 24,
    description: 'Dermatologist-tested cold-pressed organic rosehip face serum. Rich in essential fatty acids and antioxidants to nurture skin glow, reduce fine lines, and support natural elasticity.',
    features: [
      '100% Certified Organic Rosehip seeds',
      'Cold-pressed extraction preserves nutrients',
      'Fragrance-free and hypoallergenic formulation',
      'Housed in recyclable UV-protected amber glass'
    ]
  },
  {
    id: 'prod-4',
    title: 'Handcrafted Ceramic Tea Set',
    category: 'Home Decor',
    price: 1200,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
    isSale: false,
    isNew: false,
    stock: 8,
    description: 'A traditional clay teaware set crafted by award-winning pottery artisans. Includes one elegant teapot with a brass-woven handle and four matching stackable cups.',
    features: [
      'High-firing natural stone clay base',
      'Unique crackle glazed interior detailing',
      'Natural heat-insulation properties',
      'Presented in a padded linen gift-box'
    ]
  },
  {
    id: 'prod-5',
    title: 'Hyperion Smart Desk Lamp v2',
    category: 'Gadgets',
    price: 950,
    oldPrice: 1100,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop',
    isSale: true,
    isNew: true,
    stock: 3,
    description: 'A touchless gesture-controlled smart LED lamp. Emits optimal flicker-free light across multiple color spectrums to avoid eye exhaustion. Connects to home setups seamlessly.',
    features: [
      'Gesture dimming / color temperature dial',
      'CRI > 95 for ultra-true color accuracy',
      'Built-in USB-C accessory output port',
      'Smart ambient light-level auto sensor'
    ]
  },
  {
    id: 'prod-6',
    title: 'Linen Comfort Bedding Set',
    category: 'Home Decor',
    price: 2200,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop',
    isSale: false,
    isNew: false,
    stock: 14,
    description: 'A 100% pure french flax linen sheets and pillowcase duvet cover set. Pre-washed for incredible stone-soft touch and breathability across any seasons.',
    features: [
      '100% French Flax Flaxseed Linen',
      'Naturally hypoallergenic & temperature regulating',
      'Reinforced deep-pocket safety borders',
      'Biodegradable and luxury-weight woven structure'
    ]
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Art of Minimalist Living: Designing with Teak',
    category: 'Furniture',
    date: 'June 5, 2026',
    author: 'Elena Vance',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=600&auto=format&fit=crop',
    excerpt: 'Minimalist interior design is not about having empty rooms; it is about bringing intentional soul. Discover how solid teak wood bridges absolute utility with visual lightness and comfort.',
    content: `When we look at the Shopify Dawn aesthetic, we notice a severe elegance: white space, bold serif typography, and natural, tactile materials. Teak wood has been a staple of minimalist interior craft for over a century, offering a blend of unmatched outdoor durability and high warmth interiors.

To adopt this mood in your home, start with one centerpiece: a hand-carved solid teak lounge chair. Keep the surrounding palette soft—using off-whites, neutral linen rugs, and warm amber lamps. This highlights the natural wood grain, letting the craftsmanship do the talking rather than crowding the room. This sustainable decoration creates an inspiring, stress-free shelter for your busy life.`,
    views: 1240
  },
  {
    id: 'post-2',
    title: 'Top Skincare Ingredients to Revitalize Your Natural Shine',
    category: 'Health & Beauty',
    date: 'June 2, 2026',
    author: 'Dr. Sarah Chowdhury',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
    excerpt: 'Luminous skin is healthy skin. Learn why cold-pressed organic rosehip oil acts as a powerhouse of vitamins for deep cellular restoration.',
    content: `Navigating the skincare cosmos can match a puzzle. Out of hundreds of modern serums, rosehip oil stands out due to its historic roots and immediate nutrient bioavailability. Unlike synthetic creams, cold-pressed rosehip seed extract matches skin lipid profiles naturally.

This article delves into why rosehip works: it consists of over 70% essential fatty acids (Linoleic and Linolenic) that reinforce moisture barrier resilience. Combined with naturally occurring Vitamin A (retinol precursors), it gently accelerates cellular turnover without stripping away moisture. Combine this treatment with a simple, hydrating cleanser for clean skin.`,
    views: 890
  },
  {
    id: 'post-3',
    title: 'Traditional Teaware and the Modern Ritual of Slow Life',
    category: 'Home Decor',
    date: 'May 28, 2026',
    author: 'Takahiro Sato',
    image: 'https://images.unsplash.com/photo-1515696955266-4f67e13219e8?q=80&w=600&auto=format&fit=crop',
    excerpt: 'Pouring tea is a dynamic meditation. Here is a guide on how clay teaware enhances therapeutic tea preparation, taste, and sensory connection.',
    content: `In our hyper-connected digital days, the simple act of preparing tea becomes an act of deliberate relaxation. Our pottery ancestors understood that the cup we hold contributes heavily to the taste and mental experience of beverage preparation.

Natural stone clay teaware provides exceptional micro-porosity. Over time, brewing high-mountain Oolongs or Darjeelings inside unglazed clay infuses the material with minerals, deepening and softening any following tea tasting. Grab a ceramic teapot, boil purified water, and let yourself enjoy 10 minutes of complete silence away from mobile phone alerts.`,
    views: 654
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Shahed Zaman',
    userEmail: 'shahed.z@gmail.com',
    rating: 5,
    comment: 'The lounge chair is absolutely gorgeous. The wood finish is flawless and smooth. It feels incredibly premium and works beautifully in my reading nook. Quick shipping directly to Dhaka too!',
    date: 'June 4, 2026',
    status: 'approved'
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userName: 'Jessica Miller',
    userEmail: 'jess.m@yahoo.com',
    rating: 4,
    comment: 'Very comfortable and solid wood. The delivery was safe. Cushion was a little firmer than expected but softened after a couple of days. Highly recommended!',
    date: 'May 30, 2026',
    status: 'approved'
  },
  {
    id: 'rev-3',
    productId: 'prod-3',
    userName: 'Farhana Kabir',
    userEmail: 'farhana.k@outlook.com',
    rating: 5,
    comment: 'Using this Rosehip serum every night for a week now. My skin feels like silk and has a beautiful glow in the morning. Best bKash purchase I made this month.',
    date: 'June 1, 2026',
    status: 'approved'
  },
  {
    id: 'rev-4',
    productId: 'prod-5',
    userName: 'Tanvir Hossain',
    userEmail: 't.hossain@technologies.com',
    rating: 5,
    comment: 'The hand gesture control works perfectly! Perfect light spectrum tuning for working in terminal IDEs or reading physical sheets. Fast delivery.',
    date: 'May 25, 2026',
    status: 'approved'
  }
];

export const DEFAULT_THEME: ThemeSettings = {
  announcementText: '✨ Eid Special Collection: Save 30%! Use automatic bKash & Nagad checkout for instant cashbacks.',
  announcementBg: '#1a1a1a',
  announcementColor: '#ffffff',
  showAnnouncement: true,
  
  logoText: 'De-Luxe ✦ Studio',
  accentColor: '#c8a96e',
  primaryBg: '#ffffff',
  cardBg: '#faf9f6',
  textColor: '#1a1a1a',
  fontPairing: 'classic', // classic, modern, editorial, minimalist
  
  heroBadge: 'Est. 2026 Crafted Excellence',
  heroTitle: 'Premium Quality Handcrafted Goods',
  heroSubtitle: 'A boutique selection curated for minimalist living, organic wellness, and fine artisanal home decor.',
  heroBtnText: 'Shop the Collection',
  heroBgUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
  
  showFeatures: true,
  showAbout: true,
  aboutTitle: 'Our Crafting Philosophy',
  aboutSubtitle: 'Designed with Precision, Crafted by Hand',
  aboutDescription: 'আমরা বিশ্বাস করি প্রতিটি পণ্য একটি অনন্য গল্প বলে। আমাদের কারিগররা প্রাচীন ও আধুনিক প্রযুক্তির মিশ্রণে প্রতিটি বিবরণ নিখুঁতভাবে তৈরি করেন। De-Luxe ensures ethical sourcing and sustainable luxury that elevates your daily routine.',
  aboutImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop',
  aboutLinkText: 'Discover Our Story →',
  
  sections: ['announcement', 'header', 'hero', 'features', 'products', 'blog', 'about', 'payment_bar', 'footer']
};
