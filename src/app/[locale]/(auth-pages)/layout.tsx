import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  );
};
