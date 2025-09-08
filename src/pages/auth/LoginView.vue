<script setup>

import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuth()

const form = reactive({
    username: '',
    password: ''
});

async function onFinish() {
    
    try {
        await auth.login(form.username, form.password);

        form.password = '';
        router.push(route.query.redirect || { name: 'courses' })

    } catch (error) {
        console.error('Login failed:', error);
        return;
        
    }
}

function onFinishFailed(errorInfo) {
    console.error('Form submission failed:', errorInfo);
}
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-black">
        <div class="p-8 rounded-2xl shadow-lg w-full max-w-md bg-gray-900">
            <a-typography-title>
                Kirish
            </a-typography-title>
            <a-form layout="vertical" :model="form" @finish="onFinish" @finishFailed="onFinishFailed">
                <!-- Username -->
                <a-form-item label="Foydalanuvchi nomi" name="username" :rules="[
                    { min: 6, message: 'Foydalanuvchi nomi kamida 6 ta belgidan iborat bo\'lishi kerak' },
                    { required: true, message: 'Foydalanuvchi nomini kiriting' },
                ]" has-feedback>
                    <a-input v-model:value="form.username" size="large" placeholder="Foydalanuvchi nomi" />
                </a-form-item>
                <!-- Password -->
                <a-form-item label="Parol" name="password" :rules="[
                    { required: true, message: 'Iltimos parolni kiriting!' },
                    { min: 6, message: 'Parol 6 ta belgidan kam bo‘lmasligi kerak!' }
                ]" has-feedback>
                    <a-input-password v-model:value="form.password" placeholder="Parolni kiriting" size="large" />
                </a-form-item>

                <!-- Submit -->
                <a-form-item>
                    <a-button type="primary" html-type="submit" size="large"
                        class="w-full mt-2 bg-blue-500 hover:bg-blue-600">
                        Login
                    </a-button>
                </a-form-item>
            </a-form>

           
        </div>
    </div>
</template>
