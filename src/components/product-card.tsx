'use client';

import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative h-full flex flex-col bg-white rounded-[2rem] p-6 card-hover border border-gray-100/50 shadow-sm"
        >
            <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden rounded-2xl bg-gray-50">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out p-4"
                />
                <span className="absolute top-4 left-4 bg-[#155DFC] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 transparent-blur rounded-full">
                    {product.condition || "Genuine Part"}
                </span>
            </div>

            <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-black text-gray-900 leading-tight mb-2 group-hover:text-[#155DFC] transition-colors line-clamp-2">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-6 leading-relaxed flex-1">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Inquiry Only</span>
                    <Link
                        href={`/shop/${product.id}`}
                        className="flex items-center gap-2 text-[#155DFC] font-black text-sm uppercase tracking-wider group/btn"
                    >
                        View Details
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
