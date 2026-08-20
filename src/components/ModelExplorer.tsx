const categories = [
  {
    name: 'Sedans & Sportbacks',
    models: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'S4', 'S5', 'RS5', 'RS7']
  },
  {
    name: 'SUVs & Crossovers',
    models: ['Q3', 'Q5', 'Q7', 'Q8', 'SQ5', 'RS Q8']
  },
  {
    name: 'Electric',
    models: ['e-tron', 'Q4 e-tron', 'e-tron GT', 'RS e-tron GT']
  },
  {
    name: 'Performance & Coupes',
    models: ['TT', 'TTS', 'TT RS', 'R8']
  }
];

export default function ModelExplorer() {
  return (
    <section className="py-20 px-6 bg-brand-white border-t border-grey-100">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-brand-black mb-3">Supported Models</h2>
          <p className="text-grey-700">Instant access to stickers for modern and classic ranges.</p>
        </div>

        <div className="space-y-8">
          {categories.map((cat, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="md:w-48 shrink-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-grey-500 pt-2">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.models.map((model, j) => (
                  <a
                    key={j}
                    href={`/models/${model.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center px-4 py-2 border border-grey-200 bg-brand-white text-sm font-medium text-brand-black rounded-sm hover:border-brand-black hover:shadow-[inset_2px_0_0_0_#F50537] transition-all"
                  >
                    {model}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
