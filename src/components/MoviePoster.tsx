import { useState } from 'react'
import { Film } from '@phosphor-icons/react'

interface MoviePosterProps {
  src: string
  alt: string
  className?: string
  fallbackTitle?: string
}

export function MoviePoster({ src, alt, className = "", fallbackTitle }: MoviePosterProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  if (imageError || !src || src.includes('/api/placeholder')) {
    return (
      <div className={`bg-gradient-to-br from-card to-muted flex items-center justify-center relative ${className}`}>
        <div className="text-center p-4">
          <Film className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          {fallbackTitle && (
            <p className="text-xs text-muted-foreground font-medium leading-tight line-clamp-3">
              {fallbackTitle}
            </p>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  )
}