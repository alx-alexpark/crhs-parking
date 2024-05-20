import { uploadFileToBucket } from '@/app/util';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import * as Yup from 'yup';

import { FileInput, Tooltip } from '@/components';
import ErrorMessage from '@/components/Inputs/error-message';
import { ArrowRightIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { Field, Formik } from 'formik';
import { E164Number } from 'libphonenumber-js/core';
import PhoneInput from 'react-phone-number-input';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmSubmit from '../components/confirm-submit';

import { StatusCard } from '@/components/StatusCard/status-card';
import 'react-phone-number-input/style.css';
import 'react-toastify/dist/ReactToastify.min.css';
import styles from '../form.module.scss';

interface AboutMeFormProps {
  data: any;
}

// TODO: Error messages try to be friendly, but they may be too vague
const AboutMeSchema = Yup.object().shape({
  // TODO: yup-phone?
  phone: Yup.string()
    .max(16, 'Invalid phone number')
    .required('Phone number is required'),
  // studentId: Yup.string()
  //   .matches(/[a-z]\d{7}/i, 'Did you mistype your ID?')
  //   .required('Student ID is required'),
  grade: Yup.number()
    .min(10, 'Freshmen cannot park on campus')
    .max(12, 'High school graduates cannot request a parking spot!'),
});

export function AboutMeForm({ data }: AboutMeFormProps) {
  // Phone number
  // NOTE: E164Number is a string. The specific definition is Tagged<string, "E164Number">
  const [phoneNumber, setPhoneNumber] = useState<E164Number>();

  // Driver's license
  const [dl, setDL] = useState<string>();

  // TODO: detect when fetched data differs from current data
  // const initialData = useMemo(() => {
  //   if (!data) return {};

  //   return data;
  // }, [data]);

  const router = useRouter();

  return (
    <>
      <Formik
        className={styles.formPage}
        initialValues={data}
        onSubmit={(values: any) => {
          // console.log({phone: values.phone, grade: values.grade, driversLicense: dl});
          axios
            .put('/api/v1/student/userProfile', {
              phone: Number(phoneNumber),
              grade: values.grade,
              driversLicense: dl,
            })
            .then((res) => {
              console.log(res);
              router.push('/dashboard');
            })
            .catch((error) => {
              console.error(error);
              toast.error(
                'There was an error updating your user information: ' + error
              );
            });
        }}
        validationSchema={AboutMeSchema}
        // reset form when initial values change
        enableReinitialize={true}
      >
        {({ submitForm, isSubmitting, setFieldValue }) => (
          <>
            {isSubmitting && (
              <StatusCard status="info">
                Updating your information...
              </StatusCard>
            )}
            <section>
              <h2>Student information</h2>

              <label htmlFor="phone">Student's phone number</label>
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry="US"
                numberInputProps={{ name: 'phone', id: 'phone' }}
              />
              <ErrorMessage name="phone" component="div" />

              {/* TODO: derive from email */}
              {/* <Field type="text" name="studentId" /> */}
              {/* <ErrorMessage name="studentId" component="div" /> */}

              <label htmlFor="grade" className={styles.inlineLabel}>
                Grade level{' '}
                <Tooltip content="Students may not park on campus as a freshman">
                  <InfoCircledIcon />
                </Tooltip>
              </label>
              <div role="group" id="grade">
                <label>
                  <Field type="radio" name="grade" value="10" />
                  10
                </label>
                <label>
                  <Field type="radio" name="grade" value="11" />
                  11
                </label>
                <label>
                  <Field type="radio" name="grade" value="12" />
                  12
                </label>
              </div>
              <ErrorMessage name="grade" component="div" />
            </section>

            <section>
              <h2>Driver information</h2>

              <p>
                You need valid documentation to apply for a parking spot.
                Students with a <em>learner's permit</em> are not allowed to
                apply.
              </p>

              <label htmlFor="license-photo">Photo of driver's license.</label>
              <FileInput
                id="license-photo"
                name="student.driversLicense"
                accept="image/*"
                onSetFile={async (h: File) => {
                  const filename = await uploadFileToBucket(h);
                  setFieldValue('driversLicense', filename);
                  console.warn(filename);
                  setDL(filename);

                  return filename;
                }}
              />
            </section>

            <div className={styles.actions}>
              <ConfirmSubmit onSubmit={submitForm}>
                <button type="button" disabled={isSubmitting}>
                  Submit
                </button>
              </ConfirmSubmit>
            </div>
          </>
        )}
      </Formik>
      <ToastContainer position="bottom-right" />
    </>
  );
}
