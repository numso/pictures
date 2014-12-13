/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);

	__webpack_require__(1);
	__webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);

	var obj = {
	  tag: 'yayahoo',
	  foo: 'whazzep',
	  bar: 'supdudes'
	};

	var revobj = {
	  'yayahoo': 'tag',
	  'whazzep': 'foo',
	  'supdudes': 'bar'
	};


	var val = 'This is a {tag} test. {foo} a';
	update();

	$('raw').addEventListener('input', function (e) {
	  val = e.target.innerText;
	  update();
	});

	$('proc').addEventListener('input', function (e) {
	  val = untag(e.target.innerHTML)
	  update();
	});

	$('obj').addEventListener('input', function (e) {
	  try {
	    obj = JSON.parse(e.target.innerText);
	    update();
	  } catch (e) {}
	});







	function update() {
	  $('obj').textContent = JSON.stringify(obj);
	  $('raw').textContent = val;
	  if ($('proc').innerHTML !== tag(val)) $('proc').innerHTML = tag(val);
	  if ($('proc').innerHTML.substr($('proc').innerHTML.length - 7) === '</span>') {
	    $('proc').innerHTML += '&nbsp;';
	    window.getSelection().removeAllRanges();
	    window.getSelection().addRange(document.createRange());
	  }
	}

	function tag(str) {
	  var html = str;
	  var re = /\{(\S*)\}/g;
	  var test = re.exec(str);
	  while (test) {
	    var id = test[1];
	    var strr = obj[id] || id;
	    var ree = new RegExp('\{' + id + '\}');
	    html = html.replace(ree, '<span class="tag">' + strr + '</span>')
	    test = re.exec(str);
	  }
	  return html;
	}

	function untag(html) {
	  var str = html;
	  var re = /<span class="tag">(\S*)<\/span>/g;
	  var test = re.exec(html);
	  while (test) {
	    var id = test[1];
	    var strr = revobj[id] || id;
	    var ree = new RegExp('<span class="tag">' + id + '<\/span>');
	    str = str.replace(ree, '{' + strr + '}')
	    test = re.exec(html);
	  }
	  return str;
	}



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);

	var originalX;
	var originalNum = 5;
	var curNum = 5;
	var step = 1;
	$('num-dragger').addEventListener('dragstart', function (e) {
	  originalNum = +$('num-dragger').innerText;
	  originalX = e.x;
	  if (originalNum < 1) step = .03;
	  else if (originalNum < 50) step = 1;
	  else if (originalNum < 100) step = 5;
	  else step = 10;
	  e.dataTransfer.setDragImage($('blank'), 0, 0);
	  e.dataTransfer.effectAllowed = 'none';
	  document.body.style.cursor = 'ew-resize';
	});


	$('num-dragger').addEventListener('drag', function (e) {
	  if (e.x === 0) return;
	  var delta = e.x - originalX;
	  var num = Math.floor(originalNum + (delta / 20) * step);
	  if (num !== curNum) {
	    curNum = num;
	    $('num-dragger').innerText = curNum;
	  }
	});

	$('num-dragger').addEventListener('dragend', function (e) {
	  document.body.style.cursor = 'default';
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/dallin/code/bret-victor/pictures/node_modules/css-loader/index.js!/Users/dallin/code/bret-victor/pictures/node_modules/stylus-loader/index.js!/Users/dallin/code/bret-victor/pictures/client/test/style.styl", function() {
			var newContent = require("!!/Users/dallin/code/bret-victor/pictures/node_modules/css-loader/index.js!/Users/dallin/code/bret-victor/pictures/node_modules/stylus-loader/index.js!/Users/dallin/code/bret-victor/pictures/client/test/style.styl");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	exports.push([module.id, "* {\n  font-family: sans-serif;\n}\n.tag {\n  background-color: #abbbd9;\n  border-radius: 15px;\n  color: #fff;\n  cursor: pointer;\n  padding: 2px 10px;\n  margin: 2px 0;\n  margin-right: 10px;\n  font-size: 12px;\n  letter-spacing: 2px;\n  display: inline-block;\n  min-width: 20px;\n  min-height: 12px;\n}\n#demo3 {\n  width: 700px;\n}\n#demo3 .container {\n  background: #eee;\n}\n#demo3 .container .row {\n  display: flex;\n}\n#demo3 .container .row .expr {\n  flex: 1;\n  white-space: nowrap;\n  overflow: auto;\n}\n#demo3 .container .row .expr::-webkit-scrollbar {\n  display: none;\n}\n#demo3 .container .row .expr input {\n  width: 100%;\n}\n#demo3 .container .row .expr:hover {\n  background-color: #ccc;\n  cursor: pointer;\n}\n#demo4 {\n  width: 700px;\n}\n#demo4 .container {\n  background: #eee;\n  display: flex;\n}\n#demo4 .container .expressions {\n  flex: 1;\n  overflow: auto;\n}\n#demo4 .container .expressions::-webkit-scrollbar {\n  display: none;\n}\n#demo4 .container .expr {\n  width: 100%;\n  height: 22px;\n  white-space: nowrap;\n}\n#demo4 .container .expr input {\n  width: 100%;\n}\n#demo4 .container .expr:hover {\n  background-color: #ccc;\n  cursor: pointer;\n}\n", ""]);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $ = document.getElementById.bind(document);
	module.exports = $;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:stylesheet/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
/******/ ])