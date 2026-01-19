import fs from 'node:fs';
import path from 'node:path';

export default function PostPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return <div>{fileContent}</div>;
  } catch (e) {
    return <div>글을 찾을 수 없습니다. (경로 확인: {filePath})</div>;
  }
}
