import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';

describe('addUserMessage', () => {
  const testEnvironment = new TestEnvironment();

  after(async () => {
    await testEnvironment.cleanup();
  });
  it('works', async () => {
    const runner = new operationRunners.v1_addUserMessageRunner();

    const message = testEnvironment.factory.entity.mes.Message();
    message.sender = 'Test Sender';
    message.user = 'testUser';
    message.text = 'Test message';
    message.createdOn = new Date();
    message.createdBy = 'system';

    await message.persist();

    const messageResponse = await runner.run();
    expect(messageResponse.status).to.equal(200);
  });

});
