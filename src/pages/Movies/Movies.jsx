import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchMoviesWithQuery } from '../../services/api'
import { MoviesListItem } from './Movies.styled'

export const Movies = () => {
    const [movies, setMovies] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()

    const movieTitle = searchParams.get('query') ?? ''

    useEffect(() => {
        const searchedMovies = async () => {
            const listOfMovies = await fetchMoviesWithQuery(movieTitle)
            setMovies(listOfMovies)
        }
        searchedMovies()
    }, [movieTitle])

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setSearchParams({ query: form.elements.query.value })
        form.reset()
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="text" name="query" />
                <button type="submit">Search</button>
            </form>
            {movies.length > 0 ? (
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                        <Link to={`${movie.id}`} state={{ from: location }}>
                            <MoviesListItem>
                                {movie.title}
                            </MoviesListItem>
                        </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                ''
            )}
        </main>
    )
}