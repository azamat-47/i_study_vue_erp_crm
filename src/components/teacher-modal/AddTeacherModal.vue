<script setup>
import { ref } from "vue";
import useTeacher from "../../services/useTeacher";
import toast from "vue3-hot-toast";

const { addTeacherMutation } = useTeacher();

const visible = ref(false);

// Form fields
const username = ref("");
const name = ref("");
const password = ref("");
const email = ref("");
const phone = ref("");
const salary = ref("");


const open = () => visible.value = true;
const close = () => visible.value = false;



// Reset form
const resetForm = () => {
  username.value = "";
  name.value = "";
  password.value = "";
  email.value = "";
  phone.value = "";
  salary.value = "";
};

// Handle submit
const handleSubmit = async (e) => {
  e.preventDefault();

  // Simple validation
  if (!username.value || !name.value || !password.value || !email.value || !phone.value || !salary.value) {
    toast.error("Iltimos, barcha maydonlarni to'ldiring!");
    return;
  }

  // Optional: password length check
  if (password.value.length < 6) {
    toast.error("Parol kamida 6 belgidan iborat bo'lishi kerak!");
    return;
  }

  const values = {
    username: username.value,
    name: name.value,
    password: password.value,
    email: email.value,
    phone: phone.value,
    salary: Number(salary.value),
  };

  addTeacherMutation.mutate(values, {
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
  <div v-if="visible" class="fixed inset-0 bg-[rgba(0,0,0,.4)] bg-opacity-50 flex items-center justify-center">
    <div class=" p-6 rounded w-96 border bg-black">
      <h2 class="text-lg font-bold mb-4">Yangi O'qituvchi Qo'shish</h2>

      <form @submit="handleSubmit" class="space-y-3">
        <div>
          <label class="block mb-1">Username</label>
          <input v-model="username" type="text" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Ism Familia</label>
          <input v-model="name" type="text" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Parol</label>
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
          <button type="button" @click="close" class="px-4 py-1 border rounded cursor-pointer ">Bekor qilish</button>
          <button type="submit" class="px-4 py-1 bg-blue-600 text-white rounded cursor-pointer">Qo'shish</button>
        </div>
      </form>
    </div>
  </div>
</template>
