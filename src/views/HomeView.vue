<template>
  <header-component />
  <div class="home">
    <div class="max-w-[1280px] px-5 xl:px-10 mx-auto py-10">
      <img
        v-if="!hasFile"
        src="../assets/ims.png"
        alt=""
        class="absolute top-[350px] xl:top-auto xl:bottom-0 right-1/2 - translate-x-1/2 w-[650px]"
      />
      <div
        v-if="hasFile"
        class="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24"
      >
        <div class="text-center">
          <div class="">
            <div class="font-bold text-[18px]">Video</div>
            <div class="mt-5">
              <img
                :src="path1"
                alt=""
                class="mx-auto w-[500px] h-[320px] rounded-xl"
              />
            </div>
            <input
              type="file"
              @change="handleFileChange"
              class="hidden"
              ref="fileInput"
            />
            <button
              @click="triggerFileInput"
              class="mt-5 bg-[#7F56D9] text-white px-7 py-3 rounded-lg flex items-center gap-3 mx-auto"
            >
              <img
                v-if="isSuccess === false"
                src="../assets/spin.svg"
                alt=""
                class="animate-spin"
              />
              <span v-if="isSuccess === false">Đang tải</span>
              <span v-if="isSuccess === null">Tải file</span>
            </button>
          </div>
        </div>
        <div class="">
          <div class="">
            <span class="font-bold">1.Preprocess</span>
            <span class="mt-2 flex gap-2 items-center"
              >Đạt <img src="../assets/tick.svg" alt="" class="w-6"
            /></span>
          </div>
          <div class="mt-10">
            <span class="font-bold">2. Detect text</span>
            <span class="mt-2 flex gap-2 items-center"
              >Đã detect <img src="../assets/tick.svg" alt="" class="w-6"
            /></span>
          </div>
          <div class="mt-10">
            <span class="font-bold">3. Recognize character</span>
            <img
              v-if="isSuccess1 === false"
              src="../assets/spin-black.svg"
              alt=""
              class="animate-spin mt-2"
            />
            <span class="block mt-2" v-html="ocrText2"></span>
          </div>
          <div class="mt-10">
            <span class="font-bold">4. Classify document</span>
            <span class="block mt-2">{{ ocrText4 }}</span>
          </div>
          <div class="mt-10">
            <span class="font-bold">5. JSON Output </span>
            <img
              v-if="isSuccess2 === false"
              src="../assets/spin-black.svg"
              alt=""
              class="animate-spin mt-2"
            />
            <span class="block mt-2 text-wrap" v-html="ocrText"></span>
          </div>
          <div class="mt-10">
            <span class="font-bold">6. Correct character & Check Logic</span>
            <img
              v-if="isSuccess2 === false"
              src="../assets/spin-black.svg"
              alt=""
              class="animate-spin mt-2"
            />
            <span class="block mt-2 text-wrap" v-html="ocrText"></span>
          </div>
        </div>
      </div>
      <div v-if="!hasFile" class="mx-auto mt-12 text-center">
        <div class="font-bold text-[20px]">Hệ thống trích xuất dữ liệu OCR</div>
        <span class="block mt-6">Bạn chưa có file nào</span>
        <input
          type="file"
          @change="handleFileChange"
          class="hidden"
          ref="fileInput"
        />
        <button
          @click="triggerFileInput"
          class="mt-5 bg-[#7F56D9] text-white px-7 py-3 rounded-lg flex items-center gap-3 mx-auto"
        >
          <img
            v-if="isSuccess === false"
            src="../assets/spin.svg"
            alt=""
            class="animate-spin"
          />
          <span v-if="isSuccess === false">Đang tải</span>
          <span v-if="isSuccess === null">Tải file</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  name: "HomeView",
  components: {
    HeaderComponent,
  },
  setup() {
    const hasFile = ref(true);
    const file = ref(null);
    const path1 = ref("");
    const path2 = ref("");
    const path3 = ref("");
    const ocrText = ref("");
    const ocrText2 = ref("");
    const ocrText4 = ref("");
    const isSuccess = ref(null);
    const isSuccess1 = ref(null);
    const isSuccess2 = ref(null);
    const isSuccess3 = ref(null);

    const triggerFileInput = () => {
      const fileInput = document.querySelector("input[type='file']");
      fileInput.click();
    };

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0]; // Lấy file đầu tiên
      if (selectedFile) {
        file.value = selectedFile;
        console.log(path1.value);
        uploadFile(selectedFile); // Gửi file lên server
      }
    };
    const uploadFile = async (file) => {
      ocrText.value = null;
      ocrText2.value = null;
      isSuccess.value = null;
      try {
        // Tạo FormData và thêm file
        isSuccess.value = false;
        const formData = new FormData();
        formData.append("file", file);

        // Gửi yêu cầu POST để upload file
        const response = await axios.post(
          "http://127.0.0.1:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          isSuccess.value = null;
        }

        console.log("File đã được gửi thành công:", response);

        // Gắn giá trị path từ response
        path1.value = response.data.path1;
        path2.value = response.data.path2;
        path3.value = response.data.path3;
        hasFile.value = true; // Đã có file

        // Gửi yêu cầu POST với path1
        const imageUrl = path1.value;
        try {
          isSuccess1.value = false;
          const postResponse2 = await axios.post(
            "http://127.0.0.1:3000/recognizition",
            {
              imageUrl: imageUrl,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (postResponse2) {
            ocrText2.value = postResponse2.data.ocrText;
            isSuccess1.value = null;
          }
        } catch (error) {
          console.log(error);
        }
        try {
          isSuccess3.value = false;
          const classificationResponse = await axios.post(
            "http://127.0.0.1:3000/classify-document",
            {
              documentText: ocrText2.value, // Truyền kết quả OCR làm đầu vào
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (classificationResponse) {
            ocrText4.value = classificationResponse.data.classificationResult;
            isSuccess3.value = null;
          }
        } catch (error) {
          console.log(error);
        }
        try {
          isSuccess2.value = false;
          const postResponse = await axios.post(
            "http://127.0.0.1:3000/json-output",
            {
              documentText: ocrText2.value, // Truyền kết quả OCR làm đầu vào
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (postResponse) {
            ocrText.value = postResponse.data.formattedOcrText;
            isSuccess2.value = null;
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
      }
    };

    const swapPath = (tmp) => {
      if (tmp === 2) {
        const pathTmp = path1.value;
        path1.value = path2.value;
        path2.value = pathTmp;
      } else if (tmp === 3) {
        const pathTmp = path1.value;
        path1.value = path3.value;
        path3.value = pathTmp;
      }
    };

    return {
      hasFile,
      path1,
      path2,
      path3,
      ocrText,
      ocrText2,
      ocrText4,
      isSuccess,
      isSuccess1,
      isSuccess2,
      isSuccess3,
      swapPath,
      triggerFileInput,
      handleFileChange,
    };
  },
};
</script>
