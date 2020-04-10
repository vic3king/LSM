import Distributor from '../db/models/distributor';

import BaseService from './baseService';

/**
 * @class DistributorService
 */
export default class DistributorService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Distributor);
  }
}

export const distributorService = new DistributorService();
