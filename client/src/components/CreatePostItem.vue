<template>
    <div class="post-input">
      <!-- Input for content -->
      <textarea
        class="form-control content-input"
        placeholder="What is on your mind?"
        v-model="jokleContent"
      ></textarea>

      <div class="divider"></div>

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
  gap: 15px;
  padding: 20px;
  background-color: #1E1E1E; /* Matches the dark theme */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1%;
  max-width: 90%;
  margin: 0 auto;
}

.content-input {
  width: 100%;
  min-height: 150px;
  align-self: center;
  padding: 15px;
  resize: vertical;
  font-size: 16px;
  border: solid;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ede2e2;
}

.content-input::placeholder {
  color: #b3b3b3;
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 10px 0;
}

.create-btn {
  padding: 12px;
  background-color: #00b8d9;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-btn:hover {
  background-color: #009fb3;
}
  </style>
