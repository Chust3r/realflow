import * as authSchema from './schema/auth'
import * as relationsSchema from './schema/relations'
import * as tablesSchema from './schema/tables'

export const schema = {
	...authSchema,
	...relationsSchema,
	...tablesSchema,
}
