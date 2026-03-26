'use client';

import { useState } from "react";
import { Send, MapPin, Mail, Phone, MessageSquare, Linkedin, Twitter, Facebook } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", message: "" });
        }, 4000);
    };

    return (
        <div className="bg-slate-50 pt-24 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mb-24">
                    <span className="text-blue-600 font-black uppercase tracking-widest mb-6 inline-block">Connect</span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-12 animate-slide-up">
                        WE'RE HERE TO <br />
                        <span className="italic font-serif text-blue-600">HELP.</span>
                    </h1>
                    <p className="text-xl font-medium text-slate-500 max-w-2xl leading-relaxed">
                        Have a question about our services, need emergency support, or want to discuss a maintenance package? Reach out to our team below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start pb-24">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-black/5"
                    >
                        {submitted ? (
                            <div className="py-20 text-center space-y-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <Send className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-4xl font-black italic font-serif text-slate-900">Message Sent!</h3>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Our team will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your name"
                                        className="w-full bg-slate-50 border border-gray-100 rounded-full px-8 py-5 outline-none focus:border-blue-600 transition-colors font-bold text-sm text-slate-900"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Enter your email"
                                        className="w-full bg-slate-50 border border-gray-100 rounded-full px-8 py-5 outline-none focus:border-blue-600 transition-colors font-bold text-sm text-slate-900"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Message</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="How can we help?"
                                        className="w-full bg-slate-50 border border-gray-100 rounded-[2rem] px-8 py-6 outline-none focus:border-blue-600 transition-colors font-bold text-sm resize-none text-slate-900"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-6 rounded-full font-black text-xl hover:shadow-2xl hover:shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-4 group"
                                >
                                    Send Message
                                    <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Social & Address */}
                    <div className="space-y-16 pt-12">
                        <div className="grid grid-cols-1 gap-12">
                            {/* Email */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-blue-600 mb-6">
                                    <Mail className="w-8 h-8" />
                                    <span className="font-black uppercase tracking-widest text-xs">Email</span>
                                </div>
                                <a href="mailto:stanchtechltd@gmail.com" className="text-3xl font-black italic font-serif hover:text-blue-600 transition-colors text-slate-900 break-all">stanchtechltd@gmail.com</a>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">General & Support</p>
                            </div>

                            {/* Phones */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-blue-600 mb-6">
                                    <Phone className="w-8 h-8" />
                                    <span className="font-black uppercase tracking-widest text-xs">Phones</span>
                                </div>
                                <div className="text-2xl font-black italic font-serif text-slate-900 space-y-2">
                                    <p>+234 (0) 705 962 3727</p>
                                    <p>+234 (0) 803 734 0959 <span className="text-sm text-green-600 not-italic ml-2 tracking-widest uppercase align-middle">WhatsApp</span></p>
                                    <p>+234 (0) 808 529 0298</p>
                                </div>
                            </div>

                            {/* WeChat */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-blue-600 mb-6">
                                    <MessageSquare className="w-8 h-8" />
                                    <span className="font-black uppercase tracking-widest text-xs">WeChat</span>
                                </div>
                                <p className="text-2xl font-black text-slate-900 break-all font-serif italic">wxid_jh8kewt3w34u22</p>
                            </div>
                        </div>

                        {/* Headquarters */}
                        <div className="space-y-8 pt-12 border-t border-gray-200">
                            <div className="flex items-center gap-4 text-blue-600 mb-8">
                                <MapPin className="w-8 h-8" />
                                <span className="font-black uppercase tracking-widest text-xs">Headquarters</span>
                            </div>
                            <p className="text-3xl md:text-4xl font-black tracking-tighter leading-tight italic font-serif text-slate-900">
                                Km16 PHC - ABA Express Way, <br />
                                Adjacent Dubi, Port harcourt, <br />
                                Rivers state, Nigeria
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
