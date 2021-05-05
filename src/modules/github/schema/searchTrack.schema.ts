// Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

// Utils
import { v4 } from 'uuid'

export type SearchTrackDocument = SearchTrack & Document

@Schema()
export class SearchTrack {
  @Prop({ required: false, default: () => v4(), unique: true })
  id: string

  @Prop({ required: true, default: '' })
  ipAddress: string

  @Prop({ required: true, default: '' })
  username: string

  @Prop({ required: true, default: '' })
  searchString: string

  @Prop({ required: false, default: '' })
  result: string

  @Prop({ required: false, default: Date.now, select: false })
  createdAt?: Date

  @Prop({ required: false, default: Date.now, select: false })
  updatedAt?: Date
}

export const SearchTrackSchema = SchemaFactory.createForClass(SearchTrack)