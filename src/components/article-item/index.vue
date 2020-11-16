<template>
  <!-- 该文章组件分为三种情况，无图片的，1张图片的，3张图片的
    右侧默认插槽显示1张图片或者是无图片
    label插槽显示三张图片
    article.cover.type  ==> 0->无图  1->1张图  3->3张图
 -->
  <div class="article-item">
    <van-cell
      :to="{
        name: 'detail',
        params: {
          articleId: article.art_id
        }
      }"
    >
      <!-- 左侧插槽 自定义左侧 title 的内容-->
      <div slot="title" class="atticle__title van-multi-ellipsis--l3">
        {{ article.title }}
      </div>

      <!-- 右侧插槽 自定义右侧 value 的内容 -->
      <div slot="default" v-if="article.cover.type === 1">
        <van-image
          :src="article.cover.images[0]"
          fit="cover"
          class="right__img"
        />
      </div>

      <!-- label插槽 自定义标题下方 label 的内容-->
      <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <div
            class="cover-wrap-item"
            v-for="(img, index) in article.cover.images"
            :key="index"
          >
            <van-image
              :src="img"
              fit="cover"
              class="cover-img"
            />
          </div>
        </div>
        <div class="label-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang='less' scoped>
.article-item {
  .atticle__title {
    color: #3a3a3a;
    font-size: 16px;
  }
  /deep/ .van-cell__value {
    // 右侧图片布局
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right__img {
    // 写在image图片身上的行内样式不会被转换，写在style里面
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0;
    box-sizing: border-box;
    &-item {
      flex: 1;
      height: 73px;
      &:not(:last-of-type) {
        padding-right: 4px
      };
      .cover-img {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>
