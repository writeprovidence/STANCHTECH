'use client';

import { useCart } from "@/context/cart-context";
import { Plus, Check, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative h-full flex flex-col bg-white rounded-[2rem] p-6 card-hover border border-gray-100/50"
        >
            <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden rounded-2xl bg-muted/30">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {product.isNew && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 transparent-blur rounded-full">
                        New
                    </span>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest leading-none mt-0.5">
                        4.8 (120)
                    </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-4 leading-relaxed flex-1">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Price</span>
                        <span className="text-2xl font-black text-secondary">${product.price.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg group-hover:shadow-primary/25 ${added ? "bg-green-500 shadow-green-500/25" : "bg-primary shadow-primary/20"
                            }`}
                    >
                        {added ? (
                            <Check className="text-white w-6 h-6 stroke-[3px]" />
                        ) : (
                            <Plus className="text-white w-6 h-6 stroke-[3px]" />
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
