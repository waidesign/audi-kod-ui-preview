import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { AppView, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogPosts';

interface BlogLandingProps {
  onNavigate: (view: AppView) => void;
  onSelectPost: (slug: string) => void;
}

type BlogCategory = 'All' | 'Guides' | 'VIN Decoding' | 'Audi News' | 'Buying Tips';

export default function BlogLanding({ onNavigate, onSelectPost }: BlogLandingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');

  const categories: BlogCategory[] = ['All', 'Guides', 'VIN Decoding', 'Audi News', 'Buying Tips'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
  }, []);

  const regularPosts = useMemo(() => {
    // If we've selected a category or are searching, display all filtered posts in the main grid
    if (selectedCategory !== 'All' || searchQuery !== '') {
      return filteredPosts;
    }
    // Otherwise, exclude the featured post from the general list
    return filteredPosts.filter(post => post.id !== featuredPost?.id);
  }, [filteredPosts, featuredPost, selectedCategory, searchQuery]);

  return (
    <div className="bg-brand-white min-h-screen text-brand-black pb-24">
      {/* Blog Hero */}
      <div className="relative py-20 px-6 bg-grey-1000 text-brand-white border-b border-grey-900 overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-[1440px] mx-auto relative z-10 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red bg-brand-red/10 px-3 py-1 rounded-xs inline-block mb-4">
            Audi Insights & Guides
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase mb-6 max-w-3xl mx-auto">
            The Audi Owner's <span className="text-grey-300">Handbook</span>
          </h1>
          <p className="text-grey-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            Expert breakdowns of Audi VIN codes, original specifications, trim packages, and window sticker replication guides.
          </p>

          {/* Premium Search input */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-grey-500 group-focus-within:text-brand-white transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search articles, tags, or options..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-grey-900 border border-grey-800 rounded-sm py-4 pl-12 pr-4 text-sm text-brand-white placeholder-grey-500 focus:outline-none focus:border-brand-white focus:ring-1 focus:ring-brand-white transition-all shadow-lg"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-grey-500 hover:text-brand-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-6 mt-16">
        {/* Category Selector Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-12 scrollbar-thin border-b border-grey-100 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-black text-brand-white shadow-md'
                  : 'text-grey-600 hover:text-brand-black hover:bg-grey-50 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post - Only show when no search filter and on "All" category */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <div className="mb-16 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-brand-white border border-grey-200 rounded-sm overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300">
              {/* Cover Image */}
              <div 
                className="lg:col-span-7 h-[300px] sm:h-[400px] lg:h-[500px] relative overflow-hidden cursor-pointer"
                onClick={() => onSelectPost(featuredPost.slug)}
              >
                <img 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-brand-red text-brand-white px-3.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-xs shadow-md">
                  Featured Article
                </div>
              </div>
              
              {/* Post Details */}
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-bold text-grey-500 mb-4">
                    <span className="text-brand-red bg-brand-red/5 px-2.5 py-1 rounded-xs font-black uppercase tracking-wider text-[10px]">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {featuredPost.date}
                    </span>
                  </div>
                  
                  <h2 
                    className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-brand-red transition-colors cursor-pointer leading-tight"
                    onClick={() => onSelectPost(featuredPost.slug)}
                  >
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-grey-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    {featuredPost.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {featuredPost.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-[10px] bg-grey-50 text-grey-600 border border-grey-200 px-2 py-0.5 rounded-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-grey-100 mt-auto">
                  <div className="flex items-center gap-3">
                    <img 
                      src={featuredPost.author.avatar} 
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-grey-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-brand-black">{featuredPost.author.name}</h4>
                      <p className="text-[10px] text-grey-500">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onSelectPost(featuredPost.slug)}
                    className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-black hover:text-brand-red transition-colors group/btn cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={18} className="text-brand-red" />
              <span>{selectedCategory === 'All' && !searchQuery ? 'Recent Publications' : 'Search Results'}</span>
              <span className="text-xs text-grey-400 font-bold bg-grey-50 border border-grey-200 px-2 py-0.5 rounded-full ml-1">
                {filteredPosts.length}
              </span>
            </h3>
          </div>

          {regularPosts.length === 0 ? (
            <div className="text-center py-20 bg-grey-50 border border-grey-200 rounded-sm">
              <p className="text-grey-500 font-semibold text-lg mb-2">No articles found</p>
              <p className="text-grey-400 text-sm max-w-md mx-auto">
                We couldn't find any articles matching "{searchQuery}" in category "{selectedCategory}". Try checking your spelling or selecting another category.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-6 bg-brand-black text-brand-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xs hover:bg-grey-900 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-brand-white border border-grey-200 rounded-sm overflow-hidden flex flex-col shadow-xs hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Card Image */}
                  <div 
                    className="h-56 relative overflow-hidden cursor-pointer"
                    onClick={() => onSelectPost(post.slug)}
                  >
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                    />
                    <span className="absolute top-3 left-3 bg-brand-black/80 text-brand-white px-2.5 py-0.8 text-[9px] font-black uppercase tracking-wider rounded-xs backdrop-blur-xs">
                      {post.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-grey-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                      </div>

                      <h4 
                        className="text-base font-black uppercase tracking-tight leading-snug mb-3 group-hover:text-brand-red transition-colors cursor-pointer line-clamp-2"
                        onClick={() => onSelectPost(post.slug)}
                      >
                        {post.title}
                      </h4>

                      <p className="text-grey-600 text-xs leading-relaxed mb-6 font-medium line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-grey-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover border border-grey-200"
                        />
                        <span className="text-[10px] font-bold text-grey-800">{post.author.name}</span>
                      </div>
                      
                      <button 
                        onClick={() => onSelectPost(post.slug)}
                        className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-brand-black hover:text-brand-red transition-colors group/btn cursor-pointer"
                      >
                        <span>Read More</span>
                        <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
