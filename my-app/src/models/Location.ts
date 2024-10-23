import mongoose, { Model, Document } from 'mongoose';
import { locationSchema } from '../lib/schemas';

export interface ILocation extends Document {
  latitude: number;
  longitude: number;
  timestamp: Date;
  batteryLevel: number;
  deviceId?: string;
}

export const Location = mongoose.models.Location || mongoose.model<ILocation>('Location', locationSchema);