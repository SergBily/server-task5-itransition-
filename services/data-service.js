import { faker } from '@faker-js/faker';
import { getPhoneSnippet } from '../utils/phone.js';

class DataService {
  fakerUsers = [];

  async getfakesData(region, seed) {
    this.fakerUsers = [];
    const usersOnPage = 10;
    for (let i = 0; i < usersOnPage; i += 1) {
      const createdUser = DataService.createRandomData(region);
      createdUser.number = String(i + 1);
      this.fakerUsers.push(createdUser);
    }
    return this.fakerUsers;
  }

  static createRandomData(region) {
    faker.locale = region;
    // faker.seed(i);
    const sex = faker.name.sexType();
    const firstName = faker.name.firstName(sex);
    const lastName = faker.name.lastName(sex);
    const phoneSnippet = getPhoneSnippet(region);
    return {
      _id: faker.datatype.uuid(),
      fullName: `${firstName} ${lastName}`,
      address: `
      ${faker.helpers.arrayElement([faker.address.city(), faker.address.cityName()])}
       ${faker.helpers.arrayElement([faker.address.state(), faker.address.stateAbbr()])}
        ${faker.helpers.arrayElement([faker.address.streetName(), faker.address.streetAddress(false), faker.address.streetAddress()])}
         ${faker.address.buildingNumber()}
          ${faker.address.zipCode()}`.trim(),
      phone: faker.helpers.arrayElement(
        [faker.phone.number(phoneSnippet[0]), faker.phone.number(phoneSnippet[1])],
      ),
    };
  }
}

export const dataService = new DataService();
