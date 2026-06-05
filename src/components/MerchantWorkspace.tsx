/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  ShoppingCart, 
  BookOpen, 
  MessageSquare, 
  Receipt, 
  Globe, 
  Sliders, 
  Plus, 
  Trash2, 
  TrendingUp, 
  CheckCircle2, 
  Package, 
  ArrowUpRight, 
  Eye, 
  Smartphone, 
  Monitor,
  Layout,
  RefreshCw,
  LogOut,
  Sparkles,
  Search,
  Check,
  ChevronRight
} from 'lucide-react';
import { Product, BlogPost, Review, Order, ThemeSettings } from '../types';
import AdminPanel from './AdminPanel';
import ThemeEditor from './ThemeEditor';

interface MerchantWorkspaceProps {
  products: Product[];
  blogs: BlogPost[];
  reviews: Review[];
  orders: Order[];
  theme: ThemeSettings;
  onChangeTheme: (theme: ThemeSettings) => void;
  onAddProduct: (product: Product) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onRemoveProduct: (productId: string) => void;
  onAddBlogPost: (post: BlogPost) => void;
  onApproveReview: (reviewId: string) => void;
  onDeleteReview: (reviewId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onCloseMerchantPortal: () => void;
  renderSimulatedStorefront: () => React.ReactNode;
}

export default function MerchantWorkspace({
  products,
  blogs,
  reviews,
  orders,
  theme,
  onChangeTheme,
  onAddProduct,
  onUpdateStock,
  onRemoveProduct,
  onAddBlogPost,
  onApproveReview,
  onDeleteReview,
  onUpdateOrderStatus,
  onCloseMerchantPortal,
  renderSimulatedStorefront,
}: MerchantWorkspaceProps) {
  const [currentModule, setCurrentModule] = useState<'dashboard' | 'inventory' | 'visual_editor' | 'orders' | 'reviews' | 'blogs'>('dashboard');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  // Compute stats metrics
  const totalSalesRevenue = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrdersCount = orders.filter(o => o.status !== 'delivered').length;
  const approvedReviewsCount = reviews.filter(r => r.status === 'approved').length;
  const lowStockCount = products.filter(p => p.stock <= 3).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      
      {/* Sleek dashboard top banner header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 rounded-lg border border-amber-500/30">
            <Layers className="w-5.5 h-5.5 text-amber-500 animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-1.5 font-sans">
              De-Luxe Merchant Console <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">Business Suite</span>
            </h1>
            <p className="text-[10px] text-slate-400 mt-0.5">Separate Personal Platform for Catalog Moderation &amp; Responsive Layout Design</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right font-sans">
            <span className="text-[10px] font-bold text-slate-400">Merchant Session</span>
            <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> ksayem099@gmail.com</span>
          </div>

          <button
            onClick={onCloseMerchantPortal}
            className="bg-amber-650 hover:bg-amber-600 font-extrabold text-[10px] uppercase tracking-wider text-white py-2 px-4 rounded-md transition duration-200 flex items-center gap-1.5 shadow-lg shadow-amber-950/20 hover:-translate-y-0.5 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" /> Launch Public Website ↗
          </button>
        </div>
      </header>

      {/* Main split work layout */}
      <div className="flex-grow flex flex-col lg:flex-row">
        
        {/* Left Side modular console navigation bar */}
        <aside className="w-full lg:w-64 bg-slate-900/40 lg:border-r border-slate-800 p-5 flex flex-col justify-between space-y-6 shrink-0 text-left">
          <div className="space-y-6">
            <div className="text-slate-500 uppercase tracking-wider font-extrabold text-[9px]">Administrative Workspace</div>
            
            <nav className="flex flex-col gap-1.5">
              <button
                onClick={() => setCurrentModule('dashboard')}
                className={`py-2.5 px-3.5 text-xs font-bold uppercase rounded-md transition flex items-center justify-between cursor-pointer ${currentModule === 'dashboard' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4" /> Operations Dashboard
                </span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setCurrentModule('inventory')}
                className={`py-2.5 px-3.5 text-xs font-bold uppercase rounded-md transition flex items-center justify-between cursor-pointer ${currentModule === 'inventory' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2.5">
                  <ShoppingCart className="w-4 h-4" /> Products &amp; Warehouse
                </span>
                {lowStockCount > 0 && (
                  <span className="bg-red-500 text-white font-sans text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                    {lowStockCount} ALERT
                  </span>
                )}
              </button>

              <button
                onClick={() => setCurrentModule('visual_editor')}
                className={`py-2.5 px-3.5 text-xs font-bold uppercase rounded-md transition flex items-center justify-between cursor-pointer ${currentModule === 'visual_editor' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2.5">
                  <Sliders className="w-4 h-4" /> Visual Theme composer
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 font-sans text-[8px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/20">LIVE</span>
              </button>

              <button
                onClick={() => setCurrentModule('orders')}
                className={`py-2.5 px-3.5 text-xs font-bold uppercase rounded-md transition flex items-center justify-between cursor-pointer ${currentModule === 'orders' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2.5">
                  <Receipt className="w-4 h-4" /> Customer Invoices
                </span>
                {pendingOrdersCount > 0 && (
                  <span className="bg-amber-500 text-slate-950 font-sans text-[8px] font-black px-1.5 py-0.5 rounded-full">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCurrentModule('reviews')}
                className={`py-2.5 px-3.5 text-xs font-bold uppercase rounded-md transition flex items-center justify-between cursor-pointer ${currentModule === 'reviews' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" /> Reviews Moderation
                </span>
                <span className="text-slate-500 text-[9px]">{reviews.length}</span>
              </button>

              <button
                onClick={() => setCurrentModule('blogs')}
                className={`py-2.5 px-3.5 text-xs font-bold uppercase rounded-md transition flex items-center justify-between cursor-pointer ${currentModule === 'blogs' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4" /> Blogger Publisher
                </span>
                <span className="text-slate-500 text-[9px]">{blogs.length}</span>
              </button>
            </nav>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800/80 space-y-2.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Sync State Status</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
              All inventory updates, visual adjustments, and section hierarchies are synced in local memory immediately.
            </p>
            <div className="text-[9px] text-slate-500 font-mono flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" /> Auto-persistence enabled
            </div>
          </div>
        </aside>

        {/* Primary Right Panel Workspace */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto max-h-[92vh]">
          
          {/* MODULE 1: OPERATIONS DASHBOARD */}
          {currentModule === 'dashboard' && (
            <div className="space-y-8 animate-fade-in text-left">
              <div>
                <h2 className="text-xl font-bold font-sans tracking-tight text-white">Merchant Operations Summary</h2>
                <p className="text-xs text-slate-400 mt-1">Real-time indicators showing shopper engagement and payout flows.</p>
              </div>

              {/* Grid bento metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-slate-900 border border-slate-800/90 rounded-lg p-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Total Profit Revenue</p>
                    <p className="text-xl font-black text-white">৳{totalSalesRevenue}</p>
                    <p className="text-[9px] text-emerald-400 font-bold flex items-center gap-0.5"><TrendingUp className="w-3.5 h-3.5" /> +22.4% this quarter</p>
                  </div>
                  <span className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800/90 rounded-lg p-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Fulfillment Queue</p>
                    <p className="text-xl font-black text-white">{pendingOrdersCount} orders</p>
                    <p className="text-[9px] text-slate-400">Needs dispatch packages</p>
                  </div>
                  <span className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg">
                    <Package className="w-5 h-5" />
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800/90 rounded-lg p-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Warehouse Catalog Size</p>
                    <p className="text-xl font-black text-white">{products.length} Products</p>
                    <p className="text-[9px] text-slate-400">Categorized inside 4 groups</p>
                  </div>
                  <span className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
                    <ShoppingCart className="w-5 h-5" />
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800/90 rounded-lg p-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Product Review Rating</p>
                    <p className="text-xl font-black text-white">{approvedReviewsCount} Approved</p>
                    <p className="text-[9px] text-emerald-400 font-bold flex items-center gap-0.5"><CheckCircle2 className="w-3.5 h-3.5" /> 100% Client Trust Score</p>
                  </div>
                  <span className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg">
                    <MessageSquare className="w-5 h-5" />
                  </span>
                </div>

              </div>

              {/* Quick info list and system details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent checkout orders */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Incoming Checkout Logs</h3>
                    <button onClick={() => setCurrentModule('orders')} className="text-[10px] text-amber-500 font-bold hover:underline">View Ledger</button>
                  </div>

                  <div className="space-y-2 font-sans">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800/60 text-xs">
                        <div>
                          <p className="font-bold text-gray-100">{order.customerName}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{order.date} • {order.items.length} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-extrabold text-white">৳{order.totalAmount}</p>
                          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${order.paymentStatus === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warehouse Low stock alarms */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Awaiting Dispatch / Stock Warnings</h3>
                    <button onClick={() => setCurrentModule('inventory')} className="text-[10px] text-amber-500 font-bold hover:underline">Refill Stock</button>
                  </div>

                  <div className="space-y-2">
                    {products.slice(0, 3).map((prod) => (
                      <div key={prod.id} className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800/60 text-xs text-left">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={prod.image} className="w-8 h-8 rounded object-cover" referrerPolicy="no-referrer" />
                          <div className="min-w-0 pr-2">
                            <p className="font-bold text-gray-100 truncate">{prod.title}</p>
                            <p className="text-[10px] text-slate-500">{prod.category}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-white">৳{prod.price}</p>
                          <span className={`text-[9px] font-bold ${prod.stock <= 3 ? 'text-red-400 animate-pulse' : 'text-slate-400'}`}>
                            Stock Remaining: {prod.stock}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Welcome box for Shopify builders */}
              <div className="bg-radial from-slate-900 to-slate-950 p-6 rounded-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-left">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Ready to upgrade design visual layouts?</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl font-sans">
                    You can switch to the <b>Visual Theme Composer</b> to customize your store's headings, colors, notification widgets and layout section hierarchies. It features a side-by-side device mockup that previews edits instantly!
                  </p>
                </div>
                <button
                  onClick={() => setCurrentModule('visual_editor')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider px-5 py-3 rounded-md transition inline-flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Sliders className="w-4 h-4" /> Launch Visual Creator
                </button>
              </div>

            </div>
          )}

          {/* MODULE 2: WAREHOUSE PRODUCTS INVENTORY */}
          {currentModule === 'inventory' && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white font-sans tracking-tight">Warehouse Product Hub</h2>
                  <p className="text-xs text-slate-400 mt-1">Append new handcrafted creations with full prices, descriptors, compare old values, and catalog stock counts.</p>
                </div>
              </div>

              {/* Leverage standard AdminPanel component bounded to inventory tab */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5">
                <AdminPanel
                  products={products}
                  blogs={blogs}
                  reviews={reviews}
                  orders={orders}
                  onAddProduct={onAddProduct}
                  onUpdateStock={onUpdateStock}
                  onRemoveProduct={onRemoveProduct}
                  onAddBlogPost={onAddBlogPost}
                  onApproveReview={onApproveReview}
                  onDeleteReview={onDeleteReview}
                  onUpdateOrderStatus={onUpdateOrderStatus}
                />
              </div>
            </div>
          )}

          {/* MODULE 3: VISUAL THEME COMPOSER PANEL (Side by side preview simulator) */}
          {currentModule === 'visual_editor' && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h2 className="text-xl font-bold font-sans tracking-tight text-white">Visual Website Theme Composer</h2>
                <p className="text-xs text-slate-400 mt-1">Refine layout orders, accent color hex, corporate logo string, display banners, and preview device responses.</p>
              </div>

              {/* Side-by-side grid editor workspace */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                
                {/* Left hand dynamic section values customizer */}
                <div className="xl:col-span-4 bg-slate-900 border border-slate-800 rounded-lg p-1.5 h-full max-h-[85vh] overflow-y-auto">
                  <ThemeEditor
                    theme={theme}
                    onUpdateTheme={onChangeTheme}
                    previewMode={viewportMode}
                    onPreviewModeChange={setViewportMode}
                  />
                </div>

                {/* Right hand browser/smartphone window viewport mockup */}
                <div className="xl:col-span-8 bg-slate-900/65 rounded-lg border border-slate-800 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[550px] max-h-[85vh] overflow-y-auto relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
                  
                  {/* Floating Frame status bar */}
                  <div className="w-full flex items-center justify-between mb-4 bg-slate-950 p-2 border border-slate-800 rounded text-[10px]">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="text-slate-500 font-bold ml-1.5 font-mono">https://deluxe-storefront.live/preview</span>
                    </div>

                    <div className="flex items-center bg-slate-900 px-2.5 py-1 rounded border border-slate-800 gap-1 font-bold text-slate-300">
                      {viewportMode === 'mobile' ? (
                        <><Smartphone className="w-3.5 h-3.5 text-amber-500" /> Phone Layout Frame</>
                      ) : (
                        <><Monitor className="w-3.5 h-3.5 text-amber-500" /> Desktop View Mode</>
                      )}
                    </div>
                  </div>

                  {/* Rendering inside simulated viewport layout */}
                  {viewportMode === 'mobile' ? (
                    <div className="w-[340px] h-[640px] bg-slate-950 rounded-[38px] shadow-2xl p-2.5 border-[5px] border-slate-800 relative flex flex-col overflow-hidden animate-fade-in shrink-0">
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-slate-950 rounded-full z-50"></div>
                      
                      {/* Inside simulated browser core frame */}
                      <div className="w-full h-full bg-white rounded-[28px] overflow-y-auto scrollbar-thin scrollbar-thumb-stone-200">
                        {renderSimulatedStorefront()}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-[640px] rounded-lg shadow-2xl bg-white flex flex-col overflow-y-auto border border-stone-200 animate-fade-in">
                      {renderSimulatedStorefront()}
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* MODULE 4: ORDERS INVOICES */}
          {currentModule === 'orders' && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h2 className="text-xl font-bold font-sans tracking-tight text-white">Merchant Invoices &amp; Shipments</h2>
                <p className="text-xs text-slate-400 mt-1">Approve bKash/Nagad transactional payouts, review physical customer locations, and manage shipping delivery.</p>
              </div>

              {/* Leverage standard AdminPanel component bounded to orders */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <p className="text-xs font-bold text-amber-500 uppercase tracking-widest pl-2 mb-4">Invoice ledger records ({orders.length})</p>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-slate-950 border border-slate-800 p-5 rounded-md flex flex-col lg:flex-row justify-between gap-6 text-xs font-sans">
                      
                      <div className="space-y-3 lg:max-w-md text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold px-2 py-0.5 rounded">
                            {order.id}
                          </span>
                          <span className="text-slate-500">{order.date}</span>
                        </div>

                        <div className="space-y-1">
                          <p className="font-extrabold text-white text-sm">{order.customerName}</p>
                          <p className="text-slate-400">📧 {order.customerEmail} • 📞 {order.customerPhone}</p>
                          <p className="text-slate-400 font-medium leading-normal bg-slate-900 p-2 border border-slate-850 rounded">
                            📍 {order.customerAddress}
                          </p>
                        </div>
                      </div>

                      {/* Items order details list */}
                      <div className="flex-1 space-y-1.5 text-left border-l border-slate-900 lg:pl-6">
                        <p className="font-bold text-[10px] text-slate-500 uppercase tracking-wider">Ordered Products Basket</p>
                        <div className="space-y-1 max-h-24 overflow-y-auto">
                          {order.items.map((item, index) => (
                            <p key={index} className="text-slate-300">
                              - <span className="font-bold text-white">{item.productTitle}</span> x{item.quantity} (৳{item.price}/each)
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Payment statuses control switches */}
                      <div className="text-left lg:text-right space-y-3 shrink-0 flex flex-col justify-between items-start lg:items-end border-l border-slate-900 lg:pl-6 leading-none">
                        <div>
                          <p className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">Checkout Total Amount</p>
                          <p className="text-xl font-black text-emerald-400 mt-1">৳{order.totalAmount}</p>
                        </div>

                        <div className="space-y-1 text-left w-full sm:w-auto">
                          <div className="flex items-center justify-between lg:justify-end gap-2 text-[10px] text-slate-400 font-bold uppercase mb-1">
                            Status: 
                            <span className={`px-2 py-0.5 rounded font-black ${order.status === 'delivered' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                              {order.status}
                            </span>
                          </div>

                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                onUpdateOrderStatus(order.id, 'processing');
                                alert('Invoiced order status switched back to heavy processing.');
                              }}
                              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[9px] rounded-sm font-semibold uppercase text-slate-300"
                            >
                              Process
                            </button>
                            <button
                              onClick={() => {
                                onUpdateOrderStatus(order.id, 'delivered');
                                alert('Invoice dispatched cargo delivered successfully list update!');
                              }}
                              className="px-2 py-1 bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-[9px] rounded-sm font-bold uppercase"
                            >
                              Deliver
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}
                  {orders.length === 0 && (
                    <div className="text-center py-12 text-slate-500 text-xs font-semibold">No invoice catalog coordinates checked out yet.</div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* MODULE 5: REVIEWS MODERATION */}
          {currentModule === 'reviews' && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h2 className="text-xl font-bold font-sans tracking-tight text-white">Client Reviews Moderation Console</h2>
                <p className="text-xs text-slate-400 mt-1">Approve or erase client ratings immediately. Approved comments display instantly inside catalog drawers.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-slate-950 p-4 rounded-md border border-slate-850 flex flex-col justify-between text-xs space-y-3">
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-slate-900/60 p-1.5 rounded">
                          <span className="font-bold text-white">{rev.userName}</span>
                          <span className="text-[10px] text-amber-500 font-extrabold flex items-center">⭐ {rev.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-slate-400 italic">"{rev.comment}"</p>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-[10px]">
                        <span className="text-slate-500 font-mono text-[9px]">{rev.date}</span>
                        <div className="flex gap-1.5">
                          {rev.status !== 'approved' && (
                            <button
                              onClick={() => {
                                onApproveReview(rev.id);
                                alert('Review successfully approved and cataloged!');
                              }}
                              className="px-2 py-1 bg-emerald-500 text-black hover:bg-emerald-400 rounded-xs font-bold uppercase transition"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => {
                              onDeleteReview(rev.id);
                              alert('Review comment deleted successfully!');
                            }}
                            className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xs font-bold uppercase transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <div className="col-span-2 text-center py-10 text-slate-500">No customer reviews submitted yet.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MODULE 6: BLOGS ARCHIVE */}
          {currentModule === 'blogs' && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h2 className="text-xl font-bold font-sans tracking-tight text-white">Artisanal Blog and Stories Portal</h2>
                <p className="text-xs text-slate-400 mt-1">Publish insightful tutorials, lifestyle essays, organic recipe reports, or teak wood preservation tips.</p>
              </div>

              {/* Add form inside AdminPanel is fully accessible here */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-2">
                <AdminPanel
                  products={products}
                  blogs={blogs}
                  reviews={reviews}
                  orders={orders}
                  onAddProduct={onAddProduct}
                  onUpdateStock={onUpdateStock}
                  onRemoveProduct={onRemoveProduct}
                  onAddBlogPost={onAddBlogPost}
                  onApproveReview={onApproveReview}
                  onDeleteReview={onDeleteReview}
                  onUpdateOrderStatus={onUpdateOrderStatus}
                />
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Corporate bottom bar */}
      <footer className="bg-slate-900 border-t border-slate-800 py-3.5 px-6 text-center text-[10px] text-slate-500 font-mono mt-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <p>&copy; {new Date().getFullYear()} Deluxe Merchant Operations Workspace. All catalog configurations comply with Vite production builds.</p>
        <p className="text-amber-500 font-bold flex items-center gap-1">🗝️ Secure Admin Console Panel Website</p>
      </footer>

    </div>
  );
}
