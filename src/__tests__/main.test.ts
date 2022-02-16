// eslint-disable-next-line filenames/match-regex
import * as t from '@jest/globals'
import {Validator} from '../lib/validate'

t.test('valid yaml files', async () => {
  const validator = new Validator({
    files: ['src/__tests__/valid.yaml'],
    schemaPath: 'src/__tests__/schema.json',
    expectString: ''
  })

  await t.expect(validator.ValidateYAML()).resolves.toBe(0)
})

t.test('files contains string', async () => {
  const validator = new Validator({
    files: ['src/__tests__/valid.yaml'],
    schemaPath: '',
    expectString: 'myValue: "1"'
  })

  await t.expect(validator.ExpectString()).resolves.toBe(1)
})
