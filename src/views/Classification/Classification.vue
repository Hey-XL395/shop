<template>
  <div class="Classification" ref="ClassWrap">
    <div>
      <header>商品分类</header>
      <!--    侧边栏-->
      <div class="Classification_">
        <ul>
          <li
            v-for="(item, index) in category.category"
            :key="index"
            :class="{ white: num1 === index }"
          >
            <!--          动态绑定CLASS-->
            <div @click="class_(item, index)">{{ item.mallCategoryName }}</div>
          </li>
        </ul>
        <van-tabs
          v-model="active"
          title-active-color="red"
          line-width="50px"
          v-if="category.categoryItem"
          @change="onClick"
        >
          <!--        顶部tab-->
          <van-tab
            class="Detailsize"
            v-for="(item, index) in category.categoryItem.bxMallSubDto"
            :key="item.id"
            :title="item.mallSubName"
          >
            <div
              @click="details(item)"
              class="dataList_"
              v-for="(item, index) in tabNav.dataList"
              :key="index"
            >
              <div class="dataList">
                <img :src="item.image" alt="" />
                <div>
                  <div>{{ item.name }}</div>
                  <div>
                    <br />
                    ￥{{ item.present_price }}<s>￥{{ item.orl_price }}</s>
                  </div>
                </div>
              </div>
            </div>
            <br><br>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "Classification",
  components: {},
  props: {},
  data() {
    return {
      tabNav: {},
      active: 0,
      num1: 0,
      tabId: "",
      category: {
        category: {},
        categoryItem: {},
        index: 0
      }
    };
  },
  methods: {
    details(item) {
      // console.log(item);
      this.$router.push({ name: "DetailsPage", params: { id: item.id } });
    },
    onClick(name) {
      // console.log(name);
      console.log(this.category.categoryItem);
      this.tabId = this.category.categoryItem.bxMallSubDto[name].mallSubId;
      if (this.tabId) {
        this.$axios
          // .req("/api/classification?mallSubId="+this.tabId)
          .req(`/api/classification?mallSubId=${this.tabId}`)
          .then(res => {
            this.tabNav = res.data;
            // console.log(res.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    ClassWrap() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.ClassWrap, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    class_(item, index) {
      // console.log(item);
      this.active = 0;
      this.category.categoryItem = item;
      // console.log(index);
      this.num1 = index;
      this.tabId = item.bxMallSubDto[0].mallSubId;
      // console.log(this.tabId);
      if (this.tabId) {
        this.$axios
          // .req("/api/classification?mallSubId="+this.tabId)
          .req(`/api/classification?mallSubId=${this.tabId}`)
          .then(res => {
            this.tabNav = res.data;
            // console.log(res.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  mounted() {
    this.category = this.$route.params;
    // console.log(this.category);
    if (this.category.category === undefined) {
      this.category.category = this.$store.state.category;
      this.category.categoryItem = this.$store.state.category[0];
      // console.log(this.$store.state.category);
      // console.log(this.category.categoryItem);
    }
    this.num1 = this.category.categoryIndex;
    if (this.category.categoryItem) {
      this.tabId = this.category.categoryItem.bxMallSubDto[0].mallSubId;
    }
    if (this.tabId) {
      this.$axios
        // .req("/api/classification?mallSubId="+this.tabId)
        .req(`/api/classification?mallSubId=${this.tabId}`)
        .then(res => {
          this.tabNav = res.data;
          // console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
    // console.log(this.tabId);
  },
  created() {
    this.$nextTick(() => {
      this.ClassWrap();
    });
  },
  filters: {},
  computed: {
    // category(){
    //   return this.$store.state.category
    // }
  },
  watch: {},
  directives: {}
};
</script>
<style scoped lang="scss">
@import "../../style/common";
.Classification_ {
  display: flex;
}
.Classification {
  height: 100vh;
  overflow: hidden;
}
.Classification_ ul {
  width: 25%;
  text-align: center;
  font-size: 30px;
  background-color: #e4edff;
}
.Classification_ ul li {
  border-bottom: 1px #cacfd0 solid;
  height: 50px;
  padding: 20px 0;
}
.Classification_ ul li:first-child {
  border-top: 1px #cacfd0 solid;
}
.Classification_ .van-tabs {
  display: flex;
  width: 300px;
}
.Classification header {
  text-align: center;
  font-size: 35px;
}
.Classification_ .van-tabs {
  width: 75%;
  font-size: 3.867vw !important;
  color: red;
  margin: 15px 0;
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
}
.white {
  background-color: white;
}
.Classification img {
  width: 30%;
  border: 1px #beb6c0 solid;
}
.dataList {
  display: flex;
  align-items: center;
  padding: 15px;
}
.dataList_ {
  border-bottom: 1px #bebebd solid;
}
</style>
