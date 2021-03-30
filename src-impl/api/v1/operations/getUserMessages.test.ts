import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';

describe('getUserMessages', () => {
  const testEnvironment = new TestEnvironment();
  before(async () => {
    const text1 = testEnvironment.factory.entity.mes.MessageContent();
    text1.content = 'Test message';

    const message1 = testEnvironment.factory.entity.mes.Message();
    message1.sender = 'Test Sender';
    message1.user = 'testUser';
    message1.timestamp = new Date();
    message1.text = [ text1 ];

    await message1.persist();

    const text2 = testEnvironment.factory.entity.mes.MessageContent();
    text2.content = 'Test message 2';
    const message2 = testEnvironment.factory.entity.mes.Message();
    message2.sender = 'Test Sender';
    message2.user = 'testUser';
    message2.timestamp = new Date();
    message2.text = [ text2 ];

    await message2.persist();
  });
  after(async () => {
    await testEnvironment.cleanup();
  });
  it('works', async () => {
    const runner = new operationRunners.v1_getUserMessagesRunner();
    runner.request.path.user = 'testUser';
    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(200);

    const messages = apiResponse.body;
    expect(messages.length).greaterThan(0);
  });

});
