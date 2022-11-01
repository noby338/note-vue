/**
 * 该文件为用户自定义的第三方vue配置文件，书写的属性将覆盖vue原配置
 */
module.exports = {
	devServer: {
		port: 8090, // 端口号的配置
		open: true, // 自动打开浏览器
		proxy: {//省略ip、端口及上下文的书写
			'/': {
				target: 'http://localhost:8080/note-springboot',
			},
		}
	}
}