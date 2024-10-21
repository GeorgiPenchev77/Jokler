<template>
  <div>
    <div class="content">

      <!--   MAINJOKLE   -->
      <JokleItem
        v-if="jokle"
        :key="jokle._id"
        :jokle="jokle"
        @show-comments="switchPage"
        @dislike-jokle="addDislike"
        @rejokle="addRejokle"
        @delete-jokle="deleteJokle"
      />

      <!-- New Comment -->
      `<CreatePostItem
        :is-comment="true"
      />

      <!-- COMMENTS -->
      <JokleList
        :jokles="comments"
        @show-comments="switchPage"
        @dislike-jokle="addDislike"
        @rejokle="addRejokle"
        @delete-jokle="deleteJokle"
      />
    </div>
  </div>
</template>

<script setup>
import JokleItem from "@/components/JokleItem.vue";
import JokleList from "@/components/JokleListItem.vue";
import CreatePostItem from "@/components/CreatePostItem.vue";
</script>


<script>
import JokleItem from "@/components/JokleItem.vue";
import {Api} from "@/Api.js";

export default {
  name: 'JokleWithComments',
  components: {
    JokleItem
  },
  data() {
    return {
      jokle: null,
      comments: []
    }
  },
  mounted() {
    this.getThisJokle()
  },
  methods: {
    async addDislike(jokle) {
      try {
        const updatedDislikes = jokle.dislikes + 1
        const response = await Api.patch(`/posts/${jokle._id}`, {
          dislikes: updatedDislikes
        })
        console.log('Jokle disliked successfully', response.data)
        jokle.dislikes = updatedDislikes
      } catch (error) {
        console.error('Error disliking jokle:', error)
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
      console.log("....")
      setTimeout(() => {
        this.$router.push(`/posts/${jokle._id}`).then(() => { location.reload() })
      }, 1000)
    },
    async getThisJokle() {
      try {
        const response = await Api.get(`/posts/` + this.$route.params.id)
        this.jokle = response.data

        for (let commentID of response.data.comments) {
          let commentResponse = await Api.get('/posts/' + commentID)
          this.comments.push(commentResponse.data)
        }
        console.log(this.comments)

      } catch (error) {
        console.error('Error fetching jokle:', error)
      }
    }
  }
}
</script>
