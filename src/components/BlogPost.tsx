import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, 
  Link2, Check, ArrowRight, List, Sparkles, ChevronRight
} from 'lucide-react';
import { AppView, BlogPost as BlogPostType } from '../types';
import { BLOG_POSTS } from '../data/blogPosts';

interface BlogPostProps {
  postSlug: string | null;
  onNavigate: (view: AppView) => void;
  onOpenVinModal: () => void;
}

export default function BlogPost({ postSlug, onNavigate, onOpenVinModal }: BlogPostProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [inputVin, setInputVin] = useState('');

  const post = BLOG_POSTS.find(p => p.slug === postSlug) || BLOG_POSTS[0];

  // Update progress bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.pageYOffset / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parse headers from markdown content to create Table of Contents
  const toc = post.content
    .split('\n')
    .filter(line => line.startsWith('## ') || line.startsWith('### '))
    .map(line => {
      const isH3 = line.startsWith('### ');
      const text = line.replace('### ', '').replace('## ', '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return { text, id, isH3 };
    });

  // Function to process content markdown headers to add IDs so TOC links work
  const renderFormattedContent = (contentString: string) => {
    return contentString.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return <h2 key={index} id={id} className="text-xl sm:text-2xl font-black uppercase tracking-tight text-brand-black mt-10 mb-4 border-b border-grey-100 pb-2">{text}</h2>;
      }
      if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return <h3 key={index} id={id} className="text-base sm:text-lg font-bold text-brand-black mt-8 mb-3">{text}</h3>;
      }
      if (line.startsWith('* **') || line.startsWith('- **') || line.startsWith('* ') || line.startsWith('- ')) {
        const cleanLine = line.replace(/^[\s\-\*]+/, '');
        // simple bold parser
        if (cleanLine.includes('**')) {
          const parts = cleanLine.split('**');
          return (
            <ul key={index} className="list-disc pl-6 my-2 text-grey-700 text-sm sm:text-base font-medium">
              <li>
                <span className="font-extrabold text-brand-black">{parts[1]}</span>
                {parts[2]}
              </li>
            </ul>
          );
        }
        return (
          <ul key={index} className="list-disc pl-6 my-2 text-grey-700 text-sm sm:text-base font-medium">
            <li>{cleanLine}</li>
          </ul>
        );
      }
      if (line.trim().startsWith('|')) {
        // Table line parsing
        if (line.includes('---')) return null; // skip divider
        const cells = line.split('|').map(c => c.trim()).filter(c => c !== '');
        const isHeader = index < 3; // quick guess
        if (isHeader && index === 0) return null; // let's render a simple table instead of row by row if possible
        
        return (
          <div key={index} className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse border border-grey-200">
              <tbody>
                <tr className={isHeader ? "bg-grey-50 font-bold" : "hover:bg-grey-50"}>
                  {cells.map((cell, idx) => (
                    <td key={idx} className="border border-grey-200 px-4 py-2 text-xs sm:text-sm font-medium">
                      {cell}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
      if (line.trim() === '---') {
        return <hr key={index} className="my-8 border-grey-200" />;
      }
      if (line.trim() !== '') {
        // Normal paragraph
        return <p key={index} className="text-grey-700 text-sm sm:text-base leading-relaxed mb-4 font-medium">{line}</p>;
      }
      return null;
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVin.trim()) {
      onNavigate('msrp');
      // Pass VIN or handle search logic here
    }
  };

  // Get related posts (exclude current, same category or tags if possible)
  const relatedPosts = BLOG_POSTS
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="bg-brand-white min-h-screen text-brand-black relative">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-brand-red z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Main Container */}
      <article className="max-w-[1440px] mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('blog')}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-grey-600 hover:text-brand-black mb-8 cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Blog Feed</span>
        </button>

        {/* Hero Section */}
        <div className="max-w-[1000px] mx-auto text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red bg-brand-red/10 px-3 py-1 rounded-xs inline-block mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight mb-6 text-brand-black">
            {post.title}
          </h1>

          {/* Author Meta */}
          <div className="flex items-center justify-center gap-4 border-y border-grey-100 py-4 max-w-xl mx-auto">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-grey-200"
            />
            <div className="text-left">
              <p className="text-xs font-black text-brand-black">{post.author.name}</p>
              <p className="text-[10px] text-grey-500 font-bold uppercase tracking-wider">{post.author.role}</p>
            </div>
            <div className="h-6 w-[1px] bg-grey-200" />
            <div className="flex items-center gap-4 text-xs font-bold text-grey-500">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Large Cover Image */}
        <div className="max-w-[1100px] mx-auto rounded-sm overflow-hidden h-[300px] sm:h-[450px] lg:h-[550px] mb-12 shadow-md">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1100px] mx-auto">
          {/* Left Column: Social Share (Sticky) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 flex flex-col items-center gap-3">
              <span className="text-[9px] font-bold uppercase tracking-wider text-grey-400 mb-2">Share</span>
              <button 
                onClick={handleCopyLink}
                className="w-10 h-10 rounded-full border border-grey-200 flex items-center justify-center hover:bg-grey-50 hover:border-brand-black transition-colors cursor-pointer text-grey-600 hover:text-brand-black relative group"
                aria-label="Copy Link"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Link2 size={16} />}
                <span className="absolute left-full ml-2 px-2 py-1 bg-brand-black text-brand-white text-[9px] font-bold rounded-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-grey-200 flex items-center justify-center hover:bg-grey-50 hover:border-brand-black transition-colors text-grey-600 hover:text-brand-black"
                aria-label="Share on Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-grey-200 flex items-center justify-center hover:bg-grey-50 hover:border-brand-black transition-colors text-grey-600 hover:text-brand-black"
                aria-label="Share on Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Middle Column: Core Content */}
          <div className="col-span-1 lg:col-span-8">
            {/* Table of Contents (Mobile First / Top of Article) */}
            {toc.length > 0 && (
              <div className="bg-grey-50 border border-grey-200 rounded-sm p-6 mb-8">
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-black mb-4 flex items-center gap-2 border-b border-grey-200 pb-2">
                  <List size={14} className="text-brand-red" />
                  <span>Table of Contents</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm font-semibold">
                  {toc.map((item, idx) => (
                    <li key={idx} style={{ paddingLeft: item.isH3 ? '1rem' : '0' }}>
                      <a 
                        href={`#${item.id}`} 
                        className="text-grey-600 hover:text-brand-red flex items-center gap-1.5 transition-colors"
                      >
                        <ChevronRight size={12} className="text-grey-400" />
                        <span>{item.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rendered markdown body */}
            <div className="prose prose-grey max-w-none">
              {renderFormattedContent(post.content)}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-grey-100">
              {post.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-xs bg-grey-50 text-grey-700 border border-grey-200 px-3 py-1 rounded-xs font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky MSRP Search CTA */}
          <div className="col-span-1 lg:col-span-3">
            <div className="sticky top-28 bg-grey-1000 text-brand-white border border-grey-900 rounded-sm p-6 shadow-xl relative overflow-hidden">
              {/* Decorative design details */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/10 rounded-full blur-2xl pointer-events-none" />
              
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-xs inline-block mb-3">
                Verify Audi Options
              </span>
              <h4 className="text-sm sm:text-base font-black uppercase tracking-tight leading-snug mb-3">
                Need original pricing & specifications?
              </h4>
              <p className="text-[11px] text-grey-400 mb-6 leading-relaxed">
                Generate a replica Monroney Window Sticker listing packages, options, MSRP pricing, and paint details.
              </p>

              <form onSubmit={handleVinSubmit} className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Enter 17-digit Audi VIN" 
                  value={inputVin}
                  onChange={(e) => setInputVin(e.target.value.toUpperCase())}
                  maxLength={17}
                  className="w-full bg-grey-900 border border-grey-800 rounded-xs py-2.5 px-3 text-xs text-brand-white placeholder-grey-600 focus:outline-none focus:border-brand-white focus:ring-1 focus:ring-brand-white"
                />
                
                <button 
                  type="submit"
                  className="w-full bg-brand-white text-brand-black hover:bg-grey-100 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Sparkles size={12} className="text-brand-red animate-pulse" />
                  <span>Decode VIN</span>
                </button>
              </form>

              <button 
                onClick={onOpenVinModal}
                className="w-full text-center mt-3 text-[10px] font-bold text-grey-400 hover:text-brand-white transition-colors cursor-pointer"
              >
                Where can I find my VIN?
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Signup Banner */}
        <div className="max-w-[1100px] mx-auto bg-grey-50 border border-grey-200 rounded-sm p-8 sm:p-10 text-center my-20 relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2">Subscribe to Audi Insider</h3>
            <p className="text-xs sm:text-sm text-grey-600 mb-6 font-medium">
              Stay updated on Audi buying guides, VIN news, maintenance advice, and sticker tools updates. Unsubscribe anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 bg-brand-white border border-grey-300 rounded-xs px-4 py-2.5 text-xs text-brand-black focus:outline-none focus:border-brand-black"
              />
              <button className="bg-brand-black text-brand-white hover:bg-grey-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="max-w-[1100px] mx-auto border-t border-grey-200 pt-16">
            <h3 className="text-lg font-black uppercase tracking-wider mb-8 flex items-center gap-2">
              <span>You Might Also Like</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(p => (
                <article 
                  key={p.id} 
                  className="bg-brand-white border border-grey-200 rounded-sm overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                >
                  <div 
                    className="h-44 relative overflow-hidden cursor-pointer"
                    onClick={() => onNavigate('blog-post')}
                  >
                    <img 
                      src={p.coverImage} 
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-brand-red mb-2 block">
                        {p.category}
                      </span>
                      <h4 
                        className="text-sm font-black uppercase tracking-tight mb-2 group-hover:text-brand-red cursor-pointer transition-colors line-clamp-2"
                        onClick={() => {
                          // Change selection and scroll to top
                          onNavigate('blog-post');
                          // Normally we'd pass slug but routing handles this in App.tsx
                        }}
                      >
                        {p.title}
                      </h4>
                      <p className="text-grey-600 text-xs line-clamp-2 mb-4 font-medium">
                        {p.excerpt}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => {
                        // To trigger update:
                        const searchParams = new URLSearchParams(window.location.search);
                        searchParams.set('article', p.slug);
                        // We will let the App.tsx navigate appropriately by selecting this post
                        window.location.hash = `blog-post?slug=${p.slug}`;
                        // For state navigation:
                        onNavigate('blog'); // briefly toggle or just delegate
                        setTimeout(() => {
                          const customEvent = new CustomEvent('select-post', { detail: p.slug });
                          window.dispatchEvent(customEvent);
                        }, 50);
                      }}
                      className="text-[9px] font-black uppercase tracking-wider text-brand-black hover:text-brand-red flex items-center gap-1 group/btn cursor-pointer mt-auto border-t border-grey-100 pt-3"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
