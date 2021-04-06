import { operations } from 'solution-framework';


export default class extends operations.v1_markReadStatus {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('v1_markReadStatus.execute()');

    const id = this.request.path.id;
    const read = this.request.body.read;

    const markReadStatusServiceInput = this.factory.entity.mes.MarkReadStatusService_Input();
    markReadStatusServiceInput.id = id;
    markReadStatusServiceInput.read = read;

    await this.services.mes.MarkReadStatusService(markReadStatusServiceInput);
    this.response.status = 201;
  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation v1_markReadStatus
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('v1_markReadStatus.handleError()');
  }

}
