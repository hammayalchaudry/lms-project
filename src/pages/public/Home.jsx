import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 🌍 TRANSLATIONS DICTIONARY
const translations = {
  English: {
    navHome: 'Home',
    navCourses: 'Courses',
    navWhyUs: 'Why Us',
    navReviews: 'Reviews',
    navFaq: 'FAQ',
    login: 'Log in',
    getStarted: '✨ Get Started',
    heroBadge: '🚀 Next-Gen AI Learning Platform',
    heroTitle1: 'Learn Smarter with ',
    heroTitle2: 'AI Assistance',
    heroDesc: 'Interactive courses, automated doubt solving, and personalized student dashboards designed to accelerate your growth.',
    exploreCourses: 'Explore Courses →',
    getStartedFree: 'Get Started Free',
    statStudents: 'Active Students',
    statCourses: 'Expert Courses',
    statSuccess: 'Success Rate',
    statSupport: 'AI Doubt Support',
    featuredTitle: 'Featured Courses',
    featuredDesc: 'Explore top-rated programs taught by industry leaders and boosted by AI.',
    enrollNow: 'Enroll Now',
    whyTitle: 'Why Choose AI LMS?',
    whyDesc: 'Designed to make modern learning faster, more engaging, and effective.',
    reviewsTitle: 'What Our Students Say',
    reviewsDesc: 'Real feedback from learners using AI LMS every day.',
    faqTitle: 'Frequently Asked Questions',
    faqDesc: 'Everything you need to know about AI LMS.',
    settingsTitle: '⚙️ Appearance & Settings',
    darkTheme: 'Dark Theme',
    darkThemeDesc: 'Switch between light and dark modes',
    textSize: 'Text Size',
    language: 'Language',
    savePref: 'Save Preferences'
  },
  Urdu: {
    navHome: 'ہوم',
    navCourses: 'کورسز',
    navWhyUs: 'ہم کیوں؟',
    navReviews: 'رائے',
    navFaq: 'سوالات',
    login: 'لاگ ان',
    getStarted: '✨ شروع کریں',
    heroBadge: '🚀 جدید ترین AI لرننگ پلیٹ فارم',
    heroTitle1: 'AI کی مدد سے ',
    heroTitle2: 'بہتر سیکھیں',
    heroDesc: 'انٹرایکٹو کورسز، خودکار سوالات کے جوابات، اور آپ کی ترقی کے لیے تیار کردہ خصوصی اسٹوڈنٹ ڈیش بورڈ۔',
    exploreCourses: 'کورسز دیکھیں ←',
    getStartedFree: 'مفت شروع کریں',
    statStudents: 'فعال طلباء',
    statCourses: 'ماہر کورسز',
    statSuccess: 'کامیابی کی شرح',
    statSupport: '24/7 AI معاونت',
    featuredTitle: 'نمایاں کورسز',
    featuredDesc: 'صنعت کے ماہرین کے بہترین کورسز جو AI سے لیس ہیں۔',
    enrollNow: 'ابھی شامل ہوں',
    whyTitle: 'AI LMS کا انتخاب کیوں کریں؟',
    whyDesc: 'جدید تعلیم کو تیز تر، دلچسپ اور موثر بنانے کے لیے ڈیزائن کیا گیا ہے۔',
    reviewsTitle: 'ہمارے طلباء کی رائے',
    reviewsDesc: 'روزانہ AI LMS استعمال کرنے والے طلباء کا حقیقی تاثر۔',
    faqTitle: 'عام طور پر پوچھے جانے والے سوالات',
    faqDesc: 'AI LMS کے بارے میں وہ سب کچھ جو آپ جاننا چاہتے ہیں۔',
    settingsTitle: '⚙️ ترتیبات اور سیٹنگز',
    darkTheme: 'ڈارک تھیم',
    darkThemeDesc: 'لائٹ اور ڈارک موڈ میں تبدیل کریں',
    textSize: 'لکھائی کا سائز',
    language: 'زبان',
    savePref: 'ترتیبات محفوظ کریں'
  },
  Spanish: {
    navHome: 'Inicio',
    navCourses: 'Cursos',
    navWhyUs: 'Por qué nosotros',
    navReviews: 'Reseñas',
    navFaq: 'Preguntas',
    login: 'Iniciar sesión',
    getStarted: '✨ Empezar',
    heroBadge: '🚀 Plataforma de Aprendizaje IA',
    heroTitle1: 'Aprende Mejor con ',
    heroTitle2: 'Asistencia IA',
    heroDesc: 'Cursos interactivos, resolución de dudas y paneles personalizados para acelerar tu crecimiento.',
    exploreCourses: 'Explorar Cursos →',
    getStartedFree: 'Comenzar Gratis',
    statStudents: 'Estudiantes Activos',
    statCourses: 'Cursos Especializados',
    statSuccess: 'Tasa de Éxito',
    statSupport: 'Soporte IA 24/7',
    featuredTitle: 'Cursos Destacados',
    featuredDesc: 'Explora programas impartidos por líderes y mejorados con IA.',
    enrollNow: 'Inscribirse',
    whyTitle: '¿Por qué elegir AI LMS?',
    whyDesc: 'Diseñado para hacer el aprendizaje moderno más rápido y efectivo.',
    reviewsTitle: 'Lo que dicen nuestros estudiantes',
    reviewsDesc: 'Comentarios reales de estudiantes que usan AI LMS a diario.',
    faqTitle: 'Preguntas Frecuentes',
    faqDesc: 'Todo lo que necesitas saber sobre AI LMS.',
    settingsTitle: '⚙️ Configuración y Apariencia',
    darkTheme: 'Tema Oscuro',
    darkThemeDesc: 'Cambiar entre modo claro y oscuro',
    textSize: 'Tamaño de Texto',
    language: 'Idioma',
    savePref: 'Guardar Preferencias'
  }
};

export default function Home() {
  const navigate = useNavigate();

  // States
  const [openFaq, setOpenFaq] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); 
  const [language, setLanguage] = useState('English');

  // Active Dictionary Selection
  const t = translations[language] || translations['English'];
  const isRtl = language === 'Urdu';

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Theme Config
  const theme = {
    bg: darkMode ? '#0F172A' : '#F8FAFC',
    cardBg: darkMode ? '#1E293B' : '#FFFFFF',
    textPrimary: darkMode ? '#F8FAFC' : '#0F172A',
    textSecondary: darkMode ? '#94A3B8' : '#64748B',
    border: darkMode ? '#334155' : '#E2E8F0',
    headerBg: darkMode ? '#1E293B' : '#FFFFFF',
    sectionAltBg: darkMode ? '#1E293B' : '#FFFFFF',
    footerBg: darkMode ? '#020617' : '#0F172A',
  };

  const fontMultiplier = fontSize === 'small' ? 0.9 : fontSize === 'large' ? 1.1 : 1;

  // Mock Courses Data
  const featuredCourses = [
    { id: 1, title: 'AI & Machine Learning Essentials', category: 'Artificial Intelligence', instructor: 'Dr. Aris Thorne', rating: '4.9', students: '1,240', price: '$49.99', icon: '🤖', badge: 'Bestseller' },
    { id: 2, title: 'Full-Stack Web Development', category: 'Web Development', instructor: 'Sarah Jenkins', rating: '4.8', students: '2,150', price: '$59.99', icon: '💻', badge: 'Popular' },
    { id: 3, title: 'Data Science & Python Bootcamp', category: 'Data Science', instructor: 'Michael Chen', rating: '4.9', students: '980', price: '$44.99', icon: '📊', badge: 'Hot' },
    { id: 4, title: 'UI/UX Design & Prototyping', category: 'Design', instructor: 'Emma Watson', rating: '4.7', students: '1,600', price: '$39.99', icon: '🎨', badge: 'New' },
    { id: 5, title: 'Cloud Computing & DevOps', category: 'DevOps', instructor: 'David Miller', rating: '4.8', students: '850', price: '$54.99', icon: '☁️', badge: 'Trending' },
    { id: 6, title: 'Cybersecurity Fundamentals', category: 'Security', instructor: 'Alex Rivera', rating: '4.9', students: '1,120', price: '$49.99', icon: '🛡️', badge: 'Bestseller' }
  ];

  const features = [
    { icon: '🤖', title: 'Personalized AI Tutor', desc: 'Get 24/7 instant assistance and personalized feedback on your learning path.' },
    { icon: '⚡', title: 'Adaptive Practice Quizzes', desc: 'Smart assessments that adapt to your knowledge level to strengthen weak areas.' },
    { icon: '📜', title: 'Verified Certifications', desc: 'Earn industry-recognized certificates upon completion to boost your resume.' },
    { icon: '🌐', title: 'Learn Anywhere, Anytime', desc: 'Access your coursework on desktop, tablet, or mobile seamlessly.' }
  ];

  const stats = [
    { number: '10,000+', label: t.statStudents },
    { number: '150+', label: t.statCourses },
    { number: '98%', label: t.statSuccess },
    { number: '24/7', label: t.statSupport }
  ];

  const reviews = [
    { name: 'Ayesha Khan', role: 'Computer Science Student', comment: 'The AI tutor feature is a game changer! It explains complex coding logic instantly.', avatar: '👩‍🎓', rating: '⭐⭐⭐⭐⭐' },
    { name: 'Bilal Ahmed', role: 'Frontend Developer', comment: 'The course quality is top-notch. I love how interactive the dashboards and quizzes are.', avatar: '👨‍💻', rating: '⭐⭐⭐⭐⭐' },
    { name: 'Zainab Fatima', role: 'UI/UX Designer', comment: 'AI LMS helped me transition my career path smoothly with structured modules.', avatar: '👩‍🎨', rating: '⭐⭐⭐⭐⭐' }
  ];

  const faqs = [
    { question: 'What is AI LMS and how does it work?', answer: 'AI LMS is an advanced learning management system powered by AI to provide interactive courses, instant doubt solving, personalized study tracks, and adaptive assessments.' },
    { question: 'Can I access the courses after enrollment forever?', answer: 'Yes! Once you enroll in any course, you get lifetime access to all learning materials, videos, and future updates.' },
    { question: 'How does the AI Assistance feature help me?', answer: 'The AI assistant acts as your personal tutor available 24/7 to answer questions, explain complex topics, and guide daily progress.' },
    { question: 'Will I get a certificate after completing a course?', answer: 'Absolutely! Upon completing all course modules and assessments, you will receive a verified shareable certificate.' }
  ];

  return (
    <div style={{ 
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif", 
      backgroundColor: theme.bg, 
      minHeight: '100vh', 
      color: theme.textPrimary,
      margin: 0,
      padding: 0,
      fontSize: `${16 * fontMultiplier}px`,
      direction: isRtl ? 'rtl' : 'ltr',
      transition: 'all 0.3s ease'
    }}>
      
      {/* Dynamic Hover Styles */}
      <style>{`
        .nav-link {
          text-decoration: none;
          color: ${theme.textSecondary};
          font-weight: 600;
          font-size: 15px;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: #2563EB;
          transform: translateY(-1px);
        }
        .btn-hover {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.4);
          opacity: 0.95;
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-color: #3B82F6 !important;
        }
        .icon-btn-hover {
          transition: transform 0.2s ease;
        }
        .icon-btn-hover:hover {
          transform: rotate(45deg);
        }
      `}</style>

      {/* 🔹 NAVBAR */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        padding: '16px 48px',
        backgroundColor: theme.headerBg,
        borderBottom: `1px solid ${theme.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease'
      }}>
        {/* Left: Logo */}
        <div 
          onClick={() => navigate('/')} 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1', cursor: 'pointer' }}
        >
          <div style={{
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            📖
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#2563EB', letterSpacing: '-0.5px' }}>
            AI LMS
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav style={{ 
          display: 'flex', 
          gap: '36px', 
          alignItems: 'center',
          justify: 'center',
          flex: '1'
        }}>
          <a href="#home" className="nav-link">{t.navHome}</a>
          <a href="#courses" className="nav-link">{t.navCourses}</a>
          <a href="#why-us" className="nav-link">{t.navWhyUs}</a>
          <a href="#reviews" className="nav-link">{t.navReviews}</a>
          <a href="#faq" className="nav-link">{t.navFaq}</a>
        </nav>

        {/* Right: Actions */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justify: 'flex-end',
          gap: '16px',
          flex: '1' 
        }}>
          <button
            onClick={() => setIsSettingsOpen(true)}
            title="Settings"
            className="icon-btn-hover"
            style={{
              background: 'none',
              border: `1px solid ${theme.border}`,
              color: theme.textPrimary,
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            ⚙️
          </button>

          <button 
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: theme.textPrimary,
              fontWeight: '600',
              fontSize: '15px',
              cursor: 'pointer',
              padding: '8px 12px'
            }}
          >
            {t.login}
          </button>
          
          <button 
            onClick={() => navigate('/signup')}
            className="btn-hover"
            style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '15px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {t.getStarted}
          </button>
        </div>
      </header>

      {/* ⚙️ SETTINGS MODAL */}
      {isSettingsOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '16px',
            width: '90%',
            maxWidth: '450px',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: theme.textPrimary }}>
                {t.settingsTitle}
              </h3>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: theme.textSecondary }}
              >
                ✖
              </button>
            </div>

            {/* Dark Mode */}
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: theme.textPrimary, display: 'block' }}>{t.darkTheme}</strong>
                <span style={{ fontSize: '13px', color: theme.textSecondary }}>{t.darkThemeDesc}</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  backgroundColor: darkMode ? '#2563EB' : '#E2E8F0',
                  border: 'none',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontWeight: '700',
                  color: darkMode ? '#FFFFFF' : '#0F172A',
                  cursor: 'pointer'
                }}
              >
                {darkMode ? '🌙 ON' : '☀️ OFF'}
              </button>
            </div>

            {/* Text Size */}
            <div style={{ marginBottom: '20px' }}>
              <strong style={{ color: theme.textPrimary, display: 'block', marginBottom: '8px' }}>{t.textSize}</strong>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: `1px solid ${fontSize === size ? '#2563EB' : theme.border}`,
                      backgroundColor: fontSize === size ? '#EFF6FF' : 'transparent',
                      color: fontSize === size ? '#2563EB' : theme.textPrimary,
                      fontWeight: '600',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div style={{ marginBottom: '28px' }}>
              <strong style={{ color: theme.textPrimary, display: 'block', marginBottom: '8px' }}>{t.language}</strong>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.bg,
                  color: theme.textPrimary,
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu (اردو)</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="btn-hover"
              style={{
                width: '100%',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer'
              }}
            >
              {t.savePref}
            </button>
          </div>
        </div>
      )}

      {/* 🚀 HERO SECTION */}
      <section id="home" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        textAlign: 'center',
        padding: '90px 20px 70px 20px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: darkMode ? '#1E3A8A' : '#EFF6FF',
          color: '#2563EB',
          padding: '8px 18px',
          borderRadius: '50px',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '32px',
          border: '1px solid #DBEAFE'
        }}>
          {t.heroBadge}
        </div>

        <h1 style={{
          fontSize: `${56 * fontMultiplier}px`,
          fontWeight: '900',
          lineHeight: '1.15',
          letterSpacing: '-1.5px',
          color: theme.textPrimary,
          margin: '0 0 24px 0'
        }}>
          {t.heroTitle1} <span style={{ color: '#2563EB' }}>{t.heroTitle2}</span>
        </h1>

        <p style={{
          fontSize: `${18 * fontMultiplier}px`,
          color: theme.textSecondary,
          maxWidth: '680px',
          lineHeight: '1.6',
          margin: '0 0 40px 0'
        }}>
          {t.heroDesc}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button 
            onClick={() => {
              const el = document.getElementById('courses');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-hover"
            style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              padding: '16px 36px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {t.exploreCourses}
          </button>

          <button 
            onClick={() => navigate('/signup')}
            className="btn-hover"
            style={{
              backgroundColor: theme.cardBg,
              color: theme.textPrimary,
              border: `1px solid ${theme.border}`,
              padding: '16px 28px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {t.getStartedFree}
          </button>
        </div>
      </section>

      {/* 📈 STATISTICS */}
      <section style={{ backgroundColor: theme.sectionAltBg, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`, padding: '40px 20px' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          textAlign: 'center'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div style={{ fontSize: '38px', fontWeight: '900', color: '#2563EB', marginBottom: '4px' }}>
                {stat.number}
              </div>
              <div style={{ fontSize: '15px', color: theme.textSecondary, fontWeight: '600' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📚 FEATURED COURSES */}
      <section id="courses" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: `${36 * fontMultiplier}px`, fontWeight: '800', color: theme.textPrimary, marginBottom: '12px' }}>
            {t.featuredTitle}
          </h2>
          <p style={{ fontSize: '16px', color: theme.textSecondary }}>
            {t.featuredDesc}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {featuredCourses.map((course) => (
            <div key={course.id} className="card-hover" style={{
              backgroundColor: theme.cardBg,
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${theme.border}`,
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '36px' }}>{course.icon}</span>
                  <span style={{
                    backgroundColor: darkMode ? '#1E3A8A' : '#EFF6FF',
                    color: '#2563EB',
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '20px'
                  }}>
                    {course.badge}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: '#2563EB', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {course.category}
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '700', color: theme.textPrimary, margin: '0 0 8px 0' }}>
                  {course.title}
                </h3>

                <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '0 0 16px 0' }}>
                  Instructor: <strong>{course.instructor}</strong>
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: theme.textSecondary, marginBottom: '20px' }}>
                  <span>⭐ {course.rating}</span>
                  <span>👥 {course.students}</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                borderTop: `1px solid ${theme.border}`,
                paddingTop: '16px'
              }}>
                <span style={{ fontSize: '22px', fontWeight: '800', color: theme.textPrimary }}>
                  {course.price}
                </span>
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-hover"
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {t.enrollNow}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✨ WHY CHOOSE US */}
      <section id="why-us" style={{ backgroundColor: theme.sectionAltBg, padding: '80px 20px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: `${36 * fontMultiplier}px`, fontWeight: '800', color: theme.textPrimary, marginBottom: '12px' }}>
              {t.whyTitle}
            </h2>
            <p style={{ fontSize: '16px', color: theme.textSecondary }}>
              {t.whyDesc}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {features.map((item, idx) => (
              <div key={idx} className="card-hover" style={{
                backgroundColor: theme.bg,
                padding: '30px 24px',
                borderRadius: '16px',
                border: `1px solid ${theme.border}`
              }}>
                <div style={{
                  backgroundColor: darkMode ? '#1E3A8A' : '#EFF6FF',
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  fontSize: '26px',
                  marginBottom: '20px'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: theme.textPrimary, marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: '1.6', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 REVIEWS */}
      <section id="reviews" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: `${36 * fontMultiplier}px`, fontWeight: '800', color: theme.textPrimary, marginBottom: '12px' }}>
            {t.reviewsTitle}
          </h2>
          <p style={{ fontSize: '16px', color: theme.textSecondary }}>
            {t.reviewsDesc}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {reviews.map((rev, idx) => (
            <div key={idx} className="card-hover" style={{
              backgroundColor: theme.cardBg,
              padding: '28px',
              borderRadius: '16px',
              border: `1px solid ${theme.border}`,
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '14px', marginBottom: '16px' }}>{rev.rating}</div>
                <p style={{ fontSize: '15px', color: theme.textSecondary, lineHeight: '1.6', fontStyle: 'italic', marginBottom: '24px' }}>
                  "{rev.comment}"
                </p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '32px' }}>{rev.avatar}</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: theme.textPrimary, margin: 0 }}>
                    {rev.name}
                  </h4>
                  <span style={{ fontSize: '13px', color: theme.textSecondary }}>
                    {rev.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ❓ FAQ */}
      <section id="faq" style={{ backgroundColor: theme.sectionAltBg, padding: '80px 20px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: `${36 * fontMultiplier}px`, fontWeight: '800', color: theme.textPrimary, marginBottom: '12px' }}>
              {t.faqTitle}
            </h2>
            <p style={{ fontSize: '16px', color: theme.textSecondary }}>
              {t.faqDesc}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                style={{
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: theme.bg
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    textAlign: isRtl ? 'right' : 'left',
                    background: 'none',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: theme.textPrimary,
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.question}</span>
                  <span style={{ fontSize: '20px', color: '#2563EB' }}>
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                
                {openFaq === idx && (
                  <div style={{
                    padding: '0 24px 20px 24px',
                    fontSize: '15px',
                    color: theme.textSecondary,
                    lineHeight: '1.6',
                    borderTop: `1px solid ${theme.border}`,
                    backgroundColor: theme.cardBg
                  }}>
                    <p style={{ marginTop: '16px', marginBottom: 0 }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📌 FOOTER */}
      <footer style={{
        backgroundColor: theme.footerBg,
        color: '#94A3B8',
        padding: '60px 48px 30px 48px',
        borderTop: '1px solid #1E293B'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                📖
              </div>
              <span style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>
                AI LMS
              </span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#94A3B8' }}>
              Empowering global learners with next-generation artificial intelligence.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#home" style={{ color: '#94A3B8', textDecoration: 'none' }}>{t.navHome}</a></li>
              <li><a href="#courses" style={{ color: '#94A3B8', textDecoration: 'none' }}>{t.navCourses}</a></li>
              <li><a href="#why-us" style={{ color: '#94A3B8', textDecoration: 'none' }}>{t.navWhyUs}</a></li>
              <li><a href="#faq" style={{ color: '#94A3B8', textDecoration: 'none' }}>{t.navFaq}</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Get In Touch</h4>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              Email: support@ailms.com<br/>
              Phone: +1 (555) 000-1234
            </p>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid #1E293B',
          paddingTop: '24px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#64748B'
        }}>
          © {new Date().getFullYear()} AI LMS. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
