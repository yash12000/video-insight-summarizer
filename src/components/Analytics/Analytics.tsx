import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, Target, Award } from 'lucide-react';
import { useVideo } from '../../contexts/VideoContext';
import { useAuth } from '../../contexts/AuthContext';

const Analytics: React.FC = () => {
  const { videos } = useVideo();
  const { user } = useAuth();

  const userVideos = videos.filter(video => video.userId === user?.id);
  const completedVideos = userVideos.filter(video => video.status === 'completed');

  const totalProcessingTime = userVideos.reduce((acc, video) => acc + video.duration, 0);
  const avgConfidence = completedVideos.length > 0
    ? completedVideos.reduce((acc, video) => acc + (video.summary?.confidence || 0), 0) / completedVideos.length
    : 0;

  const sentimentDistribution = completedVideos.reduce((acc, video) => {
    if (video.summary?.sentiment) {
      acc[video.summary.sentiment] = (acc[video.summary.sentiment] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topicFrequency = completedVideos.reduce((acc, video) => {
    video.summary?.topics.forEach(topic => {
      acc[topic] = (acc[topic] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topTopics = Object.entries(topicFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const avgEngagement = completedVideos.length > 0
    ? completedVideos.reduce((acc, video) => acc + (video.insights?.engagement || 0), 0) / completedVideos.length
    : 0;

  const avgComplexity = completedVideos.length > 0
    ? completedVideos.reduce((acc, video) => acc + (video.insights?.complexity || 0), 0) / completedVideos.length
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="text-gray-600">Detailed insights and analytics for your video content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Processing Time</p>
              <p className="text-2xl font-bold text-blue-900">
                {Math.floor(totalProcessingTime / 3600)}h {Math.floor((totalProcessingTime % 3600) / 60)}m
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Avg Confidence</p>
              <p className="text-2xl font-bold text-green-900">{(avgConfidence * 100).toFixed(1)}%</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Avg Engagement</p>
              <p className="text-2xl font-bold text-purple-900">{avgEngagement.toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Avg Complexity</p>
              <p className="text-2xl font-bold text-orange-900">{avgComplexity.toFixed(1)}%</p>
            </div>
            <Award className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Distribution</h3>
          {Object.keys(sentimentDistribution).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(sentimentDistribution).map(([sentiment, count]) => (
                <div key={sentiment} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      sentiment === 'positive' ? 'bg-green-500' :
                      sentiment === 'negative' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}></div>
                    <span className="capitalize text-gray-700">{sentiment}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          sentiment === 'positive' ? 'bg-green-500' :
                          sentiment === 'negative' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`}
                        style={{ width: `${(count / completedVideos.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Common Topics</h3>
          {topTopics.length > 0 ? (
            <div className="space-y-3">
              {topTopics.map(([topic, count], index) => (
                <div key={topic} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-medium">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{topic}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(count / Math.max(...Object.values(topicFrequency))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No topics identified yet</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Performance</h3>
        {completedVideos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Video</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Confidence</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Engagement</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Complexity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {completedVideos.slice(0, 5).map((video) => (
                  <tr key={video.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900 truncate max-w-xs">{video.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {((video.summary?.confidence || 0) * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {video.insights?.engagement || 0}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {video.insights?.complexity || 0}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        video.summary?.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                        video.summary?.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {video.summary?.sentiment || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No performance data</h3>
            <p className="mt-1 text-sm text-gray-500">Upload and process some videos to see analytics</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;