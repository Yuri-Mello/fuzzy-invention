import axios from 'axios';

const apiOxean = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
})

export const exportMovies = async () => {
    const response = await apiOxean.get('/api/external_movies')

    return response.data
}

export const importMovie = async (title, director) => {
    await apiOxean.post('/api/external_movies', {
        title: title,
        director: director
    }).then((response) => {
        if (response.data) {
            alert('Movie created.')
        }
    })
}

export const login = async (email, password) => {
    await apiOxean.post('/api/login', {
        email: email,
        password: password
    }).then((response) => {
        return response.data
    })
}

export default apiOxean;