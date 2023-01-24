import { phonesSnippet } from '../models/phones-model.js';

export const getPhoneSnippet = (region) => phonesSnippet[region];
