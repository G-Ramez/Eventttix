import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  maxPerOrder: number;
}

interface TicketSelectionProps {
  tickets?: TicketType[];
  onSelectionChange?: (selection: { [key: string]: number }) => void;
}

export const TicketSelection: React.FC<TicketSelectionProps> = ({
  tickets = [
    {
      id: 'general',
      name: 'General Admission',
      price: 50,
      description: 'Standard entry ticket',
      maxPerOrder: 10,
    },
    {
      id: 'vip',
      name: 'VIP Access',
      price: 150,
      description: 'Premium experience with exclusive benefits',
      maxPerOrder: 4,
    },
  ],
  onSelectionChange,
}) => {
  const [selection, setSelection] = useState<{ [key: string]: number }>(
    Object.fromEntries(tickets.map(ticket => [ticket.id, 0]))
  );

  const updateQuantity = (ticketId: string, delta: number) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const newQuantity = Math.max(0, Math.min(selection[ticketId] + delta, ticket.maxPerOrder));
    const newSelection = { ...selection, [ticketId]: newQuantity };
    setSelection(newSelection);
    onSelectionChange?.(newSelection);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">Select Tickets</h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-colors"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{ticket.name}</h3>
              <p className="text-gray-600">{ticket.description}</p>
              <p className="text-lg font-medium text-blue-600 mt-1">
                {formatPrice(ticket.price)}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateQuantity(ticket.id, -1)}
                disabled={selection[ticket.id] === 0}
                className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5" />
              </button>
              
              <span className="w-8 text-center font-medium">
                {selection[ticket.id]}
              </span>
              
              <button
                onClick={() => updateQuantity(ticket.id, 1)}
                disabled={selection[ticket.id] === ticket.maxPerOrder}
                className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {Object.values(selection).some(quantity => quantity > 0) && (
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total</span>
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(
                tickets.reduce(
                  (sum, ticket) => sum + ticket.price * selection[ticket.id],
                  0
                )
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};