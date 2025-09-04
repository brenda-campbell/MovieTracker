import { useState } from 'react'
import { Plus, Upload } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { BookCover } from './BookCover'
import { toast } from 'sonner'
import { Book } from '@/types'

interface CustomBookFormProps {
  onBookCreate: (book: Book) => void
}

export function CustomBookForm({ onBookCreate }: CustomBookFormProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    author: '',
    genre: '',
    pages: '',
    description: '',
    cover: '',
    rating: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Please enter a book title')
      return
    }

    const newBook: Book = {
      id: `custom-${Date.now()}`,
      title: formData.title.trim(),
      year: formData.year.trim() || new Date().getFullYear().toString(),
      author: formData.author.trim() || 'Unknown Author',
      genre: formData.genre.trim() || 'General',
      pages: formData.pages.trim() || 'N/A',
      description: formData.description.trim() || 'No description available.',
      cover: formData.cover.trim() || '',
      rating: formData.rating.trim() || 'N/A'
    }

    onBookCreate(newBook)
    
    // Reset form
    setFormData({
      title: '',
      year: '',
      author: '',
      genre: '',
      pages: '',
      description: '',
      cover: '',
      rating: ''
    })
    
    setOpen(false)
    toast.success('Custom book created! Add it to your collection.')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Custom Book
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Custom Book</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter book title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Author name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    placeholder="2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    value={formData.pages}
                    onChange={(e) => handleInputChange('pages', e.target.value)}
                    placeholder="300"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  value={formData.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  placeholder="Fiction, Mystery, etc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', e.target.value)}
                  placeholder="4.5"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cover">Cover Image URL</Label>
                <Input
                  id="cover"
                  type="url"
                  value={formData.cover}
                  onChange={(e) => handleInputChange('cover', e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
              
              {formData.cover && (
                <div className="w-32 h-48 mx-auto">
                  <BookCover
                    src={formData.cover}
                    alt="Book cover preview"
                    className="w-full h-full rounded"
                    fallbackTitle={formData.title}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the book..."
                  rows={6}
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Book
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}