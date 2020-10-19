<template>
  <div class="login_container">
    <!-- 顶部栏 -->
    <van-nav-bar title="登录/注册" class="login_nav">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>

    <!-- 表单区域 -->
    <van-form
      @submit="onSubmit"
      @failed="onFailed"
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
    >
      <van-field
        v-model="mobile"
        name="mobile"
        clearable
        center
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        type="tel"
        :rules="[{ required: true, message: '请输入手机号' },{pattern: /^1[3|5|7|8|9]\d{9}$/,message: '手机号格式错误'}]"
      />
      <van-field
        v-model="sms"
        name="sms"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        center
        clearable
        placeholder="请输入短信验证码"
        type="number"
        :rules="[{ required: true, message: '请输入验证码' },{pattern: /^\d{6}$/, message: '验证码格式错误'}]"
      >
        <template #button>
          <van-count-down
            :time="1000 * 10"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            type="default"
            round
            @click.prevent="onSendSms"
            :loading="isSmsBtbLoading"
            v-else
          >获取验证码</van-button>
        </template>
      </van-field>

      <!-- 按钮 -->
      <div class="login_btn">
        <van-button type="info" hairline block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user' // 用户相关接口
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      mobile: '13911111111', // 手机号
      sms: '246810', // 验证码
      isSmsBtbLoading: false, // 获取验证码的按钮是否在加载中
      isCountDownShow: false // 是否显示倒计时组件
    }
  },
  methods: {
    ...mapMutations({
      SET_NOW_USER_MUTATIONS: 'user/set_now_user_mutations'
    }),

    // 表单提交校验成功事件
    async onSubmit () {
      this.$toast.loading({
        message: '登录中...', // 提示文本
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })

      try {
        const sendData = {
          mobile: this.mobile,
          code: this.sms
        }
        const { data } = await login(sendData)
        // 4. 处理响应结果
        this.$toast.success({
          message: '登录成功',
          forbidClick: true
        })
        // 将后端返回的用户登录状态（token等数据）放到 Vuex 容器中
        this.SET_NOW_USER_MUTATIONS(data) // 保存登录token信息到vuex
        // 登录成功，跳转回原来页面
        // this.$router.back() // 先用这种方式，但是它不太好，有问题
        this.$router.push(this.$route.query.redirect || '/') // 从哪个页面登陆后，记录当前地址，登陆后将重定向参数redirect，然后跳转回登陆之前页面
      } catch (err) {
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },

    // 表单提交校验失败事件
    onFailed (error) {
      // 校验失败 提示校验错误信息
      this.$toast({
        message: error.errors[0].message, // 提示消息
        position: 'top', // 防止手机键盘太高看不见提示消息
        forbidClick: true // 放置触摸背景层
      })
    },

    // 点击按钮发送验证码
    async onSendSms () {
      // 点击发送验证码时需要自己对表单的电话号码输入进行校验 才能点击按钮
      const formRef = this.$refs['login-form'] // 获取表单引用ref
      try {
        // 表单的规则校验返回promise 验证成功不会返回数据 验证失败会在catch捕获错校验失败的信息
        await formRef.validate('mobile')

        // 验证通过，请求发送验证码
        this.isSmsBtbLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为

        // 得到手机号码 发送请求
        const sendData = { mobile: this.mobile }
        await getSmsCode(sendData)

        // 启动倒计时组件
        this.isCountDownShow = true
      } catch (error) {
        // 无论是表单校验失败还是获取手机验证码的错误都会在此捕获 所以需要判断是什么错误 进行提示
        // try 里面任何代码的错误都会进入 catch
        let message = ''
        if (error && error.response && error.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (error.name === 'mobile') {
          // 表单验证失败的错误提示
          message = error.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isSmsBtbLoading = false
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
