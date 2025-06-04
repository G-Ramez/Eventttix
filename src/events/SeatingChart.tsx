import React from 'react';
import { Grid } from 'lucide-react';

interface SeatingChartProps {
  selectedSeats?: string[];
  onSeatSelect?: (seatId: string) => void;
  maxSeats?: number;
}

export const SeatingChart: React.FC<SeatingChartProps> = ({
  selectedSeats = [],
  onSeatSelect = () => {},
  maxSeats = 10
}) => {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;

  const isSeatSelected = (seatId: string) => selectedSeats.includes(seatId);
  const canSelectMoreSeats = selectedSeats.length < maxSeats;

  const handleSeatClick = (seatId: string) => {
    if (isSeatSelected(seatId) || canSelectMoreSeats) {
      onSeatSelect(seatId);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Grid className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Seating Chart</h2>
        </div>
        <p className="text-gray-600">Select up to {maxSeats} seats</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Stage area */}
        <div className="w-full h-16 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
          <p className="text-gray-700 font-semibold">STAGE</p>
        </div>

        {/* Seating grid */}
        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row} className="flex justify-center gap-2">
              <div className="w-8 flex items-center justify-center font-semibold text-gray-700">
                {row}
              </div>
              {[...Array(seatsPerRow)].map((_, index) => {
                const seatId = `${row}${index + 1}`;
                const isSelected = isSeatSelected(seatId);

                return (
                  <button
                    key={seatId}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={!isSelected && !canSelectMoreSeats}
                    className={`
                      w-8 h-8 rounded-t-lg border-2 transition-colors
                      ${isSelected 
                        ? 'bg-blue-500 border-blue-600 text-white' 
                        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                      }
                      ${!isSelected && !canSelectMoreSeats ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg bg-gray-100 border-2 border-gray-300" />
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg bg-blue-500 border-2 border-blue-600" />
            <span className="text-sm text-gray-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg bg-gray-100 border-2 border-gray-300 opacity-50" />
            <span className="text-sm text-gray-600">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
