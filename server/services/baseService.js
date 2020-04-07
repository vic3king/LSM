/**
 * @class BaseService
 */
export default class BaseService {
  /**
   * @method constructor
   * @param {object} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @method create
   * @description
   * @param {object} dataObject
   * @returns {object} created object
   */
  async create(dataObject) {
    const data = this.model.create(dataObject);
    return data;
  }

  /**
   * @method find
   * @param {object} missingObject
   * @returns {object} found object
   */
  async find(missingObject) {
    const found = this.model.findOne(missingObject);
    return found;
  }
}
