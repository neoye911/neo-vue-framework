
class Vue {

    constructor(options) {
        this.selectors = Object.keys(options.data)
        this.data = options.data
        
        this.setMethods(options.methods)
        console.log('this', this)
        this.setDoms()

        // initialization
        this.render()
    }

    setMethods(methods) {
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
            this.proxyData(e)
            this.updateDom(e, this.data[e])
        })
    }

    updateDom(key, value) {
        console.log('selector, text', key, value)
        this.rootDoms[key].forEach(e => {
            e.innerHTML = value
        })
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get: function() {
                console.log('Getter', key, this.data[key])
                return this.data[key]
            },
            set: function(newVal) {
                if (this.data[key] === newVal) {
                    return console.log('NO value changed', newVal)
                }
                console.log('Setter', key, this.data[key], newVal)
                this.data[key] = newVal
                this.updateDom(key, newVal)
            }
        })
    }
}
