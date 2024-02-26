import { FileInput } from '@/components';
import ParkingRequestPage from '.';

export function DriverInformation({ formik, children }: ParkingRequestPage) {
  return (
    <>
      <section>
        <h1>Driver information</h1>

        <label htmlFor="license-photo">Photo of your driver's license</label>
        <FileInput
          id="license-photo"
          name="student.driversLicense"
          accept="image/*"
        />

        <label htmlFor="insurance-photo">Photo of vehicle's insurance</label>
        <FileInput
          id="insurance-photo"
          name="vehicle.proofOfInsurance"
          accept="image/*"
        />
      </section>

      {children}
    </>
  );
}
