import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';

describe('getUserMessages', () => {
  const testEnvironment = new TestEnvironment();
  before(async () => {
    // This block will run automatically before all tests.
    // Alternatively, use beforeEach() to define what should automatically happen before each test.
    // This is an optional block.
  });
  after(async () => {
    await testEnvironment.cleanup();
  });
  it('works', async () => {
    const runner = new operationRunners.v1_getUserMessagesRunner();
    runner.request.path.user = 'rkr';
    const apiResponse = await runner.run();
    expect(apiResponse.status).to.equal(200);

    const messages = apiResponse.body;
    expect(messages.length).greaterThan(0);
  });

});
