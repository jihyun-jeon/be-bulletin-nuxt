export default function ({ $axios }) {
  $axios.defaults.baseURL = 'http://localhost:3000'

  $axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('ACCESS_TOKEN')
      if (accessToken) {
        config.headers.Authorization = accessToken
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  $axios.interceptors.response.use(
    (response) => response, // 2xx 범위 내
    (err) => Promise.reject(err.response) // 2xx 범위 밖
  )
}
