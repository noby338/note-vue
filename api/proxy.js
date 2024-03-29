// vercel.json中配置了解析这个文件
// 该服务为 vercel serve跨域处理
const {
    createProxyMiddleware
} = require('http-proxy-middleware')
module.exports = (req, res) => {
    let target = ''
    // 代理目标地址
    if (req.url.startsWith('/api-pro')) {
        target = 'http://47.98.143.157:8080'
    }
    // 创建代理对象并转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            // 通过路径重写，去除请求路径中的 `/api`
            '^/api-pro/': '/'
        }
    })(req, res)
}