import { faker } from '@faker-js/faker';
import seedrandom from 'seedrandom';
import { getPhoneSnippet } from '../utils/phone.js';
import { generateErrors } from './errors-service.js';

class DataService {
  fakesData = [];

  currentSeed = '';

  dataOnPage = 10;

  generatedNumbers = [];

  countNumberData = 1;

  getfakesData(region, seed, page, errorRate) {
    const userSeed = seed + page;
    this.updateSeed(page, seed);
    this.cryptoSeed(userSeed);
    let newData = [];
    for (let i = 0; i < this.dataOnPage; i += 1) {
      const createdData = DataService.createRandomData(region, this.generatedNumbers[i]);
      newData.push(createdData);
    }
    if (errorRate) {
      newData = generateErrors.getDataWithErrors(newData, region, errorRate, userSeed);
      this.addNumberToData(newData);
    } else {
      this.addNumberToData(newData);
    }
    return this.fakesData;
  }

  addNumberToData(d) {
    const b = d;
    for (let i = 0; i < b.length; i += 1) {
      b[i].number = this.countNumberData;
      this.fakesData.push(b[i]);
      this.countNumberData += 1;
    }
  }

  static createRandomData(region, seed) {
    faker.locale = region;
    faker.seed(seed);
    const sex = faker.name.sexType();
    const firstName = faker.name.firstName(sex);
    const lastName = faker.name.lastName(sex);
    const phoneSnippet = getPhoneSnippet(region);
    return {
      _id: faker.datatype.uuid(),
      fullName: `${firstName} ${lastName}`,
      address:
        `${faker.address.zipCode()
        }${faker.address.buildingNumber()
        } ${faker.helpers.arrayElement([faker.address.streetAddress(false),
          faker.address.streetAddress()])
        } ${faker.helpers.arrayElement([faker.address.city(), faker.address.cityName()])
        } ${faker.helpers.arrayElement([faker.address.state(), faker.address.stateAbbr()])
        }`.trim(),
      phone: faker.helpers.arrayElement(
        [faker.phone.number(phoneSnippet[0]), faker.phone.number(phoneSnippet[1])],
      ),
    };
  }

  updateSeed(p, s) {
    if (p === 1) {
      this.currentSeed = s;
      this.fakesData = [];
      this.dataOnPage = 20;
      this.countNumberData = 1;
    } else {
      this.dataOnPage = 10;
    }
  }

  cryptoSeed(s) {
    this.generatedNumbers = [];
    const rng = seedrandom(s);
    for (let i = 0; i < this.dataOnPage; i += 1) {
      this.generatedNumbers.push(rng.int32());
    }
  }
}

export const dataService = new DataService();
