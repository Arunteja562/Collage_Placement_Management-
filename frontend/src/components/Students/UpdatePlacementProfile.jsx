import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Toast from '../Toast';
import UploadResume from './UploadResume';
import { BASE_URL } from '../../config/backend_url';


function UpdatePlacementProfile() {
  document.title = 'Aurora | Placement Profile';

  // userData to store user data get from userId
  const [userData, setUserData] = useState(null);


  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


  const fetchCurrentUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/user/detail`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setUserData(response.data);
      // console.log(userData);
      // console.log("resss", response.data);

      setLoading(false);
    } catch (error) {
      console.log("Account.jsx => ", error);
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchCurrentUserData();
    calcCGPA();
  }, [loading]);

  // console.log(userData)

  const handleDataChangeForSGPA = (e) => {
    setUserData({
      ...userData,
      studentProfile: {
        ...userData?.studentProfile,
        SGPA: {
          ...userData?.studentProfile?.SGPA,
          [e.target.name]: e.target.value
        }
      }
    });
    calcCGPA();
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`${BASE_URL}/user/update-profile`,
        // for sending to backend is user is completing profile
        userData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      // console.log(response.data);
      if (response.data) {
        if (response.data.msg) {
          setToastMessage(response.data.msg);
          setShowToast(true);
        }
        //   navigate("../student/dashboard");
      }
    } catch (error) {
      console.log("UserDetails => ", error);
    }
  }

  // console.log(userData);

  const [cgpa, setCgpa] = useState(0);

  const calcCGPA = () => {
    let sum = 0, sem = 0;
    if (userData?.studentProfile?.CGPA?.Term1 !== '0' || 0) {
      sum += Number(userData?.studentProfile?.CGPA?.Term1);
      term += 1;
    }
    if (userData?.studentProfile?.SGPA?.Term2 !== '0' || 0) {
      sum += Number(userData?.studentProfile?.CGPA?.Term2);
      term += 1;
    }
    if (userData?.studentProfile?.SGPA?.Term3 !== '0' || 0) {
      sum += Number(userData?.studentProfile?.CGPA?.Term3);
      term += 1;
    }
    if (userData?.studentProfile?.SGPA?.Term4 !== '0' || 0) {
      sum += Number(userData?.studentProfile?.CGPA?.Term4);
      term += 1;
    }
    if (userData?.studentProfile?.SGPA?.Term5 !== '0' || 0) {
      sum += Number(userData?.studentProfile?.CGPA?.Term5);
      term += 1;
    }
    if (userData?.studentProfile?.SGPA?.Term6 !== '0' || 0) {
      sum += Number(userData?.studentProfile?.CGPA?.Term6);
      term += 1;
    }
    if (userData?.studentProfile?.SGPA?.Term7 !== '0' || 0) {
      sum += Number(userData?.studentProfile?.CGPA?.Term7);
      term += 1;
    }
    if (userData?.studentProfile?.SGPA?.Term8 !== '0' || 0) {
      sum += Number(userData?.studentProfile?.CGPA?.Term8);
      term += 1;
    }
    setCgpa((sum / sem).toFixed(2));
  }

  return (
    <>
      {
        loading ? (
          <div className="flex justify-center h-72 items-center">
            <i className="fa-solid fa-spinner fa-spin text-3xl" />
          </div>
        ) : (
          <>
            {/*  any message here  */}
            < Toast
              show={showToast}
              onClose={() => setShowToast(false)}
              message={toastMessage}
              delay={3000}
              position="bottom-end"
            />


            <div className=''>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 my-4 text-base max-sm:text-sm">
                  {/* basic info  */}
                  <div className="grid backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6 max-md:col-span-2">
                    <span className='text-2xl max-sm:text-xl'>Basic Details</span>
                    <div className="flex flex-col justify-between py-2">
                      {/* Basic Info */}
                      <div className="flex justify-between">
                        <div className="space-y-4">
                          <div>
                            <span className="text-gray-700 font-bold">Full Name: </span>
                            <span className="text-gray-800">
                              {userData?.first_name + " "}
                              {userData?.middle_name && userData?.middle_name + " "}
                              {userData?.last_name}
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-700 font-bold">Email: </span>
                            <span className="text-gray-800">
                              {userData?.email}
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-700 font-bold">Number: </span>
                            <span className="text-gray-800">
                              {userData?.number}
                            </span>
                          </div>

                          {userData?.studentProfile?.uin && (
                            <div>
                              <span className="text-gray-700 font-bold">UIN: </span>
                              <span className="text-gray-800">
                                {userData?.studentProfile?.uin}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Profile Picture */}
                        <Col xs={5} md={4} className="flex justify-end items-start rounded">
                          <Image src={userData?.profile} thumbnail />
                        </Col>
                      </div>
                      <div className="flex items-center">
                        {/* resume upload  */}
                        <UploadResume fetchCurrentUserData={fetchCurrentUserData} /> {/* passing function to update userData */}
                        {(userData?.studentProfile?.resume !== "undefined") && (
                          <div className="py-2 px-2">
                            <span className='bg-blue-500 py-1 pr-2 rounded cursor-pointer hover:bg-blue-700'>
                              <a href={userData?.studentProfile?.resume} target='_blanck' className='no-underline text-white'>
                                <i className="fa-regular fa-eye px-2" />
                                View Resume
                              </a>
                            </span>
                            <p className='text-sm text-gray-500 mt-1'>{userData?.studentProfile?.resume?.filename}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* college info  */}
                  <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6 max-md:col-span-2">
                    <span className='text-2xl max-sm:text-xl'>College Information</span>
                    <div className="grid grid-cols-2">
                      {/* semester sgpa  */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className=" py-3 flex flex-wrap gap-2">
                          <FloatingLabel controlId="floatingTerm1" label="Term 1">
                            <Form.Control
                              type="number"
                              placeholder="Term 1"
                              name='Term1'
                              step="0.01"
                              value={userData?.studentProfile?.CGPA?.Term1}
                              onChange={handleDataChangeForSGPA}
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingTerm2" label="Term 2">
                            <Form.Control
                              type="number"
                              placeholder="Term 2"
                              name='Term2'
                              step="0.01"
                              value={userData?.studentProfile?.CGPA?.Term2}
                              onChange={handleDataChangeForSGPA}
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingTerm3" label="Term 3">
                            <Form.Control
                              type="number"
                              placeholder="Term 3"
                              name='Term3'
                              step="0.01"
                              value={userData?.studentProfile?.CGPA?.Term3}
                              onChange={handleDataChangeForSGPA}
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingSem4" label="Term 4">
                            <Form.Control
                              type="number"
                              placeholder="Term 4"
                              name='Term4'
                              step="0.01"
                              value={userData?.studentProfile?.CGPA?.Term4}
                              onChange={handleDataChangeForSGPA}
                            />
                          </FloatingLabel>
                        </div>
                        <div className=" py-3 flex flex-wrap gap-2">
                          <FloatingLabel controlId="floatingTerm5" label="Term 5">
                            <Form.Control
                              type="number"
                              placeholder="Term 5"
                              name='Term5'
                              step="0.01"
                              value={userData?.studentProfile?.CGPA?.Term5}
                              onChange={handleDataChangeForSGPA}
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingTerm6" label="Term6">
                            <Form.Control
                              type="number"
                              placeholder="Term 6"
                              name='Term6'
                              step="0.01"
                              value={userData?.studentProfile?.SGPA?.Term6}
                              onChange={handleDataChangeForSGPA}
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingTerm7" label="Term 7">
                            <Form.Control
                              type="number"
                              placeholder="Term 7"
                              name='Term7'
                              step="0.01"
                              value={userData?.studentProfile?.SGPA?.Term7}
                              onChange={handleDataChangeForSGPA}
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingTerm8" label="Term 8">
                            <Form.Control
                              type="number"
                              placeholder="Term 8"
                              name='Term8'
                              step="0.01"
                              value={userData?.studentProfile?.SGPA?.Term8}
                              onChange={handleDataChangeForSGPA}
                            />
                          </FloatingLabel>
                        </div>
                      </div>

                      {/* current year, live kt and any gap  */}
                      <div className="px-2 py-3 flex flex-col gap-3">
                        <FloatingLabel controlId="floatingSelectYear" label="Current Year">
                          <Form.Select
                            aria-label="Floating label select year"
                            className='cursor-pointer'
                            name='year'
                            value={userData?.studentProfile?.year || "undefined"}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  year: e.target.value
                                }
                              });
                            }}
                          >
                            <option disabled value="undefined" className='text-gray-400'>Enter Current Year</option>
                            <option value="1">1st</option>
                            <option value="2">2nd</option>
                            <option value="1">3rd</option>
                            <option value="2">4th</option>
                
                          </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingLiveKT" label="Live KT's">
                          <Form.Control
                            type="number"
                            placeholder="Live KT's"
                            name='liveKT'
                            value={userData?.studentProfile?.liveKT || 0}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  liveKT: e.target.value
                                }
                              });
                            }}
                          />
                        </FloatingLabel>
                        <Form.Check
                          type="switch"
                          id="gap"
                          checked={userData?.studentProfile?.gap === "true" || userData?.studentProfile?.gap === true}
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              studentProfile: {
                                ...userData?.studentProfile,
                                gap: e.target.checked
                              }
                            });
                          }}
                          name='gap'
                          label="Any Gap"
                        />
                        {
                          cgpa !== "NaN" &&
                          <div className='mt-4 text-2xl text-green-500 font-bold'>
                            <span className=''>CGPA: </span>
                            <span className=''>
                              {cgpa}
                            </span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>

                  {/* past qualification  */}
                  <div className="col-span-2 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6">
                    <span className='text-2xl max-sm:text-xl'>Past Qualification</span>
                    <div className="grid grid-cols-3 max-sm:grid-cols-1">
                      <div className="px-2 py-3 flex flex-col gap-2">
                        <FloatingLabel controlId="floatingSelectSSC" label="SSC Board Name">
                          <Form.Select
                            aria-label="Floating label select SSCBoard"
                            className='cursor-pointer'
                            name='SSCBoard'
                            value={userData?.studentProfile?.pastQualification?.ssc?.board || "undefined"}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile?.pastQualification,
                                    ssc: {
                                      ...userData?.studentProfile?.pastQualification?.ssc,
                                      board: e.target.value
                                    }
                                  }
                                }
                              });
                            }}
                          >
                            <option disabled value="undefined" className='text-gray-400'>Enter Your SSC Board Name</option>
                            <option value="Telangana State Board of Secondary and Higher Secondary Education (TSBSHSE)">Telangana State Board of Secondary and Higher Education (TSBSHE)</option>
                            <option value="Andhra Pradesh State Board of Secondary and Higher Secondary Education (APSBSHSE)">Andhra Pradesh State Board of Secondary and Higher Education (APSBSHE)</option>
                            <option value="Central Board of Secondary Education (CBSE)">Central Board of Secondary Education (CBSE)</option>
                            <option value="Council for the Indian School Certificate Examinations (CISCE)">Council for the Indian School Certificate Examinations (CISCE)</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingSSCMarks" label="SSC Percentage">
                          <Form.Control
                            type="number"
                            placeholder="SSC Percentage"
                            name='sscPercentage'
                            value={userData?.studentProfile?.pastQualification?.ssc?.percentage}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile?.pastQualification,
                                    ssc: {
                                      ...userData?.studentProfile?.pastQualification?.ssc,
                                      percentage: e.target.value
                                    }
                                  }
                                }
                              });
                            }}
                          />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingSelectSSCPassingYear" label="SSC Passing Year">
                          <Form.Control
                            type="number"
                            placeholder="SSC Passing Year"
                            name='sscPassingYear'
                            value={userData?.studentProfile?.pastQualification?.ssc?.year}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile?.pastQualification,
                                    ssc: {
                                      ...userData?.studentProfile?.pastQualification?.ssc,
                                      year: e.target.value
                                    }
                                  }
                                }
                              });
                            }}
                          />
                        </FloatingLabel>
                      </div>

                      <div className="px-2 py-3 flex flex-col gap-2">
                        <FloatingLabel controlId="floatingSelectHSC" label="Intermediate Board Name">
                          <Form.Select
                            aria-label="Floating label select Intermediate Board"
                            className='cursor-pointer'
                            name='UniversityBoard'
                            value={userData?.studentProfile?.pastQualification?.hsc?.board || "undefined"}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile?.pastQualification,
                                    hsc: {
                                      ...userData?.studentProfile?.pastQualification?.hsc,
                                      board: e.target.value
                                    }
                                  }
                                }
                              });
                            }}
                          >
                            <option disabled value="undefined" className='text-gray-400'>Enter Your Intermediate Board Name</option>
                            <option value="Telanagana State Board of Intermediate and Higher Education (TSBSHE)">Telanagana State Board of Secondary and Higher Education (TSBSHSE)</option>
                            <option value="Andhra Pradesh State Board of Intermediate and Higher Education (APSBSHE)">Andhra Pradesh State Board of Secondary and Higher Education (APBSHSE)</option>
                            <option value="Central Board of Secondary Education (CBSE)">Central Board of Secondary Education (CBSE)</option>
                            <option value="Council for the Indian School Certificate Examinations (CISCE)">Council for the Indian School Certificate Examinations (CISCE)</option>
                            
                            <option value="Other">Other</option>
                          </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInterMarks" label="Inter Percentage">
                          <Form.Control
                            type="number"
                            placeholder="Inter Percentage"
                            name='hscPercentage'
                            value={userData?.studentProfile?.pastQualification?.hsc?.percentage || ""}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile?.pastQualification,
                                    hsc: {
                                      ...userData?.studentProfile?.pastQualification?.hsc,
                                      percentage: e.target.value
                                    }
                                  }
                                }
                              });
                            }}
                          />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingSelectHSCPassingYear" label="Inter Passing Year">
                          <Form.Control
                            type="number"
                            placeholder="Inter Passing Year"
                            name='sscPassingYear'
                            value={userData?.studentProfile?.pastQualification?.hsc?.year || ""}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile?.pastQualification,
                                    hsc: {
                                      ...userData?.studentProfile?.pastQualification?.hsc,
                                      year: e.target.value
                                    }
                                  }
                                }
                              });
                            }}
                          />
                        </FloatingLabel>
                      </div>

                      <div className="px-2 py-3 flex flex-col gap-2">
                        <FloatingLabel controlId="floatingSelectDiploma" label="University Name">
                          <Form.Select
                            aria-label="Floating label select University Board"
                            className='cursor-pointer'
                            name='IntermediateBoard'
                            value={userData?.studentProfile?.pastQualification?.diploma?.board || "undefined"}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile?.pastQualification,
                                    diploma: {
                                      ...userData?.studentProfile?.pastQualification?.diploma,
                                      board: e.target.value
                                    }
                                  }
                                }
                              });
                            }}
                          >
                            <option disabled value="undefined" className='text-gray-400'>Enter Your Degree University Name</option>
                            <option value="KU ">KU </option>
                            <option value="OU">OU</option>
                            <option value="SU">SU</option>
                            <option value="AU">AU</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingDiplomaMarks" label="Degree CGPA">
                          <Form.Control
                            type="number"
                            placeholder="Degree Percentage"
                            name='DegreePercentage'
                            value={userData?.studentProfile?.pastQualification?.diploma?.percentage || ""}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile?.pastQualification,
                                    diploma: {
                                      ...userData?.studentProfile?.pastQualification?.diploma,
                                      percentage: e.target.value
                                    }
                                  }
                                }
                              });
                            }}
                          />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingSelectDiplomaPassingYear" label="Degree Passing Year">
                          <Form.Control
                            type="number"
                            placeholder="Degree Passing Year"
                            name='DegreePassingYear'
                            value={userData?.studentProfile?.pastQualification?.diploma?.year || ""}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile?.pastQualification,
                                    diploma: {
                                      ...userData?.studentProfile?.pastQualification?.diploma,
                                      year: e.target.value
                                    }
                                  }
                                }
                              });
                            }}
                          />
                        </FloatingLabel>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-col justify-center items-center gap-2"
                  onMouseOver={(e) => {
                    e.target.querySelector('Button i').classList.add('fa-beat');
                  }}
                  onMouseLeave={(e) => {
                    e.target.querySelector('Button i').classList.remove('fa-beat');
                  }}
                >
                  <Button variant="primary" type='submit' size='lg'>
                    <i className="fa-regular fa-floppy-disk mr-2" />
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </>
        )
      }
    </>
  )
}
export default UpdatePlacementProfile
