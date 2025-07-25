import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Film, Plus, Search } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MovieSearch } from './components/MovieSearch'
import { MovieCollection } from './components/MovieCollection'
import { MovieDetails } from './components/MovieDetails'
import { toast } from 'sonner'

interface Movie {
  id: string
  title: string
  year: string
  poster: string
  plot: string
  director: string
  genre: string
  runtime: string
  imdbRating: string
}

interface UserMovie {
  movie: Movie
  status: 'watched' | 'want-to-watch' | 'currently-watching'
  rating?: number
  notes?: string
  dateAdded: string
}

function App() {
  const [userMovies, setUserMovies] = useKV<UserMovie[]>('user-movies', [])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [selectedUserMovie, setSelectedUserMovie] = useState<UserMovie | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [activeTab, setActiveTab] = useState('collection')

  const handleAddToList = (movie: Movie, status: UserMovie['status'], rating?: number, notes?: string) => {
    const existingIndex = userMovies.findIndex(um => um.movie.id === movie.id)
    
    if (existingIndex >= 0) {
      setUserMovies(currentMovies => 
        currentMovies.map((um, index) => 
          index === existingIndex 
            ? { ...um, status, rating, notes }
            : um
        )
      )
      toast.success('Movie updated successfully!')
    } else {
      const newUserMovie: UserMovie = {
        movie,
        status,
        rating,
        notes,
        dateAdded: new Date().toISOString()
      }
      setUserMovies(currentMovies => [...currentMovies, newUserMovie])
      toast.success('Movie added to your collection!')
    }
  }

  const handleUpdateMovie = (updatedUserMovie: UserMovie) => {
    setUserMovies(currentMovies =>
      currentMovies.map(um =>
        um.movie.id === updatedUserMovie.movie.id ? updatedUserMovie : um
      )
    )
    toast.success('Movie updated successfully!')
  }

  const handleRemoveMovie = (movieId: string) => {
    setUserMovies(currentMovies => currentMovies.filter(um => um.movie.id !== movieId))
    toast.success('Movie removed from collection!')
  }

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
    setSelectedUserMovie(null)
    setShowDetails(true)
  }

  const handleUserMovieClick = (userMovie: UserMovie) => {
    setSelectedMovie(userMovie.movie)
    setSelectedUserMovie(userMovie)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
    setSelectedMovie(null)
    setSelectedUserMovie(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Film className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CineLog</h1>
                <p className="text-xs text-muted-foreground">Track your movie journey</p>
              </div>
            </div>
            
            <Button
              variant={activeTab === 'search' ? 'default' : 'outline'}
              onClick={() => setActiveTab('search')}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Movie
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="collection" className="gap-2">
              <Film className="h-4 w-4" />
              My Movies
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection" className="space-y-6">
            <MovieCollection 
              userMovies={userMovies}
              onMovieClick={handleUserMovieClick}
            />
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold mb-2">Discover Movies</h2>
              <p className="text-muted-foreground mb-8">
                Search for movies to add to your collection
              </p>
              <MovieSearch onMovieSelect={handleMovieSelect} />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <MovieDetails
        movie={selectedMovie}
        userMovie={selectedUserMovie}
        open={showDetails}
        onClose={closeDetails}
        onAddToList={handleAddToList}
        onUpdateMovie={handleUpdateMovie}
        onRemoveMovie={handleRemoveMovie}
      />
    </div>
  )
}

export default App