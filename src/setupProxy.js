const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    "/sap",
    createProxyMiddleware({
      target: "https://bfesb20.solco.global.nttdata.com:44300",
      changeOrigin: true,
      secure: false
    })
  );
};
