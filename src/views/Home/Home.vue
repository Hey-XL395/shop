<template>
  <div class="home" ref="HomeWrap">
    <div class="HomeWrap">
      <header>
        <van-cell-group>
          <van-button type="primary" @click="showPopup">
            {{ msg }} <van-icon name="diamond" />
          </van-button>
          <van-popup v-model="show" position="bottom" :style="{ height: '40%' }"
            ><van-area
              :area-list="areaList"
              :columns-num="2"
              value="110000"
              title="定位"
              @confirm="onConfirm"
              @cancel="onCancel"
            ></van-area
          ></van-popup>
        </van-cell-group>
        <form class="search" action="/">
          <!--          首页搜索-->
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
            @focus="showPopup1"
          >
            <div slot="action" @click="onSearch1">搜索</div>
          </van-search>
        </form>
        <!--        首页跳转后的搜索-->
        <van-cell-group>
          <van-popup
            v-model="show1"
            position="right"
            :style="{ width: '100%', height: '100%' }"
          >
            <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              show-action
              shape="round"
              @search="onSearch"
              @input="homeSearch"
            >
              <div slot="action" @click="onSearch">取消</div>
            </van-search>
            <h3 v-if="flag === false" class="h33">暂无商品</h3>
            <ul class="HomeSearch" v-else>
              <li
                v-for="(item, index) in searchObj.list"
                :key="index"
                @click="toDetails(item, index)"
              >
                <!--                关键字高亮-->
                <a class="text">
                  <span>{{
                    item.name.slice(
                      0,
                      item.name.toLowerCase().indexOf(value.toLowerCase())
                    )
                  }}</span
                  ><span style="color:#fe1706">{{
                    item.name.slice(
                      item.name.toLowerCase().indexOf(value.toLowerCase()),
                      item.name.toLowerCase().indexOf(value.toLowerCase()) +
                        value.length
                    )
                  }}</span
                  ><span>{{
                    item.name.substr(
                      item.name.toLowerCase().indexOf(value.toLowerCase()) +
                        value.length
                    )
                  }}</span>
                </a>
              </li>
            </ul>
            <br />
            <div v-if="searchObj.count === 0 || searchObj.count === undefined">
              <div>搜索历史：<van-icon name="delete" @click="delsearch" /></div>
              <span v-for="(item, index) in arr" :key="index" @click="searchin">
                {{ item }}
              </span>
            </div>
          </van-popup>
        </van-cell-group>
      </header>
      <!--      轮播图-->
      <van-swipe @change="onChange" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in homeObj.slides" :key="index">
          <img class="imgtop" :src="item.image" alt=""
        /></van-swipe-item>
      </van-swipe>
      <div class="top__">
        <div
          v-for="(item, index) in homeObj.category"
          :key="index"
          class="top_"
        >
          <div @click="tocategory(item, index)">
            <div><img :src="item.image" alt="" /></div>
            <div>{{ item.mallCategoryName }}</div>
          </div>
        </div>
      </div>
      <img
        class="banner"
        :src="homeObj.advertesPicture.PICTURE_ADDRESS"
        alt=""
        v-if="homeObj.advertesPicture"
      />
      <br />
      <HomeTop :homeObj="homeObj"></HomeTop>
      <HomeMiddle :homeObj="homeObj"></HomeMiddle>
      <HomeBottom :homeObj="homeObj"></HomeBottom>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMiddle from "../../components/Home-nav/HomeMiddle";
import HomeBottom from "../../components/Home-nav/HomeBottom";
import HomeTop from "../../components/Home-nav/HomeTop";
import AreaList from "./area.js";
import Bscroll from "better-scroll";
export default {
  name: "Home",
  components: {
    HomeTop,
    HomeMiddle,
    HomeBottom
  },
  props: {},
  data() {
    return {
      show1: false,
      value: "",
      show: false,
      flag: true,
      msg: "地址",
      areaList: AreaList,
      homeObj: {},
      searchObj: {},
      arr: []
    };
  },
  methods: {
    delsearch() {
      this.$dialog
        .confirm({
          title: "删除",
          message: "删除历史纪录"
        })
        .then(() => {
          this.$store.state.arr = [];
          localStorage.clear("search");
          this.$toast("删除成功");
        })
        .catch(() => {
          this.$toast("取消删除");
        });
    },
    searchin(item) {
      console.log(item);
    },
    showPopup1() {
      this.show1 = true;
    },
    homeSearch(val) {
      if (this.$store.state.arr === undefined) {
        this.$store.state.arr = [];
      }
      // console.log(this.$store.state.arr);
      this.$store.state.arr.push(val);
      // this.arr = this.$store.state.arr;
      this.arr = this.$store.state.arr.filter((item, index) => {
        return this.$store.state.arr.indexOf(item) === index;
      });
      // console.log(this.arr);
      localStorage.setItem("search", this.arr);
      if (val) {
        this.$axios
          .req("api/search", {
            value: val,
            page: 1
          })
          .then(res => {
            this.searchObj = res.data.data;
            console.log(this.searchObj);
            console.log(this.searchObj.list[0].name);
            // this.searchObj.list.forEach(item => {
            //   console.log(item.name);
            //   console.log(item.name.indexOf(val));
            // });
            if (this.searchObj.count === 0) {
              this.flag = false;
            } else {
              this.flag = true;
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.searchObj = {};
      }
    },
    tocategory(item, index) {
      this.$router.push({
        name: "Classification",
        params: {
          category: this.homeObj.category,
          categoryItem: item,
          categoryIndex: index
        }
      });
    },
    HomeScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.HomeWrap, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    tosearch() {
      this.show1 = true;
    },
    toDetails(item, index) {
      // console.log(item);
      this.$router.push({ name: "DetailsPage", params: { id: item.id } });
    },
    onSearch1() {
      this.show1 = true;
    },
    onChange(index) {
      // this.$toast("当前 Swipe 索引：" + index);
      // console.log("当前 Swipe 索引：" + index);
    },
    onSearch() {
      this.show1 = false;
      this.value = "";
      this.searchObj = {};
      this.flag = true;
    },
    onConfirm(e) {
      this.show = false;
      console.log(e);
      this.msg = e[1].name;
    },
    onCancel() {
      this.show = false;
    },
    getRecommend() {
      this.$axios
        // 数据未导入所以是-1
        .req("api/recommend")
        .then(res => {
          this.homeObj = res.data.data;
          // console.log(res.data.data);
          this.$store.state.category = res.data.data.category;
          // console.log(res.data.data.category);
        })
        .catch(e => {
          console.log(e);
        });
    },
    showPopup() {
      this.show = true;
    }
  },
  mounted() {
    if (localStorage.getItem("search") !== "") {
      this.$store.state.arr = localStorage.getItem("search").split(",");
      this.arr = localStorage.getItem("search").split(",");
    }
    this.getRecommend();
  },
  created() {
    this.$nextTick(() => {
      this.HomeScroll();
    });
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>
<style scoped lang="scss">
.home header {
  display: flex;
  align-items: center;
}
.search {
  width: 100%;
}
.home {
  background-color: #eeeeee;
  height: 100vh;
  overflow: hidden;
}
.h33 {
  width: 150px;
  color: red;
  text-align: center;
  margin: 20px auto;
}
.van-field {
  width: 50%;
}
.search {
  text-align: center;
  font-size: 30px;
  color: #767676;
}
.home .van-button {
  width: 200px;
}
.top__ {
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: 3px 3px 3px;
  border: 2px seagreen solid;
  margin: 10px;
  padding: 10px;
}
.top_ img {
  width: 100px;
  height: 100px;
}
.top_ {
  width: 100px;
}
.top_ span div {
  width: 100px;
}
.banner {
  width: 100%;
}
.imgtop {
  width: 100%;
}
.home .HomeSearch li {
  padding: 30px;
  border-bottom: 1px silver solid;
  font-size: 30px;
}
</style>
