import React, { createContext, useContext, useState, useEffect } from 'react';
import { VideoSummary } from '../types';
import { useAuth } from './AuthContext';

interface VideoContextType {
  videos: VideoSummary[];
  addVideo: (videoData: Partial<VideoSummary>) => void;
  updateVideo: (id: string, updates: Partial<VideoSummary>) => void;
  deleteVideo: (id: string) => void;
  getVideoById: (id: string) => VideoSummary | undefined;
}

const VideoContext = createContext<VideoContextType | null>(null);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

interface VideoProviderProps {
  children: React.ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [videos, setVideos] = useState<VideoSummary[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedVideos = localStorage.getItem('videoSummaries');
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    } else {
      const demoVideos: VideoSummary[] = [
        {
          id: '1',
          title: 'Product Launch Presentation',
          videoUrl: 'https://example.com/video1',
          thumbnailUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: 1800,
          uploadedAt: new Date('2024-01-15'),
          status: 'completed',
          summary: {
            overview: 'Comprehensive product launch presentation covering new features, market positioning, and go-to-market strategy.',
            keyPoints: [
              'New AI-powered analytics dashboard',
              'Enhanced user experience improvements',
              'Competitive pricing strategy',
              'Q2 launch timeline confirmed'
            ],
            sentiment: 'positive',
            topics: ['Product Launch', 'AI Analytics', 'Market Strategy', 'User Experience'],
            confidence: 0.92
          },
          insights: {
            engagement: 85,
            complexity: 68,
            actionItems: [
              'Finalize marketing materials',
              'Schedule customer demos',
              'Prepare sales training'
            ],
            recommendations: [
              'Focus on AI capabilities in messaging',
              'Highlight competitive advantages',
              'Emphasize user experience improvements'
            ]
          },
          userId: '1'
        },
        {
          id: '2',
          title: 'Customer Feedback Session',
          videoUrl: 'https://example.com/video2',
          thumbnailUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: 3600,
          uploadedAt: new Date('2024-01-12'),
          status: 'completed',
          summary: {
            overview: 'Customer feedback session revealing insights about user satisfaction, pain points, and feature requests.',
            keyPoints: [
              'High satisfaction with core features',
              'Request for mobile app improvements',
              'Need for better integration options',
              'Positive reception of new UI design'
            ],
            sentiment: 'positive',
            topics: ['Customer Feedback', 'Mobile App', 'Integrations', 'UI Design'],
            confidence: 0.88
          },
          insights: {
            engagement: 92,
            complexity: 45,
            actionItems: [
              'Prioritize mobile app enhancements',
              'Research integration partnerships',
              'Continue UI/UX improvements'
            ],
            recommendations: [
              'Develop mobile app roadmap',
              'Create integration marketplace',
              'Conduct more frequent feedback sessions'
            ]
          },
          userId: '1'
        }
      ];
      setVideos(demoVideos);
      localStorage.setItem('videoSummaries', JSON.stringify(demoVideos));
    }
  }, []);

  const addVideo = (videoData: Partial<VideoSummary>) => {
    if (!user) return;

    const newVideo: VideoSummary = {
      id: Date.now().toString(),
      title: videoData.title || 'Untitled Video',
      videoUrl: videoData.videoUrl || '',
      thumbnailUrl: videoData.thumbnailUrl,
      duration: videoData.duration || 0,
      uploadedAt: new Date(),
      status: 'processing',
      userId: user.id,
      ...videoData
    };

    const updatedVideos = [...videos, newVideo];
    setVideos(updatedVideos);
    localStorage.setItem('videoSummaries', JSON.stringify(updatedVideos));

    setTimeout(() => {
      updateVideo(newVideo.id, {
        status: 'completed',
        summary: {
          overview: 'AI-generated summary of the video content.',
          keyPoints: ['Key insight 1', 'Key insight 2', 'Key insight 3'],
          sentiment: 'neutral',
          topics: ['Topic 1', 'Topic 2'],
          confidence: 0.85
        },
        insights: {
          engagement: 75,
          complexity: 60,
          actionItems: ['Action item 1', 'Action item 2'],
          recommendations: ['Recommendation 1', 'Recommendation 2']
        }
      });
    }, 3000);
  };

  const updateVideo = (id: string, updates: Partial<VideoSummary>) => {
    const updatedVideos = videos.map(video =>
      video.id === id ? { ...video, ...updates } : video
    );
    setVideos(updatedVideos);
    localStorage.setItem('videoSummaries', JSON.stringify(updatedVideos));
  };

  const deleteVideo = (id: string) => {
    const updatedVideos = videos.filter(video => video.id !== id);
    setVideos(updatedVideos);
    localStorage.setItem('videoSummaries', JSON.stringify(updatedVideos));
  };

  const getVideoById = (id: string) => {
    return videos.find(video => video.id === id);
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        addVideo,
        updateVideo,
        deleteVideo,
        getVideoById,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};