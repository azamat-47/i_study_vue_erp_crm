<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import usePayment from '@/services/usePayment';

const visible = ref(false);

const open = () => (visible.value = true);
const close = () => (visible.value = false);

const { postExpenseMutation } = usePayment();

// Form fields
const name = ref('');
const description = ref('');
const amount = ref();
const expenseDate = ref(null);
const expenseMonth = ref(null);

const handleSubmit = () => {
  const payload = {
    name: name.value,
    description: description.value,
    amount: Number(amount.value),
    expenseDate: expenseDate.value ? dayjs(expenseDate.value).format("YYYY-MM-DD") : null,
    expenseMonth: expenseMonth.value ? dayjs(expenseMonth.value).format("YYYY-MM") : null,
  };
  

    postExpenseMutation.mutate(payload, {
        onSuccess: () => {
            name.value = '';
            description.value = '';
            amount.value = null;
            expenseDate.value = null;
            expenseMonth.value = null;
    
            close();
        },
    });
};

defineExpose({ open, close });
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-[rgba(0,0,0,.4)] flex items-center justify-center">
    <div class="p-6 rounded w-96 border bg-black">
      <h2 class="text-lg font-bold mb-4">+ Yangi Xarajat Qo'shish</h2>

      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <label class="block mb-1">Xarajat Nomi:</label>
          <input v-model="name" type="text" class="w-full border px-2 py-1 rounded" required />
        </div>
        <div>
          <label class="block mb-1">Miqdor:</label>
          <input v-model="amount" type="number" class="w-full border px-2 py-1 rounded" required />
        </div>
        <div>
          <label class="block mb-1">Tavsif:</label>
          <textarea v-model="description" class="w-full border px-2 py-1 rounded" required></textarea>
        </div>
        <div>
          <label class="block mb-1">Xarajat sanasi:</label>
          <a-date-picker v-model:value="expenseDate" class="w-full border border-amber-300! px-2 py-1 rounded" required />
        </div>
        <div>
          <label class="block mb-1">Xarajat oyi:</label>
          <a-date-picker v-model:value="expenseMonth" picker="month" class="w-full border  border-amber-300! px-2 py-1 rounded" required />
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button type="button" @click="close" class="px-4 py-1 border rounded">Bekor qilish</button>
          <button type="submit" class="px-4 py-1 bg-blue-600 text-white rounded">Qo'shish</button>
        </div>
      </form>
    </div>
  </div>
</template>
