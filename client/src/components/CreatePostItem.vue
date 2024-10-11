<template>
    <div class="post-input">
      <!-- Input for content -->
      <textarea
        class="form-control content-input"
        placeholder="What is on your mind?"
        v-model="postContent"
      ></textarea>
  
      <!-- Button to create the post -->
      <button class="btn create-btn" @click="createPost">Create Jokle</button>
    </div>
  </template>
  
  <script>
  import { Api } from '@/Api'
  import Cookies from 'js-cookie'
  
  export default {
    name: 'CreatePostItem',
    data() {
      return {
        postContent: '', // Holds user input for content
      }
    },
    methods: {
      getCurrentUser() {
        const user = Cookies.get('username')
        return user
      },
      async createPost() {
        const username = this.getCurrentUser()
        if (!this.postContent) {
          alert('You cannot make a post with no content.') // Validation check
          return
        }
        try {
          const response = await Api.post(`/users/${username}/posts`, {
            content: this.postContent,
            madeBy: username
          })
          console.log('Post Created Successfully', response.data)
  
          // Clear the input fields after successful post
          this.postContent = ''
        } catch (error) {
          console.error('Error Creating Post:', error)
        }
      }
    }
  }

</script>
  <style scoped>
  .post-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
  }
  .content-input {
    width: 100%;
    padding: 10px;
    min-height: 100px;
    resize: none;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .type-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .create-btn {
    padding: 10px 20px;
    background-color: darkcyan;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  .create-btn:hover {
    background-color: teal;
  }
  </style>
