export default function DarkSection() {
  return (
    <section className="bg-brand-black text-brand-white relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red"></div>
      <div className="max-w-[1440px] mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Know exactly what you're buying. <span className="text-grey-500 block sm:inline">Or selling.</span></h2>
        <p className="text-lg text-grey-400 max-w-2xl mx-auto mb-10">
          Whether you are a buyer verifying standard equipment, a seller justifying a premium price, or an enthusiast tracking classic specifications—factory data removes all doubt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-brand-white text-brand-black font-semibold px-8 py-4 rounded-sm hover:bg-grey-200 transition-colors">
            Lookup a VIN Now
          </button>
        </div>
      </div>
    </section>
  );
}
