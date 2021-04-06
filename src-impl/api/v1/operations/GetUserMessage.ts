import { operations } from 'solution-framework';
import { GeneralError } from 'solution-framework/dist/sdk/v1/error/GeneralError';
import { v1_Message } from 'solution-framework/dist/sdk/v1/namespace/schema/v1_Message';
import { Mapper } from '../../../util/Mapper';

export default class extends operations.v1_getUserMessage {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_getUserMessage.execute()');

    const id = this.request.path.id;
    const readUserMessageServiceInput = this.factory.entity.mes.ReadUserMessageService_Input();
    readUserMessageServiceInput.id = id;

    const message = await this.services.mes.ReadUserMessageService(readUserMessageServiceInput);

    const MessageMapper = new Mapper(this.context);
    this.response.body = MessageMapper.mapEntityToSchema(message) as v1_Message;
    this.response.status = 200;
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_getUserMessage
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_getUserMessage.handleError()');
    if (error instanceof GeneralError) {
      if (error.type === 'AggregateNotFoundError') {
        this.response.status = 404;
      } else if (error.type === 'InternalRequestError') {
        this.response.status = 400;
      }
    }
  }

}
