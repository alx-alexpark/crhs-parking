import { FormikProps } from 'formik';

import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';

export default interface ParkingRequestPage {
  formik: FormikProps<ParkingSpotRequestType>;
}

// tslint:disable:ordered-imports
export * from './get-started';
export * from './parking-spot';
export * from './vehicle-information';
export * from './payment';
export * from './guidelines';
