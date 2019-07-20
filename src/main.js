import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "dayjs";
import http from "./http";
import lodash from "lodash";
import FastClick from "fastclick";
import "lib-flexible";
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$axios = http;
Vue.prototype.$lodash = lodash;
FastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

