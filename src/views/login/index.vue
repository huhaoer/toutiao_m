<template>
  <div class="login_container">
    <!-- 顶部栏 -->
    <van-nav-bar title="登录/注册" class="login_nav">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>

    <!-- 表单区域 -->
    <van-cell-group>
      <van-field v-model="value1" clearable center left-icon="smile-o" placeholder="请输入手机号" />
      <van-field v-model="sms" left-icon="smile-o" center clearable placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary">获取验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>

    <!-- 按钮 -->
    <div class="login_btn">
      <van-button type="info" hairline block>登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      value1: '',
      sms: ''
    }
  }
}
</script>

<style lang="less">
.van-nav-bar__title {
  // navbar里面的字体颜色
  color: #fff;
}
</style>
<style lang="less" scoped>
// 顶部信息
.login_container {
  .login_nav {
    background-color: #3196fa;
    .van-icon {
      color: #fff;
    }
  }
}

// 按钮
.login_btn {
  padding: 20px;
}
</style>
