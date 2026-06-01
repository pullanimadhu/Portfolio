import { useEffect, useRef, useState } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Certifications", "Contact"];

const PROJECTS = [
  {
    title: "iR2D - Multi-LLM Orchestration Platform",
    period: "2024 - Present",
    tech: ["LangGraph", "Multi-Agent", "RAG", "SAP", "LangChain", "OpenAI"],
    description:
      "Owned the Functional Spec Agent end-to-end on a platform orchestrating multiple LLMs for user story processing, design docs, code generation, code review, and test management.",
    metrics: [
      { value: "50-60%", label: "Documentation effort reduced" },
      { value: "40%", label: "Dev/review cycles cut" },
      { value: "30%", label: "Training content automated" },
    ],
    accent: "linear-gradient(120deg, #5bb5ff, #6b8cff)",
  },
  {
    title: "P2P Assistant - Vendor Self-Service Chatbot",
    period: "Feb 2025 - Aug 2025",
    tech: ["LangChain", "SAP S/4HANA", "ServiceNow", "FastAPI", "Python"],
    description:
      "Built a conversational AI assistant for vendors to check PO status and raise ServiceNow tickets with secure role-based access across ERP systems.",
    metrics: [
      { value: "3x", label: "Enterprise systems integrated" },
      { value: "REST", label: "SAP + ServiceNow APIs" },
    ],
    accent: "linear-gradient(120deg, #46d1b2, #1fa4a4)",
  },
  {
    title: "Data Insights - Intelligent Analytics Platform",
    period: "Oct 2024 - Jan 2025",
    tech: ["LangGraph", "SQL Agents", "NLP", "ReactJS", "Python"],
    description:
      "NLP-to-SQL analytics platform with auto visualizations and narrative summaries for fast business decisions.",
    metrics: [
      { value: "90%", label: "NL-to-SQL accuracy" },
      { value: "3", label: "Chart types auto-generated" },
      { value: "E2E", label: "Ingest -> Query -> Dashboard" },
    ],
    accent: "linear-gradient(120deg, #ffae7a, #ff7d93)",
  },
];

const SKILLS = {
  "Generative AI": ["LangChain", "LangGraph", "CrewAI", "OpenAI GPT", "Claude", "Gemini", "LLaMA", "Ollama"],
  "Core Techniques": ["RAG", "Prompt Engineering", "Multi-Agent Systems", "Agentic Workflows", "Guardrails"],
  "Backend and APIs": ["Python", "FastAPI", "Flask", "Django", "Node.js", "REST APIs"],
  "Data and Storage": ["PostgreSQL", "MongoDB", "Neo4j", "FAISS", "Chroma", "Redis"],
  Cloud: ["Azure AI", "AWS", "GCP", "Azure ML"],
};

const CERTS = [
  { title: "Azure AI Engineer Associate", code: "AI-102", issuer: "Microsoft" },
  { title: "Generative AI Developer", code: "SAP Certified", issuer: "SAP" },
  { title: "Data Analytics Projects in Python", code: "Udemy", issuer: "Udemy" },
  { title: "Programming in Java", code: "NPTEL", issuer: "NPTEL" },
];

const CONTACT_LINKS = [
  { label: "madhupullani111@gmail.com", href: "mailto:madhupullani111@gmail.com" },
  { label: "linkedin.com/in/madhu001", href: "https://linkedin.com/in/madhu001" },
  { label: "github.com/pullanimadhu", href: "https://github.com/pullanimadhu" },
  { label: "+91-9491163517", href: "tel:+919491163517" },
];

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Section({ id, index, title, children }) {
  const [ref, visible] = useReveal();

  return (
    <section id={id} ref={ref} className={`section-shell ${visible ? "show" : ""}`} style={{ "--delay": `${index * 60}ms` }}>
      <div className="section-kicker">{String(index).padStart(2, "0")}</div>
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const shellRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.45 }
    );

    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shellRef.current || !window.matchMedia("(pointer: fine)").matches) return undefined;

    let rafId = null;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const render = () => {
      const tx = ((pos.x / window.innerWidth) - 0.5) * 20;
      const ty = ((pos.y / window.innerHeight) - 0.5) * 16;
      shellRef.current.style.setProperty("--px", `${tx}px`);
      shellRef.current.style.setProperty("--py", `${ty}px`);
      rafId = null;
    };

    const onMove = (event) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      if (!rafId) rafId = window.requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app-shell" ref={shellRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&family=Space+Grotesk:wght@500;700&display=swap');

        :root {
          --bg0: #040916;
          --bg1: #0a1430;
          --bg2: #0a1a2f;
          --panel: rgba(11, 22, 45, 0.74);
          --panel-strong: rgba(10, 20, 39, 0.9);
          --line: rgba(169, 197, 242, 0.2);
          --text: #ebf2ff;
          --text-soft: #a9bddf;
          --accent-a: #64b5ff;
          --accent-b: #67e5c8;
          --accent-c: #ffb692;
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          color: var(--text);
          background: radial-gradient(circle at 18% 8%, rgba(100,181,255,0.25), transparent 26%),
            radial-gradient(circle at 85% 0%, rgba(255,182,146,0.18), transparent 33%),
            linear-gradient(160deg, var(--bg0), var(--bg1) 55%, var(--bg2));
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .app-shell {
          --px: 0px;
          --py: 0px;
          min-height: 100vh;
          position: relative;
          overflow-x: clip;
        }

        .scene {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .scene-layer {
          position: absolute;
          inset: 0;
          transform: translate3d(var(--tx), var(--ty), 0);
        }

        .scene-layer.far { --tx: calc(var(--px) * -0.2); --ty: calc(var(--py) * -0.2); }
        .scene-layer.mid { --tx: calc(var(--px) * -0.45); --ty: calc(var(--py) * -0.42); }
        .scene-layer.near { --tx: calc(var(--px) * -0.65); --ty: calc(var(--py) * -0.6); opacity: 0.35; }

        .glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(10px);
          opacity: 0.42;
          animation: floaty 10s ease-in-out infinite alternate;
        }

        .g1 { width: 460px; height: 460px; left: -120px; top: 18%; background: radial-gradient(circle, rgba(100,181,255,0.55), transparent 65%); }
        .g2 { width: 520px; height: 520px; right: -180px; top: 10%; background: radial-gradient(circle, rgba(255,182,146,0.45), transparent 65%); animation-delay: 1.2s; }
        .g3 { width: 500px; height: 500px; right: 8%; bottom: -220px; background: radial-gradient(circle, rgba(103,229,200,0.35), transparent 65%); animation-delay: 2.4s; }

        .star {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #dbe9ff;
          box-shadow: 0 0 16px rgba(104, 180, 255, 0.9);
          animation: twinkle 2.6s ease-in-out infinite;
        }

        .s1 { left: 14%; top: 14%; }
        .s2 { left: 36%; top: 10%; animation-delay: 1s; }
        .s3 { left: 62%; top: 16%; animation-delay: 1.8s; }
        .s4 { left: 83%; top: 11%; animation-delay: 0.5s; }

        .hill {
          position: absolute;
          bottom: -140px;
          border-radius: 55% 55% 0 0;
          background: linear-gradient(180deg, rgba(56, 86, 130, 0.45), rgba(8, 16, 35, 0.92));
        }

        .h1 { left: -6%; width: 42%; height: 220px; }
        .h2 { left: 28%; width: 40%; height: 170px; }
        .h3 { right: -8%; width: 46%; height: 210px; }

        .top-nav {
          position: fixed;
          inset: 0 0 auto 0;
          height: 64px;
          z-index: 99;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(16px, 4vw, 46px);
          backdrop-filter: blur(12px);
          background: rgba(6, 14, 29, 0.72);
          border-bottom: 1px solid var(--line);
        }

        .logo {
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.08em;
          font-weight: 700;
          color: #f1f6ff;
        }

        .nav-list {
          display: flex;
          gap: 18px;
        }

        .nav-btn {
          border: none;
          background: transparent;
          color: #a9bddf;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 6px 0;
          cursor: pointer;
          position: relative;
        }

        .nav-btn.active { color: #f0f6ff; }

        .nav-btn.active::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-a), var(--accent-c));
        }

        .menu-toggle {
          display: none;
          border: 1px solid var(--line);
          background: rgba(11, 22, 45, 0.95);
          color: #d8e7ff;
          padding: 7px 10px;
          border-radius: 10px;
          font-weight: 700;
        }

        .mobile-panel {
          position: fixed;
          top: 72px;
          left: 16px;
          right: 16px;
          z-index: 100;
          display: grid;
          gap: 8px;
          border-radius: 14px;
          border: 1px solid var(--line);
          padding: 10px;
          background: rgba(10, 20, 39, 0.95);
          backdrop-filter: blur(12px);
        }

        .mobile-item {
          border: 1px solid var(--line);
          border-radius: 10px;
          background: rgba(12, 25, 46, 0.84);
          color: #e4eeff;
          padding: 10px;
          text-align: left;
          font-weight: 600;
        }

        .page-wrap {
          width: min(1140px, 100% - 36px);
          margin: 0 auto;
          padding-top: 92px;
          padding-bottom: 90px;
          position: relative;
          z-index: 2;
        }

        .hero {
          min-height: calc(100vh - 100px);
          display: grid;
          grid-template-columns: 1.04fr 0.96fr;
          align-items: center;
          gap: 24px;
        }

        .hero-copy {
          border: 1px solid var(--line);
          border-radius: 24px;
          background: linear-gradient(145deg, rgba(11, 22, 45, 0.88), rgba(12, 24, 44, 0.72));
          box-shadow: 0 24px 56px rgba(0, 0, 0, 0.36);
          padding: clamp(20px, 2.8vw, 34px);
          backdrop-filter: blur(10px);
          animation: riseIn 0.8s ease both;
        }

        .eyebrow {
          display: inline-flex;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(100, 181, 255, 0.36);
          background: rgba(14, 33, 60, 0.72);
          color: #94d4ff;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .hero h1 {
          margin: 14px 0 10px;
          line-height: 0.95;
          font-size: clamp(38px, 6.5vw, 82px);
          font-family: 'Space Grotesk', sans-serif;
          color: #eef5ff;
        }

        .hero h1 span {
          display: block;
          background: linear-gradient(92deg, #69c1ff, #63e3c8 55%, #ffbc9b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .subtext {
          color: var(--text-soft);
          line-height: 1.78;
          margin: 0 0 14px;
          max-width: 620px;
        }

        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 18px;
        }

        .cta {
          text-decoration: none;
          border-radius: 12px;
          padding: 12px 16px;
          border: 1px solid transparent;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.03em;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .cta:hover { transform: translateY(-2px); }

        .cta.primary {
          background: linear-gradient(120deg, #56afff, #4be1bf);
          color: #031726;
          box-shadow: 0 12px 30px rgba(68, 167, 255, 0.34);
        }

        .cta.ghost {
          background: rgba(14, 29, 54, 0.75);
          border-color: var(--line);
          color: #d7e6ff;
        }

        .hero-stage {
          border: 1px solid var(--line);
          border-radius: 24px;
          background: linear-gradient(145deg, rgba(11, 22, 45, 0.9), rgba(12, 24, 44, 0.78));
          padding: 18px;
          backdrop-filter: blur(10px);
          box-shadow: 0 24px 56px rgba(0, 0, 0, 0.36);
          display: grid;
          gap: 14px;
          align-content: start;
          min-height: 410px;
          animation: riseIn 0.9s ease both 0.1s;
        }

        .stage-card {
          border: 1px solid var(--line);
          border-radius: 16px;
          background: var(--panel);
          padding: 16px;
          position: relative;
          overflow: hidden;
        }

        .stage-card::before {
          content: "";
          position: absolute;
          inset: -40% auto auto -40%;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(100,181,255,0.26), rgba(100,181,255,0));
          pointer-events: none;
        }

        .stage-card.core::before {
          background: radial-gradient(circle, rgba(103,229,200,0.24), rgba(103,229,200,0));
        }

        .stage-head {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #95d4ff;
          font-family: 'Space Grotesk', sans-serif;
          margin-bottom: 12px;
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .impact-cell {
          border: 1px solid var(--line);
          border-radius: 12px;
          background: rgba(14, 29, 54, 0.68);
          padding: 10px;
        }

        .impact-cell b {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          color: #f0f6ff;
        }

        .impact-cell span {
          font-size: 12px;
          color: #a9bddf;
        }

        .metric-strip {
          border: 1px solid var(--line);
          border-radius: 14px;
          background: rgba(14, 29, 54, 0.68);
          padding: 12px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .metric-strip div b {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          color: #f0f6ff;
        }

        .metric-strip div span {
          font-size: 12px;
          color: #a9bddf;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          border-radius: 999px;
          border: 1px solid var(--line);
          background: rgba(14, 29, 54, 0.72);
          color: #d2e3ff;
          font-size: 12px;
          padding: 7px 11px;
        }

        .section-shell {
          margin-top: 86px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease var(--delay), transform 0.7s ease var(--delay);
        }

        .section-shell.show {
          opacity: 1;
          transform: none;
        }

        .section-kicker {
          font-size: 12px;
          letter-spacing: 0.1em;
          color: #8ed0ff;
          margin-bottom: 10px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .section-title {
          margin: 0 0 18px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          color: #edf4ff;
        }

        .glass {
          border: 1px solid var(--line);
          border-radius: 18px;
          background: var(--panel);
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 46px rgba(0, 0, 0, 0.28);
          padding: 24px;
        }

        .timeline-item {
          padding: 15px 0;
          border-bottom: 1px dashed rgba(169, 197, 242, 0.26);
        }

        .timeline-item:last-child { border-bottom: none; }

        .timeline-item p {
          margin: 8px 0 0;
          color: var(--text-soft);
          line-height: 1.75;
        }

        .projects-grid,
        .skills-grid,
        .cert-grid {
          display: grid;
          gap: 16px;
        }

        .project {
          border-radius: 18px;
          border: 1px solid var(--line);
          background: var(--panel-strong);
          padding: 22px;
          box-shadow: 0 20px 42px rgba(0, 0, 0, 0.28);
        }

        .project-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        .project h3 {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
        }

        .period {
          color: #8dd3ff;
          font-size: 12px;
          font-weight: 700;
        }

        .metric-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 14px 0;
        }

        .metric {
          min-width: 120px;
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 10px;
          background: rgba(14, 29, 54, 0.7);
        }

        .metric b {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          color: #edf4ff;
        }

        .metric span {
          color: #a9bddf;
          font-size: 12px;
        }

        .skills-grid,
        .cert-grid {
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }

        .skill-group h4,
        .cert h4 {
          margin: 0 0 12px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .subtext-small,
        .cert p,
        .contact p {
          color: var(--text-soft);
          line-height: 1.7;
          margin: 0;
        }

        .contact-list {
          margin-top: 14px;
          display: grid;
          gap: 10px;
        }

        .contact-link {
          text-decoration: none;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: rgba(14, 29, 54, 0.72);
          color: #e8f1ff;
          font-weight: 600;
          padding: 12px;
          transition: transform 0.18s ease, border-color 0.18s ease;
        }

        .contact-link:hover {
          transform: translateX(4px);
          border-color: rgba(103, 229, 200, 0.55);
        }

        .footer {
          margin-top: 88px;
          border-top: 1px solid var(--line);
          padding-top: 22px;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          color: #9fb3d6;
          font-size: 12px;
        }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }

        @keyframes twinkle {
          0%,100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.35); }
        }

        @keyframes floaty {
          from { transform: translateY(0); }
          to { transform: translateY(-14px); }
        }

        @media (max-width: 980px) {
          .nav-list { display: none; }
          .menu-toggle { display: inline-flex; }
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-stage { min-height: auto; }
          .scene-layer.near { opacity: 0.2; }
        }

        @media (max-width: 740px) {
          .cta-row { display: grid; grid-template-columns: 1fr; }
          .page-wrap { width: min(1140px, 100% - 22px); }
          .scene-layer.mid,
          .scene-layer.near { display: none; }
          .impact-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="scene" aria-hidden="true">
        <div className="scene-layer far">
          <div className="glow g1" />
          <div className="glow g2" />
          <div className="glow g3" />
          <span className="star s1" />
          <span className="star s2" />
          <span className="star s3" />
          <span className="star s4" />
        </div>
        <div className="scene-layer mid">
          <div className="hill h1" />
          <div className="hill h2" />
          <div className="hill h3" />
        </div>
      </div>

      <nav className="top-nav">
        <div className="logo">MADHU // AI</div>
        <div className="nav-list" role="navigation" aria-label="Section navigation">
          {NAV_LINKS.map((link) => (
            <button key={link} type="button" className={`nav-btn ${activeSection === link ? "active" : ""}`} onClick={() => scrollTo(link)}>
              {link}
            </button>
          ))}
        </div>
        <button type="button" className="menu-toggle" onClick={() => setMenuOpen((prev) => !prev)} aria-expanded={menuOpen}>
          MENU
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-panel">
          {NAV_LINKS.map((link) => (
            <button key={link} type="button" className="mobile-item" onClick={() => scrollTo(link)}>
              {link}
            </button>
          ))}
        </div>
      )}

      <main className="page-wrap">
        <section id="About" className="hero">
          <div className="hero-copy">
            <div className="eyebrow">Pullani Madhu / Generative AI Developer</div>
            <h1>
              Architecting
              <span>AI Systems</span>
            </h1>
            <p className="subtext">
              I build enterprise-grade GenAI products with LangGraph orchestration, RAG pipelines, and multi-agent systems integrated into SAP and ServiceNow ecosystems.
            </p>
            <p className="subtext">Open to Generative AI Engineer and LLM Platform roles.</p>

            <div className="cta-row">
              <button type="button" className="cta primary" onClick={() => scrollTo("Projects")}>VIEW PROJECTS</button>
              <a className="cta ghost" href={`${import.meta.env.BASE_URL}Madhu_latest_resume_.pdf`} download>DOWNLOAD RESUME</a>
              <a className="cta ghost" href={`${import.meta.env.BASE_URL}Madhu_latest_resume_.pdf`} target="_blank" rel="noreferrer">VIEW RESUME</a>
              <a className="cta ghost" href="https://linkedin.com/in/madhu001" target="_blank" rel="noreferrer">LINKEDIN</a>
            </div>
          </div>

          <div className="hero-stage" aria-hidden="true">
            <article className="stage-card impact">
              <div className="stage-head">Impact Snapshot</div>
              <div className="impact-grid">
                <div className="impact-cell"><b>2+</b><span>Years at TCS</span></div>
                <div className="impact-cell"><b>3</b><span>Production Projects</span></div>
                <div className="impact-cell"><b>90%</b><span>NL-to-SQL Accuracy</span></div>
                <div className="impact-cell"><b>50-60%</b><span>Docs effort reduced</span></div>
              </div>
            </article>

            <article className="stage-card core">
              <div className="stage-head">Core Focus</div>
              <div className="chips">
                <span className="chip">LangGraph</span>
                <span className="chip">RAG</span>
                <span className="chip">Agentic workflows</span>
                <span className="chip">SAP + ServiceNow</span>
                <span className="chip">FastAPI + React</span>
              </div>
            </article>

            <article className="metric-strip">
              <div><b>40%</b><span>faster dev/review</span></div>
              <div><b>3x</b><span>systems integrated</span></div>
              <div><b>E2E</b><span>NL {"->"} SQL {"->"} Insights</span></div>
            </article>
          </div>
        </section>

        <Section id="Experience" index={1} title="Experience">
          <div className="glass">
            <div className="timeline-item">
              <strong>Generative AI Developer | Tata Consultancy Services</strong>
              <p>June 2024 - Present | India</p>
            </div>
            <div className="timeline-item">
              <p>Owned Functional Spec Agent delivery in iR2D orchestration platform: prompt design, RAG architecture, and LangGraph integration.</p>
            </div>
            <div className="timeline-item">
              <p>Delivered cross-system AI flows connecting SAP S/4HANA, Brainware, and ServiceNow for automation at scale.</p>
            </div>
            <div className="timeline-item">
              <p>Drove measurable outcomes: 50-60% documentation reduction and 40% faster dev/review cycles.</p>
            </div>
          </div>
        </Section>

        <Section id="Projects" index={2} title="Project Highlights">
          <div className="projects-grid">
            {PROJECTS.map((project) => (
              <article key={project.title} className="project" style={{ backgroundImage: `${project.accent}, linear-gradient(0deg, rgba(10,20,39,0.92), rgba(10,20,39,0.92))`, backgroundBlendMode: "soft-light, normal" }}>
                <div className="project-head">
                  <h3>{project.title}</h3>
                  <span className="period">{project.period}</span>
                </div>
                <p className="subtext-small">{project.description}</p>
                <div className="metric-row">
                  {project.metrics.map((metric) => (
                    <div className="metric" key={metric.label}><b>{metric.value}</b><span>{metric.label}</span></div>
                  ))}
                </div>
                <div className="chips">
                  {project.tech.map((tech) => (
                    <span className="chip" key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="Skills" index={3} title="Skills Constellation">
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([category, items]) => (
              <article key={category} className="glass skill-group">
                <h4>{category}</h4>
                <div className="chips">
                  {items.map((item) => (
                    <span className="chip" key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="Certifications" index={4} title="Credentials">
          <div className="cert-grid">
            {CERTS.map((cert) => (
              <article key={cert.title} className="glass cert">
                <h4>{cert.title}</h4>
                <p>{cert.code}</p>
                <p>{cert.issuer}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="Contact" index={5} title="Let's Build Something Bold">
          <div className="glass contact">
            <p>Open to high-impact GenAI product and platform teams. Reach out directly:</p>
            <div className="contact-list">
              {CONTACT_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="contact-link" target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Section>

        <footer className="footer">
          <span>{"<MADHU />"} Generative AI Developer</span>
          <span>Premium motion portfolio with layered ambience</span>
        </footer>
      </main>
    </div>
  );
}
