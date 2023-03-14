<template>
  <div class="min-h-[300px]">
    <el-form :model="form" :disabled="form.loading" label-width="0" class="login-container">
      <el-form-item>
        <el-input v-model="form.user_name" :prefix-icon="User" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form._password" :prefix-icon="Unlock" placeholder="请输入密码" @keyup.enter.native="onSubmit" />
      </el-form-item>
      <el-button :loading="form.loading" type="primary" style="width: 100%" @click="onSubmit">登 录</el-button>
    </el-form>
  </div>
</template>
  
<script lang="ts" setup>
import useRequest from "@/utils/request";
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import { User, Unlock } from "@element-plus/icons-vue";

const router = useRouter();

const form = reactive({
  user_name: "admin",
  _password: "123456",
  loading: false,
});

const onSubmit = async () => {
  if (form.user_name && form._password) {
    form.loading = true;
    const { data } = await useRequest("user/login", {
      body: JSON.stringify({
        User: {
          user_name: form.user_name,
          _password: form._password,
        },
      }),
    })
      .post()
      .json();

    if (data.value.code === 200) {
      window.localStorage.setItem("Authorization", data.value["X-Token"]);
      window.location.href = "/";
    }
    form.loading = false;
  } else {
    ElMessage({
      type: "warning",
      message: "请填写用户名和密码",
      grouping: true,
    });
  }
};
</script>
  
<style lang="scss" scoped>
.login-container {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 400px;
  flex-direction: column;
  justify-content: space-around;
  transform: translate(-50%, -50%);
}
</style>
  