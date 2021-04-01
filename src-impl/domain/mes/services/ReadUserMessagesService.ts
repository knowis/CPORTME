import { services } from 'solution-framework';

export default class extends services.mes_ReadUserMessagesService {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('mes_ReadUserMessagesService.execute()');

    const { user } = this.input;

    if (user) {
      const filterExpression = this.factory.filter.mes.Message.user.comparison('==', user);
      this.output = await this.repo.mes.Message.find({ sortBy: 'createdOn,DESC' }, filterExpression);
    } else {
      this.output = [];
    }
  }

}
