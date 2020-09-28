
class Vue {

    constructor(options) {
        this.selectors = Object.keys(options.data)
        this.data = options.data
        
        this.createMethod(options.methods)
        console.log('this', this)
        this.setDoms()

        // initialization
        this.render()
    }

    createMethod(methods) {
        if (Object.keys(methods).length > 0) {
            Object.keys(methods).forEach(e => {
                this[e] = methods[e]
                this.bindMethod(e)
            })
        }
    }

    bindMethod(methodKey) {
        let bindNodes = document.querySelectorAll(`[click='${methodKey}']`) || []
        bindNodes.forEach(e => {
            e.addEventListener('click', this[methodKey].bind(this))
        })
    }

    setDoms() {
        this.rootDoms = {}
        this.selectors.forEach(e => {
            this.rootDoms[e] = document.querySelectorAll(`[${e}]`)
        })
    }

    render() {
        this.selectors.forEach(e => {
            this.updateDom(e, this.data[e])
        })
    }

    // single direction bind
    update(key) {
        const node = document.querySelector('#'+key)
        this.updateDom(node.getAttribute('v-bind'), node.value)
    }

    updateDom(key, value) {
        console.log('selector, text', key, value)
        this.rootDoms[key].forEach(e => {
            e.innerHTML = value
        })
    }
}
