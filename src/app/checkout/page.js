'use client';

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        country: "Nigeria",
        street: "",
        city: "",
        province: "Western Province",
        zip: "",
        phone: "",
        email: "",
        additionalInfo: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        const orderData = {
            id: `ORD-${Math.floor(Math.random() * 1000000)}`,
            date: new Date().toISOString(),
            items: cartItems,
            total: cartTotal,
            status: "Processing",
            billing: formData
        };

        // Save order to localStorage
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([orderData, ...existingOrders]));

        // Clear cart and redirect
        clearCart();
        setIsSubmitting(false);
        router.push("/orders");
    };

    if (cartItems.length === 0 && !isSubmitting) {
        return (
            <div className="bg-white min-h-screen pt-40 flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Your cart is empty</h1>
                <p className="text-gray-400 font-medium text-base mb-10">Add some products to your cart before checking out.</p>
                <Link href="/shop" className="px-10 py-4 bg-gray-900 text-white rounded-md font-bold text-sm hover:bg-blue-600 transition-all">
                    Go to Shop
                </Link>
            </div>
        );
    }

    return (
        <div>
            {/* --- HERO SECTION --- */}
            <section className="relative h-[320px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/asset/about_image/built on excellence.png" 
                        alt="Checkout Hero" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0b1a2e]/70 backdrop-blur-[2px]" />
                </div>
                
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-900 text-white mb-6 tracking-tight" style={{ fontFamily: "'Neue Machina', sans-serif", letterSpacing: "-0.04em" }}>Checkout</h1>
                    <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em]">
                        <Link href="/shop" className="text-white hover:text-blue-400 transition-colors" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Shop</Link>
                        <ChevronRight size={14} className="text-blue-400" />
                        <span className="text-white/60" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Checkout</span>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-10 md:px-24 py-16">
                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* LEFT: BILLING DETAILS */}
                    <div>
                        <h2 className="text-3xl font-900 text-gray-900 mb-10 tracking-tight" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Billing Details</h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-900 text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>First Name</label>
                                    <input 
                                        type="text" 
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-medium bg-gray-50/30" 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-900 text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Last Name</label>
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-medium bg-gray-50/30" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-900 text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Company Name (Optional)</label>
                                <input 
                                    type="text" 
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="w-full px-6 py-4 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-medium bg-gray-50/30" 
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-900 text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Country / Region</label>
                                <div className="relative">
                                    <select 
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all appearance-none bg-gray-50/30 font-bold text-sm text-gray-900"
                                        style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}
                                    >
                                        <option>Sri Lanka</option>
                                        <option>Nigeria</option>
                                        <option>Ghana</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronRight size={16} className="rotate-90 text-gray-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-900 text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Street address</label>
                                <input 
                                    type="text" 
                                    name="street"
                                    placeholder="House number and street name"
                                    required
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    className="w-full px-6 py-4 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-medium bg-gray-50/30" 
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-900 text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Town / City</label>
                                    <input 
                                        type="text" 
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-medium bg-gray-50/30" 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-900 text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Province</label>
                                    <div className="relative">
                                        <select 
                                            name="province"
                                            value={formData.province}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all appearance-none bg-gray-50/30 font-bold text-sm text-gray-900"
                                            style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}
                                        >
                                            <option>Western Province</option>
                                            <option>Rivers State</option>
                                            <option>Lagos State</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ChevronRight size={16} className="rotate-90 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-900 text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Phone</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-medium bg-gray-50/30" 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-900 text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Email address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-medium bg-gray-50/30" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 pt-6">
                                <input 
                                    type="text" 
                                    name="additionalInfo"
                                    placeholder="Notes about your order, e.g. special notes for delivery." 
                                    value={formData.additionalInfo}
                                    onChange={handleInputChange}
                                    className="w-full px-6 py-8 border-2 border-gray-100 rounded-2xl focus:border-blue-600 outline-none transition-all text-sm font-medium bg-gray-50/30" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: ORDER SUMMARY */}
                    <div className="bg-gray-50/50 p-12 rounded-[2rem] border-2 border-slate-50 h-fit sticky top-32">
                        <div className="flex justify-between items-center mb-10 border-b-2 border-white pb-6">
                            <h3 className="text-xs font-900 text-gray-900 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Product</h3>
                            <h3 className="text-xs font-900 text-gray-900 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Subtotal</h3>
                        </div>

                        <div className="space-y-6 mb-8 border-b border-gray-200 pb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 font-medium text-sm">{item.name}</span>
                                        <span className="text-sm text-gray-900 font-bold">x {item.quantity}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">NGN { (item.price * item.quantity).toLocaleString() }</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 border-b-2 border-white pb-8 mb-10">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Subtotal</span>
                                <span className="text-sm font-black text-gray-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NGN { cartTotal.toLocaleString() }</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-900 text-gray-900 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Total</span>
                                <span className="text-3xl font-900 text-blue-600 tracking-tighter" style={{ fontFamily: "'Neue Machina', sans-serif" }}>
                                    NGN { cartTotal.toLocaleString() }
                                </span>
                            </div>
                        </div>

                        {/* PAYMENT METHODS */}
                        <div className="space-y-8 mb-12">
                            <label className="flex items-start gap-6 cursor-pointer group p-6 rounded-2xl border-2 border-white bg-white/50 hover:bg-white transition-all">
                                <input type="radio" name="payment" className="mt-1 accent-blue-600" defaultChecked />
                                <div className="flex-1">
                                    <span className="text-[16px] font-900 text-gray-900 block mb-3" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Direct Bank Transfer</span>
                                    <p className="text-[17px] text-gray-500 font-medium leading-relaxed" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-6 cursor-pointer group p-6 rounded-2xl border-2 border-white bg-white/50 hover:bg-white transition-all">
                                <input type="radio" name="payment" className="accent-blue-600" />
                                <span className="text-[16px] font-900 text-gray-400 group-hover:text-gray-900 transition-colors" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Cash On Delivery</span>
                            </label>
                            <label className="flex items-center gap-6 cursor-pointer group p-6 rounded-2xl border-2 border-white bg-white/50 hover:bg-white transition-all">
                                <input type="radio" name="payment" className="accent-blue-600" />
                                <span className="text-[16px] font-900 text-gray-400 group-hover:text-gray-900 transition-colors" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Pay with Opay</span>
                            </label>
                        </div>

                        <div className="text-xs font-sans text-gray-900 mb-8 max-w-sm">
                            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-bold">privacy policy.</span>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 bg-gray-900 text-white rounded-xl font-900 uppercase tracking-[0.2em] text-[12px] hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Processing...
                                </>
                            ) : "Place order"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
