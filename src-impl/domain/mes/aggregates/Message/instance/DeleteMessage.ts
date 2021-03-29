import { commands } from 'solution-framework';

export default class extends commands.mes_DeleteMessage {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_DeleteMessage.execute()');

    const { id } = this.input;

    this.instance = await this.repo.mes.Message.findById(id);

    await this.instance.delete();
  }

  public async available(): Promise<boolean> {
    return true;
  }

}
