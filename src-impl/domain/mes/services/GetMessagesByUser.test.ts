import { expect } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';

describe('Test Service mes:GetMessagesByUser', () => {

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

  it('Gets all messages for a user', async () => {
    const runner = new serviceRunners.mes_GetMessagesByUserRunner();
    const getMessagesByUserInput = testEnvironment.factory.entity.mes.GetMessagesByUser_Input();
    getMessagesByUserInput.user = 'testUser';

    runner.input = getMessagesByUserInput;
    await runner.run();
    const output = runner.output;
    expect(output.length).above(0);
  });

  it('Gets all messages for a not existing user', async () => {
    const runner = new serviceRunners.mes_GetMessagesByUserRunner();
    const getMessagesByUserInput = testEnvironment.factory.entity.mes.GetMessagesByUser_Input();
    getMessagesByUserInput.user = 'testUser2';

    runner.input = getMessagesByUserInput;
    await runner.run();
    const output = runner.output;
    expect(output.length).equal(0);
  });

});
