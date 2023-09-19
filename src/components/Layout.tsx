import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='min-h-main container mx-auto  flex  max-w-5xl flex-col px-4'>
        {children}
      </div>
    </div>
  );
}
