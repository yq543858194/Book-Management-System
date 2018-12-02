<template>
  <div>
    <md-table v-model="books" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="书籍编号">{{ item.ISBN }}</md-table-cell>
        <md-table-cell md-label="书名">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="作者">{{ item.author }}</md-table-cell>
        <md-table-cell md-label="简介">{{ item.description }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'simple-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selected: [],
      books: []
    }
  },
  mounted () {
    let self = this
    if (self.$store.state.isSearch) {
      self.books = self.$store.state.books
      self.$store.dispatch('setIsSearch', false)
    } else {
      this.$http.get('http://localhost:5000/getAllBooks').then(data => {
        if (data.body.code === 0) {
          this.books = data.body.books
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
