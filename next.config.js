/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    google_map: process.env.NEXT_PUBLIC_GOOGLE_MAP,
  },
}

module.exports = nextConfig
