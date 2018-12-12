<template>

</template>

<script>
export default {
  name: 'blank',
  created () {
    this.$router.push(this.$route.params.nextRoute)
  }
}
</script>

<style scoped>

</style>
