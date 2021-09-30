import axios from 'axios'

const api = {
    fetch: async category => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_IMDB_END_POINT}/${category}/${process.env.REACT_APP_IMDB_API_KEY}`)
            console.log('RESPONSE', response.data.items)
            return response.data.items
        }
        catch (err) {
            console.log('API:Error', err)
        }
    },
    fetchByCount: async function (category, number) {
        try {
            const movies = await this.fetch(category)
            return movies.slice(0, number)
        } catch (err) {
            console.log('API:Error: ', err)
        }
    }

}

export default api