import React, { useState, useEffect } from 'react';
import { Plus, X, Lock, Unlock, Heart, Mail, Instagram, Twitter, Menu, ArrowRight } from 'lucide-react';

const Portfolio = () => {
  // --- Global Font Injection ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Italiana&family=Manrope:wght@300;400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // --- State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  // Inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Upload State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('COVER ART');
  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Data
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [projects, setProjects] = useState([
    { id: 101, title: 'Neon Noir Series', category: 'COMIC ART', image: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=800&fit=crop', year: '2023' },
    { id: 201, title: 'Synthwave Album', category: 'COVER ART', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&fit=crop', year: '2024' },
    { id: 301, title: 'Cyber Samurai', category: 'CHARACTER ART', image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&fit=crop', year: '2022' },
    { id: 102, title: 'Action Sequence', category: 'COMIC ART', image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&fit=crop', year: '2023' },
    { id: 202, title: 'Ethereal Dreams', category: 'COVER ART', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&fit=crop', year: '2024' },
    { id: 302, title: 'Digital Portrait', category: 'CHARACTER ART', image: 'https://images.unsplash.com/photo-1633479393782-b8d2a63cfc43?q=80&w=800&fit=crop', year: '2023' },
    { id: 103, title: 'The Vigilante', category: 'COMIC ART', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&fit=crop', year: '2022' },
    { id: 203, title: 'Modern Typography', category: 'COVER ART', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&fit=crop', year: '2024' },
    { id: 303, title: 'Neon Glitch', category: 'CHARACTER ART', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&fit=crop', year: '2023' },
  ]);

  const filters = ['ALL', 'COVER ART', 'CHARACTER ART', 'COMIC ART'];
  const filteredProjects = activeFilter === 'ALL' ? projects : projects.filter(p => p.category === activeFilter);

  // --- Handlers ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput === 'naeemsabir' && passwordInput === 'myworkiscrazy$$') {
      setIsAuthenticated(true);
      setShowLogin(false);
      setLoginError('');
      setIsUploadOpen(true);
    } else {
      setLoginError('Invalid credentials.');
    }
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
    if (!newTitle || !previewUrl) return;
    const newProject = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      image: previewUrl,
      year: new Date().getFullYear().toString()
    };
    setProjects([newProject, ...projects]);
    setNewTitle('');
    setNewImage(null);
    setPreviewUrl('');
    setIsUploadOpen(false);
  };

  return (
    <div className="app-container">
      {/* --- STANDARD CSS STYLES (No Tailwind Needed) --- */}
      <style>{`
        /* Reset & Basics */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #ffffff; color: #1a1a1a; font-family: 'Manrope', sans-serif; -webkit-font-smoothing: antialiased; }
        img { display: block; max-width: 100%; height: auto; }
        button { background: none; border: none; cursor: pointer; font-family: inherit; color: inherit; }
        input, select { font-family: 'Manrope', sans-serif; }

        /* Typography */
        .font-serif { font-family: 'Italiana', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }

        /* Navigation */
        nav {
          position: fixed; top: 0; left: 0; right: 0; height: 90px;
          background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; z-index: 1000; border-bottom: 1px solid #f0f0f0;
        }
        .logo { font-size: 24px; letter-spacing: 1px; font-weight: bold; }
        .logo span { color: #e11d48; font-size: 30px; line-height: 0; }
        .desktop-menu { display: flex; gap: 40px; align-items: center; }
        .nav-link { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; color: #888; transition: color 0.3s; }
        .nav-link:hover { color: #000; }
        .mobile-menu-btn { display: none; }

        /* Hero Section */
        .hero {
          min-height: 90vh; display: flex; align-items: center; justify-content: center;
          padding: 120px 20px 60px; text-align: center;
        }
        .hero-content { max-width: 900px; animation: fadeIn 1s ease-out; }
        .hero-subtitle { font-size: 13px; letter-spacing: 4px; text-transform: uppercase; color: #888; margin-bottom: 30px; display: block; }
        .hero h1 { font-size: clamp(3rem, 8vw, 6rem); line-height: 1; margin-bottom: 30px; font-weight: 400; }
        .hero p { font-size: 1.1rem; color: #666; line-height: 1.8; max-width: 600px; margin: 0 auto 40px; }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px; padding-bottom: 5px;
          border-bottom: 1px solid #000; font-size: 12px; letter-spacing: 2px;
          text-transform: uppercase; font-weight: 700; transition: gap 0.3s;
        }
        .cta-btn:hover { gap: 20px; }

        /* Portfolio Grid */
        .portfolio-section { padding: 80px 40px 120px; max-width: 1600px; margin: 0 auto; }
        .filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; margin-bottom: 60px; }
        .filter-btn { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #999; padding-bottom: 5px; border-bottom: 1px solid transparent; }
        .filter-btn.active { color: #000; border-color: #000; }
        
        .grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 60px 40px;
        }
        .project-card { cursor: pointer; transition: transform 0.5s ease; }
        .project-card:hover { transform: translateY(-10px); }
        .image-wrapper { overflow: hidden; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .image-wrapper img { width: 100%; transition: transform 0.7s ease; }
        .project-card:hover .image-wrapper img { transform: scale(1.05); }
        .project-info h3 { font-size: 24px; margin-bottom: 5px; font-weight: 400; }
        .project-info span { font-size: 10px; letter-spacing: 2px; color: #888; text-transform: uppercase; }

        /* Footer */
        footer { border-top: 1px solid #f0f0f0; padding: 100px 20px; text-align: center; }
        .footer-email { font-size: clamp(1.5rem, 4vw, 3rem); font-family: 'Italiana', serif; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 40px; display: inline-block; }
        .socials { display: flex; justify-content: center; gap: 30px; margin-bottom: 40px; color: #888; }
        
        /* Modals */
        .modal-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal-box { background: #fff; border: 1px solid #eee; padding: 40px; width: 100%; max-width: 450px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); position: relative; }
        .close-btn { position: absolute; top: 20px; right: 20px; color: #999; }
        .input-group { margin-bottom: 20px; }
        .input-group label { display: block; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 8px; }
        .input-group input, .input-group select { width: 100%; padding: 12px 0; border: none; border-bottom: 1px solid #ddd; outline: none; font-size: 16px; background: transparent; border-radius: 0; }
        .input-group input:focus { border-color: #000; }
        .submit-btn { width: 100%; background: #000; color: #fff; padding: 15px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 10px; transition: background 0.3s; }
        .submit-btn:hover { background: #333; }
        .upload-area { border: 2px dashed #eee; padding: 40px; text-align: center; cursor: pointer; margin-bottom: 20px; transition: border-color 0.3s; }
        .upload-area:hover { border-color: #000; }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          nav { padding: 0 20px; height: 70px; }
          .desktop-menu { display: none; }
          .mobile-menu-btn { display: block; }
          .hero { padding-top: 100px; min-height: 70vh; }
          .grid { grid-template-columns: 1fr; gap: 40px; }
          .portfolio-section { padding: 60px 20px; }
        }

        /* Mobile Menu Overlay */
        .mobile-menu {
          position: fixed; inset: 0; background: #fff; z-index: 1500;
          display: flex; flex-col; flex-direction: column; align-items: center; justify-content: center; gap: 30px;
        }
        .mobile-link { font-family: 'Italiana', serif; font-size: 32px; color: #000; text-decoration: none; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* --- CONTENT --- */}
      <nav>
        <div className="logo font-serif">NAEEM SABIR<span>.</span></div>
        <div className="desktop-menu">
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="nav-link">Home</button>
          <button onClick={() => document.getElementById('work').scrollIntoView({behavior:'smooth'})} className="nav-link">Portfolio</button>
          <button onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})} className="nav-link">Contact</button>
          {isAuthenticated ? (
            <button onClick={() => setIsUploadOpen(true)} className="nav-link" style={{color: 'green'}}>Add Work</button>
          ) : (
            <button onClick={() => setShowLogin(true)} className="nav-link"><Lock size={14}/></button>
          )}
        </div>
        <button className="mobile-menu-btn" onClick={() => setShowMenu(!showMenu)}>
          <Menu size={24} />
        </button>
      </nav>

      {showMenu && (
        <div className="mobile-menu">
          <button className="close-btn" onClick={() => setShowMenu(false)}><X size={32}/></button>
          <button onClick={() => {setShowMenu(false); window.scrollTo({top:0, behavior:'smooth'})}} className="mobile-link">Home</button>
          <button onClick={() => {setShowMenu(false); document.getElementById('work').scrollIntoView({behavior:'smooth'})}} className="mobile-link">Work</button>
          <button onClick={() => {setShowMenu(false); document.getElementById('contact').scrollIntoView({behavior:'smooth'})}} className="mobile-link">Contact</button>
          <button onClick={() => {setShowMenu(false); isAuthenticated ? setIsUploadOpen(true) : setShowLogin(true)}} className="nav-link" style={{fontSize: '14px', marginTop: '20px'}}>
             {isAuthenticated ? 'Upload Art' : 'Admin Login'}
          </button>
        </div>
      )}

      <header className="hero">
        <div className="hero-content">
          <span className="hero-subtitle">Graphic Designer & Visual Artist</span>
          <h1 className="font-serif">Visuals that <br/> Speak Louder.</h1>
          <p>Welcome to my portfolio. A curated collection of characters, stories, and identities crafted with precision and passion.</p>
          <button onClick={() => document.getElementById('work').scrollIntoView({behavior:'smooth'})} className="cta-btn">
            View Selected Works <ArrowRight size={16}/>
          </button>
        </div>
      </header>

      <section id="work" className="portfolio-section">
        <div className="filters">
          {filters.map(f => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)} 
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="image-wrapper">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <span className="font-serif">{project.category} — {project.year}</span>
                <h3 className="font-serif">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact">
        <div className="hero-content" style={{margin: '0 auto'}}>
          <span className="hero-subtitle">Get In Touch</span>
          <h2 className="font-serif" style={{fontSize: '3rem', marginBottom: '30px'}}>Let's collaborate.</h2>
          <a href="mailto:naeemsabir002@gmail.com" className="footer-email">naeemsabir002@gmail.com</a>
          <div className="socials">
            <Instagram size={20}/>
            <Twitter size={20}/>
            <Mail size={20}/>
          </div>
          <p style={{fontSize: '11px', color: '#ccc', textTransform: 'uppercase', letterSpacing: '2px'}}>
            © {new Date().getFullYear()} Naeem Sabir. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowLogin(false)}><X size={20}/></button>
            <h3 className="font-serif" style={{fontSize: '24px', marginBottom: '30px', textAlign: 'center'}}>Restricted Access</h3>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Username</label>
                <input type="text" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} placeholder="Enter username" />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} placeholder="Enter password" />
              </div>
              {loginError && <p style={{color: 'red', fontSize: '12px', textAlign: 'center'}}>{loginError}</p>}
              <button type="submit" className="submit-btn">Authenticate</button>
            </form>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="modal-overlay">
          <div className="modal-box" style={{maxWidth: '600px'}}>
            <button className="close-btn" onClick={() => setIsUploadOpen(false)}><X size={20}/></button>
            <h3 className="font-serif" style={{fontSize: '24px', marginBottom: '30px'}}>Add to Collection</h3>
            <form onSubmit={handleAddProject}>
              <div className="upload-area" style={{borderColor: previewUrl ? '#000' : '#eee'}}>
                <label style={{cursor: 'pointer'}}>
                  {previewUrl ? (
                    <img src={previewUrl} style={{maxHeight: '200px', margin: '0 auto'}} alt="Preview"/>
                  ) : (
                    <div>
                       <span style={{display: 'block', marginBottom: '10px'}}>Click to Upload Image</span>
                       <span style={{fontSize: '10px', color: '#999'}}>JPG, PNG supported</span>
                    </div>
                  )}
                  <input type="file" onChange={handleImageChange} hidden />
                </label>
              </div>
              
              <div className="input-group">
                <label>Title</label>
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Artwork Title" />
              </div>
              <div className="input-group">
                <label>Category</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                  {filters.filter(f => f !== 'ALL').map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <button type="submit" className="submit-btn" disabled={!newTitle || !previewUrl}>Publish</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;