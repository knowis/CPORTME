import { expect } from 'chai';
import { commandRunners, TestEnvironment } from 'solution-framework';

describe('Test mes:AddMessageCommand', () => {

  const testEnvironment = new TestEnvironment();

  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Add a message', async () => {
    const runner = new commandRunners.mes_AddMessageCommandRunner();
    const addMessage = testEnvironment.factory.entity.mes.AddMessageCommand_Input();
    addMessage.sender = 'Test Sender';
    addMessage.user = 'testUser';
    addMessage.text = 'Test Message';

    runner.input = addMessage;

    const newMessage = await runner.run();
    expect(newMessage.sender).to.equal('Test Sender');
    expect(newMessage.user).to.equal('testUser');
    expect(newMessage.text).to.equal('Test Message');
    expect(newMessage.read).to.equal(false);
    expect(newMessage._id).to.not.equal('');
  });

});
