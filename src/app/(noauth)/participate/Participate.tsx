"use client"
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { participationSchema } from '@/validationSchema/participateSchema';
import { API_URL } from '@/constants/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import AboutSection from '@/components/AboutSection';
import Dialogbox from '@/components/DialogBox';

interface Option {
  value: string;
  label: string;
}

const ParticipationForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const URL = `${API_URL}/auth/create-participant`;
  const navigate = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const typeInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHydrated(true);
  }, []);

  const options: Option[] = [
    { value: 'social_media', label: 'EAYoruba' },
    { value: 'friend', label: 'Word of Mouth/Recommendation' },
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'TikTok', label: 'TikTok' },
    { value: 'YouTube', label: 'YouTube' },
    { value: 'Instagram', label: 'Instagram' },
  ];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const { source } = formik.values;

    if (checked) {
      formik.setFieldValue("source", [...source, value]);
    } else {
      formik.setFieldValue(
        "source",
        source.filter((item: string) => item !== value)
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      mobileNumber: '',
      gender: '',
      state: '',
      placeOfResidence: '',
      platformLink: '',
      socialMediaHandle: '',
      source: [] as string[],
      rulesAgreement: false,
      comment: '',
    },
    validationSchema: participationSchema,

    onSubmit: async (values, { resetForm }) => {
      const { rulesAgreement, ...restValues } = values;
      try {
        setLoading(true);
        await axios.post(URL, restValues);
        navigate.push('/')
        toast.success("User registered successfully.");
        resetForm();
      } catch (error) {
        toast.error("Sign up failed. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },

  });
  const setGenderValue = (event: MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.dataset.value as string;
    if (!typeInputRef.current) return
    typeInputRef.current.value = value
    formik.values.gender = value
  }
  if (!hydrated) {
    return null;
  }
  return (
    <>
      <AboutSection />

      <section className="flex justify-center items-center py-10 px-4">
        <div className="shadow-md-lg dark:shadow-2xl p-8 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl transition-all duration-300">
          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700  dark:text-gray-400 text-base font-bold mb-2">
                Email
                <span className=' text-secondary-dark ml-3'>*</span>

              </label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                placeholder='email'
                value={formik.values.email}
                className="shadow appearance-none border  py-4 w-full px-3 event-form-input "
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-400  text-base font-bold mb-2">
                Full Name (Name and Surname)
                <span className=' text-secondary-dark ml-3'>*</span>

              </label>
              <input
                type="text"
                name="fullName"
                onChange={formik.handleChange}
                placeholder='full name'
                value={formik.values.fullName}
                className="shadow appearance-none border  py-4 w-full px-3 event-form-input "
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.fullName}
                </div>
              )}
            </div>

            {/* Gender */}
            <div id='genderField' className='relative'>
              <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Gender</label>
              <input
                ref={typeInputRef}
                type="text"
                readOnly
                placeholder="Select Gender"
                className="w-full py-4 p-2 event-form-input"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Dialogbox
                triggerDomId="genderField"
                positions={{ ySide: 'bottom' }}
                closeOnClick
                className="text-neutral-700 dark:text-neutral-200 dark:bg-slate-900 border dark:border-slate-700 right-1/2 w-full shadow translate-x-1/2"
              >
                <ul className="dark:text-neutral-200">
                  <li
                    onClick={setGenderValue}
                    data-value="Male"
                    className="p-2 dark:hover:bg-slate-700 hover:bg-gray-200 cursor-pointer rounded-lg"
                  >
                    Male
                  </li>
                  <li
                    onClick={setGenderValue}
                    data-value="Female"
                    className="p-2 dark:hover:bg-slate-700 hover:bg-gray-200 cursor-pointer rounded-lg"
                  >
                    Female
                  </li>
                  <li
                    onClick={setGenderValue}
                    data-value="Other"
                    className="p-2 dark:hover:bg-slate-700 hover:bg-gray-200 cursor-pointer rounded-lg"
                  >
                    Other
                  </li>
                </ul>
              </Dialogbox>
              {formik.errors.gender && formik.touched.gender && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.gender}
                </div>
              )}
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-400 mt-4 mb-2 text-base font-bold mb-2">
                Mobile Number (Include Dialling/Area Code)
              </label>
              <input
                type="text"
                name="mobileNumber"
                onChange={formik.handleChange}
                placeholder='mobile number'
                value={formik.values.mobileNumber}
                className="shadow appearance-none border  py-4 w-full px-3 event-form-input "
              />
              {formik.errors.mobileNumber && formik.touched.mobileNumber && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.mobileNumber}
                </div>
              )}
            </div>

            {/* Place of Residence */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-400  text-base font-bold mb-2">
                Place of Residence
                <span className=' text-secondary-dark ml-3'>*</span>

              </label>
              <input
                type="text"
                name="placeOfResidence"
                onChange={formik.handleChange}
                placeholder='place of residence'
                value={formik.values.placeOfResidence}
                className="shadow appearance-none border  py-4 w-full px-3 event-form-input "
              />
              {formik.errors.placeOfResidence && formik.touched.placeOfResidence && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.placeOfResidence}
                </div>
              )}
            </div>

            {/* State of Origin */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-400  text-base font-bold mb-2">
                State of Origin
                <span className=' text-secondary-dark ml-3'>*</span>

              </label>
              <input
                type="text"
                name="state"
                onChange={formik.handleChange}
                placeholder='state of origin'
                value={formik.values.state}
                className="shadow appearance-none border  py-4 w-full px-3 event-form-input "
              />
              {formik.errors.state && formik.touched.state && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.state}
                </div>
              )}
            </div>

            {/* Social Media Platform */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-400  text-base font-bold mb-2">
                Most Active/Frequently Used Social Media Platform Link
                <span className=' text-secondary-dark ml-3'>*</span>
              </label>
              <input
                type="text"
                name="platformLink"
                onChange={formik.handleChange}
                placeholder='social media platform link'
                value={formik.values.platformLink}
                className="shadow appearance-none border  py-4 w-full px-3 event-form-input "
              />
              {formik.errors.platformLink && formik.touched.platformLink && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.platformLink}
                </div>
              )}
            </div>

            {/* Social Media Handle */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-400  text-base font-bold mb-2">
                Social Media
                <span className=' text-secondary-dark ml-3'>*</span>

              </label>
              <input
                type="text"
                name="socialMediaHandle"
                onChange={formik.handleChange}
                placeholder='social media handle'
                value={formik.values.socialMediaHandle}
                className="shadow appearance-none border  py-4 w-full px-3 event-form-input "
              />
              {formik.errors.socialMediaHandle && formik.touched.socialMediaHandle && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.socialMediaHandle}
                </div>
              )}
            </div>

            {/* How Did You Find Out */}
            <div className="mb-4">
              <label className="block text-gray-700  text-base font-bold mb-2 dark:text-gray-200">
                How did you find out about Másòyìnbó?
                <span className=' text-secondary-dark ml-3'>*</span>
              </label>
              <div className="flex flex-col">
                {options.map((option: Option) => (
                  <label key={option.value} className="flex items-center font-semibold text-base lead mt-3 dark:text-gray-400">
                    <input
                      type="checkbox"
                      name="source"
                      value={option.value}
                      onChange={handleCheckboxChange}
                      placeholder='how did you find out'
                      checked={formik.values.source.includes(option.value)}
                      className="mr-2 event-form-input "
                    />
                    {option.label}
                  </label>
                ))}
                {formik.errors.source && formik.touched.source && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.source}
                  </div>
                )}
              </div>
            </div>

            {/* Rules Agreement */}
            <div className="mb-4">
              <h1 className='block text-gray-700  text-base font-bold mb-2 dark:text-gray-200'>Rules of Másòyìnbó:</h1>
              <p className=' font-semibold text-base lead mt-3 dark:text-gray-400'>
                1. You are prohibited to code-mix or speak other languages aside from Yoruba throughout the duration of the programme. Failure to adhere will lead to the deduction of your earnings.
              </p>
              <p className=' font-semibold text-base lead mt-3 dark:text-gray-400'>
                2. It is required that all 10 questions are answered correctly to have the potential of earning up to N1,000,000.
              </p>
              <p className=' font-semibold text-base lead mt-3 dark:text-gray-400'>
                3. If you are selected, please come onto the programme in colourful native attire, as we will not allow standard dressing - we are keen to conserve and promote our Yoruba culture.
              </p>
              <p className='font-semibold text-base lead mt-3 dark:text-gray-400'>
                4. You are expected and encouraged to know your Yoruba numbers; if not, it may impact your potential earnings.
              </p>
              <div className='flex items-center  mt-6'>
                <input
                  type="checkbox"
                  name="rulesAgreement"
                  onChange={formik.handleChange}
                  checked={formik.values.rulesAgreement}
                  className="mr-2"
                />
                <label className="block text-gray-700 dark:text-gray-200  text-base font-bold">
                  Yes, I Understand
                </label>
                {formik.errors.rulesAgreement && formik.touched.rulesAgreement && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.rulesAgreement}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Comments */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200  text-base font-bold mb-2">
                Any further comments/questions?
              </label>
              <textarea
                name="comment"
                onChange={formik.handleChange}
                value={formik.values.comment}
                className="shadow appearance-none border  py-4 w-full px-3 event-form-input "
                placeholder='Your answer'
              />
              {formik.errors.comment && formik.touched.comment && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.comment}
                </div>
              )}
            </div>
            <div className=' flex justify-end'>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-light text-white font-bold px-4  py-4 focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ParticipationForm;