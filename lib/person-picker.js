import PersonPicker from './../src/components/PersonPicker'

const components = {
    PersonPicker
}
let output = {}
Object.keys(components).map(name => {
    // Vue.component(name, components[name])
    let component = {
        install(Vue) {
            Vue.component(name, components[name])
        }
    }
    if (window && window.Vue) {
        window[name] = component
    }
    output[name] = component
})

export default output