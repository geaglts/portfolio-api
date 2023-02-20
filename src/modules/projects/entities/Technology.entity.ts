import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'technologies', timestamps: true })
export class TechnologyEntity extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ lowercase: true, default: '' })
  extension: string;

  @Prop({ default: '' })
  documentationUrl: string;

  @Prop({ default: '' })
  iconUrl: string;

  @Prop({ default: '#ffffff', lowercase: true })
  color: string;
}

export const TechnologySchema = SchemaFactory.createForClass(TechnologyEntity);
