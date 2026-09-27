'use client';

import React from 'react';
import { AppShell } from '@/components/shell';
import { DashboardView } from '@/features/dashboard';

export default function HomePage() {
  return (
    <AppShell initialRoute="dashboard">
      <DashboardView />
    </AppShell>
  );
}
