import { expect } from 'chai';
import { commandRunners, TestEnvironment } from 'solution-framework';

describe('mes:DeleteAllMessages', () => {

  let aggregateId = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    const message1 = testEnvironment.factory.entity.mes.Message();
    message1.sender = 'Test Sender';
    message1.user = 'testUser';
    message1.text = 'Test message';
    message1.createdOn = new Date();
    message1.createdBy = 'system';

    await message1.persist();
    aggregateId = message1._id;

    const message2 = testEnvironment.factory.entity.mes.Message();
    message2.sender = 'Test Sender 2';
    message2.user = 'testUser';
    message1.text = 'Test message 2';
    message1.createdOn = new Date();
    message1.createdBy = 'system';

    await message2.persist();
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('works', async () => {
    const runner = new commandRunners.mes_DeleteAllMessagesRunner();
    await runner.run(aggregateId);
    const messages = await testEnvironment.repo.mes.Message.find();
    expect(messages.length).to.equal(0);
  });

});
