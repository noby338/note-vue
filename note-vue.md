# note-vue

* 使用
  * 本项目配合后端项目note-springboot项目使用
* 知识点
  * vue的使用
  * axios的使用
    * 请求参数的携带
    * requst和respons过滤器的使用
  * elementui的使用
  * vue.config.js的配置
    * 请求路径的的ip、端口、上下文路径统一配置
    * 本项目的启动端口、启动后开启浏览器
    * 前端通过代理服务器解决跨域问题
  * .env.development .env.prodection .env.test
    * 这三个文件是用来存储不同环境下的配置信息的，分别对应开发环境、生产环境和测试环境。
    * 在一个项目中，不同的环境可能会需要不同的配置，比如后端 API 的地址、数据库连接信息、密钥等等。使用环境变量可以使得这些配置信息与代码分离，避免了在代码中硬编码这些敏感信息的风险。
    * 在 Vue.js 项目中，默认情况下会提供三个不同的环境配置文件：
      * .env.development：用于开发环境，会在 npm run serve 命令启动开发服务器时被加载。
      * .env.production：用于生产环境，会在 npm run build 命令打包发布生产版本时被加载。
      * .env.test：用于测试环境，会在 npm run test 命令执行测试时被加载。
    * 这些环境变量可以在 Vue.js 应用程序的代码中使用 process.env 对象来获取。例如，如果在 .env.development 中设置了 VUE_APP_API_URL=http://localhost:8080/api，那么在 Vue.js 组件中可以通过 process.env.VUE_APP_API_URL 来获取这个地址。
    * 请注意，以 VUE_APP_ 开头的环境变量是 Vue.js 内置的变量名，用于指定应用程序的自定义环境变量。在其他变量名中使用 _APP_ 可能会导致冲突。
  * dev环境可使用vue-cli进行跨域处理，而pro环境使用vercel的代理服务器进行跨域处理
    * 使用vercel代理的步骤
      * 安装npm i http-proxy-middleware依赖
      * 在根目录下创建vercel.json文件
      * /api/proxy.js中使用http-proxy-middleware进行跨域处理
  