<template>
  <div class="h-[100vh] bg-[#E9E9E9] w-full flex text-[#202224]">
    <div class="w-[0%] lg:w-[60%] h-full relative">
      <img
        src="../assets/banner.svg"
        alt=""
        class="w-[600px] absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
      />
    </div>
    <div class="w-[100%] lg:w-[40%] bg-white h-full text-center">
      <img src="../assets/logo.svg" alt="" class="w-[80px] mx-auto mt-16" />
      <span class="font-bold text-[26px] mt-10 block">Welcome back!</span>
      <span class="text-[14px] block mt-3">Please enter your details</span>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="mt-14 outline-none w-[80%] sm:w-[60%] xl:w-[50%] py-3 mx-auto"
      />
      <div
        class="bg-[#202224] h-[0.5px] w-[80%] sm:w-[60%] xl:w-[50%] mx-auto mt-1"
      ></div>
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="mt-10 outline-none w-[80%] sm:w-[60%] xl:w-[50%] py-3 mx-auto"
      />
      <div
        class="bg-[#202224] h-[0.5px] w-[80%] sm:w-[60%] xl:w-[50%] mx-auto mt-1"
      ></div>
      <button
        @click="onSignIn"
        class="bg-[#202224] text-white mt-10 rounded-full w-[80%] sm:w-[60%] xl:w-[50%] py-3 flex justify-center mx-auto items-center gap-4"
      >
        <img
          v-if="isPending"
          src="../assets/spin.svg"
          alt=""
          class="animate-spin"
        />
        Log In
      </button>
      <span class="block mt-8 text-[14px]"
        >Don't have account?
        <router-link to="/signup" class="font-semibold"
          >Sign up</router-link
        ></span
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSignIn } from "@/composables/useSignIn";
export default {
  setup() {
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const { error, isPending, signin } = useSignIn();

    const onSignIn = async () => {
      await signin(email.value, password.value);
      if (!error.value) {
        localStorage.clear();
        localStorage.setItem("email-kyc", email.value);
        router.push({ name: "HomeView", params: {} });
      } else alert(error.value);
    };

    return { email, password, onSignIn, isPending };
  },
};
</script>
