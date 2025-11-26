import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Lock, Unlock, Heart, Mail, Instagram, Twitter, Menu, ArrowRight, ArrowUpRight, Palette, Brush } from 'lucide-react';

const Portfolio = () => {
  // --- Global Font & Styles Injection ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // --- Custom Cursor Logic ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // --- State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // For Lightbox
  
  // Inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Upload State
  const [newCategory, setNewCategory] = useState('COVER ART');
  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Data
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [projects, setProjects] = useState([
    { id: 101, category: 'COMIC ART', image: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=800&fit=crop' },
    { id: 201, category: 'COVER ART', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&fit=crop' },
    { id: 301, category: 'CHARACTER ART', image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&fit=crop' },
    { id: 102, category: 'COMIC ART', image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&fit=crop' },
    { id: 202, category: 'COVER ART', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&fit=crop' },
    { id: 302, category: 'CHARACTER ART', image: 'https://images.unsplash.com/photo-1633479393782-b8d2a63cfc43?q=80&w=800&fit=crop' },
    { id: 103, category: 'COMIC ART', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&fit=crop' },
    { id: 203, category: 'COVER ART', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&fit=crop' },
    { id: 303, category: 'CHARACTER ART', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&fit=crop' },
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
    if (!previewUrl) return;
    const newProject = {
      id: Date.now(),
      category: newCategory,
      image: previewUrl,
    };
    setProjects([newProject, ...projects]);
    setNewImage(null);
    setPreviewUrl('');
    setIsUploadOpen(false);
  };

  return (
    <div className="app-container">
      {/* --- PREMIUM CSS STYLES --- */}
      <style>{`
        /* --- Reset & Base --- */
        * { box-sizing: border-box; margin: 0; padding: 0; cursor: none; /* Hide default cursor */ }
        html { scroll-behavior: smooth; }
        body { 
          background-color: #ffffff; 
          color: #111; 
          font-family: 'Montserrat', sans-serif; 
          -webkit-font-smoothing: antialiased; 
          overflow-x: hidden;
        }
        ::selection { background: #000; color: #fff; }
        
        /* --- Custom Cursor --- */
        .cursor-dot, .cursor-icon {
          position: fixed; top: 0; left: 0; transform: translate(-50%, -50%);
          pointer-events: none; z-index: 9999;
          transition: transform 0.1s ease;
        }
        .cursor-dot {
          width: 8px; height: 8px; background: #000; border-radius: 50%;
        }
        .cursor-icon {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(2px);
          border: 1px solid #000;
          border-radius: 50%;
          transition: width 0.3s, height 0.3s, background 0.3s;
        }
        .cursor-icon.hovered {
          width: 60px; height: 60px;
          background: #000; color: #fff;
          border-color: transparent;
        }

        /* --- Typography --- */
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        /* --- Animations --- */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* --- Navigation --- */
        nav {
          position: fixed; top: 0; left: 0; right: 0; height: 100px;
          background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%; z-index: 1000;
        }
        .logo { font-size: 20px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
        .desktop-menu { display: flex; gap: 50px; align-items: center; }
        .nav-link { 
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase; 
          font-weight: 500; color: #666; transition: color 0.3s; 
        }
        .nav-link:hover { color: #000; }
        .mobile-menu-btn { display: none; }

        /* --- Hero Section --- */
        .hero {
          min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 0 20px; position: relative;
        }
        .hero-content { max-width: 900px; animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .hero h1 { 
          font-size: clamp(3rem, 7vw, 6.5rem); line-height: 1.1; margin-bottom: 30px; 
          font-weight: 400; font-style: italic;
        }
        .hero h1 span { font-style: normal; font-weight: 600; display: block; }
        .hero p { font-size: 1.1rem; color: #666; max-width: 500px; margin: 0 auto 40px; font-weight: 300; }
        
        /* --- Portfolio Section --- */
        .portfolio-section { padding: 40px 5% 100px; max-width: 1800px; margin: 0 auto; }
        .filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; margin-bottom: 60px; }
        .filter-btn { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #999; transition: all 0.3s; }
        .filter-btn.active { color: #000; font-weight: 600; transform: scale(1.1); }
        .filter-btn:hover { color: #000; }

        .grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 40px;
        }
        
        /* CLEAN IMAGE CARD */
        .project-card { 
          position: relative; overflow: hidden; border-radius: 2px; 
          aspect-ratio: 3/4; /* Consistent Portrait Ratio */
          animation: fadeInUp 0.8s ease-out backwards;
        }
        .project-card:nth-child(even) { animation-delay: 0.1s; }
        .project-card:nth-child(odd) { animation-delay: 0.2s; }

        .project-card img { 
          width: 100%; height: 100%; object-fit: cover; 
          transition: transform 1s cubic-bezier(0.2, 0.8, 0.2, 1); 
        }
        
        /* Interactive Overlay */
        .card-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.2); 
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.4s ease;
        }
        .view-text {
          color: #fff; border: 1px solid #fff; padding: 10px 20px;
          text-transform: uppercase; letter-spacing: 2px; font-size: 10px;
          transform: translateY(20px); transition: transform 0.4s ease;
        }
        
        /* Hover State */
        .project-card:hover img { transform: scale(1.05); }
        .project-card:hover .card-overlay { opacity: 1; }
        .project-card:hover .view-text { transform: translateY(0); }

        /* --- Lightbox --- */
        .lightbox {
          position: fixed; inset: 0; background: rgba(255,255,255,0.98); z-index: 5000;
          display: flex; align-items: center; justify-content: center;
          animation: zoomIn 0.3s ease;
        }
        .lightbox-img {
          max-width: 90vw; max-height: 90vh; object-fit: contain;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }
        .lightbox-close {
          position: absolute; top: 30px; right: 30px;
          width: 50px; height: 50px; border-radius: 50%; border: 1px solid #000;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s;
        }
        .lightbox-close:hover { background: #000; color: #fff; transform: rotate(90deg); }

        /* --- Footer --- */
        footer { 
          padding: 100px 20px; text-align: center; margin-top: 100px;
          border-top: 1px solid #f0f0f0;
        }
        .footer-email { 
          font-family: 'Playfair Display', serif; font-size: clamp(1.5rem, 4vw, 3rem); 
          color: #000; text-decoration: none; padding-bottom: 5px;
          border-bottom: 1px solid #000;
        }

        /* --- Mobile --- */
        @media (max-width: 768px) {
          .desktop-menu { display: none; }
          .mobile-menu-btn { display: block; }
          .grid { grid-template-columns: 1fr; gap: 20px; }
          .hero h1 { font-size: 3rem; }
        }

        /* --- Mobile Menu Overlay --- */
        .mobile-menu {
          position: fixed; inset: 0; background: #fff; z-index: 2000;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px;
        }
        .mobile-link { font-family: 'Playfair Display', serif; font-size: 32px; color: #000; text-decoration: none; }
        
        /* --- Modal Styles --- */
        .modal-overlay { 
          position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 3000; 
          display: flex; align-items: center; justify-content: center; padding: 20px;
          backdrop-filter: blur(5px);
        }
        .modal-box { 
          background: #fff; width: 100%; max-width: 500px; padding: 40px; 
          position: relative; border-radius: 4px;
        }
        .input-group label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 10px; color: #555; }
        .input-group input, .input-group select { 
          width: 100%; border: 1px solid #eee; padding: 15px; margin-bottom: 20px; 
          font-family: 'Montserrat', sans-serif;
        }
        .submit-btn { width: 100%; background: #000; color: #fff; padding: 15px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; font-size: 11px; }
      `}</style>

      {/* --- CUSTOM CURSOR --- */}
      <div 
        className="cursor-dot"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
      <div 
        className={`cursor-icon ${isHovering ? 'hovered' : ''}`}
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      >
        <Brush size={isHovering ? 24 : 16} strokeWidth={1.5} />
      </div>

      {/* --- NAVIGATION --- */}
      <nav 
        onMouseEnter={() => setIsHovering(true)} 
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="logo font-serif">NAEEM SABIR</div>
        <div className="desktop-menu">
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="nav-link">Home</button>
          <button onClick={() => document.getElementById('work').scrollIntoView({behavior:'smooth'})} className="nav-link">Gallery</button>
          <button onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})} className="nav-link">Contact</button>
          {isAuthenticated ? (
             <button onClick={() => setIsUploadOpen(true)} className="nav-link" style={{color:'#10b981'}}>Add Art</button>
          ) : (
             <button onClick={() => setShowLogin(true)} className="nav-link"><Lock size={14}/></button>
          )}
        </div>
        <button className="mobile-menu-btn" onClick={() => setShowMenu(!showMenu)}>
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="mobile-menu">
          <button className="close-btn" style={{position:'absolute', top:30, right:30}} onClick={() => setShowMenu(false)}><X size={32}/></button>
          <button onClick={() => {setShowMenu(false); window.scrollTo({top:0, behavior:'smooth'})}} className="mobile-link">Home</button>
          <button onClick={() => {setShowMenu(false); document.getElementById('work').scrollIntoView({behavior:'smooth'})}} className="mobile-link">Gallery</button>
          <button onClick={() => {setShowMenu(false); document.getElementById('contact').scrollIntoView({behavior:'smooth'})}} className="mobile-link">Contact</button>
          <button onClick={() => {setShowMenu(false); isAuthenticated ? setIsUploadOpen(true) : setShowLogin(true)}} className="mobile-link" style={{fontSize: '16px', color: '#888'}}>
             {isAuthenticated ? 'Upload Art' : 'Admin Login'}
          </button>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="font-serif">Visuals That<br/><span>Speak Louder.</span></h1>
          <p>A digital archive of my imagination. No words needed.</p>
        </div>
      </header>

      {/* --- GALLERY SECTION --- */}
      <section id="work" className="portfolio-section">
        <div className="filters" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
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
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setSelectedProject(project)}
            >
              <img src={project.image} alt="Artwork" />
              <div className="card-overlay">
                <div className="view-text">View Fullsize</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <a href="mailto:naeemsabir002@gmail.com" className="footer-email">naeemsabir002@gmail.com</a>
        <p style={{fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '30px'}}>
          © {new Date().getFullYear()} Naeem Sabir.
        </p>
      </footer>

      {/* --- LIGHTBOX (FULL SCREEN VIEW) --- */}
      {selectedProject && (
        <div className="lightbox" onClick={() => setSelectedProject(null)}>
          <button className="lightbox-close">
            <X size={24} />
          </button>
          <img 
            src={selectedProject.image} 
            alt="Fullsize Art" 
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
          />
        </div>
      )}

      {/* --- LOGIN MODAL --- */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-box" onMouseEnter={() => setIsHovering(false)}>
            <button className="close-btn" style={{position:'absolute', top:20, right:20}} onClick={() => setShowLogin(false)}><X size={20}/></button>
            <h3 className="font-serif" style={{fontSize: '24px', marginBottom: '30px', textAlign: 'center'}}>Creator Access</h3>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Username</label>
                <input type="text" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
              </div>
              {loginError && <p style={{color: '#e11d48', fontSize: '12px', textAlign: 'center', marginBottom: '15px'}}>{loginError}</p>}
              <button type="submit" className="submit-btn">Unlock</button>
            </form>
          </div>
        </div>
      )}

      {/* --- UPLOAD MODAL --- */}
      {isUploadOpen && (
        <div className="modal-overlay">
          <div className="modal-box" onMouseEnter={() => setIsHovering(false)}>
            <button className="close-btn" style={{position:'absolute', top:20, right:20}} onClick={() => setIsUploadOpen(false)}><X size={20}/></button>
            <h3 className="font-serif" style={{fontSize: '24px', marginBottom: '30px', textAlign: 'center'}}>Add New Masterpiece</h3>
            <form onSubmit={handleAddProject}>
              <div style={{border: '2px dashed #eee', padding: '30px', textAlign: 'center', marginBottom: '20px', cursor: 'pointer', borderRadius: '4px'}}>
                <label style={{cursor: 'pointer'}}>
                  {previewUrl ? (
                    <img src={previewUrl} style={{maxHeight: '150px', margin: '0 auto', display: 'block'}} alt="Preview"/>
                  ) : (
                    <div>
                       <ArrowUpRight size={24} color="#999" style={{marginBottom: '10px'}}/>
                       <span style={{display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999'}}>Upload Image</span>
                    </div>
                  )}
                  <input type="file" onChange={handleImageChange} hidden />
                </label>
              </div>
              
              <div className="input-group">
                <label>Category</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                  {filters.filter(f => f !== 'ALL').map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <button type="submit" className="submit-btn" disabled={!previewUrl}>Publish to Gallery</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Portfolio;