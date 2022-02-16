import YamlValidator from 'yaml-validator'
import fs from 'fs'

export interface ValidatorProps {
  files: string[]
  schemaPath: string
  expectString: string
}

export class Validator {
  props: ValidatorProps

  constructor(props: ValidatorProps) {
    this.props = props
  }

  async ValidateYAML(): Promise<Number> {
    return new Promise((resolve, reject) => {
      const structure = fs.readFileSync(this.props.schemaPath, { encoding: 'utf-8' })
      const validator = new YamlValidator({
        log: 'validator.log',
        structure: JSON.parse(structure),
        writeJson: false,
        onWarning: (err, file) => {
          reject(new Error(`File: ${file} - ${err.message}`))
        },
      })

      validator.validate((this.props.files))
      resolve(validator.report())
    })
  }

  async ExpectString(): Promise<Number> {
    return new Promise((resolve) => {
      resolve(this.ReadFiles(this.props.files))
    })
  }

  ReadFiles(files: string[]): number {
    let flag = 1
    for (const file of files){
      const content = fs.readFileSync(file, { encoding: 'utf-8' })
      if(!content.includes(this.props.expectString)){
        flag = 0
      }
    }
    if(flag===0){
      throw new Error('ERROR: Not found!')
    }
    return flag
  }
}
