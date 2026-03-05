import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, FileText, Fingerprint, ArrowRight, ArrowLeft, Lock, Unlock } from 'lucide-react';

// --- Types ---
type Page = 'landing' | 'characters' | 'story';

// --- Components ---

// 1. Landing Page
const LandingPage = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-red-600 font-sans flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      <div className="scanlines" />
      <div className="scanner-bar" />
      <div className="noise-overlay" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900 via-black to-black" />
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600/30 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600/30 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="border border-red-800/50 p-12 max-w-3xl w-full relative bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(220,38,38,0.1)]"
      >
        {/* Corner Markers */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600" />

        <div className="text-center space-y-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center mb-8"
          >
            <ShieldAlert size={80} strokeWidth={1} className="glitch-hover text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
          </motion.div>
          
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight uppercase mb-2 glitch-hover cursor-default text-white">
              Top Secret
            </h1>
            <h2 className="text-2xl font-sans tracking-[0.6em] text-red-500 uppercase border-y border-red-900/50 py-3 font-semibold">
              Classified Level 5
            </h2>
          </div>
          
          <p className="text-red-400/70 text-sm md:text-base max-w-lg mx-auto mt-8 font-mono leading-relaxed">
            WARNING: UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED. THE FOLLOWING DOCUMENTS CONTAIN SENSITIVE INFORMATION REGARDING SUBJECTS #892 AND #893.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(220, 38, 38, 0.15)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="mt-12 px-10 py-4 border border-red-600/80 text-red-500 font-display text-xl uppercase tracking-widest hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all group flex items-center gap-3 mx-auto bg-black/50"
          >
            <Unlock size={20} />
            <span>Access Files</span>
          </motion.button>
        </div>
      </motion.div>
      
      <div className="absolute bottom-8 text-xs text-red-800/60 font-mono tracking-widest">
        SYSTEM_ID: 4492-X // ENCRYPTED CONNECTION // V.2.0.4
      </div>
    </motion.div>
  );
};

// 2. Character Page
const CharacterPage = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const characters = [
    {
      id: "husband",
      name: "John Doe",
      role: "Farmer / Local Handyman",
      trueName: "Agent 'Viper'",
      trueRole: "Ex-Black Ops Assassin",
      desc: "A quiet man who enjoys tending to his cornfields and fixing tractors for the neighbors. Known for his apple pie recipe.",
      trueDesc: "Wanted in 14 countries for high-profile eliminations. Expert in ballistics and improvised explosives. The 'cornfield' is a cover for a subterranean armory.",
      imgNormal: "https://picsum.photos/seed/farmer1/400/400",
      imgScary: "https://picsum.photos/seed/assassin1/400/400?grayscale" 
    },
    {
      id: "wife",
      name: "Jane Doe",
      role: "Elementary School Teacher",
      trueName: "Dr. 'Hemlock'",
      trueRole: "Rogue Neurochemist",
      desc: "Beloved by her 3rd-grade students. Organizes the annual charity bake sale and knits sweaters for the homeless.",
      trueDesc: "Architect of the 'Project Somnus' nerve agent. Can synthesize lethal toxins from common household cleaning supplies. Her knitting needles are made of hardened titanium.",
      imgNormal: "https://picsum.photos/seed/teacher1/400/400",
      imgScary: "https://picsum.photos/seed/chemist1/400/400?grayscale"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-neutral-950 text-neutral-200 p-4 md:p-8 font-sans relative"
    >
      <div className="scanlines opacity-50" />
      <div className="noise-overlay opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 border-b border-neutral-800 pb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-red-500 transition-colors uppercase font-display tracking-widest text-sm group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to Cover
          </button>
          <div className="text-red-900/50 font-mono text-xs tracking-[0.2em]">FILE: SUBJECT_OVERVIEW // EYES ONLY</div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {characters.map((char) => (
            <div key={char.id} className="relative group perspective-1000">
              <div className={`bg-neutral-900/80 backdrop-blur-sm rounded-sm overflow-hidden shadow-2xl border transition-all duration-500 ${revealed[char.id] ? 'border-red-600/50 shadow-[0_0_30px_rgba(220,38,38,0.1)]' : 'border-neutral-800 hover:border-neutral-600'}`}>
                
                {/* Image Container */}
                <div 
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer group-hover:shadow-inner"
                  onClick={() => toggleReveal(char.id)}
                >
                  {/* Normal Image */}
                  <img 
                    src={char.imgNormal} 
                    alt={char.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${revealed[char.id] ? 'opacity-0 scale-110' : 'group-hover:scale-105 group-hover:grayscale-[50%]'}`}
                  />
                  
                  {/* Scary Image (Revealed on Hover OR Click) */}
                  <div className={`absolute inset-0 bg-red-950/40 mix-blend-multiply transition-opacity duration-300 ${revealed[char.id] ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <img 
                      src={char.imgScary} 
                      alt={char.trueName}
                      className="w-full h-full object-cover mix-blend-luminosity contrast-125 filter grayscale sepia-[0.3]"
                    />
                    {/* Glitch Overlay Effect */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 animate-pulse"></div>
                  </div>

                  {/* Overlay Text on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    <span className="bg-red-600 text-black font-display font-bold px-4 py-2 text-sm uppercase tracking-widest transform -rotate-6 shadow-lg border border-black">
                      Identify Subject
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 relative min-h-[300px]">
                  <AnimatePresence mode="wait">
                    {!revealed[char.id] ? (
                      <motion.div 
                        key="normal"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-4"
                      >
                        <div>
                          <h3 className="text-4xl font-display font-bold text-neutral-100 uppercase tracking-wide">{char.name}</h3>
                          <p className="text-sm text-neutral-400 uppercase tracking-widest font-sans font-medium mt-1">{char.role}</p>
                        </div>
                        <div className="w-12 h-1 bg-neutral-800"></div>
                        <p className="text-neutral-400 text-lg leading-relaxed font-serif italic">
                          "{char.desc}"
                        </p>
                        <button 
                          onClick={() => toggleReveal(char.id)}
                          className="absolute bottom-8 left-8 text-xs text-neutral-500 hover:text-white uppercase tracking-widest flex items-center gap-2 group/btn"
                        >
                          <Fingerprint size={16} className="group-hover/btn:text-red-500 transition-colors" />
                          <span className="border-b border-transparent group-hover/btn:border-red-500 transition-all">Investigate Anomaly</span>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="revealed"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-4 relative"
                      >
                        {/* Stamp */}
                        <div className="absolute -top-6 -right-6 border-[6px] border-red-600 text-red-600 font-display font-bold text-3xl px-4 py-2 transform rotate-12 opacity-80 pointer-events-none mix-blend-screen mask-stamp">
                          EXPOSED
                        </div>

                        <div>
                          <h3 className="text-4xl font-display font-bold text-red-500 uppercase tracking-tighter glitch-hover">{char.trueName}</h3>
                          <p className="text-xs text-black bg-red-600 inline-block px-2 py-0.5 uppercase tracking-widest font-sans font-bold mt-1">{char.trueRole}</p>
                        </div>
                        
                        <div className="w-full h-px bg-red-900/50 my-4 relative overflow-hidden">
                          <div className="absolute top-0 left-0 h-full w-1/2 bg-red-600/50 animate-[scanline-scroll_2s_linear_infinite]"></div>
                        </div>

                        <p className="text-red-100/90 text-base leading-relaxed font-typewriter">
                          {char.trueDesc}
                        </p>
                        
                        <button 
                          onClick={() => toggleReveal(char.id)}
                          className="absolute bottom-8 left-8 text-xs text-red-800 hover:text-red-500 flex items-center gap-2 uppercase tracking-widest transition-colors"
                        >
                          <Lock size={14} /> Re-encrypt Data
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-end">
          <button 
            onClick={onNext}
            className="group flex items-center gap-4 text-neutral-500 hover:text-red-500 transition-colors"
          >
            <span className="uppercase font-display font-bold tracking-[0.2em] text-lg">Access Full Dossier</span>
            <div className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center group-hover:bg-red-900/20 group-hover:border-red-600 transition-all">
              <ArrowRight size={20} />
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// 3. Story Page
const StoryPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#f0f0f0] text-neutral-900 font-typewriter relative"
    >
      <div className="max-w-3xl mx-auto p-8 md:p-20 min-h-screen bg-white shadow-2xl my-0 md:my-12 relative">
        <nav className="mb-16 flex justify-between items-center border-b-2 border-neutral-300 pb-6 relative z-10">
          <button onClick={onBack} className="text-neutral-500 hover:text-black transition-colors flex items-center gap-2 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans uppercase text-xs tracking-widest font-bold">Back to Archives</span>
          </button>
          <div className="font-mono text-xs text-red-800/70 uppercase tracking-widest border border-red-800/30 px-2 py-1">
            Case File #892-893
          </div>
        </nav>

        <article className="prose prose-neutral prose-lg relative z-10 max-w-none">
          <h1 className="font-display font-bold text-5xl mb-4 tracking-tighter uppercase text-black">The Incident at Miller's Creek</h1>
          <div className="text-xs font-mono text-neutral-500 mb-12 uppercase tracking-widest flex items-center gap-4">
            <span>Date: 10.14.1998</span>
            <span className="w-px h-3 bg-neutral-400"></span>
            <span>Loc: [REDACTED], KS</span>
            <span className="w-px h-3 bg-neutral-400"></span>
            <span className="text-red-700 font-bold">Clearance: Level 5</span>
          </div>

          <p className="first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-black leading-relaxed">
            It was a Tuesday when the black sedan rolled into town. John was fixing the fence post near the southern perimeter—or what the neighbors called the "south pasture." To the untrained eye, he was just wiping sweat from his brow with a grease-stained rag. To Jane, watching from the kitchen window while kneading dough, he was signaling a Code 4.
          </p>
          
          <p className="leading-relaxed">
            "Honey," Jane called out, her voice carrying that sweet, practiced lilt she'd perfected over three years of deep cover. "Did you remember to buy the milk?"
          </p>

          <p className="leading-relaxed">
            John didn't turn around. He tapped the hammer twice against the wooden post. <em>Two taps. Hostiles confirmed.</em>
          </p>

          <p className="leading-relaxed">
            The sedan slowed as it passed their driveway. Tinted windows. Heavy suspension. Government plates masked with mud. It wasn't the Sheriff. It wasn't the tax collector.
          </p>

          <div className="my-10 p-8 bg-neutral-900 text-green-500 font-mono text-sm relative overflow-hidden border-l-4 border-green-600 shadow-lg">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
            <div className="relative z-10">
              <p className="mb-4 text-green-400/70 border-b border-green-900/50 pb-2"><strong>// INTERCEPTED TRANSMISSION 14:02</strong></p>
              <p className="typing-effect">"Target sighted. Confirm visual on Subject Viper. No visual on Subject Hemlock. Proceeding with caution."</p>
            </div>
          </div>

          <p className="leading-relaxed">
            Jane wiped the flour from her hands. She reached into the flour jar, not for a measuring cup, but for the handle of the Glock 19 buried three inches deep in the white powder. She racked the slide, the sound masked by the sudden slamming of the screen door as John entered.
          </p>

          <p className="leading-relaxed">
            "Company?" she asked, her smile vanishing into a cold, flat line.
          </p>

          <p className="leading-relaxed">
            "Old friends," John replied, locking the deadbolt. His eyes, usually warm and crinkled with laughter lines, were now dead calm. "They didn't bring pie."
          </p>

          <p className="leading-relaxed">
            Jane sighed, checking the magazine. "Shame. I just put the roast in."
          </p>
          
          <p className="leading-relaxed">
            The illusion of the quiet life in Miller's Creek was about to shatter. And God help anyone standing on their lawn when it did.
          </p>
          
          <div className="flex justify-center mt-16">
            <span className="text-black font-display text-2xl tracking-[1em] opacity-20">***</span>
          </div>
        </article>
      </div>
    </motion.div>
  );
};

// --- Main App ---
export default function App() {
  const [page, setPage] = useState<Page>('landing');

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait">
        {page === 'landing' && (
          <LandingPage key="landing" onEnter={() => setPage('characters')} />
        )}
        {page === 'characters' && (
          <CharacterPage 
            key="characters" 
            onNext={() => setPage('story')} 
            onBack={() => setPage('landing')} 
          />
        )}
        {page === 'story' && (
          <StoryPage key="story" onBack={() => setPage('characters')} />
        )}
      </AnimatePresence>
    </div>
  );
}
