import { useState } from 'react'
import { Star, X } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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

interface MovieDetailsProps {
  movie: Movie | null
  userMovie?: UserMovie
  open: boolean
  onClose: () => void
  onAddToList: (movie: Movie, status: UserMovie['status'], rating?: number, notes?: string) => void
  onUpdateMovie?: (userMovie: UserMovie) => void
  onRemoveMovie?: (movieId: string) => void
}

export function MovieDetails({
  movie,
  userMovie,
  open,
  onClose,
  onAddToList,
  onUpdateMovie,
  onRemoveMovie
}: MovieDetailsProps) {
  const [status, setStatus] = useState<UserMovie['status']>(userMovie?.status || 'want-to-watch')
  const [rating, setRating] = useState<number>(userMovie?.rating || 0)
  const [notes, setNotes] = useState(userMovie?.notes || '')
  const [hoveredStar, setHoveredStar] = useState(0)

  if (!movie) return null

  const handleSave = () => {
    if (userMovie && onUpdateMovie) {
      onUpdateMovie({
        ...userMovie,
        status,
        rating: status === 'watched' ? rating : undefined,
        notes
      })
    } else {
      onAddToList(movie, status, status === 'watched' ? rating : undefined, notes)
    }
    onClose()
  }

  const handleRemove = () => {
    if (userMovie && onRemoveMovie) {
      onRemoveMovie(userMovie.movie.id)
      onClose()
    }
  }

  const StarRating = () => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          className="p-1 hover:scale-110 transition-transform"
        >
          <Star
            className={`h-6 w-6 ${
              star <= (hoveredStar || rating)
                ? 'fill-accent text-accent'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{movie.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="flex gap-6">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = '/api/placeholder/300/450'
              }}
            />
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-muted-foreground">{movie.year} • {movie.runtime}</p>
                <p className="text-sm text-muted-foreground">Directed by {movie.director}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {movie.genre.split(',').map((g) => (
                  <Badge key={g.trim()} variant="secondary">{g.trim()}</Badge>
                ))}
                {movie.imdbRating !== 'N/A' && (
                  <Badge variant="outline">IMDb: {movie.imdbRating}</Badge>
                )}
              </div>
              
              <p className="text-sm leading-relaxed">{movie.plot}</p>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={(value: UserMovie['status']) => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="want-to-watch">Want to Watch</SelectItem>
                  <SelectItem value="currently-watching">Currently Watching</SelectItem>
                  <SelectItem value="watched">Watched</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {status === 'watched' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <StarRating />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Your thoughts about this movie..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            {userMovie && onRemoveMovie && (
              <Button variant="destructive" onClick={handleRemove}>
                Remove from List
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {userMovie ? 'Update' : 'Add to List'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}