import seedrandom from 'seedrandom';
import random from 'random';
import { alphabet } from '../models/alphabet.js';

class GenerateErrors {
  getDataWithErrors(fakesData, region, errorRate, seed) {
    const countErrors = this.getCountErrors(errorRate);
    random.use(seedrandom(seed));
    return this.transformData(countErrors, fakesData, region);
  }

  transformData(c, f, r) {
    let n = [...f];
    const fields = ['_id', 'fullName', 'address', 'phone'];
    for (let k = 0; k < c; k += 1) {
      n = n.map((o) => {
        const x = this.random(0, 3);
        const copyO = o;
        copyO[fields[x]] = this.getFieldsWithError(o[fields[x]], r);
        return copyO;
      });
    }
    return n;
  }

  deleteRandomCharacter(s) {
    const p = this.random(0, s.length + 1);
    return s.substring(0, p) + s.substring(p);
  }

  addRandomCharacter(s, a) {
    const p = this.random(0, s.length);
    return s.substring(0, p + 1) + this.getRandomCharacter(a) + s.substring(p + 1);
  }

  swapNearCharacters(s) {
    const copyS = s.split('');
    const p = this.random(0, s.length);
    if (p === s.length - 1) {
      copyS[p] = s[p - 1];
      copyS[p - 1] = s[p];
    } else {
      copyS[p] = s[p + 1];
      copyS[p + 1] = s[p];
    }
    return copyS.join('');
  }

  random(s, e) {
    return random.int(s, e);
  }

  getRandomCharacter(c) {
    const a = alphabet[c];
    const p = this.random(0, a.length - 1);
    return a[p];
  }

  getCountErrors(e) {
    return Math.ceil(e) - e
      ? Math.floor(e) + this.random(0, 1)
      : e;
  }

  getFieldsWithError(s, r) {
    const e = this.random(0, 2);
    let n = '';
    switch (e) {
      case 0:
        n = this.deleteRandomCharacter(s);
        break;
      case 1:
        n = this.addRandomCharacter(s, r);
        break;
      default:
        n = this.swapNearCharacters(s);
        break;
    }
    return n;
  }
}

export const generateErrors = new GenerateErrors();
