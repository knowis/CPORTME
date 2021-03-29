import { operations } from 'solution-framework';
export default class extends operations.v1_addUserMessage {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_addUserMessage.execute()');

    const user = this.request.path.user;
    const { sender, text } = this.request.body;
    const AddMessageInput = this.factory.entity.mes.AddMessage_Input();
    AddMessageInput.sender = sender;
    AddMessageInput.user = user;
    AddMessageInput.text = text.map((content) => {
      const messageContent = this.factory.entity.mes.MessageContent();
      messageContent.content = content;
      return messageContent;
    });

    void await this.repo.mes.Message.AddMessage(AddMessageInput);

    this.response.status = 200;
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_addUserMessage
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_addUserMessage.handleError()');
    // Add Error handling logic below and set this.response that will be returned as operation v1_addUserMessage response
  }

}
