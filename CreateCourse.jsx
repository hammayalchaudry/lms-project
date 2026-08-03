import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [files, setFiles] = useState({ image: null, video: null, pdf: null });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description || '');

    if (files.image) data.append('image', files.image);
    if (files.video) data.append('video', files.video);
    if (files.pdf) data.append('pdf', files.pdf);

    try {
      await axios.post('http://localhost:5000/api/courses', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('🚀 Course published successfully with files!');
      setFormData({ title: '', description: '' });
      setFiles({ image: null, video: null, pdf: null });
      e.target.reset();
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to publish course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Create New Course</h1>
      <p className="text-slate-500 mb-8">Manage your educational content and student progress seamlessly.</p>

      <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        {message && (
          <div className={`p-4 mb-6 rounded-xl font-medium text-sm ${message.includes('🚀') ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Course Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g. Master React & Redux"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Course Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Brief course overview..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 placeholder:text-slate-400"
            ></textarea>
          </div>

          {/* PC File Upload: Image */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Thumbnail Image (Upload from PC) *</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 font-medium"
            />
          </div>

          {/* PC File Upload: Video */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Course Video (Upload from PC)</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 font-medium"
            />
          </div>

          {/* PC File Upload: PDF */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Course Notes / Document (PDF from PC)</label>
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 font-medium"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl transition duration-200 shadow-lg shadow-emerald-500/20"
          >
            {loading ? 'Uploading Files...' : '🚀 Publish Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;