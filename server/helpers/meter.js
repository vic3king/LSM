/* eslint-disable no-unused-vars */
const EKEDC_MIN = 1;
const EKEDC_MAX = 1000000000;
const BEDC_MIN = 1000000001;
const BEDC_MAX = 2000000000;

// we don't need to generate a meter number right now as we don't have that interface, for registration any number between these ranges would work
export const generateMeterNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const verifyMeterNumber = meterNumber => {
  if (meterNumber <= EKEDC_MAX) {
    return 'EKEDC';
  }

  if (meterNumber >= BEDC_MAX && meterNumber <= BEDC_MAX) {
    return 'BEDC';
  }
};
