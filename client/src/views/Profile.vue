<template>
  <div>
    <h1>Your Profile</h1>
    <p>Welcome {{getCurrentUser()}} to your profile </p>
    <!-- Profile content -->
    <div>
      Name
    </div>
    <div>
      <input v-model="username" placeholder="Change username">
      <button @click="saveUsername">Save</button>
    </div>
    <div>
      Password
    </div>
    <div>
      <div>
        <input
            v-if="!changingPassword"
            v-model="currentPassword"
            :placeholder="passwordVisible ? password : '****'"
            class="input-field"
            :type="passwordVisible ? 'text' : 'password'"
            readonly
          />
          <input
            v-else
            v-model="newPassword"
            placeholder="Enter new password"
            class="input-field"
            type="password"
          />
      </div>
      <button v-if="!changingPassword" @click="togglePasswordVisibility">
        {{ passwordVisible ? 'Hide' : 'Show' }}
      </button>
      <button @click="toggleChangePassword">
        {{ changingPassword ? 'Cancel' : 'Change Password' }}
      </button>
      <button v-if="changingPassword" @click="saveNewPassword">Save New Password</button>
    </div>
    <ProfilePageJokle/>
  </div>
</template>

<script setup>
import ProfilePageJokle from '@/components/ProfilePageItem.vue'
import { useRouter } from 'vue-router'
import { Api } from '@/Api'
import { ref } from 'vue'

const password = ref('Loading...')
const passwordVisible = ref(false)
const newPassword = ref( '') // Store the new password to be set
const changingPassword = ref(false) // State to manage change password mode

const router = useRouter()

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value
  getCurrentUserPassword()
}

async function getCurrentUserPassword() {
  const res = await Api.get('/users/' + getCurrentUser())
  password.value = res.data.password
}

function saveNewPassword() {
  getCurrentUserPassword()
  if (newPassword.value !== password.value) {
    Api.patch('/users/' + getCurrentUser(), { password: newPassword.value }).then(() => {
      alert('Password changed successfully')
      changingPassword.value = false
      getCurrentUserPassword()
    }).catch((err) => {
      alert('Something went wrong: ' + err.message)
      changingPassword.value = false
    })
  } else {
    alert('Error: new password must be different from the old one.')
  }
}
function toggleChangePassword() {
  changingPassword.value = !changingPassword.value;
  if (!changingPassword.value) {
    // Reset newPassword when canceling change password
    newPassword.value = '';
  }
}
</script>

<script>
import Cookies from 'js-cookie'
import ProfilePageJokle from '@/components/ProfilePageItem.vue'

function getCurrentUser() {
  const user = Cookies.get('username')
  return user
}


export default {
  components: { ProfilePageJokle },
  data() {
    return {
      user: {}, // Store user data here
    }
  },

  name: 'Profile',
  methods: {
    navigateTo(page) {
      this.$router.push({ name: page });
    },
    saveUsername(){
      // Check if the input-username is the same as current username. Save new username if they are not the same
    }
  }
}
</script>