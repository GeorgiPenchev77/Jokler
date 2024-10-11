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

    <!-- Posts feed -->
    <JokleList v-if="!searched"
      :jokles="Jokles"
      @show-comments="showComments"
      @dislike-jokle="addDislike"
      @rejokle="addRejokle">

     <!-- Comments Section for Selected Jokle -->
     <div v-if="commentsOpened" class="comments-section"><h4>Comments</h4>
      <JokleListItem
        :comments="Comments"
        @show-comments="showComments"
        @dislike-jokle="addDislike"
        @rejokle="addRejokle"
      />
      <input v-model="newComment" placeholder="Add a comment" />
      <button class="btn" @click="postComment(selectedJokleId)">Post Comment</button>
    </div>
    </JokleList>

  </div>

</template>

<script>
import { Api } from '@/Api'
import JokleList from './JokleListItem.vue'
import Cookies from 'js-cookie'

export default {
  name: 'ForYouPage',
  components: {
    JokleList
  },
  data() {
    return {
      Jokles: [],
      Comments: [],
      commentsOpened: false,
      selectedJokleId: null
    }
  },
  mounted() {
    this.getAllJokles()
  },
  methods: {
    getCurrentUser() {
      const user = Cookies.get('username')
      return user
    },
    getSelectedJokle() {
      return this.Jokles.find(jokle => jokle._id === this.selectedJokleId) || {}
    },
    async getAllJokles() {
      try {
        const response = await Api.get('/posts?type=post')
        this.Jokles = response.data
      } catch (error) {
        console.error('Error fetching jokles:', error)
      }
    },
    async showComments(jokle) {
      this.commentsOpened = !this.commentsOpened
      if (this.commentsOpened) {
        try {
          const response = await Api.get(`/posts/${jokle._id}/comments`)
          this.Comments = response.data
          console.log(this.Comments)
        } catch (error) {
          console.error('Error fetching comments:', error)
        }
      }
    },
    async addDislike(jokle) {
      try {
        const updatedDislikes = jokle.dislikes + 1
        const response = await Api.put(`/posts/${jokle._id}`, {
          dislikes: updatedDislikes
        })
        console.log('Jokle disliked successfully', response.data)
        jokle.dislikes = updatedDislikes
      } catch (error) {
        console.error('Erorr disliking jokle:', error)
      }
    },
    async addRejokle(jokle) {
      try {
        const updatedRejokles = jokle.rejokles + 1
        const response = await Api.put(`/posts/${jokle._id}`, {
          rejokles: updatedRejokles
        })
        console.log('Rejokled successfully', response.data)
        jokle.rejokles = updatedRejokles
      } catch (error) {
        console.error('Error rejokling:', error)
      }
    },
    async postComment(jokle) {
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
