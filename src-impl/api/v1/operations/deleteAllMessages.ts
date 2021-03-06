import { operations } from 'solution-framework';
export default class extends operations.v1_deleteAllMessages {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_deleteAllMessages.execute()');

    void await this.services.mes.DeleteAllMessagesService();
    this.response.status = 204;
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_deleteAllMessages
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_deleteAllMessages.handleError()');
  }

}
