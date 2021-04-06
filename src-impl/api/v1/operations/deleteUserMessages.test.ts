import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test API deleteUserMessages', () => {
  const testEnvironment = new TestEnvironment();
  before(async () => {
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 1');
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 2');
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser2', 'Test message 3');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });
  it('Deletes all messages from the user', async () => {
    const runner = new operationRunners.v1_deleteUserMessagesRunner();
    runner.request.path.user = 'testUser';

    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(204);
  });

  it('Deletes all messages from a not existing user', async () => {
    const runner = new operationRunners.v1_deleteUserMessagesRunner();
    runner.request.path.user = 'notExisting';

    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(204);
  });

});
