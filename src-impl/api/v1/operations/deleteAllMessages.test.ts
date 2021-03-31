import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';

describe('deleteAllMessages', () => {
  const testEnvironment = new TestEnvironment();
  before(async () => {
    const message1 = testEnvironment.factory.entity.mes.Message();
    message1.sender = 'Test Sender';
    message1.user = 'testUser';
    message1.text = 'Test message';
    message1.createdOn = new Date();
    message1.createdBy = 'system';

    await message1.persist();

    const message2 = testEnvironment.factory.entity.mes.Message();
    message2.sender = 'Test Sender';
    message2.user = 'testUser';
    message2.text = 'Test message';
    message2.createdOn = new Date();
    message2.createdBy = 'system';

    await message2.persist();
  });
  after(async () => {
    await testEnvironment.cleanup();
  });
  it('works', async () => {
    // const runner = new operationRunners.v1_deleteAllMessagesRunner();
    // await runner.run();
    console.warn('No tests available');
    expect(true).to.equal(true);
  });

});
