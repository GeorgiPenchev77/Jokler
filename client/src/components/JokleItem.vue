<template>
  <div class="jokle-item">

    <div class="jokle-header">
      <img class="profile-picture" :src="jokle.madeBy?.profilePic || '/default-profile-picture.jpg'" alt="Profile Picture" />
      <div class="jokle-info">
        <strong><span class="username">{{ jokle.madeBy?.username || 'AnonymousUser' }}</span></strong>
        <span class="date">• {{ formatDate(jokle.date) }}</span>
      </div>
    </div>

    <div class="jokle-content">
      <p>{{ jokle.content }}</p>
    </div>

    <div class="jokle-actions">
      <div class="icon">
        <button class="btn" @click="$emit('show-comments', jokle)"><img src="/comment-icon.jpg" alt="Show Comments"  contain width="25px" height="25px"/>{{ jokle.comments?.length }}</button>
      </div>
      <div class="icon">
        <button class="btn" @click="$emit('dislike-jokle', jokle)"><img src="/dislike-icon.jpg" alt="Dislikes Jokle" contain width="25px" height="25px"/>{{ jokle.dislikes }}</button>
      </div>
      <div class="icon">
        <button class="btn" @click="$emit('rejokle', jokle)"><img src="/rejokle-icon.jpg" alt="Rejokle" contain width="25px" height="25px"/> {{ jokle.rejokles }}</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'JokleItem',
  props: {
    jokle: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${day}/${month}/${year} ${hours}:${minutes}`
    }
  }
}
</script>

<style scoped>
/* Jokle item layout */
.jokle-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

/* jokle header layout */
.jokle-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.profile-picture {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
}

.jokle-info {
  display: flex;
  gap: 5px;
  align-items: center;
}

.username {
  color: gray;
}

.jokle-date {
  color: gray;
}

/* jokle content */
.jokle-content {
  margin: 8px 0;
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
}

/* jokle actions layout */
.jokle-actions {
  display: flex;
  justify-content: space-around;
  color: gray;
}

.icon {
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* Comments section */
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
  padding: 4px 4px;
  background-color: rgb(162, 152, 177);
  color: white;
  border: none;
  cursor: pointer;
}
</style>
