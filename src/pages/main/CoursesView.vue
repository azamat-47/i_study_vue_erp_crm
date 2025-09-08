<script setup>
import { ref, nextTick } from "vue";
import { Button, Popconfirm } from "ant-design-vue";
import toast from "vue3-hot-toast";

import useCourse from "@/services/useCourse";
import AddCourseModal from "@/components/course-modal/AddCourseModal.vue";
import EditCourseModal from "@/components/course-modal/EditCourseModal.vue";

// Modal refs
const addCourseRef = ref(null);
const editCourseRef = ref(null);
const selectedCourse = ref(null);

// Composable
const { getCourses, deleteCourseMutation } = useCourse();

// Table columns
const columns = [
  { title: "Nomi", dataIndex: "name" },
  { title: "Tavsif", dataIndex: "description" },
  { title: "Narx", dataIndex: "fee" },
  { title: "O'qituvchilar", dataIndex: "teachers" },
  { title: "Amallar", dataIndex: "actions" },
];

const deleteCourse = (id) => {
  deleteCourseMutation.mutate(id);
};

const openAddModal = async () => {
  await nextTick();
  addCourseRef.value?.open();
};

const openEditModal = async (course) => {
  selectedCourse.value = course;
  await nextTick();
  editCourseRef.value?.open();
};
</script>

<template>
  <div>
    <!-- Add Course -->
    <div class="flex justify-between mb-4">
      <h1 class="text-3xl font-bold">Kurslar</h1>

      <Button type="primary"  @click="openAddModal">+ Kurs qo'shish</Button>

    </div>

    <div v-if="getCourses.data">
      <a-table :columns="columns" :data-source="getCourses.data?.value || []" row-key="id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'teachers'">
            {{record.teachers?.map(t => t.name).join(", ")}}
          </template>
          <template v-else-if="column.dataIndex === 'actions'">
            <Button size="small" type="primary" class="mr-2" @click="openEditModal(record)">Edit</Button>
            <Popconfirm title="O'chirishni tasdiqlaysizmi?" @confirm="deleteCourse(record.id)">
              <Button size="small" danger>Delete</Button>
            </Popconfirm>
          </template>
        </template>
      </a-table>
    </div>

    <!-- Modals -->
    <AddCourseModal ref="addCourseRef" />
    <EditCourseModal ref="editCourseRef" :course="selectedCourse" />
  </div>
</template>
