/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV === 'development'
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: isDevelopment ? process.env.BACKEND_URL_DEVELOPMENT : process.env.BACKEND_URL_PRODUCTION,
    DATABASE_URL: process.env.DATABASE_URL,
    REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION
  },
  publicRuntimeConfig: {

  },
  serverRuntimeConfig: {
    env: {
      REACT_APP_GOOGLE_ID: process.env.REACT_APP_GOOGLE_ID,
      REACT_APP_GOOGLE_SECRET: process.env.REACT_APP_GOOGLE_SECRET,
      JWT_SECRET: process.env.JWT_SECRET
    }
  }
}

module.exports = nextConfig