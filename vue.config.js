module.exports = {
    configureWebpack: config => {
        delete config.devtool
        delete config.output.libraryExport
        // config.externals.axios = 'axios'
    },
    // chainWebpack: config => {
    //     config.externals({
    //         axios: true
    //     })
    // }
}