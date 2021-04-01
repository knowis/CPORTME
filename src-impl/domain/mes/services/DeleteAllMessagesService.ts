import { services } from 'solution-framework';

export default class extends services.mes_DeleteAllMessagesService {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_DeleteAllMessagesService.execute()');

    (await this.repo.mes.Message.find()).forEach(message => message.delete());
  }

}
