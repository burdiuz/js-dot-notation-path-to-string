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

  if (typeof name === 'symbol') {
    return `${string}[${String(name)}]`;
  }

  if (String(parseInt(name, 10)) === String(name)) {
    return `${string}[${name}]`;
  }

  if (/^[a-z_$][\w\d$_]*$/i.test(name)) {
    return string ? `${string}.${name}` : name;
  }

  return `${string}["${name}"]`;
};

class PathSequence {
  constructor(value) {
    this.value = value ? String(value) : '';
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

  clone(nextName = undefined) {
    const sequence = new PathSequence(this.value);

    if (nextName === undefined) {
      sequence.lastName = this.lastName;
    } else {
      sequence.append(nextName);
    }

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
export const createPathSequence = (value) => new PathSequence(value);

export default PathSequence;
