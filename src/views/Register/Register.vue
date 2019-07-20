<template>
  <div class="Register">
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
        <van-field
          v-model="username"
          placeholder="请输入用户名"
          :error-message="errorUsername"
        ></van-field>
        <br />
        <van-field
          v-model="password"
          type="password"
          placeholder="请输入密码"
          :error-message="errorPassword"
        ></van-field>
        <br />
        <van-field
          v-model="phone"
          label="手机号码"
          placeholder="请输入手机号"
          :error-message="errorPhone"
        ></van-field>
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" type="primary"
            >发送验证码</van-button
          >
        </van-field>
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
  name: "Register",
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: "",
      phone: "",
      sms: "",
      svg: "",
      errorUsername: "",
      errorPassword: "",
      errorPhone: ""
    };
  },
  methods: {
    Land() {
      this.$router.push("/Land");
    },
    backtoClass() {
      this.$router.go(-1);
    },
    Register() {
      if (this.username === "") {
        this.errorUsername = "请输入用户名";
      } else {
        this.errorUsername = "";
      }
      if (this.password === "") {
        this.errorPassword = "请输入密码";
      } else {
        this.errorPassword = "";
      }
      if (this.phone.length !== 11) {
        this.errorPhone = "手机号格式错误";
      } else if (this.phone.length === 11) {
        this.errorPhone = "";
      }
      if (
        this.username !== "" &&
        this.password !== "" &&
        this.phone !== "" &&
        this.sms !== ""
      ) {
        this.$axios
          .req("api/register", {
            nickname: this.username,
            password: this.password,
            verify: this.sms
          })
          .then(res => {
            console.log(res);
            if (res.data.code === 200) {
              this.$notify({ message: res.data.msg, background: "#1989fa" });
              this.$router.push("/Home");
            } else if (res.data.code === -1 || res.data.code === -2) {
              this.$notify(res.data.msg);
              this.getAverify();
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
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
.Register {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../../assets/1.jpg");
}
.Register .backtoClass {
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
  height: 1000px;
  background-color: white;
}
header {
  width: 100%;
  margin: 20px;
  padding-top: 10px;
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
