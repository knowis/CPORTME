import { expect } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';

describe('Test Service mes:GetMessageById', () => {

  let aggregateId = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    const message1 = testEnvironment.factory.entity.mes.Message();
    message1.sender = 'Test Sender';
    message1.user = 'testUser';
    message1.text = 'Test message';
    message1.createdOn = new Date();
    message1.createdBy = 'system';

    await message1.persist();
    aggregateId = message1._id;
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Gets a message', async () => {
    const runner = new serviceRunners.mes_GetMessageByIdRunner();
    const getMessageByIdInput = testEnvironment.factory.entity.mes.GetMessageById_Input();
    getMessageByIdInput.id = aggregateId;

    runner.input = getMessageByIdInput;
    await runner.run();
    const output = runner.output;
    expect(output.sender).to.equal('Test Sender');
    expect(output.user).to.equal('testUser');
    expect(output.text).to.equal('Test message');
    expect(output._id).to.equal(aggregateId);
  });

  it('Gets a message by a not existing Id', async () => {
    const runner = new serviceRunners.mes_GetMessageByIdRunner();
    const getMessageByIdInput = testEnvironment.factory.entity.mes.GetMessageById_Input();
    getMessageByIdInput.id = 'eaa57c4b-99a1-41fc-b66a-f98060002316';

    runner.input = getMessageByIdInput;
    try {
      await runner.run();
    } catch(error) {
      expect(error.message).to.equal(`Could not find aggregate with id="eaa57c4b-99a1-41fc-b66a-f98060002316" in datastore`);
      expect(error.type).to.equal('AggregateNotFoundError');
      console.log(error.type);
      console.log(JSON.stringify(error));
    }
  });

  it('Gets a message by an invalid Id', async () => {
    const runner = new serviceRunners.mes_GetMessageByIdRunner();
    const getMessageByIdInput = testEnvironment.factory.entity.mes.GetMessageById_Input();
    getMessageByIdInput.id = 'invalid-key';

    runner.input = getMessageByIdInput;
    try {
      await runner.run();
    } catch(error) {
      expect(error.message).to.equal(`Error occurred while getting data for aggregate invalid-key, returned statusCode: 400`);
      console.log(JSON.stringify(error));
    }
  });

});
