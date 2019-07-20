<template>
  <div class="MyMessage">
    <header>
      <div>
        <van-icon name="setting" color="white" size="20px" />
        <img src="../../assets/logo.gif" />
        <br />
        <h3 v-if="user === '' || user === null" @click="Land">请登录</h3>
        <div v-else>
          <h3>欢迎：{{ user }}</h3>
          <br />
          <p @click="signtOut">退出登录</p>
        </div>
      </div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="balance-pay">待付款</van-tabbar-item>
        <van-tabbar-item icon="logistics" dot>待发货</van-tabbar-item>
        <van-tabbar-item icon="points" info="5">待收货</van-tabbar-item>
        <van-tabbar-item icon="thumb-circle-o" info="20">评价</van-tabbar-item>
        <van-tabbar-item icon="like-o" info="20">已完成</van-tabbar-item>
      </van-tabbar>
    </header>
    <br /><br /><br /><br /><br />
    <footer>
      <div>
        <van-icon name="records" />全部订单
        <van-icon class="icon_" name="arrow" />
      </div>
      <br />
      <div @click="tolike">
        <van-icon name="star-o" />我的收藏
        <van-icon class="icon_" name="arrow" />
      </div>
      <br />
      <div>
        <van-icon name="location-o" />地址管理
        <van-icon class="icon_" name="arrow" />
      </div>
      <br />
      <div>
        <van-icon name="eye-o" />最近浏览
        <van-icon class="icon_" name="arrow" />
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MyMessage",
  components: {},
  props: {},
  data() {
    return {
      user: "",
      active: 0,
      activeNames: ["1"]
    };
  },
  methods: {
    tolike(){
      this.$router.push("/MyLike")
    },
    Land() {
      this.$router.push("/Land");
    },
    signtOut() {
      this.$axios
        .req("api/loginOut", { username: localStorage.getItem("user") })
        .then(res => {
          console.log(res);
          localStorage.clear("user");
          this.user = "";
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.user = localStorage.getItem("user");
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.MyMessage header {
  width: 100%;
  height: 400px;
  background-color: #6f7eff;
}
.MyMessage header h3 {
  width: 400px;
  text-align: center;
  margin: 0 auto;
}
.MyMessage header img {
  display: block;
  width: 211px;
  border-radius: 25%;
  text-align: center;
  margin: 0 auto;
}
.MyMessage header p {
  width: 400px;
  text-align: center;
  margin: 0 auto;
}
header .van-icon {
  margin-left: 92%;
  margin-top: 3%;
}
.van-tabbar {
  margin-bottom: 10px;
  position: fixed;
  top: 400px;
}
footer {
  font-size: 30px;
}
.icon_ {
  margin-left: 70%;
}
</style>
