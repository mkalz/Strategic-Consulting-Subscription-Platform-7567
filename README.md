# GCM StrategyMap - Strategic Consulting Platform

A professional Group Concept Mapping platform for strategic consulting and organizational development. Transform complex challenges into clear, actionable insights.

## 🎯 About Group Concept Mapping

Group Concept Mapping (GCM) is a proven methodology that combines:
- **Collaborative brainstorming** for idea generation
- **Structured organization** of concepts and themes  
- **Quantitative analysis** through rating and prioritization
- **Visual representation** of complex strategic relationships

## 🚀 Platform Features

### Core GCM Process
- **Brainstorming Phase** - Generate ideas and statements collaboratively
- **Structuring Phase** - Organize concepts into meaningful clusters
- **Rating Phase** - Prioritize statements on importance and feasibility
- **Analysis Phase** - Generate insights and strategic recommendations

### Advanced Features
- **AI-Powered Assistance** - Enhanced brainstorming and clustering
- **Real-time Collaboration** - Live updates for distributed teams
- **Comprehensive Analytics** - Detailed reporting and insights
- **Multi-language Support** - English and German interfaces
- **Team Management** - Organize and invite team members
- **Export Capabilities** - PDF, CSV, PowerPoint formats

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Routing**: React Router with HashRouter
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Deployment**: Netlify

## 📦 Quick Start

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase credentials

# Start development server
npm run dev

# Build for production
npm run build
```

## 🗄️ Database Setup

1. Create a Supabase project
2. Run the schema from `supabase/complete_setup.sql`
3. Update environment variables with your credentials

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/          # Admin panel components
│   ├── ai/             # AI-powered features
│   ├── auth/           # Authentication
│   ├── dashboard/      # Dashboard components
│   ├── gcm/            # GCM process components
│   ├── layout/         # Layout components
│   ├── projects/       # Project management
│   ├── teams/          # Team collaboration
│   └── ui/             # Reusable UI components
├── contexts/           # React Context providers
├── pages/              # Page components
├── common/             # Shared utilities
└── lib/                # External service configs
```

## 🔧 Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Deployment
Configured for Netlify with:
- SPA routing support
- Environment variable management
- Optimized build configuration

## 🎯 GCM Methodology

### 1. Focus Question Development
Define a clear, strategic question that guides the entire process.

### 2. Brainstorming
Participants generate statements related to the focus question through:
- Individual contribution
- AI-assisted generation
- Collaborative refinement

### 3. Structuring
Organize statements into conceptual clusters:
- Manual drag-and-drop clustering
- AI-powered semantic clustering
- Collaborative cluster naming

### 4. Rating
Participants rate statements on two dimensions:
- **Importance**: How critical for achieving goals
- **Feasibility**: How realistic to implement

### 5. Analysis & Insights
Generate strategic recommendations through:
- Priority matrix analysis
- Cluster relationship mapping
- Statistical analysis
- Actionable recommendations

## 🌍 Multi-language Support

Currently supports:
- 🇺🇸 English
- 🇩🇪 German

Easy to extend for additional languages through the translation system.

## 🔒 Security Features

- Row Level Security (RLS) in Supabase
- User authentication and authorization
- Team-based access controls
- Secure API communication
- Data encryption at rest and in transit

## 📊 Analytics & Reporting

### Built-in Reports
- Executive summaries
- Priority matrices
- Cluster analysis
- Statistical breakdowns

### Export Options
- PDF formatted reports
- CSV data exports
- PowerPoint presentations
- JSON structured data

## 🤖 AI Integration

### AI-Powered Features
- **Statement Generation**: AI suggests relevant statements
- **Semantic Clustering**: Automatic concept grouping
- **Insight Enhancement**: AI-generated recommendations

### Credit System
- Transparent usage tracking
- Flexible credit packages
- Usage analytics dashboard

## 👥 Team Collaboration

### Team Management
- Create and manage teams
- Invite members with role-based access
- Real-time collaboration features
- Project sharing and permissions

### Real-time Features
- Live statement updates
- Collaborative clustering
- Instant rating synchronization
- Team member presence indicators

## 🚀 Deployment

### Netlify Deployment
1. Connect your Git repository
2. Set environment variables
3. Deploy with automatic builds

### Production Considerations
- Database backups and monitoring
- Performance optimization
- Security hardening
- Usage analytics

## 📈 Roadmap

### Upcoming Features
- Advanced visualization options
- Integration with external tools
- Enhanced AI capabilities
- Mobile application
- API for third-party integrations

## 📄 License

© 2024 GCM StrategyMap. All rights reserved.

## 🆘 Support

For support and documentation:
- Check the built-in help system
- Review the methodology guides
- Contact support through the platform

---

**Transform your strategic planning with the power of Group Concept Mapping.**