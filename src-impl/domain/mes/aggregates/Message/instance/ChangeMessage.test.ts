import { expect } from 'chai';
import { commandRunners, TestEnvironment } from 'solution-framework';

describe('mes:ChangeMessage', () => {

  const testEnvironment = new TestEnvironment();
  let aggregateId = '';
  before(async () => {
    const message = testEnvironment.factory.entity.mes.Message();
    message.sender = 'Test Sender';
    message.user = 'testUser';
    message.text = 'Test message';

    await message.persist();
    aggregateId = message._id;
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('works', async () => {
    const runner = new commandRunners.mes_ChangeMessageRunner();

    const changeMessageInput = testEnvironment.factory.entity.mes.ChangeMessage_Input();
    changeMessageInput.id = aggregateId;
    changeMessageInput.sender = 'Change Test Bank';
    changeMessageInput.user = 'testUser';
    changeMessageInput.text = 'Changed Text';

    runner.input = changeMessageInput;
    const changedMessage = await runner.run(aggregateId);
    expect(changedMessage._id).to.equal(aggregateId);
    const message = await testEnvironment.repo.mes.Message.findById(aggregateId);
    expect(message.sender).to.equal('Change Test Bank');
  });

});
