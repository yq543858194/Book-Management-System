<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{$route.name}}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete">
            <md-autocomplete class="search" v-model="selectedEmployee" :md-options="employees">
              <label>搜索</label>
            </md-autocomplete>
          </div>
          <md-list>
            <md-list-item to="/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">主页</p>
            </md-list-item>

            <md-list-item @click="logout()">
              <i class="material-icons">exit_to_app</i>
              <p class="hidden-lg hidden-md">退出登录</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>

  </md-toolbar>
</template>

<script>

export default{
  data () {
    return {
      selectedEmployee: null,
      employees: [
        'JAVA EE框架开发',
        'JAVA核心技术',
        'BootStrap从入门到精通'
      ]
    }
  },
  methods: {
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    logout () {
      let self = this
      this.$http.get('http://localhost:5000/logout', {
        credentials: true
      }).then(data => {
        if (data.body.code === 0) {
          self.$notify(
            {
              message: data.body.msg,
              icon: 'add_alert',
              horizontalAlign: 'top',
              verticalAlign: 'center',
              type: 'success'
            })
          self.$router.push('/login')
        } else {
          self.$notify(
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

<style lang="css">
</style>
