class HTTPError extends Error {
  /**
   * @param {number} statusCode
   * @param {string} message
   */
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}
module.exports = HTTPError
