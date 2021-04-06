import { operations } from 'solution-framework';
import { GeneralError } from 'solution-framework/dist/sdk/v1/error/GeneralError';
export default class extends operations.v1_deleteUserMessage {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_deleteUserMessage.execute()');

    const id = this.request.path.id;
    const deleteUserMessageServiceInput = this.factory.entity.mes.DeleteUserMessageService_Input();
    deleteUserMessageServiceInput.id = id;

    void await this.services.mes.DeleteUserMessageService(deleteUserMessageServiceInput);
    this.response.status = 204;
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_deleteUserMessage
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_deleteUserMessage.handleError()');
    if (error instanceof GeneralError) {
      if (error.type === 'AggregateNotFoundError') {
        this.response.status = 404;
      } else if (error.type === 'InternalRequestError') {
        this.response.status = 400;
      }
    }
  }

}
