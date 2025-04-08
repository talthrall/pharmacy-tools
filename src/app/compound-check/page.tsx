'use client';

import React, { useState } from 'react';

type ComponentType = {
  id: string;
  name: string;
  amount: string;
  unit: 'mg' | 'g' | '%';
};

type ResultType = {
  totalActive: number;
  calculatedStrength: number;
  matches: boolean;
} | null;

export default function CompoundStrengthVerifier() {
  const [targetStrength, setTargetStrength] = useState<string>('');
  const [targetUnit, setTargetUnit] = useState<'mg/mL' | 'mg/g' | 'mg/capsule' | '%'>('mg/mL');
  const [totalQuantity, setTotalQuantity] = useState<string>('');
  const [components, setComponents] = useState<ComponentType[]>([
    { id: Date.now().toString(), name: '', amount: '', unit: 'mg' },
  ]);
  const [result, setResult] = useState<ResultType>(null);

  const handleComponentChange = (
    index: number,
    field: 'name' | 'amount' | 'unit',
    value: string
  ) => {
    const updatedComponents = [...components];
    if (field === 'unit' && (value === 'mg' || value === 'g' || value === '%')) {
      updatedComponents[index][field] = value;
    } else if (field !== 'unit') {
      updatedComponents[index][field] = value;
    }
    setComponents(updatedComponents);
  };

  const addComponent = () => {
    setComponents([
      ...components,
      { id: Date.now().toString(), name: '', amount: '', unit: 'mg' },
    ]);
  };

  const calculate = () => {
    const quantity = parseFloat(totalQuantity);
    const target = parseFloat(targetStrength);

    if (isNaN(quantity) || isNaN(target)) {
      alert('Please enter valid numbers for target strength and total quantity.');
      return;
    }

    const totalActive = components.reduce((sum, comp) => {
      const amount = parseFloat(comp.amount);
      if (isNaN(amount)) return sum;

      const unit = comp.unit;
      if (unit === 'g') return sum + amount * 1000;
      if (unit === '%') return sum + (amount / 100) * quantity * 1000;
      return sum + amount;
    }, 0);

    let calculatedStrength = 0;
    if (targetUnit === 'mg/mL' || targetUnit === 'mg/g') {
      calculatedStrength = totalActive / quantity;
    } else if (targetUnit === 'mg/capsule') {
      calculatedStrength = totalActive / quantity;
    } else if (targetUnit === '%') {
      calculatedStrength = (totalActive / (quantity * 1000)) * 100;
    }

    setResult({
      totalActive,
      calculatedStrength,
      matches: Math.abs(calculatedStrength - target) < 0.01,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4 text-teal-800">Compound Strength Verifier</h1>

      {/* Target Strength */}
      <div className="mb-2">
        <label className="block mb-1 text-teal-700">Target Strength</label>
        <input
          type="text"
          value={targetStrength}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTargetStrength(e.target.value)
          }
          className="w-full border rounded px-2 py-1 text-teal-600"
          placeholder="e.g. 10"
        />
      </div>

      {/* Target Unit */}
      <div className="mb-2">
        <label className="block mb-1 text-teal-700">Unit</label>
        <select
          value={targetUnit}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setTargetUnit(e.target.value as 'mg/mL' | 'mg/g' | 'mg/capsule' | '%')
          }
          className="w-full border rounded px-2 py-1 text-teal-600"
        >
          <option value="mg/mL">mg/mL</option>
          <option value="mg/g">mg/g</option>
          <option value="mg/capsule">mg/capsule</option>
          <option value="%">%</option>
        </select>
      </div>

      {/* Total Quantity */}
      <div className="mb-4">
        <label className="block mb-1 text-teal-700">
          Total Quantity (
          {targetUnit.includes('capsule') ? 'capsules' : targetUnit.split('/')[1]})
        </label>
        <input
          type="text"
          value={totalQuantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTotalQuantity(e.target.value)
          }
          className="w-full border rounded px-2 py-1 text-teal-600"
          placeholder="e.g. 120"
        />
      </div>

      {/* Components List */}
      <h2 className="text-lg font-medium mb-2 text-teal-700">Components</h2>
      {components.map((comp, index) => (
        <div key={comp.id} className="flex gap-2 mb-2">
          <input
            type="text"
            value={comp.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleComponentChange(index, 'name', e.target.value)
            }
            className="flex-1 border rounded px-2 py-1 text-teal-600"
            placeholder="Name"
          />
          <input
            type="text"
            value={comp.amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleComponentChange(index, 'amount', e.target.value)
            }
            className="w-24 border rounded px-2 py-1 text-teal-600"
            placeholder="Amount"
          />
          <select
            value={comp.unit}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleComponentChange(index, 'unit', e.target.value as 'mg' | 'g' | '%')
            }
            className="w-24 border rounded px-2 py-1 text-teal-600"
          >
            <option value="mg">mg</option>
            <option value="g">g</option>
            <option value="%">%</option>
          </select>
        </div>
      ))}

      {/* Add Component */}
      <button
        onClick={addComponent}
        className="bg-teal-500 text-white px-4 py-2 rounded"
      >
        Add Component
      </button>

      {/* Calculate Strength */}
      <button
        onClick={calculate}
        className="bg-teal-700 text-white px-4 py-2 rounded ml-2"
      >
        Calculate
      </button>

      {/* Results Section */}
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Results</h3>
          <p>Total Active: {result.totalActive} mg</p>
          <p>
            Calculated Strength: {result.calculatedStrength} {targetUnit}
          </p>
          <p>
            Does it match the target?{' '}
            {result.matches ? (
              <span className="text-green-600">Yes</span>
            ) : (
              <span className="text-red-600">No</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}