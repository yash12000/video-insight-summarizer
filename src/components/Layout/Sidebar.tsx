import React from 'react';
import { Home, Video, Upload, BarChart3, Users, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'videos', icon: Video, label: 'Videos' },
    { id: 'upload', icon: Upload, label: 'Upload Video' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    ...(user?.role === 'admin' ? [{ id: 'users', icon: Users, label: 'Users' }] : []),
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="bg-gray-50 border-r border-gray-200 w-64 p-6">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;