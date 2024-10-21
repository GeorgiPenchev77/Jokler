<script setup>
import { ref } from 'vue'
import Cookies from 'js-cookie'

const emit = defineEmits(['save-jokle'])

function getCurrentRole() {
  return Cookies.get('role')
}

function getCurrentUser() {
  return Cookies.get('username')
}

const isEditing = ref(false)
const editableContent = ref('')

function toggleEditMode(jokle) {
  if (isEditing.value) {
    emit('save-jokle', { jokle, newContent: editableContent.value })
  } else {
    editableContent.value = jokle.content
  }
  isEditing.value = !isEditing.value
}

</script>

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

      <p v-if="!isEditing" v-html="formatContent(jokle.content)"></p>

      <textarea class="jokle-content editing-area" v-if="isEditing" v-model="editableContent" rows="5"></textarea>
    </div>

    <div class="divider"></div>

    <div class="jokle-actions">
      <div class="icon">
        <button class="btn" @click="$emit('show-comments', jokle)"><img src="/comment-icon.png" alt="Show Comments" contain width="25px" height="25px"/>{{ jokle.comments?.length }}</button>
      </div>
      <div class="icon">
        <button class="btn" @click="$emit('dislike-jokle', jokle)"><img src="/dislike-icon.jpg" alt="Dislikes Jokle" contain width="25px" height="25px"/>{{ jokle.dislikes }}</button>
      </div>
      <div class="icon">
        <button class="btn" @click="$emit('rejokle', jokle)"><img src="/rejokle-icon.png" alt="Rejokle" contain width="25px" height="25px"/> {{ jokle.rejokles }}</button>
      </div>
      <div class="icon" v-if="getCurrentRole() === 'admin'">
        <button class="btn" @click="$emit('delete-jokle', jokle)"><img src="/delete-icon.jpg" alt="Delete Jokle" contain width="30px" height="25px"/></button>
      </div>
      <div class="icon" v-if="getCurrentUser() === jokle.madeBy?.username">
        <button class="btn" @click="toggleEditMode(jokle)">
          <img src="/edit-icon.png" alt="Edit Jokle" contain width="30px" height="25px"/>
          {{ isEditing ? 'Save' : 'Edit' }}
        </button>
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
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    },
    formatContent(content) {
      return content.replace(/\n/g, '<br/>')
    }
  }
}

</script>

<style scoped>
.jokle-item {
  background-color: #1E1E1E; /* Dark card background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Shadow for depth */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.jokle-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile-picture {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.jokle-info {
  margin-left: 15px;
}

.username {
  font-size: 16px;
  color: #00b8d9;
}

.date {
  font-size: 12px;
  color: #aaa;
}

.jokle-content {
  margin-bottom: 15px;
}

.jokle-content p {
  color: white;
  font-size: 1rem;
  line-height: 1.5;
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 10px 0;
}

.jokle-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.icon {
  display: flex;
  align-items: center;
  background-color:rgba(0, 0, 0, 0.2);
}

.btn {
  background-color: #00b8d9;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #009fb3;
}

img {
  margin-right: 5px;
}

.editing-area{
  width: 100%;
  height: auto;
  resize: none;
  outline: none;
  box-shadow: none;
  background: rgb(255, 255, 255);
}
</style>
