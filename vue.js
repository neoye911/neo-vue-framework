
class Vue {

    constructor(options) {
        this.selectors = Object.keys(options.data)
        this.data = options.data
        
        this.setMethods(options.methods)
        this.setWatch(options.watch)
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

    setWatch(methods) {
        if (Object.keys(methods).length > 0) {
            Object.keys(methods).forEach(e => {
                this['w'+e] = methods[e]
            })
        }
    }

    runWatch(key, newVal, oldVal) {
        if (typeof this['w'+key] === "function") {
            this['w'+key](newVal, oldVal)
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
                var oldVal = this.data[key]
                if (oldVal === newVal) {
                    return console.log('NO value changed', newVal)
                }
                console.log('Setter', key, oldVal, newVal)
                this.data[key] = newVal
                this.runWatch(key, newVal, oldVal)
                this.updateDom(key, newVal)
            }
        })
    }
}
