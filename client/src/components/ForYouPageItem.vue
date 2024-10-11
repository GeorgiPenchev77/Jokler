<template>
  <div>
    <div class="header">
      <h2>Recently In Gotham</h2>
      <div class="search-bar">
        <input
          class="form-control"
          type="text"
          placeholder="Search for a jokle"
          v-model="search"
        />
        <button class="btn">Search</button>
      </div>
    </div>

    <!-- Jokle list (main feed) -->
    <JokleList v-if="!searched"
      :jokles="Jokles"
      :isPost="true"
      @show-comments="openComments"
      @dislike-jokle="addDislike"
      @rejokle="addRejokle"
    />

    <!-- Comment section -->
    <div v-if="selectedJokleComments">
      <h3>Comments</h3>
      <JokleList
        :jokles="selectedJokleComments"
        @add-comment="addComment"
      />
      <!-- Add new comment -->
      <div class="new-comment">
        <textarea v-model="newComment" placeholder="Write a comment..." rows="3"></textarea>
        <button class="btn" @click="postComment">Post Comment</button>
      </div>
    </div>

  </div>
</template>

<script>
import JokleList from './JokleListItem.vue'
import { Api } from '@/Api'

export default {
  name: 'ForYouPage',
  components: {
    JokleList
  },
  data() {
    return {
      Jokles: [],
      search: '',
      searched: false,
      filteredJokles: {},
      selectedJokleComments: null,
      selectedJokleId: null,
      newComment: ''
    }
  },
  mounted() {
    this.getAllJokles()
  },
  methods: {
    async getAllJokles() {
      try {
        const response = await Api.get('/posts')
        this.Jokles = response.data
      } catch (error) {
        console.error('Error fetching jokles:', error)
      }
    },
    async addDislike(jokle) {
      try {
        const response = await Api.patch('/posts/')
        this.Jokles = response.data
      } catch (error) {
        console.error('Error fetching jokles:', error)
      }
    }
  }
}
</script>

<style scoped>
/* General layout */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.search-bar {
  display: flex;
  gap: 10px;
}

.form-control {
  width: 300px;
  padding: 8px;
  font-size: 14px;
}

.btn {
  padding: 8px 12px;
  background-color: darkcyan;
  color: white;
  border: none;
  cursor: pointer;
}

/* jokle list layout */
.jokle-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
}

</style>
