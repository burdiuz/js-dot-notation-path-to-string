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

class PathSequence {
  constructor(value) {
    this.value = String(value) || '';
    this.lastName = undefined;
  }

  append(name) {
    this.value = appendPathNameToString(this.value, name);
    this.lastName = name;
  }

  appendCustomValue(customString) {
    this.value = appendPathNameToString(this.value, AsIs(customString));
    this.lastName = customString;
  }

  clone() {
    const sequence = new PathSequence(this.value);
    sequence.lastName = this.lastName;

    return sequence;
  }

  getLastName() {
    return this.lastName;
  }

  toString() {
    return this.value;
  }

  valueOf() {
    return this.value;
  }
}

/**
 *
 * @returns {Array<String|Number|AsIs>}
 */
export const cratePathSequence = (value) => new PathSequence(value);

export default PathSequence;
