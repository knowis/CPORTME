import { expect } from 'chai';
import { commandRunners, TestEnvironment } from 'solution-framework';

describe('mes:AddMessage', () => {

  const testEnvironment = new TestEnvironment();

  after(async () => {
    await testEnvironment.cleanup();
  });

  it('works', async () => {
    const runner = new commandRunners.mes_AddMessageRunner();

    const content = testEnvironment.factory.entity.mes.MessageContent();
    content.content = 'Text';

    const addMessage = testEnvironment.factory.entity.mes.AddMessage_Input();
    addMessage.sender = 'World Bank';
    addMessage.user = 'rkr';
    addMessage.text = [content];

    runner.input = addMessage;

    const newMessage = await runner.run();
    expect(newMessage.sender).to.equal('World Bank');
    expect(newMessage.user).to.equal('rkr');
    expect(newMessage.text[0].content).to.equal('Text');
    expect(newMessage._id).to.not.equal('');
  });

});
