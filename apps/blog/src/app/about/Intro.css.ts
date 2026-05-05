import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  marginBottom: 50,
});

export const photoWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 24,
});

export const profileImage = style({
  width: 180,
  height: 'auto',
  borderRadius: 12,
  backgroundColor: '#f0f0f0',
});

export const contact = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 8,
  fontSize: 14,
  color: themeColor.colors.subFontColor,
  marginBottom: 6,
  ':last-of-type': {
    marginBottom: 24,
  },
});

export const contactGroup = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
});

export const contactLink = style({
  color: themeColor.colors.subFontColor,
  textDecoration: 'none',
  borderBottom: `1px solid transparent`,
  transition: 'color 0.15s ease, border-color 0.15s ease',
  ':hover': {
    color: themeColor.colors.titleFontColor,
    borderBottomColor: themeColor.colors.borderColor,
  },
});

export const contactDot = style({
  color: themeColor.colors.borderColor,
  userSelect: 'none',
});

export const textSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 16,
});

export const bulletList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const bullet = style({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.7,
  color: themeColor.colors.mainFontColor,
  position: 'relative',
  paddingLeft: 16,
  selectors: {
    '&::before': {
      content: '"•"',
      position: 'absolute',
      left: 0,
      color: themeColor.colors.subFontColor,
    },
  },
});

export const emphasis = style({
  fontWeight: 500,
});
