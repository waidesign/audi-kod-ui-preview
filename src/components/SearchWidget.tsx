import React, { useState } from 'react';
import { Search, Info, HelpCircle, ChevronDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface SearchWidgetProps {
  onOpenVinModal?: () => void;
  onOpenSampleModal?: () => void;
  className?: string;
}

export default function SearchWidget({ onOpenVinModal, onOpenSampleModal, className = '' }: SearchWidgetProps) {
  const [tab, setTab] = useState<'vin' | 'plate' | 'ymm'>('vin');
  const [vin, setVin] = useState('');
  const [plate, setPlate] = useState('');
  const [state, setState] = useState('');
  const [year, setYear] = useState('');
  const [model, setModel] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchSuccess, setSearchSuccess] = useState<string | null>(null);

  const scrollToFaq = () => {
    const faqEl = document.getElementById('faq');
    if (faqEl) {
      faqEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight * 0.7, behavior: 'smooth' });
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSearchSuccess(null);

    if (tab === 'vin') {
      if (!vin || vin.trim().length < 11) {
        setError('Please enter a valid 17-character VIN (e.g. WUA14BF29RN902418).');
        return;
      }
    } else if (tab === 'plate') {
      if (!plate.trim() || !state) {
        setError('Please enter your license plate and select a state.');
        return;
      }
    } else if (tab === 'ymm') {
      if (!year || !model) {
        setError('Please select both Year and Model to look up specifications.');
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onOpenSampleModal) {
        onOpenSampleModal();
      } else {
        setSearchSuccess('Factory window sticker records located for this vehicle.');
      }
    }, 850);
  };

  return (
    <div className={`w-full bg-brand-white border border-grey-200 rounded-sm p-1 shadow-2xl shadow-grey-200/50 relative z-10 ${className}`}>
      {/* Tabs */}
      <div className="flex border-b border-grey-200">
        {[
          { id: 'vin', label: 'VIN' },
          { id: 'plate', label: 'US License Plate' },
          { id: 'ymm', label: 'Year / Make / Model' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id as any);
              setError(null);
              setSearchSuccess(null);
            }}
            className={`cursor-pointer flex-1 py-4 text-sm font-medium text-center transition-colors border-b-2 -mb-[1px] ${
              tab === t.id
                ? 'border-brand-red text-brand-black font-bold'
                : 'border-transparent text-grey-600 hover:text-brand-black'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-brand-red text-xs text-red-800 flex items-start gap-2 rounded-xs">
            <AlertCircle size={15} className="text-brand-red shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {searchSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-xs text-emerald-800 flex items-start gap-2 rounded-xs">
            <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>{searchSuccess}</span>
          </div>
        )}

        {tab === 'vin' && (
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <label htmlFor="vin" className="sr-only">Enter 17-character VIN</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-grey-400" />
              </div>
              <input
                type="text"
                id="vin"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase().slice(0, 17))}
                className="block w-full pl-12 pr-16 py-4 bg-grey-50 border border-grey-200 rounded-sm text-base font-medium text-brand-black focus:ring-0 focus:border-brand-red focus:bg-brand-white transition-colors outline-none uppercase placeholder-grey-400 font-mono"
                placeholder="ENTER 17-CHARACTER VIN"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className={`text-sm font-medium ${vin.length === 17 ? 'text-emerald-600 font-bold' : 'text-grey-400'}`}>
                  {vin.length}/17
                </span>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full bg-brand-black text-brand-white font-semibold py-4 rounded-sm hover:bg-grey-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                'Get Window Sticker'
              )}
            </button>
            
            <div className="flex items-center justify-between pt-2">
              <button 
                type="button"
                onClick={onOpenVinModal}
                className="cursor-pointer text-xs text-grey-600 hover:text-brand-black flex items-center gap-1 transition-colors"
              >
                <HelpCircle size={14} /> How to find your VIN?
              </button>
              <button 
                type="button"
                onClick={onOpenSampleModal}
                className="cursor-pointer text-xs text-grey-600 hover:text-brand-black flex items-center gap-1 transition-colors"
              >
                <Info size={14} /> View Sample Sticker
              </button>
            </div>
          </form>
        )}

        {tab === 'plate' && (
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <label htmlFor="plate" className="sr-only">Enter License Plate</label>
                <input
                  type="text"
                  id="plate"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase())}
                  className="block w-full px-4 py-4 bg-grey-50 border border-grey-200 rounded-sm text-base font-medium text-brand-black focus:ring-0 focus:border-brand-red focus:bg-brand-white transition-colors outline-none uppercase placeholder-grey-400"
                  placeholder="LICENSE PLATE"
                />
              </div>
              <div className="relative w-1/3">
                <label htmlFor="state" className="sr-only">State</label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="block w-full px-4 py-4 bg-grey-50 border border-grey-200 rounded-sm text-base font-medium text-brand-black focus:ring-0 focus:border-brand-red focus:bg-brand-white transition-colors outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>STATE</option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AZ">AZ</option>
                  <option value="AR">AR</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DE">DE</option>
                  <option value="DC">DC</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="IA">IA</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="ME">ME</option>
                  <option value="MD">MD</option>
                  <option value="MA">MA</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MS">MS</option>
                  <option value="MO">MO</option>
                  <option value="MT">MT</option>
                  <option value="NE">NE</option>
                  <option value="NV">NV</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NY">NY</option>
                  <option value="NC">NC</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WV">WV</option>
                  <option value="WI">WI</option>
                  <option value="WY">WY</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-grey-400" />
                </div>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full bg-brand-black text-brand-white font-semibold py-4 rounded-sm hover:bg-grey-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                'Get Window Sticker'
              )}
            </button>
            
            <div className="flex items-center justify-between pt-2">
              <button 
                type="button"
                onClick={scrollToFaq}
                className="cursor-pointer text-xs text-grey-600 hover:text-brand-black flex items-center gap-1 transition-colors"
              >
                <HelpCircle size={14} /> License plate search FAQ
              </button>
              <button 
                type="button"
                onClick={onOpenSampleModal}
                className="cursor-pointer text-xs text-grey-600 hover:text-brand-black flex items-center gap-1 transition-colors"
              >
                <Info size={14} /> View Sample Sticker
              </button>
            </div>
          </form>
        )}

        {tab === 'ymm' && (
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <label htmlFor="year" className="sr-only">Year</label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="block w-full px-4 py-4 bg-grey-50 border border-grey-200 rounded-sm text-base font-medium text-brand-black focus:ring-0 focus:border-brand-red focus:bg-brand-white transition-colors outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>YEAR</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-grey-400" />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="make" className="sr-only">Make</label>
                <select
                  id="make"
                  className="block w-full px-4 py-4 bg-grey-50 border border-grey-200 rounded-sm text-base font-medium text-brand-black focus:ring-0 focus:border-brand-red focus:bg-brand-white transition-colors outline-none appearance-none cursor-not-allowed"
                  defaultValue="Audi"
                  disabled
                >
                  <option value="Audi">AUDI</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-grey-400" />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="model" className="sr-only">Model</label>
                <select
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="block w-full px-4 py-4 bg-grey-50 border border-grey-200 rounded-sm text-base font-medium text-brand-black focus:ring-0 focus:border-brand-red focus:bg-brand-white transition-colors outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>MODEL</option>
                  <option value="A3">A3</option>
                  <option value="A4">A4</option>
                  <option value="A5">A5</option>
                  <option value="A6">A6</option>
                  <option value="A7">A7</option>
                  <option value="A8">A8</option>
                  <option value="Q3">Q3</option>
                  <option value="Q5">Q5</option>
                  <option value="Q7">Q7</option>
                  <option value="Q8">Q8</option>
                  <option value="e-tron">e-tron</option>
                  <option value="TT">TT</option>
                  <option value="R8">R8</option>
                  <option value="RS6">RS6 Avant</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-grey-400" />
                </div>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full bg-brand-black text-brand-white font-semibold py-4 rounded-sm hover:bg-grey-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                'Get Window Sticker'
              )}
            </button>
            
            <div className="flex items-center justify-between pt-2">
              <button 
                type="button"
                onClick={scrollToFaq}
                className="cursor-pointer text-xs text-grey-600 hover:text-brand-black flex items-center gap-1 transition-colors"
              >
                <HelpCircle size={14} /> Year/Make/Model FAQ
              </button>
              <button 
                type="button"
                onClick={onOpenSampleModal}
                className="cursor-pointer text-xs text-grey-600 hover:text-brand-black flex items-center gap-1 transition-colors"
              >
                <Info size={14} /> View Sample Sticker
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
