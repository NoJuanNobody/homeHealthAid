import { Client, ReverseGeocodeResponse } from '@googlemaps/google-maps-services-js'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
) {
  const client = new Client({})
  if(process.env.GOOGLE_MAPS_API_KEY === undefined) {
    return NextResponse.error()
  }
  const requestBody = await req.json();
    const response: ReverseGeocodeResponse = await client.reverseGeocode({
      params: {
        latlng: {lat: requestBody.latitude, lng: requestBody.longitude },
        key: process.env?.GOOGLE_MAPS_API_KEY
      }
    })
    return NextResponse.json(response.data.results[0]);
  }