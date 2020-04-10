import Meter from '../db/models/meter';

import BaseService from './baseService';

/**
 * @class MeterService
 */
export default class MeterService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Meter);
  }
}

export const meterService = new MeterService();
