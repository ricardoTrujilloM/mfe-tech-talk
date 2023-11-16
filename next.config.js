/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const nextConfig = {
  webpack(config, options){
    config.plugins.push(
      new NextFederationPlugin({
        name: 'cardMfe',
        filename: 'static/cardMfeRemoteEntry.js',
        exposes: {
          './Card': './components/Card'
        }
      })
    )
    return config;
  }
}

module.exports = nextConfig 

