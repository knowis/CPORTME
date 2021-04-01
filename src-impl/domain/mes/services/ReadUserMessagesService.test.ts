import { assert } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test mes:ReadUserMessagesService', () => {

  const testEnvironment = new TestEnvironment();
  before(async () => {
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 1');
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 2');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Gets all messages for a user', async () => {
    const runner = new serviceRunners.mes_ReadUserMessagesServiceRunner();
    const input = testEnvironment.factory.entity.mes.ReadUserMessagesService_Input();
    input.user = 'testUser';

    runner.input = input;
    await runner.run();
    const output = runner.output;
    assert.isNotEmpty(output);
  });

  it('Gets all messages for a not existing user', async () => {
    const runner = new serviceRunners.mes_ReadUserMessagesServiceRunner();
    const input = testEnvironment.factory.entity.mes.ReadUserMessagesService_Input();
    input.user = 'notExistingUser';
    runner.input = input;

    await runner.run();
    const output = runner.output;
    assert.isEmpty(output);
  });

  it('Gets all messages with a undefined as user input', async () => {
    const runner = new serviceRunners.mes_ReadUserMessagesServiceRunner();
    const input = testEnvironment.factory.entity.mes.ReadUserMessagesService_Input();
    input.user = undefined;
    runner.input = input;

    await runner.run();
    const output = runner.output;
    assert.isEmpty(output);
  });

});
