import {createProxyMiddleware} from "http-proxy-middleware";

module.exports = function(app: any) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://xmess-gateway-service.jelastic.regruhosting.ru',
            changeOrigin: true,
        })
    );
};
