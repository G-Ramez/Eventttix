import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`}>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative aspect-[16/9]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-lg font-semibold line-clamp-1">{event.title}</p>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
            <span>{new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold text-indigo-600">
              ${event.price.toFixed(2)}
            </span>
            <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium group-hover:bg-indigo-100 transition-colors">
              Get Tickets
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
