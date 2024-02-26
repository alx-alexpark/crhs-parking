import ParkingRequestPage from '.';

export function ParkingSpot({ formik }: ParkingRequestPage) {
  return (
    <div>
      <section>
        <h1>Pick your parking spot</h1>
        <p>
          Pick the quadrant you wish to park in. A staff member will select a
          specific parking spot in the quadrant you chose for you.
        </p>
        <p>
          Note that you won't get the parking spot until you submit the form.
        </p>

        <select
          id="parking-select"
          name="quadrant"
          onChange={formik.handleChange}
          value={formik.values?.quadrant}
        >
          <option value="">--Please choose an option--</option>
          <option value="9TH_GRADE">9th Grade</option>
          <option value="1200">1200s</option>
          <option value="1600">1600s</option>
          <option value="ATHLETICs">Athletics</option>
        </select>
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
    </div>
  );
}
