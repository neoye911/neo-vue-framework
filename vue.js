
class Vue {

    constructor(options) {
        this.selectors = Object.keys(options)
        this.options = options
        
        this.setDoms()
    }

    setDoms() {
        this.rootDoms = {}
        this.selectors.forEach(e => {
            const dom = document.querySelectorAll(`[${e}]`)
            this.rootDoms[e] = dom
        })
    }

    created() {
        this.selectors.forEach(e => {
            this.updateDom(e, this.options[e])
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
