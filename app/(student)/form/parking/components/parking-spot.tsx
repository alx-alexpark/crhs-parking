import { ParkingMap, TextInput } from '@/components';
import { useEffect, useState } from 'react';
import ParkingRequestPage from '.';

import styles from './form-page.module.scss';

export function ParkingSpot({ formik }: ParkingRequestPage) {
  const [spot, setSpot] = useState(formik.values?.spotNum || null);

  // Since the parking spot is updated by the map, we need to update the Formik
  // value manually
  useEffect(() => {
    formik.setFieldValue('spotNum', spot);
  }, [spot]);

  return (
    <>
      <section>
        <h1>Pick your parking spot</h1>
        <p>
          Select the spot you wish to park in. Note that you won't get the
          parking spot until you submit the form.
        </p>

        <ParkingMap
          spot={spot}
          setSpot={setSpot}
          height={400}
          interactive={true}
          className={styles.map}
        />

        {spot && (
          <p>
            You selected spot <b>{spot}</b>
          </p>
        )}
        <TextInput
          id="spotNum"
          name="spotNum"
          label={null}
          value={spot}
          type="number"
          hidden={true}
          readOnly={true}
          onChange={() => {}}
        />
      </section>
    </>
  );
}
