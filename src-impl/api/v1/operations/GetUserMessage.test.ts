import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test API getUserMessage', () => {

  let aggregateId = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    aggregateId = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 1');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Reads a message by an Id', async () => {
    const runner = new operationRunners.v1_getUserMessageRunner();
    runner.request.path.user = 'testUser';
    runner.request.path.id = aggregateId;

    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(200);

    const message = apiResponse.body;
    expect(message.text).to.equal('Test message 1');
  });

  it('Reads a message by a not existing user', async () => {
    const runner = new operationRunners.v1_getUserMessageRunner();
    runner.request.path.user = 'notExistingUser';
    runner.request.path.id = aggregateId;

    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(200);
  });

  it('Reads a message by a not existing Id', async () => {
    const runner = new operationRunners.v1_getUserMessageRunner();
    runner.request.path.user = 'testUser';
    runner.request.path.id = 'eaa57c4b-99a1-41fc-b66a-f98060002316';

    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(404);
  });

  it('Reads a message by an invalid Id', async () => {
    const runner = new operationRunners.v1_getUserMessageRunner();
    runner.request.path.user = 'testUser';
    runner.request.path.id = 'invalidId';

    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(400);
  });
});
