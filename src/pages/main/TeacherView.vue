<script setup>
import { ref, nextTick } from "vue";
import { Button, Popconfirm } from "ant-design-vue";
import toast from "vue3-hot-toast";

import useTeacher from "@/services/useTeacher";
import AddTeacherModal from "@/components/teacher-modal/AddTeacherModal.vue";
import EditTeacherModal from "@/components/teacher-modal/EditTeacherModal.vue";

// Modal refs
const addTeacherRef = ref(null);
const editTeacherRef = ref(null);
const selectedTeacher = ref(null);

// Composable
const { getTeachers, deleteTeacherMutation } = useTeacher();

// Table columns
const columns = [
  { title: "Ism", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Telefon", dataIndex: "phone" },
  { title: "Maoshlari", dataIndex: "salary" },  
  { title: "Amallar", dataIndex: "actions" },
];


const deleteTeacher = (id) => {
  deleteTeacherMutation.mutate(id, {
    onSuccess: () => {
      console.log("Teacher o'chirildi");      
    },
    onError: (err) => {
      toast.error(err.message || "Xatolik yuz berdi!");
    },
  });
};

const openADDModal = async () => {
  // DOM renderini kutamiz
  await nextTick();

  if (addTeacherRef.value) {
    addTeacherRef.value.open(); // defineExpose orqali chaqiriladi
  } else {
    console.warn('Modal hali tayyor emas');
  }
};

const operEditModal = async (teacher) => {
    selectedTeacher.value = teacher;
  await nextTick();

  if (editTeacherRef.value) {
    editTeacherRef.value.open(); // defineExpose orqali chaqiriladi
  } else {
    console.warn('Modal hali tayyor emas');
  }

  console.log(JSON.stringify(getTeachers.data.value[0], null, 2));
};



</script>

<template>
  <div>
    <!-- Add Teacher -->
     <div class="flex justify-between">
      <h2 class="text-2xl font-bold mb-4">Ustozlar</h2>
      <div class="mb-4">
        <Button type="primary" @click="openADDModal">+ Add Teacher</Button>
      </div>
     </div>

    <div v-if="getTeachers.data">
      <a-table
        :columns="columns"
        :data-source="getTeachers.data?.value || []"
        row-key="_id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'actions'">
            <Button size="small" type="primary" @click="operEditModal(record)" class="mr-3">Edit</Button>
            <Popconfirm
              title="O'chirishni tasdiqlaysizmi?"
              @confirm="deleteTeacher(record.id)"
            >
              <Button size="small" danger>Delete</Button>
            </Popconfirm>
          </template>
        </template>
      </a-table>
    </div>

    <!-- Modals (table tashqarisida) -->
    <AddTeacherModal ref="addTeacherRef" />
    <EditTeacherModal ref="editTeacherRef" :teacher="selectedTeacher" />
  </div>
</template>
