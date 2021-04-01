import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';

describe('Test API addUserMessage', () => {
  const testEnvironment = new TestEnvironment();

  after(async () => {
    await testEnvironment.cleanup();
  });
  it('Add a message for a user', async () => {
    const runner = new operationRunners.v1_addUserMessageRunner();
    runner.request.path.user = 'testUser';

    const requestBody = testEnvironment.factory.schema.v1.MessageBase();
    requestBody.sender = 'Test Sender';
    requestBody.text = 'Test message';

    runner.request.body = requestBody;

    const messageResponse = await runner.run();
    expect(messageResponse.status).to.equal(201);
  });

});
