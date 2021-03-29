import { commands } from 'solution-framework';
import { mes_Message } from 'solution-framework/dist/sdk/v1/namespace/entity/mes_Message';

export default class extends commands.mes_DeleteMessages {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_DeleteMessages.execute()');

    const { user } = this.input;

    const filterExpression = `user == "${user}"`;

    const messages: mes_Message[] = await this.repo.mes.Message.find({sortBy: 'timestamp'}, filterExpression);
    messages.forEach((m: mes_Message) => m.delete());
  }

  public async available(): Promise<boolean> {
    return true;
  }

}
