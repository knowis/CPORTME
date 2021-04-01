import { operations } from 'solution-framework';
export default class extends operations.v1_deleteUserMessages {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_deleteUserMessages.execute()');
    const user = this.request.path.user;
    const deleteUserMessagesServiceInput = this.factory.entity.mes.DeleteUserMessagesService_Input();
    deleteUserMessagesServiceInput.user = user;

    void await this.services.mes.DeleteUserMessagesService(deleteUserMessagesServiceInput);
    this.response.status = 204;
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_deleteUserMessages
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_deleteUserMessages.handleError()');
    // Add Error handling logic below and set this.response that will be returned as operation v1_deleteUserMessages response
  }

}
