import { useEffect, useState } from 'react'
import { useParams, Link, Outlet, useLocation } from 'react-router-dom'
import { fetchMovieDetailsWithId } from '../../services/api'
import { Button, Details, Description, Additional, Item } from './MovieDetails.styled'

export const MovieDetails = () => {
    const [details, setDetails] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const asyncFunction = async () => {
            try {
                setDetails(await fetchMovieDetailsWithId(id))
            } catch (error) {
                console.log('Error: ', error)
            }
        }
        asyncFunction()
    }, [id])

    const getGenres = () => {
        const genres = details.genres.map((genre) => genre.name).join(' ')
        return genres
    }

    const location = useLocation()
    const backLinkHref = location.state?.from ?? '/movies'

    const { title, release_date, poster_path, vote_average, overview, genres } =
        details

    return (
        <main>
            <Link to={backLinkHref}>
                <Button>&#x2190; Go back</Button>
            </Link>
            <Details>
                <img
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt={title}
                    width={350}
                />
                <Description>
                    <h2>
                        {title}({release_date ? release_date.slice(0, 4) : ''})
                    </h2>
                    <span>User score: {Math.round(vote_average * 10)}%</span>

                    <h3>Overview</h3>
                    <p>{overview}</p>

                    <h3>Genres</h3>
                    {genres ? getGenres() : ''}
                </Description>
            </Details>
            <Additional>
                <span>Additional information</span>
                <ul>
                    <li>
                        <Item to="cast">
                            Cast
                        </Item>
                    </li>
                    <li>
                        <Item to="reviews">Reviews</Item>
                    </li>
                </ul>
            </Additional>
            <div>
                <Outlet />
            </div>
        </main>
    )
}