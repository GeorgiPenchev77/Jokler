<template>

    <div class="greeting">
      <h1>Welcome to your profile, {{getCurrentUser()}}!</h1>
    </div>

    <div class="actions">

      <div class="title">
      Password Settings:
      </div>

      <div class="password-input">
        <input
            v-if="!changingPassword"
            v-model="currentPassword"
            :placeholder="passwordVisible ? password : '****'"
            class="input-field password-input"
            :type="passwordVisible ? 'text' : 'password'"
            readonly
          />
          <input
            v-else
            v-model="newPassword"
            placeholder="Enter new password"
            class="input-field password-input"
            type="password"
          />
      </div>
      <button class="btn" v-if="!changingPassword" @click="togglePasswordVisibility">
        {{ passwordVisible ? 'Hide' : 'Show' }}
      </button>
      <button class="btn" @click="toggleChangePassword">
        {{ changingPassword ? 'Cancel' : 'Change Password' }}
      </button>
      <button class="btn" v-if="changingPassword" @click="saveNewPassword">
        Save New Password
      </button>
    </div>

    <ProfilePageJokle/>

</template>

<script setup>
import ProfilePageJokle from '@/components/ProfilePageItem.vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { Api } from '@/Api'
import { ref } from 'vue'

const password = ref('Loading...')
const passwordVisible = ref(false)
const newPassword = ref('') // Store the new password to be set
const changingPassword = ref(false) // State to manage change password mode

const router = useRouter()

if (!getCurrentUser()) {
  router.push('/login')
}

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value
  getCurrentUserPassword()
}

function getCurrentUser() {
  const user = Cookies.get('username')
  return user
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
export default {
  components: { ProfilePageJokle },
  data() {
    return {
      user: {}, // Store user data here
    }
  },
  mounted() {

  },
  name: 'Profile',
  methods: {
    navigateTo(page) {
      this.$router.push({ name: page })
    }
  }
}
</script>

<style scoped>
.greeting {
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  font-style: italic;
  padding: 1%;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 40%;
  margin-left: 1%;
}

.title {
  color: #00b8d9;
  font-size: 18px;
  font-weight: bold;
  margin-left: 5%;
}

.password-input {
  gap: 15px;
  padding: 5px;
  background-color: #ede2e2;
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2% auto;
  width: 75%;
}

.input-field {
  width: 100%;
  display: inherit;
  color:  black;
}

.btn {
  padding: 8px;
  background-color: #00b8d9;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 50%;
  align-self: center;
}

</style>

