import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import { Location, ILocation } from '@/models/Location';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { latitude, longitude, timestamp, batteryLevel } = body;
    const location: ILocation = new Location({
      latitude,
      longitude,
      timestamp: new Date(timestamp),
      batteryLevel,
    });
    await location.save();
    return NextResponse.json({ success: true, id: location._id });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error saving location data' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const latestLocation = await Location.findOne().sort({ timestamp: -1 });
    if (latestLocation) {
      return NextResponse.json({ success: true, location: latestLocation });
    } else {
      return NextResponse.json({ success: false, error: 'No location data found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error fetching location data' }, { status: 500 });
  }
}