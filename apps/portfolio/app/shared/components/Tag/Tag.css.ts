import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/global.css';

export const tag = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  height: 'fit-content',
  padding: '3px 6px',
  borderRadius: '16px',
  fontSize: '12.5px',
  fontWeight: '500',
  backgroundColor: vars.themeColor.colors.tagBackground,
});
