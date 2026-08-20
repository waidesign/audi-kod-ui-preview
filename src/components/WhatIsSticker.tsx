export default function WhatIsSticker() {
  return (
    <section className="py-24 px-6 bg-brand-white border-t border-grey-100">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        
        <div className="md:w-5/12 shrink-0">
          <div className="w-12 h-1 bg-brand-red mb-6"></div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-black leading-tight">
            What is an Audi Window Sticker?
          </h2>
        </div>
        
        <div className="md:w-7/12 max-w-3xl">
          <p className="text-lg text-grey-700 leading-relaxed mb-8">
            An <strong className="font-semibold text-brand-black">Audi window sticker</strong> (often called the Monroney label) is the factory-issued sheet on a new or used Audi showing MSRP, destination, standard and optional equipment, and key ratings for efficiency and safety. It ties all details to the Audi VIN, whether it's an A4, Q5, e-tron GT, or other Audi models, so you see the exact build, including packages, wheels, driver-assist tech, and more.
          </p>
          <p className="text-lg text-grey-700 leading-relaxed">
            It also includes EPA fuel-economy and emissions info and may display NHTSA safety ratings, making side-by-side comparisons simple. It's the official snapshot of how an Audi left the factory, helping buyers verify specs and value, and owners document options and pricing.
          </p>
        </div>

      </div>
    </section>
  );
}
