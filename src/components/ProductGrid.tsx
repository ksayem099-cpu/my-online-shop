/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ShieldCheck, ShoppingCart, ShoppingBag, MessageSquarePlus, MessageSquare, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Product, Review, ThemeSettings } from '../types';

interface ProductGridProps {
  products: Product[];
  reviews: Review[];
  theme: ThemeSettings;
  onAddToCart: (product: Product, quantity?: number) => void;
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
}

export default function ProductGrid({
  products,
  reviews,
  theme,
  onAddToCart,
  onAddReview,
}: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Review submission inputs
  const [revName, setRevName] = useState('');
  const [revEmail, setRevEmail] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [reviewQuantity, setReviewQuantity] = useState(1);

  const getProductReviews = (prodId: string) => reviews.filter((r) => r.productId === prodId && r.status === 'approved');

  const getAverageRating = (prodId: string, baseRating: number) => {
    const prodRevs = getProductReviews(prodId);
    if (prodRevs.length === 0) return baseRating;
    const sum = prodRevs.reduce((acc, r) => acc + r.rating, 0);
    return parseFloat(((sum) / prodRevs.length).toFixed(1));
  };

  const handleReviewSubmit = (e: React.FormEvent, prodId: string) => {
    e.preventDefault();
    if (!revName || !revEmail || !revComment) {
      alert('Please fill out all review fields.');
      return;
    }
    onAddReview({
      productId: prodId,
      userName: revName,
      userEmail: revEmail,
      rating: revRating,
      comment: revComment,
    });
    setRevName('');
    setRevEmail('');
    setRevComment('');
    setRevRating(5);
    alert('Thank you! Your reviews have been updated instantly on the page.');
  };

  const handleAddToCartAndClose = (product: Product) => {
    onAddToCart(product, reviewQuantity);
    setReviewQuantity(1);
    setSelectedProduct(null);
  };

  // Switch font weights
  const titleFont = theme.fontPairing === 'classic' || theme.fontPairing === 'editorial' ? 'font-serif' : 'font-sans';

  // Modal View
  if (selectedProduct) {
    const p = selectedProduct;
    const prodReviews = getProductReviews(p.id);
    const avgRating = getAverageRating(p.id, p.rating);

    return (
      <div id="product_detail_container" className="bg-white rounded-lg border border-stone-200 p-6 space-y-6 container mx-auto">
        
        {/* Back Link */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>

        {/* Product Details Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Column 1: Image Frame */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-square w-full rounded-md bg-stone-50 overflow-hidden border border-stone-200">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {p.isSale && (
                <span className="absolute top-3 left-3 bg-red-600 text-white font-sans text-[9px] px-2.5 py-1 rounded font-bold uppercase tracking-wider">Sale</span>
              )}
              {p.isNew && (
                <span className="absolute top-3 right-3 bg-amber-600 text-white font-sans text-[9px] px-2.5 py-1 rounded font-bold uppercase tracking-wider">New</span>
              )}
            </div>

            {/* Static secure badge inside modal */}
            <div className="p-3 bg-stone-50 border border-stone-200 text-[11px] text-gray-600 rounded flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Tested Product: 100% Secure Checkout ready. 7-day refund guarantee.</span>
            </div>
          </div>

          {/* Column 2: Specs & Add to bag */}
          <div className="md:col-span-7 space-y-5 text-left">
            <div>
              <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest">{p.category}</p>
              <h2 className={`text-xl sm:text-2xl font-medium text-gray-900 mt-1 ${titleFont}`}>{p.title}</h2>
              
              {/* Star Rating summary */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(avgRating) ? 'fill-amber-500' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700 mt-0.5">{avgRating} ({prodReviews.length} reviews)</span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-2 pb-3 border-b border-stone-100">
              <span className={`text-2xl font-bold text-gray-950 font-serif`}>৳{p.price}</span>
              {p.oldPrice && (
                <span className="text-sm line-through text-gray-400">৳{p.oldPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-gray-650 leading-relaxed font-sans">{p.description}</p>

            {/* Product Features Checkboxes */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Product Highlights</h4>
              <ul className="text-xs grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                {p.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-emerald-600 font-bold">&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock indicator badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-900">Inventory Status:</span>
              {p.stock > 0 ? (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.stock <= 4 ? 'bg-orange-50 text-orange-700' : 'bg-emerald-50 text-emerald-800'}`}>
                  {p.stock <= 4 ? `Only ${p.stock} left in stock!` : `${p.stock} available`}
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold">Out of stock</span>
              )}
            </div>

            {/* Add section */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => setReviewQuantity(q => Math.max(1, q - 1))}
                  className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 transition text-gray-500 outline-hidden"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-4 text-xs font-bold text-gray-800">{reviewQuantity}</span>
                <button
                  type="button"
                  onClick={() => setReviewQuantity(q => Math.min(p.stock, q + 1))}
                  className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 transition text-gray-500 outline-hidden"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={() => handleAddToCartAndClose(p)}
                disabled={p.stock <= 0}
                className="flex-1 bg-gray-950 font-semibold border-none text-white text-xs tracking-wider uppercase py-3 rounded-xs hover:opacity-90 disabled:bg-gray-400 cursor-pointer flex items-center justify-center gap-1.5 transition active:scale-98"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Shopping Basket
              </button>
            </div>
            
          </div>
        </div>

        {/* Dynamic Reviews Section inside details */}
        <div className="border-t border-stone-200 pt-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Col 1: Read Reviews */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 border-b pb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-600" /> Customer Testimonials ({prodReviews.length})
            </h3>

            {prodReviews.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No reviews yet. Be the first to tell others about this product!</p>
            ) : (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {prodReviews.map((rev) => (
                  <div key={rev.id} className="border-b border-stone-100 pb-3 last:border-b-0 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-gray-800">{rev.userName}</span>
                      <span className="text-[10px] text-gray-400">{rev.date}</span>
                    </div>
                    {/* Stars */}
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Col 2: Write Review */}
          <div className="md:col-span-5 bg-stone-50 border border-stone-200 p-4 rounded-lg">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 pb-2 mb-3 border-b flex items-center gap-1.5">
              <MessageSquarePlus className="w-4 h-4 text-emerald-600" /> Write a Review
            </h3>

            <form onSubmit={(e) => handleReviewSubmit(e, p.id)} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  placeholder="e.g. Tamim Iqbal"
                  className="w-full text-xs border border-stone-200 bg-white rounded px-2.5 py-1.5 focus:border-amber-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-1">Your Email *</label>
                <input
                  type="email"
                  required
                  value={revEmail}
                  onChange={(e) => setRevEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full text-xs border border-stone-200 bg-white rounded px-2.5 py-1.5 focus:border-amber-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-1">Star Assessment *</label>
                <select
                  value={revRating}
                  onChange={(e) => setRevRating(Number(e.target.value))}
                  className="w-full text-xs border border-stone-200 bg-white rounded px-2.5 py-1.5 focus:border-amber-600 outline-hidden"
                >
                  <option value={5}>5 Stars (Excellent Quality)</option>
                  <option value={4}>4 Stars (Good Product)</option>
                  <option value={3}>3 Stars (Satisfactory)</option>
                  <option value={2}>2 Stars (Below expectations)</option>
                  <option value={1}>1 Star (Inadequate)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-1">Your Honest Comment *</label>
                <textarea
                  required
                  rows={3}
                  value={revComment}
                  onChange={(e) => setRevComment(e.target.value)}
                  placeholder="Describe your user experience in detail..."
                  className="w-full text-xs border border-stone-200 bg-white rounded px-2.5 py-1.5 focus:border-amber-600 outline-hidden resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-bold tracking-wider uppercase py-2 rounded-sm hover:opacity-90 active:scale-98 transition text-center text-[10px]"
              >
                Submit Review Instantly
              </button>
            </form>
          </div>

        </div>

      </div>
    );
  }

  // STANDARD COLLECTION GRID VIEW
  return (
    <div id="store_catalog_view" className="space-y-4">
      {products.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-500">No products match your criteria. Add one from the Admin Panel!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => {
            const avgRating = getAverageRating(p.id, p.rating);
            const reviewsCount = getProductReviews(p.id).length;

            return (
              <div
                id={`product_card_${p.id}`}
                key={p.id}
                className="group bg-white rounded-lg border border-stone-200/90 overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-300 relative"
              >
                {/* Images */}
                <div
                  onClick={() => setSelectedProduct(p)}
                  className="relative aspect-video w-full bg-stone-50 overflow-hidden border-b border-stone-200/80 cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {p.isSale && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white font-sans text-[8px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">Sale</span>
                  )}
                  {p.isNew && (
                    <span className="absolute top-2 right-2 bg-amber-600 text-white font-sans text-[8px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">New</span>
                  )}
                  {p.stock <= 3 && p.stock > 0 && (
                    <span className="absolute bottom-2 left-2 bg-orange-500 text-white font-sans text-[8px] font-semibold px-2 py-0.5 rounded">Low Stock</span>
                  )}
                </div>

                {/* Card description */}
                <div className="p-4 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-1">
                    <p className="text-[9px] text-amber-700 font-bold uppercase tracking-widest">{p.category}</p>
                    <h3
                      onClick={() => setSelectedProduct(p)}
                      className={`text-sm font-semibold text-gray-900 group-hover:text-amber-700 cursor-pointer transition leading-snug line-clamp-1 ${titleFont}`}
                    >
                      {p.title}
                    </h3>

                    {/* Star Rating summary line */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(avgRating) ? 'fill-amber-500' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-500 mt-0.5">({reviewsCount})</span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-baseline justify-between gap-2 border-t border-stone-100 mt-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-gray-950 font-serif">৳{p.price}</span>
                      {p.oldPrice && (
                        <span className="text-[10px] line-through text-gray-400">৳{p.oldPrice}</span>
                      )}
                    </div>

                    <button
                      id={`add_to_cart_btn_${p.id}`}
                      onClick={() => onAddToCart(p, 1)}
                      disabled={p.stock <= 0}
                      className="bg-gray-150 text-gray-900 hover:bg-gray-900 hover:text-white disabled:bg-gray-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition cursor-pointer flex items-center gap-1 active:scale-95"
                    >
                      <Plus className="w-3 h-3" /> Cart
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
