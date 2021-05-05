// Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

// Utils
import { v4 } from 'uuid'

@Schema()
export class SearchTrack extends Document {
  @Prop({ required: false, default: () => v4(), unique: true })
  id: string

  @Prop({ required: true, default: '', unique: true })
  ipAddress: string

  @Prop({ required: true, default: '' })
  searchString: string

  @Prop({ required: false, default: Date.now, select: false })
  createdAt?: Date

  @Prop({ required: false, default: Date.now, select: false })
  updatedAt?: Date
}

export const SearchTrackSchema = SchemaFactory.createForClass(SearchTrack)