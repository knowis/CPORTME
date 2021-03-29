import { middleware } from 'solution-framework';


/**
 * This class is responsible for providing a centralized place for common error handling logic independent from API Operation Context,
 * API operation response set within this class via (this.response) might end up being un-documented API response for the executed operation.
 */
export default class extends middleware.v1_ErrorMiddleware {

  // This script gets executed if any error happens that is not yet handled in an operation / within operation handleError()
  public async handleError(error: Error): Promise<void> {
    // Handle the general errors that may occur throughout the implementation
    const log = this.util.log;
    log.debug('v1_ErrorMiddleware.execute()');
  }

}
