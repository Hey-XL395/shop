<template>
    <div class="Register">
        <div class="box">
            <header>
                <b><i>登陆 / 注册</i></b>
            </header>
            <br /><br />
            <van-cell-group>
                <van-field v-model="username" placeholder="请输入用户名"></van-field>
                <br /><br />
                <van-field
                        v-model="password"
                        type="password"
                        placeholder="请输入密码"
                ></van-field>
                <van-field
                        v-model="phone"
                        label="手机号码"
                        placeholder="请输入手机号"
                        error-message="手机号格式错误"
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
                            v-model="username"
                            placeholder="请输入验证码"
                            label="请输入验证码"
                            class="password_"
                    ></van-field
                    ><span v-html="svg"></span>
                </div>
            </van-cell-group>
            <br /><br /><br /><br /><br /><br />
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
                svg: ""
            };
        },
        methods: {
            Land() {
                this.$router.push("/Land");
            },
            Register() {
                this.$dialog
                    .alert({
                        title: "标题",
                        message: "弹窗内容"
                    })
                    .then(() => {
                        // on close
                    });
            }
        },
        mounted() {
            this.$axios
                .req("/api/verify")
                .then(res => {
                    console.log(res);
                    this.svg = res.data;
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
    .Register {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url("../../assets/timg.jpg");
    }
    .box {
        font-size: 30px;
        width: 90%;
        margin: 200px auto;
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
