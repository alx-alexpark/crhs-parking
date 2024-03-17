import { ParkingMap } from '@/components';
import { useState } from 'react';
import ParkingRequestPage from '.';

export function ParkingSpot({ formik }: ParkingRequestPage) {
  const [spot, setSpot] = useState(formik.values.spotNum || null);

  return (
    <>
      <section>
        <h1>Pick your parking spot</h1>
        <p>
          Select the spot you wish to park in. Note that you won't get the
          parking spot until you submit the form.
        </p>

        <input
          name="spotNum"
          type="number"
          onChange={formik.handleChange}
          value={spot ?? undefined}
          hidden={true}
          readOnly={true}
        />

        <ParkingMap
          spot={spot}
          setSpot={setSpot}
          height={400}
          interactive={true}
        />
      </section>
    </>
  );
}
