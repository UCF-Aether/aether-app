import { styled, alpha } from "@mui/material";

export interface BlobProps {
  size?: number;
  color?: string;
  animate?: boolean;
}

// CSS source -> https://www.florin-pop.com/blog/2019/03/css-pulse-effect/
export const Blob = styled('div')<BlobProps>(({ theme, size, color, animate }) => {
  if (!color) color = theme.palette.success.light;
  const colorAlpha = alph => alpha(theme.palette.success.light, alph);
  if (animate == undefined) animate = true;

  return {
    background: color,
    borderRadius: '50%',
    margin: 10,
    height: size ?? 15,
    width: size ?? 15,
    boxShadow: `0 0 0 0 ${colorAlpha(1)}`,
    transform: 'scale(1)',
    ...( animate ? { animation: `pulsate 2s infinite` } : {}),
    '@keyframes pulsate': {
      '0%': {
        tranform: 'scale(0.95)',
        boxShadow: `0 0 0 0 ${colorAlpha(0.7)}`,
      },
      '70%': {
        tranform: 'scale(1)',
        boxShadow: `0 0 0 10px ${colorAlpha(0)}`,
      },
      '100%': {
        tranform: 'scale(0.95)',
        boxShadow: `0 0 0 0 ${colorAlpha(0)}`,
      },
    }
  }
});
