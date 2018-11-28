<template>
  <div class="login-wrap">
    <div class="login-html">
      <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">登录</label>
      <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">注册</label>
      <div class="login-form">
        <div class="sign-in-htm">
          <div class="group">
            <md-field>
                <label style="color: #fff !important;">用户名</label>
                <md-input v-model="username"></md-input>
              </md-field>
          </div>
          <div class="group">
            <md-field>
              <label style="color: #fff !important;">密码</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>
          <div class="group">
            <input id="check" type="checkbox" class="check" checked>
            <label for="check"><span class="icon"></span> 保持登录</label>
          </div>
          <div class="group">
            <md-button class="md-round md-info" style="width: 100%" @click="login()">登录</md-button>
          </div>
          <div class="hr"></div>
        </div>
        <div class="sign-up-htm">
          <div class="group">
            <md-field>
              <label style="color: #fff !important;">用户名</label>
              <md-input v-model="rusername"></md-input>
            </md-field>
          </div>
          <div class="group">
            <md-field>
              <label style="color: #fff !important;">密码</label>
              <md-input v-model="rpassword" type="password"></md-input>
            </md-field>
          </div>
          <div class="group">
            <md-field>
              <label style="color: #fff !important;">确认密码</label>
              <md-input v-model="repassword" type="password"></md-input>
            </md-field>
          </div>
          <div class="group">
            <md-field>
              <label style="color: #fff !important;">邮箱</label>
              <md-input v-model="remail" type="email"></md-input>
            </md-field>
          </div>
          <div class="group">
            <md-switch v-model="isAdmin">注册为管理员</md-switch>
          </div>
          <div class="group" v-if="isAdmin">
            <md-field>
              <label style="color: #fff !important;">管理员号码</label>
              <md-input v-model="radminCode" type="email"></md-input>
            </md-field>
          </div>
          <div class="group">
            <md-button class="md-round md-info" style="width: 100%" @click="register()">注册</md-button>
          </div>
          <div class="hr"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cypto from 'crypto-js'
  export default {
      name: "login",
      data () {
        return {
          username: '',
          password: '',
          rusername: '',
          rpassword: '',
          repassword: '',
          radminCode: '',
          remail: '',
          isAdmin: false
        }
      },
    methods: {
      register() {
          let message = {code: 0,msg: ''}
          if (this.repassword !== this.rpassword) {
            message.msg += '两次输入密码不一致<br>'
            message.code = -1
          }
          if (this.rpassword === '') {
            message.msg += '密码为必填项<br>'
            message.code = -1
          }
          if (this.rusername === '') {
            message.msg += '用户名为必填项<br>'
            message.code = -1
          }
          if (this.remail === '') {
            message.msg += '邮箱为必填项<br>'
            message.code = -1
          }
          if (message.code === 0) {
            this.$http.post('http://localhost:5000/register',{
              rusername: this.rusername,
              rpassword: cypto.MD5(this.rpassword).toString(),
              remail: this.remail,
              radminCode: this.radminCode
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
            });
          } else {
            this.$notify(
              {
                message: message.msg,
                icon: 'add_alert',
                horizontalAlign: 'top',
                verticalAlign: 'center',
                type: 'danger'
              })
          }
        },
      login() {
        let message = {code: 0,msg: ""}
        if (this.username === '') {
          message.code = -1;
          message.msg += '用户名不能为空<br>'
        }
        if (this.password === '') {
          message.code = -1;
          message.msg += '密码不能为空<br>'
        }
        if (message.code === 0) {
          this.$http.post('http://localhost:5000/login', {
            username: this.username,
            password: cypto.MD5(this.password).toString()
          },{
            credentials: true
          }).then(data => {
            this.$notify(
              {
                message: data.body.msg,
                icon: 'add_alert',
                horizontalAlign: 'top',
                verticalAlign: 'center',
                type: 'info'
              });
            this.$store.dispatch('setUserProfile', data.body.user)
            this.$router.push('/table');
          })
        } else {
          this.$notify(
            {
              message: message.msg,
              icon: 'add_alert',
              horizontalAlign: 'top',
              verticalAlign: 'center',
              type: 'info'
            })
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../assets/scss/default.scss';
  @import '../assets/scss/normalize.scss';
  @import '../assets/scss/styles.scss';

  .md-switch {
    display: flex;
  }
</style>
