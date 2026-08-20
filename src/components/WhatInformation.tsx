import { FileText, Search } from 'lucide-react';

const details = [
  {
    title: "Vehicle Identification",
    desc: "Shows the VIN, model (A4, Q5, etc.), model year, trim (Premium, Premium Plus, Prestige, S/RS), engine designation (e.g., 45 TFSI), transmission (S tronic or tiptronic), drivetrain (quattro), and the final assembly location (for example, Ingolstadt or Neckarsulm)."
  },
  {
    title: "Base MSRP",
    desc: "Lists the base price, each factory package or option with its price, e.g., S line, Black optic, Driver Assistance, and B&O®, the destination charge, and the total MSRP. This is your starting point when comparing two similar Audis."
  },
  {
    title: "Mechanical Features",
    desc: "Lists key mechanical details such as the engine type, transmission, drivetrain (e.g., TFSI® turbo, TDI® diesel on older models, e-tron EV, S tronic® dual-clutch, tiptronic® automatic, quattro®), sometimes with axle ratio or suspension notes."
  },
  {
    title: "Interior Features",
    desc: "Highlights cabin tech and comfort fitted by trim or option: seat materials and adjustments, heated/ventilated seats, panoramic sunroof, B&O® sound, wireless Apple CarPlay/Android Auto, ambient lighting, and advanced MMI features."
  },
  {
    title: "Exterior Details & Colors",
    desc: "Lists the original paint and interior colors, plus exterior features that affect value and looks. For example, wheel size and design, black optics, roof rails, and lighting signatures. Handy for authenticity checks."
  },
  {
    title: "Fuel Economy & Environment",
    desc: "Shows city/highway/combined MPG (or MPGe for EVs), kWh/100 mi, five-year fuel-cost estimate vs. average, smog and greenhouse-gas ratings, and a QR code linking to fueleconomy.gov."
  },
  {
    title: "Greenhouse Gas & Smog Ratings",
    desc: "Displays 1-10 scores for emissions and fuel efficiency. A higher value means cleaner. Good for buyers who care about environmental impact."
  },
  {
    title: "Options and Packages",
    desc: "Lists optional upgrades and factory packages that enhance performance, comfort, or technology, such as advanced driver-assist systems, sport appearance packages, or adaptive suspension."
  },
  {
    title: "Manufacturer Warranty",
    desc: "Shows basic factory coverage including the new-vehicle limited warranty, powertrain coverage, and corrosion protection. Helps judge remaining coverage on a used Audi."
  },
  {
    title: "NHTSA Safety Rating",
    desc: "If tested, shows Government 5-Star Safety Ratings for overall, frontal, side, and rollover performance. Follows special 'not rated' rules if untested."
  }
];

export default function WhatInformation() {
  return (
    <section className="py-24 px-6 bg-grey-50 border-t border-grey-100">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* Sticky Left Column */}
        <div className="lg:w-5/12 lg:sticky lg:top-32">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-black mb-6 leading-tight">
            What Information Does an Audi Window Sticker Lookup Provide?
          </h2>
          <p className="text-lg text-grey-700 leading-relaxed mb-10 max-w-lg">
            The Audi window sticker details the vehicle's features and specifications with Audi precision. Here's what to expect from the sheet:
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-brand-black text-brand-white font-semibold px-6 py-4 rounded-sm hover:bg-grey-900 transition-colors flex items-center justify-center gap-2">
              <Search size={18} />
              Get Window Sticker
            </button>
            <button className="bg-brand-white border border-brand-black text-brand-black font-semibold px-6 py-4 rounded-sm hover:bg-grey-100 transition-colors flex items-center justify-center gap-2">
              <FileText size={18} />
              View Sample
            </button>
          </div>
        </div>
        
        {/* Right Column - Data Grid */}
        <div className="lg:w-7/12 w-full">
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {details.map((item, i) => (
              <div key={i} className="group relative border-t border-grey-200 pt-5 cursor-default">
                <div className="absolute left-0 top-[-1px] w-0 h-[2px] bg-brand-red transition-all duration-500 group-hover:w-full"></div>
                <h3 className="text-lg font-bold text-brand-black mb-2">{item.title}</h3>
                <p className="text-sm text-grey-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
