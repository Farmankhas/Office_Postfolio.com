import React, { useState, useEffect } from 'react';
import { INITIAL_PORTFOLIO_CONFIG } from './portfolioConfig.ts';
import { PortfolioData, ProjectItem } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { FAGroupSection } from './components/FAGroupSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { JourneySection } from './components/JourneySection.tsx';
import { ToolsSection } from './components/ToolsSection.tsx';
import { WhyWorkWithMeSection } from './components/WhyWorkWithMeSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { FinalCTASection } from './components/FinalCTASection.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminLogin } from './components/AdminLogin.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { ShieldCheck } from 'lucide-react';
import {
  subscribeToAuthState,
  verifyAdminToken,
  logoutAdmin,
  loadPortfolioContent,
  savePortfolioContent,
} from './lib/firebase.ts';

export function App() {
  // Main portfolio state
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('my_skills_portfolio_custom_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedPhoto = localStorage.getItem('my_skills_profile_image');
        if (savedPhoto) {
          parsed.profileImage = savedPhoto;
        }
        return { ...INITIAL_PORTFOLIO_CONFIG, ...parsed };
      }
    } catch {
      // ignore
    }

    const standalonePhoto = localStorage.getItem('my_skills_profile_image');
    if (standalonePhoto) {
      return { ...INITIAL_PORTFOLIO_CONFIG, profileImage: standalonePhoto };
    }

    return INITIAL_PORTFOLIO_CONFIG;
  });

  // Authenticated admin state managed securely via Firebase Auth and server validation
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return sessionStorage.getItem('fa_admin_token');
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Active view: 'none' (public portfolio) | 'login' | 'dashboard'
  const [adminView, setAdminView] = useState<'none' | 'login' | 'dashboard'>('none');
  const [selectedServicePreFill, setSelectedServicePreFill] = useState<string>('Website');

  // 1. Fetch official published portfolio data on initial mount
  useEffect(() => {
    loadPortfolioContent().then((published) => {
      if (published && published.portfolioName) {
        setData((prev) => ({ ...prev, ...published }));
      }
    });
  }, []);

  // 2. Validate administrator session on startup and subscribe to auth changes
  useEffect(() => {
    const checkInitialAuth = async () => {
      const existingToken = sessionStorage.getItem('fa_admin_token');
      if (existingToken) {
        const verification = await verifyAdminToken(existingToken);
        if (verification.authorized) {
          setAdminToken(existingToken);
          setIsAdmin(true);
        } else {
          sessionStorage.removeItem('fa_admin_token');
          setAdminToken(null);
          setIsAdmin(false);
        }
      }
      setAuthChecking(false);
    };

    checkInitialAuth();

    const unsubscribe = subscribeToAuthState(async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const verification = await verifyAdminToken(idToken);
          if (verification.authorized) {
            sessionStorage.setItem('fa_admin_token', idToken);
            setAdminToken(idToken);
            setIsAdmin(true);
          } else {
            await logoutAdmin(idToken);
            sessionStorage.removeItem('fa_admin_token');
            setAdminToken(null);
            setIsAdmin(false);
          }
        } catch {
          // ignore
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // 3. Route handling for /admin, /admin/login, /admin/dashboard, and hash routes
  useEffect(() => {
    const evaluateRoute = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      const isAdminDashboardRoute =
        pathname === '/admin/dashboard' ||
        pathname === '/admin' ||
        hash === '#admin/dashboard' ||
        hash === '#admin';

      const isAdminLoginRoute =
        pathname === '/admin/login' ||
        hash === '#admin/login';

      if (isAdminDashboardRoute) {
        // Route protection: If authenticated and verified admin, show dashboard.
        // Otherwise, redirect to login.
        if (isAdmin && adminToken) {
          setAdminView('dashboard');
        } else {
          setAdminView('login');
        }
      } else if (isAdminLoginRoute) {
        // If already authenticated and verified as admin, proceed to dashboard
        if (isAdmin && adminToken) {
          setAdminView('dashboard');
        } else {
          setAdminView('login');
        }
      }
    };

    if (!authChecking) {
      evaluateRoute();
    }

    window.addEventListener('hashchange', evaluateRoute);
    window.addEventListener('popstate', evaluateRoute);

    return () => {
      window.removeEventListener('hashchange', evaluateRoute);
      window.removeEventListener('popstate', evaluateRoute);
    };
  }, [isAdmin, adminToken, authChecking]);

  // Handle saving data from Admin Dashboard to Firestore and backend
  const handleSaveDataFromAdmin = async (newData: PortfolioData) => {
    if (!adminToken || !isAdmin) {
      throw new Error('Unauthorized: Administrator authentication required to save portfolio changes.');
    }

    const result = await savePortfolioContent(newData, adminToken);
    if (!result.success) {
      throw new Error(result.error || 'Failed to update portfolio data.');
    }

    // Update state and local client fallback
    setData(newData);
    try {
      localStorage.setItem('my_skills_portfolio_custom_data', JSON.stringify(newData));
      if (newData.profileImage) {
        localStorage.setItem('my_skills_profile_image', newData.profileImage);
      } else {
        localStorage.removeItem('my_skills_profile_image');
      }
    } catch {
      // ignore
    }
  };

  // Handle admin logout
  const handleAdminLogout = async () => {
    if (adminToken) {
      await logoutAdmin(adminToken);
    }
    sessionStorage.removeItem('fa_admin_token');
    setAdminToken(null);
    setIsAdmin(false);
    setAdminView('none');

    if (window.location.hash.includes('admin')) {
      window.location.hash = '';
    }
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    }
  };

  // Handle direct profile image update (only allowed for authenticated admin)
  const handleAdminProfileImageChange = async (newImg: string) => {
    if (!isAdmin || !adminToken) return;
    const updated = { ...data, profileImage: newImg };
    try {
      await handleSaveDataFromAdmin(updated);
    } catch {
      setData(updated);
    }
  };

  // Handle direct project update (only allowed for authenticated admin)
  const handleAdminUpdateProject = async (updatedProject: ProjectItem) => {
    if (!isAdmin || !adminToken) return;
    const newProjects = data.projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    const updated = { ...data, projects: newProjects };
    try {
      await handleSaveDataFromAdmin(updated);
    } catch {
      setData(updated);
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServicePreFill(serviceTitle);
  };

  // ----------------------------------------------------
  // ADMIN DASHBOARD VIEW (Strictly Protected)
  // ----------------------------------------------------
  if (adminView === 'dashboard') {
    if (isAdmin && adminToken) {
      return (
        <AdminDashboard
          adminEmail="Administrator"
          adminToken={adminToken}
          data={data}
          onSaveData={handleSaveDataFromAdmin}
          onLogout={handleAdminLogout}
          onViewPublicSite={() => {
            setAdminView('none');
            if (window.location.pathname.startsWith('/admin')) {
              window.history.pushState(null, '', '/');
            }
            if (window.location.hash.includes('admin')) {
              window.location.hash = '';
            }
          }}
        />
      );
    } else {
      // Protected Route fallback: Redirect to login
      return (
        <AdminLogin
          onLoginSuccess={(token) => {
            setAdminToken(token);
            setIsAdmin(true);
            setAdminView('dashboard');
          }}
          onBackToPublic={() => {
            setAdminView('none');
            if (window.location.pathname.startsWith('/admin')) {
              window.history.pushState(null, '', '/');
            }
            if (window.location.hash.includes('admin')) {
              window.location.hash = '';
            }
          }}
        />
      );
    }
  }

  // ----------------------------------------------------
  // ADMIN LOGIN VIEW
  // ----------------------------------------------------
  if (adminView === 'login') {
    return (
      <AdminLogin
        onLoginSuccess={(token) => {
          setAdminToken(token);
          setIsAdmin(true);
          setAdminView('dashboard');
        }}
        onBackToPublic={() => {
          setAdminView('none');
          if (window.location.pathname.startsWith('/admin')) {
            window.history.pushState(null, '', '/');
          }
          if (window.location.hash.includes('admin')) {
            window.location.hash = '';
          }
        }}
      />
    );
  }

  // ----------------------------------------------------
  // PUBLIC PORTFOLIO WEBSITE (SECURE READ-ONLY FOR VISITORS)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#050508] text-neutral-100 selection:bg-purple-600 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar
        portfolioName={data.portfolioName}
        companyName={data.companyName}
        companyTagline={data.companyTagline}
        isAdmin={isAdmin}
        onOpenAdmin={() => {
          if (isAdmin) {
            setAdminView('dashboard');
          } else {
            setAdminView('login');
          }
        }}
        onLogout={handleAdminLogout}
      />

      <main>
        {/* 1. Hero Section with 3D Profile Frame & 3D Workspace */}
        <HeroSection
          headline={data.heroHeadline}
          subtitle={data.heroSubtitle}
          role={data.heroRole}
          description={data.heroDescription}
          brandBadge={data.heroBadge}
          profileImage={data.profileImage}
          onProfileImageChange={isAdmin ? handleAdminProfileImageChange : undefined}
          companyName={data.companyName}
          companyTagline={data.companyTagline}
          isAdmin={isAdmin}
        />

        {/* 2. About Me Section with Prominent Profile Image & Stats */}
        <AboutSection
          heading={data.aboutHeading}
          bio={data.aboutBio}
          faLinkText={data.aboutFALink}
          profileImage={data.profileImage}
          onOpenUpload={isAdmin ? () => setAdminView('dashboard') : undefined}
          identities={data.identities}
          stats={data.stats}
          companyName={data.companyName}
        />

        {/* 3. FA GROUP 3D Brand Section with 3D Metallic FA Logo */}
        <FAGroupSection
          companyName={data.companyName}
          companyTagline={data.companyTagline}
          companyDescription={data.companyDescription}
        />

        {/* 4. Interactive Skills Section */}
        <SkillsSection categories={data.skills} />

        {/* 5. Professional Services Section */}
        <ServicesSection
          services={data.services}
          onSelectService={handleSelectService}
          companyName={data.companyName}
        />

        {/* 6. Featured Projects Section with 3D Cards */}
        <ProjectsSection
          projects={data.projects}
          onUpdateProject={isAdmin ? handleAdminUpdateProject : undefined}
          isAdmin={isAdmin}
        />

        {/* 7. My Creative Journey Timeline */}
        <JourneySection journey={data.journey} />

        {/* 8. Tools & Technologies Section */}
        <ToolsSection tools={data.tools} />

        {/* 9. Why Work With Me Section */}
        <WhyWorkWithMeSection items={data.whyWorkWithMe} />

        {/* 10. Contact Section */}
        <ContactSection
          socialLinks={data.socialLinks}
          contactEmail={data.contactEmail}
          contactLocation={data.contactLocation}
          companyName={data.companyName}
          selectedServicePreFill={selectedServicePreFill}
        />

        {/* 11. Final Call To Action */}
        <FinalCTASection
          companyName={data.companyName}
          companyTagline={data.companyTagline}
        />
      </main>

      {/* Footer with discreet Admin Portal access */}
      <Footer
        portfolioName={data.portfolioName}
        companyName={data.companyName}
        companyTagline={data.companyTagline}
        socialLinks={data.socialLinks}
        isAdmin={isAdmin}
        onOpenAdmin={() => {
          if (isAdmin) {
            setAdminView('dashboard');
          } else {
            setAdminView('login');
          }
        }}
      />

      {/* Authenticated Admin Floating Switcher (ONLY visible when signed in) */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => setAdminView('dashboard')}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-950/90 hover:bg-purple-900 border border-purple-400/60 text-purple-200 hover:text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
            title="Open Admin Dashboard"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wide font-mono">
              Admin Dashboard
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
