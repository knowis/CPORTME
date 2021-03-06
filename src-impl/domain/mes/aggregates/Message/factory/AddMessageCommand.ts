import { commands } from 'solution-framework';

export default class extends commands.mes_AddMessageCommand {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_AddMessageCommand.execute()');

    const { sender, user, text } = this.input;

    this.instance = this.factory.entity.mes.Message();
    this.instance.sender = sender;
    this.instance.user = user;
    this.instance.text = text;
    this.instance.read = false;
    this.instance.createdOn = new Date();
    this.instance.createdBy = this.requestContext.user.username;

    await this.instance.persist();
  }

  public async available(): Promise<boolean> {
    return true;
  }

}
