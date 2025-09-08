<script setup>
import useTeacher from '@/services/useTeacher'
import usePayment from '@/services/usePayment'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'

const visible = ref(false)
const open = () => (visible.value = true)
const close = () => (visible.value = false)

const allTeachers = ref([])

// hooks
const { getTeachers } = useTeacher()
const { data: teachers, isLoading: loading } = getTeachers   // ✅ to‘g‘ri destructuring
const { postTeacherSalaryExpenseMutation } = usePayment()

// log qilish
watch(teachers, (val) => {
  allTeachers.value = val || []   
})

// form fields
const teacherId = ref(null)
const amount = ref(null)
const month = ref(null)

const handleTeacherChange = (selectValue) => {
  const list = allTeachers?.value || []
  const selectedTeacher = list.find((t) => t.id === selectValue)
  amount.value = selectedTeacher?.salary ?? null
}

const handleSubmit = () => {
  const payload = {
    teacherId: teacherId.value,
    month: month.value ? dayjs(month.value).format('YYYY-MM') : null,
  }

  postTeacherSalaryExpenseMutation.mutate(payload, {
    onSuccess: () => {
      teacherId.value = null
      amount.value = null
      month.value = null
      close()
    },
  })
}

defineExpose({ open, close })
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-[rgba(0,0,0,.4)] flex items-center justify-center"
  >
    <div class="p-6 rounded w-96 border bg-black">
      <h2 class="text-lg font-bold mb-4">
        + O'qituvchi Maoshini Xarajatga Qo'shish
      </h2>


      <form @submit.prevent="handleSubmit" class="space-y-3">
        <!-- Teachers select -->
        <div>
          <label class="block mb-1">O'qituvchi:</label>
          <a-select
            v-model:value="teacherId"
            class="w-full border border-amber-400! rounded"
            placeholder="O'qituvchi Tanlang"
            @change="handleTeacherChange"
            allowClear
          >
            <a-select-option
              v-for="teacher in allTeachers || []"
              :key="teacher.id"
              :value="teacher.id"
            >
              {{ teacher.name }}
            </a-select-option>
          </a-select>
        </div>

        <!-- Amount -->
        <div>
          <label class="block mb-1">Miqdor:</label>
          <input
            v-model="amount"
            type="number"
            class="w-full border px-2 py-1 rounded "
            readonly
          />
        </div>

        <!-- Month -->
        <div>
          <label class="block mb-1">Maosh Oyi:</label>
          <a-date-picker
            v-model:value="month"
            class="w-full border border-amber-400! dark-datepicker"
            placeholder="Maosh Oyi Tanlang"
            picker="month"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2 mt-4">
          <a-button @click="close">Bekor qilish</a-button>
          <a-button type="primary" htmlType="submit">Saqlash</a-button>
        </div>
      </form>
    </div>
  </div>
</template>
