import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'technologies', timestamps: true })
export class TechnologyEntity extends Document {
  @Prop({ lowercase: true, required: true })
  name: string;

  @Prop({ lowercase: true })
  extension: string;

  @Prop({ default: '' })
  documentationUrl: string;

  @Prop({ default: '' })
  iconUrl: string;
}

export const TechnologySchema = SchemaFactory.createForClass(TechnologyEntity);
