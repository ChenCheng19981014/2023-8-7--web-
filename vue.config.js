module.exports = {
    lintOnSave: false,
    publicPath: process.env.VUE_APP_BASE_ASSETS,
    // assetsDir: 'static',
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/design/var.scss";`,
            }
        }
    },
    devServer:{
        open:true,
        port:80,
        proxy:{
            "/api":{
                target:'https://smartpark-yx.zhlxsemicon.com/api',
                pathRewrite: { "^/api": "" }, 
                ws: true, 
                changeOrigin: true 
            }
        }
    }
}

