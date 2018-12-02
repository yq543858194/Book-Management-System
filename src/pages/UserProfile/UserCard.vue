<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
       <img class="img" :src="avatar">
    </div>

    <md-card-content>
      <h6 class="category text-gray">{{ $store.state.school }} / {{ $store.state.work }}</h6>
      <h4 class="card-title">{{ $store.state.name }}</h4>
      <p class="card-description">
          {{ $store.state.description }}
      </p>
      <input type="file" style="display: none;" ref="avatarUpload">
      <md-button class="md-round md-info" @click="fileChange()">更换头像</md-button>
      <md-button class="md-round md-info" @click="fileUpload()">上传头像</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: 'user-card',
  computed: {
    avatar () {
      return `http://localhost:5000/${this.$store.state.avatar !== '请上传' ? this.$store.state.avatar : 'faces/marc.jpg'}`
    }
  },
  methods: {
    fileChange () {
      console.log(this.$refs.avatarUpload.firstChild.firstChild.innerHTML)
      this.$refs.avatarUpload.click()
    },
    fileUpload () {
      if (this.$refs.avatarUpload.files[0] !== undefined) {
        let formData = new FormData()
        formData.append('avatar', this.$refs.avatarUpload.files[0])
        formData.append('username', this.$store.state.username)
        this.$http.post('http://localhost:5000/uploadAvatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          credentials: true
        }).then(data => {
          if (data.body.code === 0) {
            this.$notify(
              {
                message: data.body.msg,
                icon: 'add_alert',
                horizontalAlign: 'top',
                verticalAlign: 'center',
                type: 'success'
              })
            this.$store.dispatch('setAvatarName', data.body.avatarName)
            this.$router.push('/user')
          } else {
            this.$notify(
              {
                message: data.body.msg,
                icon: 'add_alert',
                horizontalAlign: 'top',
                verticalAlign: 'center',
                type: 'danger'
              })
          }
        })
      }
    }
  }
}

</script>
<style>

</style>
