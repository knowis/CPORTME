import { expect } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';
import { buildAndPersistTestMessage, testMessageExists } from '../../../test/testUtil';

describe('Test mes:DeleteUserMessagesService', () => {

  let aggregateId1 = '';
  let aggregateId2 = '';
  let aggregateId3 = '';
  const testEnvironment = new TestEnvironment();
  before(async () => {
    aggregateId1 = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser1', 'Test message 1');
    aggregateId2 = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser1', 'Test message 2');
    aggregateId3 = await buildAndPersistTestMessage(testEnvironment, 'Test Sender', 'testUser2', 'Test message 3');
  });
  after(async () => {
    await testEnvironment.cleanup();
  });

  it('Deletes all messages from the user', async () => {
    const runner = new serviceRunners.mes_DeleteUserMessagesServiceRunner();
    const input = testEnvironment.factory.entity.mes.DeleteUserMessagesService_Input();
    input.user = 'testUser1';
    runner.input = input;

    await runner.run();
    expect(await testMessageExists(testEnvironment, aggregateId1)).to.equal(false);
    expect(await testMessageExists(testEnvironment, aggregateId2)).to.equal(false);
    expect(await testMessageExists(testEnvironment, aggregateId3)).to.equal(true);
  });

  it('Deletes all messages from a not existing user', async () => {
    const runner = new serviceRunners.mes_DeleteUserMessagesServiceRunner();
    const input = testEnvironment.factory.entity.mes.DeleteUserMessagesService_Input();
    input.user = 'notExistsUser';
    runner.input = input;

    await runner.run();
    expect(await testMessageExists(testEnvironment, aggregateId3)).to.equal(true);
  });

  it('Deletes all messages from a user with an undefined as input', async () => {
    const runner = new serviceRunners.mes_DeleteUserMessagesServiceRunner();
    const input = testEnvironment.factory.entity.mes.DeleteUserMessagesService_Input();
    input.user = undefined;
    runner.input = input;

    try {
      await runner.run();
    } catch(error) {
      expect(error.message).to.equal(`The entity mes:DeleteUserMessagesService_Input is not valid`);
      expect(error.type).to.equal('ValidationError');
    }
  });

});
