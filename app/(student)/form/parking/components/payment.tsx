import { uploadFileToBucket } from '@/app/util';
import { FileInput } from '@/components';
import { ErrorMessage } from 'formik';
import ParkingRequestPage from '.';

export function Payment({ formik }: ParkingRequestPage) {
  return (
    <>
      <section>
        <h1>Payment</h1>

        <p>
          If you haven’t already, make your $75 payment for the parking on{' '}
          <a href="https://katyisd.revtrak.net/high-schools/cinco-ranch-high-school/crhs-parking">
            Pay N' Go
          </a>
          , and upload your receipt here.
        </p>

        <label htmlFor="receipt-photo">CRHS parking receipt</label>
        <FileInput
          id="receipt-photo"
          name="paymentId"
          accept="image/*"
          onSetFile={async (h: File) => {
            const url = await uploadFileToBucket(h);
            formik.setFieldValue('vehicle.proofOfInsurance', url);

            return url;
          }}
        />
        <ErrorMessage name="paymentId" component="div" />
      </section>
    </>
  );
}
