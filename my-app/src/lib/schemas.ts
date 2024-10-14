import { Schema } from 'mongoose';

export const locationSchema: Schema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  batteryLevel: { type: Number, required: false },
}, { timestamps: true });

// Add other schemas here as your project grows