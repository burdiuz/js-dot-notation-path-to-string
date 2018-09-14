/**
 *
 * @returns {Array<String|Number|AsIs>}
 */
export const cratePathSequence = () => [];

/**
 *
 * @param {Array<String|Number|AsIs>} sequence
 * @param {String|Number|AsIs} name
 */
export const appendToPathSequence = (sequence, name) => sequence.push(name);

/**
 * Wrap any value with AsIs() to pass it to string as is without ant wrapping
 * or dot prior to name.
 * @param {*} value
 */
export function AsIs(value) {
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
export const appendPathNameToString = (str, name) => {
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
export const buildPath = (sequence, lastName) => {
  const path = sequence.reduce(appendPathNameToString, '');

  if (lastName !== undefined) {
    return appendPathNameToString(path, lastName);
  }

  return path;
};

export default buildPath;
