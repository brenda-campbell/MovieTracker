// Shared interfaces for the application

export interface Movie {
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

export interface UserMovie {
  movie: Movie
  status: 'watched' | 'want-to-watch' | 'currently-watching'
  rating?: number
  notes?: string
  dateAdded: string
}

export interface Book {
  id: string
  title: string
  year: string
  cover: string
  description: string
  author: string
  genre: string
  pages: string
  rating: string
}

export interface UserBook {
  book: Book
  status: 'read' | 'want-to-read' | 'currently-reading'
  rating?: number
  notes?: string
  dateAdded: string
}