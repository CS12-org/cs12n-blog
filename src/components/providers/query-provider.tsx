'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

import createQueryClient from '~/lib/react-query';

type Props = { children?: ReactNode };

function QueryProvider(props: Props) {
  const { children } = props;
  const [queryClient] = useState(createQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
