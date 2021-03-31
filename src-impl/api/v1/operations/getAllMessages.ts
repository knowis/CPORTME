import { operations } from 'solution-framework';


export default class extends operations.v1_getAllMessages {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_getAllMessages.execute()');
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_getAllMessages
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_getAllMessages.handleError()');
    // Add Error handling logic below and set this.response that will be returned as operation v1_getAllMessages response
  }

}
