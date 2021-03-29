import { commands } from 'solution-framework';
import { mes_Message } from 'solution-framework/dist/sdk/v1/namespace/entity/mes_Message';

export default class extends commands.mes_DeleteAllMessages {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_DeleteAllMessages.execute()');

    const messages: mes_Message[] = await this.repo.mes.Message.find();
    messages.forEach((m: mes_Message) => m.delete());
  }

  public async available(): Promise<boolean> {
    return true;
  }

}
