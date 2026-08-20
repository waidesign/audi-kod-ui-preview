import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  FileText, 
  Car, 
  Layers, 
  DollarSign, 
  CheckCircle2, 
  TrendingDown, 
  Sparkles, 
  Award, 
  ChevronRight, 
  ChevronDown, 
  Info, 
  HelpCircle, 
  FileCheck, 
  Zap, 
  Fuel, 
  Lock, 
  Sliders, 
  ArrowUpRight,
  Compass,
  FileSpreadsheet,
  AlertTriangle,
  UserCheck,
  Building2,
  Receipt
} from 'lucide-react';
import SearchWidget from './SearchWidget';

interface MsrpByVinPageProps {
  onOpenVinModal?: () => void;
  onOpenSampleModal?: () => void;
  onNavigate?: (view: 'home' | 'msrp' | 'login' | 'signup') => void;
}

const AUDI_MSRP_EXAMPLES = [
  {
    model: '2024 Audi RS6 Avant',
    baseMsrp: 125800,
    options: [
      { name: 'Carbon Optic Package (22" 5-V-spoke wheels, carbon exterior trim)', price: 4950 },
      { name: 'Bang & Olufsen® Advanced 3D Sound System (1,820W, 19 speakers)', price: 4900 },
      { name: 'Ceramic Brakes with Red Calipers', price: 9000 },
      { name: 'Executive Package (Extended leather, heated rear seats, power soft-closing doors)', price: 2750 },
      { name: 'RS Sport Exhaust System with Black Tips', price: 1000 },
      { name: 'Nardo Gray Exterior Premium Paint', price: 595 }
    ],
    destination: 1095,
    gasGuzzler: 1700,
  },
  {
    model: '2024 Audi Q8 55 TFSI Prestige',
    baseMsrp: 73800,
    options: [
      { name: 'Prestige Package (HD Matrix-design LED, HUD, contour ambient lighting)', price: 6900 },
      { name: 'Luxury Package (Valcona leather, individual contour front massage seats)', price: 3450 },
      { name: 'Black Optic Package (22" 5-arm graphite wheels, high-gloss black optics)', price: 2200 },
      { name: 'Adaptive Air Suspension & 4-Wheel Steering', price: 1750 },
      { name: 'Towing Package (7,700 lbs capacity)', price: 750 }
    ],
    destination: 1195,
    gasGuzzler: 0,
  },
  {
    model: '2024 Audi e-tron GT quattro',
    baseMsrp: 106500,
    options: [
      { name: 'Performance Package (e-torque vectoring plus, rear wheel steering, black optic)', price: 6400 },
      { name: 'Full Leather Package (Fine Nappa leather, pneumatic side bolsters)', price: 4000 },
      { name: 'Executive Package (Adaptive cruise assist, heated rear seats)', price: 2250 },
      { name: '21" 10-Spoke Trapezoid Design Bi-Color Wheels', price: 2000 },
      { name: 'Mythos Black Metallic Paint', price: 595 }
    ],
    destination: 1495,
    gasGuzzler: 0,
  }
];

const AUDI_MODELS_LIST = {
  'Sedans & Sportbacks': [
    'A3 Sedan', 'S3 Sedan', 'RS 3', 'A4 Sedan', 'S4 Sedan', 'A5 Sportback', 
    'S5 Sportback', 'RS 5 Sportback', 'A6 Sedan', 'S6 Sedan', 'A7 Sportback', 
    'S7 Sportback', 'RS 7', 'A8 L', 'S8'
  ],
  'SUVs & Crossovers': [
    'Q3', 'Q4 e-tron', 'Q4 Sportback e-tron', 'Q5', 'Q5 Sportback', 'SQ5', 
    'SQ5 Sportback', 'Q7', 'SQ7', 'Q8', 'SQ8', 'RS Q8', 'Q8 e-tron', 'SQ8 e-tron'
  ],
  'Avants & Allroads': [
    'A4 allroad quattro', 'A6 allroad quattro', 'RS 6 Avant', 'A4 Avant', 'A6 Avant', 'S4 Avant', 'S6 Avant'
  ],
  'Coupes, Cabriolets & Performance': [
    'A5 Coupe', 'S5 Coupe', 'RS 5 Coupe', 'A5 Cabriolet', 'S5 Cabriolet', 
    'TT Coupe', 'TTS Coupe', 'TT RS', 'R8 V10 Coupe', 'R8 V10 Spyder', 
    'e-tron GT', 'RS e-tron GT'
  ],
  'Classics & Legacy': [
    'Audi 100', 'Audi 200', 'Audi 5000', 'Audi 80', 'Audi 90', 'Audi Quattro (Ur-Quattro)', 'Audi V8', 'Audi Cabriolet'
  ]
};

const FAQ_ITEMS = [
  {
    q: "Can I look up an Audi MSRP by VIN number?",
    a: "Yes. By inputting your 17-digit Audi VIN into our lookup tool, we retrieve the exact manufacturer Monroney build records. This displays the original Base MSRP, factory-installed packages, standalone options, individual paint/interior surcharges, destination fees, and total factory MSRP exactly as produced in Ingolstadt or Neckarsulm."
  },
  {
    q: "How do I find the original MSRP of my used Audi?",
    a: "The most authoritative and accurate way to find your used Audi's original MSRP is through an OEM Monroney Window Sticker lookup. Third-party listing estimates often miss expensive option packages (such as Carbon Ceramic Brakes, Bang & Olufsen 3D Advanced sound, or Prestige packages). Our VIN decoder pulls the exact factory invoice ledger."
  },
  {
    q: "Is MSRP the same as the Window Sticker price?",
    a: "Yes. The term 'Window Sticker' refers to the federally mandated Monroney label affixed to every new passenger car in the United States. Total MSRP is the official bottom-line price printed on that sticker, including base vehicle pricing, optional packages, and destination charges."
  },
  {
    q: "Can I get a build sheet by VIN for Audi?",
    a: "Yes. The Audi MSRP lookup provides a comprehensive factory build sheet outlining all PR-codes (production codes), interior upholstery trims, exterior color codes, drivetrain specifications, and standard and optional feature suites."
  },
  {
    q: "Does Carfax show the original Audi MSRP?",
    a: "Carfax typically provides an estimated base price or broad trim level range, but often omits line-item optional equipment pricing, custom Audi Exclusive choices, and exact package values. An official Monroney sticker provides the verified itemized dollar amounts."
  },
  {
    q: "Can I find MSRP for older or classic Audi models?",
    a: "Yes! Our database covers Audi models dating back several decades, including classic Audi 80/90, 100/200, 5000, Ur-Quattro, B5/B6/B7 S4/RS4, C5 RS6, and modern e-tron / RS platforms."
  },
  {
    q: "Why is knowing the original MSRP important when buying a used Audi?",
    a: "Audi vehicles have extensive option catalogs where a single model's original price could range by $20,000 to $40,000+ based on packages like Dynamic Ride Control, Sport Differential, Night Vision, or Executive Seating. Knowing the original MSRP allows you to verify true build specs, calculate accurate depreciation, and avoid overpaying for a base-spec car disguised as a loaded model."
  },
  {
    q: "How does depreciation affect Audi pricing?",
    a: "German luxury vehicles generally depreciate on a predictable curve: approximately 20% in year one, and 45-55% by year four. By comparing the vehicle's original total MSRP against its current asking price, buyers and sellers can gauge whether the vehicle is priced fairly against market depreciation trends."
  },
  {
    q: "What is the difference between MSRP and Invoice Price?",
    a: "MSRP (Manufacturer's Suggested Retail Price) is the sticker price recommended by Audi AG for retail sale. Invoice Price is the wholesale amount the authorized dealership was billed by Audi of America for the vehicle before dealer holdbacks, incentives, and volume bonuses."
  },
  {
    q: "Can I use the Audi MSRP breakdown for insurance total loss claims?",
    a: "Absolutely. Insurance adjusters frequently use generic trim averages that undervalue high-option Audi builds. Presenting the official Monroney window sticker showing itemized optional packages (e.g., $9,000 ceramic brakes or $6,900 Prestige package) provides indisputable legal proof of your car's true replacement value."
  },
  {
    q: "How accurate is the Audi MSRP lookup by VIN?",
    a: "Our data is sourced directly from factory build records and manufacturer databases, providing 100% precision for factory line items, PR production codes, options, colors, and official Monroney delivery pricing."
  },
  {
    q: "Can I look up Audi MSRP using a US License Plate?",
    a: "Yes! If you don't have the 17-digit VIN on hand, you can switch to the License Plate tab on our search widget and select your US state to automatically cross-reference the state registry with the VIN record."
  }
];

export default function MsrpByVinPage({ onOpenVinModal, onOpenSampleModal, onNavigate }: MsrpByVinPageProps) {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [modelCategory, setModelCategory] = useState<keyof typeof AUDI_MODELS_LIST>('Sedans & Sportbacks');
  const [modelSearchQuery, setModelSearchQuery] = useState('');

  const activeExample = AUDI_MSRP_EXAMPLES[selectedExampleIndex];
  const totalOptionsPrice = activeExample.options.reduce((sum, opt) => sum + opt.price, 0);
  const totalCalculatedMsrp = activeExample.baseMsrp + totalOptionsPrice + activeExample.destination + activeExample.gasGuzzler;

  const filteredModels = AUDI_MODELS_LIST[modelCategory].filter(m => 
    m.toLowerCase().includes(modelSearchQuery.toLowerCase())
  );

  return (
    <div className="bg-brand-white text-brand-black">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-grey-200 bg-grey-50/70 py-3 px-6">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs font-medium text-grey-500">
          <button 
            onClick={() => onNavigate?.('home')} 
            className="hover:text-brand-black transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-brand-black font-semibold">Audi MSRP by VIN</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-16 px-6 border-b border-grey-200 bg-gradient-to-b from-grey-50/50 to-brand-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-brand-black text-brand-white text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} className="text-brand-red" />
              <span>Official Factory Pricing Data</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-black leading-[1.12]">
              Audi MSRP by VIN: Check Complete Factory Pricing Breakdown
            </h1>
            
            <p className="text-base sm:text-lg text-grey-600 leading-relaxed">
              Run an authentic Audi MSRP by VIN lookup to view the original factory sticker price, itemized option packages, PR build codes, and exact equipment configuration tied to your specific chassis.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-brand-white border border-grey-200 rounded-xs shadow-xs">
                <div className="text-brand-red font-bold text-sm flex items-center gap-1.5">
                  <CheckCircle2 size={15} /> 100% OEM
                </div>
                <div className="text-xs text-grey-600 font-medium mt-0.5">Factory Build Sheet</div>
              </div>
              <div className="p-3 bg-brand-white border border-grey-200 rounded-xs shadow-xs">
                <div className="text-brand-black font-bold text-sm flex items-center gap-1.5">
                  <DollarSign size={15} className="text-emerald-600" /> Itemized
                </div>
                <div className="text-xs text-grey-600 font-medium mt-0.5">Options & Packages</div>
              </div>
              <div className="p-3 bg-brand-white border border-grey-200 rounded-xs shadow-xs">
                <div className="text-brand-black font-bold text-sm flex items-center gap-1.5">
                  <FileText size={15} className="text-blue-600" /> Monroney
                </div>
                <div className="text-xs text-grey-600 font-medium mt-0.5">Official PDF Format</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -top-3 -right-3 hidden sm:block bg-brand-red text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-xs tracking-wider z-20 shadow-md">
                Instant Online Lookup
              </div>
              <SearchWidget 
                onOpenVinModal={onOpenVinModal}
                onOpenSampleModal={onOpenSampleModal}
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What You Discover Section */}
      <section className="py-20 px-6 border-b border-grey-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-black mb-3">
              What You'll Discover with an Audi MSRP Lookup
            </h2>
            <p className="text-base text-grey-600 leading-relaxed">
              An Audi MSRP lookup by VIN reveals far more than just a single bottom-line figure. It provides a complete, forensic record of how your Audi was specified on the assembly line in Germany, itemizing every luxury package, technological enhancement, and performance option.
            </p>
          </div>

          {/* Interactive Pricing Anatomy Card */}
          <div className="bg-grey-50 border border-grey-200 rounded-sm p-6 lg:p-8 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-grey-200">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-grey-500 mb-1">Interactive Price Anatomy</div>
                <h3 className="text-xl font-bold text-brand-black">How Audi Calculates Total Vehicle MSRP</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-grey-500 font-medium mr-1">Preview Model:</span>
                {AUDI_MSRP_EXAMPLES.map((ex, idx) => (
                  <button
                    key={ex.model}
                    onClick={() => setSelectedExampleIndex(idx)}
                    className={`cursor-pointer px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors ${
                      selectedExampleIndex === idx
                        ? 'bg-brand-black text-brand-white'
                        : 'bg-brand-white border border-grey-300 text-grey-700 hover:bg-grey-100'
                    }`}
                  >
                    {ex.model.replace('2024 Audi ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Component Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {/* 1. Base MSRP */}
              <div className="bg-brand-white p-5 rounded-xs border border-grey-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-grey-500 font-semibold mb-2">
                    <span>STEP 1</span>
                    <Car size={16} className="text-grey-700" />
                  </div>
                  <div className="text-base font-bold text-brand-black">Base Model MSRP</div>
                  <p className="text-xs text-grey-600 mt-1 leading-normal">
                    The initial starting price for the base trim tier before any individual option packages.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-grey-100">
                  <div className="text-xs text-grey-500 font-medium">Starting Value</div>
                  <div className="text-lg font-black text-brand-black">
                    ${activeExample.baseMsrp.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* 2. Options & Packages */}
              <div className="bg-brand-white p-5 rounded-xs border border-grey-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-grey-500 font-semibold mb-2">
                    <span>STEP 2</span>
                    <Layers size={16} className="text-brand-red" />
                  </div>
                  <div className="text-base font-bold text-brand-black">Factory Packages</div>
                  <p className="text-xs text-grey-600 mt-1 leading-normal">
                    Prestige packages, Bang & Olufsen audio, Valcona leather, carbon optics, and wheel upgrades.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-grey-100">
                  <div className="text-xs text-grey-500 font-medium">Total Options Added</div>
                  <div className="text-lg font-black text-brand-red">
                    +${totalOptionsPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* 3. Destination & Taxes */}
              <div className="bg-brand-white p-5 rounded-xs border border-grey-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-grey-500 font-semibold mb-2">
                    <span>STEP 3</span>
                    <Receipt size={16} className="text-grey-700" />
                  </div>
                  <div className="text-base font-bold text-brand-black">Destination & Delivery</div>
                  <p className="text-xs text-grey-600 mt-1 leading-normal">
                    Mandatory port transport fees and gas guzzler tax (if applicable on high-output RS models).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-grey-100">
                  <div className="text-xs text-grey-500 font-medium">Port Logistics & Fees</div>
                  <div className="text-lg font-black text-grey-900">
                    +${(activeExample.destination + activeExample.gasGuzzler).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* 4. Total Window Sticker */}
              <div className="bg-brand-black text-brand-white p-5 rounded-xs border border-grey-900 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-grey-400 font-semibold mb-2">
                    <span className="text-brand-red font-bold">TOTAL</span>
                    <FileCheck size={16} className="text-brand-white" />
                  </div>
                  <div className="text-base font-bold text-brand-white">Official Total MSRP</div>
                  <p className="text-xs text-grey-400 mt-1 leading-normal">
                    The certified Monroney window sticker sum for this exact manufactured vehicle.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-grey-800">
                  <div className="text-xs text-grey-400 font-medium">Final Window Sticker</div>
                  <div className="text-xl font-black text-brand-white">
                    ${totalCalculatedMsrp.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Itemized Options Detail Drawer */}
            <div className="mt-6 bg-brand-white p-5 rounded-xs border border-grey-200">
              <div className="text-xs font-bold uppercase tracking-wider text-grey-600 mb-3 flex items-center justify-between">
                <span>Itemized Factory Options for {activeExample.model}</span>
                <span className="text-brand-red font-mono">{activeExample.options.length} Factory Upgrades</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {activeExample.options.map((opt, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-grey-50 rounded-xs text-xs font-medium border border-grey-100">
                    <span className="text-grey-800 truncate pr-2">{opt.name}</span>
                    <span className="font-bold text-brand-black shrink-0 font-mono">${opt.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 9 Intelligence Spec Cards Grid */}
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-1">OEM Monroney Specification Categories</div>
            <h3 className="text-2xl font-bold text-brand-black mb-6">Complete Factory Window Sticker Data Modules</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Car,
                title: "Vehicle Description & Build Details",
                desc: "Includes exact model year, trim tier, VIN, body style, and assembly facility records to ensure 100% authenticity against factory records."
              },
              {
                icon: Zap,
                title: "Engine, Transmission & quattro",
                desc: "Engine displacement, TFSI/TDI/e-tron horsepower, torque output, transmission type, and permanent all-wheel-drive configurations."
              },
              {
                icon: Sliders,
                title: "Mechanical & Dynamic Features",
                desc: "Adaptive sport suspension, dynamic all-wheel steering, sport differential, and carbon ceramic braking system specifications."
              },
              {
                icon: Sparkles,
                title: "Exterior Color & Interior Leather",
                desc: "Original factory paint code (e.g. Nardo Gray, Daytona Gray) and interior seating upholstery (Valcona leather, stitching accents)."
              },
              {
                icon: Layers,
                title: "Standard Premium Equipment",
                desc: "Every standard amenity included when built, such as Audi Virtual Cockpit Plus, MMI navigation, and panoramic glass sunroofs."
              },
              {
                icon: ShieldCheck,
                title: "Safety & Driver Assistance",
                desc: "Audi pre sense, adaptive cruise assist with lane guidance, night vision, top-view 360 cameras, and comprehensive airbag networks."
              },
              {
                icon: Fuel,
                title: "EPA Fuel Economy & Range",
                desc: "Official government EPA city/highway MPG, combined estimates, and battery range for e-tron electric and plug-in hybrid models."
              },
              {
                icon: Award,
                title: "NHTSA Safety Ratings",
                desc: "Government crash test scores, rollover protection metrics, and frontal/side impact ratings recorded during the vehicle model year."
              },
              {
                icon: FileCheck,
                title: "Original Warranty Coverage",
                desc: "Original 4-year/50,000-mile New Vehicle Limited Warranty, corrosion perforation, and 24-hour Audi Roadside Assistance terms."
              }
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="p-6 bg-brand-white border border-grey-200 rounded-sm hover:border-grey-400 transition-colors shadow-xs">
                  <div className="w-10 h-10 rounded-xs bg-grey-100 flex items-center justify-center mb-4 text-brand-black">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-base font-bold text-brand-black mb-2">{card.title}</h4>
                  <p className="text-xs text-grey-600 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button 
              onClick={() => onOpenSampleModal?.()}
              className="cursor-pointer px-6 py-3.5 bg-brand-black text-brand-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-grey-900 transition-colors flex items-center gap-2"
            >
              <FileText size={15} /> View Sample Monroney Sticker
            </button>
          </div>
        </div>
      </section>

      {/* Persona Value Proposition: Why MSRP Matters Today */}
      <section className="py-20 px-6 bg-grey-50 border-b border-grey-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">Practical Value For Drivers</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-black mb-4">
              Why Your Audi's Original MSRP Matters Today
            </h2>
            <p className="text-base text-grey-600">
              Knowing your Audi's original MSRP isn't just about curiosity—it provides verifiable financial leverage whether you are buying, selling, or filing an insurance claim.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Persona 1: Buyers */}
            <div className="bg-brand-white p-8 rounded-sm border border-grey-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xs bg-red-50 text-brand-red flex items-center justify-center font-bold">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-black">Used Car Buyers</h3>
                    <span className="text-xs text-grey-500 font-medium">Verify Real Equipment</span>
                  </div>
                </div>

                <ul className="space-y-4 text-xs text-grey-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-brand-red shrink-0 mt-0.5" />
                    <span><strong>Uncover Hidden Value:</strong> Discover whether a car has $15k in factory options that the seller failed to highlight.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-brand-red shrink-0 mt-0.5" />
                    <span><strong>Identify True Trim Packages:</strong> Avoid paying Premium Plus prices for base Premium models with cosmetic badges.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-brand-red shrink-0 mt-0.5" />
                    <span><strong>Accurate Depreciation:</strong> Benchmark current asking prices against real-world depreciation off original MSRP.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-grey-100 text-xs font-semibold text-grey-500">
                Guards against overpaying for stripped specs
              </div>
            </div>

            {/* Persona 2: Sellers */}
            <div className="bg-brand-white p-8 rounded-sm border border-grey-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xs bg-zinc-100 text-brand-black flex items-center justify-center font-bold">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-black">Vehicle Sellers</h3>
                    <span className="text-xs text-grey-500 font-medium">Command Premium Prices</span>
                  </div>
                </div>

                <ul className="space-y-4 text-xs text-grey-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-brand-black shrink-0 mt-0.5" />
                    <span><strong>Itemize High-Cost Options:</strong> Show buyers the exact $5k sound system and $4k sport packages built into your car.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-brand-black shrink-0 mt-0.5" />
                    <span><strong>Stand Out in Online Listings:</strong> Attach official Monroney sticker documentation to boost buyer confidence instantly.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-brand-black shrink-0 mt-0.5" />
                    <span><strong>Defend Your Asking Price:</strong> Provide undeniable proof when prospective buyers attempt lowball negotiations.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-grey-100 text-xs font-semibold text-grey-500">
                Increases resale value by $1,500 – $4,500
              </div>
            </div>

            {/* Persona 3: Current Owners */}
            <div className="bg-brand-white p-8 rounded-sm border border-grey-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xs bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-black">Current Owners</h3>
                    <span className="text-xs text-grey-500 font-medium">Protect Asset Value</span>
                  </div>
                </div>

                <ul className="space-y-4 text-xs text-grey-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Support Insurance Claims:</strong> Maximize total-loss settlements by proving every optional package factory installed.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Understand Factory Features:</strong> Know if your car has hidden hardware (e.g. heated steering, Bang & Olufsen, launch control).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Complete Vehicle History:</strong> Maintain a permanent OEM window sticker record for your vehicle provenance folder.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-grey-100 text-xs font-semibold text-grey-500">
                Essential for insurance appraisals & enthusiast provenance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study: Trade-In Negotiation */}
      <section className="py-20 px-6 border-b border-grey-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-brand-black text-brand-white rounded-sm p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red text-white text-[11px] font-black uppercase rounded-xs tracking-wider mb-4">
                Real-World Case Study
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                How James Unlocked $4,200 More on His Audi S5 Trade-In
              </h3>
              <p className="text-grey-300 text-sm sm:text-base leading-relaxed mb-8">
                James wanted to trade in his 2021 Audi S5 Sportback. The dealer initially made a blind trade-in offer of $38,000, categorizing the vehicle as a standard base trim. James ran an instant VIN lookup, pulled his factory Monroney window sticker, and proved $11,800 in optional packages.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-grey-900 border border-grey-800 rounded-xs">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle size={14} /> Initial Dealer Appraisal (No Sticker)
                  </div>
                  <div className="text-xl font-black text-brand-white mb-2">$38,000</div>
                  <p className="text-xs text-grey-400 leading-relaxed">
                    Dealer estimated base spec, ignored Prestige Package ($7,200), Dynamic Steering ($1,150), and Nappa Leather ($1,000).
                  </p>
                </div>

                <div className="p-5 bg-grey-900 border border-brand-red/40 rounded-xs">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Final Settlement with Window Sticker
                  </div>
                  <div className="text-xl font-black text-emerald-400 mb-2">$42,200 (+ $4,200)</div>
                  <p className="text-xs text-grey-300 leading-relaxed">
                    Dealer adjusted the trade-in allowance immediately after reviewing the verified itemized window sticker PDF on the spot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Visual Guide */}
      <section className="py-20 px-6 bg-grey-50 border-b border-grey-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">Simple 3-Step Process</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-black mb-3">
              How to Look Up Your Audi MSRP by VIN
            </h2>
            <p className="text-base text-grey-600">
              Generating your official Audi factory build sheet and MSRP breakdown takes under 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-white p-8 rounded-sm border border-grey-200 relative">
              <div className="w-10 h-10 rounded-xs bg-brand-black text-brand-white flex items-center justify-center font-bold text-sm mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-brand-black mb-2">Locate Your 17-Digit VIN</h3>
              <p className="text-xs text-grey-600 leading-relaxed">
                Find your vehicle identification number on your driver's side windshield dashboard, driver's door jamb B-pillar, or registration card.
              </p>
            </div>

            <div className="bg-brand-white p-8 rounded-sm border border-grey-200 relative">
              <div className="w-10 h-10 rounded-xs bg-brand-black text-brand-white flex items-center justify-center font-bold text-sm mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-brand-black mb-2">Enter VIN or License Plate</h3>
              <p className="text-xs text-grey-600 leading-relaxed">
                Input your 17-digit VIN code into our secure search tool above. You can also look up via US state license plate or Year/Model.
              </p>
            </div>

            <div className="bg-brand-white p-8 rounded-sm border border-grey-200 relative">
              <div className="w-10 h-10 rounded-xs bg-brand-red text-brand-white flex items-center justify-center font-bold text-sm mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-brand-black mb-2">Download Official Monroney</h3>
              <p className="text-xs text-grey-600 leading-relaxed">
                Receive your 100% authentic factory Monroney window sticker in high-resolution printable PDF format with full line-item MSRP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Find Your VIN (Visual Guide Cards - No ugly table) */}
      <section className="py-20 px-6 border-b border-grey-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-grey-500 mb-2">VIN Finder Guide</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-black mb-3">
              Where to Find Your Audi VIN
            </h2>
            <p className="text-base text-grey-600">
              Your 17-digit VIN is permanently stamped on multiple physical locations on the vehicle and in documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Driver's Side Dashboard",
                desc: "Look through the lower corner of the front windshield on the driver's side.",
                tag: "Most Common"
              },
              {
                title: "Driver's Door Jamb (B-Pillar)",
                desc: "Open the driver's front door and inspect the black certification safety label.",
                tag: "Easy Access"
              },
              {
                title: "Vehicle Title & Registration",
                desc: "Listed on your official DMV vehicle title, registration card, and tax certificates.",
                tag: "Paperwork"
              },
              {
                title: "Insurance Card / Policy",
                desc: "Printed directly on your active digital or physical auto insurance card.",
                tag: "Quick Reference"
              },
              {
                title: "Under the Hood / Firewall",
                desc: "Stamped on the metallic firewall or engine bay strut tower bracket.",
                tag: "Engine Bay"
              },
              {
                title: "Audi MMI Virtual Cockpit",
                desc: "Accessible under Vehicle Settings > Service & Checks > Vehicle Identification.",
                tag: "Digital Screen"
              }
            ].map((loc, i) => (
              <div key={i} className="p-6 bg-grey-50 border border-grey-200 rounded-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-brand-white border border-grey-200 text-grey-700 rounded-xs">
                    {loc.tag}
                  </span>
                  <Compass size={16} className="text-grey-400" />
                </div>
                <h4 className="text-base font-bold text-brand-black mb-1.5">{loc.title}</h4>
                <p className="text-xs text-grey-600 leading-relaxed">{loc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison: Authentic Monroney vs Generic Decoders (Clean Card Layout - NO Tables) */}
      <section className="py-20 px-6 bg-grey-50 border-b border-grey-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">Authenticity & Precision</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-black mb-3">
              Official Audi Monroney Sticker vs Generic Decoders
            </h2>
            <p className="text-base text-grey-600">
              Generic online VIN decoders only read basic standardized digits. Our system queries authentic manufacturer build manifests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Our Authentic Solution */}
            <div className="bg-brand-white p-8 rounded-sm border-2 border-brand-black shadow-lg relative">
              <div className="absolute -top-3.5 left-8 bg-brand-black text-brand-white text-[11px] font-black uppercase px-3 py-1 rounded-xs tracking-wider">
                Official Audi Window Sticker
              </div>

              <div className="text-xl font-bold text-brand-black mb-4 mt-2">
                100% Complete Factory Build Accuracy
              </div>

              <ul className="space-y-3.5 text-xs text-grey-800">
                {[
                  "Works with all Audi models, trims, and classic model years",
                  "Itemized Dollar-Value Pricing for every factory option & package",
                  "Certified Monroney 100% factory layout in printable PDF",
                  "Includes PR-codes, paint codes, interior trim, and wheel options",
                  "Official EPA Fuel Ratings and NHTSA safety metrics",
                  "Searchable via 17-digit VIN, US License Plate, or YMM",
                  "Instant delivery with lifetime access in your Member Garage"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Generic Decoders */}
            <div className="bg-brand-white/70 p-8 rounded-sm border border-grey-300 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-grey-500 mb-2">
                Generic Free VIN Decoders
              </div>
              <div className="text-xl font-bold text-grey-700 mb-4">
                Incomplete & Generalized Estimates
              </div>

              <ul className="space-y-3.5 text-xs text-grey-500">
                {[
                  "Limited coverage: only recognizes generic base model and year",
                  "Completely misses $10k+ in optional equipment and packages",
                  "No authentic Monroney window sticker formatting",
                  "No itemized dollar breakdown for individual upgrades",
                  "Often displays confusing or conflicting trim designations",
                  "Slow email delivery or aggressive marketing pop-ups"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Audi Models (Interactive Filter Pills - NO Tables!) */}
      <section className="py-20 px-6 border-b border-grey-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-grey-500 mb-2">Comprehensive Coverage</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-black mb-3">
              MSRP Lookup for All Audi Models
            </h2>
            <p className="text-base text-grey-600">
              From modern RS performance wagons and electric e-trons to classic sedans and SUVs.
            </p>
          </div>

          {/* Model Category Tabs & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(AUDI_MODELS_LIST) as Array<keyof typeof AUDI_MODELS_LIST>).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setModelCategory(cat)}
                  className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-xs transition-colors ${
                    modelCategory === cat
                      ? 'bg-brand-black text-brand-white'
                      : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400" />
              <input
                type="text"
                value={modelSearchQuery}
                onChange={(e) => setModelSearchQuery(e.target.value)}
                placeholder="Search model (e.g. RS6, Q8)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-grey-50 border border-grey-200 rounded-xs focus:bg-brand-white focus:border-brand-black outline-none font-medium"
              />
            </div>
          </div>

          {/* Model Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredModels.length > 0 ? (
              filteredModels.map((model, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 bg-grey-50 hover:bg-brand-black hover:text-brand-white border border-grey-200 rounded-xs text-xs font-bold text-grey-800 transition-colors flex items-center justify-between group cursor-default"
                >
                  <span>{model}</span>
                  <ArrowUpRight size={14} className="text-grey-400 group-hover:text-brand-red transition-colors" />
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-xs text-grey-500">
                No matching Audi models found. All production Audi models from 1980–2025 are supported.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 px-6 bg-grey-50 border-b border-grey-200" id="faq">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">Got Questions?</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-black mb-3">
              Frequently Asked Questions About Audi MSRP by VIN
            </h2>
            <p className="text-base text-grey-600">
              Clear answers to help you navigate vehicle valuation, Monroney labels, and option decoders.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div 
                key={index}
                className="bg-brand-white border border-grey-200 rounded-sm overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-brand-black hover:text-brand-red transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <span className="text-grey-400 shrink-0">
                    {openFaq === index ? <ChevronDown size={18} className="rotate-180 transition-transform" /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-grey-600 leading-relaxed border-t border-grey-100">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-6 bg-brand-black text-brand-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red text-white text-[11px] font-black uppercase rounded-xs tracking-wider">
              Instant VIN Lookup
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to Check Your Audi's Original MSRP?
            </h2>
            <p className="text-grey-300 text-sm sm:text-base leading-relaxed">
              Stop guessing your Audi's value. Get the exact MSRP, factory features, and original window sticker details in seconds.
            </p>
            <div className="flex items-center gap-6 text-xs text-grey-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileCheck size={16} className="text-brand-red" />
                <span>OEM Verified Records</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <SearchWidget 
              onOpenVinModal={onOpenVinModal}
              onOpenSampleModal={onOpenSampleModal}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
