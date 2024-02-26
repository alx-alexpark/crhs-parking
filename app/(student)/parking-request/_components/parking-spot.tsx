import ParkingRequestPage from '.';

export function ParkingSpot({ formik, children }: ParkingRequestPage) {
  return (
    <>
      <section>
        <h1>Pick your parking spot</h1>
        <p>
          Pick the spot you wish to park in. 
        </p>
        <p>
          Note that you won't get the parking spot until you submit the form.
          A spot may be reserved for 72 hours (3 days). Not completing the 
          form in 3 days will result in your reservation and form progress being reset.
        </p>

        <label htmlFor="parking-select">Spot number</label>
        <input
          id="parking-select"
          name="spotNum"
          onChange={formik.handleChange}
          value={formik.values.spotNum || ''}
        />

      </section>

      <section>
        <p>
          You may make requests to park in specific spots depending on your
          need. Do not request to be next to a friend, as such requests will be
          ignored. Please note that we do our best to accommodate requests, but
          we cannot make guarantees!
        </p>
        <ul>
          <li>
            I drive a truck and would like to be on the back row of 1600 Lot - F
          </li>
          <li>I would like to be near the rotunda</li>
          <li>I would like to be near the tennis courts</li>
        </ul>

        <label htmlFor="special-request">Special parking requests</label>
        <textarea id="special-request"></textarea>
      </section>

      {children}
    </>
  );
}
