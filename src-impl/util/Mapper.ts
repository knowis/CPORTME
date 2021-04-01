import { mappers, Context, ObjectSchemaObject, Entity } from 'solution-framework';

/**
 * This class can be used to implement mapping logic between schemas and entities,
 * It has access to instanceOf operator, factory and logger.
 */
export class Mapper extends mappers.BaseMapper {

  constructor(context: Context) {
    super(context);
  }

  public mapSchemaToEntity(schema: ObjectSchemaObject): Entity {
    const log = this.log;
    log.debug('mapSchemaToEntity()');
    // Add mapping implementation

    return null;
  }

  public mapEntityToSchema(entity: Entity): ObjectSchemaObject {
    const log = this.log;
    log.debug('mapEntityToSchema()');
    const schema = this.factory.schema.v1.Message();
    if (this.instanceOf.entity.mes.Message(entity)) {
      const { _id, sender, text, user, read, createdOn, createdBy } = entity;
      schema.id = _id;
      schema.sender = sender;
      schema.text = text;
      schema.read = read;
      schema.createdOn = createdOn.toISOString();
      schema.createdBy = createdBy;
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
