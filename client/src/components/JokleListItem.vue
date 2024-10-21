<template>
  <div class="jokle-list">
    <JokleItem
      v-for="jokle in jokles"
      :key="jokle._id"
      :jokle="jokle"
      @show-comments="handleShowComments"
      @dislike-jokle="handleDislikeJokle"
      @rejokle="handleRejokle"
      @delete-jokle="handleDeleteJokle"
    />
  </div>
</template>

<script>
import JokleItem from './JokleItem.vue'

export default {
  name: 'JokleList',
  components: {
    JokleItem
  },
  props: {
    jokles: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleShowComments(jokle) {
      this.$emit('show-comments', jokle)
    },
    handleDislikeJokle(jokle) {
      this.$emit('dislike-jokle', jokle)
    },
    handleRejokle(jokle) {
      this.$emit('rejokle', jokle)
    },
    handleDeleteJokle(jokle) {
      this.$emit('delete-jokle', jokle)
    }
  }
}
</script>

<style scoped>
.jokle-list {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Increased gap for cleaner separation */
  padding: 20px;
  color: white;
}

.jokle-list > * {
  background-color: #1e1e1e; /* Dark background for each card */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.jokle-list > *:hover {
  transform: translateY(-5px); /* Lift effect on hover */
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
