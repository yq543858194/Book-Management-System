<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">用户借阅列表</h4>
            <p class="category">这里包含用户已经借阅的图书信息</p>
          </md-card-header>
          <md-card-content>
            <own-book-table table-header-color="green"></own-book-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  OwnBookTable
} from '@/components'

export default{
  components: {
    OwnBookTable
  },
  created () {
    this.$http.get('http://localhost:5000/getUser', {
      credentials: true
    }).then(data => {
      if (data.body.code !== 0 || data.body.user === null) {
        this.$router.push('/login')
      } else if (data.body.user.adminCode === '0') {
        this.$router.push('/table')
      }
    })
  }
}
</script>
