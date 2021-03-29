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
    // Add mapping implementation

    return null;
  }

  // Add any other specific mapping methods

  /**
   * This method is needed for logging purposes to provide file path to log statements.
   */
  protected getSrcImplPath(): string {
    return 'src-impl/util/mapper';
  }

}
