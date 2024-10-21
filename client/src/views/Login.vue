<script setup>
// @ is an alias to /src
import { Api } from '@/Api'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()

const loginHeader = ref('Log in')
const signupHeader = ref('Sign up')
const loginTracker = ref(true)

const username = ref('')
const password = ref('')

const message = ref('Welcome to Jokler')
const errorStatus = ref(false)

const adminLogin = ref(false)

const header = computed(() => {
  if (loginTracker.value) {
    return loginHeader
  } else {
    return signupHeader
  }
})

function loginToggle() {
  loginTracker.value = !loginTracker.value
  adminLogin.value = false
}

async function login() {
  if (!adminLogin.value) {
    Api.post('/login/password', { username: username.value, password: password.value}).then((res) => {
      errorStatus.value = false
      message.value = 'Login successful!'
      console.log(res)
      setCurrentUser(res.data.username)
      setTimeout(() => {
        router.replace('/').then(() => { location.reload() })
      }, 1000)
    }).catch((err) => {
      console.log(err)
      errorStatus.value = true
      message.value = err.response.data.message
    })
  } else {
    Api.post('admin/login/password', { username: username.value, password: password.value }).then((res) => {
      errorStatus.value = false
      message.value = 'Login successful! Welcome admin' + username.value
      console.log(res)
      setCurrentUser(res.data.username, 'admin')
      setTimeout(() => {
        router.replace('/').then(() => { location.reload() })
      }, 1000)
    }).catch((err) => {
      console.log(err)
      errorStatus.value = true
      message.value = err.response.data.message
    })
  }
}
async function signup() {
  const data = { 'username': username.value, 'password': password.value }
  Api.post('/users/', data).then((response) => {
    message.value = 'User created successfully!'
  }).catch((err) => {
    console.log(err)
    message.value = err.response.message
  })
}

function setCurrentUser(username, role = 'user') {
  Cookies.set("username", username, '60s')
  Cookies.set("role", role, '60s')
}

</script>

<template>
<div>
  <b-container fluid>
    <div>
      <h1>{{header}} as {{adminLogin ? "Admin" : "User"}}</h1>
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
      <button @click="loginToggle">Want to {{loginTracker ? "Sign up" : "Log in"}}?</button>
    </div>
    <div v-if="loginTracker">
      <input type="checkbox" id="adminToggle" value="True" v-model="adminLogin"/>
      <label>{{loginTracker ? "Log in" : "Sign up"}} as admin instead?</label>
    </div>
    <div>
      <h2 :class="errorStatus ? 'error' : 'ok'">{{message}}</h2>
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
