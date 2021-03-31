import { expect } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';

describe('mes:GetMessageById', () => {

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
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('works', async () => {
    const runner = new serviceRunners.mes_GetMessageByIdRunner();
    const getMessageByIdInput = testEnvironment.factory.entity.mes.GetMessageById_Input();
    getMessageByIdInput.id = aggregateId;

    runner.input = getMessageByIdInput;
    await runner.run();
    const output = runner.output;
    expect(output.sender).to.equal('Test Sender');
    expect(output.user).to.equal('testUser');
    expect(output.text[0].content).to.equal('Test message');
    expect(output._id).to.equal(aggregateId);
  });

});
