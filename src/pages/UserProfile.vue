<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green">

        </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card :user="user">

        </user-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  EditProfileForm,
  UserCard
} from '@/pages'

export default{
  components: {
    EditProfileForm,
    UserCard
  },
  data () {
    return {
      user: {}
    }
  },
  async created () {
    let self = this
    await this.$http.get('http://localhost:5000/getUser', {
      credentials: true
    }).then(data => {
      if (data.body.code !== 0 || data.body.user === null) {
        this.$router.push('/login')
      } else {
        self.user = data.body.user
      }
    })
  }
}
</script>
