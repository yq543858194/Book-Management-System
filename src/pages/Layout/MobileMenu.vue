<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <md-field>
        <label>Search</label>
        <md-input v-model="search" type="text"></md-input>
      </md-field>
    </li>
    <li><a href="/" class="dropdown-toggle" data-toggle="dropdown">
      <i class="material-icons">dashboard</i>
      <p>主页</p></a>
    </li>
    <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">notifications</i>
          <span class="notification">5条</span>
          <p>通知</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li v-for="(item, index) in notification"><a href="#">{{ item }}</a></li>
        </ul>
      </drop-down>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      search: null,
      selectedEmployee: null,
      employees: [
        'Jim Halpert',
        'Dwight Schrute',
        'Michael Scott',
        'Pam Beesly',
        'Angela Martin',
        'Kelly Kapoor',
        'Ryan Howard',
        'Kevin Malone'
      ],
      notification: [
        '您需要借阅的图书即将到期',
        '现有新的图书已上架，请及时查看',
        '您想要的图书即将上架'
      ]
    }
  }
}
</script>
