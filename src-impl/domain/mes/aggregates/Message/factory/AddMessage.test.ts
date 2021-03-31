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
    content.content = 'Test Message';

    const addMessage = testEnvironment.factory.entity.mes.AddMessage_Input();
    addMessage.sender = 'Test Sender';
    addMessage.user = 'testUser';
    addMessage.text = [content];

    runner.input = addMessage;

    const newMessage = await runner.run();
    expect(newMessage.sender).to.equal('Test Sender');
    expect(newMessage.user).to.equal('testUser');
    expect(newMessage.text[0].content).to.equal('Test Message');
    expect(newMessage._id).to.not.equal('');
  });

});
