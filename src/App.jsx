import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './components/SharedLayout/SharedLayout';
import { Home } from './pages/Home/Home';
import { lazy } from 'react';
// import { Cast } from './components/Cast/Cast'
// import { Reviews } from 'components/Reviews/Reviews'
// import { Movies } from 'pages/Movies/Movies'
// import { MovieDetails } from 'pages/MovieDetails/MovieDetails'

const Cast = lazy(() => import('./components/Cast/Cast'));
const Reviews = lazy(() => import('./components/Reviews/Reviews'));
const Movies = lazy(() => import('./pages/Movies/Movies'));
const MovieDetails = lazy(() => import('./pages/MovieDetails/MovieDetails'));

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<SharedLayout />}>
                <Route index element={<Home />} />
                <Route path="movies" element={<Movies />} />
                <Route path="movies/:id" element={<MovieDetails />}>
                    <Route path="cast" element={<Cast />} />
                    <Route path="reviews" element={<Reviews />} />
                </Route>
            </Route>
        </Routes>
    )
}