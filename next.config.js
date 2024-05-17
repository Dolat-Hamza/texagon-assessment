/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack: (config) => {
        /**
         * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
         * Module parse failed: Unexpected character '�' (1:0)" error
         */
        config.resolve.alias.canvas = false;

        // You may not need this, it's just to support moduleResolution: 'node16'
        config.resolve.extensionAlias = {
            '.js': ['.js', '.ts', '.tsx'],
        };

        return config;
    },
    images: {
        domains: ["img.freepik.com", "fakestoreapi.com"],

    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    reactStrictMode: true,
    transpilePackages: [
        "antd",
        "@ant-design/plots",
        "@ant-design/icons",
        "@ant-design/icons-svg",
        "rc-pagination",
        "rc-picker",
        "rc-util",
        "rc-tree",
        "rc-tooltip"
    ]
}

module.exports = nextConfig