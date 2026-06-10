import axios from 'axios'

// Walidacja baseURL
const validateBaseURL = (url) => {
  try {
    const parsedURL = new URL(url)
    // Tylko HTTP/HTTPS
    if (!['http:', 'https:'].includes(parsedURL.protocol)) {
      throw new Error('Invalid protocol')
    }
    // Blokuj localhost w produkcji (jeśli potrzebne)
    if (
      import.meta.env.PROD &&
      (parsedURL.hostname === 'localhost' || parsedURL.hostname === '127.0.0.1')
    ) {
      console.warn('Using localhost in production environment')
    }
    return url
  } catch {
    console.error('Invalid base URL:', url)
    // Fallback do localhost
    return 'http://localhost:3000/api/v1'
  }
}

const baseURL = validateBaseURL(
  import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api/v1'
)

const customFetch = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 60000, // 60 sekund dla rejestracji (email może trwać dłużej)
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor dla requestów - dodaj zabezpieczenia
customFetch.interceptors.request.use(
  (config) => {
    // Wyłącz verbose logging w DEV (za dużo duplikatów przez Strict Mode)
    // Odkomentuj poniżej jeśli potrzebujesz debugować:
    // if (import.meta.env.DEV) {
    //   console.log('Request:', config.method?.toUpperCase(), config.url)
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor dla odpowiedzi - obsłuż błędy
customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - przekieruj do logowania
      console.error('Unauthorized - redirecting to login')
      // Możesz dodać logikę przekierowania
    } else if (error.response?.status === 429) {
      // Rate limited
      console.error('Too many requests - rate limited')
    }
    return Promise.reject(error)
  }
)

export default customFetch
