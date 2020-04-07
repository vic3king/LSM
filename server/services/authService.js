import User from '../db/models/user';

import BaseService from './baseService';

/**
 * @class AuthService
 */
export default class AuthService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(User);
  }
}

export const authService = new AuthService();
