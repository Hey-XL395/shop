<template>
  <div class="HomeMiddle" v-if="homeObj.floorName">
    <div class="floor_">
      <span>1F</span>
      <div class="floor">{{ homeObj.floorName.floor1 }}</div>
      <div class="MiddleImg_">
        <div>
          <img
            class="MiddleImg"
            :src="homeObj.floor1[0].image"
            alt=""
            @click="details(homeObj.floor1[0].goodsId)"
          />
        </div>
        <div>
          <div>
            <img
              class="MiddleImg"
              :src="homeObj.floor1[1].image"
              alt=""
              @click="details(homeObj.floor1[1].goodsId)"
            />
          </div>
          <div>
            <img
              class="MiddleImg"
              :src="homeObj.floor1[2].image"
              alt=""
              @click="details(homeObj.floor1[2].goodsId)"
            />
          </div>
        </div>
      </div>
      <img
        class="MiddleImg__"
        :src="homeObj.floor1[3].image"
        alt=""
        @click="details(homeObj.floor1[3].goodsId)"
      />
      <img
        class="MiddleImg__"
        :src="homeObj.floor1[4].image"
        alt=""
        @click="details(homeObj.floor1[4].goodsId)"
      />
    </div>
    <div class="floor_">
      <span>2F</span>
      <div class="floor">{{ homeObj.floorName.floor2 }}</div>
      <div class="MiddleImg_">
        <div>
          <img
            class="MiddleImg"
            :src="homeObj.floor2[0].image"
            alt=""
            @click="details(homeObj.floor2[0].goodsId)"
          />
        </div>
        <div>
          <div>
            <img
              class="MiddleImg"
              :src="homeObj.floor2[1].image"
              alt=""
              @click="details(homeObj.floor2[1].goodsId)"
            />
          </div>
          <div>
            <img
              class="MiddleImg"
              :src="homeObj.floor2[2].image"
              alt=""
              @click="details(homeObj.floor2[2].goodsId)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="floor_">
      <span>3F</span>
      <div class="floor">{{ homeObj.floorName.floor3 }}</div>
      <div class="MiddleImg_">
        <div>
          <img
            class="MiddleImg"
            :src="homeObj.floor3[0].image"
            alt=""
            @click="details(homeObj.floor3[0].goodsId)"
          />
        </div>
        <div>
          <div>
            <img
              class="MiddleImg"
              :src="homeObj.floor3[1].image"
              alt=""
              @click="details(homeObj.floor3[1].goodsId)"
            />
          </div>
          <div>
            <img
              class="MiddleImg"
              :src="homeObj.floor3[2].image"
              alt=""
              @click="details(homeObj.floor3[2].goodsId)"
            />
          </div>
        </div>
      </div>
      <img
        class="MiddleImg__"
        :src="homeObj.floor3[3].image"
        alt=""
        @click="details(homeObj.floor3[3].goodsId)"
      />
      <img
        class="MiddleImg__"
        :src="homeObj.floor3[4].image"
        alt=""
        @click="details(homeObj.floor3[4].goodsId)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeMiddle",
  props: {
    homeObj: Object
  },
  methods: {
    details(id) {
      this.$router.push({ name: "DetailsPage", params: { id: id } });
    }
  }
};
</script>

<style scoped>
.HomeMiddle .floor {
  display: inline-block;
}
.HomeMiddle span {
  color: white;
  background-color: red;
  border-radius: 50%;
}
.floor {
  color: red;
  font-size: 30px;
  margin: 10px 0;
}
.floor_ {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.MiddleImg {
  width: 100%;
}
.MiddleImg_ {
  display: flex;
}
.MiddleImg__ {
  width: 50%;
}
</style>
