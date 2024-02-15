import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieReviews } from '../../services/api.js'

export const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const asyncFunction = async () => {
            try {
                setReviews(await fetchMovieReviews(id))
            } catch (error) {
                console.log('Error: ', error)
            }
        }
        asyncFunction()
    }, [id])

    const showReviews = () => {
        return (
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <section>
            {reviews.length > 0 ? (
                showReviews()
            ) : (
                <span>We don't have any reviews for this movie.</span>
            )}
        </section>
    )
}