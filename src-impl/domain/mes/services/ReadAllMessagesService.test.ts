import { assert } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test mes:ReadAllMessagesService', () => {

  const testEnvironment = new TestEnvironment();
  before(async () => {
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser1', 'Test message 1');
    await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser2', 'Test message 2');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Reads all messages', async () => {
    const runner = new serviceRunners.mes_ReadAllMessagesServiceRunner();

    await runner.run();
    const output = runner.output;
    assert.isNotEmpty(output);
  });

});
