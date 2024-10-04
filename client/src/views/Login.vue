<script setup>
// @ is an alias to /src
import { Api } from '@/Api'
import { ref, computed } from 'vue'

const loginHeader = ref('Log in')
const signupHeader = ref('Sign up')
const loginTracker = ref(true)

const username = ref('')
const password = ref('')

const error = ref('oy oy')
const errorStatus = ref(true)

const header = computed(() => {
  if (loginTracker.value) {
    return loginHeader
  } else {
    return signupHeader
  }
})

function loginToggle() {
  loginTracker.value = !loginTracker.value
}

async function login() {
  Api.get('/users/' + username.value).then((response) => {
    console.log(response)
    if (response.status === 400) {
      error.value = 'User not found'
    }
    const resPassword = response.data.password

    if (resPassword === password.value) {
      errorStatus.value = false
      error.value = 'Login success!'
    } else {
      error.value = 'Wrong password'
    }
  })
}

function signup() {

}

</script>

<template>
<div>
  <b-container fluid>
    <div>
      <h1>{{header}}</h1>
    </div>
    <div>
      <input v-model="username" placeholder="username">
    </div>
    <div>
      <input v-model="password" placeholder="password" type="password">
    </div>
    <div>
      <button @click="loginTracker ? login() : signup()">{{loginTracker ? "Log in" : "Sign up"}} </button>
    </div>
    <div>
      <button @click="loginToggle">{{loginTracker ? "Sign up instead" : "Log in instead"}} </button>
    </div>
    <div>
      <h2 v-if="error" :class="errorStatus ? 'error' : 'ok'">{{error}}</h2>
    </div>
  </b-container>
</div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style scoped>
.error{
  color: red
}
.ok{
  color: green
}
</style>
