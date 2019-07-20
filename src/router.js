import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "首页",
        showFooter: true
      }
    },
    {
      path: "/Land",
      name: "Land",
      meta: {
        title: "登陆",
        showFooter: false
      },
      component: () => import("./views/Land/Land.vue")
    },
    {
      path: "/Register",
      name: "Register",
      meta: {
        title: "注册",
        showFooter: false
      },
      component: () => import("./views/Register/Register.vue")
    },
    {
      path: "/Classification",
      name: "Classification",
      meta: {
        title: "分类",
        showFooter: true
      },
      component: () => import("./views/Classification/Classification.vue")
    },
    {
      path: "/DetailsPage",
      name: "DetailsPage",
      meta: {
        title: "详情",
        showFooter: false
      },
      component: () => import("./views/DetailsPage/DetailsPage.vue")
    },
    {
      path: "/ShoppingCart",
      name: "ShoppingCart",
      meta: {
        title: "购物车",
        showFooter: true
      },
      component: () => import("./views/ShoppingCart/ShoppingCart.vue")
    },
    {
      path: "/MyMessage",
      name: "MyMessage",
      meta: {
        title: "我的信息",
        showFooter: true
      },
      component: () => import("./views/MyMessage/MyMessage.vue")
    },
    {
      path: "/MyLike",
      name: "MyLike",
      meta: {
        title: "我的收藏",
        showFooter: false
      },
      component: () => import("./views/MyLike/MyLike.vue")
    }
  ]
});
router.beforeEach((to, from, next)=>{
  if (to.meta.title){
    document.title=to.meta.title
  }
  console.log(to);
  next()
})
export default router;
