<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{$route.name}}</h3>
        <md-progress-spinner :md-diameter="20" :md-stroke="3" md-mode="indeterminate" v-if="$store.state.loading"></md-progress-spinner>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="searchTypeContainer">
            <md-field>
              <label for="searchType">搜索类型</label>
              <md-select v-model="searchType" id="searchType">
                <md-option value="ISBN">ISBN</md-option>
                <md-option value="name">图书名</md-option>
                <md-option value="author">图书作者</md-option>
                <md-option value="description">图书描述</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-autocomplete">
            <md-field>
              <label for="search">搜索</label>
              <md-input v-model="search" @keyup.enter="searchAction()"></md-input>
            </md-field>
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
      search: '',
      employees: [
        'JAVA EE框架开发',
        'JAVA核心技术',
        'BootStrap从入门到精通'
      ],
      searchType: 'ISBN'
    }
  },
  methods: {
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    logout () {
      let self = this
      this.$store.dispatch('setLoading', true)
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
        this.$store.dispatch('setLoading', false)
      })
    },
    searchAction () {
      let error = {
        code: 0,
        msg: ''
      }
      if (this.search.length === 0) {
        error.code = -1
        error.msg += '请输入搜索关键字'
      }
      if (this.searchType.length === 0) {
        error.code = -1
        error.msg += '请选择搜索类型关键字'
      }
      if (error.code === 0) {
        this.$store.dispatch('setLoading', true)
        this.$http.post('http://localhost:5000/searchBook', {
          type: this.searchType,
          keyword: this.search
        }).then(data => {
          this.$store.dispatch('setLoading', false)
          this.$notify({
            message: data.body.msg,
            icon: 'add_alert',
            horizontalAlign: 'top',
            verticalAlign: 'center',
            type: 'success'
          })
          console.log(this.$route.path)
          this.$store.dispatch('setIsSearch', true)
          this.$store.dispatch('setBooks', data.body.books)
          if (this.$route.path === '/bookList' || this.$route.path === '/table') {
            this.$router.push({ name: 'blank', params: { nextRoute: this.$route.path } })
          } else {
            this.$router.replace('/table')
          }
        })
      } else {
        this.$notify({
          message: error.msg,
          icon: 'add_alert',
          horizontalAlign: 'top',
          verticalAlign: 'center',
          type: 'danger'
        })
      }
    }
  }
}
</script>

<style lang="css">
  .searchTypeContainer {
    width: 100px;
    display: inline-block;
    margin-right: 20px;
  }
</style>
