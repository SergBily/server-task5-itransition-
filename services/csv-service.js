import JSON2CSVParser from 'json2csv/lib/JSON2CSVParser.js';
import { dataService } from './data-service.js';

class CsvService {
  exportToCsv() {
    const UserFakeData = JSON.parse(JSON.stringify(dataService.fakesData));
    const fileHeader = ['Number', 'Identifier', 'FullName', 'Address', 'Phone'];
    const jsonData = new JSON2CSVParser({ fileHeader });
    const csvData = jsonData.parse((UserFakeData));
    return csvData;
  }
}

export const csvService = new CsvService();
