import { services } from 'solution-framework';

export default class extends services.mes_ReadUserMessageService {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_ReadUserMessageService.execute()');

    const { id } = this.input;
    this.output = await this.repo.mes.Message.findById(id);
  }

}
