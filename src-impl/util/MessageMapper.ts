import { mappers, Context, ObjectSchemaObject, Entity } from 'solution-framework';
import { dateformat } from 'dateformat';

export class MessageMapper extends mappers.BaseMapper {

  constructor(context: Context) {
    super(context);
  }

  public mapEntityToSchema(entity: Entity): ObjectSchemaObject {
    const log = this.log;
    log.debug('mapEntityToSchema()');

    const schema = this.factory.schema.v1.Message();
    if (this.instanceOf.entity.mes.Message(entity)) {
      const { _id, sender, text, timestamp, user } = entity;
      schema.id = _id;
      schema.sender = sender;
      schema.text = text.map((messageContent) => messageContent.content);
      schema.timestamp = dateformat(timestamp);
      schema.user = user;
    }
    return schema;
  }

  // Add any other specific mapping methods

  /**
   * This method is needed for logging purposes to provide file path to log statements.
   */
  protected getSrcImplPath(): string {
    return 'src-impl/util/mapper';
  }

}
