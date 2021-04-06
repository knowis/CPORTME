import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test API markReadStatus', () => {

  let aggregateId = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    aggregateId = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 1');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });
  it('Marks read status as read', async () => {
    const runner = new operationRunners.v1_markReadStatusRunner();
    runner.request.path.user = 'testUser';
    runner.request.path.id = aggregateId;

    const requestBody = testEnvironment.factory.schema.v1.ReadStatus();
    requestBody.read = true;

    runner.request.body = requestBody;

    const messageResponse = await runner.run();
    expect(messageResponse.status).to.equal(201);
  });

});
