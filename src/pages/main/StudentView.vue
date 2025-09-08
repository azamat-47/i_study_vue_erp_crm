<script setup>
import { Button, Popconfirm } from 'ant-design-vue';
import useStudents from "@/services/useStudents";
import { nextTick, ref } from 'vue';
import AddStudentModal from '@/components/student-modal/AddStudentModal.vue';
import EditStudentModal from '@/components/student-modal/EditStudentModal.vue';

// Reactives
const addStudentRef = ref(null);
const editStudentRef = ref(null);
const selectedStudent = ref(null);

// Composable
const { GetStudents, DeleteStudent } = useStudents();

const columns = [
    { title: 'Ism', dataIndex: 'name' },
    { title: 'Tel raqam', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Qachon qushilgan', dataIndex: 'enrollmentDate' },
    { title: 'Amallar', dataIndex: 'actions' },
]

const openAddModal = async () => {
    await nextTick();
    addStudentRef.value?.open();
}

const openEditModal = async (student) => {
    await nextTick();
    selectedStudent.value = student;
    if (editStudentRef.value) {
        editStudentRef.value.open();
    }
}

const deleteStudent = (id) => {
    DeleteStudent.mutate(id);
}

</script>


<template>
    <!-- Add Student -->
    <div class="flex justify-between mb-4">
        <h1 class="text-3xl font-bold">Uquvchi</h1>

        <Button type="primary" @click="openAddModal">+ Uquvchi qo'shish</Button>

    </div>

    <div v-if="GetStudents.data">

        <a-table :columns="columns" :data-source="GetStudents.data.value || []" row-key="id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'actions'">
                    <Button type="primary" @click="openEditModal(record)" class="mr-2">Tahrirlash</Button>
                    <Popconfirm title="Rostdan ham o'chirmoqchimisiz?" ok-text="Ha" cancel-text="Yo'q"
                        @confirm="deleteStudent(record.id)">
                        <Button type="primary" danger>O'chirish</Button>
                    </Popconfirm>
                </template>
            </template>
        </a-table>

    </div>

    <AddStudentModal ref="addStudentRef" />
    <EditStudentModal ref="editStudentRef" :student="selectedStudent" />
</template>
<style></style>