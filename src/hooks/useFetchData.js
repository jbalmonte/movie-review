import api from '../api'
import useRatingCount from './useRatingCount';

export default function useFetchData() {
    const getRatingCount = useRatingCount(null, 'func')
    return async id => {
        const movie = await api.fetchById(id)
        if (movie.Title) {
            const ratingCount = getRatingCount(movie.imdbVotes?.replaceAll(',', ''))
            return {
                Poster: movie.Poster,
                Title: movie.Title,
                Genre: movie.Genre,
                Rated: movie.Rated,
                Released: movie.Released,
                Runtime: movie.Runtime,
                Metascore: movie.Metascore,
                'IMDB Rating': `${movie.imdbRating} (${ratingCount})`,
                Director: movie.Director,
                Plot: movie.Plot
            }
        }
        else throw new Error(movie.Error)
    }
}