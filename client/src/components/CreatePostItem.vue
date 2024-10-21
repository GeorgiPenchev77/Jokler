<template>
    <div class="post-input">
      <!-- Input for content -->
      <textarea
        class="form-control content-input"
        placeholder="What is on your mind?"
        v-model="jokleContent"
      ></textarea>

      <!-- Button to create the post -->
      <button class="btn create-btn" @click="createPost">{{!this.isComment ? "Create" : "Comment"}} Jokle</button>
    </div>
  </template>

  <script>
  import { Api } from '@/Api'
  import Cookies from 'js-cookie'

  export default {
    name: 'CreatePostItem',
    data() {
      return {
        jokleContent: '', // Holds user input for content
      }
    },
    props: {
      isComment: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    methods: {
      getCurrentUser() {
        const user = Cookies.get('username')
        return user
      },
      async createPost() {
        const username = this.getCurrentUser()
        if (!this.jokleContent) {
          alert('You cannot make a jokle with no content.') // Validation check
          return
        }
        else if(!username) {
          alert('You need to be logged in to create a jokle.')
          return
        }
        try {
          if(!this.isComment){
            const response = await Api.post(`/users/${username}/posts`, {
              content: this.jokleContent,
              madeBy: username
            })
            console.log('Jokle Created Successfully', response.data)
          } else {
            const response = await Api.post(`/users/${username}/posts/${this.$route.params.id}`, {
              content: this.jokleContent,
              madeBy: username
            })
            console.log('Jokle Commented Successfully', response.data)
            location.reload()
          }


          // Clear the input fields after successful post
          this.jokleContent = ''
        } catch (error) {
          console.error('Error Creating Jokle:', error)
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
