<template>
  <div class="jokle-list">
    <JokleItem
      v-for="jokle in jokles"
      :key="jokle._id"
      :jokle="jokle"
      @show-comments="handleShowComments"
      @dislike-jokle="handleDislikeJokle"
      @rejokle="handleRejokle"
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
    }
  }
}
</script>

<style scoped>
.jokle-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
}
</style>
