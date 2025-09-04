import { useState } from 'react'
import { Star, X } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookCover } from './BookCover'
import { Book, UserBook } from '@/types'

interface BookDetailsProps {
  book: Book | null
  userBook?: UserBook
  open: boolean
  onClose: () => void
  onAddToList: (book: Book, status: UserBook['status'], rating?: number, notes?: string) => void
  onUpdateBook?: (userBook: UserBook) => void
  onRemoveBook?: (bookId: string) => void
}

export function BookDetails({
  book,
  userBook,
  open,
  onClose,
  onAddToList,
  onUpdateBook,
  onRemoveBook
}: BookDetailsProps) {
  const [status, setStatus] = useState<UserBook['status']>(userBook?.status || 'want-to-read')
  const [rating, setRating] = useState<number>(userBook?.rating || 0)
  const [notes, setNotes] = useState(userBook?.notes || '')
  const [hoveredStar, setHoveredStar] = useState(0)

  if (!book) return null

  const handleSave = () => {
    if (userBook && onUpdateBook) {
      onUpdateBook({
        ...userBook,
        status,
        rating: status === 'read' ? rating : undefined,
        notes
      })
    } else {
      onAddToList(book, status, status === 'read' ? rating : undefined, notes)
    }
    onClose()
  }

  const handleRemove = () => {
    if (userBook && onRemoveBook) {
      onRemoveBook(userBook.book.id)
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
          <DialogTitle className="text-xl">{book.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="flex gap-6">
            <div className="w-48 h-72 flex-shrink-0">
              <BookCover
                src={book.cover}
                alt={book.title}
                className="w-full h-full rounded-lg"
                fallbackTitle={book.title}
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-muted-foreground">{book.year} • {book.pages} pages</p>
                <p className="text-sm text-muted-foreground">by {book.author}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {book.genre.split(',').map((g) => (
                  <Badge key={g.trim()} variant="secondary">{g.trim()}</Badge>
                ))}
                {book.rating !== 'N/A' && (
                  <Badge variant="outline">Rating: {book.rating}</Badge>
                )}
              </div>
              
              <p className="text-sm leading-relaxed">{book.description}</p>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={(value: UserBook['status']) => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="want-to-read">Want to Read</SelectItem>
                  <SelectItem value="currently-reading">Currently Reading</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {status === 'read' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Rating</label>
                <StarRating />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your thoughts about this book..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-between">
            {userBook && onRemoveBook && (
              <Button variant="destructive" onClick={handleRemove}>
                Remove from Collection
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {userBook ? 'Update' : 'Add to Collection'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}