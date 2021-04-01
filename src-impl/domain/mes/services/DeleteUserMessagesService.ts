import { services } from 'solution-framework';

export default class extends services.mes_DeleteUserMessagesService {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_DeleteUserMessagesService.execute()');

    const { user } = this.input;

    const readUserMessagesServiceInput = this.factory.entity.mes.ReadUserMessagesService_Input();
    readUserMessagesServiceInput.user = user;

    const messages = await this.services.mes.ReadUserMessagesService(readUserMessagesServiceInput);
    messages.forEach(message => message.delete());
  }
}
