'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { ChatInterface } from '@/components/shared/ChatInterface';
import { MOCK_WEATHER, MOCK_CROP_ADVISORIES } from '@/utils/mock-data';
import { cn } from '@/utils/cn';

export default function AdvisoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Agricultural Advisory Chatbot</h1>
        <p className="text-gray-500">
          Weather updates, crop advice, and market prices in your language.
          Designed for Indian farmers with localized information.
        </p>
      </div>

      <Tabs
        tabs={[
          { id: 'chat', label: 'Ask a Question' },
          { id: 'weather', label: 'Weather' },
          { id: 'crops', label: 'Crop Advisory' },
          { id: 'market', label: 'Market Prices' },
        ]}
      >
        {(tab) => {
          if (tab === 'chat') {
            return (
              <div className="h-[500px] rounded-xl border border-gray-200 overflow-hidden">
                <ChatInterface
                  domain="agriculture"
                  title="Kisan Mitra (किसान मित्र)"
                  placeholder="Ask about farming, crops, weather..."
                  systemPrompt="You are Kisan Mitra, an agricultural advisory chatbot for Indian farmers. Provide advice about crops, weather, soil health, market prices, and government schemes in the user's language. Be practical and specific."
                />
              </div>
            );
          }

          if (tab === 'weather') {
            const weather = MOCK_WEATHER;
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardHeader>
                    <CardTitle>Current Weather</CardTitle>
                    <CardDescription>{weather.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 mb-4">
                      <div className="text-5xl font-bold text-blue-600">
                        {weather.temperature}°C
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Humidity: {weather.humidity}%</p>
                        <p className="text-sm text-gray-600">Rainfall: {weather.rainfall}mm</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{weather.forecast}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weather Advisories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {weather.advisories.map((advisory, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-100"
                        >
                          <div className="mt-0.5 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{advisory}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }

          if (tab === 'crops') {
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_CROP_ADVISORIES.map((crop, i) => (
                  <Card key={i} hover>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 font-devanagari">{crop.crop}</h3>
                        <div className="flex gap-1.5">
                          <Badge variant="green">{crop.season}</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{crop.region}</p>
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">{crop.advice}</p>
                      {crop.marketPrice && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50">
                          <span className="text-xs font-medium text-green-700">MSP:</span>
                          <span className="text-sm font-bold text-green-800">
                            Rs. {crop.marketPrice.toLocaleString('en-IN')}/quintal
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          }

          // Market Prices
          return (
            <Card>
              <CardHeader>
                <CardTitle>Minimum Support Prices (MSP) — Rabi 2025-26</CardTitle>
                <CardDescription>Government of India announced prices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-3 font-medium text-gray-600">Crop</th>
                        <th className="text-left py-3 px-3 font-medium text-gray-600">Crop (Hindi)</th>
                        <th className="text-right py-3 px-3 font-medium text-gray-600">MSP (Rs/quintal)</th>
                        <th className="text-right py-3 px-3 font-medium text-gray-600">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Wheat', nameHi: 'गेहूं', price: 2275, change: '+150' },
                        { name: 'Barley', nameHi: 'जौ', price: 1850, change: '+115' },
                        { name: 'Gram', nameHi: 'चना', price: 5440, change: '+105' },
                        { name: 'Lentil (Masur)', nameHi: 'मसूर', price: 6425, change: '+275' },
                        { name: 'Rapeseed/Mustard', nameHi: 'सरसों', price: 5650, change: '+200' },
                        { name: 'Safflower', nameHi: 'कुसुम', price: 5800, change: '+150' },
                      ].map((crop, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2.5 px-3 font-medium">{crop.name}</td>
                          <td className="py-2.5 px-3 font-devanagari">{crop.nameHi}</td>
                          <td className="py-2.5 px-3 text-right font-semibold">
                            Rs. {crop.price.toLocaleString('en-IN')}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <Badge variant="green">{crop.change}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        }}
      </Tabs>
    </div>
  );
}
