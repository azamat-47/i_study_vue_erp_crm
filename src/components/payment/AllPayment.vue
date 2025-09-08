<script setup>

const props = defineProps({
    payments: Array
});
</script>
<template >
    <div class="p-5">
        <h1 class="text-2xl font-bold mb-5">Barcha To'lovlar</h1>
        <a-table
            :columns="[
                { title: 'Ism', dataIndex: 'studentName', key: 'studentName' },
                { title: 'Miqdor', dataIndex: 'amount', key: 'amount' },
                { title: 'Kurs nomi', dataIndex: 'courseName', key: 'courseName' },
                { title: 'To\'lov oyi', dataIndex: 'paymentMonth', key: 'paymentMonth' },
                { title: 'Sana', dataIndex: 'paymentDate', key: 'paymentDate' },
            ]"
            :dataSource="payments"
            rowKey="id"
            :pagination="{ pageSize: 10 }"
        />
    </div>
</template>

<style >
    
</style>