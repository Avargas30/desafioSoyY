export interface Entity {
  code: string,
  data: DataEntity,
  message: string
  traceId: string
  type: string
}

export interface DataEntity {
  attributeValidator: any
  contactMail: string
  contactName: string
  domain: any
  entityId: number
  expirationDate: string
  identificationNumber: string
  ipAddress: string
  logo: string
  name: string,
  code?: string
}
