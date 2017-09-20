(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_conversationFunction__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "onConversation", function() { return __WEBPACK_IMPORTED_MODULE_0__lib_conversationFunction__["a"]; });
// import { addMessage, makeUppercase, function3, function4, onConversation } from './lib/function_category1'
// export { addMessage, makeUppercase, function3, function4, onConversation }




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return onConversation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_functions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_functions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_functions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__db_index__ = __webpack_require__(6);


var request = __webpack_require__(5);
var onConversation = __WEBPACK_IMPORTED_MODULE_0_firebase_functions__["database"].ref('/conversation/{uid}/{pushId}')
    .onWrite(function (event) {
    var data = event.data.val();
    if (data != null) {
        if (data.name != 'Bot') {
            // console.log("uid", event.params.uid)
            // console.log("messages", data.text)
            // console.log("messages", event.params.pushId)
            var options = {
                url: 'https://api.api.ai/api/query?v=20150910&query=' + data.text + '&lang=en&sessionId=898aae69-9d7d-4dd3-abeb-721ca2a44bb6&timezone=2017-03-24T21:10:33+0500',
                headers: {
                    'Authorization': 'Bearer b74e0f82499f48d3a01c735824a47b95'
                }
            };
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // botReply.message = JSON.parse(body.result.fulfillment.speech);
                    response = JSON.parse(body);
                    console.log('user msg & bot reply', data.text, response.result.fulfillment.speech);
                    __WEBPACK_IMPORTED_MODULE_1__db_index__["a" /* default */].ref('/conversation/' + event.params.uid + '/').push({
                        name: 'Bot',
                        imageUrl: '../assets/images/bot.jpg',
                        text: response.result.fulfillment.speech
                    });
                }
            });
        }
    }
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_functions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_functions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_functions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_admin__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_admin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase_admin__);


var defaultApp = __WEBPACK_IMPORTED_MODULE_1_firebase_admin__["initializeApp"](__WEBPACK_IMPORTED_MODULE_0_firebase_functions__["config"]().firebase);
var db = __WEBPACK_IMPORTED_MODULE_1_firebase_admin__["database"]();
/* harmony default export */ __webpack_exports__["a"] = (db);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ })
/******/ ])));