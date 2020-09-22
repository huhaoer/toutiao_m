module.exports = {
  plugins: { // 配置需要使用的相关插件
    // vue-cli包含了自动添加前缀的插件 下面的兼容性配置写在.browserslistrc文件中
    // 这个配置没问题，但是这里会编译警告  vue-cli通过browserslistrc文件 配置兼容信息
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },

    // 把px转为rem
    'postcss-pxtorem': {
      rootValue: 37.5, // 转换的根元素基准值 正常情况下按照设计稿 vant是基于375写的
      propList: ['*']// 设定可以从px转换为rem的属性
    }
  }
}
