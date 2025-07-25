import { FilmStrip, Eye, Clock, Heart } from '@phosphor-icons/react'
import { MovieCard } from './MovieCard'
import { Card } from '@/components/ui/card'

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

interface MovieCollectionProps {
  userMovies: UserMovie[]
  onMovieClick: (userMovie: UserMovie) => void
}

export function MovieCollection({ userMovies, onMovieClick }: MovieCollectionProps) {
  const watchedMovies = userMovies.filter(m => m.status === 'watched')
  const currentlyWatching = userMovies.filter(m => m.status === 'currently-watching')
  const wantToWatch = userMovies.filter(m => m.status === 'want-to-watch')

  const StatCard = ({ 
    icon: Icon, 
    label, 
    count, 
    color 
  }: { 
    icon: any
    label: string
    count: number
    color: string 
  }) => (
    <Card className="p-6">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-2xl font-bold">{count}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </Card>
  )

  const MovieSection = ({ 
    title, 
    movies, 
    emptyMessage 
  }: { 
    title: string
    movies: UserMovie[]
    emptyMessage: string 
  }) => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {movies.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((userMovie) => (
            <MovieCard
              key={userMovie.movie.id}
              userMovie={userMovie}
              onClick={() => onMovieClick(userMovie)}
            />
          ))}
        </div>
      )}
    </div>
  )

  if (userMovies.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <FilmStrip className="h-16 w-16 mx-auto text-muted-foreground" />
        <div>
          <h2 className="text-2xl font-semibold mb-2">Start Your Movie Journey</h2>
          <p className="text-muted-foreground">
            Search for movies above to start building your personal collection
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Eye}
          label="Watched"
          count={watchedMovies.length}
          color="bg-accent/20 text-accent"
        />
        <StatCard
          icon={Clock}
          label="Currently Watching"
          count={currentlyWatching.length}
          color="bg-secondary/20 text-secondary"
        />
        <StatCard
          icon={Heart}
          label="Want to Watch"
          count={wantToWatch.length}
          color="bg-muted text-muted-foreground"
        />
        <StatCard
          icon={FilmStrip}
          label="Total Movies"
          count={userMovies.length}
          color="bg-primary/20 text-primary"
        />
      </div>

      {currentlyWatching.length > 0 && (
        <MovieSection
          title="Currently Watching"
          movies={currentlyWatching}
          emptyMessage="No movies currently being watched"
        />
      )}

      <MovieSection
        title="Recently Watched"
        movies={watchedMovies.slice(0, 6)}
        emptyMessage="No movies watched yet. Start by marking some as watched!"
      />

      <MovieSection
        title="Want to Watch"
        movies={wantToWatch.slice(0, 6)}
        emptyMessage="No movies in your watchlist yet. Add some movies you'd like to see!"
      />

      {watchedMovies.length > 6 && (
        <MovieSection
          title="All Watched Movies"
          movies={watchedMovies}
          emptyMessage=""
        />
      )}
    </div>
  )
}