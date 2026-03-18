import { NextRequest, NextResponse } from 'next/server';
import { MOCK_WEATHER, MOCK_CROP_ADVISORIES } from '@/utils/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';
  const region = searchParams.get('region');

  const data: Record<string, any> = {};

  if (type === 'all' || type === 'weather') {
    // In production, call OpenWeather API
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (apiKey && region) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${region},IN&appid=${apiKey}&units=metric`
        );
        if (res.ok) {
          const weatherData = await res.json();
          data.weather = {
            location: weatherData.name,
            temperature: Math.round(weatherData.main.temp),
            humidity: weatherData.main.humidity,
            rainfall: weatherData.rain?.['1h'] || 0,
            forecast: weatherData.weather?.[0]?.description || '',
            advisories: [],
          };
        }
      } catch {
        // Fall through to mock
      }
    }

    if (!data.weather) {
      data.weather = MOCK_WEATHER;
    }
  }

  if (type === 'all' || type === 'crops') {
    data.cropAdvisories = MOCK_CROP_ADVISORIES;
  }

  if (type === 'all' || type === 'market') {
    data.marketPrices = MOCK_CROP_ADVISORIES
      .filter((c) => c.marketPrice)
      .map((c) => ({
        crop: c.crop,
        price: c.marketPrice,
        season: c.season,
        region: c.region,
      }));
  }

  return NextResponse.json(data);
}
