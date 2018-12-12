<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">图书列表</h4>
            <p class="category">这里包含可以借阅的图书信息</p>
          </md-card-header>
          <md-card-content>
            <simple-table table-header-color="green"></simple-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SimpleTable,
  OrderedTable
} from '@/components'

export default{
  components: {
    OrderedTable,
    SimpleTable
  },
  created () {
    this.$store.dispatch('setLoading', true)
    this.$http.get('http://localhost:5000/getUser', {
      credentials: true
    }).then(data => {
      this.$store.dispatch('setLoading', false)
      if (data.body.code !== 0 || data.body.user === null) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
