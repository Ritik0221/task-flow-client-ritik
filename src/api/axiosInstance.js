import axios from 'axios'
// 'https://task-flow-server-ebon.vercel.app/api'
const baseURL = import.meta.env.VITE_API_URL ||  'https://task-flow-server-ebon.vercel.app/api'

const axiosInstance = axios.create({
  baseURL,
})

// Add token to headers if present in localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default axiosInstance
