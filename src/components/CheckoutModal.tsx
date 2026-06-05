/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, CreditCard, ShieldCheck, MapPin, CheckCircle, X, ArrowRight, Smartphone } from 'lucide-react';
import { Product, CartItem, Order, ThemeSettings } from '../types';

interface CheckoutModalProps {
  cart: CartItem[];
  theme: ThemeSettings;
  onClose: () => void;
  onClearCart: () => void;
  onNewOrder: (order: Order) => void;
}

export default function CheckoutModal({ cart, theme, onClose, onClearCart, onNewOrder }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Shipping, 2: Payment, 3: Completed
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card' | 'cod'>('bkash');
  
  // Payment gateway simulation states
  const [mfsNumber, setMfsNumber] = useState('');
  const [mfsPin, setMfsPin] = useState('');
  const [mfsOtp, setMfsOtp] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = paymentMethod === 'cod' ? 120 : 60; // Cash on delivery is slightly higher in BD
  const total = subtotal + deliveryFee;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      alert('Please fill out all shipping details.');
      return;
    }
    setStep(2);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate safe API processing delay
    setTimeout(() => {
      const generatedTxnId = paymentMethod === 'cod' ? undefined : 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      const newOrderObj: Order = {
        id: 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: address,
        items: cart.map(item => ({
          productId: item.product.id,
          productTitle: item.product.title,
          price: item.product.price,
          quantity: item.quantity
        })),
        totalAmount: total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        transactionId: generatedTxnId,
        status: 'processing'
      };

      onNewOrder(newOrderObj);
      setCompletedOrder(newOrderObj);
      setStep(3);
      setIsProcessing(false);
      onClearCart();
    }, 2000);
  };

  return (
    <div id="checkout_modal_overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div id="checkout_modal_container" className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" style={{ color: theme.accentColor }} />
            <h2 className="text-lg font-semibold text-gray-900 font-sans tracking-tight">Checkout Secure Gateway</h2>
          </div>
          {step !== 3 && (
            <button id="close_checkout" onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {step !== 3 && (
          <div className="flex items-center justify-around bg-white border-b border-gray-100 text-xs py-3 px-6 text-gray-500 font-medium">
            <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-gray-900 font-semibold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700'}`}>1</span>
              <span>Billing & Shipping</span>
            </div>
            <div className="h-[1px] w-12 bg-gray-200"></div>
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-gray-900 font-semibold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700'}`}>2</span>
              <span>Secure Payment</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Main content column */}
          <div className={`p-6 ${step === 3 ? 'md:col-span-12' : 'md:col-span-7 border-r border-gray-100 bg-white'}`}>
            
            {/* STEP 1: Shipping Form */}
            {step === 1 && (
              <form onSubmit={handleNextToPayment} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">Customer Details</h3>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kazi Sayem"
                    className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-hidden focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-hidden focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Mobile Phone (MFS Account) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 017XXXXXXXX"
                      className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-hidden focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Shipping & Delivery Address *</label>
                  <textarea
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    placeholder="Flat, House, Road, Area, City (e.g. Banani, Dhaka)"
                    className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-hidden focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider py-3 rounded-sm hover:opacity-90 active:scale-98 transition duration-200"
                  >
                    Select Payment Method <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Payment Gateway Selection & Form */}
            {step === 2 && (
              <form onSubmit={handleProcessPayment} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Choose Secure Gateway</h3>
                  <button type="button" onClick={() => setStep(1)} className="text-xs text-amber-700 hover:underline">Back to Details</button>
                </div>

                {/* Gateway Selector Row */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`border p-2 rounded flex flex-col items-center justify-center gap-1 transition ${paymentMethod === 'bkash' ? 'border-pink-500 bg-pink-50/50 text-pink-700' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xs">bk</div>
                    <span className="text-[10px] font-bold">bKash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`border p-2 rounded flex flex-col items-center justify-center gap-1 transition ${paymentMethod === 'nagad' ? 'border-orange-500 bg-orange-50/50 text-orange-700' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs">N</div>
                    <span className="text-[10px] font-bold">Nagad</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`border p-2 rounded flex flex-col items-center justify-center gap-1 transition ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-[10px] font-bold">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`border p-2 rounded flex flex-col items-center justify-center gap-1 transition ${paymentMethod === 'cod' ? 'border-gray-800 bg-gray-50 text-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <MapPin className="w-5 h-5 mx-auto" />
                    <span className="text-[10px] font-bold">COD (৳120)</span>
                  </button>
                </div>

                {/* Secure Sandbox Gateway Interface */}
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50 space-y-3">
                  
                  {/* bKash Payment Screen */}
                  {paymentMethod === 'bkash' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-pink-700 border-b border-pink-100 pb-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          <Smartphone className="w-4 h-4" /> bKash Sandbox Checkout
                        </span>
                        <span className="text-[10px] bg-pink-100 font-bold px-2 py-0.5 rounded text-pink-800">Secure AES-256</span>
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-pink-900 mb-1">bKash Mobile Account Number *</label>
                        <input
                          type="text"
                          required
                          value={mfsNumber || phone}
                          onChange={(e) => setMfsNumber(e.target.value)}
                          placeholder="017XXXXXXXX"
                          className="w-full text-sm border border-pink-200 bg-white rounded px-3 py-2 outline-hidden focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-medium text-pink-900 mb-1">Verify Verification OTP *</label>
                          <input
                            type="password"
                            required
                            maxLength={6}
                            value={mfsOtp}
                            onChange={(e) => setMfsOtp(e.target.value)}
                            placeholder="6-Digit Code"
                            className="w-full text-center tracking-widest text-sm border border-pink-200 bg-white rounded px-3 py-2 outline-hidden focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-pink-900 mb-1">Secure Account PIN *</label>
                          <input
                            type="password"
                            required
                            maxLength={5}
                            value={mfsPin}
                            onChange={(e) => setMfsPin(e.target.value)}
                            placeholder="5-Digit PIN"
                            className="w-full text-center tracking-widest text-sm border border-pink-200 bg-white rounded px-3 py-2 outline-hidden focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 leading-normal">
                        Sandbox Gateway: Enter any test digits to simulate instant secure validation.
                      </p>
                    </div>
                  )}

                  {/* Nagad Payment Screen */}
                  {paymentMethod === 'nagad' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-orange-700 border-b border-orange-100 pb-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          <Smartphone className="w-4 h-4" /> Nagad Sandbox Terminal
                        </span>
                        <span className="text-[10px] bg-orange-100 font-bold px-2 py-0.5 rounded text-orange-800">Secure Protocol</span>
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-orange-900 mb-1">Nagad Wallet Number *</label>
                        <input
                          type="text"
                          required
                          value={mfsNumber || phone}
                          onChange={(e) => setMfsNumber(e.target.value)}
                          placeholder="01XXXXXXXXX"
                          className="w-full text-sm border border-orange-200 bg-white rounded px-3 py-2 outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-medium text-orange-900 mb-1">Verification OTP *</label>
                          <input
                            type="password"
                            required
                            maxLength={6}
                            value={mfsOtp}
                            onChange={(e) => setMfsOtp(e.target.value)}
                            placeholder="6-Digit OTP"
                            className="w-full text-center tracking-widest text-sm border border-orange-200 bg-white rounded px-3 py-2 outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-orange-900 mb-1">Wallet PIN *</label>
                          <input
                            type="password"
                            required
                            maxLength={4}
                            value={mfsPin}
                            onChange={(e) => setMfsPin(e.target.value)}
                            placeholder="4-Digit PIN"
                            className="w-full text-center tracking-widest text-sm border border-orange-200 bg-white rounded px-3 py-2 outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visa/MasterCard Credit Card Screen */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-blue-700 border-b border-blue-100 pb-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          <CreditCard className="w-4 h-4" /> Premium Secure Card Desk
                        </span>
                        <span className="text-[10px] bg-blue-100 font-bold px-2 py-0.5 rounded text-blue-800">PCI-DSS Level 1</span>
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-blue-900 mb-1">Card Holder Name *</label>
                        <input
                          type="text"
                          required
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          placeholder="Johnathan Doe"
                          className="w-full text-sm border border-blue-200 bg-white rounded px-3 py-2 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-blue-900 mb-1">Card Number *</label>
                        <input
                          type="text"
                          required
                          value={cardNo}
                          onChange={(e) => setCardNo(e.target.value)}
                          placeholder="4111 2222 3333 4444"
                          className="w-full text-sm border border-blue-200 bg-white rounded px-3 py-2 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-medium text-blue-900 mb-1">Expiry (MM/YY) *</label>
                          <input
                            type="text"
                            required
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full text-center text-sm border border-blue-200 bg-white rounded px-3 py-2 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-blue-900 mb-1">Security CVV *</label>
                          <input
                            type="password"
                            required
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="✦✦✦"
                            className="w-full text-center text-sm border border-blue-200 bg-white rounded px-3 py-2 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery Screen */}
                  {paymentMethod === 'cod' && (
                    <div className="space-y-2 py-2">
                      <div className="flex items-center justify-between text-gray-800 border-b border-gray-200 pb-2">
                        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          📦 Cash On Delivery (COD) Options
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed pt-1">
                        Pay with paper cash once your package reaches safely to your delivery address.
                      </p>
                      <div className="bg-yellow-50 text-yellow-800 border border-yellow-100 rounded p-2.5 text-[10px] leading-normal flex items-center gap-2">
                        <span>ℹ️</span>
                        <span>Standard delivery timing inside Dhaka: 24-48 hours. Outside Dhaka: 3-5 days.</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Action button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider py-3.5 rounded-sm hover:bg-emerald-800 disabled:bg-gray-400 active:scale-98 transition duration-200 cursor-pointer"
                >
                  {isProcessing ? 'Verifying Secure Transaction...' : `Authorize & Guarantee ৳${total}`}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure SSL Cryptographic Payments Powered by De-Luxe Pay API.</span>
                </div>
              </form>
            )}

            {/* STEP 3: Order Completed & Invoice Receipt */}
            {step === 3 && completedOrder && (
              <div className="text-center py-6 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-sans tracking-tight">Purchase Authorized Successfully!</h3>
                  <p className="text-xs text-gray-500 mt-1">Thank you for your order. We are starting inventory preparation.</p>
                </div>

                {/* Printable Digital Invoice Receipt */}
                <div id="print_invoice_receipt" className="border border-dashed border-gray-200 rounded-lg p-5 bg-stone-50 text-left space-y-3 font-mono text-xs text-stone-850">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">{theme.logoText.toUpperCase()}</h4>
                      <p className="text-[10px] text-stone-500">Shopify Dawn Certified Theme</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-stone-900">{completedOrder.id}</p>
                      <p className="text-[10px] text-stone-500">{completedOrder.date}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-stone-900">DELIVER TO:</p>
                    <p className="text-stone-700">{completedOrder.customerName}</p>
                    <p className="text-stone-700">{completedOrder.customerPhone} · {completedOrder.customerEmail}</p>
                    <p className="text-stone-700">{completedOrder.customerAddress}</p>
                  </div>

                  <div className="border-t border-b border-stone-200 py-2 my-2 space-y-1.5">
                    <p className="font-bold text-stone-900">PURCHASE SUMMARY:</p>
                    {completedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-stone-700">
                        <span>{item.quantity}x {item.productTitle}</span>
                        <span>৳{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1 text-right">
                    <div className="flex justify-between text-stone-600">
                      <span>Delivery Surcharge:</span>
                      <span>৳{completedOrder.paymentMethod === 'cod' ? 120 : 60}</span>
                    </div>
                    <div className="flex justify-between font-bold text-stone-950 text-sm pt-1 border-t border-stone-200">
                      <span>GRAND TOTAL:</span>
                      <span>৳{completedOrder.totalAmount}</span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-[10px] text-stone-500 border-t border-dashed border-stone-200">
                    <p>MFS Payment: {completedOrder.paymentMethod.toUpperCase()}</p>
                    {completedOrder.transactionId && (
                      <p className="font-semibold text-stone-700">Txn ID: {completedOrder.transactionId}</p>
                    )}
                    <p className="mt-2 text-[9px]">✔ This invoice operates as a fast-load delivery slip.</p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const printContent = document.getElementById('print_invoice_receipt')?.innerHTML;
                      const originalContent = document.body.innerHTML;
                      if (printContent) {
                        const win = window.open('', '', 'height=600,width=800');
                        if (win) {
                          win.document.write('<html><head><title>Print Invoice</title></head><body>');
                          win.document.write('<div style="font-family:monospace;padding:30px;max-width:500px;margin:auto;border:1px solid #ccc;">');
                          win.document.write(printContent);
                          win.document.write('</div></body></html>');
                          win.document.close();
                          win.print();
                        } else {
                          alert("Pop-up blocked. Your order is safely generated in your screen!");
                        }
                      }
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 text-xs font-semibold py-2.5 rounded hover:bg-gray-50 active:scale-98 transition cursor-pointer text-center"
                  >
                    Print Slip
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-900 text-white text-xs font-semibold py-2.5 rounded hover:opacity-90 active:scale-98 transition cursor-pointer text-center"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Cart Sidebar Column */}
          {step !== 3 && (
            <div className="md:col-span-5 p-6 bg-gray-50/50 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center justify-between">
                  <span>Shopping Basket</span>
                  <span className="bg-gray-200 text-gray-700 text-[10px] px-2 py-0.5 rounded-full">{cart.reduce((s, i) => s + i.quantity, 0)} Items</span>
                </h3>

                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div id={`checkout_item_${item.product.id}`} key={idx} className="flex gap-3 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-12 h-12 rounded object-cover border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 line-clamp-1">{item.product.title}</p>
                        <p className="text-gray-500 mt-0.5">{item.quantity} x ৳{item.product.price}</p>
                      </div>
                      <div className="text-right font-medium text-gray-950">
                        ৳{item.product.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation Sheet */}
              <div className="border-t border-gray-200 pt-4 mt-6 space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-gray-950">৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery (MFS Discounted)</span>
                  <span className="font-semibold text-gray-950">৳{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-950 pt-2 border-t border-gray-200">
                  <span>Estimated Total</span>
                  <span className="text-lg text-emerald-800">৳{total}</span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
