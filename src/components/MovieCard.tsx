import { Star } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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

interface MovieCardProps {
  userMovie: UserMovie
  onClick: () => void
  onStatusChange?: (movie: UserMovie, newStatus: UserMovie['status']) => void
}

export function MovieCard({ userMovie, onClick, onStatusChange }: MovieCardProps) {
  const { movie } = userMovie

  const getStatusColor = (status: UserMovie['status']) => {
    switch (status) {
      case 'watched':
        return 'bg-accent text-accent-foreground'
      case 'currently-watching':
        return 'bg-secondary text-secondary-foreground'
      case 'want-to-watch':
        return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusLabel = (status: UserMovie['status']) => {
    switch (status) {
      case 'watched':
        return 'Watched'
      case 'currently-watching':
        return 'Watching'
      case 'want-to-watch':
        return 'Want to Watch'
    }
  }

  return (
    <Card className="group overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-lg cursor-pointer">
      <div onClick={onClick}>
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/api/placeholder/300/450'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-2 left-2">
            <Badge className={getStatusColor(userMovie.status)}>
              {getStatusLabel(userMovie.status)}
            </Badge>
          </div>
          {userMovie.status === 'watched' && userMovie.rating && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs font-medium text-white">{userMovie.rating}</span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">{movie.title}</h3>
          <p className="text-xs text-muted-foreground">{movie.year}</p>
          {userMovie.notes && (
            <p className="text-xs text-muted-foreground line-clamp-2">{userMovie.notes}</p>
          )}
        </div>
      </div>
    </Card>
  )
}