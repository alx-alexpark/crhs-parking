export function StudentInformation() {
  return (
    <>
      <section>
        <h1>Student information</h1>

        <label htmlFor="first-name">First name</label>
        <input id="first-name"></input>

        <label htmlFor="last-name">Last name</label>
        <input id="last-name"></input>

        <label htmlFor="student-id">Student ID</label>
        <input id="student-id"></input>

        <label htmlFor="grade-select">Grade Level</label>
        <select name="grade-level" id="grade-select">
          <option value="">--Please choose an option--</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </section>
    </>
  );
}
