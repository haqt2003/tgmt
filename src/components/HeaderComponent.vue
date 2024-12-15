<template>
  <div class="bg-[#f5f5f5cd] px-5 xl:px-10 w-full">
    <div
      class="max-w-[1440px] mx-auto flex justify-between h-[72px] items-center"
    >
      <img src="../assets/logo.svg" alt="" class="w-[56px]" />
      <div class="">
        <span class="font-medium">{{ email }}</span>
        <span
          @click="onSignOut"
          class="text-[14px] font-medium cursor-pointer block text-red-600 text-end"
          >Đăng xuất</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSignOut } from "@/composables/useSignOut";
export default {
  setup() {
    const router = useRouter();
    const { signout } = useSignOut();

    const email = ref(localStorage.getItem("email-kyc"));

    const onSignOut = async () => {
      await signout();
      localStorage.clear();
      router.push({ name: "login", params: {} });
    };
    return { email, onSignOut };
  },
};
</script>
