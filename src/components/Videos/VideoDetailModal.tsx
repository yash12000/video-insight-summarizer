import React from 'react';
import { X, Download, ExternalLink, Tag, TrendingUp, Clock, Brain } from 'lucide-react';
import { useVideo } from '../../contexts/VideoContext';

interface VideoDetailModalProps {
  videoId: string;
  onClose: () => void;
}

const VideoDetailModal: React.FC<VideoDetailModalProps> = ({ videoId, onClose }) => {
  const { getVideoById } = useVideo();
  const video = getVideoById(videoId);

  if (!video) return null;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{video.title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-32 w-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="h-32 w-48 bg-gray-300 rounded-lg flex items-center justify-center">
                    <video className="h-16 w-16 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    video.status === 'completed' ? 'bg-green-100 text-green-800' :
                    video.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {video.status}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDuration(video.duration)}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Uploaded on {new Date(video.uploadedAt).toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Video</span>
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export Summary</span>
                  </button>
                </div>
              </div>
            </div>

            {video.summary && (
              <>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">AI Summary</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {(video.summary.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{video.summary.overview}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {video.summary.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Topics Identified</h3>
                  <div className="flex flex-wrap gap-2">
                    {video.summary.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sentiment Analysis</h3>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className={`capitalize px-3 py-1 rounded-full text-sm font-medium ${
                      video.summary.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                      video.summary.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {video.summary.sentiment}
                    </span>
                  </div>
                </div>
              </>
            )}

            {video.insights && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Engagement Score</h4>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${video.insights.engagement}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{video.insights.engagement}%</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Complexity Level</h4>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${video.insights.complexity}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold text-purple-600">{video.insights.complexity}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Action Items</h3>
                  <ul className="space-y-2">
                    {video.insights.actionItems.map((item, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {video.insights.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailModal;