<script setup>
import { ref } from "vue";
import useCourse from "@/services/useCourse";
import toast from "vue3-hot-toast";
import useTeacher from "@/services/useTeacher";

const { addCourseMutation } = useCourse();
const { getTeachers } = useTeacher()



const visible = ref(false);

// Form fields
const name = ref("");
const description = ref("");
const fee = ref("");
const teachers = ref([]); // ko‘p tanlanadigan list

const open = () => (visible.value = true);
const close = () => (visible.value = false);



const resetForm = () => {
  name.value = "";
  description.value = "";
  fee.value = "";
  teachers.value = [];
};

const handleSubmit = () => {

  // if (!name.value || !description.value || !fee.value || teachers.value.length === 0) {
  //   toast.error("Iltimos, barcha maydonlarni to'ldiring!");
  //   return;
  // }

  
  const selectedTeacher = getTeachers.data?.value.find(
      (t) => t.id === teachers.value
  );
    



  const payload = {
    name: name.value,
    description: description.value,
    fee: Number(fee.value),
    teachers: [selectedTeacher], // bu teacher ID lar bo‘lishi kerak
  };

  

  addCourseMutation.mutate(payload, {
    onSuccess: () => {
      resetForm();
      close();
    },
    onError: (err) => {
      toast.error(err.message || "Xatolik yuz berdi!");
    },
  });
};

defineExpose({ open, close });
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-[rgba(0,0,0,.4)] flex items-center justify-center">
    <div class="p-6 rounded w-96 border bg-black">
      <h2 class="text-lg font-bold mb-4">+Yangi Kurs Qo'shish</h2>

      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <label class="block mb-1">Kurs nomi</label>
          <input v-model="name" type="text" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Tavsif</label>
          <textarea v-model="description" class="w-full border px-2 py-1 rounded"></textarea>
        </div>

        <div>
          <label class="block mb-1">Narx</label>
          <input v-model="fee" type="number" min="0" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Ustoz</label>
          <a-select
            v-model:value="teachers"
            placeholder="Ustoz tanlang"
            :loading="getTeachers.isLoading" 
            class="w-full border rounded"
            
          >
            <a-select-option v-for="teacher in getTeachers.data?.value || []" :key="teacher.id" :value="teacher.value" >
              {{ teacher.name }}
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
