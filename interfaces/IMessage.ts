export default interface IMessage {
  attachedMedia: Array<any>
  attributes: Object
  author: string
  body: string
  dateCreated: Date
  dateUpdated: Date
  index: number
  lastUpdatedBy: string
  media: any
  participantSid: string
  sid: string
  subject: string
  type: string
}