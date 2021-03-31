import { expect } from 'chai';
import { commandRunners, TestEnvironment } from 'solution-framework';

describe('mes:DeleteMessage', () => {

  let aggregateId = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    const text1 = testEnvironment.factory.entity.mes.MessageContent();
    text1.content = 'Test message';

    const message1 = testEnvironment.factory.entity.mes.Message();
    message1.sender = 'Test Sender';
    message1.user = 'testUser';
    message1.timestamp = new Date();
    message1.text = [text1];

    await message1.persist();
    aggregateId = message1._id;

    const text2 = testEnvironment.factory.entity.mes.MessageContent();
    text2.content = 'Test message 2';

    const message2 = testEnvironment.factory.entity.mes.Message();
    message2.sender = 'Test Sender 2';
    message2.user = 'testUser';
    message2.timestamp = new Date();
    message2.text = [text2];

    await message2.persist();
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('works', async () => {
    const runner = new commandRunners.mes_DeleteMessageRunner();

    const deleteMessageInput = testEnvironment.factory.entity.mes.DeleteMessage_Input();
    deleteMessageInput.id = aggregateId;

    runner.input = deleteMessageInput;

    await runner.run(aggregateId);
    const messages = await testEnvironment.repo.mes.Message.find();
    expect(messages.length).to.equal(1);
    try {
      await testEnvironment.repo.mes.Message.findById(aggregateId);
    } catch (error) {
      expect(error.message).to.equal(`Could not find aggregate with id="${aggregateId}" in datastore`);
    }
  });

});
