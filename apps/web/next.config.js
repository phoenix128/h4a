const withH4a = require('./h4a.config');

module.exports = withH4a({
    reactStrictMode: true,
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.bigcommerce.com',
            },
            {
                protocol: 'https',
                hostname: '**.picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
        ],
    },

    // webpack: (config) => {
    //   config.resolve.alias = {
    //     ...config.resolve.alias,
    //     '@h4a/..': resolve(__dirname, '../../'),
    //   }
    //   return config;
    // }
});
