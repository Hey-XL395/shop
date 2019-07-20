<template>
  <div id="app">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"
    />
    <!--    禁止缩放-->
    <router-view />
    <van-tabbar v-model="active" active-color="red" inactive-color="#000" v-if="$route.meta.showFooter===true" class="homesize" >
      <van-tabbar-item icon="wap-home" to="/">商城 </van-tabbar-item>
      <van-tabbar-item icon="wap-nav" to="/Classification"
        >分类</van-tabbar-item
      >
      <van-tabbar-item icon="shopping-cart-o" to="/ShoppingCart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="manager-o" to="/MyMessage">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  watch: {
    // 监听路由变化
    $route(to) {
      if (to.path === "/") {
        this.active = 0;
      }
      if (to.path === "/Classification") {
        this.active = 1;
      }
      if (to.path === "/ShoppingCart") {
        this.active = 2;
      }
      if (to.path === "/MyMessage") {
        this.active = 3;
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import "./style/common";
* {
  margin: 0;
  padding: 0;
}
</style>
