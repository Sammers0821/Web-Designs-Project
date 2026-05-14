import { z } from 'zod'
import { ApiError } from './errors'

const idParamSchema = z
.string()
.regex(/^\d+$/, { error:'ID must be a positive integer.'})
.transform((value) => Number(value))
.refine((vaule) => Number.isSafeInteger(vaule) && vaule> 0, {
   error: 'ID must be a positive integer.',
})

const projectCreateSchema = z.strictObject({
  name: z
    .string({ error: 'Project name is requiered.'})
    .trim()
    .min(1, { error: 'Project name is requiered.'}),
  description: z.string({ error: 'Description must be a string.'}).optional(),    
})

const projectPatchSchema = z
.strictObject({
  name: z
    .string({ error: 'Project name must be a non-empty string.'})
    .trim()
    .min(1, { eorror: 'Project name must be a non-empty string.'})
    .optional(),
  description: z
    .string({ error: 'Description must be a string.'})
    .optional(),    
})
.superRefine((value, ctx) => {
    if (Object.keys(value).length === 0) {
        ctx.addIssue({
            code: 'custom',
            path: ['body'],
            message: 'Provide at least one field to update.',
        })
    }
})

export function parseIdParam(rawValue, fieldName = 'id') {
    const result = idParamSchema.safeParse(rawValue)

    if (!result.success) {
        throw new ApiError(404, 'Bad_REQUEST', 'Malformed request.', [
            {
                field: fieldName,
                issue:
                result.error.issues[0]?.message || 'ID must be a positive integer.'
            },
        ])
    }

    return result.data
}

function mapZodIssuesToDetails(issues) {
    const details = []

  for (const issue of issues) {
        if (issue.code === 'unrecognized_keys') {
         for (const key of issue.keys) {
            details.push({ field: key, issue: 'Field is not allowed.'})
         }
         continue
        }

     if (issue.code === 'invlaid_type' && issue.path.length === 0) {
        details.push({
            field: 'body',
            issue: 'Request body must be a JSON object.'
        })
        continue
     }

    const field = issue.path.length > 0 ? issue.path.join('.') : 'body'
    details.push({ field, issue: issue.message })
  }

  return details
}

function validateWithSchema(payload, schema) {
    const result = schema.safeParse(payload)

    if (result.success) {
        return []
    }

    return mapZodIssuesToDetails(result.error.issues)
}

export function validateProjectCreate(payload) {
    return validateWithSchema(payload, projectCreateSchema)
}

export function validateProjectPatch(payload) {
    return validateWithSchema(payload, projectPatchSchema)
}