export function ParkingSpot() {
  return (
    <>
      <section>
        <h1>Pick your parking spot</h1>
        <p>Pick the quadrant you wish to park in. A staff member will select a specific parking spot in the quadrant you chose for you.</p>

        <select name="parking-area" id="parking-select">
          <option value="">--Please choose an option--</option>
          <option value="pac">PAC</option>
          <option value="1200s">1200s</option>
          <option value="1600s">1600s</option>
          <option value="athletic">Athletic</option>
        </select>
      </section>

      <section>
        <p>You may make requests to park in specific spots depending on your need. Do not request to be next to a friend, as such requests will be ignored. Please note that we do our best to accommodate requests, but we cannot make guarantees!</p>
        <ul>
          <li>I drive a truck and would like to be on the back row of 1600 Lot - F</li>
          <li>I would like to be near the rotunda</li>
          <li>I would like to be near the tennis courts</li>
        </ul>

        <label htmlFor="special-request">Special parking requests</label>
        <textarea id="special-request"></textarea>
      </section>
    </>
  );
}

