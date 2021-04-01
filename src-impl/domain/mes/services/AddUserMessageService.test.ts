import { expect } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';

describe('Test mes:AddUserMessageService', () => {

  const testEnvironment = new TestEnvironment();
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Add a message', async () => {
    const runner = new serviceRunners.mes_AddUserMessageServiceRunner();
    const input = testEnvironment.factory.entity.mes.AddUserMessageService_Input();
    input.sender = 'Test Sender';
    input.user = 'testUser';
    input.text = 'Test message';
    runner.input = input;

    const output = await runner.run();
    expect(output.sender).to.equal('Test Sender');
    expect(output.user).to.equal('testUser');
    expect(output.text).to.equal('Test Message');
    expect(output._id).to.not.equal('');
  });

});
