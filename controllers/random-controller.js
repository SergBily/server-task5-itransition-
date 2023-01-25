import { dataService } from '../services/data-service.js';

class RandomController {
  getFakesData(request, response, next) {
    try {
      const {
        seed, errorRate, region, page,
      } = request.body;
      const fakerData = dataService.getfakesData(region, seed, page, errorRate);
      return response.json(fakerData);
    } catch (e) {
      next(e);
    }
  }
}

export const randomController = new RandomController();
