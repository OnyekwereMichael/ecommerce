import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const TanstackProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient()); // Initialize the QueryClient

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools for React Query */}
      <ReactQueryDevtools initialIsOpen={false} position={'bottom'} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
