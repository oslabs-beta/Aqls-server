const { expect } = require('@jest/globals');
const { describe } = require('yargs');
const traqlAudit = require('../../server/traqlAudit');

describe('Test traqlAudit functionality', () => {
  it('should only call once if in process', () => {
    const testTraql = { a: 1, b: 2 }
    traqlAudit(testTraql)
    traqlAudit(testTraql)
    expect(traqlAudit.toHaveBeenCalledTimes(1))
  })
})