import React, { useState } from 'react';
import { Upload, Link, Video, AlertCircle, CheckCircle } from 'lucide-react';
import { useVideo } from '../../contexts/VideoContext';

const VideoUpload: React.FC = () => {
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { addVideo } = useVideo();

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim() || !videoTitle.trim()) return;

    setIsUploading(true);
    
    setTimeout(() => {
      addVideo({
        title: videoTitle,
        videoUrl: videoUrl,
        duration: Math.floor(Math.random() * 3600) + 300,
        thumbnailUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'
      });
      
      setIsUploading(false);
      setUploadSuccess(true);
      setVideoUrl('');
      setVideoTitle('');
      
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Upload Video</h2>
        <p className="text-gray-600">Upload a video to generate AI-powered insights and summaries</p>
      </div>

      {uploadSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800">Video uploaded successfully! Processing will begin shortly.</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">Upload Method</label>
          <div className="flex space-x-4">
            <button
              onClick={() => setUploadMethod('url')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                uploadMethod === 'url'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Link className="h-4 w-4" />
              <span>Video URL</span>
            </button>
            <button
              onClick={() => setUploadMethod('file')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                uploadMethod === 'file'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>File Upload</span>
            </button>
          </div>
        </div>

        {uploadMethod === 'url' && (
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Video Title
              </label>
              <input
                type="text"
                id="videoTitle"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Enter a descriptive title for your video"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <input
                type="url"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Supported formats:</p>
                  <p>MP4, AVI, MOV, WMV, and most common video formats. Maximum file size: 2GB.</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading || !videoUrl.trim() || !videoTitle.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Upload Video</span>
                </>
              )}
            </button>
          </form>
        )}

        {uploadMethod === 'file' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Video Title
              </label>
              <input
                type="text"
                id="videoTitle"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Enter a descriptive title for your video"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Video className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <span className="text-lg font-medium text-gray-900">Click to upload a video</span>
                <p className="text-gray-500 mt-2">or drag and drop your file here</p>
                <input
                  type="file"
                  id="fileUpload"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-400 mt-4">
                Maximum file size: 2GB • Supported formats: MP4, AVI, MOV, WMV
              </p>
            </div>

            <button
              disabled={!videoTitle.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Process Video</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens after upload?</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-sm font-medium">1</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Video Processing</p>
              <p className="text-gray-600 text-sm">Your video is analyzed using advanced AI algorithms</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-sm font-medium">2</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Content Analysis</p>
              <p className="text-gray-600 text-sm">Key topics, sentiment, and insights are extracted</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-sm font-medium">3</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Summary Generation</p>
              <p className="text-gray-600 text-sm">Comprehensive summary and actionable insights are created</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;