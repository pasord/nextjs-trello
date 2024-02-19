/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // 为<Image> 配置允许的外来图片, Image 会进行服务端优化
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com"
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com"
            },
        ]
    }
};

export default nextConfig;
