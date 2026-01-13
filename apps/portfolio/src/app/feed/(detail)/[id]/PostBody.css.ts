import { globalStyle, style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const vmarkdown = style({
  display: 'block',
  width: '100%',
});

globalStyle(`${vmarkdown} .velog_paragraph`, {
  fontSize: '18px',
  fontWeight: '400',
  lineHeight: '1.7',
  color: themeColor.colors.cardTitleFontColor,
  margin: '18px 0',
  overflowWrap: 'break-word',
});

globalStyle(`${vmarkdown} .velog_strong`, {
  fontWeight: '700',
  color: themeColor.colors.cardTitleFontColor,
});

globalStyle(`${vmarkdown} .velog_em`, {
  fontStyle: 'italic',
  color: themeColor.colors.cardTitleFontColor,
});

globalStyle(`${vmarkdown} .velog_link`, {
  color: '#12b886',
  transition: 'color 0.2s ease',
  textDecoration: 'none',
});

globalStyle(`${vmarkdown} .velog_link:hover`, {
  textDecoration: 'underline',
});

const headingStyles = {
  1: '40px',
  2: '32px',
  3: '24px',
  4: '18px',
  5: '15px',
  6: '12px',
} as const;

Object.entries(headingStyles).forEach(([level, size]) => {
  globalStyle(`${vmarkdown} .velog_heading${level}`, {
    fontSize: size,
    fontWeight: 700,
    color: themeColor.colors.cardTitleFontColor,
    margin: level === '4' ? '40px 0 16px' : '24px 0 16px',
  });
});

globalStyle(`${vmarkdown} .velog_hr`, {
  border: 'none',
  borderTop: '1px solid #e9ecef',
  margin: '4px 0 24px',
});

globalStyle(`${vmarkdown} .velog_list`, {
  margin: '12px 0',
  paddingLeft: '24px',
});

globalStyle(`${vmarkdown} .velog_listItem`, {
  fontSize: '18px',
  lineHeight: '1.7',
  margin: '4px 0',
});

globalStyle(`${vmarkdown} .velog_blockquote`, {
  backgroundColor: themeColor.colors.contentBackground,
  borderLeft: '4px solid #20C997',
  padding: '4px 16px 4px 32px',
  margin: '32px 0',
  color: themeColor.colors.cardTitleFontColor,
});

globalStyle(`${vmarkdown} .velog_code`, {
  backgroundColor: themeColor.colors.postCodeColor,
  padding: '3.06px 6.12px',
  borderRadius: '4px',
  fontSize: '15.3px',
  lineHeight: '1.8',
});

globalStyle(`${vmarkdown} .velog_preBlock`, {
  backgroundColor: themeColor.colors.cardBackground,
  padding: '20px',
  borderRadius: '18px',
  margin: '16px 0',
  overflow: 'auto',
});

globalStyle(`${vmarkdown} .velog_preBlock > .velog_codeInPre`, {
  backgroundColor: 'transparent',
  padding: 0,
  fontSize: '14px !important',
  lineHeight: '1.6',
  fontFamily: 'monospace !important',
});

globalStyle(`${vmarkdown} .velog_preBlock code[class*="language-"]`, {
  textShadow: 'none !important',
  backgroundColor: 'transparent !important',
  color: themeColor.colors.mainFontColor,
});

globalStyle(
  `${vmarkdown} .token.operator, ${vmarkdown} .token.string`,
  {
    background: 'none',
  },
);
