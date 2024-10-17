<template>
  <div>
    <div class="header">
      <h2>Recently In Gotham</h2>

      <div class="sort-dropdown">
        <button class="btn" @click="toggleDropdown">Sort By</button>
        <div v-if="dropdownVisible" class="dropdown-menu">
          <button @click="sortJokles('date', 'asc')">Date: Newest</button>
          <button @click="sortJokles('date', 'desc')">Date: Oldest</button>
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
    async switchPage(jokle) {
      setTimeout(() => {
        this.$router.push(`/posts/${jokle._id}`)
      }, 1000)
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

.sort-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 200px; /* Ensure the dropdown has enough width */
  display: flex;
  flex-direction: column;
  padding: 10px 0; /* Add padding for aesthetics */
}

.dropdown-menu button {
  padding: 8px 12px;
  background-color: white;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%; /* Make sure the buttons take full width */
}

.dropdown-menu button:hover {
  background-color: #f1f1f1;
}

.btn {
  padding: 8px 12px;
  background-color: darkcyan;
  color: white;
  border: none;
  cursor: pointer;
}

</style>
