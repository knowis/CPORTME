import { services } from 'solution-framework';

export default class extends services.mes_MarkReadStatusService {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_MarkReadStatusService.execute()');

    const { id, read } = this.input;

    const markReadStatusCommandInput = this.factory.entity.mes.MarkReadStatusCommand_Input();
    markReadStatusCommandInput.read = read;

    const message = await this.repo.mes.Message.findById(id);
    void message.MarkReadStatusCommand(markReadStatusCommandInput);
  }

}
