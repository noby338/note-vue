/**
 * 该文件为用户自定义的第三方vue配置文件，书写的属性将覆盖vue原配置
 */
module.exports = {
	publicPath: './',
	outputDir: process.env.outputDir,//默认为dist目录，test模式中的输出目录以修改为test，production模式的为默认值
	devServer: {
		port: 8090, // 项目端口号的配置
		open: false, // 启动后自动打开浏览器
		
		/*
		启用前端服务器的代理服务器(vue-cli自带)
		启用代理可绕过浏览器的同源策略进行跨域
		代理服务器和前端服务器的端口号一致都为8090，
		proxy: 'http://localhost:8080'表示代理服务器的请求地址
		*/
		/*
		方式1：所有请求均使用跨域
		前端的请求为http://localhost:8090/note-springboot/dep/1/5表示前端服务器请求代理服务器
		或/note-springboot/dep/1/5表示前端服务器请求代理服务器
		该方式无法请求前端服务器自己路径的资源(8090被代理服务器使用，自己无法使用)
		*/

		// proxy: 'http://localhost:8080',

		/*
		方式2：请求端口后输入api的使用跨域
		前端的请求为http://localhost:8090/api/note-springboot/dep/1/5表示前端服务器请求代理服务器
		或/api/note-springboot/dep/1/5表示前端服务器请求代理服务器
		前端的请求为http://localhost:8090/note-springboot/dep/1/5表示前端服务器使用前端服务器自己的资源(8090)，不使用代理路径
		
		这段代码是在配置Vue.js中的Webpack Dev Server代理，用于在开发阶段中将前端页面的请求代理转发至后端服务器。代理的规则如下：
		*/
		proxy: {
			'/api-dev': {
				target: 'http://localhost:8080',//后端服务器的地址和端口。对于以 /api-dev 开头的请求，将它们代理到 http://localhost:8080 这个地址上。
				pathRewrite: {'^/api-dev':''},//pathRewrite 选项指定了在转发请求时需要对请求路径进行重写，将路径中的 /api-dev 替换成空字符串。例如，如果前端发送的请求路径是 /api-dev/users，那么实际上会被代理转发到 http://localhost:8080/users。
				ws: true,//ws 选项表示是否支持 WebSocket。如果设置为 true，那么代理服务器会在后端服务器上打开 WebSocket 连接，从而支持 WebSocket 通信。t
				changeOrigin: true//changeOrigin 选项表示是否修改请求头中的 Origin 字段。如果设置为 true，代理服务器会将请求头中的 Origin 修改为后端服务器的地址，从而绕过浏览器的同源策略限制。这个选项在开发阶段通常需要设置为 true。
			}
		}
		
	},
	

}
