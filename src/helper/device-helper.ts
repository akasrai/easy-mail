export const getDeviceWidth = () => {
  return window.innerWidth;
};

export const isMobileScreen = () => {
  return getDeviceWidth() <= 776;
};
