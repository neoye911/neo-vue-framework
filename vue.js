
class Vue {

    constructor(options) {
        this.selectors = Object.keys(options)
        this.options = options
        
        this.setDoms()

        // initialization
        this.render()
    }

    setDoms() {
        this.rootDoms = {}
        this.selectors.forEach(e => {
            this.rootDoms[e] = document.querySelectorAll(`[${e}]`)
        })
    }

    render() {
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
