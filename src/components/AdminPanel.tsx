/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Trash2, Edit3, MessageCircle, ShoppingCart, ListCollapse, BookOpen, AlertTriangle, RefreshCw, Layers, Check, ShoppingBag, Send } from 'lucide-react';
import { Product, BlogPost, Review, Order } from '../types';

interface AdminPanelProps {
  products: Product[];
  blogs: BlogPost[];
  reviews: Review[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onRemoveProduct: (productId: string) => void;
  onAddBlogPost: (post: BlogPost) => void;
  onApproveReview: (reviewId: string) => void;
  onDeleteReview: (reviewId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export default function AdminPanel({
  products,
  blogs,
  reviews,
  orders,
  onAddProduct,
  onUpdateStock,
  onRemoveProduct,
  onAddBlogPost,
  onApproveReview,
  onDeleteReview,
  onUpdateOrderStatus,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'blogs' | 'reviews' | 'orders'>('products');

  // New Product States
  const [prodTitle, setProdTitle] = useState('');
  const [prodCat, setProdCat] = useState('Furniture');
  const [prodPrice, setProdPrice] = useState(100);
  const [prodOldPrice, setProdOldPrice] = useState<number | undefined>(undefined);
  const [prodStock, setProdStock] = useState(10);
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop');
  const [prodDesc, setProdDesc] = useState('');
  const [prodFeature1, setProdFeature1] = useState('');
  const [prodFeature2, setProdFeature2] = useState('');

  // New Blog States
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCat, setBlogCat] = useState('Fashion');
  const [blogAuthor, setBlogAuthor] = useState('Admin Specialist');
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&auto=format&fit=crop');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');

  // Dynamic filter state
  const [inventorySearch, setInventorySearch] = useState('');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle || !prodDesc) {
      alert('Product title and description are strictly required.');
      return;
    }
    const featuresList = [prodFeature1, prodFeature2].filter(Boolean);
    const newProd: Product = {
      id: 'prod-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      title: prodTitle,
      category: prodCat,
      price: Number(prodPrice),
      oldPrice: prodOldPrice ? Number(prodOldPrice) : undefined,
      rating: 5.0, // default new rating
      image: prodImage || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
      stock: Number(prodStock),
      description: prodDesc,
      features: featuresList.length > 0 ? featuresList : ['Sustainable luxury build', 'Artisanal finish details'],
      isNew: true,
    };
    onAddProduct(newProd);
    
    // reset
    setProdTitle('');
    setProdDesc('');
    setProdFeature1('');
    setProdFeature2('');
    setProdPrice(100);
    setProdOldPrice(undefined);
    setProdStock(10);
    alert('Product catalog updated successfully!');
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) {
      alert('Blog title and story content are required.');
      return;
    }
    const newPost: BlogPost = {
      id: 'post-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      title: blogTitle,
      category: blogCat,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: blogAuthor,
      image: blogImage || 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&auto=format&fit=crop',
      excerpt: blogExcerpt || blogContent.substring(0, 120) + '...',
      content: blogContent,
      views: 1,
    };
    onAddBlogPost(newPost);

    // reset
    setBlogTitle('');
    setBlogContent('');
    setBlogExcerpt('');
    alert('Blogger post successfully printed to the blog listing catalog!');
  };

  const filteredInventory = products.filter(p =>
    p.title.toLowerCase().includes(inventorySearch.toLowerCase()) ||
    p.category.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  return (
    <div id="admin_console_container" className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left bg-white rounded-lg border border-stone-200 shadow-xs p-6 container mx-auto">
      
      {/* Side Tabs List */}
      <div className="md:col-span-3 space-y-2 border-r border-stone-100 pr-4">
        <div className="pb-3 border-b border-stone-150">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5 font-sans tracking-tight">
            <Layers className="w-4.5 h-4.5 text-blue-600" /> Merchant Command
          </h3>
          <p className="text-[10px] text-gray-500 mt-0.5">Manage stock &amp; checkout logs</p>
        </div>

        <nav className="flex flex-col gap-1 text-xs font-semibold pt-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full py-2.5 px-3 rounded flex items-center gap-2 transition text-left cursor-pointer ${activeTab === 'products' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <ShoppingCart className="w-4 h-4" /> Products &amp; Warehouse
          </button>
          
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full py-2.5 px-3 rounded flex items-center gap-2 transition text-left cursor-pointer ${activeTab === 'blogs' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <BookOpen className="w-4 h-4" /> Blogger Writer
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full py-2.5 px-3 rounded flex items-center gap-2 transition text-left cursor-pointer ${activeTab === 'reviews' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <MessageCircle className="w-4 h-4" /> Customer Reviews ({reviews.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full py-2.5 px-3 rounded flex items-center gap-2 transition text-left cursor-pointer ${activeTab === 'orders' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <ShoppingBag className="w-4 h-4" /> Orders &amp; Invoices ({orders.length})
          </button>
        </nav>
      </div>

      {/* Primary Panels Content */}
      <div className="md:col-span-9 space-y-6">
        
        {/* PANEL A: PRODUCTS LIST & SEAMLESS ADD */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Create Product Section */}
            <div className="bg-stone-50 border border-stone-200 rounded p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b pb-2 mb-4 flex items-center gap-1.5">
                <Plus className="w-4.5 h-4.5 text-blue-600" /> Easy Add a Product
              </h4>

              <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs font-sans">
                <div className="sm:col-span-8">
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Product Title / Handcrafted Label *</label>
                  <input
                    type="text"
                    required
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    placeholder="e.g. Traditional Oak Bed Frame"
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Category Group *</label>
                  <select
                    value={prodCat}
                    onChange={(e) => setProdCat(e.target.value)}
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                  >
                    <option value="Furniture">Furniture &amp; Woodwork</option>
                    <option value="Health & Beauty">Health &amp; Beauty Serum</option>
                    <option value="Home Decor">Home Decor Pottery</option>
                    <option value="Gadgets">Smart Tech Gadgets</option>
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Selling Price (৳ BDT) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Compare-At Price (৳ Old price - Optional)</label>
                  <input
                    type="number"
                    min={0}
                    value={prodOldPrice || ''}
                    onChange={(e) => setProdOldPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 1900"
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Initial Stock Intake *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                  />
                </div>

                <div className="sm:col-span-12">
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Image Presentation URL</label>
                  <input
                    type="url"
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    placeholder="https://images.unsplash.com/your-image"
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                  />
                </div>

                <div className="sm:col-span-12">
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Ethical Specs feature highlights (One or two aspects)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={prodFeature1}
                      onChange={(e) => setProdFeature1(e.target.value)}
                      placeholder="e.g. Made from 100% sustainable Teak"
                      className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                    />
                    <input
                      type="text"
                      value={prodFeature2}
                      onChange={(e) => setProdFeature2(e.target.value)}
                      placeholder="e.g. Double-matte water lacquer sealing"
                      className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                    />
                  </div>
                </div>

                <div className="sm:col-span-12">
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Detailed Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    placeholder="Craft story, size metrics, material textures..."
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden resize-none"
                  />
                </div>

                <div className="sm:col-span-12 pt-1 text-right">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded hover:bg-blue-700 tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Inject Product to Store
                  </button>
                </div>
              </form>
            </div>

            {/* Inventory Warehouse List Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-sans">
                    Seamless Stock &amp; Safety Levels
                  </h4>
                  <p className="text-[10px] text-gray-500">View exact quantities and refill low stock instantly.</p>
                </div>

                <input
                  type="text"
                  placeholder="Quick search inventory..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="text-xs border border-stone-200 rounded px-3 py-1.5 w-48 outline-hidden focus:border-blue-600 focus:bg-stone-50"
                />
              </div>

              {/* Warehouse Table */}
              <div className="border border-stone-200 rounded overflow-x-auto">
                <table className="w-full text-xs font-sans">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-gray-700 font-bold uppercase text-[9px] text-left">
                      <th className="py-2 px-3">Item Name</th>
                      <th className="py-2 px-3">Category</th>
                      <th className="py-2 px-3">Price</th>
                      <th className="py-2 px-3">Current Stock</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3 text-right">Warehouse Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredInventory.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50/50">
                        <td className="py-2.5 px-3 flex items-center gap-2">
                          <img
                            src={p.image}
                            alt=""
                            className="w-7 h-7 rounded object-cover border"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-semibold text-gray-900 truncate max-w-[150px]">{p.title}</span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-600">{p.category}</td>
                        <td className="py-2.5 px-3 font-semibold">৳{p.price}</td>
                        <td className="py-2.5 px-3 font-semibold">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-900 w-8">{p.stock}</span>
                            <div className="flex gap-0.5">
                              <button
                                onClick={() => onUpdateStock(p.id, Math.max(0, p.stock - 1))}
                                className="w-5 h-5 bg-stone-100 text-stone-700 rounded text-center border font-bold flex items-center justify-center hover:bg-stone-200 transition"
                              >
                                -
                              </button>
                              <button
                                onClick={() => onUpdateStock(p.id, p.stock + 5)}
                                className="w-5 h-5 bg-blue-50 text-blue-700 rounded text-center border border-blue-100 font-bold flex items-center justify-center hover:bg-blue-100 transition"
                                title="Add 5"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          {p.stock === 0 ? (
                            <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-[9px] font-bold">Sold Out</span>
                          ) : p.stock <= 4 ? (
                            <span className="bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded text-[9px] font-semibold flex items-center gap-0.5">
                              <AlertTriangle className="w-3 h-3 text-orange-600" /> Low Stock
                            </span>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded text-[9px] font-bold">Sufficient</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => {
                              if (confirm('Delete this product permanently from the catalogs?')) onRemoveProduct(p.id);
                            }}
                            className="p-1 hover:bg-red-50 text-red-500 rounded transition outline-hidden inline-flex items-center justify-center"
                            title="Delete Catalog item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* PANEL B: BLOG POST CREATOR */}
        {activeTab === 'blogs' && (
          <div className="space-y-4">
            <div className="bg-stone-50 border border-stone-200 p-5 rounded">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b pb-2 mb-4 flex items-center gap-1.5">
                <BookOpen className="w-4.5 h-4.5 text-blue-600" /> Print a Blogger Post
              </h4>

              <form onSubmit={handleCreateBlog} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="e.g. Modern Home Styling tips or Organic Beauty reviews"
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 mb-1">Author Name *</label>
                    <input
                      type="text"
                      required
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 mb-1">Blogging Category Group *</label>
                    <select
                      value={blogCat}
                      onChange={(e) => setBlogCat(e.target.value)}
                      className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                    >
                      <option value="Furniture">Furniture Decor</option>
                      <option value="Health & Beauty">Health &amp; Skincare</option>
                      <option value="Home Decor">Traditional Home Craft</option>
                      <option value="Fashion">Eco Fashion &amp; Apparel</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Blog Cover Image URL</label>
                  <input
                    type="url"
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    placeholder="https://images.unsplash.com/your-blog-image"
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Brief Excerpt / Subtitle summary (Optional)</label>
                  <input
                    type="text"
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    placeholder="Short introduction hook summarizing the article..."
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Complete Story Body *</label>
                  <textarea
                    required
                    rows={6}
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Describe design approaches, organic steps, detailed guides and tutorials..."
                    className="w-full text-xs border border-stone-200 bg-white rounded px-3 py-2 outline-hidden resize-none font-sans"
                  />
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded hover:bg-blue-700 tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Publish Blog Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PANEL C: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b pb-2 mb-2 font-sans flex items-center gap-1">
              <MessageCircle className="w-5 h-5 text-blue-600" /> Customer Reviews Moderation
            </h4>

            {reviews.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No user reviews submitted yet on products.</p>
            ) : (
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="border border-stone-200 rounded p-4 space-y-2 relative bg-stone-50/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-sans font-bold text-gray-950 flex items-center gap-1">{rev.userName} <span className="text-[10px] font-normal text-gray-500">({rev.userEmail})</span></div>
                        <p className="text-[10px] text-blue-700 font-semibold mt-0.5">Product ID Reference: {rev.productId}</p>
                      </div>

                      <div className="flex gap-1">
                        {rev.status === 'pending' && (
                          <button
                            onClick={() => onApproveReview(rev.id)}
                            className="bg-emerald-600 text-white font-bold px-2.5 py-1 rounded text-[9px] hover:bg-emerald-700 cursor-pointer flex items-center gap-0.5 transition"
                          >
                            <Check className="w-3 h-3" /> Approve Live
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteReview(rev.id)}
                          className="bg-stone-200 hover:bg-red-50 hover:text-red-600 text-stone-700 px-2.5 py-1 rounded text-[9px] cursor-pointer flex items-center gap-0.5 transition"
                          title="Delete review"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-700 italic">"{rev.comment}"</p>

                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-amber-500 font-bold">&#10029; Rating Stars: {rev.rating} / 5</span>
                      {rev.status === 'approved' ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-0.5">● Approved &amp; Live on Store</span>
                      ) : (
                        <span className="text-orange-700 font-bold bg-orange-50 px-2 py-0.5 rounded">⌛ Pending Moderation</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PANEL D: ORDER LOGISTICS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b pb-2 font-sans flex items-center gap-1.5">
              <ShoppingBag className="w-5 h-5 text-blue-600" /> Order Fulfillment Ledger
            </h4>

            {orders.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No checkout transactions initialized yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="border border-stone-250 bg-stone-50/20 rounded-lg p-5 text-xs text-stone-900 grid grid-cols-1 md:grid-cols-12 gap-4 font-sans font-normal">
                    
                    {/* Customer overview */}
                    <div className="md:col-span-8 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-900 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded">{ord.id}</span>
                        <span className="text-gray-400 text-[11px]">{ord.date}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="font-bold text-gray-900">Customer: {ord.customerName}</p>
                        <p className="text-gray-500">Contact: {ord.customerPhone} &bull; {ord.customerEmail}</p>
                        <p className="text-gray-500">Address: {ord.customerAddress}</p>
                      </div>

                      {/* Items lists */}
                      <div className="border-t border-stone-200/90 pt-2 mt-2 space-y-1">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Order item roster:</p>
                        {ord.items.map((item, id) => (
                          <div key={id} className="flex justify-between max-w-sm text-[11px] text-gray-700 font-mono">
                            <span>{item.quantity}x {item.productTitle}</span>
                            <span>৳{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Costing overview & Change state actions */}
                    <div className="md:col-span-4 bg-stone-50 border-l border-stone-200 p-3 rounded flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between font-bold text-gray-900">
                          <span>Total Amount:</span>
                          <span className="text-emerald-800 text-sm">৳{ord.totalAmount}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span>bKash/COD Pay:</span>
                          <span className="bg-gray-150 font-bold px-2 py-0.5 rounded">{ord.paymentMethod.toUpperCase()}</span>
                        </div>
                        {ord.transactionId && (
                          <p className="text-[9px] font-semibold text-gray-500 truncate font-mono">Txn: {ord.transactionId}</p>
                        )}
                      </div>

                      {/* Select Fulfillment step */}
                      <div className="space-y-1.5 pt-3 border-t border-stone-200">
                        <label className="block text-[10px] font-bold text-gray-600 uppercase">Fulfillment Status</label>
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as Order['status'])}
                          className="w-full text-xs border border-stone-300 rounded bg-white px-2 py-1 outline-hidden"
                        >
                          <option value="processing">Processing Box</option>
                          <option value="shipped">Shipped Transit</option>
                          <option value="delivered">Delivered Safely</option>
                          <option value="cancelled">Cancelled Out</option>
                        </select>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
