import { title, wrapper } from './style.css';

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={wrapper}>
      <h1 className={title}>Feed</h1>
      {children}
    </div>
  );
}
