
class Vue {

    constructor(options) {
        this.rootNode = document.querySelector('#app') || document
        this.selectors = Object.keys(options.data)
        this.data = options.data
        
        this.setMethods(options.methods)
        this.setWatch(options.watch)
        console.log('this', this)
        this.setDoms()
        if (options.created) {
            options.created.call(this)
        }

        // initialization
        this.render()
        this.setComputed(options.computed)
        if (options.mounted) {
            options.mounted.call(this)
        }
    }

    setMethods(methods) {
        if (Object.keys(methods).length > 0) {
            Object.keys(methods).forEach(e => {
                this[e] = methods[e]
                this.bindMethod(e)
            })
        }
    }

    setWatch(watches) {
        if (Object.keys(watches).length > 0) {
            Object.keys(watches).forEach(e => {
                this['w'+e] = watches[e]
            })
        }
    }

    runWatch(key, newVal, oldVal) {
        if (typeof this['w'+key] === "function") {
            this['w'+key](newVal, oldVal)
        }
    }

    setComputed(computed) {
        if (Object.keys(computed).length > 0) {
            Object.keys(computed).forEach(e => {
                this[e] = this.defineComputed(e, computed[e])
            })
        }
    } 

    bindMethod(methodKey) {
        let bindNodes = this.rootNode.querySelectorAll(`[click='${methodKey}']`) || []
        bindNodes.forEach(e => {
            e.addEventListener('click', this[methodKey].bind(this))
        })
    }

    setDoms() {
        this.rootDoms = {}
        this.selectors.forEach(e => {
            this.rootDoms[e] = this.rootNode.querySelectorAll(`[${e}]`)
        })
    }

    render() {
        this.selectors.forEach(e => {
            this.proxyData(e)
            this.updateDom(e, this.data[e])
        })
    }

    updateDom(key, value) {
        this.rootDoms[key].forEach(e => {
            e.innerHTML = value
        })
    }
    
    defineComputed(key, fn) {
        Object.defineProperty(this, key, {
            get: function() {
                console.log('current computed getter is', key)
                return fn.call(this)
            },
            set: function(newVal) {
                console.log('current computed setter is', newVal)
            }
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
