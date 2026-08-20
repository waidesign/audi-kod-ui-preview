import React from 'react';

const buyers = [
  { title: "Verify the Car You’re Paying For.", desc: "Confirms VIN, trim, drivetrain (e.g., quattro), exterior/interior, and factory options/packages. So you know it’s the exact build advertised (no “missing” Bang & Olufsen, S line, Driver Assistance, etc.)." },
  { title: "See Original MSRP & Option Pricing.", desc: "Shows base price, each option’s price, destination charge, and total MSRP, great for judging discounts and value versus other listings." },
  { title: "Spot Factory Options vs. Dealer Add-Ons.", desc: "The sticker lists only factory-installed equipment; anything else (tint, nitrogen, paint sealant) is a dealer add and negotiable." },
  { title: "Evaluate Efficiency & Running Costs.", desc: "EPA MPG/MPGe, kWh/100 mi (for EVs), estimated annual fuel/energy cost. This helps compare an Audi, whether it is a Q5 45 vs. SQ5, or e-tron vs. Q8." },
  { title: "Check Safety Ratings.", desc: "Government 5-Star Safety Ratings (if tested) appear on the sticker. Useful for family buyers who prioritize safety." }
];

const sellers = [
  { title: "Justify Your Asking Price.", desc: "Itemized options (e.g., Prestige pkg, Sport diff, Matrix LED, Adaptive Air Suspension) and original MSRP make your price story credible." },
  { title: "Create a Clean, Accurate Listing.", desc: "Copy specs straight from the sticker to avoid mislabeling the car (trim, packages, driver-assist features)." },
  { title: "Differentiate Similar Vehicles.", desc: "Two black Q7s can look identical; your sticker proves which one is worth more (e.g., Towing pkg, Night Vision, B&O 3D Advanced)." },
  { title: "Build buyer trust.", desc: "Sharing the sticker signals transparency and reduces “what’s actually on it?” back-and-forth." },
  { title: "Speed up appraisal & financing.", desc: "Dealers and lenders recognize the Audi Monroney sticker details, streamlining trade-in quotes and loan approvals." }
];

export default function Benefits() {
  return (
    <section className="py-24 px-6 bg-brand-white border-t border-grey-100">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-4xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-5">
            Benefits of Looking up an Audi Window Sticker for Buyers & Sellers
          </h2>
          <p className="text-lg text-grey-700 leading-relaxed">
            Getting the <strong className="font-semibold text-brand-black">original window sticker for an Audi</strong> matters for both sellers and buyers. Here are some of the benefits:
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-16">
          {/* Buyers Column */}
          <div>
            <div className="flex items-center gap-4 mb-10 pb-4 border-b-2 border-grey-200">
              <div className="w-2.5 h-2.5 bg-brand-red"></div>
              <h3 className="text-2xl font-bold text-brand-black tracking-tight">Buyers</h3>
            </div>
            <div className="space-y-10">
              {buyers.map((item, i) => (
                <div key={i} className="flex gap-5 group cursor-default">
                  <div className="font-mono text-sm font-bold text-grey-400 group-hover:text-brand-red transition-colors pt-1 shrink-0">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-black mb-2 leading-snug">{item.title}</h4>
                    <p className="text-grey-600 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sellers Column */}
          <div>
            <div className="flex items-center gap-4 mb-10 pb-4 border-b-2 border-grey-200">
              <div className="w-2.5 h-2.5 bg-brand-black"></div>
              <h3 className="text-2xl font-bold text-brand-black tracking-tight">Sellers</h3>
            </div>
            <div className="space-y-10">
              {sellers.map((item, i) => (
                <div key={i} className="flex gap-5 group cursor-default">
                  <div className="font-mono text-sm font-bold text-grey-400 group-hover:text-brand-black transition-colors pt-1 shrink-0">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-black mb-2 leading-snug">{item.title}</h4>
                    <p className="text-grey-600 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
