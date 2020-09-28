
class Vue {

    constructor(options) {
        this.selectors = Object.keys(options.data)
        this.data = options.data
        if (Object.keys(options.methods).length > 0) {
            Object.keys(options.methods).forEach(e => {
                this[e] = options.methods[e]
                this.bindMethod(e)
            })
        }
        console.log('this', this)
        this.setDoms()

        // initialization
        this.render()
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

    update(key, value) {
        this.updateDom(key, value)
    }

    updateDom(key, value) {
        console.log('selector, text', key, value)
        this.rootDoms[key].forEach(e => {
            e.innerHTML = value
        })
    }
}
