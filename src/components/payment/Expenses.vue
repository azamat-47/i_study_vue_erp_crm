<script setup>
import { ref } from 'vue';
import AddExpenseModal from './modal/AddExpenseModal.vue';
import AddTeacherExpense from './modal/AddTeacherExpense.vue';
import usePayment from '@/services/usePayment';


const props = defineProps({
    fetchExpensesByMonth: Array,
    expenses: Array,
    selectedMonth: String
});

const addExpense = ref(null);
const addTeacherExpenseRef = ref(null);

const openAddExpense = () => {
    addExpense.value?.open();
};

const openAddTeacherExpense = () => {
    addTeacherExpenseRef.value?.open();
};

const  { deleteExpenseMutation } = usePayment();

const handleDeleteExpense = (id) => {
    deleteExpenseMutation.mutate(id);
};


</script>
<template >
    <div class="p-5">
        <div class="flex justify-between">
            <h1 class="text-2xl font-bold mb-5">Barcha Xarajatlar</h1>
            <a-space>

                <a-button type="primary" class="bg-blue-500!"  @click="openAddTeacherExpense">Uztozga oylik Qo'shish</a-button>
                <a-button type="primary"  @click="openAddExpense">Yangi Xarajat Qo'shish</a-button>

            </a-space>
        </div>
        <div v-if="expenses.length === 0"> Xarajat yuq</div>
        <a-table v-else
            :columns="[
                { title: 'Nomi', dataIndex: 'name', key: 'name' },
                { title: 'Miqdor', dataIndex: 'amount', key: 'amount' },
                { title: 'Tavsif', dataIndex: 'description', key: 'description' },
                { title: 'Xarajat oyi', dataIndex: 'expenseMonth', key: 'expenseMonth' },
                { title: 'Sana', dataIndex: 'expenseDate', key: 'expenseDate' },
                { title: 'Amallar', key: 'actions' }
            ]"
            :dataSource="expenses"
            rowKey="id"
            :pagination="{ pageSize: 10 }"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'actions'">
                    <a-popconfirm placement="top" ok-text="Ha" cancel-text="Yo'q" title="Harajat uchirish" @confirm="() => handleDeleteExpense(record.id)" >
                        
                        <a-button type="primary" danger>O'chirish</a-button>
                    </a-popconfirm>
                </template>
            </template>
    </a-table>


        <hr>


        <h1 class="text-2xl font-bold mb-5">{{ selectedMonth }} uchun Xarajatlar</h1>
        <div v-if="fetchExpensesByMonth.length === 0">{{ selectedMonth }} uchun Xarajat yuq</div>
        <a-table v-else
            :columns="[
                { title: 'Nomi', dataIndex: 'name', key: 'name' },
                { title: 'Miqdor', dataIndex: 'amount', key: 'amount' },
                { title: 'Tavsif', dataIndex: 'description', key: 'description' },
                { title: 'Xarajat oyi', dataIndex: 'expenseMonth', key: 'expenseMonth' },
                { title: 'Sana', dataIndex: 'expenseDate', key: 'expenseDate' },
                { title: 'Amallar', key: 'actions' }
            ]"
            :dataSource="fetchExpensesByMonth"
            rowKey="id"
            :pagination="{ pageSize: 10 }"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'actions'">
                    <a-popconfirm placement="top" ok-text="Ha" cancel-text="Yo'q" title="Harajat uchirish" @confirm="() => handleDeleteExpense(record.id)" >
                        
                        <a-button type="primary" danger>O'chirish</a-button>
                    </a-popconfirm>
                </template>
            </template>
    </a-table>
    </div>

    <AddExpenseModal ref="addExpense" />
    <AddTeacherExpense ref="addTeacherExpenseRef" />
    
</template>