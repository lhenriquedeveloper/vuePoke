<script>
export default {
  name: 'HeaderTop',
  }
</script>

<template>
  <header>
    <img id="pokelogo" src="../assets/pokeball.svg" alt="">
    <h1>Welcome to<span> PokeVue</span></h1>
    <img id="vuelogo" src="../assets/vue.svg" alt="">
  </header>
</template>

<style lang="sass" scoped>
header
  display: flex
  place-items: center
  justify-content: center
  text-align: center
  background-color: #f3f3f3
  color: #333
  height: 70px
  top: 0
  position: fixed
  width: 100%
  font-size: 0.8em
  line-height: 1.1
  border-radius: 0 0 5px 5px
  #pokelogo
    width: 50px
    margin: 10px
  #vuelogo
    width: 50px
    margin: 10px
  span
    color: #646cff
    font-style: italic
</style>
