import { Search } from 'lucide-react';

interface HowToGetProps {
  onOpenVinModal?: () => void;
}

export default function HowToGet({ onOpenVinModal }: HowToGetProps) {
  const steps = [
    {
      num: 1,
      title: "Enter the VIN",
      desc: (
        <>
          Type in the 17-character VIN.{' '}
          <button 
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              if (onOpenVinModal) onOpenVinModal();
            }} 
            className="text-brand-red font-semibold hover:underline cursor-pointer"
          >
            Where to find the VIN?
          </button>
          <br className="mb-2" />
          No VIN handy? You can also search by license plate or even the Audi's year, make, and model.
        </>
      )
    },
    {
      num: 2,
      title: "Click \"Get Window Sticker\"",
      desc: "Hit the button to start the search. Instantly view the year, make, model, trim, transmission, engine, and more — for free."
    },
    {
      num: 3,
      title: "Access Window Sticker",
      desc: "Pay the small fee to view and download your Audi window sticker as a printable PDF."
    }
  ];

  return (
    <section className="py-24 px-6 bg-brand-white">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start mb-16">
          <div className="md:w-5/12 shrink-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-black leading-tight">
              How to Get the Audi Window Sticker by VIN?
            </h2>
          </div>
          <div className="md:w-7/12 max-w-3xl">
            <p className="text-lg text-grey-700 leading-relaxed mb-6">
              With the VIN, you can retrieve any Audi window sticker showing MSRP, packages, paint/interior, and standard features.
            </p>
            <p className="text-lg font-medium text-brand-black">
              Get your Audi's factory sticker by following these simple steps:
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 border-y border-grey-200 divide-y lg:divide-y-0 lg:divide-x divide-grey-200">
          {steps.map((step, i) => (
            <div key={i} className="p-8 lg:p-12 xl:p-16 group hover:bg-grey-50 transition-colors cursor-default relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              <div className="text-7xl font-black text-grey-100 group-hover:text-brand-red transition-colors mb-8 font-mono leading-none tracking-tighter">
                0{step.num}
              </div>
              
              <h3 className="text-xl font-bold text-brand-black mb-4">{step.title}</h3>
              <p className="text-grey-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-brand-black text-brand-white font-semibold px-8 py-4 rounded-sm hover:bg-grey-900 transition-colors flex items-center justify-center gap-2">
            <Search size={18} />
            Get Window Sticker
          </button>
        </div>

      </div>
    </section>
  );
}
