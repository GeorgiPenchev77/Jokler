<template>
  <div class="page-container">
    <div class="greeting">
      <div v-if="getCurrentUser()">
        <h1>Welcome, {{getCurrentUser()}}</h1>
      </div>
    </div>

    <!-- Main content area -->
  <div class="content">

      <div v-if="getUserRole()==='admin'" id="MasterDeleteButton">
        <button @click="deleteAllPosts">Emergency Button</button>
      </div>

        <CreatePostItem/>

        <ForYouPageItem/>

  </div>

</div>

</template>

<script setup>
import ForYouPageItem from '@/components/ForYouPageItem.vue'
import CreatePostItem from '@/components/CreatePostItem.vue'
import Cookies from 'js-cookie'
import { Api } from '@/Api'
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
    },
    getUserRole() {
      return Cookies.get('role')
    },
    async deleteAllPosts() {
      try {
        const response = await Api.delete('/posts')
        console.log(response.data)
        alert('You Deleted All Posts')
      } catch (error) {
        console.error('You cannot destroy us!', error)
      }
    }
  }
}

</script>

<style>
.greeting{
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  font-style: italic;
  padding: 1%;
}

#MasterDeleteButton button {
  padding: 2px;
  border: 2px solid rgb(250, 34, 34);
  background-color: rgb(255, 44, 44);
  margin-bottom: 2%;
  margin-top: 2%;
  width: 150px;
}

</style>
