<script setup>
import { ref, watch } from "vue";
import useTeacher from "@/services/useTeacher";
import toast from "vue3-hot-toast";

const props = defineProps({
  teacher: Object
});

const { updateTeacherMutation } = useTeacher();

const visible = ref(false);

// Form fields
const username = ref("");
const name = ref("");
const password = ref(""); // optional: parolni yangilash
const email = ref("");
const phone = ref("");
const salary = ref("");

// Watch props.teacher va formni update qilamiz
watch(
  () => props.teacher,
  (newTeacher) => {
    if (newTeacher) {
      username.value = newTeacher.username || "";
      name.value = newTeacher.name || "";
      password.value = ""; // bo‘sh qoldiramiz, agar yangilamoqchi bo‘lsa
      email.value = newTeacher.email || "";
      phone.value = newTeacher.phone || "";
      salary.value = newTeacher.salary || "";
    }
  },
  { immediate: true }
);

const open = () => (visible.value = true);
const close = () => (visible.value = false);

// Submit
const handleSubmit = () => {
  if (!name.value || !email.value || !phone.value || !salary.value) {
    toast.error("Iltimos, barcha maydonlarni to'ldiring!");
    return;
  }

  const payload = {
    id: props.teacher.id, // yoki sizning ID maydoningiz
    name: name.value,
    password: password.value || undefined, // bo‘sh bo‘lsa o‘zgarmaydi
    email: email.value,
    username: props.teacher.user?.username, // username o'zgarmaydi, lekin jo'natamiz
    phone: phone.value,
    salary: Number(salary.value),
    userId: props.teacher.user?.id
  };

  updateTeacherMutation.mutate(payload, {
    onSuccess: () => {
      
      close();
    },
    onError: (err) => {
      console.log(payload, props.teacher);
      
      console.log(err.message || "Xatolik yuz berdi!");
    }
  });
};

defineExpose({ open, close });
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-[rgba(0,0,0,.4)] bg-opacity-50 flex items-center justify-center">
    <div class=" p-6 rounded w-96 border bg-black">
      <h2 class="text-lg font-bold mb-4">O'qituvchini Tahrirlash</h2>

      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <label class="block mb-1">Username</label>
          <input v-model="username" disabled placeholder="Username uzgartirish ilojsiz" type="text" class="w-full border px-2 py-1 rounded " />
        </div>

        <div>
          <label class="block mb-1">Ism Familia</label>
          <input v-model="name" type="text" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Parol (yangilash uchun)</label>
          <input v-model="password" type="password" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Email</label>
          <input v-model="email" type="email" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Telefon Raqam</label>
          <input v-model="phone" type="text" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Maosh</label>
          <input v-model="salary" type="number" min="0" class="w-full border px-2 py-1 rounded" />
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button type="button" @click="close" class="px-4 py-1 border rounded">Bekor qilish</button>
          <button type="submit" class="px-4 py-1 bg-blue-600 text-white rounded">Yangilash</button>
        </div>
      </form>
    </div>
  </div>
</template>
