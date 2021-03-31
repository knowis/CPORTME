import { services } from 'solution-framework';

export default class extends services.mes_GetMessagesByUser {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_GetMessagesByUser.execute()');

    const { user } = this.input;
    const filterExpression = `user == "${user}"`;

    // search for utility for filtering

    this.output = await this.repo.mes.Message.find({sortBy: 'timestamp,DESC'}, filterExpression);
  }

}
