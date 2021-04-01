import { services } from 'solution-framework';

export default class extends services.mes_ReadAllMessagesService {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_ReadAllMessagesService.execute()');

    this.output = await this.repo.mes.Message.find({ sortBy: 'createdOn,DESC' });
  }

}
