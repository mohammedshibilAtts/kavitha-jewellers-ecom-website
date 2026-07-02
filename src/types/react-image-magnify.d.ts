declare module 'react-image-magnify' {
  import * as React from 'react';

  export interface ImageProps {
    alt?: string;
    src: string;
    srcSet?: string;
    sizes?: string;
    isFluidWidth?: boolean;
    width?: number;
    height?: number;
  }

  export interface ReactImageMagnifyProps {
    className?: string;
    style?: React.CSSProperties;
    hoverDelayInMs?: number;
    hoverOffDelayInMs?: number;
    fadeDurationInMs?: number;
    pressDuration?: number;
    pressMoveThreshold?: number;
    isActivatedByTouch?: boolean;
    isHintEnabled?: boolean;
    hintTextMouse?: string;
    hintTextTouch?: string;
    shouldShowHintLimitInMs?: number;
    enlargedImagePosition?: 'beside' | 'over';
    enlargedImageContainerClassName?: string;
    enlargedImageContainerStyle?: React.CSSProperties;
    enlargedImageClassName?: string;
    enlargedImageStyle?: React.CSSProperties;
    imageClassName?: string;
    imageStyle?: React.CSSProperties;
    lensClassName?: string;
    lensStyle?: React.CSSProperties;
    smallImage: ImageProps;
    largeImage: ImageProps;
  }

  const ReactImageMagnify: React.ComponentType<ReactImageMagnifyProps>;
  export default ReactImageMagnify;
}
