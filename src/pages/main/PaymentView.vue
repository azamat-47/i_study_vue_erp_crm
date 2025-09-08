<script setup>
import dayjs from 'dayjs';
import { computed, ref, watch } from 'vue';
import usePayment from '@/services/usePayment';
import toast from 'vue3-hot-toast';
import AllPayment from '@/components/payment/AllPayment.vue';
import UnpaidPayment from '@/components/payment/UnpaidPayment.vue';
import MonthPayment from '@/components/payment/MonthPayment.vue';
import Expenses from '@/components/payment/Expenses.vue';

const selectedMonth = ref(dayjs());
const formattedMonth = computed(() => selectedMonth.value.format("YYYY-MM"));



const {
    fetchPayment,
    fetchPaymentByMonth,
    fetchAllUnpaid,
    fetchExpenses,
    fetchExpensesByMonth,    
    fetchFinancialSummary,
    fetchFullFinancialSummary,   
    refetchPaymentData,
    refetchExpenseData,
    isLoading,
    error
} = usePayment(formattedMonth);


// Watch for changes in selectedMonth and refetch data

const handleRefresh = () => {
    refetchPaymentData();
    refetchExpenseData();
    toast.success('Ma\'lumotlar yangilandi');
};





</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl">Tulovlar</h1>
        <div class="flex gap-3">
            <a-date-picker v-model:value="selectedMonth" class="border border-amber-400! dark-datepicker"
                placeholder="Oyni Tanlang" picker="month" />
            <a-button type="primary" class="bg-green-500!" @click="handleRefresh">Yangilash</a-button>
        </div>
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="mt-10 flex justify-center">
        <a-spin size="large" tip="Ma'lumot yuklanmoqda..." />
    </div>

    <!-- Error Message -->
    <div v-else-if="error" class="mt-10">
        <a-alert message="Xatolik yuz berdi"
            description="Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, sahifani yangilab qayta urinib ko'ring."
            type="error" show-icon />
    </div>
    <!-- Financial Summary -->
    <div v-else class="flex flex-row mt-3 gap-3">
        <div class="w-full md:w-1/4 border border-blue-600 p-5 rounded-xl">
            <h2 class="text-lg font-semibold mb-2">Jami <a-tag>Oylik</a-tag> Kurslardan daromad</h2>
            <p class="text-2xl font-bold">{{ fetchFinancialSummary.data?.value?.revenue.toLocaleString() }} so'm</p>
        </div>
        <div class="w-full md:w-1/4 border border-blue-600 p-5 rounded-xl">
            <h2 class="text-lg font-semibold mb-2">Jami <a-tag>Oylik</a-tag> Xarajat</h2>
            <p class="text-2xl font-bold">{{ fetchFinancialSummary.data?.value?.recordedExpenses.toLocaleString() }}
                so'm</p>
        </div>
        <div class="w-full md:w-1/4 border border-blue-600 p-5 rounded-xl">
            <h2 class="text-lg font-semibold mb-2">Jami <a-tag>Oylik</a-tag> Sof foyda</h2>
            <p class="text-2xl font-bold">{{ fetchFinancialSummary.data?.value?.netProfit.toLocaleString() }} so'm</p>
        </div>
        <div class="w-full md:w-1/4 border border-blue-600 p-5 rounded-xl">
            <p class="text-md font-bold"> Kurslardan daromad <span class="text-yellow-500">{{ fetchFullFinancialSummary.data?.value?.payments?.toLocaleString() }} so'm</span></p>
            <p class="text-md font-bold"> Jami Xarajat <span class="text-yellow-500">{{ fetchFullFinancialSummary.data?.value?.expenses?.toLocaleString() }} so'm</span></p>
            <p class="text-md font-bold"> Jami Sof daromad <span class="text-yellow-500">{{ fetchFullFinancialSummary.data?.value?.netProfit?.toLocaleString() }} so'm</span></p>
        </div>
    </div>

    <!-- all Payment Table -->

    <div class="mt-5">
        <a-tabs defaultActiveKey="1">
            <a-tab-pane key="1" tab="Barcha To'lovlar">
                <AllPayment :payments="fetchPayment.data?.value || []"  />
            </a-tab-pane>
            <a-tab-pane key="2" tab="Oylik To'lovlar">
                <MonthPayment :paymentsMonth="fetchPaymentByMonth.data?.value.payments || []"  :selectedMonth="formattedMonth" />
               
            </a-tab-pane>
            <a-tab-pane key="3" tab="To'lanmaganlar">
                <UnpaidPayment :unpaidPayments="fetchAllUnpaid.data?.value || []" :selectedMonth="formattedMonth" />
                
            </a-tab-pane>
            <a-tab-pane key="4" tab="Xarajatlar">
                <Expenses :expenses="fetchExpenses.data?.value || []" :fetchExpensesByMonth="fetchExpensesByMonth.data?.value" :selectedMonth="formattedMonth"/>
            </a-tab-pane>
        </a-tabs>
    </div>


</template>
