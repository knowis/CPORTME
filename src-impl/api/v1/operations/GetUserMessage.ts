import { operations } from 'solution-framework';
import { v1_Message } from 'solution-framework/dist/sdk/v1/namespace/schema/v1_Message';
import { MessageMapper } from '../../../util/MessageMapper';
export default class extends operations.v1_GetUserMessage {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_GetUserMessage.execute()');

    const id = this.request.path.id;
    const getMessagesByUserInput = this.factory.entity.mes.GetMessageById_Input();
    getMessagesByUserInput.id = id;

    const message = await this.services.mes.GetMessageById(getMessagesByUserInput);

    const Mapper = new MessageMapper(this.context);
    this.response.body = Mapper.mapEntityToSchema(message) as v1_Message;
    this.response.status = 200;
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_GetUserMessage
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_GetUserMessage.handleError()');
    // Add Error handling logic below and set this.response that will be returned as operation v1_GetUserMessage response
  }

}
