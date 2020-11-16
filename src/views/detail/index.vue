<template>
  <div class="article-detail">
    <!-- S 导航栏头部 -->
    <header class="article-detail__header">
        <van-nav-bar
            title="文章详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
    </header>
    <!-- E 导航栏头部 -->

    <!-- S 文章标题 -->
    <h1 class="article-detail__title">{{ article.title }}</h1>
    <!-- E 文章标题 -->

    <!-- S 作者信息 -->
    <van-cell center class="article-detail__author">
        <van-image
            :src="article.aut_photo"
            fit="cover"
            slot="icon"
            round
            size="mini"
            class="author__avatar"
        />
        <div slot="title" class="author__name">
            {{ article.aut_name }}
        </div>
        <div slot="label" class="author__time">{{ article.pubdate | relativeTime }}</div>
        <van-button
            :type="article.is_followed ? 'warning' : 'info'"
            size="small"
            round
            slot="default"
            :icon="article.is_followed ? '' : 'plus'"
            class="author__btn"
        >{{ article.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>
    <!-- E 作者信息 -->

    <!-- S 文章内容 -->
    <div
      class="article-detail__content markdown-body"
      v-html="article.content"
      ref="articleRef"
    >
    </div>
    <!-- E 文章内容 -->
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
import '@/style/markdown.css'
import { ImagePreview } from 'vant'

export default {
  name: 'ArticleDetail',
  props: {
    articleId: { // 通过动态路由传递的参数 开启props:true 可在组件内部接收参数
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {} // 文章详情
    }
  },
  methods: {
    //   点击左侧返回按钮事件
    onClickLeft () {
      this.$router.back()
    },

    //   获取文章详情
    async loadArticleDetail () {
      const { data } = await getArticleDetail(this.articleId)
      this.article = data // 给文章详情赋值
      /**
       * 数据改变影响视图更新（DOM结构）是异步的，并不是立即的
       * 在修改数据之后要立刻操作该视图对应的DOM结构需要使用$nextTick方法
       */
      this.$nextTick(() => {
        this.previewImg()
      })
    },

    // 文章图片预览
    previewImg () {
      const contentRef = this.$refs.articleRef // 获取引用
      const imgs = contentRef.querySelectorAll('img') // 获取所有的imgs数组
      const imgPaths = [] // 显示图片路径的数组
      Array.from(imgs).forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: imgPaths,
            showIndicators: true,
            startPosition: index
          })
        }
      })
    }
  },
  created () {
    this.loadArticleDetail()
  }
}
</script>

<style lang='less' scoped>
.article-detail {
    // 头部
    &__header {
        /deep/ .van-nav-bar {
            background-color: #3196fa;
            .van-nav-bar__arrow {
                color: #fff;
            }
            .van-nav-bar__text {
                color: #fff;
            }
            .van-nav-bar__title {
                color: #fff;
            }
        }
    }
    // 标题
    &__title {
        font-size: 20px;
        color: #3a3a3a;
        padding: 14px;
        background-color: #fff;
    }
    // 作者
    &__author {
        .author__avatar {
            width: 35px;
            height: 35px;
            margin-right: 8px;
        }
        .author__name {
            font-size: 12px;
            color: #333;
        }
        .author__time {
            font-size: 11px;
            color: #b4b4b4;
        }
        .author__btn {
            width: 85px;
            height: 29px;
        }
    }
    // 内容
    &__content {
        padding: 14px;
        background-color: #fff;
    }
}
</style>
