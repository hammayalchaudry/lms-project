import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

  // Student Profile State
  const [profile, setProfile] = useState({
    name: 'Student User',
    email: 'student@edupulse.com',
    role: 'Full Stack Web Student',
    bio: 'Passionate developer learning web development and AI.'
  });

  // Edit Profile States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...profile });

  // Profile Edit Handlers
  const handleEditClick = () => {
    setEditFormData({ ...profile });
    setIsEditingProfile(true);
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(editFormData);
    setIsEditingProfile(false);
    alert('🎉 Profile updated successfully!');
  };

  // Courses Data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Full-Stack MERN Web Development Masterclass',
      category: 'Web Development',
      instructor: 'Sir Ahmad',
      description: 'Master MongoDB, Express.js, React, and Node.js with real-world industry applications.',
      enrolled: true,
      progress: 65,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
      lessons: [
        { id: 101, title: '01. React Fundamentals & Virtual DOM Explained', duration: '15:20', videoEmbedId: 'w7ejDZ8SWv8', pdf: 'React_Fundamentals_Guide.pdf' },
        { id: 102, title: '02. State Management & React Hooks', duration: '22:45', videoEmbedId: 'TNhaISOUy6Q', pdf: 'React_Hooks_CheatSheet.pdf' },
        { id: 103, title: '03. Node.js Architecture & Express API Routing', duration: '18:10', videoEmbedId: 'Oe421EPjeBE', pdf: 'Express_Routing_Docs.pdf' }
      ]
    },
    {
      id: 2,
      title: 'Python for Artificial Intelligence & Data Science',
      category: 'Data Science & AI',
      instructor: 'Dr. Usman',
      description: 'Learn Python programming, NumPy, Pandas, and Machine Learning algorithms.',
      enrolled: true,
      progress: 40,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      lessons: [
        { id: 201, title: '01. Python Syntax & Control Structures', duration: '12:30', videoEmbedId: '_uQrJ0TkZlc', pdf: 'Python_Basics.pdf' },
        { id: 202, title: '02. Data Science with Pandas & NumPy', duration: '28:15', videoEmbedId: 'vmEHCJofslg', pdf: 'Data_Science_Pandas.pdf' }
      ]
    },
    {
      id: 3,
      title: 'UI/UX Design Systems & Figma Auto-Layout 3.0',
      category: 'Design Systems',
      instructor: 'Maam Ayesha',
      description: 'Design interactive mobile and web prototypes using Figma.',
      enrolled: true,
      progress: 85,
      thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
      lessons: [
        { id: 301, title: '01. Figma Interface & Prototyping Basics', duration: '14:00', videoEmbedId: 'FTFaQWZBqQ8', pdf: 'Figma_UI_Components.pdf' }
      ]
    }
  ]);

  // Active Learning States
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  // AI Chat State
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your Smart AI Tutor. How can I assist you with your studies today?' }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Enroll Handler
  const handleEnroll = (courseId) => {
    setCourses(courses.map(c => c.id === courseId ? { ...c, enrolled: true, progress: 5 } : c));
    alert('🎉 Success! You have enrolled in this course.');
    setSelectedCourseDetails(null);
  };

  // SMART AI ENGINE
  const generateAiAnswerInEnglish = (userQuery) => {
    const q = userQuery.toLowerCase().trim();

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return "Hello! How can I help you with your learning today?";
    } else if (q.includes('name') || q.includes('who are you')) {
      return "I am your EduPulse AI Tutor, built to assist you with programming, general knowledge, and course materials!";
    } else if (q.includes('react')) {
      return "React is an open-source JavaScript library developed by Meta for building dynamic user interfaces based on reusable components.";
    } else {
      return `That's a great question regarding "${userQuery}". Feel free to ask more specific questions about React, Python, UI/UX, or general programming concepts!`;
    }
  };

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userText = question;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setQuestion('');
    setAiLoading(true);

    setTimeout(() => {
      const reply = generateAiAnswerInEnglish(userText);
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setAiLoading(false);
    }, 400);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F1F5F9', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      
      {/* SIDEBAR NAVIGATION (Dark Slate - #0F172A) */}
      <aside style={{ width: '270px', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 18px', boxShadow: '4px 0 15px rgba(0,0,0,0.05)' }}>
        <div>
          {/* Logo Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid #1E293B', marginBottom: '28px' }}>
            <div style={{ backgroundColor: '#6366F1', padding: '10px 14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '20px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)' }}>⚡</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', letterSpacing: '0.5px', color: '#FFFFFF' }}>EduPulse <span style={{ color: '#F59E0B' }}>LMS</span></h3>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '500' }}>AI Powered Platform</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => { setActiveTab('dashboard'); setSelectedCourse(null); }}
              style={{
                padding: '12px 18px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: activeTab === 'dashboard' && !selectedCourse ? '#6366F1' : 'transparent',
                color: activeTab === 'dashboard' && !selectedCourse ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeTab === 'dashboard' && !selectedCourse ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              📊 Dashboard
            </button>

            <button
              onClick={() => { setActiveTab('analytics'); setSelectedCourse(null); }}
              style={{
                padding: '12px 18px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: activeTab === 'analytics' && !selectedCourse ? '#6366F1' : 'transparent',
                color: activeTab === 'analytics' && !selectedCourse ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeTab === 'analytics' && !selectedCourse ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              📈 Analytics
            </button>

            <button
              onClick={() => { setActiveTab('aitutor'); setSelectedCourse(null); }}
              style={{
                padding: '12px 18px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: activeTab === 'aitutor' && !selectedCourse ? '#6366F1' : 'transparent',
                color: activeTab === 'aitutor' && !selectedCourse ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeTab === 'aitutor' && !selectedCourse ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                🤖 Smart AI Tutor
              </div>
              <span style={{ backgroundColor: '#F59E0B', color: '#0F172A', fontSize: '10px', padding: '2px 6px', borderRadius: '6px', fontWeight: 'bold' }}>AI</span>
            </button>

            <button
              onClick={() => { setActiveTab('courses'); setSelectedCourse(null); }}
              style={{
                padding: '12px 18px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: activeTab === 'courses' && !selectedCourse ? '#6366F1' : 'transparent',
                color: activeTab === 'courses' && !selectedCourse ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeTab === 'courses' && !selectedCourse ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              📚 View Courses
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              style={{
                padding: '12px 18px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: activeTab === 'profile' ? '#6366F1' : 'transparent',
                color: activeTab === 'profile' ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeTab === 'profile' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              👤 Profile
            </button>
          </nav>
        </div>

        {/* Bottom User Card */}
        <div style={{ backgroundColor: '#1E293B', padding: '14px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFFFFF' }}>{profile.name}</div>
            <div style={{ fontSize: '11px', color: '#F59E0B', fontWeight: '600' }}>Active Student</div>
          </div>
          <Link to="/login" style={{ color: '#F87171', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Logout</Link>
        </div>
      </aside>

      {/* MAIN BODY AREA */}
      <main style={{ flex: 1, padding: '36px', overflowY: 'auto' }}>
        
        {/* Top Header Section */}
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>
            {selectedCourse 
              ? selectedCourse.title 
              : activeTab === 'dashboard' 
              ? 'Student Dashboard' 
              : activeTab === 'analytics' 
              ? 'Performance Analytics' 
              : activeTab === 'aitutor' 
              ? 'Smart AI Assistant' 
              : activeTab === 'courses' 
              ? 'Browse All Courses' 
              : 'Profile Settings'}
          </h1>
          <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#64748B' }}>
            {activeTab === 'aitutor' ? 'Ask any coding or study question to get instant AI help.' : 'Welcome back! Here is your active learning progress.'}
          </p>
        </header>

        {/* 1. DASHBOARD TAB */}
        {activeTab === 'dashboard' && !selectedCourse && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#0F172A', fontWeight: '700' }}>Enrolled Courses ({courses.filter(c => c.enrolled).length})</h3>
              <span style={{ fontSize: '13px', color: '#6366F1', fontWeight: '600' }}>Ongoing Learning</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
              {courses.filter(c => c.enrolled).map(course => (
                <div key={course.id} style={{ backgroundColor: '#FFFFFF', padding: '22px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', gap: '18px', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)' }}>
                  <img src={course.thumbnail} alt="" style={{ width: '120px', height: '85px', borderRadius: '10px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '11px', color: '#6366F1', fontWeight: 'bold', textTransform: 'uppercase' }}>{course.category}</span>
                    <h4 style={{ margin: '2px 0 6px 0', fontSize: '15px', color: '#0F172A', fontWeight: '700' }}>{course.title}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Instructor: {course.instructor}</p>
                    
                    {/* Success Green Progress Bar (#22C55E) */}
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569', marginBottom: '4px', fontWeight: '600' }}>
                        <span>Progress</span>
                        <span style={{ color: '#22C55E' }}>{course.progress}%</span>
                      </div>
                      <div style={{ width: '100%', backgroundColor: '#E2E8F0', height: '7px', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${course.progress}%`, backgroundColor: '#22C55E', height: '100%', borderRadius: '10px' }}></div>
                      </div>
                    </div>

                    {/* Amber CTA Button (#F59E0B) */}
                    <button
                      onClick={() => { setSelectedCourse(course); setActiveLesson(course.lessons[0]); }}
                      style={{ marginTop: '14px', backgroundColor: '#F59E0B', color: '#0F172A', border: 'none', padding: '9px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', boxShadow: '0 2px 8px rgba(245, 158, 11, 0.25)' }}
                    >
                      Watch Lessons →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. ANALYTICS TAB (WITH PIE CHART, BAR CHART & LINE CHART) */}
        {activeTab === 'analytics' && !selectedCourse && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            
            {/* PIE CHART SECTION */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '26px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0F172A', fontWeight: '700' }}>🥧 Category Breakdown</h3>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Time distribution across subjects</span>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '24px' }}>
                <svg viewBox="0 0 36 36" style={{ width: '140px', height: '140px', transform: 'rotate(-90deg)' }}>
                  {/* Segment 1: Web Dev (45%) */}
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#6366F1" strokeWidth="3.8" strokeDasharray="45 55" strokeDashoffset="0"></circle>
                  {/* Segment 2: AI & Data (35%) */}
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#22C55E" strokeWidth="3.8" strokeDasharray="35 65" strokeDashoffset="-45"></circle>
                  {/* Segment 3: UI/UX (20%) */}
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F59E0B" strokeWidth="3.8" strokeDasharray="20 80" strokeDashoffset="-80"></circle>
                </svg>

                {/* Pie Chart Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>
                    <span style={{ width: '12px', height: '12px', backgroundColor: '#6366F1', borderRadius: '3px' }}></span>
                    Web Dev (45%)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>
                    <span style={{ width: '12px', height: '12px', backgroundColor: '#22C55E', borderRadius: '3px' }}></span>
                    Data & AI (35%)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>
                    <span style={{ width: '12px', height: '12px', backgroundColor: '#F59E0B', borderRadius: '3px' }}></span>
                    UI/UX Design (20%)
                  </div>
                </div>
              </div>
            </div>

            {/* BAR CHART */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '26px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0F172A', fontWeight: '700' }}>📊 Completion Progress</h3>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Track completed module percentages</span>

              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '150px', marginTop: '24px', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
                {courses.map((c, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#6366F1' }}>{c.progress}%</span>
                    <div style={{ width: '40px', height: `${c.progress * 1.2}px`, backgroundColor: i === 0 ? '#6366F1' : i === 1 ? '#22C55E' : '#F59E0B', borderRadius: '6px 6px 0 0' }}></div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Course {c.id}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LINE CHART */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '26px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0F172A', fontWeight: '700' }}>📈 Weekly Activity</h3>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Hours spent studying</span>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <svg viewBox="0 0 300 100" style={{ width: '100%', height: '120px', overflow: 'visible' }}>
                  <line x1="0" y1="20" x2="300" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="60" x2="300" y2="60" stroke="#F1F5F9" strokeWidth="1" />

                  <path
                    d="M 10 80 L 60 60 L 110 30 L 160 70 L 210 15 L 260 40 L 290 10"
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="3"
                  />
                  
                  {[[10, 80], [60, 60], [110, 30], [160, 70], [210, 15], [260, 40], [290, 10]].map(([x, y], idx) => (
                    <circle key={idx} cx={x} cy={y} r="4" fill="#F59E0B" stroke="#6366F1" strokeWidth="2" />
                  ))}
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', marginTop: '10px', fontWeight: '600' }}>
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 3. AI TUTOR TAB */}
        {activeTab === 'aitutor' && !selectedCourse && (
          <div style={{ maxWidth: '850px', backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', height: '600px', boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.1)' }}>
            <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ backgroundColor: '#EEF2FF', padding: '12px', borderRadius: '12px', fontSize: '22px', border: '1px solid #6366F1' }}>🤖</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#0F172A', fontWeight: '700' }}>Smart AI Assistant</h3>
                <span style={{ fontSize: '12px', color: '#6366F1', fontWeight: '600' }}>Powered by Violet AI Engine</span>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '8px' }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: m.sender === 'user' ? '#6366F1' : '#F1F5F9', color: m.sender === 'user' ? '#FFFFFF' : '#0F172A', padding: '12px 18px', borderRadius: '14px', fontSize: '14px', maxWidth: '78%', lineHeight: '1.5' }}>
                  {m.text}
                </div>
              ))}
              {aiLoading && <div style={{ fontSize: '13px', color: '#6366F1', fontStyle: 'italic', fontWeight: '500' }}>AI Tutor is thinking...</div>}
            </div>

            <form onSubmit={handleAskAI} style={{ display: 'flex', gap: '12px', marginTop: '18px' }}>
              <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask anything in English..." style={{ flex: 1, padding: '14px 18px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '14px', outline: 'none' }} />
              <button type="submit" style={{ backgroundColor: '#F59E0B', color: '#0F172A', border: 'none', padding: '14px 26px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)' }}>Ask Question</button>
            </form>
          </div>
        )}

        {/* 4. VIEW COURSES TAB */}
        {activeTab === 'courses' && !selectedCourse && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {courses.map(course => (
              <div key={course.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)' }}>
                <div>
                  <img src={course.thumbnail} alt="" style={{ width: '100%', height: '165px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '11px', color: '#6366F1', fontWeight: 'bold', textTransform: 'uppercase' }}>{course.category}</span>
                    <h3 style={{ margin: '6px 0', fontSize: '16px', color: '#0F172A', fontWeight: '700' }}>{course.title}</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Instructor: {course.instructor}</p>
                  </div>
                </div>

                <div style={{ padding: '18px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setSelectedCourseDetails(course)}
                    style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#0F172A', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                  >
                    Details
                  </button>

                  {!course.enrolled ? (
                    <button
                      onClick={() => handleEnroll(course.id)}
                      style={{ flex: 1, backgroundColor: '#22C55E', color: '#FFFFFF', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Enroll Now
                    </button>
                  ) : (
                    <button
                      onClick={() => { setSelectedCourse(course); setActiveLesson(course.lessons[0]); }}
                      style={{ flex: 1, backgroundColor: '#F59E0B', color: '#0F172A', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Watch
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. VIDEO PLAYER SECTION */}
        {selectedCourse && (
          <div>
            <button onClick={() => setSelectedCourse(null)} style={{ marginBottom: '20px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', color: '#0F172A' }}>
              ← Back to Dashboard
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '24px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)' }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', backgroundColor: '#000' }}>
                  <iframe
                    key={activeLesson?.videoEmbedId}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    src={`https://www.youtube.com/embed/${activeLesson?.videoEmbedId}?autoplay=1`}
                    title="LMS Lesson Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <h2 style={{ marginTop: '20px', fontSize: '20px', color: '#0F172A', fontWeight: '700' }}>{activeLesson?.title}</h2>
                <div style={{ marginTop: '20px', backgroundColor: '#F8FAFC', padding: '18px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E2E8F0' }}>
                  <div>
                    <strong style={{ fontSize: '14px', color: '#0F172A' }}>📄 Supplementary Resources</strong>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Download attached PDF lecture notes.</div>
                  </div>
                  <button onClick={() => alert(`Downloading: ${activeLesson?.pdf}`)} style={{ backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Download PDF</button>
                </div>
              </div>

              {/* Playlist */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)' }}>
                <h3 style={{ marginTop: 0, fontSize: '16px', color: '#0F172A', fontWeight: '700' }}>Course Modules</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedCourse.lessons.map(lesson => (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        border: activeLesson?.id === lesson.id ? '2px solid #6366F1' : '1px solid #E2E8F0',
                        backgroundColor: activeLesson?.id === lesson.id ? '#EEF2FF' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <strong style={{ fontSize: '13px', display: 'block', color: activeLesson?.id === lesson.id ? '#6366F1' : '#0F172A' }}>{lesson.title}</strong>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>⏱️ {lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. PROFILE TAB */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '550px', backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A', fontWeight: '700' }}>My Profile</h2>
              {!isEditingProfile && (
                <button
                  onClick={handleEditClick}
                  style={{ backgroundColor: '#6366F1', color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>

            {!isEditingProfile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#334155' }}>
                <p style={{ margin: 0 }}><strong>Name:</strong> {profile.name}</p>
                <p style={{ margin: 0 }}><strong>Email:</strong> {profile.email}</p>
                <p style={{ margin: 0 }}><strong>Role:</strong> {profile.role}</p>
                <p style={{ margin: 0 }}><strong>Bio:</strong> {profile.bio}</p>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Full Name</label>
                  <input type="text" name="name" value={editFormData.name} onChange={handleProfileInputChange} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Email Address</label>
                  <input type="email" name="email" value={editFormData.email} onChange={handleProfileInputChange} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Role / Program</label>
                  <input type="text" name="role" value={editFormData.role} onChange={handleProfileInputChange} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Bio</label>
                  <textarea name="bio" rows="3" value={editFormData.bio} onChange={handleProfileInputChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" style={{ flex: 1, backgroundColor: '#22C55E', color: '#FFFFFF', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>💾 Save Changes</button>
                  <button type="button" onClick={() => setIsEditingProfile(false)} style={{ backgroundColor: '#E2E8F0', color: '#334155', border: 'none', padding: '12px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default StudentDashboard;
