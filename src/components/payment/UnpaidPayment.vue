<script setup>
import { defineProps } from 'vue';
import usePayment from '@/services/usePayment';
import dayjs from 'dayjs';

const { postPaymentMutation } = usePayment();
const props = defineProps({
    unpaidPayments: Array,
    selectedMonth: String
});

const columns = [
    { title: 'Ism', dataIndex: 'studentName', key: 'studentName' },
    { title: 'Qarzi', dataIndex: 'courseFee', key: 'courseFee' },
    { title: 'Kurs nomi', dataIndex: 'courseName', key: 'courseName' },
    { title: 'Amallar', key: 'actions' }
];

const handlePostPayment = async (record) => {

    try {
        const payload = {
        studentId: record.studentId,
        courseId: record.courseId,
        studentName: record.studentName,
        courseName: record.courseName,
        amount: record.courseFee,
        paymentMonth: record.month,
        paymentDate: dayjs().format('YYYY-MM-DD')
        };
        await postPaymentMutation.mutateAsync(payload);
    } catch (error) {
        console.error('To\'lovni amalga oshirishda xatolik yuz berdi:', error);
    }
};
</script>

<template>
    <div class="p-5">
        <h1 class="text-2xl font-bold mb-5">{{ selectedMonth }} uchun To'lovlar</h1>
        <a-table :columns="columns" :dataSource="unpaidPayments" rowKey="id" :pagination="{ pageSize: 5 }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'actions'">
                    <a-popconfirm placement="top" ok-text="Ha" cancel-text="Yo'q" @confirm="() => handlePostPayment(record)">
                        <template #title>
                            <p>To'lov qilinsinmi?</p>
                            <p>O'quvchi: <b>{{ record.studentName }}</b></p>
                            <p>Narxi: <b>{{ record.courseFee }}</b></p>
                            <p>Kurs: <b>{{ record.courseName }}</b></p>
                            <p>To'lov oyi: <b>{{ selectedMonth }}</b></p>
                        </template>
                        <a-button type="primary">To'lov Qilish</a-button>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </div>
</template>
