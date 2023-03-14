import { reactive } from "vue";
import { defineStore } from "pinia";
const params = [
  "email",
  "header_url",
  "id",
  "job",
  "org_id",
  "org_name",
  "phone",
  "position",
  "real_name",
  "status",
  "user_name",
  "user_role",
];

export const useUserStore = defineStore("user", () => {
  const userInfo = reactive<{
    email: string;
    header_url: string;
    id: string;
    job: string;
    org_id: string;
    org_name: string;
    phone: string;
    position: string;
    real_name: string;
    status: string;
    user_name: string;
    user_role: any;
  }>({
    email: "",
    header_url: "",
    id: "",
    job: "",
    org_id: "",
    org_name: "",
    phone: "",
    position: "",
    real_name: "",
    status: "",
    user_name: "",
    user_role: [],
  });

  function update(payload: any) {
    params.forEach((param) => {
      (userInfo as any)[param] = payload[param];
    });
  }

  function clear() {
    params.forEach((param) => {
      (userInfo as any)[param] = "";
    });
  }

  return { userInfo, update, clear };
});
