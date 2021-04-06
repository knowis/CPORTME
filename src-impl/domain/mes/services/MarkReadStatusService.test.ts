import { expect } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test MarkReadStatusService', () => {

  let aggregateId = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    aggregateId = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 1');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Marks read status as read', async () => {
    const runner = new serviceRunners.mes_MarkReadStatusServiceRunner();
    const input = testEnvironment.factory.entity.mes.MarkReadStatusService_Input();
    input.id = aggregateId;
    input.read = true;
    runner.input = input;

    await runner.run();
  });

});
