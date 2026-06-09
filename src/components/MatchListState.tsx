import React from 'react';

const Box: React.FC<{ icon: string; title: string; message: string }> = ({ icon, title, message }) => (
  <div className="border-2 border-dashed border-white/10 rounded-2xl py-16 flex flex-col items-center justify-center gap-4">
    <span className="text-5xl">{icon}</span>
    <h3 className="text-white font-bold text-xl">{title}</h3>
    <p className="text-white/40 text-sm text-center max-w-md px-4">{message}</p>
  </div>
);

export const LoadingState: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {[0, 1, 2].map((i) => (
      <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse h-44" />
    ))}
  </div>
);

export const ErrorState: React.FC<{ message?: string }> = ({ message }) => (
  <Box icon="⚠️" title="Couldn't load live data" message={message || 'Please try again in a moment.'} />
);

export const EmptyState: React.FC<{ icon?: string; title?: string; message: string }> = ({
  icon = '🗓️',
  title = 'Nothing here yet',
  message,
}) => <Box icon={icon} title={title} message={message} />;
