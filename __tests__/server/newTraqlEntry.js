const { expect, it, beforeEach, afterEach } = require('@jest/globals');
const newTraqlEntry = require('../../server/newTraqlEntry');

describe('create newTraqlEntry', () => {

  beforeEach(() => {
    traql = {subResolvers: 2};
    args = {aql: {mutationId: 1, resolver: 'resolver', userToken: 2}};
    pubsub = {subscriptions: {key1: 1, key2: 2, key3: 3, key4: 4}};
  });
  
  afterEach(() => {
    traql = {};
    args = {};
    pubsub = {};
  });

  it('should create a new attribute on the traql object with a key name of the mutation id and the value of an object', () => {
    expect(Object.keys(traql).length === 1);
    expect(traql.hasOwnProperty(1) === false);
    newTraqlEntry(traql, args, pubsub);
    expect(Object.keys(traql).length === 2);
    expect(traql.hasOwnProperty(1) === true);
    expect(typeof traql[1]).toBe('object');
  });

  it('should add to the created object a key named resolver with the value args.aql.resolver from the passed in args parameter', () => {
    newTraqlEntry(traql, args, pubsub);
    expect(traql[1].resolver).toEqual(args.aql.resolver);
  });

  it('should have a non-null resolver attribute', () => {
    newTraqlEntry(traql, args, pubsub);
    expect(traql[1].resolver).not.toBeUndefined();
    expect(traql[1].resolver).not.toBeNull();
  });

  it('should add to the created object a key named openedTime with a value of the current time', () => {
    const realDateNow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => 1530518207007);
    global.Date.now = dateNowStub;
    newTraqlEntry(traql, args, pubsub);
    expect(traql[1].openedTime).toBe(Date.now());
    global.Date.now = realDateNow;
  });

  it('should add to the created object a key named expectedNumberOfAqls with the values of the number of subscriptions divided by the number of resolvers', () => {
    newTraqlEntry(traql, args, pubsub);
    expect(traql[1].expectedNumberOfAqls).toBe(2);
  });

  it('should have a non-null expectedNumberOfAqls attribute', () => {
    newTraqlEntry(traql, args, pubsub);
    expect(traql[1].expectedNumberOfAqls + 1).toBeTruthy();
  });

  it('should add to the created object a key named aqlsReceivedBack and a value of an empty array', () => {
    newTraqlEntry(traql, args, pubsub);
    expect(traql[1].aqlsReceivedBack).toEqual([]);
  });

  it('should add to the created object a key named userToken and a value args.aql.userToken from the passed in args parameter', () => {
    newTraqlEntry(traql, args, pubsub);
    expect(traql[1].userToken).toBe(args.aql.userToken);
  });

  it('should have a non-null userToken attribute', () => {
    newTraqlEntry(traql, args, pubsub);
    expect(traql[1].userToken).not.toBeUndefined();
    expect(traql[1].userToken).not.toBeNull();
  });

});