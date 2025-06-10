import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import VideoList from './components/Videos/VideoList';
import VideoUpload from './components/Upload/VideoUpload';
import Analytics from './components/Analytics/Analytics';

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeView, setActiveView] = useState('dashboard');

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <LoginForm onToggleMode={() => setAuthMode('register')} />
    ) : (
      <RegisterForm onToggleMode={() => setAuthMode('login')} />
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'videos':
        return <VideoList />;
      case 'upload':
        return <VideoUpload />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">User Management</h3>
            <p className="mt-2 text-gray-600">Admin user management features would be implemented here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Settings</h3>
            <p className="mt-2 text-gray-600">Application settings and preferences would be configured here.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <VideoProvider>
        <MainApp />
      </VideoProvider>
    </AuthProvider>
  );
};

export default App;