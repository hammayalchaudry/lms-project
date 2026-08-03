import React, { useState } from 'react';

const InstructorDashboard = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginData, setLoginData] = useState({ email: 'teacher@edupulse.com', password: '' });

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');

  // Instructor Info State (Editable)
  const [instructor, setInstructor] = useState({
    name: 'Sir Ahmad',
    role: 'Senior Lead Instructor',
    email: 'teacher@edupulse.com'
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState({ ...instructor });

  // Courses State
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Full-Stack MERN Web Development Masterclass',
      category: 'Web Development',
      studentsCount: 142,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
      lessons: [
        { id: 101, title: '01. React Fundamentals & Virtual DOM Explained', duration: '15:20', videoEmbedId: 'w7ejDZ8SWv8', pdf: 'React_Fundamentals_Guide.pdf' },
        { id: 102, title: '02. State Management & React Hooks', duration: '22:45', videoEmbedId: 'TNhaISOUy6Q', pdf: 'React_Hooks_CheatSheet.pdf' }
      ]
    },
    {
      id: 2,
      title: 'Python for Artificial Intelligence & Data Science',
      category: 'Data Science & AI',
      studentsCount: 98,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      lessons: [
        { id: 201, title: '01. Python Syntax & Control Structures', duration: '12:30', videoEmbedId: '_uQrJ0TkZlc', pdf: 'Python_Basics.pdf' }
      ]
    }
  ]);

  // Students Enrolled List
  const [students] = useState([
    { id: 1, name: 'Ali Raza', email: 'ali@gmail.com', course: 'Full-Stack MERN Web Development', progress: '65%' },
    { id: 2, name: 'Sara Khan', email: 'sara@gmail.com', course: 'Python for Artificial Intelligence', progress: '40%' },
    { id: 3, name: 'Usman Hassan', email: 'usman@gmail.com', course: 'Full-Stack MERN Web Development', progress: '85%' },
    { id: 4, name: 'Zainab Ahmed', email: 'zainab@gmail.com', course: 'UI/UX Design Systems', progress: '20%' }
  ]);

  // Form States for Creating/Editing Course (Only PC File for Thumbnail)
  const [newCourse, setNewCourse] = useState({ title: '', category: '', file: null });
  const [editingCourse, setEditingCourse] = useState(null);

  // Form States for Uploading Content
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [newLesson, setNewLesson] = useState({ 
    title: '', 
    duration: '', 
    videoEmbedId: '', 
    pdf: '', 
    videoFile: null, 
    pdfFile: null 
  });

  // --- HANDLERS --- //

  // Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
      setActiveTab('dashboard');
    } else {
      alert('Please enter valid login credentials!');
    }
  };

  // Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profileForm.name || !profileForm.email) return alert('Name and Email are required!');
    setInstructor({ ...profileForm });
    alert('👤 Profile Updated Successfully!');
  };

  // Create Course (Uses Local File Preview URL)
  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.category) return alert('Please fill all required fields');

    let imgUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80';
    if (newCourse.file) {
      imgUrl = URL.createObjectURL(newCourse.file);
    }

    const courseObj = {
      id: Date.now(),
      title: newCourse.title,
      category: newCourse.category,
      thumbnail: imgUrl,
      studentsCount: 0,
      lessons: []
    };

    setCourses([...courses, courseObj]);
    setNewCourse({ title: '', category: '', file: null });
    alert('🎉 New Course Created Successfully!');
    setActiveTab('manage');
  };

  // Edit Course Start
  const handleStartEdit = (course) => {
    setEditingCourse({ ...course });
  };

  // Save Edit Course
  const handleSaveEditCourse = (e) => {
    e.preventDefault();
    setCourses(courses.map(c => c.id === editingCourse.id ? editingCourse : c));
    setEditingCourse(null);
    alert('✅ Course updated successfully!');
  };

  // Delete Course
  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
      alert('🗑️ Course deleted successfully.');
    }
  };

  // Upload Video Lesson & Notes
  const handleUploadContent = (e) => {
    e.preventDefault();
    if (!selectedCourseId || !newLesson.title) return alert('Please select a course and lesson title');

    const videoName = newLesson.videoFile ? newLesson.videoFile.name : (newLesson.videoEmbedId || 'Local Video Uploaded');
    const pdfName = newLesson.pdfFile ? newLesson.pdfFile.name : (newLesson.pdf || 'Lecture_Notes.pdf');

    const lessonObj = {
      id: Date.now(),
      title: newLesson.title,
      duration: newLesson.duration || '15:00',
      videoEmbedId: videoName,
      pdf: pdfName
    };

    setCourses(courses.map(c => {
      if (c.id === parseInt(selectedCourseId)) {
        return { ...c, lessons: [...c.lessons, lessonObj] };
      }
      return c;
    }));

    setNewLesson({ title: '', duration: '', videoEmbedId: '', pdf: '', videoFile: null, pdfFile: null });
    alert('🚀 Video & Notes uploaded successfully!');
  };

  // 🔴 1. TEACHER LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0F172A', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Inter', sans-serif", padding: '20px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ backgroundColor: '#6366F1', color: '#FFF', display: 'inline-block', padding: '12px 16px', borderRadius: '12px', fontSize: '24px', fontWeight: 'bold' }}>👨‍🏫</div>
            <h2 style={{ margin: '12px 0 4px 0', color: '#0F172A', fontSize: '22px' }}>Teacher Portal</h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>Sign in to manage your courses and students</p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Email Address</label>
              <input type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Password</label>
              <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#6366F1', color: '#FFFFFF', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '8px' }}>
              Login to Teacher Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 🟢 2. MAIN INSTRUCTOR DASHBOARD
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F1F5F9', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside style={{ width: '270px', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid #1E293B', marginBottom: '28px' }}>
            <div style={{ backgroundColor: '#6366F1', padding: '10px 14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '20px' }}>👨‍🏫</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>EduPulse <span style={{ color: '#F59E0B' }}>Teacher</span></h3>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>Instructor Dashboard</span>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'dashboard' ? '#6366F1' : 'transparent', color: activeTab === 'dashboard' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              📊 Overview Dashboard
            </button>

            <button
              onClick={() => setActiveTab('create')}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'create' ? '#6366F1' : 'transparent', color: activeTab === 'create' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              ➕ Create Course
            </button>

            <button
              onClick={() => setActiveTab('manage')}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'manage' ? '#6366F1' : 'transparent', color: activeTab === 'manage' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              ✏️ Manage & Delete Courses
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'upload' ? '#6366F1' : 'transparent', color: activeTab === 'upload' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              🎥 Upload Videos & Notes
            </button>

            <button
              onClick={() => setActiveTab('students')}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'students' ? '#6366F1' : 'transparent', color: activeTab === 'students' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              👥 View Enrolled Students
            </button>

            <button
              onClick={() => {
                setProfileForm({ ...instructor });
                setActiveTab('profile');
              }}
              style={{
                padding: '12px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '14px',
                backgroundColor: activeTab === 'profile' ? '#6366F1' : 'transparent', color: activeTab === 'profile' ? '#FFFFFF' : '#94A3B8'
              }}
            >
              ⚙️ Edit Profile
            </button>
          </nav>
        </div>

        {/* Bottom Profile / Logout Card */}
        <div style={{ backgroundColor: '#1E293B', padding: '14px 16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFFFFF' }}>{instructor.name}</div>
              <div style={{ fontSize: '11px', color: '#F59E0B' }}>{instructor.role}</div>
            </div>
            <button onClick={() => setIsLoggedIn(false)} style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Logout</button>
          </div>
          <button 
            onClick={() => { setProfileForm({ ...instructor }); setActiveTab('profile'); }} 
            style={{ backgroundColor: '#334155', color: '#94A3B8', border: 'none', padding: '6px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold', textAlign: 'center' }}
          >
            ✏️ Edit Profile
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '36px', overflowY: 'auto' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#0F172A' }}>
            {activeTab === 'dashboard' && 'Teacher Overview Dashboard'}
            {activeTab === 'create' && 'Create New Course'}
            {activeTab === 'manage' && 'Edit & Delete Courses'}
            {activeTab === 'upload' && 'Upload Video Lessons & PDF Notes'}
            {activeTab === 'students' && 'Enrolled Students Directory'}
            {activeTab === 'profile' && 'Instructor Profile Settings'}
          </h1>
          <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#64748B' }}>Manage your educational content and student progress seamlessly.</p>
        </header>

        {/* 1. OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 'bold' }}>TOTAL COURSES</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#6366F1' }}>{courses.length}</h2>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 'bold' }}>TOTAL STUDENTS</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#22C55E' }}>240</h2>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 'bold' }}>TOTAL LESSONS</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#F59E0B' }}>
                  {courses.reduce((acc, c) => acc + c.lessons.length, 0)}
                </h2>
              </div>
            </div>

            <h3 style={{ color: '#0F172A', marginBottom: '16px' }}>My Published Courses</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {courses.map(course => (
                <div key={course.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                  <img src={course.thumbnail} alt="" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                  <div style={{ padding: '18px' }}>
                    <span style={{ fontSize: '11px', color: '#6366F1', fontWeight: 'bold' }}>{course.category}</span>
                    <h4 style={{ margin: '6px 0', fontSize: '16px', color: '#0F172A' }}>{course.title}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', marginTop: '12px' }}>
                      <span>👥 {course.studentsCount} Enrolled</span>
                      <span>🎥 {course.lessons.length} Lessons</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. CREATE COURSE */}
        {activeTab === 'create' && (
          <div style={{ maxWidth: '600px', backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <form onSubmit={handleCreateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Course Title *</label>
                <input type="text" placeholder="e.g. Master React & Redux" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Course Category *</label>
                <select value={newCourse.category} onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}>
                  <option value="">Select Category...</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                </select>
              </div>

              {/* LOCAL FILE UPLOAD ONLY FOR THUMBNAIL */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Upload Course Thumbnail (From PC)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setNewCourse({ ...newCourse, file: e.target.files[0] })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer', boxSizing: 'border-box' }} 
                />
              </div>

              <button type="submit" style={{ backgroundColor: '#22C55E', color: '#FFFFFF', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
                🚀 Publish Course
              </button>
            </form>
          </div>
        )}

        {/* 3. EDIT & DELETE COURSES */}
        {activeTab === 'manage' && (
          <div>
            {editingCourse ? (
              <div style={{ maxWidth: '600px', backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', border: '2px solid #6366F1', marginBottom: '30px' }}>
                <h3 style={{ margin: '0 0 16px 0', color: '#6366F1' }}>✏️ Edit Course Details</h3>
                <form onSubmit={handleSaveEditCourse} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Title</label>
                    <input type="text" value={editingCourse.title} onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Category</label>
                    <input type="text" value={editingCourse.category} onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ flex: 1, backgroundColor: '#6366F1', color: '#FFF', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
                    <button type="button" onClick={() => setEditingCourse(null)} style={{ backgroundColor: '#E2E8F0', color: '#334155', border: 'none', padding: '12px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : null}

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                    <th style={{ padding: '16px' }}>Course Title</th>
                    <th style={{ padding: '16px' }}>Category</th>
                    <th style={{ padding: '16px' }}>Lessons</th>
                    <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '16px', fontWeight: 'bold', color: '#0F172A' }}>{course.title}</td>
                      <td style={{ padding: '16px', color: '#64748B' }}>{course.category}</td>
                      <td style={{ padding: '16px', color: '#64748B' }}>{course.lessons.length} Modules</td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <button onClick={() => handleStartEdit(course)} style={{ backgroundColor: '#F59E0B', color: '#0F172A', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginRight: '8px' }}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteCourse(course.id)} style={{ backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. UPLOAD VIDEOS & NOTES */}
        {activeTab === 'upload' && (
          <div style={{ maxWidth: '650px', backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <form onSubmit={handleUploadContent} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Select Course *</label>
                <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}>
                  <option value="">Select a course to upload into...</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Lesson Title *</label>
                <input type="text" placeholder="e.g. Introduction to Async/Await" value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Upload Video File (From PC)</label>
                <input 
                  type="file" 
                  accept="video/*"
                  onChange={(e) => setNewLesson({ ...newLesson, videoFile: e.target.files[0] })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer', boxSizing: 'border-box' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Or YouTube Video ID</label>
                  <input type="text" placeholder="e.g. w7ejDZ8SWv8" value={newLesson.videoEmbedId} onChange={(e) => setNewLesson({ ...newLesson, videoEmbedId: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Duration</label>
                  <input type="text" placeholder="18:30" value={newLesson.duration} onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Upload PDF Lecture Notes (From PC)</label>
                <input 
                  type="file" 
                  accept="application/pdf"
                  onChange={(e) => setNewLesson({ ...newLesson, pdfFile: e.target.files[0] })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer', boxSizing: 'border-box' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Or PDF Document Title</label>
                <input type="text" placeholder="e.g. Async_Await_Notes.pdf" value={newLesson.pdf} onChange={(e) => setNewLesson({ ...newLesson, pdf: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
              </div>

              <button type="submit" style={{ backgroundColor: '#6366F1', color: '#FFFFFF', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
                📤 Upload Lesson & Notes
              </button>
            </form>
          </div>
        )}

        {/* 5. VIEW STUDENTS */}
        {activeTab === 'students' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                  <th style={{ padding: '16px' }}>Student Name</th>
                  <th style={{ padding: '16px' }}>Email</th>
                  <th style={{ padding: '16px' }}>Enrolled Course</th>
                  <th style={{ padding: '16px' }}>Course Completion</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#0F172A' }}>{student.name}</td>
                    <td style={{ padding: '16px', color: '#64748B' }}>{student.email}</td>
                    <td style={{ padding: '16px', color: '#6366F1', fontWeight: '600' }}>{student.course}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                        {student.progress}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 6. EDIT INSTRUCTOR PROFILE */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '600px', backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Instructor Name *</label>
                <input 
                  type="text" 
                  value={profileForm.name} 
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} 
                  required 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Role / Designation</label>
                <input 
                  type="text" 
                  value={profileForm.role} 
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#0F172A' }}>Email Address *</label>
                <input 
                  type="email" 
                  value={profileForm.email} 
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} 
                  required 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} 
                />
              </div>

              <button type="submit" style={{ backgroundColor: '#6366F1', color: '#FFFFFF', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
                💾 Save Profile Changes
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};

export default InstructorDashboard;