import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'projects', timestamps: true })
export class ProjectEntity extends Document {
  @Prop({ required: true, lowercase: true })
  github: string;

  @Prop({ lowercase: true })
  deployUrl: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, lowercase: true })
  description: string;

  @Prop({ type: Boolean, default: false })
  top: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity);
