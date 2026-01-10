import {
  createTheme,
  createThemeContract,
} from '@vanilla-extract/css';
import { palette } from './color/palette';

const themeColor = createThemeContract({
  colors: {
    mainBackground: null,
    contentBackground: null,
    cardBackground: null,
    quoteBackground: null,
    tagBackground: null,
    tagItemColor: null,
    titleFontColor: null,
    mainFontColor: null,
    subFontColor: null,
    cardTitleFontColor: null,
    cardDescriptionFontColor: null,
    borderColor: null,
    contentFontColor: null,
    highLightFontColor: null,
    postCodeColor: null,
    skeletonColor: null,
  },
});

export const lightTheme = createTheme(themeColor, {
  colors: {
    titleFontColor: palette.grey800,
    mainBackground: palette.white,
    contentBackground: palette.white,
    cardBackground: palette.grey50,
    quoteBackground: palette.grey50,
    tagBackground: palette.grey100,
    tagItemColor: palette.grey700,
    mainFontColor: palette.grey700,
    subFontColor: palette.grey500,
    cardTitleFontColor: palette.grey800,
    cardDescriptionFontColor: palette.grey600,
    borderColor: palette.grey300,
    contentFontColor: palette.grey600,
    highLightFontColor: palette.blue500,
    postCodeColor: '#E9ECEF',
    skeletonColor: palette.grey100,
  },
});

export const darkTheme = createTheme(themeColor, {
  colors: {
    titleFontColor: palette.white,
    mainBackground: palette.black,
    contentBackground: '#191F28',
    cardBackground: palette.grey900,
    quoteBackground: palette.grey800,
    tagBackground: '#4E5968',
    tagItemColor: '#C3C3C6',
    mainFontColor: '#C3C3C6',
    subFontColor: '#C3C3C6',
    cardTitleFontColor: '#E4E4E5',
    cardDescriptionFontColor: '#9E9EA4',
    borderColor: palette.grey800,
    contentFontColor: '#7E7E87',
    highLightFontColor: palette.blue400,
    postCodeColor: '#24292E',
    skeletonColor: palette.grey800,
  },
});

export const vars = { themeColor, colors: palette };

export const mediaQueries = {
  mobile: `(max-width: 768px)`,
  desktop: `(min-width: 1024px)`,
};
