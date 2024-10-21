import mongoose, { Model, Document } from 'mongoose';
import { locationSchema } from '../lib/schemas';

export interface ILocation extends Document {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

let Location: Model<ILocation>;

try {
  Location = mongoose.model<ILocation>('Location');
} catch {
  Location = mongoose.model<ILocation>('Location', locationSchema);
}

export { Location };