import { themeColor } from '#tokens/theme.css';
import { tag } from './styles/Card.css';

type TagProps = {
  text: string;
};

export function Tag({ text }: TagProps) {
  return (
    <div
      className={tag}
      style={{
        backgroundColor: themeColor.colors.contentBackground,
        color: themeColor.colors.highLightFontColor,
      }}
    >
      <span>{text}</span>
    </div>
  );
}
