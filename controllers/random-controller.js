import { dataService } from '../services/data-service.js';

class RandomController {
  async getFakerData(request, response, next) {
    try {
      const { seed, errorRate, region } = request.body;
      const fakerData = await dataService.getfakesData(region, seed);
      console.log(fakerData);
      return response.json(fakerData);
    } catch (e) {
      next(e);
    }
  }
}

export const randomController = new RandomController();
