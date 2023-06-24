/**
 * Next.js config
 * @param nextConfig
 * @returns {{transpilePackages: *[]}}
 */
const withH4a = (nextConfig = {}) => {
    console.log('Loading H4A config');

    const modules = require('../../h4a.modules.json');
    for (const moduleName of modules) {
        console.log(`Using ${moduleName}`);
    }

    return {
        ...nextConfig,
        transpilePackages: [
            ...(nextConfig.transpilePackages || []),
            ...modules,
        ],
        experimental: {
            ...nextConfig.experimental,
            appDir: true,
            // fontLoaders: [
            //   { loader: "@next/font/google", options: { subsets: ["latin"] } },
            // ],
        },
    };
};

module.exports = withH4a;
