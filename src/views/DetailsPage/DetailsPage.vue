<template>
  <div class="DetailsPage">
    <van-icon
      class="backtoClass"
      name="arrow-left"
      @click="backtoClass"
    ></van-icon>
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
        @click="onClickIcon"
      ></van-goods-action-icon>
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="onClickIcon"
      ></van-goods-action-icon>
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="onClickButton"
      ></van-goods-action-button>
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="onClickButton"
      ></van-goods-action-button>
    </van-goods-action>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item><img :src="DetailsObj.image" alt=""/></van-swipe-item>
      <van-swipe-item
        ><img :src="DetailsObj.image_path" alt=""
      /></van-swipe-item>
    </van-swipe>
    <div class="name">{{ DetailsObj.name }}</div>
    <div class="name price">￥{{ DetailsObj.present_price }}</div>
    <ul class="like">
      <li>运费：0</li>
      <li>剩余：100000</li>
      <li>
        收藏：<van-icon
          v-show="flag === true"
          name="like-o"
          @click="lickcolor"
        /><van-icon
          v-show="flag === false"
          name="like"
          color="red"
          @click="lickcolor"
        />
      </li>
    </ul>
    <br />
    <ul class="like1">
      <li>
        <van-icon name="shop-o" /> 有赞的店
        <van-button type="danger">官方</van-button>
      </li>
      <li>进入店铺 <van-icon name="arrow" /></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DetailsPage",
  components: {},
  props: {},
  data() {
    return {
      DetailsObj: {},
      PageId: "",
      color: "",
      flag: true
    };
  },
  methods: {
    onClickIcon() {
      Toast("点击图标");
    },
    onClickButton() {
      Toast("点击按钮");
    },
    lickcolor() {
      if (this.flag === true) {
        // 收藏
        axios
          .post("api/collection", this.DetailsObj)
          .then(res => {
            this.$toast.success("收藏成功");
            // console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
        this.flag = false;
        // 取消收藏
      } else {
        axios
          .post("api/cancelCollection", this.DetailsObj)
          .then(res => {
            this.$toast.success("已取消收藏");
            // console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
        this.flag = true;
      }
    },
    backtoClass() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.PageId = this.$route.params.id;
    this.$axios
      .req(`api/goods/one?id=${this.PageId}&page=${1}`)
      .then(res => {
        // console.log(res.data);
        this.DetailsObj = res.data.goods.goodsOne;
      })
      .catch(e => {
        console.log(e);
      });
    this.$axios
      .req("api/isCollection ", { id: this.PageId })
      .then(res => {
        // console.log(res);
        if (res.data.isCollection === 1) {
          this.flag = false
        }
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.DetailsPage .backtoClass {
  margin: 20px;
  border: 1px saddlebrown solid;
  padding: 10px;
  background-color: skyblue;
  border-radius: 50%;
}
.van-goods-action-button {
  height: 100px;
  font-size: 30px;
}
.van-goods-action-icon {
  height: 100px;
}
.DetailsPage .van-swipe-item img {
  width: 100%;
}
.DetailsPage .name {
  font-size: 30px;
  margin: 20px;
}
.DetailsPage .price {
  color: red;
}
.like {
  display: flex;
  justify-content: space-around;
  font-size: 30px;
  border-top: 1px silver solid;
  border-bottom: 1px silver solid;
  padding: 10px 0;
}
.like1 {
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  border-top: 1px silver solid;
  border-bottom: 1px silver solid;
  padding: 10px 20px;
}
.like .van-icon {
  vertical-align: middle;
}
</style>
