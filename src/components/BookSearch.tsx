import { useState, useEffect } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookCover } from './BookCover'
import { Book } from '@/types'

interface BookSearchProps {
  onBookSelect: (book: Book) => void
}

export function BookSearch({ onBookSelect }: BookSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)

  const searchBooks = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      // Mock book data
      const mockBooks: Book[] = [
        {
          id: '1',
          title: 'The Hobbit',
          year: '1937',
          cover: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
          description: 'Bilbo Baggins enjoys a quiet and contented life, with no desire to travel far from the comforts of home; then one day the wizard Gandalf and a band of dwarves arrive unexpectedly and enlist his services.',
          author: 'J.R.R. Tolkien',
          genre: 'Fantasy, Adventure',
          pages: '304',
          rating: '4.3'
        },
        {
          id: '2',
          title: 'To Kill a Mockingbird',
          year: '1960',
          cover: 'https://covers.openlibrary.org/b/id/8225261-L.jpg',
          description: 'The story of young Scout Finch, who is growing up in the Depression-era South, and her father Atticus, a lawyer who risks everything to defend a black man accused of rape.',
          author: 'Harper Lee',
          genre: 'Fiction, Classic',
          pages: '376',
          rating: '4.3'
        },
        {
          id: '3',
          title: '1984',
          year: '1949',
          cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
          description: 'A dystopian social science fiction novel that follows the life of Winston Smith, a low-ranking member of the Party who is frustrated by the omnipresent eyes of the party.',
          author: 'George Orwell',
          genre: 'Dystopian, Fiction',
          pages: '328',
          rating: '4.2'
        },
        {
          id: '4',
          title: 'Pride and Prejudice',
          year: '1813',
          cover: 'https://covers.openlibrary.org/b/id/8091016-L.jpg',
          description: 'The romantic clash between the opinionated Elizabeth Bennet and the seemingly arrogant Mr. Darcy.',
          author: 'Jane Austen',
          genre: 'Romance, Classic',
          pages: '432',
          rating: '4.3'
        },
        {
          id: '5',
          title: 'The Great Gatsby',
          year: '1925',
          cover: 'https://covers.openlibrary.org/b/id/8220936-L.jpg',
          description: 'Set in the Jazz Age, the novel tells the story of Jay Gatsby and his pursuit of the American Dream.',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic, Fiction',
          pages: '180',
          rating: '3.9'
        },
        {
          id: '6',
          title: 'Harry Potter and the Philosopher\'s Stone',
          year: '1997',
          cover: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
          description: 'Harry Potter lives with his abusive uncle and aunt until he receives a letter offering him a place at Hogwarts School of Witchcraft and Wizardry.',
          author: 'J.K. Rowling',
          genre: 'Fantasy, Young Adult',
          pages: '223',
          rating: '4.5'
        }
      ]

      // Simple search filtering
      const filtered = mockBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setResults(filtered)
    } catch (error) {
      console.error('Error searching books:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchBooks(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto">
        <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground mt-2">Searching books...</p>
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No books found for "{query}"</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid gap-4 max-w-4xl mx-auto">
          {results.map((book) => (
            <Card key={book.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="w-16 h-24 flex-shrink-0">
                  <BookCover
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full rounded"
                    fallbackTitle={book.title}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">by {book.author} • {book.year}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {book.genre.split(',').map((genre) => (
                      <Badge key={genre.trim()} variant="secondary" className="text-xs">
                        {genre.trim()}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <Button onClick={() => onBookSelect(book)}>
                    Select
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}