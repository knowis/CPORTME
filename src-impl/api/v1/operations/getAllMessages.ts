import { operations } from 'solution-framework';
import { v1_Message } from 'solution-framework/dist/sdk/v1/namespace/schema/v1_Message';
import { Mapper } from '../../../util/Mapper';


export default class extends operations.v1_getAllMessages {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_getAllMessages.execute()');
    const messages = await this.services.mes.ReadAllMessagesService();

    const MessageMapper = new Mapper(this.context);
    const respMessages = this.factory.schema.v1.Messages();
    messages.forEach((message) => {
      respMessages.push(MessageMapper.mapEntityToSchema(message) as v1_Message);
    });

    this.response.body = respMessages;
    this.response.status = 200;
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_getAllMessages
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_getAllMessages.handleError()');
  }

}
