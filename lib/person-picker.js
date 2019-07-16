import Vue from 'vue'
import PersonPicker from './../src/components/PersonPicker'

const components = {
    PersonPicker
}

Object.keys(components).map(name => {
    Vue.component(name, components[name])
})

export default components