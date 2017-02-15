/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/** @jsx h */

;(function() {

'use strict'

// "global" task id counter
let _taskId = 1;

function getSpanSibling(e) {
    const children = e.target.parentElement.children
    for (let c in children) {
        if (children[c].tagName == "SPAN") {
            return children[c]
        }
    }
    return undefined
}

function toggleDone(e) {
    const el = getSpanSibling(e)
    const done = el.getAttribute('done') == 'false'
    el.setAttribute('done', done)
    el.className = done ? "completed" : ""
}

function removeTask(e) {
    const taskId = e.target.parentElement.getAttribute('id')
    const idx = listItems.findIndex(e => e.props.id === taskId)
    if (idx >= 0) listItems.splice(idx, 1)
}

function addItem(text) {
    const newTODO = document.getElementById("newTODO")
    if (newTODO) {
        text = newTODO.value
        newTODO.value = ''
    }
    if (text.length) {
        listItems.push(h("li", { id: `task${_taskId++}`}, [
            h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            h("span", { contentEditable: true, done: false }, typeof(text) === "string" ? text : ""),
            h("i", { className: "destroy glyphicon glyphicon-remove", onClick: removeTask }, []),
        ]))
    }
}

const listItems = [ ]

// initialize the list with two entries
addItem("This is an item")
addItem("Another item")

const view = h("div", { },
    h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
    h("button", { onClick: addItem }, "Add Item"),
    h("span", { className: "submit" }, [
        h("a", { href: "https://webdev-rice.herokuapp.com",
             target: "_blank" }, "Submit your exercise"),
    ]),
    h("ul", { className: "todo" }, listItems)
)

h.mount(document.getElementById('app'), view)

})()


/***/ }),
/* 1 */
/***/ (function(module, exports) {



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);