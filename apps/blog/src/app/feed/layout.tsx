import { QueryProvider } from '#components/QueryProvider';

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
