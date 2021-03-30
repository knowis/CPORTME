import { expect } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';

describe('mes:GetMessagesByUser', () => {

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
    const runner = new serviceRunners.mes_GetMessagesByUserRunner();
    const getMessagesByUserInput = testEnvironment.factory.entity.mes.GetMessagesByUser_Input();
    getMessagesByUserInput.user = 'rkr';

    runner.input = getMessagesByUserInput;
    await runner.run();
    const output = runner.output;
    expect(output.length).above(0);
  });

});
