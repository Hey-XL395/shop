<template>
  <div class="HomeBottom">
    <header>热销商品</header>
    <span
      class="HomeBottom_"
      v-for="(item, index) in homeObj.hotGoods"
      :key="index"
    >
      <img :src="item.image" alt="" @click="details(item)" />
      <div>{{ item.name }}</div>
      <div>
        ￥{{ item.mallPrice }}<s style="color: #6f6f6f">￥{{ item.price }}</s>
      </div>
    </span>
    <br><br><br>
  </div>
</template>
<script>
export default {
  name: "HomeBottom",
  props: {
    homeObj: Object
  },
  methods: {
    details(item) {
      // console.log(item);
      this.$router.push({ name: "DetailsPage", params: { id: item.goodsId } });
    }
  }
};
</script>

<style scoped>
.HomeBottom {
  background-color: white;
}
.HomeBottom header {
  color: red;
  font-size: 30px;
  margin: 10px 0;
  text-align: center;
  background-color: #eeeeee;
}
.HomeBottom img {
  width: 100%;
}
.HomeBottom_ {
  display: inline-block;
  width: 50%;
  text-align: center;
  color: red;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
