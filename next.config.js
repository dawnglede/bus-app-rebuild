/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  },
}

module.exports = nextConfig
