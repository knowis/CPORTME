import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test API getUserMessages', () => {
  const testEnvironment = new TestEnvironment();
  before(async () => {
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 1');
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 2');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Reads a messages for an user', async () => {
    const runner = new operationRunners.v1_getUserMessagesRunner();
    runner.request.path.user = 'testUser';
    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(200);

    const messages = apiResponse.body;
    expect(messages.length).greaterThan(0);
  });

  it('Reads a messages for a not existing user', async () => {
    const runner = new operationRunners.v1_getUserMessagesRunner();
    runner.request.path.user = 'notExistingUser';
    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(200);

    const messages = apiResponse.body;
    expect(messages.length).to.equal(0);
  });

});
