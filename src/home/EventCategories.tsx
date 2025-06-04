import React from 'react';
import { Music2, Ticket, Palette, Trophy, Theater, Microscope as Microphone } from 'lucide-react';

const categories = [
  { name: 'Concerts', icon: Music2, color: 'bg-pink-500' },
  { name: 'Sports', icon: Trophy, color: 'bg-blue-500' },
  { name: 'Arts & Theater', icon: Palette, color: 'bg-purple-500' },
  { name: 'Comedy', icon: Microphone, color: 'bg-yellow-500' },
  { name: 'Family', icon: Theater, color: 'bg-green-500' },
  { name: 'Special Events', icon: Ticket, color: 'bg-red-500' },
];

const EventCategories = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className={`${category.color} p-3 rounded-full mb-4`}>
              <category.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EventCategories;
