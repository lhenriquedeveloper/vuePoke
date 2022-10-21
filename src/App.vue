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
 }
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
        <img :src="selectedPokemon.sprites.front_default" :alt="selectedPokemon.species.name">
        <p>
        </p>
      </div>

      <div class="actions">
        <button
          class="btn btn--outline-gray"
          @click="dialogState = false"
        >
          Close
        </button>
      </div>
    </div>
  </GDialog>
</template>

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