import _PersonPicker from './../src/components/PersonPicker'

const components = {
    PersonPicker: _PersonPicker
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

export const PersonPicker = output['PersonPicker']
export default output