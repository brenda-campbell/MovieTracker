import { Star } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookCover } from './BookCover'
import { Book, UserBook } from '@/types'

interface BookCardProps {
  userBook: UserBook
  onClick: () => void
  onStatusChange?: (book: UserBook, newStatus: UserBook['status']) => void
}

export function BookCard({ userBook, onClick, onStatusChange }: BookCardProps) {
  const { book } = userBook

  const getStatusColor = (status: UserBook['status']) => {
    switch (status) {
      case 'read':
        return 'bg-accent text-accent-foreground'
      case 'currently-reading':
        return 'bg-secondary text-secondary-foreground'
      case 'want-to-read':
        return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusLabel = (status: UserBook['status']) => {
    switch (status) {
      case 'read':
        return 'Read'
      case 'currently-reading':
        return 'Reading'
      case 'want-to-read':
        return 'Want to Read'
    }
  }

  return (
    <Card className="group overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-lg cursor-pointer">
      <div onClick={onClick}>
        <div className="aspect-[2/3] relative overflow-hidden">
          <BookCover
            src={book.cover}
            alt={book.title}
            className="w-full h-full"
            fallbackTitle={book.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-2 left-2">
            <Badge className={getStatusColor(userBook.status)}>
              {getStatusLabel(userBook.status)}
            </Badge>
          </div>
          {userBook.status === 'read' && userBook.rating && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs font-medium text-white">{userBook.rating}</span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">{book.title}</h3>
          <p className="text-xs text-muted-foreground">{book.author}</p>
          <p className="text-xs text-muted-foreground">{book.year}</p>
          {userBook.notes && (
            <p className="text-xs text-muted-foreground line-clamp-2">{userBook.notes}</p>
          )}
        </div>
      </div>
    </Card>
  )
}