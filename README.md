# 🎬 CineLog - Personal Movie Tracker

A beautiful, personal movie tracking application that helps you catalog, rate, and discover films you love. Think of it as Goodreads for movies - organize your viewing journey with an elegant, cinematic interface.

## ✨ Features

### 🎭 Movie Collection Management
- **Track Your Journey**: Organize movies into "Watched", "Want to Watch", and "Currently Watching" lists
- **Personal Ratings**: Rate watched movies with a 5-star system
- **Personal Notes**: Add your thoughts, reviews, and reflections for each movie
- **Visual Collections**: Beautiful movie poster grids with status indicators and ratings

### 🔍 Movie Search & Discovery
- **Curated Library**: Search through a collection of popular and classic films
- **Rich Movie Details**: View comprehensive information including plot, director, genre, runtime, and IMDb ratings
- **Quick Add**: Instantly add movies to your collection from search results

### 🎨 Custom Movie Creation
- **Add Any Movie**: Create entries for movies not in the database
- **Complete Control**: Add custom poster URLs, plot summaries, cast details, and more
- **Visual Preview**: See your custom movie poster as you create the entry
- **Seamless Integration**: Custom movies work exactly like database movies in your collection

### 📊 Collection Overview
- **Statistics Dashboard**: View your watching habits with collection stats
- **Organized Views**: Browse by category with "Recently Watched", "Currently Watching", and "Want to Watch" sections
- **Visual Appeal**: Cinematic dark theme with elegant typography and smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/brenda-campbell/MovieTrackerApp.git
   cd MovieTrackerApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start tracking movies!

## 🚀 GitHub Codespaces Quick Start

GitHub Codespaces provides a complete, configurable dev environment in the cloud. Perfect for quick development or testing without local setup.

### Creating a Codespace

1. **From the Repository**
   - Navigate to the [MovieTracker repository](https://github.com/brenda-campbell/MovieTracker)
   - Click the green **"< > Code"** button
   - Select the **"Codespaces"** tab
   - Click **"Create codespace on main"**

2. **Wait for Setup**
   - Codespace will automatically install dependencies
   - This usually takes 2-3 minutes for the initial setup

### Building and Running in Codespace

Once your Codespace is ready:

1. **Install dependencies** (if not auto-installed)
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Codespace will automatically forward port 5173
   - Click the **"Open in Browser"** notification or
   - Go to the **"Ports"** tab and click the globe icon next to port 5173

### Production Build in Codespace

To test the production build:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Access preview**
   - Port 4173 will be forwarded automatically
   - Open the preview URL from the "Ports" tab

### Codespace Tips

- **Port Forwarding**: Automatically handles port forwarding for dev server (5173) and preview (4173)
- **Extensions**: VS Code extensions are pre-configured for optimal development
- **Terminal**: Full terminal access with all project commands available
- **Persistent Storage**: Your changes are saved and persist between Codespace sessions
- **Resource Management**: Codespace automatically stops after 30 minutes of inactivity to save resources

### Build Commands

- **Development**: `npm run dev` - Start the development server with hot reload
- **Build**: `npm run build` - Create optimized production build
- **Preview**: `npm run preview` - Preview the production build locally
- **Lint**: `npm run lint` - Run ESLint for code quality checks
- **Optimize**: `npm run optimize` - Run Vite optimization

## 🛠️ Technology Stack

### Frontend Framework
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework with modern features
- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Beautiful icon library
- **Phosphor Icons** - Additional icon set for cinematic feel

### State Management & Data
- **Local Storage Hook** - Persistent user data storage
- **React Hook Form** - Efficient form handling
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugins** - React SWC for fast refresh

## 🎨 Design Philosophy

**Cinematic Experience**: The app features a sophisticated dark theme inspired by premium streaming services, with rich imagery and elegant typography that celebrates the art of film.

**Color Palette**:
- **Primary**: Deep Cinema Blue - Evokes the classic movie theater experience
- **Secondary**: Warm Gold - For highlights and premium accents  
- **Accent**: Bright Gold - For star ratings and important actions
- **Background**: Deep Navy with high contrast text for optimal readability

**Typography**: Inter font family for excellent screen legibility and modern sophistication that complements movie imagery without competing for attention.

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices with touch-friendly interactions
- **Adaptive Layout**: Movie grids adapt from 6 columns on desktop to 2 on tablet to 1 on mobile
- **Touch Interactions**: Star ratings and movie cards optimized for touch input
- **Full-Width Search**: Search becomes full-width on mobile for better usability

## 💾 Data Storage

**Local Storage**: All your movie data is stored locally in your browser using a custom `useLocalStorage` hook. This means:
- **Privacy**: Your data never leaves your device
- **Instant Access**: No network requests for your personal collection
- **Persistence**: Your movies and ratings are saved between sessions
- **No Account Required**: Start tracking movies immediately

## 🎯 Core User Journey

1. **Search & Discover**: Use the search feature to find movies you've watched or want to watch
2. **Add to Collection**: Select a status (Watched, Want to Watch, Currently Watching)
3. **Rate & Review**: For watched movies, add a star rating and personal notes
4. **Browse Collection**: View your organized movie collection with beautiful posters
5. **Track Progress**: See statistics and progress through your movie journey

## 🔄 Development Workflow

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (Radix + Tailwind)
│   ├── MovieCard.tsx   # Individual movie display
│   ├── MovieCollection.tsx  # Collection views
│   ├── MovieDetails.tsx     # Movie detail modal
│   ├── MovieSearch.tsx      # Search functionality
│   └── CustomMovieForm.tsx  # Add custom movies
├── hooks/              # Custom React hooks
├── lib/               # Utilities and helpers
└── styles/            # Global styles and themes
```

### Component Architecture
- **Modular Design**: Each component handles a specific feature
- **Reusable UI**: Base components from Radix UI with custom styling
- **Type Safety**: Full TypeScript coverage for all props and data
- **Accessible**: Built-in accessibility features from Radix UI

## 🚀 Deployment

The app is ready for deployment to any static hosting service:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service of choice:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
