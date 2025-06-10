import React from 'react';
import { Video, Clock, TrendingUp, Users } from 'lucide-react';
import { useVideo } from '../../contexts/VideoContext';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { videos } = useVideo();
  const { user } = useAuth();

  const userVideos = videos.filter(video => video.userId === user?.id);
  const completedVideos = userVideos.filter(video => video.status === 'completed');
  const totalDuration = userVideos.reduce((acc, video) => acc + video.duration, 0);
  const avgConfidence = completedVideos.length > 0
    ? completedVideos.reduce((acc, video) => acc + (video.summary?.confidence || 0), 0) / completedVideos.length
    : 0;

  const stats = [
    {
      label: 'Total Videos',
      value: userVideos.length.toString(),
      icon: Video,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      label: 'Total Duration',
      value: `${Math.floor(totalDuration / 60)}m`,
      icon: Clock,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      label: 'Avg Confidence',
      value: `${(avgConfidence * 100).toFixed(0)}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      label: 'Processed',
      value: completedVideos.length.toString(),
      icon: Users,
      color: 'bg-orange-500',
      change: '+23%'
    },
  ];

  const recentVideos = userVideos
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Overview of your video insights and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Videos</h3>
        </div>
        <div className="p-6">
          {recentVideos.length > 0 ? (
            <div className="space-y-4">
              {recentVideos.map((video) => (
                <div key={video.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="h-16 w-24 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="h-16 w-24 bg-gray-300 rounded-lg flex items-center justify-center">
                        <Video className="h-8 w-8 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{video.title}</h4>
                    <p className="text-sm text-gray-500">
                      {Math.floor(video.duration / 60)}m {video.duration % 60}s
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        video.status === 'completed' ? 'bg-green-100 text-green-800' :
                        video.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {video.status}
                      </span>
                      {video.summary?.confidence && (
                        <span className="text-xs text-gray-500">
                          {(video.summary.confidence * 100).toFixed(0)}% confidence
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(video.uploadedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No videos uploaded yet. Start by uploading your first video!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;