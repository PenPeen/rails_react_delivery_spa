export const animTiming = (duration: number) => {
  return {
    duration,
    easing: "ease-out",
  };
};

export const closingAnimKeyframes = (content: HTMLDivElement) => [
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];

export const openingAnimKeyframes = (content: HTMLDivElement) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
];
