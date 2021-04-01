import { TestEnvironment } from 'solution-framework';
import { mes_Message } from 'solution-framework/dist/sdk/v1/solution/repository/entityHierarchy';

/**
 * Helper function for creating a message in the test environment
 * @param {TestEnvironment} testEnvironment - Test environment
 * @param {string} sender - Sender of the message
 * @param {string} user - User (receiver) of the message
 * @param {string} user - Text of the message
 * @returns {mes_Message} a message created in a test environment
 */
export function buildTestMessage(testEnvironment: TestEnvironment, sender: string, user: string, text: string): mes_Message {
  const message = testEnvironment.factory.entity.mes.Message();
  message.sender = sender;
  message.user = user;
  message.text = text;
  message.read = false;
  message.createdOn = new Date();
  message.createdBy = 'SYSTEM';
  return message;
}

/**
 * Helper function for creating and persisting a message in the test environment
 * @param {TestEnvironment} testEnvironment - Test environment
 * @param {string} sender - Sender of the message
 * @param {string} user - User (receiver) of the message
 * @param {string} user - Text of the message
 * @returns {Promise<string>} The ID of the persisted message
 */
export async function buildAndPersistTestMessage(testEnvironment: TestEnvironment, sender: string, user: string, text: string): Promise<string> {
  const message = buildTestMessage(testEnvironment, sender, user, text);
  await message.persist();
  return message._id;
}

/**
 * Helper function, which checks whether a message with the ID exists
 * @param {TestEnvironment} testEnvironment - Test environment
 * @param {string} id - ID of the message
 * @returns {Promise<boolean>} The message exists
 */
export async function testMessageExists(testEnvironment: TestEnvironment, id: string): Promise<boolean> {
  let exists = true;
  try {
    const message = await testEnvironment.repo.mes.Message.findById(id);
    exists = message._id === id;
  } catch(error)  {
    exists = false;
  }
  return exists;
}

/**
 * skip one event loop to wait for promises to get resolved
 */
export function skipTick(): Promise<void> {
  return new Promise(setImmediate);
}
