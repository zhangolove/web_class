//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node)
    }
	const elem = document.createElement(node.tag)
    const props = node.props
    const filterProps = (criterion, f) => Object.keys(props)
                                .filter(criterion).forEach(f)
    filterProps((key) => key === 'onClick', (key) => {
        elem.addEventListener("click", (e) => {
            props['onClick'](e)
            update()
        })
    })
    filterProps((key) => key === 'className', 
        (key) => elem.setAttribute("class",props['className']))
    filterProps((key) => key !== 'className' && key !== 'onClick', 
        (key) => elem.setAttribute(key, props[key]))

    if (node.children) {
        node.children.forEach((child) => {
            elem.appendChild(createElement(child))
        })
    }



	return elem
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
	// index will be needed when you traverse children
	// add the new node to the parent DOM element if
	// the new node is different from the old node 
	// at the same location in the DOM.
	// ideally we also handle inserts, but ignore that functionality for now.

    if (!oldNode) {
        parent.appendChild(createElement(newNode))
    } else {
        if(changed(newNode,oldNode)) {
            parent.replaceChild(createElement(newNode), 
                                parent.children[index])
        }else {
            const nc = newNode.children, oc = oldNode.children
            if (typeof nc !== typeof oc ||
                (!Array.isArray(nc) && nc !== oc ) ||
                (Array.isArray(nc) && nc.length < oc.length)) {
                parent.replaceChild(createElement(newNode), 
                                parent.children[index])
            } else {
                if (Array.isArray(nc)) {
                    newNode.children.forEach((child, i) => {
                    updateElement(parent.children[index], 
                                    child, oldNode.children[i], i)
                    })

                }
            }
        }
    	
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);