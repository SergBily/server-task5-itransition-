import { csvService } from '../services/csv-service.js';

class CsvController {
  async exportToCsv(request, response, next) {
    try {
      const csvData = csvService.exportToCsv();
      response.setHeader('Content-Type', 'blob');
      response.setHeader('Content-Disposition', 'attachment; filename=fakes_data.csv');
      return response.status(200).end(csvData);
    } catch (e) {
      next(e);
    }
  }
}

export const csvController = new CsvController();
