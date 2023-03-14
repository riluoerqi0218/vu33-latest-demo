import router from "./router";
import NProgress from "nprogress"; // progress bar
import "@/styles/nprogress.scss";
// import { useUserStore } from "@/stores/user";
// import useRequest from "@/utils/request";

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  // const { userInfo, update } = useUserStore();
  // const author = window.localStorage.getItem("Authorization");
  // if (!author && to.path !== "/login") {
  //   next("/login");
  //   return;
  // }
  // if (author) {
  //   if (userInfo.id) {
  //     next();
  //     return;
  //   } else {
  //     const { data, statusCode } = await useRequest("user/info").get().json();
  //     if (data.value.code === 200) {
  //       update(data.value.user);
  //       next({ ...to, replace: true });
  //       return;
  //     } else {
  //       if (statusCode.value === null) {
  //         window.location.href = "/";
  //         return;
  //       }
  //       localStorage.removeItem("Authorization");
  //     }
  //   }
  // }
  next();
});

router.afterEach((to) => {
  // finish progress bar
  NProgress.done();
});
