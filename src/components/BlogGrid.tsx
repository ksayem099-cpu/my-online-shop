/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, BookOpen, Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogPost, ThemeSettings } from '../types';

interface BlogGridProps {
  blogs: BlogPost[];
  theme: ThemeSettings;
}

export default function BlogGrid({ blogs, theme }: BlogGridProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const titleFont = theme.fontPairing === 'classic' || theme.fontPairing === 'editorial' ? 'font-serif' : 'font-sans';

  // WRITER EXPANDED BLOG READER VIEW
  if (selectedPost) {
    const post = selectedPost;
    return (
      <div id="expanded_blog_reader" className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8 space-y-6 container mx-auto text-left">
        {/* Back Link */}
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog Roll
        </button>

        {/* Hero banner for post */}
        <div className="relative h-[200px] sm:h-[300px] rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white space-y-1 pr-6">
            <span className="bg-amber-600 font-sans text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm">{post.category}</span>
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-medium tracking-tight mt-1 ${titleFont}`}>{post.title}</h1>
          </div>
        </div>

        {/* Meta Stats row */}
        <div className="flex flex-wrap items-center gap-4 text-[10px] text-gray-500 border-b border-stone-200 pb-3 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Published: {post.date}</span>
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Writer: {post.author}</span>
          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views} Views</span>
        </div>

        {/* Article Body */}
        <article className="prose max-w-3xl mx-auto py-2 text-gray-700 text-sm leading-relaxed font-sans space-y-4 whitespace-pre-line">
          {post.content}
        </article>

        {/* Suggested Actions */}
        <div className="bg-stone-50 border border-stone-200 p-4 rounded-md text-center max-w-xl mx-auto space-y-3">
          <p className="text-xs text-gray-600 font-medium">Enjoyed the reading? Browse our boutique products related to {post.category}!</p>
          <button
            onClick={() => {
              setSelectedPost(null);
              const element = document.getElementById('store_products_headline');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block bg-gray-900 text-white text-xs font-bold uppercase tracking-wider py-2 px-5 hover:opacity-90 active:scale-98 transition rounded-sm cursor-pointer"
          >
            Shop Catalogs
          </button>
        </div>

      </div>
    );
  }

  // STANDARD ARTICLES ROSTER
  return (
    <div id="store_blogs_grid" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((post) => (
          <div
            id={`blog_post_card_${post.id}`}
            key={post.id}
            className="group block bg-white rounded-lg border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-xs transition duration-300"
          >
            <div
              onClick={() => setSelectedPost(post)}
              className="relative aspect-video w-full bg-stone-50 overflow-hidden border-b border-stone-100 cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2.5 left-2.5 bg-amber-600 text-white font-sans text-[8px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                {post.category}
              </span>
            </div>

            <div className="p-4 text-left flex-1 flex flex-col justify-between space-y-2">
              <div className="space-y-1.5">
                <p className="text-[9px] text-gray-400 font-semibold uppercase">{post.date} &bull; Writer: {post.author}</p>
                <h3
                  onClick={() => setSelectedPost(post)}
                  className={`text-sm sm:text-base font-semibold text-gray-900 group-hover:text-amber-700 transition leading-snug line-clamp-1 cursor-pointer ${titleFont}`}
                >
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans line-clamp-2">{post.excerpt}</p>
              </div>

              <div className="pt-2 border-t border-stone-100 mt-2 flex justify-between items-center">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-[10px] font-bold uppercase tracking-wider text-gray-900 hover:text-amber-700 transition flex items-center gap-1 cursor-pointer"
                >
                  Read Story <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-[10px] text-gray-400 font-semibold">{post.views} Reads</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
