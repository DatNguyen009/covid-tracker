<template>
  <div id="nav">
    <nav class="navbar navbar-light bg-light" style="margin: 2rem 0">
      <img src="../assets/logo.png" alt="logo" width="100" />
      <p>Dat nguyen</p>
      <img src="../assets/logo.png" alt="logo" width="100" />
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>