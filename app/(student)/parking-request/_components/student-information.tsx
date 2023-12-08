import ParkingRequestPage from '.';

export function StudentInformation({ formik, children }: ParkingRequestPage) {
  return (
    <>
      <section>
        <h1>Student information</h1>

        <label htmlFor="first-name">First name</label>
        <input
          id="first-name"
          name="student.legalFirstName"
          onChange={formik.handleChange}
          value={formik.values.student.legalFirstName}
        />

        <label htmlFor="last-name">Last name</label>
        <input
          id="last-name"
          name="student.legalLastName"
          onChange={formik.handleChange}
          value={formik.values.student.legalLastName}
        />

        <label htmlFor="student-id">Student ID</label>
        <input
          id="student-id"
          name="user.studentId"
          onChange={formik.handleChange}
          value={formik.values.user.studentId}
        />

        <label htmlFor="grade-select">Grade Level</label>
        <select
          id="grade-select"
          name="user.grade"
          onChange={formik.handleChange}
          value={formik.values.user.grade}
        >
          <option value="">--Please choose an option--</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </section>

      {children}
    </>
  );
}
