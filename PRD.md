# Planning Guide

A personal movie logging platform that allows users to track, rate, and organize their movie watching experience with a clean, intuitive interface.

**Experience Qualities**: 
1. **Organized** - Clear categorization and easy browsing of watched, want-to-watch, and currently watching movies
2. **Personal** - Intimate journaling experience with personal ratings, notes, and reflection space  
3. **Discoverable** - Effortless movie search and exploration with rich movie details and metadata

**Complexity Level**: Light Application (multiple features with basic state)
- Multiple interconnected features (search, logging, rating, organizing) with persistent user data and basic state management for movie collections

## Essential Features

**Movie Search & Discovery**
- Functionality: Search for movies by title with autocomplete suggestions and detailed movie information
- Purpose: Enable users to quickly find and add movies to their collections without manual data entry
- Trigger: User types in search input field
- Progression: Type query → See live suggestions → Select movie → View details → Add to collection
- Success criteria: Returns accurate movie results with poster, year, director, and plot information

**Movie Logging & Rating**
- Functionality: Add movies to "Watched", "Want to Watch", or "Currently Watching" lists with 5-star ratings and personal notes
- Purpose: Core functionality for tracking movie watching journey and personal opinions
- Trigger: User selects "Add to List" from movie details or search results
- Progression: Select movie → Choose list → Add rating (if watched) → Write notes → Save to collection
- Success criteria: Movie appears in correct list with all user data persisted between sessions

**Personal Movie Collections**
- Functionality: View and manage organized lists of movies with filtering and sorting options
- Purpose: Provide overview of movie watching habits and easy access to logged movies
- Trigger: User navigates to "My Movies" or list views
- Progression: Navigate to lists → Filter/sort options → Browse movies → Edit/remove entries
- Success criteria: All logged movies display correctly with ability to update status and ratings

**Movie Details & Reviews**
- Functionality: Detailed movie view with poster, plot, cast, user rating, and personal notes
- Purpose: Comprehensive movie information hub and personal reflection space
- Trigger: User clicks on any movie from search results or their collections
- Progression: Select movie → View full details → Read/edit personal notes → Update rating/status
- Success criteria: Complete movie information displays with editable user content

## Edge Case Handling

- **No Search Results**: Display "No movies found" with suggestion to try different search terms
- **Offline Usage**: Show cached movie collections when internet connection is unavailable  
- **Duplicate Movies**: Prevent adding same movie multiple times, offer to update existing entry instead
- **Empty Collections**: Display encouraging empty state with call-to-action to search for first movie
- **Long Movie Titles**: Truncate gracefully with full title available on hover or in details view

## Design Direction

The design should feel sophisticated and cinematic like a premium streaming service, with rich imagery and elegant typography that celebrates the art of film while maintaining clean, focused functionality.

## Color Selection

Triadic (three equally spaced colors) - Using a cinematic palette with deep blues, warm golds, and rich purples to evoke the classic movie theater experience while maintaining modern sophistication.

- **Primary Color**: Deep Cinema Blue (oklch(0.25 0.08 240)) - Communicates trust, depth, and the classic movie theater experience
- **Secondary Colors**: Warm Gold (oklch(0.75 0.12 85)) for highlights and premium accents, Deep Purple (oklch(0.35 0.1 300)) for secondary actions
- **Accent Color**: Bright Gold (oklch(0.85 0.15 90)) - Attention-grabbing highlight for star ratings, CTAs, and important elements like "Add Movie" buttons
- **Foreground/Background Pairings**: 
  - Background (Deep Navy #0A0E1A): Light text (oklch(0.95 0.02 240)) - Ratio 16.2:1 ✓
  - Card (Slate Blue #1A1D2E): Light text (oklch(0.95 0.02 240)) - Ratio 12.8:1 ✓  
  - Primary (Cinema Blue #2A3F5F): White text (oklch(1 0 0)) - Ratio 8.4:1 ✓
  - Secondary (Warm Gold #D4AF37): Dark text (oklch(0.2 0.05 85)) - Ratio 9.1:1 ✓
  - Accent (Bright Gold #F4D03F): Dark text (oklch(0.15 0.08 85)) - Ratio 12.3:1 ✓

## Font Selection

Typography should convey cinematic elegance and readability, using Inter for its excellent screen legibility and subtle sophistication that won't compete with movie imagery.

- **Typographic Hierarchy**: 
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal spacing  
  - H3 (Movie Titles): Inter Medium/20px/normal spacing
  - Body (Descriptions): Inter Regular/16px/relaxed line height
  - Small (Metadata): Inter Regular/14px/normal spacing

## Animations

Subtle cinematic transitions that enhance the premium feel without overwhelming - smooth fades for content loading and gentle scale effects for interactive elements that feel responsive and polished.

- **Purposeful Meaning**: Smooth fade transitions communicate content loading states, while gentle hover effects on movie posters create engaging browsing experience
- **Hierarchy of Movement**: Movie posters and primary actions receive subtle scale/glow effects, while secondary elements use simple opacity changes

## Component Selection

- **Components**: Cards for movie displays, Dialogs for movie details, Forms for ratings/notes, Tabs for different movie lists, Input for search, Badges for movie status, Avatar for user profile
- **Customizations**: Custom movie card component with hover effects, custom star rating component, custom search with autocomplete dropdown
- **States**: Movie cards with hover scale and glow effects, buttons with press animations, inputs with focus rings, loading skeletons for movie posters
- **Icon Selection**: Star icons for ratings, Plus for adding movies, Search for discovery, Heart for favorites, Eye for watched status
- **Spacing**: Consistent 4/6/8/12/16/24px spacing using Tailwind scale, generous padding around movie grids for breathing room
- **Mobile**: Movie grid adapts from 4 columns to 2 to 1, search becomes full-width, movie details use drawer instead of dialog, touch-optimized star ratings