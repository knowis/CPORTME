import { commands } from 'solution-framework';

export default class extends commands.mes_ChangeMessage {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_ChangeMessage.execute()');

    const { id, sender, user, text } = this.input;

    this.instance = await this.repo.mes.Message.findById(id);
    this.instance.sender = sender;
    this.instance.user = user;
    this.instance.text = text;
    this.instance.timestamp = new Date();

    await this.instance.persist();
  }

  public async available(): Promise<boolean> {
    return true;
  }

}
