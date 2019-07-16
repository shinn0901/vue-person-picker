<template>
  <div id="app">
    <div @click="show=!show">选人</div>
    <person-picker v-model="show" :person="person" @picked="picked" @cancel="cancel"></person-picker>
  </div>
</template>

<script>
import PersonPicker from './components/PersonPicker'
import person from './assets/data.json'

export default {
  name: 'app',
  data () {
    return {
      show: false,
      person: person.body.officeList[0]
    }
  },
  methods: {
    cancel () {
      console.log('cancel')
    },
    picked (arr) {
      console.log(arr)
    }
  },
  components: {
    PersonPicker
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
