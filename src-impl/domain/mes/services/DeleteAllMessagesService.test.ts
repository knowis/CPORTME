import { serviceRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test mes:DeleteAllMessagesService', () => {

  const testEnvironment = new TestEnvironment();
  before(async () => {
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser1', 'Test message 1');
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser1', 'Test message 2');
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser2', 'Test message 3');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Deletes all messages', async () => {
    const runner = new serviceRunners.mes_DeleteAllMessagesServiceRunner();
    await runner.run();
    // await skipTick();
    // const messages = await testEnvironment.repo.mes.Message.find();
    // assert.isEmpty(messages);
  });

});
