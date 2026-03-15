import { useCallback, useEffect, useRef, useState } from "react";
import { StarField } from "./components/StarField";

// ─── Types ───────────────────────────────────────────────────────────────────
interface PlanetData {
  name: string;
  color: string;
  ringColor?: string;
  size: number;
  orbitRadius: number;
  orbitDuration: number;
  diameter: string;
  temperature: string;
  distance: string;
  description: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const planets: PlanetData[] = [
  {
    name: "Mercury",
    color: "#9E9E9E",
    size: 6,
    orbitRadius: 90,
    orbitDuration: 4,
    diameter: "4,879 km",
    temperature: "-180°C to 430°C",
    distance: "57.9M km",
    description:
      "Smallest planet, closest to the Sun with extreme temperature swings.",
  },
  {
    name: "Venus",
    color: "#FFB300",
    size: 10,
    orbitRadius: 130,
    orbitDuration: 10,
    diameter: "12,104 km",
    temperature: "465°C",
    distance: "108.2M km",
    description:
      "Hottest planet with a thick toxic atmosphere of carbon dioxide.",
  },
  {
    name: "Earth",
    color: "#1E88E5",
    size: 11,
    orbitRadius: 175,
    orbitDuration: 16,
    diameter: "12,742 km",
    temperature: "-88°C to 58°C",
    distance: "149.6M km",
    description:
      "Our home — the only known planet harboring life in the universe.",
  },
  {
    name: "Mars",
    color: "#E53935",
    size: 8,
    orbitRadius: 220,
    orbitDuration: 30,
    diameter: "6,779 km",
    temperature: "-125°C to 20°C",
    distance: "227.9M km",
    description:
      "The Red Planet with the tallest volcano and deepest canyon in the solar system.",
  },
  {
    name: "Jupiter",
    color: "#FF8F00",
    size: 22,
    orbitRadius: 290,
    orbitDuration: 60,
    diameter: "139,820 km",
    temperature: "-145°C",
    distance: "778.5M km",
    description:
      "Largest planet, a gas giant with the iconic Great Red Spot storm.",
  },
  {
    name: "Saturn",
    color: "#FDD835",
    ringColor: "rgba(253,216,53,0.4)",
    size: 18,
    orbitRadius: 355,
    orbitDuration: 100,
    diameter: "116,460 km",
    temperature: "-178°C",
    distance: "1.43B km",
    description:
      "Ringed gas giant — its rings are made of ice and rock particles.",
  },
  {
    name: "Uranus",
    color: "#80DEEA",
    size: 15,
    orbitRadius: 415,
    orbitDuration: 168,
    diameter: "50,724 km",
    temperature: "-224°C",
    distance: "2.87B km",
    description:
      "Ice giant that rotates on its side — unique axial tilt of 98°.",
  },
  {
    name: "Neptune",
    color: "#1A237E",
    size: 14,
    orbitRadius: 470,
    orbitDuration: 264,
    diameter: "49,244 km",
    temperature: "-214°C",
    distance: "4.5B km",
    description:
      "Windiest planet with speeds reaching 2,100 km/h in its atmosphere.",
  },
];

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "missions", label: "Missions" },
  { id: "universe", label: "Universe" },
  { id: "solar-system", label: "Solar System" },
  { id: "rockets", label: "Rockets" },
  { id: "facts", label: "Facts" },
];

// ─── Helper hooks ─────────────────────────────────────────────────────────────
function useSectionFade(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="section-title font-orbitron text-3xl md:text-4xl font-bold text-center text-white mb-12 text-glow-cyan">
      {children}
    </h2>
  );
}

function SolarSystem({
  selectedPlanet,
  onSelect,
}: {
  selectedPlanet: PlanetData | null;
  onSelect: (p: PlanetData) => void;
}) {
  const containerSize = 960;
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8">
      {/* Orrery */}
      <div
        className="relative flex-shrink-0"
        style={{ width: "min(96vw, 560px)", height: "min(96vw, 560px)" }}
      >
        <div className="absolute inset-0" style={{ overflow: "visible" }}>
          <svg
            role="img"
            aria-label="Animated solar system orrery showing planets orbiting the Sun"
            viewBox={`0 0 ${containerSize} ${containerSize}`}
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            <defs>
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF176" stopOpacity="1" />
                <stop offset="40%" stopColor="#FFB300" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF6F00" stopOpacity="0.8" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="sunFilter">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Orbital rings */}
            {planets.map((planet) => (
              <ellipse
                key={`orbit-${planet.name}`}
                cx={centerX}
                cy={centerY}
                rx={planet.orbitRadius}
                ry={planet.orbitRadius * 0.3}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
              />
            ))}

            {/* Sun */}
            <circle
              cx={centerX}
              cy={centerY}
              r="30"
              fill="url(#sunGlow)"
              filter="url(#sunFilter)"
            />
            <circle cx={centerX} cy={centerY} r="22" fill="url(#sunGlow)" />

            {/* Planets */}
            {planets.map((planet, i) => (
              <AnimatedPlanet
                key={planet.name}
                planet={planet}
                centerX={centerX}
                centerY={centerY}
                isSelected={selectedPlanet?.name === planet.name}
                onSelect={onSelect}
                index={i}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Planet info panel */}
      <div className="flex-1 w-full max-w-md">
        {selectedPlanet ? (
          <div className="glass-card rounded-2xl p-6 border border-space-cyan/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{
                  background: selectedPlanet.color,
                  boxShadow: `0 0 12px ${selectedPlanet.color}`,
                }}
              />
              <h3 className="font-orbitron text-2xl text-white text-glow-cyan">
                {selectedPlanet.name}
              </h3>
            </div>
            <p className="text-gray-300 font-rajdhani text-lg mb-6">
              {selectedPlanet.description}
            </p>
            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  label: "Diameter",
                  value: selectedPlanet.diameter,
                  icon: "⬤",
                },
                {
                  label: "Temperature",
                  value: selectedPlanet.temperature,
                  icon: "🌡️",
                },
                {
                  label: "Distance from Sun",
                  value: selectedPlanet.distance,
                  icon: "📏",
                },
              ].map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-gray-400 font-rajdhani">
                    {icon} {label}
                  </span>
                  <span className="text-space-cyan font-orbitron text-sm">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-8 text-center border border-white/10">
            <div className="text-5xl mb-4">🪐</div>
            <p className="font-orbitron text-white text-lg mb-2">
              Select a Planet
            </p>
            <p className="text-gray-400 font-rajdhani">
              Click any planet in the solar system to explore its details.
            </p>
          </div>
        )}

        {/* Planet selector buttons */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {planets.map((planet, i) => (
            <button
              key={planet.name}
              type="button"
              data-ocid={`solar.${planet.name.toLowerCase()}.button`}
              onClick={() => onSelect(planet)}
              className="glass-card rounded-lg p-2 text-center transition-all duration-200 hover:border-space-cyan/40 cursor-pointer"
              style={{
                borderColor:
                  selectedPlanet?.name === planet.name
                    ? `${planet.color}80`
                    : undefined,
                boxShadow:
                  selectedPlanet?.name === planet.name
                    ? `0 0 12px ${planet.color}40`
                    : undefined,
              }}
              aria-label={`Select ${planet.name}`}
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-1"
                style={{ background: planet.color }}
              />
              <span
                className="text-white font-rajdhani"
                style={{ fontSize: "10px" }}
              >
                {planet.name.slice(0, 3).toUpperCase()}
              </span>
              <span
                className="sr-only"
                data-ocid={`solar.planet.item.${i + 1}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimatedPlanet({
  planet,
  centerX,
  centerY,
  isSelected,
  onSelect,
  index,
}: {
  planet: PlanetData;
  centerX: number;
  centerY: number;
  isSelected: boolean;
  onSelect: (p: PlanetData) => void;
  index: number;
}) {
  const [angle, setAngle] = useState(() => (index * (Math.PI * 2)) / 8);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const speed = (2 * Math.PI) / (planet.orbitDuration * 1000);
    const tick = (time: number) => {
      if (lastTimeRef.current !== 0) {
        const delta = time - lastTimeRef.current;
        setAngle((a) => a + speed * delta);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [planet.orbitDuration]);

  const rx = planet.orbitRadius;
  const ry = planet.orbitRadius * 0.3;
  const x = centerX + rx * Math.cos(angle);
  const y = centerY + ry * Math.sin(angle);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") onSelect(planet);
  };

  return (
    <g
      aria-label={`Select ${planet.name}`}
      onClick={() => onSelect(planet)}
      onKeyDown={handleKeyDown}
      style={{ cursor: "pointer" }}
    >
      {planet.ringColor && (
        <ellipse
          cx={x}
          cy={y}
          rx={planet.size * 1.8}
          ry={planet.size * 0.5}
          fill="none"
          stroke={planet.ringColor}
          strokeWidth="3"
        />
      )}
      <circle
        cx={x}
        cy={y}
        r={planet.size}
        fill={planet.color}
        filter="url(#glow)"
      />
      {isSelected && (
        <circle
          cx={x}
          cy={y}
          r={planet.size + 4}
          fill="none"
          stroke="#00FFFF"
          strokeWidth="1.5"
          opacity="0.8"
        />
      )}
      <text
        x={x}
        y={y - planet.size - 5}
        textAnchor="middle"
        fill="rgba(255,255,255,0.6)"
        fontSize="8"
        fontFamily="Orbitron, monospace"
        style={{ pointerEvents: "none" }}
      >
        {planet.name.slice(0, 3).toUpperCase()}
      </text>
    </g>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const aboutRef = useRef<HTMLElement>(null);
  const missionsRef = useRef<HTMLElement>(null);
  const universeRef = useRef<HTMLElement>(null);
  const solarRef = useRef<HTMLElement>(null);
  const rocketsRef = useRef<HTMLElement>(null);
  const factsRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useSectionFade(aboutRef);
  useSectionFade(missionsRef);
  useSectionFade(universeRef);
  useSectionFade(solarRef);
  useSectionFade(rocketsRef);
  useSectionFade(factsRef);
  useSectionFade(footerRef);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "Rajdhani, sans-serif" }}
    >
      <StarField />

      {/* Fixed nebula bg */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url('/assets/generated/nebula-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
        }}
      />

      {/* ── Navigation ── */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2 font-orbitron text-lg font-bold cursor-pointer"
              style={{ color: "#00FFFF", textShadow: "0 0 10px #00FFFF" }}
            >
              🚀 <span>ISRO SPACE</span>
            </button>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  data-ocid={`nav.${link.id === "solar-system" ? "solar" : link.id}.link`}
                  onClick={() => scrollTo(link.id)}
                  className="font-rajdhani text-sm font-semibold text-gray-300 hover:text-space-cyan transition-colors duration-200 uppercase tracking-wider cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              data-ocid="nav.mobile.toggle"
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 bg-space-cyan transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block h-0.5 bg-space-cyan transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 bg-space-cyan transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  data-ocid={`nav.${link.id === "solar-system" ? "solar" : link.id}.link`}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-space-cyan font-rajdhani font-semibold uppercase tracking-wider transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section
        id="home"
        className="relative flex items-center justify-center min-h-screen pt-16 overflow-hidden"
      >
        <div className="scan-line absolute inset-0 z-10 pointer-events-none" />

        <div
          className="absolute right-4 md:right-16 bottom-0 z-10 animate-rocket"
          style={{ width: "clamp(160px, 20vw, 300px)" }}
        >
          <img
            src="/assets/generated/rocket-launch.dim_600x800.png"
            alt="Rocket launching into space"
            className="w-full opacity-80"
          />
        </div>

        <div
          className="absolute -bottom-8 -left-8 z-10 animate-spin-slow opacity-60"
          style={{ width: "clamp(120px, 15vw, 220px)" }}
        >
          <img
            src="/assets/generated/earth.dim_400x400.png"
            alt="Earth from space"
            className="w-full"
          />
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-4">
            <span
              className="inline-block font-orbitron text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: "#00FFFF", textShadow: "0 0 8px #00FFFF" }}
            >
              Indian Space Research Organisation
            </span>
          </div>
          <h1
            className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
            style={{
              textShadow:
                "0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(0,255,255,0.2)",
            }}
          >
            EXPLORING THE{" "}
            <span
              style={{
                color: "#00FFFF",
                textShadow: "0 0 20px #00FFFF, 0 0 40px #00E5FF",
              }}
            >
              INFINITE
            </span>
            <br />
            UNIVERSE
          </h1>
          <p className="font-rajdhani text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Advancing humanity's knowledge through space exploration, satellite
            technology, and interplanetary missions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              data-ocid="hero.explore.primary_button"
              onClick={() => scrollTo("about")}
              className="font-orbitron font-bold px-8 py-3 rounded-lg text-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00FFFF, #00E5FF)",
                boxShadow: "0 0 20px rgba(0,255,255,0.5)",
              }}
            >
              Explore Space
            </button>
            <button
              type="button"
              data-ocid="hero.learn.secondary_button"
              onClick={() => scrollTo("universe")}
              className="font-orbitron font-bold px-8 py-3 rounded-lg text-white text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7B2FBE, #A855F7)",
                boxShadow: "0 0 20px rgba(168,85,247,0.5)",
              }}
            >
              Learn About the Universe
            </button>
            <button
              type="button"
              data-ocid="hero.missions.button"
              onClick={() => scrollTo("missions")}
              className="font-orbitron font-bold px-8 py-3 rounded-lg text-space-cyan text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 glass-card"
              style={{
                border: "1px solid rgba(0,255,255,0.4)",
                boxShadow: "0 0 15px rgba(0,255,255,0.2)",
              }}
            >
              View Space Missions
            </button>
          </div>

          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
            style={{ color: "#00FFFF" }}
          >
            <div
              className="w-6 h-10 border-2 rounded-full flex justify-center"
              style={{ borderColor: "#00FFFF40" }}
            >
              <div
                className="w-1 h-3 rounded-full mt-2 animate-bounce"
                style={{ background: "#00FFFF" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section
        id="about"
        ref={aboutRef}
        className="section-fade relative z-10 py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle>ABOUT ISRO</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-rajdhani text-lg text-gray-300 leading-relaxed mb-6">
                The{" "}
                <span style={{ color: "#00FFFF" }}>
                  Indian Space Research Organisation (ISRO)
                </span>{" "}
                is India's national space agency, founded in 1969, headquartered
                in Bengaluru. Renowned worldwide for its innovative and{" "}
                <span style={{ color: "#A855F7" }}>
                  cost-effective missions
                </span>
                , ISRO has established India as a leading spacefaring nation.
              </p>
              <p className="font-rajdhani text-gray-400 leading-relaxed mb-8">
                From launching India's first satellite Aryabhata in 1975 to
                successfully landing near the Moon's south pole with
                Chandrayaan-3 in 2023, ISRO continues to push the boundaries of
                space exploration.
              </p>
              <div className="space-y-3">
                {[
                  "Launch Vehicles (PSLV, GSLV, LVM3)",
                  "Communication Satellites",
                  "Earth Observation Satellites",
                  "Interplanetary Missions",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span style={{ color: "#00FFFF" }}>▹</span>
                    <span className="font-rajdhani text-gray-300 font-semibold">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "1969", label: "Founded", icon: "🚀" },
                { value: "Bengaluru", label: "Headquarters", icon: "🏛️" },
                { value: "50+", label: "Satellites Launched", icon: "🛰️" },
                { value: "100+", label: "Missions Complete", icon: "✅" },
              ].map(({ value, label, icon }) => (
                <div
                  key={label}
                  className="glass-card rounded-2xl p-6 text-center transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{icon}</div>
                  <div
                    className="font-orbitron text-2xl font-bold"
                    style={{ color: "#00FFFF" }}
                  >
                    {value}
                  </div>
                  <div className="font-rajdhani text-gray-400 text-sm mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Missions Section ── */}
      <section
        id="missions"
        ref={missionsRef}
        className="section-fade relative z-10 py-24 px-6"
        style={{ background: "rgba(0,20,40,0.4)" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle>SPACE MISSIONS</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "chandrayaan",
                name: "Chandrayaan-3",
                img: "/assets/generated/moon.dim_400x400.png",
                badge: "LUNAR",
                badgeColor: "#00FFFF",
                desc: "India's historic lunar mission that successfully landed a rover near the Moon's south pole in August 2023 — a global first.",
                delay: "0s",
              },
              {
                id: "mars",
                name: "Mars Orbiter Mission",
                img: "/assets/generated/mars.dim_400x400.png",
                badge: "MARS",
                badgeColor: "#E53935",
                desc: "India's historic mission to Mars that made India the first country to reach Mars orbit on its very first attempt.",
                delay: "0.2s",
              },
              {
                id: "aditya",
                name: "Aditya-L1",
                img: "/assets/generated/sun.dim_400x400.png",
                badge: "SOLAR",
                badgeColor: "#FFB300",
                desc: "India's first dedicated solar observatory, positioned at the L1 Lagrange point to study the Sun and solar activity continuously.",
                delay: "0.4s",
              },
            ].map(({ id, name, img, badge, badgeColor, desc, delay }) => (
              <div
                key={id}
                data-ocid={`missions.${id}.card`}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  animationDelay: delay,
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ height: "200px" }}
                >
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8))",
                    }}
                  />
                  <span
                    className="absolute top-3 right-3 font-orbitron text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: `${badgeColor}30`,
                      border: `1px solid ${badgeColor}60`,
                      color: badgeColor,
                    }}
                  >
                    {badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="font-orbitron text-lg font-bold text-white mb-3"
                    style={{ textShadow: "0 0 8px rgba(0,255,255,0.3)" }}
                  >
                    {name}
                  </h3>
                  <p className="font-rajdhani text-gray-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Universe Explained Section ── */}
      <section
        id="universe"
        ref={universeRef}
        className="section-fade relative z-10 py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle>THE UNIVERSE EXPLAINED</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "⭐",
                title: "Stars",
                desc: "Massive glowing spheres of hot gas generating energy through nuclear fusion. The closest star, our Sun, sits 149.6 million km from Earth.",
              },
              {
                icon: "🌌",
                title: "Galaxies",
                desc: "Vast systems of billions of stars, planets, gas, and dust held together by gravity. Earth's Milky Way contains 100–400 billion stars.",
              },
              {
                icon: "📏",
                title: "Distance in Space",
                desc: "Cosmic distances are measured in light-years. One light-year equals approximately 9.46 trillion kilometers of empty space.",
              },
              {
                icon: "🕳️",
                title: "Black Holes",
                desc: "Regions where gravity is so powerful that nothing — not even light — can escape. They form when massive stars collapse.",
              },
              {
                icon: "☁️",
                title: "Nebulae",
                desc: "Giant clouds of gas and dust scattered across galaxies — the stellar nurseries where new stars and planetary systems are born.",
              },
              {
                icon: "🌠",
                title: "Dark Matter",
                desc: "An invisible substance comprising 27% of the universe's mass-energy. Its gravitational effects reveal its presence, yet it remains undetected directly.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="glass-card rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-orbitron font-bold text-white mb-3 text-lg group-hover:text-space-cyan transition-colors">
                  {title}
                </h3>
                <p className="font-rajdhani text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solar System Section ── */}
      <section
        id="solar-system"
        ref={solarRef}
        className="section-fade relative z-10 py-24 px-6"
        style={{ background: "rgba(0,10,30,0.5)" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle>SOLAR SYSTEM</SectionTitle>
          <SolarSystem
            selectedPlanet={selectedPlanet}
            onSelect={setSelectedPlanet}
          />
        </div>
      </section>

      {/* ── Rockets & Satellites Section ── */}
      <section
        id="rockets"
        ref={rocketsRef}
        className="section-fade relative z-10 py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle>ROCKETS & SATELLITES</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative flex justify-center">
              <div className="animate-float-slow">
                <img
                  src="/assets/generated/satellite.dim_500x400.png"
                  alt="Satellite orbiting Earth"
                  className="w-full max-w-sm rounded-2xl"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(0,255,255,0.3))",
                  }}
                />
              </div>
              <div
                className="absolute -right-4 bottom-0 animate-float"
                style={{ width: "120px", animationDelay: "2s" }}
              >
                <img
                  src="/assets/generated/astronaut.dim_500x600.png"
                  alt="Astronaut floating in space"
                  className="w-full"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(168,85,247,0.4))",
                  }}
                />
              </div>
            </div>

            <div>
              <h3
                className="font-orbitron text-2xl font-bold text-white mb-4"
                style={{ textShadow: "0 0 10px rgba(0,255,255,0.3)" }}
              >
                Why Satellites Matter
              </h3>
              <p className="font-rajdhani text-gray-300 text-lg leading-relaxed mb-6">
                Satellites orbit Earth at speeds of 27,000+ km/h, enabling
                technologies that power our modern world — from real-time
                weather alerts to global internet. ISRO's rockets deliver these
                vital instruments into precise orbits.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: "🌤️",
                    label: "Weather Forecasting",
                    desc: "Real-time atmospheric monitoring and storm prediction",
                  },
                  {
                    icon: "🗺️",
                    label: "GPS Navigation",
                    desc: "Global positioning systems for land, sea, and air",
                  },
                  {
                    icon: "📡",
                    label: "Communication Systems",
                    desc: "Television, internet, and telephone connectivity",
                  },
                  {
                    icon: "🌍",
                    label: "Earth Observation",
                    desc: "Agricultural, environmental, and urban monitoring",
                  },
                  {
                    icon: "🚨",
                    label: "Disaster Monitoring",
                    desc: "Early warning systems for floods, earthquakes, wildfires",
                  },
                ].map(({ icon, label, desc }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 glass-card rounded-xl p-4 transition-all duration-300"
                  >
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <div
                        className="font-orbitron text-sm font-bold"
                        style={{ color: "#00FFFF" }}
                      >
                        {label}
                      </div>
                      <div className="font-rajdhani text-gray-400 text-sm">
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Space Facts Section ── */}
      <section
        id="facts"
        ref={factsRef}
        className="section-fade relative z-10 py-24 px-6"
        style={{ background: "rgba(20,0,40,0.4)" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle>SPACE FACTS</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "🔇",
                num: "01",
                fact: "Space is completely silent because there is no air or medium to carry sound waves.",
                accent: "#00FFFF",
              },
              {
                icon: "🥶",
                num: "02",
                fact: "The temperature in deep space can reach −270°C — just 3 degrees above absolute zero.",
                accent: "#1E88E5",
              },
              {
                icon: "🌌",
                num: "03",
                fact: "There are an estimated 2 trillion galaxies in the observable universe alone.",
                accent: "#A855F7",
              },
              {
                icon: "⭐",
                num: "04",
                fact: "Some stars are millions of times larger than the Sun — UY Scuti is 1,700 times the Sun's radius.",
                accent: "#FFB300",
              },
            ].map(({ icon, num, fact, accent }) => (
              <div
                key={num}
                className="glass-card rounded-2xl p-8 group transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  <div>
                    <div
                      className="font-orbitron text-5xl font-black"
                      style={{ color: accent, opacity: 0.3 }}
                    >
                      {num}
                    </div>
                    <div className="text-4xl -mt-4">{icon}</div>
                  </div>
                  <p className="font-rajdhani text-gray-300 text-lg leading-relaxed pt-2">
                    {fact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        id="contact"
        ref={footerRef}
        className="section-fade relative z-10 py-16 px-6 starfield-bg"
        style={{
          background: "rgba(0,0,10,0.95)",
          borderTop: "1px solid rgba(0,255,255,0.1)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* About */}
            <div>
              <div
                className="font-orbitron text-xl font-bold mb-4"
                style={{ color: "#00FFFF" }}
              >
                🚀 ISRO SPACE
              </div>
              <p className="font-rajdhani text-gray-400 leading-relaxed">
                Inspiring the next generation of scientists, engineers, and
                explorers through the wonders of space exploration and
                discovery.
              </p>
              <div className="flex gap-4 mt-6">
                {[
                  {
                    label: "Twitter/X",
                    href: "https://twitter.com/isro",
                    icon: (
                      <svg
                        role="img"
                        aria-label="Twitter/X"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current"
                      >
                        <title>Twitter/X</title>
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    label: "YouTube",
                    href: "https://youtube.com/@isro",
                    icon: (
                      <svg
                        role="img"
                        aria-label="YouTube"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current"
                      >
                        <title>YouTube</title>
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    ),
                  },
                  {
                    label: "LinkedIn",
                    href: "https://linkedin.com/company/isro",
                    icon: (
                      <svg
                        role="img"
                        aria-label="LinkedIn"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current"
                      >
                        <title>LinkedIn</title>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Instagram",
                    href: "https://instagram.com/isro",
                    icon: (
                      <svg
                        role="img"
                        aria-label="Instagram"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current"
                      >
                        <title>Instagram</title>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                    ),
                  },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-gray-500 hover:text-space-cyan transition-colors duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div
                className="font-orbitron text-sm font-bold mb-4 uppercase tracking-widest"
                style={{ color: "#00FFFF" }}
              >
                Quick Links
              </div>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="block font-rajdhani text-gray-400 hover:text-space-cyan transition-colors duration-200 text-left"
                  >
                    ▸ {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <div
                className="font-orbitron text-sm font-bold mb-4 uppercase tracking-widest"
                style={{ color: "#00FFFF" }}
              >
                Mission Updates
              </div>
              <p className="font-rajdhani text-gray-400 mb-4">
                Subscribe for the latest space mission news and discoveries.
              </p>
              {subscribed ? (
                <div
                  data-ocid="footer.newsletter.success_state"
                  className="glass-card rounded-lg p-4 text-center border"
                  style={{
                    borderColor: "rgba(0,255,255,0.3)",
                    color: "#00FFFF",
                  }}
                >
                  <span className="font-orbitron text-sm">
                    ✓ You're on the list, Explorer!
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-3"
                >
                  <input
                    data-ocid="footer.newsletter.input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-white/5 border rounded-lg px-4 py-2.5 font-rajdhani text-white placeholder-gray-500 focus:outline-none transition-all duration-200"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    required
                  />
                  <button
                    data-ocid="footer.newsletter.submit_button"
                    type="submit"
                    className="font-orbitron font-bold py-2.5 px-6 rounded-lg text-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #00FFFF, #00E5FF)",
                      boxShadow: "0 0 15px rgba(0,255,255,0.4)",
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          <div
            className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <p className="font-rajdhani text-gray-500 text-sm">
              © {new Date().getFullYear()} ISRO Space Research. All rights
              reserved.
            </p>
            <p className="font-rajdhani text-gray-500 text-sm">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-space-cyan transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
