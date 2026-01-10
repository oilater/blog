import { vars } from '#tokens/theme.css';
import { tag } from './styles/Card.css';

type TagProps = {
  text: string;
};

export function Tag({ text }: TagProps) {
  return (
    <div
      className={tag}
      style={{
        backgroundColor: vars.themeColor.colors.contentBackground,
        color: vars.themeColor.colors.highLightFontColor,
      }}
    >
      <span>{text}</span>
    </div>
  );
}
