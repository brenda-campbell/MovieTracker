import { BookOpen, Eye, Clock, Heart } from '@phosphor-icons/react'
import { BookCard } from './BookCard'
import { Card } from '@/components/ui/card'
import { UserBook } from '@/types'

interface BookCollectionProps {
  userBooks: UserBook[]
  onBookClick: (userBook: UserBook) => void
}

export function BookCollection({ userBooks, onBookClick }: BookCollectionProps) {
  const readBooks = userBooks.filter(b => b.status === 'read')
  const currentlyReading = userBooks.filter(b => b.status === 'currently-reading')
  const wantToRead = userBooks.filter(b => b.status === 'want-to-read')

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

  const BookSection = ({ 
    title, 
    books, 
    emptyMessage 
  }: { 
    title: string
    books: UserBook[]
    emptyMessage: string 
  }) => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {books.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {books.map((userBook) => (
            <BookCard
              key={userBook.book.id}
              userBook={userBook}
              onClick={() => onBookClick(userBook)}
            />
          ))}
        </div>
      )}
    </div>
  )

  if (userBooks.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
        <div>
          <h2 className="text-2xl font-semibold mb-2">Start Your Reading Journey</h2>
          <p className="text-muted-foreground">
            Search for books above to start building your personal library
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
          label="Read"
          count={readBooks.length}
          color="bg-accent/20 text-accent"
        />
        <StatCard
          icon={Clock}
          label="Currently Reading"
          count={currentlyReading.length}
          color="bg-secondary/20 text-secondary"
        />
        <StatCard
          icon={Heart}
          label="Want to Read"
          count={wantToRead.length}
          color="bg-muted text-muted-foreground"
        />
        <StatCard
          icon={BookOpen}
          label="Total Books"
          count={userBooks.length}
          color="bg-primary/20 text-primary"
        />
      </div>

      {currentlyReading.length > 0 && (
        <BookSection
          title="Currently Reading"
          books={currentlyReading}
          emptyMessage="No books currently being read"
        />
      )}

      <BookSection
        title="Recently Read"
        books={readBooks.slice(0, 6)}
        emptyMessage="No books read yet. Start by marking some as read!"
      />

      <BookSection
        title="Want to Read"
        books={wantToRead.slice(0, 6)}
        emptyMessage="No books in your reading list yet. Add some books you'd like to read!"
      />

      {readBooks.length > 6 && (
        <BookSection
          title="All Read Books"
          books={readBooks}
          emptyMessage=""
        />
      )}
    </div>
  )
}