import { expect } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test mes:ReadUserMessageService', () => {

  let aggregateId = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    aggregateId = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Reads a message by ID', async () => {
    const runner = new serviceRunners.mes_ReadUserMessageServiceRunner();
    const input = testEnvironment.factory.entity.mes.ReadUserMessageService_Input();
    input.id = aggregateId;

    runner.input = input;
    await runner.run();
    const output = runner.output;
    expect(output.sender).to.equal('Test Sender');
    expect(output.user).to.equal('testUser');
    expect(output.text).to.equal('Test message');
    expect(output._id).to.equal(aggregateId);
  });

  it('Reads a message by a not existing Id', async () => {
    const runner = new serviceRunners.mes_ReadUserMessageServiceRunner();
    const input = testEnvironment.factory.entity.mes.ReadUserMessageService_Input();
    input.id = 'eaa57c4b-99a1-41fc-b66a-f98060002316';

    runner.input = input;
    try {
      await runner.run();
    } catch(error) {
      expect(error.message).to.equal(`Could not find aggregate with id="eaa57c4b-99a1-41fc-b66a-f98060002316" in datastore`);
      expect(error.type).to.equal('AggregateNotFoundError');
    }
  });

  it('Reads a message by an invalid Id', async () => {
    const runner = new serviceRunners.mes_ReadUserMessageServiceRunner();
    const input = testEnvironment.factory.entity.mes.ReadUserMessageService_Input();
    input.id = 'invalid-key';
    runner.input = input;

    try {
      await runner.run();
    } catch(error) {
      expect(error.message).to.equal(`Error occurred while getting data for aggregate invalid-key, returned statusCode: 400`);
      expect(error.type).to.equal('InternalRequestError');
    }
  });

  it('Reads a message by an Id as undefined input', async () => {
    const runner = new serviceRunners.mes_ReadUserMessageServiceRunner();
    const input = testEnvironment.factory.entity.mes.ReadUserMessageService_Input();
    input.id = undefined;
    runner.input = input;

    try {
      await runner.run();
    } catch(error) {
      expect(error.message).to.equal(`The entity mes:ReadUserMessageService_Input is not valid`);
      expect(error.type).to.equal('ValidationError');
    }
  });

});
