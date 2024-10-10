<template>
  <div>
    <div class="header">
      <h2>For You</h2>
      <div class="search-bar">
        <input
          class="form-control"
          type="text"
          placeholder="Search for a jokle"
          v-model="search"
        />
        <button class="btn" @click="findJokle">Search</button>
      </div>
    </div>

    <!-- jokle list -->
    <div class="jokle-list" v-if="!searched">
      <JokleItem
        v-for="jokle in Jokles"
        :key="jokle._id"
        :jokle="jokle"
        @show-comments="openComments"
      />
    </div>

    <!-- Comment section -->
    <div v-if="selectedJokleComments" class="comments-section">
      <CommentSectionItem
        :comments="selectedJokleComments"
        :jokleId="selectedJokleId"
        @add-comment="addComment"
      />
    </div>

    <!-- Search result -->
    <div class="search-result" v-else-if="searched">
      <p>{{ filteredJokles.madeBy?.username }}</p>
      <button class="btn" @click="goBack">Back</button>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import JokleItem from '@/components/JokleItem.vue'
import CommentSectionItem from './CommentSectionItem.vue'

export default {
  name: 'For-You-Page',
  components: {
    JokleItem,
    CommentSectionItem
  },
  props: ['For-You-Page'],
  data() {
    return {
      Jokles: [],
      search: '',
      searched: false,
      filteredJokles: {},
      selectedJokleComments: null, // To track comments
      selectedJokleId: null // Track the ID of the jokle
    }
  },
  mounted() {
    this.getAllJokles()
  },
  methods: {
    async getAllJokles() {
      Api.get('/posts')
        .then(response => { this.Jokles = response.data })
        .catch(error => {
          console.error('Error fetching jokles:', error)
        })
    },
    async findJokle() {
      const size = this.Jokles.length
      for (let i = 0; i < size; i++) {
        if (this.Jokles[i].content === this.search) {
          this.filteredJokles = this.Jokles[i]
          this.searched = true
        }
      }
    },
    goBack() {
      this.searched = false
    },
    openComments(jokle) {
      this.selectedJokleComments = jokle.comments
      this.selectedJokleId = jokle._id
    },
    addComment(newComment) {
      // Add comment to the selected jokle
      const jokle = this.Jokles.find(j => j._id === this.selectedJokleId)
      if (jokle) {
        jokle.comments.push(newComment)
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
