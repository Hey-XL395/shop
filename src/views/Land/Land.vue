<template>
  <div class="Land">
    <van-icon
      class="backtoClass"
      name="arrow-left"
      @click="backtoClass"
    ></van-icon>
    <div class="box">
      <header>
        <b><i>登陆 / 注册</i></b>
      </header>
      <br /><br />
      <van-cell-group>
        <van-field v-model="username" placeholder="请输入用户名"></van-field>
        <br />
        <van-field
          v-model="password"
          type="password"
          placeholder="请输入密码"
        ></van-field>
        <div class="password__">
          <van-field
            v-model="sms"
            placeholder="请输入验证码"
            label="请输入验证码"
            class="password_"
          ></van-field
          ><span v-html="svg" @click="replaceVerify"></span>
        </div>
      </van-cell-group>
      <br /><br /><br />
      <footer>
        <van-button type="primary" @click="Land"> 登陆 </van-button>
        <van-button type="danger" @click="Register"> 注册 </van-button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Land",
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: "",
      sms: "",
      svg: ""
    };
  },
  methods: {
    backtoClass() {
      this.$router.go(-1);
    },
    Land() {
      this.$axios
        .req("api/login", {
          nickname: this.username,
          password: this.password,
          verify: this.sms
        })
        .then(res => {
          if (res.data.code === -1 || res.data.code === -2) {
            this.$notify(res.data.msg);
            this.getAverify();
            this.username = "";
            this.password = "";
            this.sms = "";
            // 登陆成功
          } else if (res.data.code === 200) {
            this.$router.push("/");
            this.$notify({ message: res.data.msg, background: "#1989fa" });
            localStorage.setItem("user", this.username);
          }
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    Register() {
      this.$router.push("/Register");
    },
    getAverify() {
      this.$axios
        .req("api/verify")
        .then(res => {
          this.svg = res.data;
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    replaceVerify() {
      this.getAverify();
    }
  },
  mounted() {
    this.getAverify();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Land {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../../assets/1.jpg");
}
.Land .backtoClass {
  margin: 20px;
  border: 1px saddlebrown solid;
  padding: 10px;
  background-color: skyblue;
  border-radius: 50%;
}
.box {
  font-size: 30px;
  width: 90%;
  margin: 100px auto;
  height: 800px;
  background-color: white;
}
header {
  width: 100%;
  margin: 20px;
  padding-top: 15px;
  font-size: 35px;
}
footer {
  display: flex;
  justify-content: space-around;
}
.password_ {
  width: 450px;
}
.password__ {
  display: flex;
}
</style>
