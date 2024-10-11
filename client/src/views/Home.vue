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
        <CreatePostItem/>
        <ForYouPageItem/>
  </div>

</div>

</template>

<script setup>
import { useRouter } from 'vue-router'
import ForYouPageItem from '@/components/ForYouPageItem.vue'
import CreatePostItem from '@/components/CreatePostItem.vue'
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

<style>

</style>
