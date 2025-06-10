export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface VideoSummary {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  uploadedAt: Date;
  status: 'processing' | 'completed' | 'failed';
  summary?: {
    overview: string;
    keyPoints: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    topics: string[];
    confidence: number;
  };
  insights?: {
    engagement: number;
    complexity: number;
    actionItems: string[];
    recommendations: string[];
  };
  userId: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}