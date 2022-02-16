import * as core from '@actions/core'
import {Validator} from './lib/validate'

async function run(): Promise<void> {
  try {

    const files:string[] = core.getMultilineInput('files')
    const schemaPath:string = core.getInput('schemaPath')
    // const files:string[] = ['src/__tests__/valid.yaml']
    // const schemaPath:string = 'src/__tests__/schema.json'
    const expectString:string = core.getInput('expectString')

    const validator = new Validator({
      files,
      schemaPath,
      expectString
    })

    if(files && schemaPath){
      await validator.ValidateYAML()
    }
    if(files && expectString){
      await validator.ExpectString()
    }
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run()
