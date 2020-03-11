
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$1
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f$2
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode:  'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
});

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$1] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !descriptors) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

var $filter = arrayIteration.filter;



var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $forEach = arrayIteration.forEach;



var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH$1 = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH$1) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
  forEach: arrayForEach
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
  } catch (error) {
    CollectionPrototype.forEach = arrayForEach;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var generateID = function () {
  var globalIdCounter = 0;
  return function (baseStr) {
    baseStr = baseStr ? baseStr : "generatedID-";
    var newString = baseStr + globalIdCounter++;

    if (document.getElementById("#" + newString)) {
      newString = newString + parseInt(Math.random() * 10000000000);
    }

    return newString;
  };
}();
function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
})();

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    var ce = new window.CustomEvent('test', { cancelable: true });
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
      // IE has problems with .preventDefault() on custom events
      // http://stackoverflow.com/questions/23349191
      throw new Error('Could not prevent default');
    }
  } catch (e) {
    var CustomEvent = function(event, params) {
      var evt, origPrevent;
      params = params || {};
      params.bubbles = !!params.bubbles;
      params.cancelable = !!params.cancelable;

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      origPrevent = evt.preventDefault;
      evt.preventDefault = function() {
        origPrevent.call(this);
        try {
          Object.defineProperty(this, 'defaultPrevented', {
            get: function() {
              return true;
            }
          });
        } catch (e) {
          this.defaultPrevented = true;
        }
      };
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent; // expose definition to window
  }
})();

var ClickNav =
/*#__PURE__*/
function () {
  function ClickNav(element) {
    _classCallCheck(this, ClickNav);

    var defaults = {
      menutype: "dropdown",
      animationSpeed: 400,
      menuSelector: '.cm-nav',
      toggleSelector: ".cm-nav__toggle",
      linkSelector: '.cm-nav__link',
      htmlClass: "cm-js-menu-active",
      panelActiveClass: 'cm-nav__sub-menu--active',
      expanderClass: 'cm-nav__expander',
      expanderText: "expand | collapse",
      createLandingLinks: false,
      separateExpanders: false,
      isAutoClose: true,
      isRTL: false
    };

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    this.config = _objectSpread2({}, defaults, {}, params);
    this.nav = element;
    console.log(this.config);
    this.handleExpander = this.handleExpander.bind(this);
    this.handleMenu = this.handleMenu.bind(this);

    this._init();
  }

  _createClass(ClickNav, [{
    key: "_init",
    value: function _init() {
      var _ = this;

      var availableLinks = _.nav.querySelectorAll(this.config.linkSelector);

      _.nav.dispatchEvent(new CustomEvent("init", {
        clickNav: _
      }));

      _.nav.setAttribute('data-level', 0);

      availableLinks.forEach(function (link) {
        var siblings = _.getSiblings(link);

        siblings.forEach(function (sibling) {
          if (sibling instanceof HTMLDivElement || sibling instanceof HTMLOListElement || sibling instanceof HTMLUListElement) {
            var panelID = sibling.getAttribute('id');

            if (!sibling.getAttribute('data-type')) {
              sibling.setAttribute('data-type', _.config.menutype);
            }

            if (!panelID) {
              panelID = generateID('cm-menu-panel-');
              sibling.setAttribute('id', panelID);
            }

            var button = _.createExpander(panelID, link, _.config.expanderClass);

            button.addEventListener('click', _.handleExpander);
            sibling.setAttribute('data-level', _.determineLevel(sibling));

            if (!_.config.separateExpanders) {
              link.setAttribute('hidden', '');
            }

            if (_.config.createLandingLinks) ;

            insertAfter(button, link);
            return;
          }
        });
      });
    }
  }, {
    key: "createExpander",
    value: function createExpander(panelID, link, expanderClass) {
      var _ = this;

      var linkText = _.config.separateExpanders ? "" : link.innerText;
      var placeholder = document.createElement('template');
      placeholder.innerHTML = "<button type=\"button\" class=\"".concat(expanderClass, "\" aria-expanded=\"false\" aria-label=\"").concat(linkText, " ").concat(this.config.expanderText, "\" aria-controls=\"").concat(panelID, "\">").concat(linkText, "</button>");
      return placeholder.content.firstElementChild;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _ = this;

      var expanders = _.nav.querySelectorAll('[aria-controls]');

      _.nav.dispatchEvent(new CustomEvent("destroy", {
        clickNav: _
      }));

      expanders.forEach(function (elem) {
        elem.removeEventListener('click', _.handleExpander);
      });
    }
  }, {
    key: "determineLevel",
    value: function determineLevel(elem) {
      var foundLevel = elem.closest('[data-level]');
      return foundLevel ? parseInt(foundLevel.dataset.level, 10) + 1 : 1;
    }
  }, {
    key: "handleExpander",
    value: function handleExpander(e) {
      var _ = this;

      _.toggleExpander(e.currentTarget);
    }
  }, {
    key: "handleMenu",
    value: function handleMenu(e) {
      var _ = this;

      if (!_.nav.contains(e.target) && e.target !== _.nav) {
        _.leavingMenu = true;

        _.resetExpanders();

        document.removeEventListener("click", _.handleMenu);
        setTimeout(function () {
          //We now know we have left the menu and are done triggering sub menus
          _.leavingMenu = false;
        }, _.config.animationSpeed);
      }
    }
  }, {
    key: "getSiblings",
    value: function getSiblings(elem) {
      var parent = elem.parentNode;

      var children = _toConsumableArray(parent.children);

      return children.filter(function (child) {
        return child !== elem;
      });
    }
  }, {
    key: "resetExpanders",
    value: function resetExpanders(navTree, navItem) {
      var _ = this;

      var activeItems = navTree ? navTree.querySelectorAll('[aria-expanded="true"]') : _.nav.querySelectorAll('[aria-expanded="true"]'); //If there is a navTree supplied only check children inside of the level otherwise close all menus

      activeItems.forEach(function (button) {
        //Make sure not to call on the button that might be triggering this on open
        if (button !== navItem) {
          _.toggleExpander(button);
        }
      });
    }
  }, {
    key: "toggleExpander",
    value: function toggleExpander(button) {
      var _ = this;

      var panel = document.getElementById(button.getAttribute('aria-controls'));
      var wrapper = button.closest('data-level');

      if (button.getAttribute('aria-expanded') === 'true') {
        _.nav.dispatchEvent(new CustomEvent("before.expander.close", {
          clickNav: _
        }));

        panel.classList.remove(_.config.panelActiveClass);
        setTimeout(function () {
          button.setAttribute('aria-expanded', false);

          _.nav.dispatchEvent(new CustomEvent("after.expander.close", {
            clickNav: _
          }));
        }, _.config.animationSpeed);
      } else {
        _.nav.dispatchEvent(new CustomEvent("before.expander.open", {
          clickNav: _
        }));

        button.setAttribute('aria-expanded', true);

        _.resetExpanders(button.closest('[data-level]'), button);

        setTimeout(function () {
          panel.classList.add(_.config.panelActiveClass);

          if (_.config.isAutoClose) {
            // Only add if (default) menus set to auto close
            document.addEventListener('click', _.handleMenu);
          }

          setTimeout(function () {
            _.nav.dispatchEvent(new CustomEvent("after.expander.open", {
              clickNav: _
            }));
          }, _.config.animationSpeed);
        }, 10);
      }
    }
  }]);

  return ClickNav;
}();

module.exports = ClickNav;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stbmF2LmNqcy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLXJhdy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LWdsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wYXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pbmNsdWRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3duLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5jb25jYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1mdW5jdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZmlsdGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuZm9yLWVhY2guanMiLCIuLi9zcmMvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvZWxlbWVudC1jbG9zZXN0LXBvbHlmaWxsL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2N1c3RvbS1ldmVudC1wb2x5ZmlsbC9wb2x5ZmlsbC5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICFuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciBzcGxpdCA9ICcnLnNwbGl0O1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICByZXR1cm4gIU9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09ICdTdHJpbmcnID8gc3BsaXQuY2FsbChpdCwgJycpIDogT2JqZWN0KGl0KTtcbn0gOiBPYmplY3Q7XG4iLCIvLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcblxudmFyIG5hdGl2ZURlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGdsb2JhbCwga2V5LCB2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24udG9TdHJpbmc7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjYuNCcsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAyMCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBvYmplY3RIYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQKSB7XG4gIHZhciBzdG9yZSA9IG5ldyBXZWFrTWFwKCk7XG4gIHZhciB3bWdldCA9IHN0b3JlLmdldDtcbiAgdmFyIHdtaGFzID0gc3RvcmUuaGFzO1xuICB2YXIgd21zZXQgPSBzdG9yZS5zZXQ7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICB3bXNldC5jYWxsKHN0b3JlLCBpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtZ2V0LmNhbGwoc3RvcmUsIGl0KSB8fCB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtaGFzLmNhbGwoc3RvcmUsIGl0KTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBTVEFURSA9IHNoYXJlZEtleSgnc3RhdGUnKTtcbiAgaGlkZGVuS2V5c1tTVEFURV0gPSB0cnVlO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHVuc2FmZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMudW5zYWZlIDogZmFsc2U7XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zID8gISFvcHRpb25zLmVudW1lcmFibGUgOiBmYWxzZTtcbiAgdmFyIG5vVGFyZ2V0R2V0ID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5ub1RhcmdldEdldCA6IGZhbHNlO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiAhaGFzKHZhbHVlLCAnbmFtZScpKSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodmFsdWUsICduYW1lJywga2V5KTtcbiAgICBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSkuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICB9XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIHNldEdsb2JhbChrZXksIHZhbHVlKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoIXVuc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gIH0gZWxzZSBpZiAoIW5vVGFyZ2V0R2V0ICYmIE9ba2V5XSkge1xuICAgIHNpbXBsZSA9IHRydWU7XG4gIH1cbiAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gIGVsc2UgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KE8sIGtleSwgdmFsdWUpO1xuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnNvdXJjZSB8fCBpbnNwZWN0U291cmNlKHRoaXMpO1xufSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PSAnZnVuY3Rpb24nID8gdmFyaWFibGUgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24ocGF0aFtuYW1lc3BhY2VdKSB8fCBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pXG4gICAgOiBwYXRoW25hbWVzcGFjZV0gJiYgcGF0aFtuYW1lc3BhY2VdW21ldGhvZF0gfHwgZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCJ2YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBUb0ludGVnZXJgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9pbnRlZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNOYU4oYXJndW1lbnQgPSArYXJndW1lbnQpID8gMCA6IChhcmd1bWVudCA+IDAgPyBmbG9vciA6IGNlaWwpKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyKGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMubm9UYXJnZXRHZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IHNldEdsb2JhbChUQVJHRVQsIHt9KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQgPSAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcbiAgfVxuICBpZiAodGFyZ2V0KSBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBzb3VyY2VQcm9wZXJ0eSA9IHNvdXJjZVtrZXldO1xuICAgIGlmIChvcHRpb25zLm5vVGFyZ2V0R2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICAgIHRhcmdldFByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbmVkIGluIHRhcmdldFxuICAgIGlmICghRk9SQ0VEICYmIHRhcmdldFByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlUHJvcGVydHkgPT09IHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSkgY29udGludWU7XG4gICAgICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbi8vIGBJc0FycmF5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzYXJyYXlcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gY2xhc3NvZihhcmcpID09ICdBcnJheSc7XG59O1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBwcm9wZXJ0eUtleSA9IHRvUHJpbWl0aXZlKGtleSk7XG4gIGlmIChwcm9wZXJ0eUtleSBpbiBvYmplY3QpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBwcm9wZXJ0eUtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W3Byb3BlcnR5S2V5XSA9IHZhbHVlO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgcmV0dXJuICFTdHJpbmcoU3ltYm9sKCkpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgJiYgIVN5bWJvbC5zaGFtXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhcyhXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpKSB7XG4gICAgaWYgKE5BVElWRV9TWU1CT0wgJiYgaGFzKFN5bWJvbCwgbmFtZSkpIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IFN5bWJvbFtuYW1lXTtcbiAgICBlbHNlIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbi8vIGBBcnJheVNwZWNpZXNDcmVhdGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXlzcGVjaWVzY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbEFycmF5LCBsZW5ndGgpIHtcbiAgdmFyIEM7XG4gIGlmIChpc0FycmF5KG9yaWdpbmFsQXJyYXkpKSB7XG4gICAgQyA9IG9yaWdpbmFsQXJyYXkuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZiAodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKSBDID0gdW5kZWZpbmVkO1xuICAgIGVsc2UgaWYgKGlzT2JqZWN0KEMpKSB7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmIChDID09PSBudWxsKSBDID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSByZXR1cm4gbmV3IChDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEMpKGxlbmd0aCA9PT0gMCA/IDAgOiBsZW5ndGgpO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgdmVyc2lvbiA9IG1hdGNoWzBdICsgbWF0Y2hbMV07XG59IGVsc2UgaWYgKHVzZXJBZ2VudCkge1xuICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdID49IDc0KSB7XG4gICAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgIGlmIChtYXRjaCkgdmVyc2lvbiA9IG1hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbiAmJiArdmVyc2lvbjtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUpIHtcbiAgLy8gV2UgY2FuJ3QgdXNlIHRoaXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4gIC8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NzdcbiAgcmV0dXJuIFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBhcnJheS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgIGNvbnN0cnVjdG9yW1NQRUNJRVNdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHsgZm9vOiAxIH07XG4gICAgfTtcbiAgICByZXR1cm4gYXJyYXlbTUVUSE9EX05BTUVdKEJvb2xlYW4pLmZvbyAhPT0gMTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcblxudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFID0gd2VsbEtub3duU3ltYm9sKCdpc0NvbmNhdFNwcmVhZGFibGUnKTtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gMHgxRkZGRkZGRkZGRkZGRjtcbnZhciBNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQgPSAnTWF4aW11bSBhbGxvd2VkIGluZGV4IGV4Y2VlZGVkJztcblxuLy8gV2UgY2FuJ3QgdXNlIHRoaXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4vLyBkZW9wdGltaXphdGlvbiBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3OVxudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgPSBWOF9WRVJTSU9OID49IDUxIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBhcnJheSA9IFtdO1xuICBhcnJheVtJU19DT05DQVRfU1BSRUFEQUJMRV0gPSBmYWxzZTtcbiAgcmV0dXJuIGFycmF5LmNvbmNhdCgpWzBdICE9PSBhcnJheTtcbn0pO1xuXG52YXIgU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnY29uY2F0Jyk7XG5cbnZhciBpc0NvbmNhdFNwcmVhZGFibGUgPSBmdW5jdGlvbiAoTykge1xuICBpZiAoIWlzT2JqZWN0KE8pKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzcHJlYWRhYmxlID0gT1tJU19DT05DQVRfU1BSRUFEQUJMRV07XG4gIHJldHVybiBzcHJlYWRhYmxlICE9PSB1bmRlZmluZWQgPyAhIXNwcmVhZGFibGUgOiBpc0FycmF5KE8pO1xufTtcblxudmFyIEZPUkNFRCA9ICFJU19DT05DQVRfU1BSRUFEQUJMRV9TVVBQT1JUIHx8ICFTUEVDSUVTX1NVUFBPUlQ7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuY29uY2F0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5jb25jYXRcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBpc0NvbmNhdFNwcmVhZGFibGUgYW5kIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgY29uY2F0OiBmdW5jdGlvbiBjb25jYXQoYXJnKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBBID0gYXJyYXlTcGVjaWVzQ3JlYXRlKE8sIDApO1xuICAgIHZhciBuID0gMDtcbiAgICB2YXIgaSwgaywgbGVuZ3RoLCBsZW4sIEU7XG4gICAgZm9yIChpID0gLTEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgRSA9IGkgPT09IC0xID8gTyA6IGFyZ3VtZW50c1tpXTtcbiAgICAgIGlmIChpc0NvbmNhdFNwcmVhZGFibGUoRSkpIHtcbiAgICAgICAgbGVuID0gdG9MZW5ndGgoRS5sZW5ndGgpO1xuICAgICAgICBpZiAobiArIGxlbiA+IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgbGVuOyBrKyssIG4rKykgaWYgKGsgaW4gRSkgY3JlYXRlUHJvcGVydHkoQSwgbiwgRVtrXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobiA+PSBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkoQSwgbisrLCBFKTtcbiAgICAgIH1cbiAgICB9XG4gICAgQS5sZW5ndGggPSBuO1xuICAgIHJldHVybiBBO1xuICB9XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcblxuLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0KTtcbiAgICB9O1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsInZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcblxudmFyIHB1c2ggPSBbXS5wdXNoO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgZm9yRWFjaCwgbWFwLCBmaWx0ZXIsIHNvbWUsIGV2ZXJ5LCBmaW5kLCBmaW5kSW5kZXggfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHZhciBJU19NQVAgPSBUWVBFID09IDE7XG4gIHZhciBJU19GSUxURVIgPSBUWVBFID09IDI7XG4gIHZhciBJU19TT01FID0gVFlQRSA9PSAzO1xuICB2YXIgSVNfRVZFUlkgPSBUWVBFID09IDQ7XG4gIHZhciBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2O1xuICB2YXIgTk9fSE9MRVMgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCwgc3BlY2lmaWNDcmVhdGUpIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgc2VsZiA9IEluZGV4ZWRPYmplY3QoTyk7XG4gICAgdmFyIGJvdW5kRnVuY3Rpb24gPSBiaW5kKGNhbGxiYWNrZm4sIHRoYXQsIDMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgY3JlYXRlID0gc3BlY2lmaWNDcmVhdGUgfHwgYXJyYXlTcGVjaWVzQ3JlYXRlO1xuICAgIHZhciB0YXJnZXQgPSBJU19NQVAgPyBjcmVhdGUoJHRoaXMsIGxlbmd0aCkgOiBJU19GSUxURVIgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkO1xuICAgIHZhciB2YWx1ZSwgcmVzdWx0O1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZikge1xuICAgICAgdmFsdWUgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlc3VsdCA9IGJvdW5kRnVuY3Rpb24odmFsdWUsIGluZGV4LCBPKTtcbiAgICAgIGlmIChUWVBFKSB7XG4gICAgICAgIGlmIChJU19NQVApIHRhcmdldFtpbmRleF0gPSByZXN1bHQ7IC8vIG1hcFxuICAgICAgICBlbHNlIGlmIChyZXN1bHQpIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsdWU7ICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiBwdXNoLmNhbGwodGFyZ2V0LCB2YWx1ZSk7IC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYgKElTX0VWRVJZKSByZXR1cm4gZmFsc2U7ICAvLyBldmVyeVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogdGFyZ2V0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4gIGZvckVhY2g6IGNyZWF0ZU1ldGhvZCgwKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5tYXBgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4gIG1hcDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWx0ZXJcbiAgZmlsdGVyOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuc29tZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zb21lXG4gIHNvbWU6IGNyZWF0ZU1ldGhvZCgzKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5ldmVyeWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5ldmVyeVxuICBldmVyeTogY3JlYXRlTWV0aG9kKDQpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZFxuICBmaW5kOiBjcmVhdGVNZXRob2QoNSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRJbmRleFxuICBmaW5kSW5kZXg6IGNyZWF0ZU1ldGhvZCg2KVxufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgY2FjaGUgPSB7fTtcblxudmFyIHRocm93ZXIgPSBmdW5jdGlvbiAoaXQpIHsgdGhyb3cgaXQ7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBvcHRpb25zKSB7XG4gIGlmIChoYXMoY2FjaGUsIE1FVEhPRF9OQU1FKSkgcmV0dXJuIGNhY2hlW01FVEhPRF9OQU1FXTtcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHZhciBBQ0NFU1NPUlMgPSBoYXMob3B0aW9ucywgJ0FDQ0VTU09SUycpID8gb3B0aW9ucy5BQ0NFU1NPUlMgOiBmYWxzZTtcbiAgdmFyIGFyZ3VtZW50MCA9IGhhcyhvcHRpb25zLCAwKSA/IG9wdGlvbnNbMF0gOiB0aHJvd2VyO1xuICB2YXIgYXJndW1lbnQxID0gaGFzKG9wdGlvbnMsIDEpID8gb3B0aW9uc1sxXSA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4gY2FjaGVbTUVUSE9EX05BTUVdID0gISFtZXRob2QgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoQUNDRVNTT1JTICYmICFERVNDUklQVE9SUykgcmV0dXJuIHRydWU7XG4gICAgdmFyIE8gPSB7IGxlbmd0aDogLTEgfTtcblxuICAgIGlmIChBQ0NFU1NPUlMpIGRlZmluZVByb3BlcnR5KE8sIDEsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiB0aHJvd2VyIH0pO1xuICAgIGVsc2UgT1sxXSA9IDE7XG5cbiAgICBtZXRob2QuY2FsbChPLCBhcmd1bWVudDAsIGFyZ3VtZW50MSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRmaWx0ZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZmlsdGVyO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdmaWx0ZXInKTtcbi8vIEVkZ2UgMTQtIGlzc3VlXG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnZmlsdGVyJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWx0ZXJcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkZmlsdGVyKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnZm9yRWFjaCcpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG5tb2R1bGUuZXhwb3J0cyA9ICghU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEgpID8gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogW10uZm9yRWFjaCAhPSBmb3JFYWNoIH0sIHtcbiAgZm9yRWFjaDogZm9yRWFjaFxufSk7XG4iLCIvLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgRE9NSXRlcmFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlICYmIENvbGxlY3Rpb25Qcm90b3R5cGUuZm9yRWFjaCAhPT0gZm9yRWFjaCkgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgJ2ZvckVhY2gnLCBmb3JFYWNoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBDb2xsZWN0aW9uUHJvdG90eXBlLmZvckVhY2ggPSBmb3JFYWNoO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgZ2VuZXJhdGVJRCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGdsb2JhbElkQ291bnRlciA9IDA7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGJhc2VTdHIpIHtcclxuICAgICAgICBiYXNlU3RyID0gYmFzZVN0ciA/IGJhc2VTdHIgOiBcImdlbmVyYXRlZElELVwiO1xyXG4gICAgICAgIHZhciBuZXdTdHJpbmcgPSBiYXNlU3RyICsgZ2xvYmFsSWRDb3VudGVyKys7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiI1wiICsgbmV3U3RyaW5nKSkge1xyXG4gICAgICAgICAgICBuZXdTdHJpbmcgPSBuZXdTdHJpbmcgKyBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3U3RyaW5nO1xyXG4gICAgfTtcclxufSgpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEJlZm9yZShlbCwgcmVmZXJlbmNlTm9kZSkge1xyXG4gICAgcmVmZXJlbmNlTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgcmVmZXJlbmNlTm9kZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRBZnRlcihlbCwgcmVmZXJlbmNlTm9kZSkge1xyXG4gICAgcmVmZXJlbmNlTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgcmVmZXJlbmNlTm9kZS5uZXh0U2libGluZyk7XHJcbn0iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XHJcbiAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcclxuICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgdmFyIGVsID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5tYXRjaGVzKHMpKSByZXR1cm4gZWw7XHJcbiAgICAgICAgICAgICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQgfHwgZWwucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgfSB3aGlsZSAoZWwgIT09IG51bGwgJiYgZWwubm9kZVR5cGUgPT09IDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KSgpOyIsIi8vIFBvbHlmaWxsIGZvciBjcmVhdGluZyBDdXN0b21FdmVudHMgb24gSUU5LzEwLzExXG5cbi8vIGNvZGUgcHVsbGVkIGZyb206XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZDR0b2NjaGluaS9jdXN0b21ldmVudC1wb2x5ZmlsbFxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50I1BvbHlmaWxsXG5cbihmdW5jdGlvbigpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICB2YXIgY2UgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KCd0ZXN0JywgeyBjYW5jZWxhYmxlOiB0cnVlIH0pO1xuICAgIGNlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGNlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgIC8vIElFIGhhcyBwcm9ibGVtcyB3aXRoIC5wcmV2ZW50RGVmYXVsdCgpIG9uIGN1c3RvbSBldmVudHNcbiAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjMzNDkxOTFcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHByZXZlbnQgZGVmYXVsdCcpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciBDdXN0b21FdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXMpIHtcbiAgICAgIHZhciBldnQsIG9yaWdQcmV2ZW50O1xuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgICAgcGFyYW1zLmJ1YmJsZXMgPSAhIXBhcmFtcy5idWJibGVzO1xuICAgICAgcGFyYW1zLmNhbmNlbGFibGUgPSAhIXBhcmFtcy5jYW5jZWxhYmxlO1xuXG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBwYXJhbXMuYnViYmxlcyxcbiAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUsXG4gICAgICAgIHBhcmFtcy5kZXRhaWxcbiAgICAgICk7XG4gICAgICBvcmlnUHJldmVudCA9IGV2dC5wcmV2ZW50RGVmYXVsdDtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBvcmlnUHJldmVudC5jYWxsKHRoaXMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGVmYXVsdFByZXZlbnRlZCcsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBldnQ7XG4gICAgfTtcblxuICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gICAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7IC8vIGV4cG9zZSBkZWZpbml0aW9uIHRvIHdpbmRvd1xuICB9XG59KSgpO1xuIiwiaW1wb3J0ICcuL2luZGV4LmNzcyc7XHJcblxyXG5pbXBvcnQge2dlbmVyYXRlSUQsIGluc2VydEFmdGVyLCBpbnNlcnRCZWZvcmV9IGZyb20gJy4vdXRpbHMuanMnXHJcbmltcG9ydCAnLi4vbm9kZV9tb2R1bGVzL2VsZW1lbnQtY2xvc2VzdC1wb2x5ZmlsbCc7XHJcbmltcG9ydCAnLi4vbm9kZV9tb2R1bGVzL2N1c3RvbS1ldmVudC1wb2x5ZmlsbCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGlja05hdiB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBkZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgbWVudXR5cGUgOiBcImRyb3Bkb3duXCIsXHJcbiAgICAgICAgICAgIGFuaW1hdGlvblNwZWVkIDogNDAwLFxyXG4gICAgICAgICAgICBtZW51U2VsZWN0b3IgOiAnLmNtLW5hdicsXHJcbiAgICAgICAgICAgIHRvZ2dsZVNlbGVjdG9yIDogXCIuY20tbmF2X190b2dnbGVcIixcclxuICAgICAgICAgICAgbGlua1NlbGVjdG9yIDogJy5jbS1uYXZfX2xpbmsnLFxyXG4gICAgICAgICAgICBodG1sQ2xhc3M6IFwiY20tanMtbWVudS1hY3RpdmVcIixcclxuICAgICAgICAgICAgcGFuZWxBY3RpdmVDbGFzczogJ2NtLW5hdl9fc3ViLW1lbnUtLWFjdGl2ZScsXHJcbiAgICAgICAgICAgIGV4cGFuZGVyQ2xhc3M6ICdjbS1uYXZfX2V4cGFuZGVyJywgICAgICAgICAgICBcclxuICAgICAgICAgICAgZXhwYW5kZXJUZXh0OiBcImV4cGFuZCB8IGNvbGxhcHNlXCIsXHJcbiAgICAgICAgICAgIGNyZWF0ZUxhbmRpbmdMaW5rcyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZXBhcmF0ZUV4cGFuZGVyczogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQXV0b0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICBpc1JUTCA6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB7IC4uLmRlZmF1bHRzLCAuLi5wYXJhbXMgfTtcclxuICAgICAgICB0aGlzLm5hdiA9IGVsZW1lbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb25maWcpO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZUV4cGFuZGVyID0gdGhpcy5oYW5kbGVFeHBhbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTWVudSA9IHRoaXMuaGFuZGxlTWVudS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXQoKXtcclxuICAgICAgICBjb25zdCBfID0gdGhpcztcclxuICAgICAgICBjb25zdCBhdmFpbGFibGVMaW5rcyA9IF8ubmF2LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5jb25maWcubGlua1NlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgXy5uYXYuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJpbml0XCIsIHsgY2xpY2tOYXY6IF8gfSApKTtcclxuXHJcbiAgICAgICAgXy5uYXYuc2V0QXR0cmlidXRlKCdkYXRhLWxldmVsJywgMCk7XHJcblxyXG4gICAgICAgIGF2YWlsYWJsZUxpbmtzLmZvckVhY2gobGluayA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdzID0gXy5nZXRTaWJsaW5ncyhsaW5rKTtcclxuXHJcbiAgICAgICAgICAgIHNpYmxpbmdzLmZvckVhY2goc2libGluZyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCB8fCBzaWJsaW5nIGluc3RhbmNlb2YgSFRNTE9MaXN0RWxlbWVudCB8fCBzaWJsaW5nIGluc3RhbmNlb2YgSFRNTFVMaXN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYW5lbElEID0gc2libGluZy5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggISBzaWJsaW5nLmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJykgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmcuc2V0QXR0cmlidXRlKCdkYXRhLXR5cGUnLCBfLmNvbmZpZy5tZW51dHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoICEgcGFuZWxJRCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWxJRCA9IGdlbmVyYXRlSUQoJ2NtLW1lbnUtcGFuZWwtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmcuc2V0QXR0cmlidXRlKCdpZCcsIHBhbmVsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gXy5jcmVhdGVFeHBhbmRlcihwYW5lbElELCBsaW5rLCBfLmNvbmZpZy5leHBhbmRlckNsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfLmhhbmRsZUV4cGFuZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLnNldEF0dHJpYnV0ZSgnZGF0YS1sZXZlbCcsIF8uZGV0ZXJtaW5lTGV2ZWwoc2libGluZykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISBfLmNvbmZpZy5zZXBhcmF0ZUV4cGFuZGVycyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmNvbmZpZy5jcmVhdGVMYW5kaW5nTGlua3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9BZGQgaW4gY2xvbmluZyBhc3BlY3QgdG8gc3RhcnQgb2YgdGhlIHJlbGF0ZWQgc2libGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dpdGggcmVtb3ZhbCBvZiB1bmlxdWUgaWRlbnRpZmllcnMgaWYgaW5jbHVkZWRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGluc2VydEFmdGVyKGJ1dHRvbiwgbGluayk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRXhwYW5kZXIocGFuZWxJRCwgbGluaywgZXhwYW5kZXJDbGFzcykge1xyXG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGxpbmtUZXh0ID0gXy5jb25maWcuc2VwYXJhdGVFeHBhbmRlcnMgPyAgXCJcIiA6IGxpbmsuaW5uZXJUZXh0O1xyXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcclxuICAgICAgICBwbGFjZWhvbGRlci5pbm5lckhUTUwgPSBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIke2V4cGFuZGVyQ2xhc3N9XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1sYWJlbD1cIiR7bGlua1RleHR9ICR7dGhpcy5jb25maWcuZXhwYW5kZXJUZXh0fVwiIGFyaWEtY29udHJvbHM9XCIke3BhbmVsSUR9XCI+JHtsaW5rVGV4dH08L2J1dHRvbj5gO1xyXG5cclxuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXIuY29udGVudC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGV4cGFuZGVycyA9IF8ubmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWNvbnRyb2xzXScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIF8ubmF2LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiZGVzdHJveVwiLCB7IGNsaWNrTmF2OiBfIH0gKSk7XHJcblxyXG4gICAgICAgIGV4cGFuZGVycy5mb3JFYWNoKGVsZW0gPT4ge1xyXG4gICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXy5oYW5kbGVFeHBhbmRlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGV0ZXJtaW5lTGV2ZWwoZWxlbSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kTGV2ZWwgPSBlbGVtLmNsb3Nlc3QoJ1tkYXRhLWxldmVsXScpO1xyXG4gICAgICAgIHJldHVybiBmb3VuZExldmVsID8gcGFyc2VJbnQoZm91bmRMZXZlbC5kYXRhc2V0LmxldmVsLCAxMCkgKyAxIDogMTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFeHBhbmRlcihlKSB7XHJcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XHJcbiAgICAgICAgXy50b2dnbGVFeHBhbmRlcihlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1lbnUoZSkge1xyXG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xyXG4gICAgICAgIGlmICggISBfLm5hdi5jb250YWlucyhlLnRhcmdldCkgJiYgZS50YXJnZXQgIT09IF8ubmF2ICkge1xyXG4gICAgICAgICAgICBfLmxlYXZpbmdNZW51ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIF8ucmVzZXRFeHBhbmRlcnMoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIF8uaGFuZGxlTWVudSk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvL1dlIG5vdyBrbm93IHdlIGhhdmUgbGVmdCB0aGUgbWVudSBhbmQgYXJlIGRvbmUgdHJpZ2dlcmluZyBzdWIgbWVudXNcclxuICAgICAgICAgICAgICAgIF8ubGVhdmluZ01lbnUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgXy5jb25maWcuYW5pbWF0aW9uU3BlZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTaWJsaW5ncyhlbGVtKSB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gWy4uLnBhcmVudC5jaGlsZHJlbl07XHJcblxyXG4gICAgICAgIHJldHVybiBjaGlsZHJlbi5maWx0ZXIoY2hpbGQgPT4gY2hpbGQgIT09IGVsZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0RXhwYW5kZXJzKG5hdlRyZWUsIG5hdkl0ZW0pIHtcclxuICAgICAgICBjb25zdCBfID0gdGhpcztcclxuICAgICAgICBjb25zdCBhY3RpdmVJdGVtcyA9IG5hdlRyZWUgPyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdlRyZWUucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtZXhwYW5kZWQ9XCJ0cnVlXCJdJykgOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ubmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWV4cGFuZGVkPVwidHJ1ZVwiXScpO1xyXG4gICAgICAgIC8vSWYgdGhlcmUgaXMgYSBuYXZUcmVlIHN1cHBsaWVkIG9ubHkgY2hlY2sgY2hpbGRyZW4gaW5zaWRlIG9mIHRoZSBsZXZlbCBvdGhlcndpc2UgY2xvc2UgYWxsIG1lbnVzXHJcbiAgICAgICAgYWN0aXZlSXRlbXMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgICAgICAvL01ha2Ugc3VyZSBub3QgdG8gY2FsbCBvbiB0aGUgYnV0dG9uIHRoYXQgbWlnaHQgYmUgdHJpZ2dlcmluZyB0aGlzIG9uIG9wZW5cclxuICAgICAgICAgICAgaWYgKCBidXR0b24gIT09IG5hdkl0ZW0gKSB7XHJcbiAgICAgICAgICAgICAgICBfLnRvZ2dsZUV4cGFuZGVyKGJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdG9nZ2xlRXhwYW5kZXIoYnV0dG9uKSB7XHJcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b24uZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpO1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBidXR0b24uY2xvc2VzdCgnZGF0YS1sZXZlbCcpO1xyXG5cclxuICAgICAgICBpZiAoYnV0dG9uLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZScpIHtcclxuXHJcbiAgICAgICAgICAgIF8ubmF2LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiYmVmb3JlLmV4cGFuZGVyLmNsb3NlXCIsIHsgY2xpY2tOYXY6IF8gfSApKTtcclxuXHJcbiAgICAgICAgICAgIHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXy5jb25maWcucGFuZWxBY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgXy5uYXYuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJhZnRlci5leHBhbmRlci5jbG9zZVwiLCB7IGNsaWNrTmF2OiBfIH0gKSk7XHJcbiAgICAgICAgICAgIH0sIF8uY29uZmlnLmFuaW1hdGlvblNwZWVkKVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfLm5hdi5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImJlZm9yZS5leHBhbmRlci5vcGVuXCIsIHsgY2xpY2tOYXY6IF8gfSApKTtcclxuXHJcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIF8ucmVzZXRFeHBhbmRlcnMoYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWxldmVsXScpLCBidXR0b24pO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYW5lbC5jbGFzc0xpc3QuYWRkKF8uY29uZmlnLnBhbmVsQWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggXy5jb25maWcuaXNBdXRvQ2xvc2UgKSB7IC8vIE9ubHkgYWRkIGlmIChkZWZhdWx0KSBtZW51cyBzZXQgdG8gYXV0byBjbG9zZVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXy5oYW5kbGVNZW51KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBfLm5hdi5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImFmdGVyLmV4cGFuZGVyLm9wZW5cIiwgeyBjbGlja05hdjogXyB9ICkpO1xyXG4gICAgICAgICAgICAgICAgfSwgXy5jb25maWcuYW5pbWF0aW9uU3BlZWQpO1xyXG5cclxuICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJnbG9iYWwiLCJjbGFzc29mIiwiSW5kZXhlZE9iamVjdCIsImRvY3VtZW50IiwiREVTQ1JJUFRPUlMiLCJjcmVhdGVFbGVtZW50IiwiSUU4X0RPTV9ERUZJTkUiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSIsImRlZmluZVByb3BlcnR5TW9kdWxlIiwic3RvcmUiLCJXZWFrTWFwIiwiaGFzIiwiTkFUSVZFX1dFQUtfTUFQIiwib2JqZWN0SGFzIiwiSW50ZXJuYWxTdGF0ZU1vZHVsZSIsIm1pbiIsInJlcXVpcmUkJDAiLCJoaWRkZW5LZXlzIiwiaW50ZXJuYWxPYmplY3RLZXlzIiwiZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSIsImdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzRm9yY2VkIiwiTkFUSVZFX1NZTUJPTCIsIlN5bWJvbCIsIlVTRV9TWU1CT0xfQVNfVUlEIiwidXNlckFnZW50IiwiU1BFQ0lFUyIsIlY4X1ZFUlNJT04iLCIkIiwiYUZ1bmN0aW9uIiwiY3JlYXRlTWV0aG9kIiwiYmluZCIsIlVTRVNfVE9fTEVOR1RIIiwiZm9yRWFjaCIsIkRPTUl0ZXJhYmxlcyIsImdlbmVyYXRlSUQiLCJnbG9iYWxJZENvdW50ZXIiLCJiYXNlU3RyIiwibmV3U3RyaW5nIiwiZ2V0RWxlbWVudEJ5SWQiLCJwYXJzZUludCIsIk1hdGgiLCJyYW5kb20iLCJpbnNlcnRBZnRlciIsImVsIiwicmVmZXJlbmNlTm9kZSIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsIkNsaWNrTmF2IiwiZWxlbWVudCIsImRlZmF1bHRzIiwibWVudXR5cGUiLCJhbmltYXRpb25TcGVlZCIsIm1lbnVTZWxlY3RvciIsInRvZ2dsZVNlbGVjdG9yIiwibGlua1NlbGVjdG9yIiwiaHRtbENsYXNzIiwicGFuZWxBY3RpdmVDbGFzcyIsImV4cGFuZGVyQ2xhc3MiLCJleHBhbmRlclRleHQiLCJjcmVhdGVMYW5kaW5nTGlua3MiLCJzZXBhcmF0ZUV4cGFuZGVycyIsImlzQXV0b0Nsb3NlIiwiaXNSVEwiLCJwYXJhbXMiLCJjb25maWciLCJuYXYiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlRXhwYW5kZXIiLCJoYW5kbGVNZW51IiwiX2luaXQiLCJfIiwiYXZhaWxhYmxlTGlua3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiY2xpY2tOYXYiLCJzZXRBdHRyaWJ1dGUiLCJsaW5rIiwic2libGluZ3MiLCJnZXRTaWJsaW5ncyIsInNpYmxpbmciLCJIVE1MRGl2RWxlbWVudCIsIkhUTUxPTGlzdEVsZW1lbnQiLCJIVE1MVUxpc3RFbGVtZW50IiwicGFuZWxJRCIsImdldEF0dHJpYnV0ZSIsImJ1dHRvbiIsImNyZWF0ZUV4cGFuZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRldGVybWluZUxldmVsIiwibGlua1RleHQiLCJpbm5lclRleHQiLCJwbGFjZWhvbGRlciIsImlubmVySFRNTCIsImNvbnRlbnQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImV4cGFuZGVycyIsImVsZW0iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZm91bmRMZXZlbCIsImNsb3Nlc3QiLCJkYXRhc2V0IiwibGV2ZWwiLCJlIiwidG9nZ2xlRXhwYW5kZXIiLCJjdXJyZW50VGFyZ2V0IiwiY29udGFpbnMiLCJ0YXJnZXQiLCJsZWF2aW5nTWVudSIsInJlc2V0RXhwYW5kZXJzIiwic2V0VGltZW91dCIsInBhcmVudCIsImNoaWxkcmVuIiwiZmlsdGVyIiwiY2hpbGQiLCJuYXZUcmVlIiwibmF2SXRlbSIsImFjdGl2ZUl0ZW1zIiwicGFuZWwiLCJ3cmFwcGVyIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFLEVBQUU7QUFDMUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBLFlBQWM7QUFDZDtBQUNBLEVBQUUsS0FBSyxDQUFDLE9BQU8sVUFBVSxJQUFJLFFBQVEsSUFBSSxVQUFVLENBQUM7QUFDcEQsRUFBRSxLQUFLLENBQUMsT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQztBQUM1QyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDO0FBQ3hDLEVBQUUsS0FBSyxDQUFDLE9BQU9BLGNBQU0sSUFBSSxRQUFRLElBQUlBLGNBQU0sQ0FBQztBQUM1QztBQUNBLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFOztBQ1ozQixTQUFjLEdBQUcsVUFBVSxJQUFJLEVBQUU7QUFDakMsRUFBRSxJQUFJO0FBQ04sSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVB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
