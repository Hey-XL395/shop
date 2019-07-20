<template>
  <div class="MyLike">
    <header>
      <van-icon name="arrow-left" @click="backto" />
      <div>我的收藏</div>
    </header>
    <div class="dataList_" v-for="(item, index) in MyLike.list" :key="index">
      <div class="dataList">
        <img :src="item.image_path" alt="" @click="details(item)" />
        <div>
          <div @click="details(item)">{{ item.name }}</div>
          <div @click="details(item)">
            <br /><br />
            ￥{{ item.present_price }}
          </div>
        </div>
      </div>
      <van-icon class="del" name="cross" @click="del(item)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MyLike",
  components: {},
  props: {},
  data() {
    return {
      MyLike: {}
    };
  },
  methods: {
    del(item) {
      console.log(item);
      this.$dialog
        .confirm({
          title: "删除",
          message: "删除该项收藏"
        })
        .then(() => {
          this.$store.state.arr = [];
          this.$axios
            .req("api/cancelCollection", {
              id: item.cid
            })
            .then(res => {
              this.$toast.success("已取消收藏");
              this.$axios
                .req(`api/collection/list`)
                .then(res => {
                  // console.log(res.data.data);
                  this.MyLike = res.data.data;
                })
                .catch(e => {
                  console.log(e);
                });
              console.log(res);
            })
            .catch(e => {
              console.log(e);
            });
          this.$toast("删除成功");
        })
        .catch(() => {
          this.$toast("取消删除");
        });
    },
    backto() {
      this.$router.go(-1);
    },
    details(item) {
      console.log(item);
      this.$router.push({ name: "DetailsPage", params: { id: item.cid } });
    }
  },
  mounted() {
    this.$axios
      .req(`api/collection/list`)
      .then(res => {
        console.log(res.data.data);
        this.MyLike = res.data.data;
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
.MyLike header {
  display: flex;
  border-bottom: 1px silver solid;
  justify-content: center;
}
.MyLike header .van-icon {
  margin: 20px;
  color: red;
  font-size: 30px;
  position: absolute;
  left: 10px;
  border: 1px skyblue solid;
  padding: 10px;
  background-color: skyblue;
}
.MyLike header div {
  font-size: 30px;
  margin: 30px;
  position: relative;
}
.dataList {
  display: flex;
  align-items: center;
  padding: 15px;
}
.dataList_ {
  border-bottom: 1px #bebebd solid;
}
.MyLike img {
  width: 30%;
  border: 1px #beb6c0 solid;
}
.del {
  border: 1px skyblue solid;
  border-radius: 50%;
  float: right;
  top: -50px;
  right: 30px;
}
.MyLike {
  clear: both;
}
</style>
