<script setup>
import useCourse from "@/services/useCourse";
import useStudents from "@/services/useStudents";
import { ref } from "vue";
import toast from "vue3-hot-toast";


const { getCourses } = useCourse();
const { PostStudent } = useStudents();


const visible = ref(false);

// Form fields
const name = ref("");
const phone = ref("");
const email = ref("");
const enrollmentDate = ref()
const courses = ref([]); // ko‘p tanlanadigan list

const open = () => (visible.value = true);
const close = () => (visible.value = false);



const resetForm = () => {
  name.value = "";
  phone.value = "";
  email.value = "";
  enrollmentDate.value = "";
  courses.value = [];
};

const handleSubmit = () => {

  const paylaod = {
    name: name.value,
    phone: phone.value,
    email: email.value,
    enrollmentDate: enrollmentDate.value.format("YYYY-MM-DD"),
    courseIds: courses.value,
  };

  
  PostStudent.mutate(paylaod , {
    onSuccess: () => {
      resetForm();
      close()
    }
  })
  
  

};

defineExpose({ open, close });
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-[rgba(0,0,0,.4)] flex items-center justify-center">
    <div class="p-6 rounded w-96 border bg-black">
      <h2 class="text-lg font-bold mb-4">+Yangi student Qo'shish</h2>

      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <label class="block mb-1">Student nomi</label>
          <input v-model="name" type="text" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Phone</label>
          <input v-model="phone" class="w-full border px-2 py-1 rounded"></input>
        </div>

        <div>
          <label class="block mb-1">Email</label>
          <input v-model="email" type="email" min="0" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Qachon qushilgan</label>
          <a-date-picker v-model:value="enrollmentDate" class="w-full border rounded border-amber-50!" />
        </div>

        <div>
          <label class="block mb-1">Curslar</label>
          <a-select
            v-model:value="courses"
            placeholder="Ustoz tanlang"
            class="w-full border rounded"
            show-search
            mode="multiple"
            
          >
            <a-select-option v-for="course in getCourses.data?.value || []" :key="course.id" :value="course.value" >
              {{ course.name }}
            </a-select-option>
          </a-select>
        </div>

        

        <div class="flex justify-end gap-2 mt-4">
          <button type="button" @click="close" class="px-4 py-1 border rounded">Bekor qilish</button>
          <button type="submit" class="px-4 py-1 bg-blue-600 text-white rounded">Qoshish</button>
        </div>
      </form>
    </div>
  </div>
</template>
