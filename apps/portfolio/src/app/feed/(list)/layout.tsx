import { title } from './style.css';

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className={title}>Feed</h1>
      {children}
    </div>
  );
}
