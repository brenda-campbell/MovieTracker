import { useState } from 'react'
import { Plus, Upload } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MoviePoster } from './MoviePoster'
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

interface CustomMovieFormProps {
  onMovieCreate: (movie: Movie) => void
}

export function CustomMovieForm({ onMovieCreate }: CustomMovieFormProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    director: '',
    genre: '',
    runtime: '',
    plot: '',
    poster: '',
    imdbRating: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Please enter a movie title')
      return
    }

    const newMovie: Movie = {
      id: `custom-${Date.now()}`,
      title: formData.title.trim(),
      year: formData.year || new Date().getFullYear().toString(),
      director: formData.director || 'Unknown Director',
      genre: formData.genre || 'Unknown',
      runtime: formData.runtime || 'Unknown',
      plot: formData.plot || 'No plot available.',
      poster: formData.poster || '',
      imdbRating: formData.imdbRating || 'N/A'
    }

    onMovieCreate(newMovie)
    
    // Reset form
    setFormData({
      title: '',
      year: '',
      director: '',
      genre: '',
      runtime: '',
      plot: '',
      poster: '',
      imdbRating: ''
    })
    
    setOpen(false)
    toast.success('Custom movie added successfully!')
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Custom Movie
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Custom Movie</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Movie Poster Preview */}
            <div className="space-y-3">
              <Label>Movie Poster</Label>
              <div className="aspect-[2/3] w-full">
                <MoviePoster
                  src={formData.poster}
                  alt={formData.title || 'Movie poster'}
                  className="w-full h-full rounded-lg border"
                  fallbackTitle={formData.title}
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Poster URL"
                  value={formData.poster}
                  onChange={(e) => handleInputChange('poster', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter an image URL for the movie poster
                </p>
              </div>
            </div>

            {/* Movie Details */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Movie title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    placeholder="Release year"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="director">Director</Label>
                  <Input
                    id="director"
                    placeholder="Director name"
                    value={formData.director}
                    onChange={(e) => handleInputChange('director', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="runtime">Runtime</Label>
                  <Input
                    id="runtime"
                    placeholder="e.g., 120 min"
                    value={formData.runtime}
                    onChange={(e) => handleInputChange('runtime', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    placeholder="e.g., Action, Drama"
                    value={formData.genre}
                    onChange={(e) => handleInputChange('genre', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    placeholder="e.g., 8.5"
                    value={formData.imdbRating}
                    onChange={(e) => handleInputChange('imdbRating', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plot">Plot</Label>
                <Textarea
                  id="plot"
                  placeholder="Movie plot summary..."
                  value={formData.plot}
                  onChange={(e) => handleInputChange('plot', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Movie
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}