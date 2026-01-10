import { style } from '@vanilla-extract/css';
import { vars } from '../../tokens/theme.css';

export const container = style({
  minHeight: '100vh',
});

export const header = style({
  textAlign: 'center',
  marginBottom: '4rem',
});

export const title = style({
  fontSize: '3rem',
  fontWeight: '700',
  marginBottom: '1rem',
  color: vars.themeColor.colors.highLightFontColor,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '2.5rem',
    },
  },
});

export const content = style({
  maxWidth: '64rem',
  margin: '0 auto',
});

export const section = style({
  backdropFilter: 'blur(8px)',
  borderRadius: '1rem',
  padding: '2rem 0',
});

export const sectionTitle = style({
  fontSize: '1.5rem',
  fontWeight: '700',
  marginBottom: '1.5rem',
  color: vars.themeColor.colors.highLightFontColor,
  display: 'flex',
  alignItems: 'center',
});

export const paragraph = style({
  marginBottom: '1rem',
  color: vars.themeColor.colors.cardTitleFontColor,
  lineHeight: '1.7',
  fontSize: '1rem',
});

export const quote = style({
  backgroundColor: vars.themeColor.colors.quoteBackground,
  padding: '1.5rem',
  borderLeft: `4px solid ${vars.themeColor.colors.highLightFontColor}`,
  margin: '1.5rem 0',
});

export const quoteText = style({
  color: vars.themeColor.colors.cardTitleFontColor,
  fontStyle: 'italic',
  fontSize: '1.1rem',
  lineHeight: '1.6',
  marginBottom: '0.5rem',
});

export const quoteAuthor = style({
  color: vars.themeColor.colors.cardTitleFontColor,
  fontSize: '0.875rem',
  textAlign: 'right',
});

export const videoContainer = style({
  textAlign: 'center',
  marginTop: '3rem',
});

export const video = style({
  borderRadius: '1rem',
  padding: '1.5rem',
});

export const videoElement = style({
  objectFit: 'contain',
  borderRadius: '0.75rem',
  width: '50%',
});

export const highlightText = style({
  fontSize: '1.25rem',
  fontWeight: '600',
  color: '#fbbf24',
});
