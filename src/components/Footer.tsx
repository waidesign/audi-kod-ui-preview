import { AppView } from '../types';
import logoImg from '../images/audi-site-logo.webp';

interface FooterProps {
  onNavigate?: (view: AppView) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-grey-1000 text-grey-400 py-16 px-6 border-t border-grey-900">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 className="text-brand-white font-semibold mb-4">Product</h4>
          <ul className="space-y-3 text-sm">
            <li><button onClick={() => onNavigate?.('home')} className="hover:text-brand-white transition-colors text-left cursor-pointer">Window Sticker Lookup</button></li>
            <li><button onClick={() => onNavigate?.('msrp')} className="hover:text-brand-white transition-colors text-left cursor-pointer flex items-center gap-1.5"><span className="text-brand-white font-semibold">MSRP by VIN</span> <span className="text-[9px] bg-brand-red text-white px-1 rounded-xs">OEM</span></button></li>
            <li><button onClick={() => onNavigate?.('signup')} className="hover:text-brand-white transition-colors text-left cursor-pointer">Member Garage</button></li>
            <li><button onClick={() => onNavigate?.('login')} className="hover:text-brand-white transition-colors text-left cursor-pointer">Sign In Portal</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-brand-white font-semibold mb-4">Tools & Resources</h4>
          <ul className="space-y-3 text-sm">
            <li><button onClick={() => onNavigate?.('msrp')} className="hover:text-brand-white transition-colors text-left cursor-pointer">Build Sheet by VIN</button></li>
            <li><button onClick={() => onNavigate?.('msrp')} className="hover:text-brand-white transition-colors text-left cursor-pointer">Options & Pricing Breakdown</button></li>
            <li><button onClick={() => onNavigate?.('home')} className="hover:text-brand-white transition-colors text-left cursor-pointer">Where to find VIN</button></li>
            <li><button onClick={() => onNavigate?.('msrp')} className="hover:text-brand-white transition-colors text-left cursor-pointer">MSRP FAQ</button></li>
            <li><button onClick={() => onNavigate?.('blog')} className="hover:text-brand-white transition-colors text-left cursor-pointer">Blog Insights</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-brand-white font-semibold mb-4">Support & Trust</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-brand-white transition-colors">Contact Support</a></li>
            <li><a href="#" className="hover:text-brand-white transition-colors">100% Refund Policy</a></li>
            <li><a href="#" className="hover:text-brand-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-brand-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <button 
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none mb-4"
            aria-label="AudiWindowSticker Home"
          >
            <div id="footer-logo-placeholder" className="flex items-center">
              <img
                id="footer-logo-image"
                src={logoImg}
                alt="AudiWindowSticker Logo"
                className="h-8 sm:h-9 w-auto max-w-[220px] object-contain group-hover:opacity-90 transition-opacity brightness-0 invert"
              />
            </div>
          </button>
          <p className="text-sm leading-relaxed mb-4">
            An independent utility for retrieving original factory Monroney labels, MSRP records, and vehicle build data.
          </p>
        </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto pt-8 border-t border-grey-900 text-xs text-grey-600 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} AudiWindowSticker.com. All rights reserved.</p>
        <p className="text-center md:text-right max-w-xl">
          Disclaimer: This website is not affiliated with, endorsed by, or connected to Audi AG or Volkswagen Group. All trademarks and logos are the property of their respective owners.
        </p>
      </div>
    </footer>
  );
}

