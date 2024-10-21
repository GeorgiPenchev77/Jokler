<template>
  <div class="page-container">
    <div class="greeting">
      <div v-if="getCurrentUser()">
        <h1>Greetings, {{getCurrentUser()}}</h1>
      </div>
    </div>

    <!-- Main content area -->
  <div class="content">
      <div id="MasterDeleteButton">
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
    async deleteAllPosts() {
      try {
        const response = await Api.delete('/posts')
        console.log(response.data)
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
}

#MasterDeleteButton {
  padding: 10px;
  border: 2px solid darkred;
  background-color: rgb(54, 14, 14);
}

#MasterDeleteButton button {
  color: red;
  box-shadow: inset 0 0 5px darkred;
}

</style>
