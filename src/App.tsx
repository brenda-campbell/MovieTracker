import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { FilmStrip, Plus, MagnifyingGlass, BookOpen } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MovieSearch } from './components/MovieSearch'
import { MovieCollection } from './components/MovieCollection'
import { MovieDetails } from './components/MovieDetails'
import { CustomMovieForm } from './components/CustomMovieForm'
import { BookSearch } from './components/BookSearch'
import { BookCollection } from './components/BookCollection'
import { BookDetails } from './components/BookDetails'
import { CustomBookForm } from './components/CustomBookForm'
import { toast } from 'sonner'
import { Movie, UserMovie, Book, UserBook } from './types'

function App() {
  const [userMovies, setUserMovies] = useLocalStorage<UserMovie[]>('user-movies', [])
  const [userBooks, setUserBooks] = useLocalStorage<UserBook[]>('user-books', [])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [selectedUserMovie, setSelectedUserMovie] = useState<UserMovie | null>(null)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [selectedUserBook, setSelectedUserBook] = useState<UserBook | null>(null)
  const [showMovieDetails, setShowMovieDetails] = useState(false)
  const [showBookDetails, setShowBookDetails] = useState(false)
  const [activeTab, setActiveTab] = useState('movies')

  const handleAddToList = (movie: Movie, status: UserMovie['status'], rating?: number, notes?: string) => {
    const existingIndex = userMovies.findIndex(um => um.movie.id === movie.id)
    
    if (existingIndex >= 0) {
      setUserMovies(currentMovies => 
        currentMovies.map((um, index) => 
          index === existingIndex 
            ? { ...um, status, rating, notes }
            : um
        )
      )
      toast.success('Movie updated successfully!')
    } else {
      const newUserMovie: UserMovie = {
        movie,
        status,
        rating,
        notes,
        dateAdded: new Date().toISOString()
      }
      setUserMovies(currentMovies => [...currentMovies, newUserMovie])
      toast.success('Movie added to your collection!')
    }
  }

  const handleAddBookToList = (book: Book, status: UserBook['status'], rating?: number, notes?: string) => {
    const existingIndex = userBooks.findIndex(ub => ub.book.id === book.id)
    
    if (existingIndex >= 0) {
      setUserBooks(currentBooks => 
        currentBooks.map((ub, index) => 
          index === existingIndex 
            ? { ...ub, status, rating, notes }
            : ub
        )
      )
      toast.success('Book updated successfully!')
    } else {
      const newUserBook: UserBook = {
        book,
        status,
        rating,
        notes,
        dateAdded: new Date().toISOString()
      }
      setUserBooks(currentBooks => [...currentBooks, newUserBook])
      toast.success('Book added to your collection!')
    }
  }

  const handleUpdateMovie = (updatedUserMovie: UserMovie) => {
    setUserMovies(currentMovies =>
      currentMovies.map(um =>
        um.movie.id === updatedUserMovie.movie.id ? updatedUserMovie : um
      )
    )
    toast.success('Movie updated successfully!')
  }

  const handleUpdateBook = (updatedUserBook: UserBook) => {
    setUserBooks(currentBooks =>
      currentBooks.map(ub =>
        ub.book.id === updatedUserBook.book.id ? updatedUserBook : ub
      )
    )
    toast.success('Book updated successfully!')
  }

  const handleRemoveMovie = (movieId: string) => {
    setUserMovies(currentMovies => currentMovies.filter(um => um.movie.id !== movieId))
    toast.success('Movie removed from collection!')
  }

  const handleRemoveBook = (bookId: string) => {
    setUserBooks(currentBooks => currentBooks.filter(ub => ub.book.id !== bookId))
    toast.success('Book removed from collection!')
  }

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
    setSelectedUserMovie(null)
    setShowMovieDetails(true)
  }

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book)
    setSelectedUserBook(null)
    setShowBookDetails(true)
  }

  const handleUserMovieClick = (userMovie: UserMovie) => {
    setSelectedMovie(userMovie.movie)
    setSelectedUserMovie(userMovie)
    setShowMovieDetails(true)
  }

  const handleUserBookClick = (userBook: UserBook) => {
    setSelectedBook(userBook.book)
    setSelectedUserBook(userBook)
    setShowBookDetails(true)
  }

  const handleMovieCreate = (movie: Movie) => {
    setSelectedMovie(movie)
    setSelectedUserMovie(null)
    setShowMovieDetails(true)
  }

  const handleBookCreate = (book: Book) => {
    setSelectedBook(book)
    setSelectedUserBook(null)
    setShowBookDetails(true)
  }

  const closeMovieDetails = () => {
    setShowMovieDetails(false)
    setSelectedMovie(null)
    setSelectedUserMovie(null)
  }

  const closeBookDetails = () => {
    setShowBookDetails(false)
    setSelectedBook(null)
    setSelectedUserBook(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <FilmStrip className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CineLog</h1>
                <p className="text-xs text-muted-foreground">Track your movies & books</p>
              </div>
            </div>
            
            <Button
              variant={activeTab === 'search' ? 'default' : 'outline'}
              onClick={() => setActiveTab('search')}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
            <TabsTrigger value="movies" className="gap-2">
              <FilmStrip className="h-4 w-4" />
              Movies
            </TabsTrigger>
            <TabsTrigger value="books" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Books
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2">
              <MagnifyingGlass className="h-4 w-4" />
              Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movies" className="space-y-6">
            <MovieCollection 
              userMovies={userMovies}
              onMovieClick={handleUserMovieClick}
            />
          </TabsContent>

          <TabsContent value="books" className="space-y-6">
            <BookCollection 
              userBooks={userBooks}
              onBookClick={handleUserBookClick}
            />
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold mb-2">Discover Content</h2>
              <p className="text-muted-foreground mb-8">
                Search for movies and books to add to your collection or create your own
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Movies Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Movies</h3>
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <CustomMovieForm onMovieCreate={handleMovieCreate} />
                    <span className="text-muted-foreground text-sm">or search existing movies</span>
                  </div>
                  <MovieSearch onMovieSelect={handleMovieSelect} />
                </div>

                {/* Books Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Books</h3>
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <CustomBookForm onBookCreate={handleBookCreate} />
                    <span className="text-muted-foreground text-sm">or search existing books</span>
                  </div>
                  <BookSearch onBookSelect={handleBookSelect} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <MovieDetails
        movie={selectedMovie}
        userMovie={selectedUserMovie || undefined}
        open={showMovieDetails}
        onClose={closeMovieDetails}
        onAddToList={handleAddToList}
        onUpdateMovie={handleUpdateMovie}
        onRemoveMovie={handleRemoveMovie}
      />

      <BookDetails
        book={selectedBook}
        userBook={selectedUserBook || undefined}
        open={showBookDetails}
        onClose={closeBookDetails}
        onAddToList={handleAddBookToList}
        onUpdateBook={handleUpdateBook}
        onRemoveBook={handleRemoveBook}
      />
    </div>
  )
}

export default App