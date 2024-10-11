<template>
  <div class="page-container">
    <div class="greeting">
      <div v-if="getCurrentUser()">
        <h1>Greetings, {{getCurrentUser()}}</h1>
      </div>
      <div v-else>
        <button @click="router.push('login')">Log in</button>
      </div>
    </div>

    <!-- Main content area -->
  <div class="content">
        <ForYouPageItem></ForYouPageItem>
  </div>

</div>

</template>

<script setup>

import { useRouter } from 'vue-router'
import ForYouPageItem from '@/components/ForYouPageItem.vue'
import Cookies from 'js-cookie'

const router = useRouter()

</script>

<script>

export default {
  name: 'home',
  components: { ForYouPageItem },
  data() {
    return {
      selected: 'Home'
    }
  },
  methods: {
    getCurrentUser() {
      const user = Cookies.get('username')
      return user
    }
  }
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
}

.tabs {
  width: 200px; /* Set width for the sidebar */
  display: flex;
  flex-direction: column; /* Change direction to stack tabs vertically */
  background-color: #f8f9fa; /* Optional: light background for sidebar */
  padding: 10px;
  border-right: 1px solid #ddd;
}

.content {
  flex: 1; /* Take up remaining space for the content area */
  padding: 20px;
  background-color: #fff;
}

.nav-item {
  margin-bottom: 10px;
}

.nav-link {
  display: block;
  padding: 10px;
  color: #007bff;
  text-decoration: none;
  border-radius: 4px;
}

.nav-link.active {
  background-color: #007bff;
  color: #fff;
}
</style>
