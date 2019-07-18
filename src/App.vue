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
      person: person
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

<style lang="scss"></style>
