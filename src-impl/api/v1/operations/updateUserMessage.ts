import { operations } from 'solution-framework';
export default class extends operations.v1_updateUserMessage {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_updateUserMessage.execute()');

    const id = this.request.path.id;
    const user = this.request.path.user;
    const { sender, text } = this.request.body;
    const changeMessageInput = this.factory.entity.mes.ChangeMessage_Input();
    changeMessageInput.id = id;
    changeMessageInput.user = user;
    changeMessageInput.sender = sender;
    changeMessageInput.text = text.map((content) => {
      const messageContent = this.factory.entity.mes.MessageContent();
      messageContent.content = content;
      return messageContent;
    });

    void await this.factory.entity.mes.Message().ChangeMessage(changeMessageInput);
    this.response.status = 200;
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_updateUserMessage
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_updateUserMessage.handleError()');
    // Add Error handling logic below and set this.response that will be returned as operation v1_updateUserMessage response
  }

}
