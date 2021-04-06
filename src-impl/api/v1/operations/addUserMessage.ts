import { operations } from 'solution-framework';
export default class extends operations.v1_addUserMessage {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_addUserMessage.execute()');

    const user = this.request.path.user;
    const { sender, text } = this.request.body;
    const addUserMessageServiceInput = this.factory.entity.mes.AddUserMessageService_Input();
    addUserMessageServiceInput.sender = sender;
    addUserMessageServiceInput.user = user;
    addUserMessageServiceInput.text = text;

    void await this.services.mes.AddUserMessageService(addUserMessageServiceInput);
    this.response.status = 201;
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_addUserMessage
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_addUserMessage.handleError()');
  }

}
