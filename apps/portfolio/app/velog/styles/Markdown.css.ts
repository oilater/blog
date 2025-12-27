import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/global.css';

const colors = {
  text: '#212529',
  primary: '#374151',
  secondary: '#6b7280',
  accent: '#3b82f6',
  strong: '#1f2937',
  link: '#12b886',
  quote: '#20C997',
  code: '#E9ECEF',
  background: '#f8f9fa',
  preBackground: '#FBFCFD',
  preCode: '#24292E',
} as const;

export const postParagraph = style({
  fontSize: '18px',
  fontWeight: '400',
  lineHeight: '1.7',
  color: vars.themeColor.colors.cardTitleFontColor,
  margin: '18px 0',
});

export const postSpan = style({
  color: vars.themeColor.colors.cardTitleFontColor,
});

export const postStrong = style({
  fontWeight: '700',
  color: vars.themeColor.colors.cardTitleFontColor,
});

export const postEm = style({
  fontStyle: 'italic',
  color: vars.themeColor.colors.cardTitleFontColor,
});

export const postLink = style({
  color: colors.link,
  transition: 'color 0.2s ease',
  ':hover': {
    color: colors.link,
    textDecoration: 'underline',
  },
});

export const postHeading1 = style({
  fontSize: '40px',
  fontWeight: '700',
  color: vars.themeColor.colors.cardTitleFontColor,
  margin: '24px 0 16px',
});

export const postHeading2 = style({
  fontSize: '32px',
  fontWeight: '700',
  color: vars.themeColor.colors.cardTitleFontColor,
  margin: '24px 0 16px',
});

export const postHeading3 = style({
  fontSize: '24px',
  fontWeight: '700',
  color: vars.themeColor.colors.cardTitleFontColor,
  margin: '24px 0 16px',
});

export const postHeading4 = style({
  fontSize: '18px',
  fontWeight: '700',
  color: vars.themeColor.colors.cardTitleFontColor,
  margin: '40px 0 16px',
});

export const postHeading5 = style({
  fontSize: '15px',
  fontWeight: '700',
  color: vars.themeColor.colors.cardTitleFontColor,
  margin: '24px 0 16px',
});

export const postHeading6 = style({
  fontSize: '12px',
  fontWeight: '700',
  color: vars.themeColor.colors.cardTitleFontColor,
  margin: '24px 0 16px',
});

export const postList = style({
  margin: '12px 0',
  paddingLeft: '24px',
});

export const postListItem = style({
  fontSize: '18px',
  lineHeight: '1.7',
  margin: '4px 0',
});

export const postBlockquote = style({
  backgroundColor: vars.themeColor.colors.contentBackground,
  borderLeft: `4px solid ${colors.quote}`,
  padding: '4px 16px 4px 32px',
  margin: '32px 0',
  color: vars.themeColor.colors.cardTitleFontColor,
});

export const postCode = style({
  backgroundColor: vars.themeColor.colors.postCodeColor,
  padding: '3.06px 6.12px',
  borderRadius: '4px',
  fontSize: '15.3px',
  lineHeight: '1.8',
});

export const postPreBlock = style({
  backgroundColor: colors.preBackground,
  padding: '14px',
  borderRadius: '4px',
  margin: '16px 0',
  overflow: 'auto',
});

export const postCodeInPre = style({
  backgroundColor: 'transparent',
  padding: 0,
  fontSize: '14px !important',
  lineHeight: '1.6',
  fontFamily: 'monospace !important',
});

export const postHr = style({
  border: 'none',
  borderTop: '1px solid #e9ecef',
  margin: '4px 0 24px',
});
