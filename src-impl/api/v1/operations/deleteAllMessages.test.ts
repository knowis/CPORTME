import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test API deleteAllMessages', () => {
  const testEnvironment = new TestEnvironment();
  before(async () => {
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 1');
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 2');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });
  it('Deletes all messages', async () => {
    const runner = new operationRunners.v1_deleteAllMessagesRunner();
    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(204);
  });

});
