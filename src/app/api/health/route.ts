import { NextRequest, NextResponse } from 'next/server';
import { HEALTH_TOPICS } from '@/utils/mock-data';

export async function GET() {
  return NextResponse.json({
    topics: HEALTH_TOPICS,
    disclaimer: 'This information is for educational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional.',
    emergencyNumbers: {
      emergency: '112',
      ambulance: '108',
      healthHelpline: '104',
      womenHelpline: '181',
      childHelpline: '1098',
    },
  });
}
