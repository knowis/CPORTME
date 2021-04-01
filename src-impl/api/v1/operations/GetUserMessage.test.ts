import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';


describe('getUserMessage', () => {
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
    // const runner = new operationRunners.v1_getUserMessageRunner();
    // await runner.run();
    console.warn('No tests available');
    expect(true).to.equal(true);
  });

});
