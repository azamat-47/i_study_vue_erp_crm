<script setup>
import { NodeCollapseOutlined, NodeExpandOutlined } from '@ant-design/icons-vue';
import LoginView from './pages/auth/LoginView.vue';
import { ref } from 'vue';
import { useAuth } from './stores/auth'
import { Toaster } from 'vue3-hot-toast';
import { RouterLink } from 'vue-router';
import { ConfigProvider } from 'ant-design-vue';

const selectedKeys = ref(['1']);
const collapsed = ref(false);

// Pinia store
const auth = useAuth()
</script>

<template>
  <ConfigProvider :theme="{
    token: {
      colorBgContainer: '#141414', // container background
      colorText: '#fff',           // default text color
      colorPrimary: '#1890ff',     // primary color
      colorBgBase: '#000000'       // overall background
    }
  }">
    <Toaster position="top-center" :reverseOrder="false" />

    <a-layout>
      <!-- Agar user login qilgan bo'lsa sidebar ko'rsin -->
      <template v-if="auth.isAuthenticated">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
          <div class="logo" />
          <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" class="mt-15!">
            <RouterLink to="/">

              <a-menu-item key="1">
                <span>Guruhlar</span>
              </a-menu-item>
            </RouterLink>

            <RouterLink to="/payments">
              <a-menu-item key="2">
                <span>Payment</span>
              </a-menu-item>
            </RouterLink>

            <RouterLink to="/teachers">
              <a-menu-item key="3">
                <span>Teachers</span>
              </a-menu-item>
            </RouterLink>


            <RouterLink to="/students">
              <a-menu-item key="4">
                <span>Studentlar</span>
              </a-menu-item>
            </RouterLink>
          </a-menu>
        </a-layout-sider>
      </template>

      <a-layout>
        <!-- Header faqat login qilgan foydalanuvchi uchun -->
        <template v-if="auth.isAuthenticated">
          <a-layout-header class="flex justify-between">
            <NodeExpandOutlined v-if="collapsed" class="trigger text-[20px]" @click="() => (collapsed = !collapsed)" />
            <NodeCollapseOutlined v-else class="trigger text-[20px]" @click="() => (collapsed = !collapsed)" />
            <button  class='m-4 p-3 bg-red-400 mr-5 flex justify-center items-center'>
              <a-popconfirm
                title="Chiqishni tasdiqlaysizmi?"
                okText="Ha"
                cancelText="Yo'q"
                @confirm="auth.logout()"
              >
              logout
              </a-popconfirm>
            </button>
          </a-layout-header>
        </template>

        <a-layout-content :style="{ padding: '24px', background: '#000', minHeight: '280px' }">
          <!-- Agar login qilmagan bo'lsa faqat LoginView -->
          <LoginView v-if="!auth.isAuthenticated" />

          <!-- Dashboard content -->
          <template v-else>
            <router-view></router-view>
          </template>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </ConfigProvider>
</template>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
