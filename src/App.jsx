import React, { useState, useEffect } from 'react';
import {
  Plus,
  X,
  Upload,
  Lock,
  Unlock,
  Heart,
  Mail,
  Instagram,
  Twitter,
  ArrowRight,
  Menu,
} from 'lucide-react';

const Portfolio = () => {
  // --- Fonts & Global Styles ---
  // Injecting Google Fonts for that "Creative" and "Impressive" look
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Italiana&family=Manrope:wght@300;400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // --- State Management ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Auth Form State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Portfolio Data
  const [projects, setProjects] = useState([
    {
      id: 101,
      title: 'Neon Noir Series',
      category: 'COMIC ART',
      image:
        'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=800&auto=format&fit=crop',
      likes: 124,
      year: '2023',
    },
    {
      id: 201,
      title: 'Synthwave Album',
      category: 'COVER ART',
      image:
        'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
      likes: 156,
      year: '2024',
    },
    {
      id: 301,
      title: 'Cyber Samurai',
      category: 'CHARACTER ART',
      image:
        'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop',
      likes: 245,
      year: '2022',
    },
    {
      id: 102,
      title: 'Action Sequence',
      category: 'COMIC ART',
      image:
        'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&auto=format&fit=crop',
      likes: 89,
      year: '2023',
    },
    {
      id: 202,
      title: 'Ethereal Dreams',
      category: 'COVER ART',
      image:
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
      likes: 210,
      year: '2024',
    },
    {
      id: 302,
      title: 'Digital Portrait',
      category: 'CHARACTER ART',
      image:
        'https://images.unsplash.com/photo-1633479393782-b8d2a63cfc43?q=80&w=800&auto=format&fit=crop',
      likes: 312,
      year: '2023',
    },
    {
      id: 103,
      title: 'The Vigilante',
      category: 'COMIC ART',
      image:
        'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop',
      likes: 45,
      year: '2022',
    },
    {
      id: 203,
      title: 'Modern Typography',
      category: 'COVER ART',
      image:
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
      likes: 189,
      year: '2024',
    },
    {
      id: 303,
      title: 'Neon Glitch',
      category: 'CHARACTER ART',
      image:
        'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop',
      likes: 178,
      year: '2023',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('ALL');

  // New Project Form State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('COVER ART');
  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const filters = ['ALL', 'COVER ART', 'CHARACTER ART', 'COMIC ART'];

  // --- Logic ---

  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput === 'naeemsabir' && passwordInput === 'myworkiscrazy$$') {
      setIsAuthenticated(true);
      setShowLogin(false);
      setLoginError('');
      // Open upload modal immediately upon successful login for convenience
      setIsUploadOpen(true);
    } else {
      setLoginError('Invalid credentials. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newTitle || !newCategory || !previewUrl) return;

    const newProject = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      image: previewUrl,
      likes: 0,
      year: new Date().getFullYear().toString(),
    };

    setProjects([newProject, ...projects]);

    // Reset
    setNewTitle('');
    setNewImage(null);
    setPreviewUrl('');
    setIsUploadOpen(false);
  };

  const filteredProjects =
    activeFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
      {/* Using inline styles for fonts to ensure they apply even if Tailwind config is default.
         'Italiana' is used for headings (Serif, Elegant).
         'Manrope' is used for body text (Sans-serif, Clean).
      */}
      <style>{`
        .font-display { font-family: 'Italiana', serif; }
        .font-body { font-family: 'Manrope', sans-serif; }
        .masonry-grid {
          column-count: 1;
          column-gap: 2rem;
        }
        @media (min-width: 768px) {
          .masonry-grid { column-count: 2; }
        }
        @media (min-width: 1024px) {
          .masonry-grid { column-count: 3; }
        }
        .break-inside-avoid {
          break-inside: avoid;
        }
      `}</style>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md transition-all duration-300">
        <div className="max-w-[1800px] mx-auto px-6 h-24 flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider font-bold">
            NAEEM SABIR
            <span className="text-red-500 text-3xl leading-none">.</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12 font-body text-xs tracking-[0.2em] font-medium text-zinc-500">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-black transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() =>
                document
                  .getElementById('portfolio')
                  .scrollIntoView({ behavior: 'smooth' })
              }
              className="hover:text-black transition-colors"
            >
              WORK
            </button>
            <button
              onClick={() =>
                document
                  .getElementById('contact')
                  .scrollIntoView({ behavior: 'smooth' })
              }
              className="hover:text-black transition-colors"
            >
              CONTACT
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4 pl-8 border-l border-zinc-200">
                <span className="text-green-600 flex items-center gap-1">
                  <Unlock size={14} /> ADMIN
                </span>
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="hover:text-black flex items-center gap-1"
                >
                  <Plus size={14} /> ADD
                </button>
                <button onClick={handleLogout} className="hover:text-red-500">
                  EXIT
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="ml-4 opacity-50 hover:opacity-100 transition-opacity"
              >
                <Lock size={14} />
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-black"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-8 font-display text-3xl md:hidden animate-in fade-in slide-in-from-top-10 duration-300">
          <button
            onClick={() => {
              setShowMenu(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              document
                .getElementById('portfolio')
                .scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Work
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              document
                .getElementById('contact')
                .scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              isAuthenticated ? setIsUploadOpen(true) : setShowLogin(true);
            }}
            className="text-xl font-body tracking-widest text-zinc-500 mt-8"
          >
            {isAuthenticated ? 'Upload Art' : 'Admin Login'}
          </button>
          <button
            onClick={() => setShowMenu(false)}
            className="absolute top-8 right-6"
          >
            <X size={32} />
          </button>
        </div>
      )}

      {/* --- Hero Section --- */}
      <header className="relative min-h-[80vh] flex flex-col justify-center px-6 pt-24">
        <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="overflow-hidden">
              <p className="font-body text-sm md:text-base tracking-[0.3em] text-zinc-500 uppercase animate-in slide-in-from-bottom-4 duration-700 delay-100">
                Graphic Designer & Visual Artist
              </p>
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-black animate-in slide-in-from-bottom-8 duration-1000 delay-200">
              Visuals that <br />
              <span className="italic text-zinc-400">Speak</span> Louder.
            </h1>
            <p className="font-body text-zinc-600 max-w-lg text-lg leading-relaxed animate-in slide-in-from-bottom-8 duration-1000 delay-300">
              Welcome to my portfolio. A curated collection of characters,
              stories, and identities crafted with precision and passion.
            </p>
            <div className="pt-8 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
              <button
                onClick={() =>
                  document
                    .getElementById('portfolio')
                    .scrollIntoView({ behavior: 'smooth' })
                }
                className="group flex items-center gap-4 text-black font-body text-sm tracking-[0.2em] font-bold uppercase"
              >
                View Selected Works
                <span className="w-12 h-[1px] bg-black group-hover:w-20 transition-all duration-300"></span>
              </button>
            </div>
          </div>

          {/* Decorative Hero Image/Abstract */}
          <div className="hidden lg:block lg:col-span-5 relative h-[600px] animate-in fade-in duration-1000 delay-500">
            <div className="absolute inset-0 bg-zinc-100 grayscale hover:grayscale-0 transition-all duration-700 ease-out">
              <img
                src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1200&auto=format&fit=crop"
                alt="Artistic Portrait"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </header>

      {/* --- Portfolio Section --- */}
      <section id="portfolio" className="py-32 px-6 bg-zinc-50/50">
        <div className="max-w-[1800px] mx-auto">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8">
            <h2 className="font-display text-4xl md:text-5xl">
              Selected Works
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-4 font-body text-xs md:text-sm tracking-[0.15em] font-medium text-zinc-400">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`transition-colors duration-300 ${
                    activeFilter === filter
                      ? 'text-black underline underline-offset-8 decoration-1'
                      : 'hover:text-black'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="masonry-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="break-inside-avoid mb-12 group relative cursor-pointer"
              >
                <div className="relative overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 ease-out">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 text-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-body text-xs tracking-[0.2em] text-zinc-500 mb-2">
                        {project.category} — {project.year}
                      </p>
                      <h3 className="font-display text-3xl text-black mb-6">
                        {project.title}
                      </h3>
                      <button className="inline-flex items-center gap-2 border border-black px-6 py-3 font-body text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                {/* Mobile Title (visible below image on mobile only) */}
                <div className="md:hidden mt-4">
                  <h3 className="font-display text-xl">{project.title}</h3>
                  <p className="font-body text-xs text-zinc-500">
                    {project.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="h-64 flex items-center justify-center font-display text-2xl text-zinc-300">
              No works in this collection.
            </div>
          )}
        </div>
      </section>

      {/* --- Contact Section --- */}
      <footer
        id="contact"
        className="bg-white py-32 px-6 border-t border-zinc-100"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-zinc-400 text-sm tracking-[0.3em] uppercase mb-8">
            Get In Touch
          </p>
          <h2 className="font-display text-5xl md:text-7xl mb-12 leading-tight">
            Have a project in mind? <br />
            <span className="italic text-zinc-300">Let's collaborate.</span>
          </h2>

          <a
            href="mailto:naeemsabir002@gmail.com"
            className="inline-block border-b border-black pb-2 font-display text-2xl md:text-3xl hover:text-zinc-600 hover:border-zinc-300 transition-all mb-16"
          >
            naeemsabir002@gmail.com
          </a>

          <div className="flex justify-center gap-12 mb-20">
            <button className="text-zinc-400 hover:text-black transition-colors transform hover:-translate-y-1 duration-300">
              <Instagram size={24} />
            </button>
            <button className="text-zinc-400 hover:text-black transition-colors transform hover:-translate-y-1 duration-300">
              <Twitter size={24} />
            </button>
            <button className="text-zinc-400 hover:text-black transition-colors transform hover:-translate-y-1 duration-300">
              <Mail size={24} />
            </button>
          </div>

          <p className="font-body text-xs text-zinc-300 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Naeem Sabir. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* --- Login Modal --- */}
      {showLogin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-white/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white border border-zinc-100 shadow-2xl p-12 relative">
            <button
              onClick={() => {
                setShowLogin(false);
                setLoginError('');
              }}
              className="absolute top-6 right-6 text-zinc-400 hover:text-black"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-10">
              <span className="font-display text-2xl">Restricted Access</span>
              <div className="w-12 h-[1px] bg-black mx-auto mt-4"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block font-body text-[10px] tracking-widest uppercase text-zinc-500 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full border-b border-zinc-200 py-2 font-body focus:outline-none focus:border-black transition-colors bg-transparent rounded-none"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block font-body text-[10px] tracking-widest uppercase text-zinc-500 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full border-b border-zinc-200 py-2 font-body focus:outline-none focus:border-black transition-colors bg-transparent rounded-none"
                  placeholder="Enter password"
                />
              </div>

              {loginError && (
                <p className="text-red-500 text-xs text-center font-body">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white font-body text-xs tracking-widest uppercase py-4 hover:bg-zinc-800 transition-colors mt-4"
              >
                Authenticate
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- Upload Modal --- */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-white/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-white border border-zinc-100 shadow-2xl relative flex flex-col md:flex-row h-[600px] md:h-auto overflow-hidden">
            <button
              onClick={() => setIsUploadOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 text-zinc-400 hover:text-black"
            >
              <X size={20} />
            </button>

            {/* Image Side */}
            <div className="w-full md:w-1/2 bg-zinc-50 flex items-center justify-center border-r border-zinc-100 relative group">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  <span className="font-display text-lg text-zinc-400 block mb-2">
                    Visual Asset
                  </span>
                  <span className="font-body text-[10px] uppercase tracking-widest text-zinc-300">
                    Upload Image
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {/* Form Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-display text-3xl mb-8">Add to Collection</h3>
              <form onSubmit={handleAddProject} className="space-y-6">
                <div>
                  <label className="block font-body text-[10px] tracking-widest uppercase text-zinc-500 mb-2">
                    Title of Work
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full border-b border-zinc-200 py-2 font-body focus:outline-none focus:border-black transition-colors rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-widest uppercase text-zinc-500 mb-2">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full border-b border-zinc-200 py-2 font-body focus:outline-none focus:border-black transition-colors bg-transparent rounded-none"
                  >
                    {filters
                      .filter((f) => f !== 'ALL')
                      .map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!newTitle || !previewUrl}
                  className="w-full bg-black text-white font-body text-xs tracking-widest uppercase py-4 hover:bg-zinc-800 transition-colors disabled:opacity-50 mt-4"
                >
                  Publish
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
