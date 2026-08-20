import React from 'react';

const breakdownData = [
  {
    group: "WMI (World Manufacturer Identifier)",
    items: [
      {
        pos: "1st",
        title: "Country of Origin",
        desc: "This character denotes the country of origin. For an Audi, the first character is usually a \"W,\" indicating that the vehicle was manufactured in Germany. Below are other possible characters:",
        table: {
          headers: ["1, 4, or 5", "2", "3", "J", "K", "S", "W", "Z"],
          rows: [["USA", "Canada", "Mexico", "Japan", "Korea", "England", "Germany", "Italy"]]
        }
      },
      {
        pos: "2nd",
        title: "Manufacturer",
        desc: "This character indicates the specific manufacturer. The second character for Audi is \"A\"; besides Audi, no other German manufacturer uses \"WA\" as the beginning of their World Manufacturer Identifier (WMI).",
      },
      {
        pos: "3rd",
        title: "Vehicle Type / Division",
        desc: "The third character shows the vehicle type or the division. In the case of an Audi with a WAU WMI code, the \"U\" indicates that the vehicle is an SUV. This is distinct from other codes, such as \"A,\" which represents passenger cars.",
        pills: [
          "WAU (Audi AG passenger cars)",
          "WA1 (Audi AG MPVs/SUVs)",
          "WUA (Audi Sport GmbH - R8/RS)",
          "TRU (Audi Hungaria - TT)"
        ]
      }
    ]
  },
  {
    group: "VDS (Vehicle Descriptor Section) & Check Digit",
    items: [
      {
        pos: "4th",
        title: "Series",
        desc: "This digit ties the Audi to a series bucket (coupe, sedan, etc.). Audi's VIN breakdown charts map this position to lineups like A3, A6, TT, and even R8. Think of it as the \"which family\" flag."
      },
      {
        pos: "5th",
        title: "Engine Information",
        desc: "Audi uses position 5 to encode the engine (fuel, displacement, cylinder count). For example, 2.0L TFSI for A3/A6, and 5.2L V10 for R8 in 2020."
      },
      {
        pos: "6th",
        title: "Restraint System",
        desc: "This spot provides information about the restraint system, like airbags and seatbelt types, helping with insight into its safety on the road or during a crash."
      },
      {
        pos: "7th-8th",
        title: "Specific Model or Platform Code",
        desc: "These two characters nail the model. Examples from Audi's charts: FY = Q5/SQ5, F7 = Q7, F1 = Q8, GE = e-tron SUV, F4 = A4 allroad."
      },
      {
        pos: "9th",
        title: "Check Digit",
        desc: "This is the check digit, and it's used to validate the full VIN number. If it doesn't \"math out,\" something's off, such as a typo or tampering."
      }
    ]
  },
  {
    group: "VIS (Vehicle Identifier Section)",
    items: [
      {
        pos: "10th",
        title: "Model Year",
        desc: "This character shows the Audi's model year. Each letter or number stands for a different year. For example, \"A\" might mean 2010. You can match it using the VIN-Year table:",
        yearGrid: [
          "A=2010", "B=2011", "C=2012", "D=2013", "E=2014",
          "F=2015", "G=2016", "H=2017", "J=2018", "K=2019",
          "L=2020", "M=2021", "N=2022", "P=2023", "R=2024",
          "S=2025", "T=2026", "V=2027", "W=2028", "X=2029"
        ]
      },
      {
        pos: "11th",
        title: "Assembly Plant",
        desc: "The 11th character indicates the specific plant where the Audi was manufactured. Common Audi plant codes include:",
        pills: [
          "A = Ingolstadt (Germany)",
          "N = Neckarsulm (Germany)",
          "1 = Győr (Hungary)",
          "B = Brussels (Belgium)",
          "D = Bratislava (Slovakia)",
          "2 = San José Chiapa (Mexico)"
        ]
      },
      {
        pos: "12th-17th",
        title: "Unique Serial Number",
        desc: "The last six characters are the production sequence. They don't carry specs, but they uniquely identify an Audi car among thousands of similar cars built that year."
      }
    ]
  }
];

export default function VinCharacterBreakdown() {
  return (
    <section className="py-24 px-6 bg-brand-white">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-6">
            Comprehensive Audi VIN Decoder Chart
          </h2>
          <p className="text-lg text-grey-700 leading-relaxed max-w-3xl">
            Want to know exactly what every single letter and number means? Here is the complete position-by-position breakdown of an Audi Vehicle Identification Number.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {breakdownData.map((section, sIdx) => (
            <div key={sIdx} className="relative">
              {/* Sticky Section Header */}
              <div className="sticky top-0 z-10 bg-brand-white/95 backdrop-blur-sm py-4 border-b-2 border-brand-black mb-8 flex items-center gap-4">
                <div className="w-3 h-3 bg-brand-red rounded-sm hidden sm:block"></div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-black">
                  {section.group}
                </h3>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-10">
                {section.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                    {/* Position Indicator */}
                    <div className="md:w-32 shrink-0">
                      <div className="text-sm font-bold text-brand-red uppercase tracking-widest mb-1">
                        Character
                      </div>
                      <div className="text-3xl md:text-4xl font-black font-mono text-grey-300 group-hover:text-brand-black transition-colors">
                        {item.pos}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h4 className="text-xl font-bold text-brand-black mb-3">
                        {item.title}
                      </h4>
                      <p className="text-base text-grey-700 leading-relaxed mb-6">
                        {item.desc}
                      </p>

                      {/* Optional Data Tables */}
                      {item.table && (
                        <div className="w-full overflow-x-auto rounded-sm border border-grey-200">
                          <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-brand-black text-brand-white">
                              <tr>
                                {item.table.headers.map((h, i) => (
                                  <th key={i} className="px-4 py-3 font-semibold border-r border-grey-800 last:border-0">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {item.table.rows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="px-4 py-3 border-r border-grey-200 last:border-0">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Optional Year Grid */}
                      {item.yearGrid && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 border-t border-l border-grey-200 rounded-sm overflow-hidden">
                          {item.yearGrid.map((year, yIdx) => {
                            const [code, val] = year.split('=');
                            return (
                              <div key={yIdx} className="flex items-center justify-between px-3 py-2 border-b border-r border-grey-200 bg-grey-50 hover:bg-white transition-colors">
                                <span className="font-mono font-bold text-brand-black">{code}</span>
                                <span className="text-grey-600 text-sm">{val}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Optional Pills */}
                      {item.pills && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {item.pills.map((pill, pIdx) => (
                            <div key={pIdx} className="bg-grey-50 border border-grey-200 text-brand-black text-sm px-4 py-2 rounded-sm font-medium">
                              {pill}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
