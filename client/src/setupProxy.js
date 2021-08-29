const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(createProxyMiddleware('/upload', { target: 'https://127.0.0.1:5000/', secure: false, changeOrigin: true }));
};
