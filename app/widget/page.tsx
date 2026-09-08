import { Suspense } from 'react';
import { getClient, clients } from '@/lib/clients';
import ChatWidget from './ChatWidget';

interface PageProps {
  searchParams: Promise<{ clientId?: string }>;
}

export default async function WidgetPage({ searchParams }: PageProps) {
  const { clientId = 'demo' } = await searchParams;
  const rawConfig = getClient(clientId);
  // Restores each hand-configured client's pre-Chatacus identity ('Vaughan')
  // in the widget footer. Only applies when clientId is literally one of
  // the hardcoded clients.ts entries — a Chatacus-provisioned id is never a
  // key in that object, so this is a no-op for them and they keep today's
  // 'Chatacus' default untouched.
  const config = clients[clientId]
    ? { ...rawConfig, assistantDisplayName: rawConfig.assistantDisplayName ?? 'Vaughan' }
    : rawConfig;

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-gray-400 text-sm">
          Loading…
        </div>
      }
    >
      <ChatWidget clientId={clientId} config={config} />
    </Suspense>
  );
}
