# Video Insight Summarizer

A modern, AI-powered video analysis platform that provides intelligent summarization, sentiment analysis, and actionable insights from video content. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality

- **Video Upload & Processing**: Support for URL-based and file uploads with real-time processing status
- **AI-Powered Analysis**: Intelligent video summarization with confidence scoring
- **Sentiment Analysis**: Automatic detection of positive, negative, and neutral sentiment
- **Topic Identification**: Extraction of key topics and themes from video content
- **Actionable Insights**: Generated recommendations and action items
- **Export Capabilities**: Download summaries and insights in multiple formats

### User Experience

- **Modern Authentication**: Secure login/registration system
- **Responsive Dashboard**: Comprehensive overview with analytics and statistics
- **Video Management**: Advanced filtering, search, and organization tools
- **Real-time Updates**: Live processing status and progress tracking
- **Analytics Dashboard**: Detailed performance metrics and visualizations
- **Role-based Access**: User and admin role management

### Technical Features

- **TypeScript**: Full type safety and enhanced developer experience
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern UI/UX**: Apple-level design aesthetics with smooth animations
- **Context-based State Management**: Efficient data flow and state persistence
- **Local Storage**: Persistent data storage for demo purposes

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Linting**: ESLint with TypeScript support
- **Styling**: Tailwind CSS with custom design system

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser

## 🚀 Getting Started

### 1. Clone the Repository

git clone https://github.com/yash12000/video-insight-summarizer.git

cd video-insight-summarizer

### 2. Install Dependencies

npm install

### 3. Start Development Server

npm run dev

### 4. Open in Browser

Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
video-insight-summarizer/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Analytics/
│   │   │   └── Analytics.tsx
│   │   ├── Auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── Upload/
│   │   │   └── VideoUpload.tsx
│   │   └── Videos/
│   │       ├── VideoList.tsx
│   │       └── VideoDetailModal.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── VideoContext.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Usage

### Authentication

1. **Registration**: Create a new account with email and password
2. **Login**: Access your account with registered credentials
3. **Role Management**: Automatic role assignment (user/admin)

### Video Management

1. **Upload Videos**:
   - Use video URLs from supported platforms
   - Upload local video files (up to 2GB)
2. **Processing**: Monitor real-time analysis progress
3. **View Results**: Access detailed summaries and insights
4. **Export Data**: Download summaries in various formats

### Analytics

- **Dashboard Overview**: Key metrics and recent activity
- **Performance Analytics**: Engagement scores and complexity analysis
- **Sentiment Tracking**: Distribution of positive/negative content
- **Topic Analysis**: Most common themes and subjects

## 🔧 Development

### Available Scripts

npm run dev

# Build for production

npm run build

# Preview production build

npm run preview

# Run linting

npm run lint

### Component Architecture

- **Functional Components**: Using React hooks
- **Context API**: For global state management
- **Custom Hooks**: Reusable logic extraction
- **TypeScript Interfaces**: Comprehensive type definitions

## 🚀 Deployment

### Build for Production

npm run build


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- Vite for the fast build tool
