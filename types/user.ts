export default interface User {
  userid: number
  email: string
  username: string | null
  first: string | null
  last: string | null
  timestamp: number
  uniqueId: string
  cloudProviders: Array<any>
}
