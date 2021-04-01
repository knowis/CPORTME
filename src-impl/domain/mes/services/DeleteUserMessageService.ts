import { services } from 'solution-framework';

export default class extends services.mes_DeleteUserMessageService {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_DeleteUserMessageService.execute()');

    const { id } = this.input;

    const message = await this.repo.mes.Message.findById(id);
    await message.delete();
  }

}
