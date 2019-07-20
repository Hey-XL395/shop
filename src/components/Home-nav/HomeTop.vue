<template>
  <div class="HomeTop">
    <p>商品推荐</p>
    <div class=" picture-wrap" ref="pictureWrap">
      <ul class="picture-list">
        <li
          class=" picture-item"
          v-for="(item, index) in homeObj.recommend"
          :key="index"
        >
          <div><img :src="item.image" alt="" @click="details(item)"/></div>
          <div class="HomeTop_name" >{{ item.goodsName }}</div>
          <div  class="HomeTop_Price" >
            ￥{{ item.mallPrice }}<s style="color: #6f6f6f">￥{{ item.price }}</s>
          </div>
          <div class="HomeTop_Bottom">
            <span class="shopping-cart">
              <van-icon name="shopping-cart-o" />
            </span>
            <span class="details_" @click="details(item)">
              查看详情
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "HomeTop",
  components: {},
  props: {
    homeObj: Object
  },
  data() {
    return {};
  },
  methods: {
    details(item) {
      // console.log(item);
      this.$router.push({name:'DetailsPage',params:{id:item.goodsId}})
    },
    pictureScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.pictureWrap, {
            startX: 0,
            scrollX: true,
            //可点击
            click: true,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  },
  mounted() {},
  created() {
    this.$nextTick(() => {
      this.pictureScroll();
    });
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped>
.HomeTop img {
  width: 210px;
}
.picture-wrap {
  width: 100%;
  overflow: hidden;
  display: flex;
}
.picture-list {
  display: flex;
}
.HomeTop_name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shopping-cart {
  background-color: #fff345;
  padding: 3px 7px;
  width: 30%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.details_ {
  background-color: #ff1d17;
  padding: 3px 7px;
  color: white;
  width: 70%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.HomeTop_Bottom {
  text-align: center;
}
/*.picture-wrap,*/
/*.picture-list,*/
/*.picture-item {*/
/*  display: inline-block;*/
/*}*/
.picture-item {
  border: 1px #eeeeee solid;
}
.picture-wrap {
  width: 100%;
  overflow: hidden;
  text-align: center;
}
.HomeTop_name {
  width: 200px;
}
.HomeTop p {
  background-color: white;
  line-height: 50px;
  font-size: 30px;
  padding: 8px;
}
</style>
