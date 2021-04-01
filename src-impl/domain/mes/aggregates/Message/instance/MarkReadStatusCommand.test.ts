import { expect } from 'chai';
import { commandRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../../../test/testUtil';

describe('Test mes:MarkReadStatusCommand', () => {

  let aggregateId = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    aggregateId = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Marks read status as read', async () => {
    const runner = new commandRunners.mes_MarkReadStatusCommandRunner();
    const input = testEnvironment.factory.entity.mes.MarkReadStatusCommand_Input();
    input.read = true;
    runner.input = input;

    const output = await runner.run(aggregateId);
    expect(output.read).to.equal(true);

    input.read = false;
    runner.input = input;
    const outputUnread = await runner.run(aggregateId);
    expect(outputUnread.read).to.equal(false);
  });

});
