import { expect } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage, testMessageExists } from '../../../test/testUtil';

describe('Test mes:DeleteUserMessageService', () => {

  let aggregateId1 = '';
  let aggregateId2 = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    aggregateId1 = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 1');
    aggregateId2 = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 2');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Deletes a message by ID', async () => {
    const runner = new serviceRunners.mes_DeleteUserMessageServiceRunner();
    const input = testEnvironment.factory.entity.mes.DeleteUserMessageService_Input();
    input.id = aggregateId1;
    runner.input = input;

    await runner.run();
    expect(await testMessageExists(testEnvironment, aggregateId1)).to.equal(false);
    expect(await testMessageExists(testEnvironment, aggregateId2)).to.equal(true);
  });

  it('Deletes a message by not existing ID', async () => {
    const runner = new serviceRunners.mes_DeleteUserMessageServiceRunner();
    const input = testEnvironment.factory.entity.mes.DeleteUserMessageService_Input();
    input.id = 'eaa57c4b-99a1-41fc-b66a-f98060002316';
    runner.input = input;

    try {
      await runner.run();
    } catch(error) {
      expect(error.message).to.equal(`Could not find aggregate with id="eaa57c4b-99a1-41fc-b66a-f98060002316" in datastore`);
      expect(error.type).to.equal('AggregateNotFoundError');
    }
  });

  it('Deletes a message by ID with an undefined as input', async () => {
    const runner = new serviceRunners.mes_DeleteUserMessageServiceRunner();
    const input = testEnvironment.factory.entity.mes.DeleteUserMessageService_Input();
    input.id = undefined;
    runner.input = input;

    try {
      await runner.run();
    } catch(error) {
      expect(error.message).to.equal(`The entity mes:DeleteUserMessageService_Input is not valid`);
      expect(error.type).to.equal('ValidationError');
    }
  });

});
