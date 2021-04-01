import { services } from 'solution-framework';

export default class extends services.mes_AddUserMessageService {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_AddUserMessageService.execute()');

    const { sender, text, user } = this.input;

    const input = this.factory.entity.mes.AddMessageCommand_Input();
    input.sender = sender;
    input.text = text;
    input.user = user;

    this.output = await this.repo.mes.Message.AddMessageCommand(input);
  }

}
