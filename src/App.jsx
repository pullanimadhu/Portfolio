import { useEffect, useRef, useState } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Certifications", "Contact"];

const PROJECTS = [
  {
    title: "iR2D - Multi-LLM Orchestration Platform",
    period: "2024 - Present",
    tech: ["LangGraph", "Multi-Agent", "RAG", "SAP", "LangChain", "OpenAI"],
    description:
      "Owned the Functional Spec Agent end-to-end on a platform orchestrating multiple LLMs for user story processing, design documents, code generation, code review, and test management.",
    metrics: [
      { value: "50-60%", label: "Documentation effort reduced" },
      { value: "40%", label: "Code dev/review cycles cut" },
      { value: "30%", label: "Training content generation saved" },
    ],
    color: "#00f5a0",
  },
  {
    title: "P2P Assistant - Vendor Self-Service Chatbot",
    period: "Feb 2025 - Aug 2025",
    tech: ["LangChain", "SAP S/4HANA", "ServiceNow", "FastAPI", "Python"],
    description:
      "Built a conversational AI assistant letting vendors autonomously check PO status and raise ServiceNow tickets with secure role-based access across enterprise ERP systems.",
    metrics: [
      { value: "3x", label: "Enterprise systems integrated" },
      { value: "REST", label: "SAP and ServiceNow APIs" },
    ],
    color: "#00b4d8",
  },
  {
    title: "Data Insights - Intelligent Analytics Platform",
    period: "Oct 2024 - Jan 2025",
    tech: ["LangGraph", "SQL Agents", "NLP", "ReactJS", "Python"],
    description:
      "NLP-powered platform translating natural language to SQL, delivering dynamic bar/pie/line chart visualizations with automated narrative insights for business decision-making.",
    metrics: [
      { value: "90%", label: "NL-to-SQL accuracy" },
      { value: "3", label: "Viz types auto-generated" },
      { value: "E2E", label: "Ingest -> Query -> Dashboard" },
    ],
    color: "#f72585",
  },
];

const SKILLS = {
  "Generative AI and LLMs": ["LangChain", "LangGraph", "CrewAI", "OpenAI GPT", "Claude", "Gemini", "LLaMA", "Ollama", "Hugging Face"],
  "AI Techniques": ["RAG", "Prompt Engineering", "Multi-Agent Systems", "Agentic Workflows", "NeMo Guardrails", "Cache Augmented Generation"],
  Languages: ["Python", "JavaScript", "Java", "SQL", "C"],
  "Web and APIs": ["ReactJS", "FastAPI", "Flask", "Django", "Node.js", "RESTful APIs"],
  "Databases and Vector": ["PostgreSQL", "MongoDB", "Neo4j", "FAISS", "Chroma", "Redis"],
  Cloud: ["Azure AI Services", "AWS", "Google Cloud Platform", "Azure ML"],
  "ML and Data": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Apache Spark"],
  Integrations: ["SAP S/4HANA REST APIs", "ServiceNow", "Brainware", "PowerBI"],
};

const CERTS = [
  { title: "Azure AI Engineer Associate", code: "AI-102", issuer: "Microsoft", color: "#0078d4" },
  { title: "Generative AI Developer", code: "SAP Certified", issuer: "SAP", color: "#f0ab00" },
  { title: "Data Analytics Real-World Projects in Python", code: "Udemy", issuer: "Udemy", color: "#a435f0" },
  { title: "Programming in Java", code: "NPTEL", issuer: "NPTEL", color: "#00a86b" },
  { title: "Artificial Intelligence", code: "Personifwy-1stop", issuer: "1stop", color: "#ff6b35" },
];

const CONTACT_LINKS = [
  { icon: "@", label: "madhupullani111@gmail.com", href: "mailto:madhupullani111@gmail.com", external: false },
  { icon: "in", label: "linkedin.com/in/madhu001", href: "https://linkedin.com/in/madhu001", external: true },
  { icon: "gh", label: "github.com/pullanimadhu", href: "https://github.com/pullanimadhu", external: true },
  { icon: "ph", label: "+91-9491163517", href: "tel:+919491163517", external: false },
];

function useInView(threshold = 0.15) {
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

function GlitchText({ text, className = "" }) {
  return (
    <span className={`glitch ${className}`} data-text={text} style={{ position: "relative", display: "inline-block" }}>
      {text}
    </span>
  );
}

function Section({ id, children }) {
  const [ref, visible] = useInView();

  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        padding: "80px 0",
      }}
    >
      {children}
    </section>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Generative AI Developer";

  const cursorRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i += 1;
      if (i >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    const canUseFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!canUseFinePointer) return undefined;

    let rafId = null;

    const renderCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseRef.current.x}px, ${mouseRef.current.y}px)`;
      }
      rafId = null;
    };

    const handleMouseMove = (event) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      if (!rafId) rafId = window.requestAnimationFrame(renderCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "#080b10", color: "#e0e6ef", fontFamily: "'Courier New', Courier, monospace", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { cursor: auto; }

        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          border: 1.5px solid #00f5a0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          left: 0;
          top: 0;
          transform: translate(-200px, -200px);
          transition: background 0.2s;
          mix-blend-mode: exclusion;
        }

        .scan-line {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9998;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,160,0.015) 2px, rgba(0,245,160,0.015) 4px);
        }

        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .glitch::before {
          animation: glitch1 3s infinite;
          color: #f72585;
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
          transform: translateX(-2px);
        }

        .glitch::after {
          animation: glitch2 3s infinite;
          color: #00b4d8;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
          transform: translateX(2px);
        }

        @keyframes glitch1 {
          0%, 94%, 100% { opacity: 0; }
          95% { opacity: 1; transform: translateX(-3px) skewX(-5deg); }
        }

        @keyframes glitch2 {
          0%, 96%, 100% { opacity: 0; }
          97% { opacity: 1; transform: translateX(3px) skewX(3deg); }
        }

        .blink { animation: blink 1s step-end infinite; }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .metric-card:hover { transform: scale(1.05); }
        .metric-card { transition: transform 0.2s; }

        .tag {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 3px;
          font-size: 11px;
          font-family: 'Share Tech Mono', monospace;
          background: rgba(0,245,160,0.08);
          border: 1px solid rgba(0,245,160,0.25);
          color: #00f5a0;
          margin: 3px 3px 3px 0;
        }

        .nav-link {
          cursor: pointer;
          transition: color 0.2s;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 1px;
          border: none;
          background: transparent;
          padding: 0;
        }

        .nav-link:hover,
        .nav-link:focus-visible { color: #00f5a0 !important; }

        .desktop-nav {
          display: flex;
          gap: 28px;
        }

        .mobile-nav-toggle {
          display: none;
          border: 1px solid rgba(0,245,160,0.4);
          color: #00f5a0;
          background: transparent;
          padding: 8px 10px;
          font-family: 'Share Tech Mono', monospace;
          letter-spacing: 1px;
        }

        .mobile-nav-panel {
          display: none;
        }

        .cert-card:hover { border-color: rgba(0,245,160,0.5) !important; transform: translateY(-4px); }
        .cert-card { transition: border-color 0.2s, transform 0.2s; }

        .skill-pill {
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-family: 'Share Tech Mono', monospace;
          margin: 4px;
          display: inline-block;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }

        .skill-pill:hover {
          background: rgba(0,245,160,0.12);
          border-color: #00f5a0;
          color: #00f5a0;
        }

        .project-card { transition: transform 0.25s, box-shadow 0.25s; }
        .project-card:hover { transform: translateY(-6px); }

        .cta-button {
          padding: 12px 28px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 2px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cta-button:hover { transform: translateY(-2px); }

        .cta-primary {
          background: #00f5a0;
          color: #080b10;
          border: none;
          font-weight: 700;
        }

        .cta-secondary {
          background: transparent;
          color: #00f5a0;
          border: 1px solid rgba(0,245,160,0.4);
        }

        .cta-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080b10; }
        ::-webkit-scrollbar-thumb { background: #00f5a0; border-radius: 2px; }

        .section-label {
          font-family: 'Share Tech Mono', monospace;
          color: #00f5a0;
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, rgba(0,245,160,0.4), transparent);
        }

        .section-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          letter-spacing: 1px;
          color: #fff;
          margin-bottom: 48px;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: linear-gradient(rgba(0,245,160,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,160,1) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .desktop-nav { display: none; }
          .mobile-nav-toggle { display: inline-flex; }
          .mobile-nav-panel {
            position: fixed;
            top: 60px;
            right: 16px;
            left: 16px;
            z-index: 101;
            background: rgba(8,11,16,0.98);
            border: 1px solid rgba(0,245,160,0.2);
            display: flex;
            flex-direction: column;
            padding: 12px;
            gap: 10px;
          }

          .mobile-nav-item {
            border: 1px solid rgba(255,255,255,0.1);
            background: transparent;
            color: #c7d2e1;
            font-family: 'Share Tech Mono', monospace;
            font-size: 13px;
            letter-spacing: 1px;
            padding: 10px;
            text-align: left;
          }

          .mobile-nav-item.active {
            border-color: rgba(0,245,160,0.6);
            color: #00f5a0;
          }
        }

        @media (max-width: 720px) {
          .cta-row {
            display: grid;
            grid-template-columns: 1fr;
          }
        }

        @media (pointer: coarse), (prefers-reduced-motion: reduce) {
          .custom-cursor,
          .scan-line {
            display: none;
          }
        }
      `}</style>

      <div ref={cursorRef} className="custom-cursor" />
      <div className="scan-line" />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(8,11,16,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,245,160,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 clamp(16px, 5vw, 60px)",
          height: "60px",
        }}
      >
        <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00f5a0", fontSize: 16, letterSpacing: 2 }}>
          {"<MADHU />"}
        </div>

        <div className="desktop-nav" role="navigation" aria-label="Section navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              type="button"
              className="nav-link"
              onClick={() => scrollTo(link)}
              style={{ color: activeSection === link ? "#00f5a0" : "#6b7a8d" }}
              aria-label={`Go to ${link}`}
            >
              {link}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          MENU
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-nav-panel" role="navigation" aria-label="Mobile section navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              type="button"
              className={`mobile-nav-item ${activeSection === link ? "active" : ""}`}
              onClick={() => scrollTo(link)}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 5vw, 48px)" }}>
        <section id="About" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 60, position: "relative" }}>
          <div className="grid-bg" />

          <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00f5a0", fontSize: 13, letterSpacing: 3, marginBottom: 20 }}>
            // PULLANI MADHU
          </div>

          <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 700, lineHeight: 1.05, color: "#fff", marginBottom: 20 }}>
            <GlitchText text="Generative AI" />
            <br />
            <span style={{ color: "#00f5a0" }}>Developer</span>
          </h1>

          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 14, color: "#6b7a8d", maxWidth: 560, lineHeight: 1.8, marginBottom: 16 }}>
            {typedText}
            <span className="blink">_</span>
          </p>

          <p style={{ color: "#8892a4", maxWidth: 680, lineHeight: 1.8, marginBottom: 12, fontFamily: "'Rajdhani', sans-serif", fontSize: 18 }}>
            2 years at TCS building production-grade AI solutions with LangGraph orchestration, RAG pipelines, multi-agent systems, and LLM automation across SAP S/4HANA and ServiceNow.
          </p>

          <p style={{ color: "#6b7a8d", maxWidth: 680, lineHeight: 1.7, marginBottom: 48, fontFamily: "'Share Tech Mono', monospace", fontSize: 13, letterSpacing: 1 }}>
            Actively seeking Generative AI Engineer, LLM Engineer, and AI Platform Engineer roles.
          </p>

          <div className="cta-row" style={{ marginBottom: 20 }}>
            <button type="button" onClick={() => scrollTo("Projects")} className="cta-button cta-primary">
              VIEW PROJECTS {"->"}
            </button>

            <a className="cta-button cta-secondary" href={`${import.meta.env.BASE_URL}Madhu_latest_resume.pdf`} download>
              DOWNLOAD RESUME
            </a>

            <a className="cta-button cta-secondary" href={`${import.meta.env.BASE_URL}Madhu_latest_resume.pdf`} target="_blank" rel="noreferrer">
              VIEW RESUME
            </a>

            <a className="cta-button cta-secondary" href="https://linkedin.com/in/madhu001" target="_blank" rel="noreferrer">
              LINKEDIN
            </a>

            <a className="cta-button cta-secondary" href="https://github.com/pullanimadhu" target="_blank" rel="noreferrer">
              GITHUB
            </a>
          </div>

          <div style={{ display: "flex", gap: 40, marginTop: 50, flexWrap: "wrap" }}>
            {[
              ["2+", "Years at TCS"],
              ["3", "Key Projects"],
              ["90%", "NL-to-SQL Accuracy"],
              ["50-60%", "Docs Effort Saved"],
            ].map(([value, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 32, fontWeight: 700, color: "#00f5a0" }}>{value}</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "#6b7a8d", letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        <Section id="Experience">
          <div className="section-label">01 Experience</div>
          <div className="section-title">Work History</div>

          <div style={{ borderLeft: "2px solid rgba(0,245,160,0.2)", paddingLeft: 32, position: "relative" }}>
            <div style={{ position: "absolute", left: -7, top: 8, width: 12, height: 12, background: "#00f5a0", borderRadius: "50%" }} />

            <div style={{ marginBottom: 8 }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff" }}>Generative AI Developer</span>
            </div>

            <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: "#00f5a0" }}>Tata Consultancy Services (TCS)</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: "#6b7a8d" }}>June 2024 - Present | India</span>
            </div>

            {[
              "Contributed to the iR2D Multi-LLM Orchestration Platform by owning the Functional Spec Agent pipeline including RAG design, agent orchestration, prompt engineering, and LangGraph integration.",
              "Developed the P2P Assistant enabling vendors to check PO status and raise ServiceNow tickets through SAP S/4HANA, Brainware, and ServiceNow REST integrations.",
              "Built the Data Insights Assistant, an NLP-driven SQL agent with 90% query-to-SQL accuracy and business dashboards in ReactJS.",
              "Implemented RAG pipelines and multi-agent workflows to automate SAP documentation generation, including BRDs, Functional Specs, Test Cases, Technical Specs, and ABAP code.",
              "Contributed to a 50-60% reduction in documentation effort and a 40% reduction in code development/review cycles.",
            ].map((point, idx) => (
              <div key={idx} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <span style={{ color: "#00f5a0", fontFamily: "'Share Tech Mono', monospace", fontSize: 13, flexShrink: 0, marginTop: 2 }}>{">"}</span>
                <p style={{ color: "#8892a4", lineHeight: 1.7, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>{point}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="Projects">
          <div className="section-label">02 Projects</div>
          <div className="section-title">Key Projects and Impact</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className="project-card"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: `3px solid ${project.color}`,
                  padding: "32px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "#6b7a8d" }}>{project.period}</div>

                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{project.title}</h3>
                <p style={{ color: "#8892a4", lineHeight: 1.7, marginBottom: 20, fontFamily: "'Rajdhani', sans-serif", fontSize: 16, maxWidth: 700 }}>{project.description}</p>

                <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
                  {project.metrics.map((metric, mIndex) => (
                    <div
                      key={mIndex}
                      className="metric-card"
                      style={{
                        background: `rgba(${project.color === "#00f5a0" ? "0,245,160" : project.color === "#00b4d8" ? "0,180,216" : "247,37,133"},0.07)`,
                        border: `1px solid ${project.color}33`,
                        padding: "12px 20px",
                        borderRadius: 4,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 700, color: project.color }}>{metric.value}</div>
                      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#6b7a8d", marginTop: 2 }}>{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div>{project.tech.map((tech) => <span key={tech} className="tag">{tech}</span>)}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="Skills">
          <div className="section-label">03 Skills</div>
          <div className="section-title">Technical Arsenal</div>

          <div style={{ marginBottom: 18, color: "#6b7a8d", fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: 1 }}>
            Production stack focus: LangGraph, RAG, SAP + ServiceNow integrations, FastAPI, ReactJS, Python.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "24px" }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "#00f5a0", letterSpacing: 2, marginBottom: 14, textTransform: "uppercase" }}>
                  {category}
                </div>
                <div>{items.map((skill) => <span key={skill} className="skill-pill">{skill}</span>)}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="Certifications">
          <div className="section-label">04 Certifications</div>
          <div className="section-title">Credentials</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {CERTS.map((cert, idx) => (
              <div key={idx} className="cert-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: cert.color }} />

                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: cert.color, letterSpacing: 2, marginBottom: 10 }}>
                  {cert.issuer.toUpperCase()}
                </div>

                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 600, color: "#e0e6ef", lineHeight: 1.4, marginBottom: 8 }}>
                  {cert.title}
                </div>

                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "#6b7a8d" }}>{cert.code}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="Contact">
          <div className="section-label">05 Contact</div>
          <div className="section-title">Let's Connect</div>

          <div style={{ background: "rgba(0,245,160,0.03)", border: "1px solid rgba(0,245,160,0.15)", padding: "48px", maxWidth: 650 }}>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 18, color: "#8892a4", lineHeight: 1.7, marginBottom: 36 }}>
              I am actively looking for new opportunities in Generative AI, LLM engineering, and multi-agent systems. Open to impactful product and platform roles.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {CONTACT_LINKS.map(({ icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    textDecoration: "none",
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 14,
                    color: "#8892a4",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "#00f5a0";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "#8892a4";
                  }}
                >
                  <span style={{ color: "#00f5a0", width: 22, textAlign: "center", fontSize: 12, textTransform: "uppercase", border: "1px solid rgba(0,245,160,0.3)", padding: "3px 0" }}>
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px clamp(16px,5vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: "#3a4150" }}>{"<MADHU /> | Generative AI Developer"}</span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: "#3a4150" }}>| Open to opportunities</span>
      </div>
    </div>
  );
}
