import { useState, useEffect } from 'react'
import { Search } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

interface MovieSearchProps {
  onMovieSelect: (movie: Movie) => void
}

export function MovieSearch({ onMovieSelect }: MovieSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  const searchMovies = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      // Mock movie data for demonstration
      const mockMovies: Movie[] = [
        {
          id: '1',
          title: 'The Matrix',
          year: '1999',
          poster: '/api/placeholder/300/450',
          plot: 'A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.',
          director: 'The Wachowskis',
          genre: 'Action, Sci-Fi',
          runtime: '136 min',
          imdbRating: '8.7'
        },
        {
          id: '2',
          title: 'Inception',
          year: '2010',
          poster: '/api/placeholder/300/450',
          plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
          director: 'Christopher Nolan',
          genre: 'Action, Sci-Fi, Thriller',
          runtime: '148 min',
          imdbRating: '8.8'
        },
        {
          id: '3',
          title: 'Pulp Fiction',
          year: '1994',
          poster: '/api/placeholder/300/450',
          plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
          director: 'Quentin Tarantino',
          genre: 'Crime, Drama',
          runtime: '154 min',
          imdbRating: '8.9'
        },
        {
          id: '4',
          title: 'The Dark Knight',
          year: '2008',
          poster: '/api/placeholder/300/450',
          plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
          director: 'Christopher Nolan',
          genre: 'Action, Crime, Drama',
          runtime: '152 min',
          imdbRating: '9.0'
        },
        {
          id: '5',
          title: 'Forrest Gump',
          year: '1994',
          poster: '/api/placeholder/300/450',
          plot: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.',
          director: 'Robert Zemeckis',
          genre: 'Drama, Romance',
          runtime: '142 min',
          imdbRating: '8.8'
        },
        {
          id: '6',
          title: 'The Shawshank Redemption',
          year: '1994',
          poster: '/api/placeholder/300/450',
          plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
          director: 'Frank Darabont',
          genre: 'Drama',
          runtime: '142 min',
          imdbRating: '9.3'
        }
      ]

      // Filter movies based on search query
      const filteredMovies = mockMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setResults(filteredMovies)
    } catch (error) {
      console.error('Error searching movies:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMovies(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading && (
        <div className="text-center py-8 text-muted-foreground">
          Searching movies...
        </div>
      )}

      {query && !loading && results.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No movies found. Try a different search term.
        </div>
      )}

      <div className="grid gap-4">
        {results.map((movie) => (
          <Card key={movie.id} className="p-4 hover:bg-card/80 transition-colors cursor-pointer" onClick={() => onMovieSelect(movie)}>
            <div className="flex gap-4">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-16 h-24 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.src = '/api/placeholder/300/450'
                }}
              />
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="font-semibold text-lg">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">{movie.year} • {movie.director}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{movie.genre.split(',')[0]}</Badge>
                  <Badge variant="outline">{movie.runtime}</Badge>
                  {movie.imdbRating !== 'N/A' && (
                    <Badge variant="outline">★ {movie.imdbRating}</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {movie.plot}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}