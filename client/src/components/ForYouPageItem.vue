<template>
  <div class="for-you-page">
    <div class="header">
      <h2>Recently Around The World</h2>

      <div class="sort-dropdown">
        <button class="btn" @click="toggleDropdown">Sort By</button>
        <div v-if="dropdownVisible" class="dropdown-menu">
          <button @click="sortJokles('date', 'asc')">Date: Oldest</button>
          <button @click="sortJokles('date', 'desc')">Date: Newest</button>
          <button @click="sortJokles('comments', 'asc')">Comments: Lowest to Highest</button>
          <button @click="sortJokles('comments', 'desc')">Comments: Highest to Lowest</button>
          <button @click="sortJokles('dislikes', 'asc')">Dislikes: Lowest to Highest</button>
          <button @click="sortJokles('dislikes', 'desc')">Dislikes: Highest to Lowest</button>
          <button @click="sortJokles('rejokles', 'asc')">Rejokles: Lowest to Highest</button>
          <button @click="sortJokles('rejokles', 'desc')">Rejokles: Highest to Lowest</button>
        </div>
      </div>
    </div>

    <!-- Jokles feed -->
    <JokleList
      :jokles="Jokles"
      @show-comments="switchPage"
      @dislike-jokle="addDislike"
      @rejokle="addRejokle"
      @delete-jokle="deleteJokle"
      @save-jokle="editJokle"
    />

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
      dropdownVisible: false,
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
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible
      console.log(this.dropdownVisible)
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
    async sortJokles(sortBy, order) {
      try {
        const response = await Api.get(`/posts?type=post&sortBy=${sortBy}&order=${order}`)
        console.log(response)
        this.Jokles = response.data
        this.dropdownVisible = false // Close the dropdown after selection
      } catch (error) {
        console.error('Error fetching jokles:', error)
      }
    },
    async addDislike(jokle) {
      try {
        const updatedDislikes = jokle.dislikes + 1
        const response = await Api.patch(`/posts/${jokle._id}`, {
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
        const response = await Api.patch(`/posts/${jokle._id}`, {
          rejokles: updatedRejokles
        })
        console.log('Rejokled successfully', response.data)
        jokle.rejokles = updatedRejokles
      } catch (error) {
        console.error('Error rejokling:', error)
      }
    },
    async deleteJokle(jokle) {
      try {
        const response = await Api.delete(`/posts/${jokle._id}`)
        console.log('Deleted successfully', response.data)
        this.getAllJokles()
      } catch (error) {
        console.error('Error rejokling:', error)
      }
    },
    async editJokle({ jokle, newContent }) {
      try {
        const response = await Api.put(`/posts/${jokle._id}`, {
          content: newContent
        })
        console.log('Edited Successfully', response.data)
        jokle.content = newContent
      } catch (error) {
        console.error('Error editing:', error)
      }
    },
    async switchPage(jokle) {
      setTimeout(() => {
        this.$router.push(`/posts/${jokle._id}`)
      }, 1000)
    }
  }
}
</script>

<style scoped>
.for-you-page{
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 2px solid #00b8d9;
}

h2 {
  color: #000000;
  font-size: 24px;
  font-weight: bold;
}

.sort-dropdown {
  position: relative;
}

.btn {
  padding: 8px 12px;
  background-color: #00b8d9;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.btn:hover {
  background-color: #0097b2;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 220px;
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-radius: 5px;
}

.dropdown-menu button {
  padding: 8px 12px;
  background-color: transparent;
  border: none;
  color: #00b8d9;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.dropdown-menu button:hover {
  background-color: #444;
  color: #00b8d9;
}
</style>
