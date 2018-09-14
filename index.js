'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 *
 * @returns {Array<String|Number|AsIs>}
 */
const cratePathSequence = () => [];

/**
 *
 * @param {Array<String|Number|AsIs>} sequence
 * @param {String|Number|AsIs} name
 */
const appendToPathSequence = (sequence, name) => sequence.push(name);

/**
 * Wrap any value with AsIs() to pass it to string as is without ant wrapping
 * or dot prior to name.
 * @param {*} value
 */
function AsIs(value) {
  if (this instanceof AsIs) {
    this.value = value;
  } else {
    return new AsIs(value);
  }
}

function asIs() {
  return this.value;
}

AsIs.prototype.toString = asIs;
AsIs.prototype.valueOf = asIs;
AsIs.prototype[Symbol.toPrimitive] = asIs;

/**
 *
 * @param {String} str
 * @param {String|AsIs|Number} name
 */
const appendPathNameToString = (str, name) => {
  const string = String(str) || '';

  if (name instanceof AsIs) {
    return `${string}${name}`;
  }

  if (String(parseInt(name, 10)) === name) {
    return `${string}[${name}]`;
  }

  if (/^[a-z_$][\w\d$_]*$/i.test(name)) {
    return string ? `${string}.${name}` : name;
  }

  return `${string}["${name}"]`;
};

/**
 * @param {Array<String|Number|AsIs>} sequence
 * @param {String|Number|AsIs} [lastName]
 */
const buildPath = (sequence, lastName) => {
  const path = sequence.reduce(appendPathNameToString, '');

  if (lastName !== undefined) {
    return appendPathNameToString(path, lastName);
  }

  return path;
};

exports.cratePathSequence = cratePathSequence;
exports.appendToPathSequence = appendToPathSequence;
exports.AsIs = AsIs;
exports.appendPathNameToString = appendPathNameToString;
exports.buildPath = buildPath;
exports.default = buildPath;
//# sourceMappingURL=index.js.map
