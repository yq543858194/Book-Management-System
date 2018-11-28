<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">用户信息</h4>
        <p class="category">完善您的个人信息</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>用户名</label>
              <md-input v-model="username" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-67">
            <md-field>
              <label>密码</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>邮箱</label>
              <md-input v-model="email" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>电话号码</label>
              <md-input v-model="phone" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-34">
            <md-field>
              <label>昵称</label>
              <md-input v-model="name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>所在学校</label>
              <md-input v-model="school" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>职位</label>
              <md-input v-model="work" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label>个人简介</label>
              <md-textarea v-model="description"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="updateUser()">更新用户信息</md-button>
          </div>
        </div>

      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import Crypto from 'crypto-js'
export default {
  name: 'edit-profile-form',
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      username: this.$store.state.username,
      email: this.$store.state.email,
      password: '',
      phone: this.$store.state.phone,
      school: this.$store.state.school,
      name: this.$store.state.name,
      work: this.$store.state.work,
      description: this.$store.state.description
    }
  },
  methods: {
    updateUser() {
      this.$http.post('http://localhost:5000/updateUser',{
        username: this.username,
        password: Crypto.MD5(this.password).toString(),
        name: this.name,
        school: this.school,
        email: this.email,
        phone: this.phone,
        work: this.work,
        description: this.description
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
          this.$store.dispatch('setUserProfile', data.body.user1);
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

</script>
<style>

</style>
