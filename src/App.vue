<script>
import HeaderTop from './components/HeaderTop.vue'
import axios from 'axios';

export default {
  name:'App',
  components: {
    HeaderTop,
  },

  data() {
    return {
      pokemons: [],
      search: '',
      dialogState: false,
      selectedPokemon: null,
    }
  },

  mounted() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=148')
      .then(response => {
        this.pokemons = response.data.results
      })
  },

  methods: {
    setIsOpen(value) {
      this.showModal = value
    },
    getPokemonImg(pokemon){
      const pokeid = Number(pokemon.url.split('/')[6]);
      const ImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeid}.png`;
      return ImgUrl;
  }, 
  getPokemonId(pokemon){
      const pokeid = Number(pokemon.url.split('/')[6]);
      return pokeid;
  }, 
  getFormatedName(pokemon){
    const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    return pokeName;
  },
 showPokemon(id){
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        this.selectedPokemon = response.data
        this.dialogState = true
      })
 },
},

computed:{
  filteredPokemons(){
    return this.pokemons.filter(pokemon => {
      return pokemon.name.includes(this.search.toLowerCase())
    })
  }
}
}
</script>


<template>
  <HeaderTop />
  <div class="main">  
    <div class="pokemon-container">
      <div class="search-area">    
        <input type="text" placeholder="Search for a Pokemon" v-model="search">
        <img id="search-icon" src="./assets/search.svg" alt="SearchIcon">
      </div>
      <div class="pokemon-card" v-for="pokemon in filteredPokemons" :key="pokemon.name">
        <img :src="`${getPokemonImg(pokemon)}`" :alt="pokemon.name">
        <p> N°{{getPokemonId(pokemon)}}</p>
        <span @click="showPokemon(getPokemonId(pokemon))">{{ getFormatedName(pokemon) }}</span>
      </div>
    </div>
  </div>
  <GDialog v-model="dialogState" max-width="500">
    <div class="wrapper">
      <div class="content">
        <div class="title">{{selectedPokemon.species.name}}</div>
        <img class="pokecard-img" :src="selectedPokemon.sprites.front_default" :alt="selectedPokemon.species.name">
        <div 
        v-for="type in selectedPokemon.types"
        :key="type.slot"
        :class="`poketype--${type.type.name}`"
        ><span class="s-infopoke">{{type.type.name}}</span>
      </div>
        <div class="pokeinfo">
          <h3 class="h-infopoke">Height: <span class="spanpoke">{{(selectedPokemon.height + 2.74).toFixed(2)}} cm</span></h3>
          <h3 class="h-infopoke">Weight: <span class="spanpoke">{{(selectedPokemon.weight + 0.45359237).toFixed(0)}} kgs</span></h3>
        </div>
        <div class="moves-area">
          <h2>Pokemon Abillities</h2>
          <table>
            <tr>
              <th>Move</th>
              <th>Level</th>
            </tr>
            <tr v-for="move in selectedPokemon.moves" :key="move.move.name">
              <td>{{move.move.name}}</td>
              <td>{{move.version_group_details[0].level_learned_at}}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="actions">
        <button
          class="close-btn"
          @click="dialogState = false"
        >
          Close
        </button>
      </div>
    </div>
  </GDialog>
</template>

<!-- General Page Style  -->
<style lang="sass">
*
  padding: 0 
  margin: 0
body
  background-color: #242424
  font-family: 'Roboto', sans-serif
  a
    text-decoration: none
    transition: 0.2s opacity
    color: #646cff
    a:hover
        opacity: 0.7
        color: #535bf2
    </style>
  
<!-- Content Page Style -->
  <style lang="sass">
  .search-area
    width: 100%
    display: flex
    justify-content: center
    align-content: center
    margin-top: 20px
    margin-bottom: 20px
  input
    width: 300px
    height: 40px
    border: none
    border-radius: 5px
    padding: 0 10px
    font-size: 16px
    outline: none
    box-shadow: 0 0 5px rgba(0,0,0,0.2)
    border: 1px solid #fff
  #search-icon
    width: 35px
    height: 35px
    margin-left: 10px
    cursor: pointer
.pokemon-container
  display: flex
  flex-wrap: wrap
  justify-content: center
  margin-top: 70px
  .pokemon-card
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    width: 200px
    height: 200px
    background-color: #f3f3f3
    color: #333
    margin: 10px
    border-radius: 5px
    box-shadow: 0 0 10px rgba(0,0,0,0.2)
    img
      width: 100px
      margin-bottom: 10px
    p
      font-size: 16px
      font-weight: 500
      margin-bottom: 5px
    span
      font-size: 1.2em
      font-weight: 500
      cursor: pointer
      transition: 0.2s opacity
      &:hover
        opacity: 0.7
        color: red
</style>

<!-- Dialog Style -->
<style scoped>
.wrapper {
  color: #000;
}
.content {
  padding: 20px;
}
.title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>

<!-- Content Dialog Style -->
<style lang="sass">
.pokecard-img
  width: 100%
  height: 100%
  margin-bottom: 20px

.pokeinfo
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin-bottom: 20px
  h3
    font-size: 1.2em
    font-weight: 500
    margin-bottom: 10px
  .spanpoke
    font-size: 0.8em
    font-weight: 500
    color: #646cff
.moves-area
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center 
  margin-bottom: 20px 
  h2
    font-size: 1.2em
    font-weight: bold
    margin-bottom: 10px
  table
    border-collapse: collapse
    width: 100%
    th
      border: 1px solid #ddd
      padding: 8px
      text-align: center
    td
      border: 1px solid #ddd
      padding: 8px
      text-align: center
.close-btn
  background-color: #fff
  border: none
  border-radius: 5px
  padding: 10px 20px
  font-size: 16px
  cursor: pointer
  box-shadow: 0 0 5px rgba(0,0,0,0.2)
  border: 1px solid #fff
  transition: 0.2s opacity
  &:hover
    opacity: 0.7
    color: red

</style>
<!-- Pokemon Color Type -->
<style lang="sass">
.poketype
  &--bug
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #729f3f 50%, #729f3f 50%)
    background: -ms-linear-gradient(180deg, #729f3f 50%, #729f3f 50%)
    background: -moz-linear-gradient(180deg, #729f3f 50%, #729f3f 50%)
    background: -o-linear-gradient(180deg, #729f3f 50%, #729f3f 50%)
    background: linear-gradient(180deg, #729f3f 50%, #729f3f 50%)
    background-color: #729f3f
    color: #fff
  &--dark
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -ms-linear-gradient(180deg, #707070 50%, #707070 50%)
    background: -moz-linear-gradient(180deg, #707070 50%, #707070 50%)
    background: -o-linear-gradient(180deg, #707070 50%, #707070 50%)
    background: -webkit-linear-gradient(180deg, #707070 50%, #707070 50%)
    background: linear-gradient(180deg, #707070 50%, #707070 50%)
    background-color: #707070
    color: #fff
  &--dragon
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)
    background: -ms-linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)
    background: -moz-linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)
    background: -o-linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)
    background: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)
    background-color: #53a4cf
    color: #fff
  &--electric
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #eed535 50%, #eed535 50%)
    background: -ms-linear-gradient(180deg, #eed535 50%, #eed535 50%)
    background: -moz-linear-gradient(180deg, #eed535 50%, #eed535 50%)
    background: -o-linear-gradient(180deg, #eed535 50%, #eed535 50%)
    background: linear-gradient(180deg, #eed535 50%, #eed535 50%)
    background-color: #eed535
    color: #212121
  &--fairy
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #fdb9e9 50%, #fdb9e9 50%)
    background: -ms-linear-gradient(180deg, #fdb9e9 50%, #fdb9e9 50%)
    background: -moz-linear-gradient(180deg, #fdb9e9 50%, #fdb9e9 50%)
    background: -o-linear-gradient(180deg, #fdb9e9 50%, #fdb9e9 50%)
    background: linear-gradient(180deg, #fdb9e9 50%, #fdb9e9 50%)
    background-color: #fdb9e9
    color: #212121
  &--fighting
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #d56723 50%, #d56723 50%)
    background: -ms-linear-gradient(180deg, #d56723 50%, #d56723 50%)
    background: -moz-linear-gradient(180deg, #d56723 50%, #d56723 50%)
    background: -o-linear-gradient(180deg, #d56723 50%, #d56723 50%)
    background: linear-gradient(180deg, #d56723 50%, #d56723 50%)
    background-color: #d56723
    color: #fff
  &--fire
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #fd7d24 50%, #fd7d24 50%)
    background: -ms-linear-gradient(180deg, #fd7d24 50%, #fd7d24 50%)
    background: -moz-linear-gradient(180deg, #fd7d24 50%, #fd7d24 50%)
    background: -o-linear-gradient(180deg, #fd7d24 50%, #fd7d24 50%)
    background: linear-gradient(180deg, #fd7d24 50%, #fd7d24 50%)
    background-color: #fd7d24
    color: #fff
  &--flying
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)
    background: -ms-linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)
    background: -moz-linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)
    background: -o-linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)
    background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)
    background-color: #3dc7ef
    color: #212121
  &--ghost
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #7b62a3 50%, #7b62a3 50%)
    background: -ms-linear-gradient(180deg, #7b62a3 50%, #7b62a3 50%)
    background: -moz-linear-gradient(180deg, #7b62a3 50%, #7b62a3 50%)
    background: -o-linear-gradient(180deg, #7b62a3 50%, #7b62a3 50%)
    background: linear-gradient(180deg, #7b62a3 50%, #7b62a3 50%)
    background-color: #7b62a3
    color: #fff
  &--grass
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #9bcc50 50%, #9bcc50 50%)
    background: -ms-linear-gradient(180deg, #9bcc50 50%, #9bcc50 50%)
    background: -moz-linear-gradient(180deg, #9bcc50 50%, #9bcc50 50%)
    background: -o-linear-gradient(180deg, #9bcc50 50%, #9bcc50 50%)
    background: linear-gradient(180deg, #9bcc50 50%, #9bcc50 50%)
    background-color: #9bcc50
    color: #212121
  &--ground
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)
    background: -ms-linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)
    background: -moz-linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)
    background: -o-linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)
    background: linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)
    background-color: #f7de3f
    color: #212121
  &--ice
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #51c4e7 50%, #51c4e7 50%)
    background: -ms-linear-gradient(180deg, #51c4e7 50%, #51c4e7 50%)
    background: -moz-linear-gradient(180deg, #51c4e7 50%, #51c4e7 50%)
    background: -o-linear-gradient(180deg, #51c4e7 50%, #51c4e7 50%)
    background: linear-gradient(180deg, #51c4e7 50%, #51c4e7 50%)
    background-color: #51c4e7
    color: #212121
  &--normal
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #a4acaf 50%, #a4acaf 50%)
    background: -ms-linear-gradient(180deg, #a4acaf 50%, #a4acaf 50%)
    background: -moz-linear-gradient(180deg, #a4acaf 50%, #a4acaf 50%)
    background: -o-linear-gradient(180deg, #a4acaf 50%, #a4acaf 50%)
    background: linear-gradient(180deg, #a4acaf 50%, #a4acaf 50%)
    background-color: #a4acaf
    color: #212121
  &--poison
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #b97fc9 50%, #b97fc9 50%)
    background: -ms-linear-gradient(180deg, #b97fc9 50%, #b97fc9 50%)
    background: -moz-linear-gradient(180deg, #b97fc9 50%, #b97fc9 50%)
    background: -o-linear-gradient(180deg, #b97fc9 50%, #b97fc9 50%)
    background: linear-gradient(180deg, #b97fc9 50%, #b97fc9 50%)
    background-color: #b97fc9
    color: #fff
  &--psychic
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #f366b9 50%, #f366b9 50%)
    background: -ms-linear-gradient(180deg, #f366b9 50%, #f366b9 50%)
    background: -moz-linear-gradient(180deg, #f366b9 50%, #f366b9 50%)
    background: -o-linear-gradient(180deg, #f366b9 50%, #f366b9 50%)
    background: linear-gradient(180deg, #f366b9 50%, #f366b9 50%)
    background-color: #f366b9
    color: #fff
  &--rock
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #a38c21 50%, #a38c21 50%)
    background: -ms-linear-gradient(180deg, #a38c21 50%, #a38c21 50%)
    background: -moz-linear-gradient(180deg, #a38c21 50%, #a38c21 50%)
    background: -o-linear-gradient(180deg, #a38c21 50%, #a38c21 50%)
    background: linear-gradient(180deg, #a38c21 50%, #a38c21 50%)
    background-color: #a38c21
    color: #fff
  &--steel
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #9eb7b8 50%, #9eb7b8 50%)
    background: -ms-linear-gradient(180deg, #9eb7b8 50%, #9eb7b8 50%)
    background: -moz-linear-gradient(180deg, #9eb7b8 50%, #9eb7b8 50%)
    background: -o-linear-gradient(180deg, #9eb7b8 50%, #9eb7b8 50%)
    background: linear-gradient(180deg, #9eb7b8 50%, #9eb7b8 50%)
    background-color: #9eb7b8
    color: #212121
  &--water
    border: 1px solid #333
    border-radius: 5px
    font-style: italic
    align-content: center
    width: 50px
    height: 20px
    margin: 5px
    padding: 5px
    background: -webkit-linear-gradient(180deg, #4592c4 50%, #4592c4 50%)
    background: -ms-linear-gradient(180deg, #4592c4 50%, #4592c4 50%)
    background: -moz-linear-gradient(180deg, #4592c4 50%, #4592c4 50%)
    background: -o-linear-gradient(180deg, #4592c4 50%, #4592c4 50%)
    background: linear-gradient(180deg, #4592c4 50%, #4592c4 50%)
    background-color: #4592c4
    color: #fff
</style>