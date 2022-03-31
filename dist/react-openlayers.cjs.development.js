'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));
var ol = require('ol');
var Observable = require('ol/Observable');
var control = require('ol/control');
var screenfull = _interopDefault(require('screenfull'));
var OLTileLayer = _interopDefault(require('ol/layer/Tile'));
var OLVectorLayer = _interopDefault(require('ol/layer/Vector'));
var OLImageLayer = _interopDefault(require('ol/layer/Image'));
var ol$1 = require('ol/interaction');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".map_ol-map__1i_z7 {\n    min-width: 600px;\n    min-height: 500px;\n    height: 500px;\n    width: 100%;\n}\n\n.map_ol-control__2H7Eb {\n    position: absolute;\n    background-color: rgba(255, 255, 255, 0.4);\n    border-radius: 4px;\n    padding: 2px;\n}\n\n.map_ol-full-screen__2x2b- {\n    top: .5em;\n    right: .5em;\n}";
styleInject(css_248z);

var MapContext = /*#__PURE__*/React__default.createContext(undefined);

function useEvent(eventName, callback, observable) {
  React.useEffect(function () {
    if (!callback || !observable) return;
    var eventKey = observable.on(eventName, callback);
    return function () {
      Observable.unByKey(eventKey);
    };
  }, [callback, observable]);
}

var Map = function Map(_ref) {
  var children = _ref.children,
      onMouseMove = _ref.onMouseMove,
      mapRef = _ref.mapRef;
  var mapEl = React.useRef(null);

  var _useState = React.useState(undefined),
      map = _useState[0],
      setMap = _useState[1]; // on component mount  


  React.useEffect(function () {
    if (!mapEl.current) return;
    var options = {
      layers: [],
      controls: [],
      overlays: []
    };
    var mapObject = new ol.Map(options);
    mapObject.setTarget(mapEl.current);
    setMap(mapObject);

    if (mapRef) {
      mapRef.current = mapObject;
    }

    return function () {
      return mapObject.setTarget(undefined);
    };
  }, []);
  useEvent("mousemove", onMouseMove, map);
  return React__default.createElement(MapContext.Provider, {
    value: map
  }, React__default.createElement("div", {
    ref: mapEl,
    className: "ol-map"
  }, children));
};

var View = function View(_ref) {
  var options = _ref.options,
      onChangeCenter = _ref.onChangeCenter,
      onChangeResolution = _ref.onChangeResolution,
      onChangeRotation = _ref.onChangeRotation,
      onChangeProperty = _ref.onChangeProperty,
      onError = _ref.onError,
      onChange = _ref.onChange;
  var map = React.useContext(MapContext);

  var _useState = React.useState(),
      view = _useState[0],
      setView = _useState[1];

  React.useEffect(function () {
    if (!map) return;

    if (view) {
      view.applyOptions_(options);
      return;
    }

    var _view = new ol.View(options);

    map.setView(_view);
    setView(_view);
  }, [map, options]);
  useEvent("change:center", onChangeCenter, view);
  useEvent("change:resolution", onChangeResolution, view);
  useEvent("change:rotation", onChangeRotation, view);
  useEvent("propertychange", onChangeProperty, view);
  useEvent("error", onError, view);
  useEvent("change", onChange, view);
  return null;
};

var css_248z$1 = ".controls_controls__3HQ8m {\n\tdisplay: grid;\n\theight: 100%;\n\tgrid-template-columns: 1fr 1fr;\n\tgrid-template-rows: 1fr 1fr;\n\tgrid-template-areas: \"top-left top-right\"\"bottom-left bottom-right\";\n\talign-content: space-between;\n\tjustify-content: space-between;\n\n\tgap: 8px;\n\tpadding: 8px;\n\n\tpointer-events: none;\n}\n\n.controls_controls__3HQ8m>*>* {\n\tmax-width: max-content;\n\tpointer-events: auto;\n}\n";
var style = {"controls":"controls_controls__3HQ8m"};
styleInject(css_248z$1);

var _styles;
var MapControls = function MapControls(_ref) {
  var children = _ref.children;
  var map = React.useContext(MapContext);

  var _useState = React.useState(),
      overlay = _useState[0],
      setOverlay = _useState[1];

  if (map && !overlay) {
    setOverlay(map.getTargetElement().querySelector(".ol-overlaycontainer-stopevent"));
  }

  return overlay ? ReactDOM.createPortal(React__default.createElement("div", {
    className: style.controls
  }, children), overlay) : null;
};

(function (ControlPosition) {
  ControlPosition["TopLeft"] = "top-left";
  ControlPosition["TopRight"] = "top-right";
  ControlPosition["BottomLeft"] = "bottom-left";
  ControlPosition["BottomRight"] = "bottom-right";
  ControlPosition["BottomLeftMobile"] = "bottom-right-mobile";
  ControlPosition["BottomRightMobile"] = "bottom-right-mobile";
})(exports.ControlPosition || (exports.ControlPosition = {}));

var commonStyles = {
  display: "flex",
  pointerEvents: "none",
  gap: "8px"
};
var styles = (_styles = {}, _styles[exports.ControlPosition.BottomRight] = /*#__PURE__*/_extends({}, commonStyles, {
  gridArea: "bottom-right",
  marginLeft: "auto",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  gridRowStart: "1"
}), _styles[exports.ControlPosition.BottomLeft] = /*#__PURE__*/_extends({}, commonStyles, {
  gridArea: "bottom-left",
  marginRight: "auto",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-end"
}), _styles[exports.ControlPosition.TopLeft] = /*#__PURE__*/_extends({}, commonStyles, {
  gridArea: "top-left",
  marginRight: "auto",
  flexDirection: "column",
  alignItems: "flex-start"
}), _styles[exports.ControlPosition.TopRight] = /*#__PURE__*/_extends({}, commonStyles, {
  gridArea: "top-right",
  marginLeft: "auto",
  flexDirection: "column",
  alignItems: "flex-end"
}), _styles[exports.ControlPosition.BottomRightMobile] = /*#__PURE__*/_extends({}, commonStyles, {
  gridArea: "bottom-right",
  marginLeft: "auto",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  gridRowStart: "1",
  marginBottom: "8%"
}), _styles[exports.ControlPosition.BottomLeftMobile] = /*#__PURE__*/_extends({}, commonStyles, {
  gridArea: "bottom-left",
  marginRight: "auto",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  marginBottom: "8%"
}), _styles);
var Section = function Section(_ref2) {
  var children = _ref2.children,
      pos = _ref2.pos;
  return React__default.createElement("div", {
    style: styles[pos]
  }, children);
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var css_248z$2 = ".control_control__1G2US {\n    position: relative !important;\n    width: max-content;\n}";
var style$1 = {"control":"control_control__1G2US"};
styleInject(css_248z$2);

function useDefaultControl(map, hasCustomControl) {
  var _useState = React.useState(null),
      defaultControl = _useState[0],
      setDefaultControl = _useState[1];

  React.useEffect(function () {
    if (!map || hasCustomControl) return;
    var customClassName = "react-full-screen-control";
    var fullScreenControl = new control.FullScreen({
      className: customClassName
    }); // FIXME: Controls are not supposed to be edited after the map has been created.
    // @ts-ignore

    map.controls.push(fullScreenControl);
    var element = map.getTargetElement().querySelector("." + customClassName);
    setDefaultControl(element);
    return function () {
      // FIXME: Controls are not supposed to be edited after the map has been created.
      // @ts-ignore
      map.controls.remove(fullScreenControl);
    };
  }, [map]);
  return {
    defaultControl: defaultControl
  };
}

var FullScreenControl = function FullScreenControl(_ref) {
  var CustomControl = _ref.CustomControl;
  var map = React.useContext(MapContext);
  var hasCustomControl = CustomControl ? true : false;

  var _useState2 = React.useState(false),
      fullScreen = _useState2[0],
      setFullScreen = _useState2[1];

  var _useDefaultControl = useDefaultControl(map, hasCustomControl),
      defaultControl = _useDefaultControl.defaultControl;

  var handleFullScreen = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (screenfull.isEnabled) {
                screenfull.request(map == null ? void 0 : map.getTargetElement());
                setFullScreen(true);
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleFullScreen() {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleExitFullScreen = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!screenfull.isEnabled) {
                _context2.next = 4;
                break;
              }

              _context2.next = 3;
              return screenfull.exit();

            case 3:
              setFullScreen(false);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleExitFullScreen() {
      return _ref3.apply(this, arguments);
    };
  }();

  return CustomControl ? React__default.createElement(CustomControl, {
    fullScreen: fullScreen,
    setFullScreen: handleFullScreen,
    exitFullScreen: handleExitFullScreen
  }) : React__default.createElement("div", {
    className: style$1.control,
    ref: function ref(el) {
      el && defaultControl && el.appendChild(defaultControl);
    }
  });
};

var Layers = function Layers(_ref) {
  var children = _ref.children;
  return React__default.createElement("div", null, children, " ");
};

var TileLayer = function TileLayer(_ref) {
  var options = _ref.options,
      name = _ref.name,
      onLayerAdded = _ref.onLayerAdded;
  var map = React.useContext(MapContext);

  var _useState = React.useState(null),
      layer = _useState[0],
      setLayer = _useState[1];

  React.useEffect(function () {
    if (!map) return;
    var tileLayer = new OLTileLayer(options);
    tileLayer.setProperties({
      name: name
    });
    map.addLayer(tileLayer);
    setLayer(tileLayer);
    return function () {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, options, name]);
  React.useEffect(function () {
    if (!layer || !onLayerAdded) return;
    onLayerAdded(layer);
  }, [onLayerAdded, layer]);
  return null;
};

var tileLayer = /*#__PURE__*/React__default.memo(TileLayer);

var VectorLayer = function VectorLayer(_ref) {
  var source = _ref.source,
      style = _ref.style,
      _ref$zIndex = _ref.zIndex,
      zIndex = _ref$zIndex === void 0 ? 0 : _ref$zIndex,
      name = _ref.name;
  var map = React.useContext(MapContext);
  React.useEffect(function () {
    if (!map) return;
    var vectorLayer = new OLVectorLayer({
      source: source,
      style: style
    });
    vectorLayer.setProperties({
      name: name
    });
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    return function () {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map, source, style, zIndex, name]);
  return null;
};

var ImageLayer = function ImageLayer(_ref) {
  var options = _ref.options,
      name = _ref.name,
      onLayerAdded = _ref.onLayerAdded;
  var map = React.useContext(MapContext);

  var _useState = React.useState(null),
      layer = _useState[0],
      setLayer = _useState[1];

  React.useEffect(function () {
    if (!map) return;
    var ImageLayer = new OLImageLayer(options);
    ImageLayer.setProperties({
      name: name
    });
    map.addLayer(ImageLayer);
    setLayer(ImageLayer);
    return function () {
      if (map) {
        map.removeLayer(ImageLayer);
      }
    };
  }, [map, options, name]);
  React.useEffect(function () {
    if (!layer || !onLayerAdded) return;
    onLayerAdded(layer);
  }, [onLayerAdded, layer]);
  return null;
};

var Draw = function Draw(_ref) {
  var options = _ref.options,
      onDrawEnd = _ref.onDrawEnd,
      onDrawStart = _ref.onDrawStart,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? true : _ref$active;
  var map = React.useContext(MapContext);

  var _useState = React.useState(),
      draw = _useState[0],
      setDraw = _useState[1];

  React.useEffect(function () {
    if (!map) return;

    var _draw = new ol$1.Draw(options);

    map.addInteraction(_draw);
    setDraw(_draw);
    return function () {
      map.removeInteraction(_draw);
    };
  }, [map, options]);
  React.useEffect(function () {
    if (!draw) return;
    draw.setActive(active);
  }, [active, draw]);
  useEvent("drawend", onDrawEnd, draw);
  useEvent("drawstart", onDrawStart, draw);
  return null;
};

var Interactions = function Interactions(_ref) {
  var children = _ref.children;
  return React__default.createElement(React__default.Fragment, null, children);
};

var Snap = function Snap(_ref) {
  var options = _ref.options,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? true : _ref$active;
  var map = React.useContext(MapContext);

  var _useState = React.useState(),
      snap = _useState[0],
      setsnap = _useState[1];

  React.useEffect(function () {
    if (!map) return;

    var _snap = new ol$1.Snap(options);

    map.addInteraction(_snap);
    setsnap(_snap);
    return function () {
      map.removeInteraction(_snap);
    };
  }, [map, options]);
  React.useEffect(function () {
    if (!snap) return;
    snap.setActive(active);
  }, [active, snap]);
  return null;
};

var Modify = function Modify(_ref) {
  var options = _ref.options,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? true : _ref$active,
      onModifyEnd = _ref.onModifyEnd;
  var map = React.useContext(MapContext);

  var _useState = React.useState(),
      modify = _useState[0],
      setmodify = _useState[1];

  React.useEffect(function () {
    if (!map) return;

    var _modify = new ol$1.Modify(options);

    map.addInteraction(_modify);
    setmodify(_modify);
    return function () {
      map.removeInteraction(_modify);
    };
  }, [map, options]);
  React.useEffect(function () {
    if (!modify) return;
    modify.setActive(active);
  }, [active, modify]);
  useEvent("modifyend", onModifyEnd, modify);
  return null;
};

exports.Draw = Draw;
exports.FullScreenControl = FullScreenControl;
exports.ImageLayer = ImageLayer;
exports.Interactions = Interactions;
exports.Layers = Layers;
exports.Map = Map;
exports.MapContext = MapContext;
exports.MapControls = MapControls;
exports.Modify = Modify;
exports.Section = Section;
exports.Snap = Snap;
exports.TileLayer = tileLayer;
exports.VectorLayer = VectorLayer;
exports.View = View;
exports.useEvent = useEvent;
//# sourceMappingURL=react-openlayers.cjs.development.js.map
