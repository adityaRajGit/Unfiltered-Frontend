import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
    ],
  },
  // Baseline security headers. A full Content-Security-Policy is deliberately left
  // out: Razorpay, Clarity, Meta Pixel and Jitsi each need careful allow-listing.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Camera and microphone stay allowed for this site and for the 8x8.vc (Jitsi)
          // meeting iframe used for video sessions; without 8x8.vc listed here the
          // iframe's allow="camera; microphone" would be overridden.
          {
            key: 'Permissions-Policy',
            value: 'camera=(self "https://8x8.vc"), microphone=(self "https://8x8.vc"), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
