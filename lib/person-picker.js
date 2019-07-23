import PersonPicker from './../src/components/PersonPicker'

const components = {
    install(Vue) {
        Vue.component(PersonPicker.name, PersonPicker)
    }
}
if (window && window.Vue) {
    window[PersonPicker.name] = PersonPicker
}
export default components