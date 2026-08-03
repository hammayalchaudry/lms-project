import React, { useState } from 'react';

const AdminDashboard = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [adminLogin, setAdminLogin] = useState({ email: 'admin@edupulse.com', password: '' });

  // Navigation State
  const [activeTab, setActiveTab] = useState('analytics'); // Set to analytics by default to view charts

  // Dummy Data States
  const [users, setUsers] = useState([
    { id: 1, name: 'Ali Raza', email: 'ali@gmail.com', role: 'Student', status: 'Active' },
    { id: 2, name: 'Sara Khan', email: 'sara@gmail.com', role: 'Student', status: 'Active' },
    { id: 3, name: 'Usman Hassan', email: 'usman@gmail.com', role: 'Student', status: 'Inactive' }
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Sir Ahmad', email: 'teacher@edupulse.com', subject: 'Web Development', status: 'Approved' },
    { id: 2, name: 'Dr. Hamza', email: 'hamza@edupulse.com', subject: 'Python & AI', status: 'Pending Verification' }
  ]);

  const [courses, setCourses] = useState([
    { id: 1, title: 'Full-Stack MERN Masterclass', instructor: 'Sir Ahmad', category: 'Web Dev', status: 'Published' },
    { id: 2, title: 'Python for AI & Data Science', instructor: 'Dr. Hamza', category: 'Data Science', status: 'Draft' }
  ]);

  // Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    if (adminLogin.email && adminLogin.password) {
      setIsLoggedIn(true);
      setActiveTab('dashboard');
    } else {
      alert('Please fill in valid admin credentials!');
    }
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
  };

  const approveTeacher = (id) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, status: 'Approved' } : t));
  };

  const deleteCourse = (id) => {
    if (window.confirm('Delete this course from platform?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // 🔴 1. ADMIN LOGIN VIEW
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0F172A', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Inter', sans-serif", padding: '20px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ backgroundColor: '#EF4444', color: '#FFF', display: 'inline-block', padding: '12px 16px', borderRadius: '12px', fontSize: '24px', fontWeight: 'bold' }}>🛡️</div>
            <h2 style={{ margin: '12px 0 4px 0', color: '#0F172A', fontSize: '22px' }}>Admin Portal</h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>System Management Control Panel</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Admin Email</label>
              <input type="email" value={adminLogin.email} onChange={(e) => setAdminLogin({ ...adminLogin, email: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Password</label>
              <input type="password" value={adminLogin.password} onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })} required placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '8px' }}>
              Login to Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 🟢 2. MAIN ADMIN DASHBOARD
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside style={{ width: '270px', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid #1E293B', marginBottom: '28px' }}>
            <div style={{ backgroundColor: '#EF4444', padding: '10px 14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '20px' }}>🛡️</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>EduPulse <span style={{ color: '#EF4444' }}>Admin</span></h3>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>System Management</span>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'dashboard' ? '#EF4444' : 'transparent', color: activeTab === 'dashboard' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              📊 Main Dashboard
            </button>

            <button
              onClick={() => setActiveTab('users')}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'users' ? '#EF4444' : 'transparent', color: activeTab === 'users' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              👥 Manage Users
            </button>

            <button
              onClick={() => setActiveTab('teachers')}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'teachers' ? '#EF4444' : 'transparent', color: activeTab === 'teachers' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              👨‍🏫 Manage Teachers
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'courses' ? '#EF4444' : 'transparent', color: activeTab === 'courses' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              📚 Manage Courses
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'analytics' ? '#EF4444' : 'transparent', color: activeTab === 'analytics' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              📈 Dashboard Charts & Analytics
            </button>
          </nav>
        </div>

        {/* Admin Logout */}
        <div style={{ backgroundColor: '#1E293B', padding: '14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFFFFF' }}>Super Admin</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>admin@edupulse.com</div>
          </div>
          <button onClick={() => setIsLoggedIn(false)} style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Logout</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '36px', overflowY: 'auto' }}>
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#0F172A' }}>
            {activeTab === 'dashboard' && 'Admin Executive Overview'}
            {activeTab === 'users' && 'Manage Registered Users'}
            {activeTab === 'teachers' && 'Manage & Verify Teachers'}
            {activeTab === 'courses' && 'Manage Platform Courses'}
            {activeTab === 'analytics' && 'Analytics & Performance Charts'}
          </h1>
          <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#64748B' }}>Complete administration and platform control center.</p>
        </header>

        {/* 1. DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 'bold' }}>TOTAL STUDENTS</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#3B82F6' }}>{users.length}</h2>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 'bold' }}>ACTIVE TEACHERS</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#10B981' }}>{teachers.length}</h2>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 'bold' }}>TOTAL COURSES</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#F59E0B' }}>{courses.length}</h2>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 'bold' }}>MONTHLY REVENUE</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#8B5CF6' }}>$12,450</h2>
              </div>
            </div>
          </div>
        )}

        {/* 2. MANAGE USERS */}
        {activeTab === 'users' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                  <th style={{ padding: '16px' }}>Name</th>
                  <th style={{ padding: '16px' }}>Email</th>
                  <th style={{ padding: '16px' }}>Role</th>
                  <th style={{ padding: '16px' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#0F172A' }}>{u.name}</td>
                    <td style={{ padding: '16px', color: '#64748B' }}>{u.email}</td>
                    <td style={{ padding: '16px', color: '#3B82F6', fontWeight: '600' }}>{u.role}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ backgroundColor: u.status === 'Active' ? '#DCFCE7' : '#FEE2E2', color: u.status === 'Active' ? '#15803D' : '#B91C1C', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button onClick={() => toggleUserStatus(u.id)} style={{ backgroundColor: '#E2E8F0', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. MANAGE TEACHERS */}
        {activeTab === 'teachers' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                  <th style={{ padding: '16px' }}>Teacher Name</th>
                  <th style={{ padding: '16px' }}>Email</th>
                  <th style={{ padding: '16px' }}>Subject</th>
                  <th style={{ padding: '16px' }}>Verification Status</th>
                  <th style={{ padding: '16px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#0F172A' }}>{t.name}</td>
                    <td style={{ padding: '16px', color: '#64748B' }}>{t.email}</td>
                    <td style={{ padding: '16px', color: '#10B981', fontWeight: '600' }}>{t.subject}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ backgroundColor: t.status === 'Approved' ? '#DCFCE7' : '#FEF3C7', color: t.status === 'Approved' ? '#15803D' : '#D97706', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      {t.status !== 'Approved' && (
                        <button onClick={() => approveTeacher(t.id)} style={{ backgroundColor: '#10B981', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                          Approve Teacher
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. MANAGE COURSES */}
        {activeTab === 'courses' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                  <th style={{ padding: '16px' }}>Course Title</th>
                  <th style={{ padding: '16px' }}>Instructor</th>
                  <th style={{ padding: '16px' }}>Category</th>
                  <th style={{ padding: '16px' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#0F172A' }}>{c.title}</td>
                    <td style={{ padding: '16px', color: '#64748B' }}>{c.instructor}</td>
                    <td style={{ padding: '16px', color: '#8B5CF6', fontWeight: '600' }}>{c.category}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button onClick={() => deleteCourse(c.id)} style={{ backgroundColor: '#EF4444', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Delete Course
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. 3 DIFFERENT TYPES OF CHARTS (3 DIFFERENT COLORS) */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            
            {/* CHART 1: VERTICAL BAR CHART (Color 1: Indigo #6366F1) */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#0F172A', fontSize: '16px' }}>📊 User Registration Growth</h3>
                <span style={{ backgroundColor: '#EEF2FF', color: '#4338CA', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' }}>+35% This Month</span>
              </div>
              
              <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '8px', borderBottom: '2px solid #E2E8F0' }}>
                {[
                  { month: 'Jan', value: '40%' },
                  { month: 'Feb', value: '55%' },
                  { month: 'Mar', value: '35%' },
                  { month: 'Apr', value: '70%' },
                  { month: 'May', value: '85%' },
                  { month: 'Jun', value: '95%' }
                ].map((item, idx) => (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ width: '100%', height: item.value, backgroundColor: '#6366F1', borderRadius: '6px 6px 0 0', transition: 'all 0.3s' }}></div>
                    <span style={{ fontSize: '11px', color: '#64748B', marginTop: '8px', fontWeight: '500' }}>{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CHART 2: DONUT / CIRCLE CHART (Color 2: Emerald Green #10B981) */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#0F172A', fontSize: '16px' }}>🌐 Traffic Source Distribution</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '180px' }}>
                {/* SVG Donut Chart */}
                <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    {/* Background Circle */}
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="3.8" />
                    {/* Active Segment (75% Completion) */}
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="3.8" strokeDasharray="75, 100" strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#0F172A' }}>75%</span>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>Direct Search</span>
                  </div>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '12px', height: '12px', backgroundColor: '#10B981', borderRadius: '50%' }}></span>
                    <span style={{ color: '#0F172A', fontWeight: '600' }}>Direct Organic (75%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '12px', height: '12px', backgroundColor: '#CBD5E1', borderRadius: '50%' }}></span>
                    <span style={{ color: '#64748B' }}>Referral Traffic (25%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CHART 3: AREA / SMOOTH LINE CHART (Color 3: Amber Gold #F59E0B) */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#0F172A', fontSize: '16px' }}>💰 Monthly Revenue Trend</h3>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#D97706' }}>$12,450 Total</span>
              </div>

              <div style={{ height: '180px', position: 'relative' }}>
                {/* SVG Line and Fill Curve */}
                <svg viewBox="0 0 300 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Fill Under Line */}
                  <polygon points="0,110 0,90 60,70 120,80 180,40 240,50 300,10 300,110" fill="url(#amberGradient)" />
                  {/* Smooth Line Path */}
                  <polyline points="0,90 60,70 120,80 180,40 240,50 300,10" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                </svg>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', marginTop: '8px' }}>
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;