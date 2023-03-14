import { createFetch } from "@vueuse/core";
import { ElMessage } from "element-plus";

const useMyFetch = createFetch({
  baseUrl: "/api/",
  options: {
    async beforeFetch(ctx) {
      const { options } = ctx;

      const token = localStorage.getItem("Authorization");
      options.headers = {
        ...options.headers,
        "X-Token": token || "",
      };
      return { options };
    },
    afterFetch(ctx: any) {
      try {
        if (ctx.response.headers.get("x-token")) {
          localStorage.setItem(
            "Authorization",
            ctx.response.headers.get("x-token")
          );
        }
      } catch (error) {}
      if (ctx.data.code !== 200) {
        if (ctx.data.code === 407) {
          localStorage.removeItem("Authorization");
          ElMessage({
            type: "error",
            message: "用户登录信息失效",
            grouping: true,
            onClose() {
              window.location.reload();
            },
          });
          ctx.data.msg = "用户登录信息失效";
        } else {
          ctx.data.msg = ctx.data.msg || "未知错误";
          ElMessage({
            message: ctx.data.msg,
            type: "error",
            grouping: true,
          });
        }
      }
      return ctx;
    },
    onFetchError(ctx) {
      if (ctx.data === null) {
        ctx.data.code = 500;
        ctx.data.msg = ctx.error.message;
      }
      ElMessage({
        message: ctx.error.message || "服务器错误",
        type: "error",
        grouping: true,
      });

      return ctx;
    },
  },
  fetchOptions: {
    mode: "cors",
  },
});

export default useMyFetch;
