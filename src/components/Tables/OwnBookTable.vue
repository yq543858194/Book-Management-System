<template>
  <div>
    <md-table v-model="books" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="书籍编号" v-if="!edit">{{ item.ISBN }}</md-table-cell>
        <md-table-cell md-label="书籍编号" v-else>
          <md-field>
            <label>ISBN</label>
            <md-input v-model="item.ISBN"></md-input>
          </md-field>
        </md-table-cell>
        <md-table-cell md-label="书名" v-if="!edit">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="书名" v-else>
          <md-field>
            <label>书名</label>
            <md-input v-model="item.name"></md-input>
          </md-field>
        </md-table-cell>
        <md-table-cell md-label="作者" v-if="!edit">{{ item.author }}</md-table-cell>
        <md-table-cell md-label="作者" v-else>
          <md-field>
            <label>作者</label>
            <md-input v-model="item.author"></md-input>
          </md-field>
        </md-table-cell>
        <md-table-cell md-label="简介" v-if="!edit">{{ item.description }}</md-table-cell>
        <md-table-cell md-label="简介" v-else>
          <md-field>
            <label>简介</label>
            <md-input v-model="item.description"></md-input>
          </md-field>
        </md-table-cell>
        <md-table-cell md-label="操作" v-if="edit">
          <md-button class="md-round md-info" @click="deleteBook(item.ISBN)" v-if="!item.isCreate && edit">删除书籍</md-button>
          <md-button class="md-round md-info" @click="createBook(item.ISBN)" v-if="item.isCreate">保存书籍</md-button>
          <md-button class="md-round md-info" @click="updateBook(item.ISBN)" v-if="edit && !item.isCreate">保存更改</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div class="md-layout">
      <div class="md-layout-item md-size-50 text-center">
        <md-button class="md-round md-info" @click="add()">添加书籍</md-button>
      </div>
      <div class="md-layout-item md-size-50 text-center">
        <md-button class="md-round md-info" @click="update()" ref="update">修改模式</md-button>
      </div>
    </div>
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
      books: [],
      edit: false,
      deleteBooks: []
    }
  },
  mounted () {
    let self = this
    if (self.$store.state.isSearch) {
      self.books = self.$store.state.books
      self.$store.dispatch('setIsSearch', false)
    } else {
      this.$store.dispatch('setLoading', true)
      this.$http.get('http://localhost:5000/getAllBooks').then(data => {
        this.$store.dispatch('setLoading', false)
        if (data.body.code === 0) {
          self.books = data.body.books
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
  },
  methods: {
    deleteBook (ISBN) {
      let self = this
      this.$store.dispatch('setLoading', true)
      self.$http.post('http://localhost:5000/deleteBook', {
        ISBN: ISBN
      }).then(data => {
        this.$store.dispatch('setLoading', false)
        if (data.body.code === 0) {
          self.$notify(
            {
              message: data.body.msg,
              icon: 'add_alert',
              horizontalAlign: 'top',
              verticalAlign: 'center',
              type: 'success'
            })
          this.books = this.books.filter(item => item.ISBN !== ISBN)
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
    },
    update () {
      this.edit = !this.edit
      if (!this.edit) {
        this.books = this.books.filter(item => item.ISBN !== '')
      }
    },
    add () {
      this.books.push({
        ISBN: '',
        name: '',
        author: '',
        description: '',
        isCreate: true
      })
      if (!this.edit) {
        this.edit = !this.edit
      }
    },
    createBook (ISBN) {
      let error = {
        code: 0,
        msg: ''
      }
      let self = this
      let book = this.books.filter(item => item.ISBN === ISBN)
      if (book[0].ISBN.length === 0) {
        error.code = -1
        error.msg += '图书编号不能为空<br>'
      }
      if (book[0].name.length === 0) {
        error.code = -1
        error.msg += '图书名不能为空<br>'
      }
      if (book[0].ISBN.length === 0) {
        error.code = -1
        error.msg += '图书作者不能为空<br>'
      }
      if (book[0].ISBN.length === 0) {
        error.code = -1
        error.msg += '图书简介不能为空<br>'
      }
      if (error.code === 0) {
        this.$store.dispatch('setLoading', true)
        this.$http.post('http://localhost:5000/createBook', {
          ISBN: book[0].ISBN,
          name: book[0].name,
          author: book[0].author,
          description: book[0].description
        }).then(data => {
          this.$store.dispatch('setLoading', false)
          if (data.body.code === 0) {
            self.$notify(
              {
                message: data.body.msg,
                icon: 'add_alert',
                horizontalAlign: 'top',
                verticalAlign: 'center',
                type: 'success'
              })
            book.isCreate = false
            self.edit = false
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
      } else {
        self.$notify(
          {
            message: error.msg,
            icon: 'add_alert',
            horizontalAlign: 'top',
            verticalAlign: 'center',
            type: 'danger'
          })
      }
    },
    updateBook (ISBN) {
      let error = {
        code: 0,
        msg: ''
      }
      let self = this
      let book = self.books.filter(item => item.ISBN === ISBN)
      if (book[0].ISBN.length === 0) {
        error.code = -1
        error.msg += '图书编号不能为空<br>'
      }
      if (book[0].name.length === 0) {
        error.code = -1
        error.msg += '图书名不能为空<br>'
      }
      if (book[0].ISBN.length === 0) {
        error.code = -1
        error.msg += '图书作者不能为空<br>'
      }
      if (book[0].ISBN.length === 0) {
        error.code = -1
        error.msg += '图书简介不能为空<br>'
      }
      if (error.code === 0) {
        this.$store.dispatch('setLoading', true)
        self.$http.post('http://localhost:5000/updateBook', {
          ISBN: book[0].ISBN,
          name: book[0].name,
          author: book[0].author,
          description: book[0].description
        }).then(data => {
          this.$store.dispatch('setLoading', false)
          if (data.body.code === 0) {
            self.$notify(
              {
                message: data.body.msg,
                icon: 'add_alert',
                horizontalAlign: 'top',
                verticalAlign: 'center',
                type: 'success'
              })
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
      } else {
        self.$notify(
          {
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
