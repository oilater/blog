'use client';

import { useTheme } from 'next-themes';
import { vars } from '#tokens/theme.css';
import { tag } from './styles/Tag.css';

type TagProps = {
  text: string;
};

export function Tag({ text }: TagProps) {
  const { theme } = useTheme();
  const tagColor = getTagColor(theme, text);

  return (
    <div
      className={tag}
      style={{
        backgroundColor: vars.themeColor.colors.tagBackground,
      }}
    >
      <span suppressHydrationWarning style={{ color: tagColor }}>
        {text}
      </span>
    </div>
  );
}

const getTagColor = (theme: string | undefined, text: string) => {
  if (!theme || theme === 'dark')
    return vars.themeColor.colors.tagItemColor;

  switch (text) {
    case 'React':
      return vars.colors.blue300;
    case 'TypeScript':
      return vars.colors.blue500;
    case 'HTML5':
      return vars.colors.red300;
    case 'CSS3':
      return vars.colors.orange500;
    case 'JavaScript':
      return vars.colors.teal500;
    case 'NextJS':
      return vars.colors.grey700;
    case 'Emotion':
      return vars.colors.pink400;
    case 'GSAP':
      return vars.colors.green300;
    case 'SCSS':
      return vars.colors.green500;
    case 'Firebase':
      return vars.colors.red400;
    case 'SocketIO':
      return vars.colors.purple400;
    case 'SwiftUI':
      return vars.colors.blue900;
    case 'SwiftData':
      return vars.colors.blue800;
    case 'Recoil':
      return vars.colors.purple400;
    case 'Lighthouse':
      return vars.colors.red300;
    case 'Performance Tab':
      return vars.colors.orange500;
    case 'WebPageTest':
      return vars.colors.teal500;
    default:
      return vars.colors.grey500;
  }
};
