import { commands } from 'solution-framework';

export default class extends commands.mes_MarkReadStatusCommand {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_MarkReadStatusCommand.execute()');

    const { read } = this.input;

    this.instance.read = read;
    await this.instance.persist();
  }

  public async available(): Promise<boolean> {
    return true;
  }

}
