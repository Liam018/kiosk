import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export function FeedbackChart({ data, onHover, questionId }) {
  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

  const COLORS = [
    'url(#gradientExcellent)',
    'url(#gradientGood)',
    'url(#gradientNormal)',
    'url(#gradientNeedsImprovement)',
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-bold">{dataItem.name}: {dataItem.value}%</p>
          <div className="mt-2 space-y-1">
            {Object.entries(dataItem.breakdown || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span>{key}:</span>
                <span className='font-semibold'>{value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <PieChart width={200} height={200}>
        <defs>
          <linearGradient id="gradientExcellent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#26A69A" stopOpacity={1} />
            <stop offset="100%" stopColor="#00796B" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="gradientGood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4CAF50" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="gradientNormal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#CFD8DC" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="gradientNeedsImprovement" x1="0" y1="0" x2="1" y2="1">
            <stop offset="100%" stopColor="#AFB42B" stopOpacity={1} />
          </linearGradient>
        </defs>

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={70}
          dataKey="value"
          onMouseEnter={(entry) => onHover && onHover({ questionId, rating: entry.name })}
          onMouseLeave={() => onHover && onHover(null)}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          content={<CustomTooltip />} 
          // position={{ x: -175, y: 0 }} 
          cursor={{ fill: 'transparent' }}
        />
      </PieChart>
    </div>
  );
}