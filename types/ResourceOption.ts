export default interface ResourceOption {
    name: string
    description: string | null
    resources: Array<string>
    type: string
    values: Array<any>
    validation: Array<any>
    default: any
  }
  