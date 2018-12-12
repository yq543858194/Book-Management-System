import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    name: '',
    school: '',
    work: '',
    avatar: '',
    description: '',
    adminCode: '',
    isSearch: false,
    books: [],
    updateActiveTemplateId: '',
    loading: false
  },
  mutations: {
    setUserProfile (state, user) {
      state.id = user.id
      state.username = user.username
      state.password = user.password
      state.email = user.email
      state.phone = user.phone
      state.name = user.name
      state.school = user.school
      state.work = user.work
      state.avatar = user.avatar
      state.description = user.description
      state.adminCode = user.adminCode
    },
    setAvatarName (state, name) {
      state.avatar = name
    },
    setIsSearch (state, name) {
      state.isSearch = name
    },
    setBooks (state, name) {
      state.books = name
    },
    setUpdateActiveTemplateId (state, name) {
      state.updateActiveTemplateId = name
    },
    setLoading (state, name) {
      state.loading = name
    }
  },
  actions: {
    setUserProfile (ctx, user) {
      ctx.commit('setUserProfile', user)
    },
    setAvatarName (ctx, name) {
      ctx.commit('setAvatarName', name)
    },
    setIsSearch (ctx, name) {
      ctx.commit('setIsSearch', name)
    },
    setBooks (ctx, name) {
      ctx.commit('setBooks', name)
    },
    setUpdateActiveTemplateId (ctx, name) {
      ctx.commit('updateActiveTemplateId', name)
    },
    setLoading (ctx, name) {
      ctx.commit('setLoading', name)
    }
  }
})
