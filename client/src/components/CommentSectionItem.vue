<template>
    <div class="comments-section">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <!-- Reuse the JokleItem component to display each comment -->
        <JokleItem :jokle="comment" />
      </div>
      <!-- Add a new comment -->
      <div class="new-comment">
        <textarea v-model="newComment" placeholder="Write a comment..." rows="3"></textarea>
        <button class="btn" @click="postComment">Post Comment</button>
      </div>
    </div>
  </template>

<script>
import JokleItem from './JokleItem.vue'

export default {
  name: 'CommentSectionItem',
  props: {
    comments: {
      type: Array,
      required: true
    },
    jokleId: {
      type: String,
      required: true
    }
  },
  components: {
    JokleItem
  },
  data() {
    return {
      newComment: ''
    }
  },
  methods: {
    postComment() {
      if (this.newComment.trim()) {
        this.newComment = ''
      }
    }
  }
}
</script>

<style scoped>
  .comments-section {
    margin-top: 10px;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
  }
  .new-comment {
    margin-top: 10px;
  }
  .new-comment textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 4px;
  }
  .btn {
    padding: 8px 12px;
    background-color: darkcyan;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>
