// Dependencies
import axios from 'axios'
import { config } from 'dotenv'

// Dotenv
config()

// Http client
const httpClient = axios.create({
  baseURL: process.env.REPOSITORY_API_URL,
  headers: {
    authorization: `token ${process.env.REPOSITORY_API_TOKEN}`
  }
})

// Named export
export default httpClient