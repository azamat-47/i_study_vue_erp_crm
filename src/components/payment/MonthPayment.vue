<script setup>

const props = defineProps({
    paymentsMonth: Array,
    selectedMonth: String
});
</script>
<template >
    <div class="p-5">
        <h1 class="text-2xl font-bold mb-5">Oylik <a-tag>{{ selectedMonth }}</a-tag> uchun To'lovlar</h1>
        <div v-if="paymentsMonth.length === 0">Tolovlar mavjud emas..</div>
        <a-table v-else
            :columns="[
                { title: 'Ism', dataIndex: 'studentName', key: 'studentName' },
                { title: 'Miqdor', dataIndex: 'amount', key: 'amount' },
                { title: 'Kurs nomi', dataIndex: 'courseName', key: 'courseName' },
                { title: 'To\'lov oyi', dataIndex: 'paymentMonth', key: 'paymentMonth' },
                { title: 'Sana', dataIndex: 'paymentDate', key: 'paymentDate' },
            ]"
            :dataSource="paymentsMonth"
            rowKey="id"
            :pagination="{ pageSize: 10 }"
        />
    </div>
</template>

<style >
    
</style>