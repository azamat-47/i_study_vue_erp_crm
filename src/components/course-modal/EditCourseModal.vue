<script setup>
import { ref, watch } from "vue";
import useCourse from "@/services/useCourse";
import useTeacher from "@/services/useTeacher";
import toast from "vue3-hot-toast";

const props = defineProps({
  course: Object,
});

const { putCourseMutation } = useCourse();
const { getTeachers } = useTeacher();

const visible = ref(false);

// Form fields
const name = ref("");
const description = ref("");
const fee = ref("");
const teachers = ref([]);

watch(
  () => props.course,
  (newCourse) => {
    if (newCourse) {
      name.value = newCourse.name || "";
      description.value = newCourse.description || "";
      fee.value = newCourse.fee || "";
      teachers.value = newCourse.teachers?.[0].id || [];
    }
  },
  { immediate: true }
);

const open = () => (visible.value = true);
const close = () => (visible.value = false);

const handleSubmit = () => {
  const selectedTeacher = getTeachers.data?.value.find(
      (t) => t.id === teachers.value
    );
    



  const payload = {
    id: props.course.id,
    name: name.value,
    description: description.value,
    fee: Number(fee.value),
    teachers: [selectedTeacher], // bu teacher ID lar bo‘lishi kerak
  };

  console.log(payload);
  
  putCourseMutation.mutate(payload, {
    onSuccess: () => {
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
      <h2 class="text-lg font-bold mb-4">Kursni Tahrirlash</h2>

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
          <label class="block mb-1">O'qituvchilar</label>
          <a-select
            v-model:value="teachers"
            class="w-full"
            placeholder="O'qituvchilarni tanlang"
          >
            <a-select-option v-for="teacher in getTeachers.data?.value" :key="teacher.id" :value="teacher.value">
              {{ teacher.name }}
            </a-select-option>
        </a-select>

        </div>

        

        <div class="flex justify-end gap-2 mt-4">
          <button type="button" @click="close" class="px-4 py-1 border rounded">Bekor qilish</button>
          <button type="submit" class="px-4 py-1 bg-blue-600 text-white rounded">Yangilash</button>
        </div>
      </form>
    </div>
  </div>
</template>
