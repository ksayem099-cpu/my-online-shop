/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Sliders, ShieldCheck, Trash2, Plus, Minus, ShoppingCart, Terminal, Info, X, Zap } from 'lucide-react';
import { Product, BlogPost, Review, ThemeSettings, CartItem, Order } from './types';
import { INITIAL_PRODUCTS, INITIAL_BLOGS, INITIAL_REVIEWS, DEFAULT_THEME } from './data';

// Components
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import BlogGrid from './components/BlogGrid';
import AboutSection from './components/AboutSection';
import PaymentBar from './components/PaymentBar';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import SEOOptimizer from './components/SEOOptimizer';
import AdminPanel from './components/AdminPanel';
import ThemeEditor from './components/ThemeEditor';
import MerchantWorkspace from './components/MerchantWorkspace';

export default function App() {
  // Roster States
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('deluxe_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('deluxe_blogs');
    return saved ? JSON.parse(saved) : INITIAL_BLOGS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('deluxe_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('deluxe_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-INIT99',
        date: 'June 5, 2026',
        customerName: 'Kazi Sayem',
        customerEmail: 'ksayem099@gmail.com',
        customerPhone: '01712000000',
        customerAddress: 'Banani 11, Dhaka, Bangladesh',
        items: [
          {
            productId: 'prod-1',
            productTitle: 'Handmade Wooden Lounge Chair',
            price: 850,
            quantity: 1
          }
        ],
        totalAmount: 910, // 850 + 60
        paymentMethod: 'bkash',
        paymentStatus: 'paid',
        transactionId: 'TXN-INITBKASH',
        status: 'delivered'
      }
    ];
  });

  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('deluxe_theme');
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

  // Client Interface parameters
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('deluxe_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isMerchantWorkspace, setIsMerchantWorkspace] = useState<boolean>(() => {
    return window.location.search.includes('admin=true') || window.location.hash.includes('admin');
  });

  useEffect(() => {
    const handleHashAndSearch = () => {
      setIsMerchantWorkspace(window.location.search.includes('admin=true') || window.location.hash.includes('admin'));
    };
    window.addEventListener('hashchange', handleHashAndSearch);
    return () => window.removeEventListener('hashchange', handleHashAndSearch);
  }, []);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Sync state variables with localStorage safely
  useEffect(() => {
    localStorage.setItem('deluxe_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('deluxe_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('deluxe_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('deluxe_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('deluxe_theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('deluxe_cart', JSON.stringify(cart));
  }, [cart]);

  // CATEGORIES DEFINITION (derived from product catalog)
  const categories = Array.from(new Set(products.map((p) => p.category))) as string[];

  // FILTERED CATALOG list
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // CART DRIVER MOTIONS
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prevCart];
        const targetQty = next[idx].quantity + quantity;
        next[idx].quantity = Math.min(product.stock, targetQty);
        return next;
      }
      return [...prevCart, { product, quantity: Math.min(product.stock, quantity) }];
    });
    setShowCartDrawer(true);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.product.id === productId) {
          const nextQty = item.quantity + delta;
          const matchedProd = products.find(p => p.id === productId);
          const limit = matchedProd ? matchedProd.stock : 99;
          return {
            ...item,
            quantity: Math.max(1, Math.min(limit, nextQty))
          };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // MERCHANT LOGS ACTIONS
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleAddBlogPost = (newPost: BlogPost) => {
    setBlogs((prev) => [newPost, ...prev]);
  };

  const handleRegisterReview = (newReviewOmit: Omit<Review, 'id' | 'date' | 'status'>) => {
    const freshReview: Review = {
      ...newReviewOmit,
      id: 'rev-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'approved', // instantly approved for smooth preview interaction
    };
    setReviews((prev) => [freshReview, ...prev]);
  };

  const handleApproveReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: 'approved' } : r))
    );
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  const handleNewOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);

    // Fast decrease stock sizes seamlessly 
    newOrder.items.forEach((item) => {
      setProducts((currentProds) => {
        return currentProds.map((p) => {
          if (p.id === item.productId) {
            return {
              ...p,
              stock: Math.max(0, p.stock - item.quantity)
            };
          }
          return p;
        });
      });
    });
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  // Switch font weights
  const bodyClass = theme.fontPairing === 'classic' || theme.fontPairing === 'editorial' ? 'font-serif' : 'font-sans';

  // DRAG AND SORTABLE HOME BUILDING RENDERING BLOCK
  const renderHomeContentSection = (sectionName: string) => {
    switch (sectionName) {
      case 'hero':
        return <Hero theme={theme} />;
      case 'features':
        return <Features theme={theme} />;
      case 'products':
        return (
          <section className="py-8 px-4 sm:px-6 md:px-8 bg-white" id="store_products_headline">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="text-left border-b border-stone-200 pb-3 flex justify-between items-end">
                <div>
                  <h2 className={`text-2xl font-bold text-gray-900 tracking-tight ${theme.fontPairing === 'classic' || theme.fontPairing === 'editorial' ? 'font-serif' : 'font-sans'}`}>Featured Products Catalog</h2>
                  <p className="text-xs text-gray-500 mt-1">Ethically sourced premium creations, optimized for swift performance.</p>
                </div>
                {selectedCategory && (
                  <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-800 font-bold px-2 py-1 rounded">
                    Filtering: {selectedCategory}
                  </span>
                )}
              </div>
              
              {/* Responsive main split: Product catalog Grid vs Sidebar details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-9">
                  <ProductGrid
                    products={filteredProducts}
                    reviews={reviews}
                    theme={theme}
                    onAddToCart={handleAddToCart}
                    onAddReview={handleRegisterReview}
                  />
                </div>
                
                <div className="lg:col-span-3">
                  <Sidebar
                    theme={theme}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    popularBlogs={blogs}
                    onReadPost={(post) => {
                      const element = document.getElementById('store_blogs_headline');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      case 'blog':
        return (
          <section className="py-10 px-4 sm:px-6 md:px-8 bg-stone-50/50" id="store_blogs_headline">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="text-left border-b border-stone-200 pb-3">
                <h2 className={`text-2xl font-bold text-gray-900 tracking-tight ${theme.fontPairing === 'classic' || theme.fontPairing === 'editorial' ? 'font-serif' : 'font-sans'}`}>Blogger Articles</h2>
                <p className="text-xs text-gray-500 mt-1">Our latest stories, guides, rituals and reviews written by our artisans.</p>
              </div>
              <BlogGrid blogs={blogs} theme={theme} />
            </div>
          </section>
        );
      case 'about':
        return <AboutSection theme={theme} />;
      case 'payment_bar':
        return <PaymentBar theme={theme} />;
      default:
        return null;
    }
  };

  const shopSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // STYLING INJECTION BASED ON CUSTOMIZER SETTINGS
  const themeAccentStyle = {
    '--accent': theme.accentColor,
    '--bg': theme.primaryBg,
    '--textColor': theme.textColor,
  } as React.CSSProperties;

  const renderSimulatedStorefront = () => {
    return (
      <div className="w-full min-h-full flex flex-col justify-between bg-stone-50 select-none pointer-events-none text-xs">
        <div>
          <AnnouncementBar theme={theme} />
          <Header
            theme={theme}
            cart={[]}
            currentView="shop"
            onViewChange={() => {}}
            onCartToggle={() => {}}
            onSearchChange={() => {}}
            searchQuery=""
          />
          {theme.sections.map((sec) => (
            <div key={sec}>
              {renderHomeContentSection(sec)}
            </div>
          ))}
        </div>
        <Footer theme={theme} />
      </div>
    );
  };

  if (isMerchantWorkspace) {
    return (
      <MerchantWorkspace
        products={products}
        blogs={blogs}
        reviews={reviews}
        orders={orders}
        theme={theme}
        onChangeTheme={setTheme}
        onAddProduct={handleAddProduct}
        onUpdateStock={handleUpdateStock}
        onRemoveProduct={handleRemoveProduct}
        onAddBlogPost={handleAddBlogPost}
        onApproveReview={handleApproveReview}
        onDeleteReview={handleDeleteReview}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onCloseMerchantPortal={() => {
          setIsMerchantWorkspace(false);
          window.location.hash = '';
        }}
        renderSimulatedStorefront={renderSimulatedStorefront}
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-stone-100 flex flex-col items-center justify-between transition-colors duration-300 relative"
      style={themeAccentStyle}
    >
      
      {/* RENDER GRID */}
      <div className="w-full flex-1 flex flex-col bg-stone-50">
        
        {/* STANDARD PURE PUBLIC STORE VIEW */}
        <div className="w-full flex-grow flex flex-col justify-between">
          <div>
            <AnnouncementBar theme={theme} />
            
            <Header
              theme={theme}
              cart={cart}
              currentView="shop"
              onViewChange={() => {}}
              onCartToggle={() => setShowCartDrawer(true)}
              onSearchChange={setSearchQuery}
              searchQuery={searchQuery}
            />
            
            {/* Direct Dynamic Component Block render listed in order */}
            {theme.sections.map((sec) => (
              <div key={sec}>
                {renderHomeContentSection(sec)}
              </div>
            ))}
          </div>


          <Footer
            theme={theme}
            onMerchantLogin={() => {
              setIsMerchantWorkspace(true);
              window.location.hash = 'admin';
            }}
          />
        </div>

      </div>

      {/* SHOPPING BASKET SLIDEOUT DRAWER panel */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-3xs overflow-hidden">
          <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl relative animate-slide-left">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50">
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-5 h-5 text-amber-700" />
                <h3 className="font-bold text-sm text-gray-950 font-sans uppercase">Your Shopping Basket</h3>
              </div>
              <button onClick={() => setShowCartDrawer(false)} className="p-1 hover:bg-stone-200 rounded-full transition cursor-pointer">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Basket Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <span className="text-4xl">🛒</span>
                  <p className="text-xs text-gray-500 font-medium">Your basket is empty coordinate.</p>
                  <button
                    onClick={() => {
                      setShowCartDrawer(false);
                      const element = document.getElementById('store_products_headline');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-amber-700 font-bold underline"
                  >
                    Start Shopping Now
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 border-b border-stone-100 pb-3 h-20 items-center justify-between text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-12 h-12 rounded object-cover border"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-bold text-gray-900 truncate">{item.product.title}</p>
                      <p className="text-gray-500 text-[10px] mt-0.5">Price: ৳{item.product.price}</p>
                      
                      {/* Quantity dial inline */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <button
                          onClick={() => handleUpdateCartQty(item.product.id, -1)}
                          className="w-4 h-4 bg-gray-150 border rounded-sm flex items-center justify-center font-bold text-[10px]"
                        >
                          -
                        </button>
                        <span className="font-bold px-1.5 text-[10px]">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateCartQty(item.product.id, 1)}
                          className="w-4 h-4 bg-gray-150 border rounded-sm flex items-center justify-center font-bold text-[10px]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <p className="font-bold text-gray-950">৳{item.product.price * item.quantity}</p>
                      <button
                        onClick={() => handleRemoveFromCart(item.product.id)}
                        className="text-[9px] text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total Calculator inside slider */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-150 bg-stone-50 space-y-4 text-xs">
                <div className="flex justify-between font-bold text-gray-900 text-sm">
                  <span>Cart Subtotal</span>
                  <span className="text-xl text-emerald-800">৳{shopSubtotal}</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-none">Shipping and taxes calculated securely at checkout screen.</p>
                
                <button
                  onClick={() => {
                    setShowCartDrawer(false);
                    setShowCheckoutModal(true);
                  }}
                  className="w-full bg-gray-950 text-white py-3 rounded-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition cursor-pointer"
                >
                  <ShieldCheck className="w-4.5 h-4.5" /> Proceed to Secure Payment checkout
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* SECURE payment sheet and shipping invoice */}
      {showCheckoutModal && (
        <CheckoutModal
          cart={cart}
          theme={theme}
          onClose={() => setShowCheckoutModal(false)}
          onClearCart={() => setCart([])}
          onNewOrder={handleNewOrder}
        />
      )}

    </div>
  );
}
