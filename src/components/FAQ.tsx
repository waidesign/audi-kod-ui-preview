import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  { q: 'Is the sticker available for all years?', a: 'We support modern and classic models. However, availability for vehicles older than 20 years may vary depending on factory archives.' },
  { q: 'How do I get the sticker using my VIN?', a: 'Simply enter your 17-character VIN in the search box at the top of the page. We will instantly verify the vehicle and retrieve the document.' },
  { q: 'What is the difference between MSRP and the sticker price?', a: 'The sticker price (Total MSRP) includes the base MSRP plus all factory-installed options and the destination charge. Dealer markups or local add-ons are not reflected on the factory sticker.' },
  { q: 'Where is the VIN located on my car?', a: 'The VIN is most easily found on the driver side dashboard (visible through the windshield) or on the sticker inside the driver\'s side door jamb.' },
  { q: 'Why is it called a Monroney label?', a: 'It is named after Senator Almer Stillwell "Mike" Monroney, who sponsored the Automobile Information Disclosure Act of 1958 requiring pricing disclosures.' },
  { q: 'Is this the same as a build sheet?', a: 'A window sticker includes pricing, EPA ratings, and safety scores. A build sheet is a more technical internal document detailing every single factory PR-code and manufacturing component without pricing.' },
  { q: 'How long does the digital sticker last?', a: 'Once purchased, you can download the PDF and keep it forever. We also host a live link for a generous period for easy sharing.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-grey-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-brand-black mb-3">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-brand-white border border-grey-200 rounded-sm"
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-grey-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-brand-black pr-8" itemProp="name">{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-grey-500 shrink-0 mt-0.5" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-grey-500 shrink-0 mt-0.5" />
                )}
              </button>
              {openIndex === i && (
                <div 
                  className="px-6 pb-5 pt-1 text-sm text-grey-600 leading-relaxed"
                  itemScope 
                  itemProp="acceptedAnswer" 
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">{faq.a}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
