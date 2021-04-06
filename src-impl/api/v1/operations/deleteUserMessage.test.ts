import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage } from '../../../test/testUtil';

describe('Test API deleteUserMessage', () => {

  let aggregateId = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    aggregateId = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser', 'Test message 1');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Deletes a message by Id', async () => {
    const runner = new operationRunners.v1_deleteUserMessageRunner();
    runner.request.path.user = 'testUser';
    runner.request.path.id = aggregateId;

    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(204);
  });

  it('Deletes a message by a not existing Id', async () => {
    const runner = new operationRunners.v1_deleteUserMessageRunner();
    runner.request.path.user = 'testUser';
    runner.request.path.id = 'eaa57c4b-99a1-41fc-b66a-f98060002316';

    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(404);
  });

  it('Deletes a message by a not existing user', async () => {
    const runner = new operationRunners.v1_deleteUserMessageRunner();
    runner.request.path.user = 'notExistingUser';
    runner.request.path.id = aggregateId;

    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(404);
  });

  it('Deletes a message by an invalid Id', async () => {
    const runner = new operationRunners.v1_deleteUserMessageRunner();
    runner.request.path.user = 'testUser';
    runner.request.path.id = 'invalidId';

    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(400);
  });

});
