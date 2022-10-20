import { cx as cxEmotion } from '@emotion/css';
import { css as cssEmotion } from '@emotion/react';
import emotionStyled from '@emotion/styled';

export interface StyledProps {
  className?: string;
}

export const styled = emotionStyled;
export const cx = cxEmotion;
export const css = cssEmotion;
