'use client';

import { TextInput } from '@/components';
import Card from '@/components/Card/card';
import { UserType } from '@/models/User';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Formik } from 'formik';
import { useState } from 'react';

export default function StickerPage() {
  const [studentId, setStudentId] = useState('');

  const [studentData, setStudentData] = useState<UserType | null>(null);

  const scanWithCamera = () => {
    // For now, this is a mock function to simulate the camera scanning
    // The student ID barcode uses Code 39, and is in the format of /{A-Z}\d{7}/
    setStudentId('K1234567');
  };

  const setStickerClaimed = (claimed: boolean) => {
    // This function will update the target user data to mark the sticker as either claimed or unclaimed
  };

  return (
    <>
      <h1>Parking stickers</h1>

      <Card>
        <Formik
          initialValues={{ studentId }}
          onSubmit={(values) => {
            // This function will fetch the student data from the server and update the studentData state

            // For now, we will just mock the student data
            // @ts-expect-error: Incomplete data for the purposes of the mockup
            setStudentData({
              name: 'John Doe',
              studentId: values.studentId,
              stickerClaimed: false,
            });
          }}
        >
          <TextInput id="student-id" name="studentId" label="Student ID" />
          <button className="btn-tertiary" onClick={scanWithCamera}>
            Scan using camera
          </button>

          <button type="submit">
            Search <ArrowRightIcon />
          </button>
        </Formik>
      </Card>

      {studentData && (
        <>
          <hr />

          <Card>
            <p>
              <small>Name</small>
              <br />
              {studentData.name}
            </p>
            <p>
              <small>Student ID</small>
              <br />
              {studentData.studentId}
            </p>
            <p>
              <small>Sticker claimed</small>
              <br />
              {studentData.stickerClaimed ? 'Yes' : 'No'}
            </p>

            <button
              onClick={() => setStickerClaimed(!studentData.stickerClaimed)}
            >
              {studentData.stickerClaimed ? 'Unmark' : 'Mark'} sticker claimed
            </button>
          </Card>
        </>
      )}
    </>
  );
}
