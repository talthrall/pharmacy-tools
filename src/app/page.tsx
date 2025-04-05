'use client';

import React, { useState } from 'react';

// Define result type to avoid `any` usage
type CalculationResults = {
  totalMass: number;
  blendDensity: number;
  expectedFill: number;
  utilization: number;
  apiPercent: number;
};

export default function CapsuleFillCalculator() {
  const [apiMass, setApiMass] = useState('');
  const [fillerMass, setFillerMass] = useState('');
  const [packStat, setPackStat] = useState('');
  const [capsuleSize, setCapsuleSize] = useState('0');
  const [results, setResults] = useState<CalculationResults | null>(null);

  const capsuleCapacities = {
    '000': 0.95,
    '00': 0.65,
    '0': 0.5,
    '1': 0.4,
    '2': 0.3,
  };

  const handleCalculate = () => {
    const api = parseFloat(apiMass);
    const filler = parseFloat(fillerMass);
    const pack = parseFloat(packStat);
    const totalMass = api + filler;
    const blendDensity = totalMass / pack;
    const capsuleCapacity = capsuleCapacities[capsuleSize as keyof typeof capsuleCapacities];
    const expectedFill = blendDensity * capsuleCapacity;
    const utilization = (expectedFill / totalMass) * 100;
    const apiPercent = (api / totalMass) * 100;

    setResults({
      totalMass,
      blendDensity,
      expectedFill,
      utilization,
      apiPercent,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-xl mx-auto bg-card rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">Capsule Fill Calculator</h1>

        <div className="grid grid-cols-1 gap-4">
          <input
            className="p-2 border rounded"
            type="number"
            placeholder="API Mass (g)"
            value={apiMass}
            onChange={(e) => setApiMass(e.target.value)}
          />

          <input
            className="p-2 border rounded"
            type="number"
            placeholder="Filler Mass (g)"
            value={fillerMass}
            onChange={(e) => setFillerMass(e.target.value)}
          />

          <input
            className="p-2 border rounded"
            type="number"
            placeholder="Pack Stat (g/cc)"
            value={packStat}
            onChange={(e) => setPackStat(e.target.value)}
          />

          <select
            className="p-2 border rounded"
            value={capsuleSize}
            onChange={(e) => setCapsuleSize(e.target.value)}
          >
            {Object.keys(capsuleCapacities).map((size) => (
              <option key={size} value={size}>
                Size {size}
              </option>
            ))}
          </select>

          <button
            className="p-2 bg-primary text-primary-foreground rounded hover:opacity-90"
            onClick={handleCalculate}
          >
            Calculate
          </button>
        </div>

        {results && (
          <div className="pt-4 space-y-2">
            <p><strong>Total Mass:</strong> {results.totalMass.toFixed(4)} g</p>
            <p><strong>Blend Density:</strong> {results.blendDensity.toFixed(4)} g/cc</p>
            <p><strong>Expected Fill (Size {capsuleSize}):</strong> {results.expectedFill.toFixed(4)} g</p>
            <p><strong>Capsule Utilization:</strong> {results.utilization.toFixed(2)}%</p>
            <p><strong>API % in Formula:</strong> {results.apiPercent.toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
