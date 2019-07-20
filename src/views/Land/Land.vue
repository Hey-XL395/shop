<template>
    <div class="Land">
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
        name: "Land",
        components: {},
        props: {},
        data() {
            return {
                username: "",
                password: ""
            };
        },
        methods: {
            Land() {
                this.$dialog
                    .alert({
                        title: "标题",
                        message: "弹窗内容"
                    })
                    .then(() => {
                        // on close
                    });
            },
            Register() {
                this.$router.push("/Register");
            }
        },
        mounted() {
            this.username = "";
            this.password = "";
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
        background-image: url("../../assets/timg.jpg");
    }
    .box {
        font-size: 30px;
        width: 90%;
        margin: 200px auto;
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
</style>
