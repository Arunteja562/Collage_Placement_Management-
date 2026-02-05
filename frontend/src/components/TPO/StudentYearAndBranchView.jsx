import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import StudentTable from './StudentTableTemplate';
import { BASE_URL } from '../../config/backend_url';
import AccordionPlaceholder from '../AccordionPlaceholder';

function StudentYearAndBranchView() {
  document.title = 'Aurora | All Students';

  const [loading, setLoading] = useState(true);

  const [firstYearComputer, setFirstYearComputer] = useState([]);
  const [firstYearCivil, setFirstYearCivil] = useState([]);
  const [firstYearMechanical, setFirstYearMechanical] = useState([]);
  const [firstYearAIDS, setFirstYearAIDS] = useState([]);
  const [firstYearECS, setFirstYearECS] = useState([]);
  const [secondYearComputer, setSecondYearComputer] = useState([]);
  const [secondYearCivil, setSecondYearCivil] = useState([]);
  const [secondYearMechanical, setSecondYearMechanical] = useState([]);
  const [secondYearECS, setSecondYearECS] = useState([]);
  const [secondYearAIDS, setSecondYearAIDS] = useState([]);
  const [thirdYearComputer, setThirdYearComputer] = useState([]);
  const [thirdYearCivil, setThirdYearCivil] = useState([]);
  const [thirdYearMechanical, setThirdYearMechanical] = useState([]);
  const [thirdYearECS, setThirdYearECS] = useState([]);
  const [thirdYearAIDS, setThirdYearAIDS] = useState([]);
  const [fourthYearComputer, setFourthYearComputer] = useState([]);
  const [fourthYearCivil, setFourthYearCivil] = useState([]);
  const [fourthYearMechanical, setFourthYearMechanical] = useState([]);
  const [fourthYearECS, setFourthYearECS] = useState([]);
  const [fourthYearAIDS, setFourthYearAIDS] = useState([]);

  const fetchStudentsData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/student/all-students-data-year-and-branch`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setFirstYearComputer(response.data.firstYearComputer);
      setFirstYearCivil(response.data.firstYearCivil);
      setFirstYearMechanical(response.data.firstYearMechanical);
      setFirstYearECS(response.data.firstYearECS);
      setFirstYearAIDS(response.data.firstYearAIDS);

      setSecondYearComputer(response.data.secondYearComputer);
      setSecondYearCivil(response.data.secondYearCivil);
      setSecondYearMechanical(response.data.secondYearMechanical);
      setSecondYearECS(response.data.secondYearECS);
      setSecondYearAIDS(response.data.secondYearAIDS);

      setThirdYearComputer(response.data.thirdYearComputer);
      setThirdYearCivil(response.data.thirdYearCivil);
      setThirdYearMechanical(response.data.thirdYearMechanical);
      setThirdYearECS(response.data.thirdYearECS);
      setThirdYearAIDS(response.data.thirdYearAIDS);

      setFourthYearComputer(response.data.fourthYearComputer);
      setFourthYearCivil(response.data.fourthYearCivil);
      setFourthYearMechanical(response.data.fourthYearMechanical);
      setFourthYearECS(response.data.fourthYearECS);
      setFourthYearAIDS(response.data.fourthYearAIDS);

      // setLoading(false);
    } catch (error) {
      console.log("Error fetching jobs ", error);
      // if (error?.response?.data?.msg) {
      // setToastMessage(error.response.data.msg);
      // setShowToast(true);
      // }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudentsData();
  }, []);

  return (
    <>
      {
        loading ? (
          // <div className="flex justify-center h-72 items-center">
          //   <i className="fa-solid fa-spinner fa-spin text-3xl" />
          // </div>
          <AccordionPlaceholder />
        ) : (
          <>
            <div className="my-4 max-md:p-2 md:p-6 overflow-auto">
              <div className="">
                {/* parent accordion for year of student  */}
                <Accordion defaultActiveKey={['1']} flush className='flex flex-col gap-4'>
                  <Accordion.Item eventKey="1" className='backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400'>
                    {/* 4th year  */}
                    <Accordion.Header>Fourth Term</Accordion.Header>
                    <Accordion.Body>
                      <Accordion flush defaultActiveKey={['Computer']} className='flex flex-col gap-2'>
                        <StudentTable branchName={"MCA"} studentData={fourthYearMCA} />
                        <StudentTable branchName={"B-Tech"} studentData={fourthYearB-Tech} />
                        <StudentTable branchName={"MBA"} studentData={fourthYearMBA} />
                        <StudentTable branchName={"BCA"} studentData={fourthYearBCA} />
                        <StudentTable branchName={"Other"} studentData={fourthYearOther} />
                      </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2" className='backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400'>
                    {/* 3rd year  */}
                    <Accordion.Header>Third Term</Accordion.Header>
                    <Accordion.Body>
                      <Accordion flush defaultActiveKey={['Computer']} className='flex flex-col gap-2'>
                        <StudentTable branchName={"MCA"} studentData={thirdYearMCA} />
                        <StudentTable branchName={"B-Tech"} studentData={thirdYearB-Tech} />
                        <StudentTable branchName={"MBA"} studentData={thirdYearMBA} />
                        <StudentTable branchName={"BCA"} studentData={thirdYearBCA} />
                        <StudentTable branchName={"Other"} studentData={thirdYearOther} />
                      </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3" className='backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400'>
                    {/* 2nd year  */}
                    <Accordion.Header>Second Term</Accordion.Header>
                    <Accordion.Body>
                      <Accordion flush defaultActiveKey={['Computer']} className='flex flex-col gap-2'>
                        <StudentTable branchName={"MCA"} studentData={secondYearMCA} />
                        <StudentTable branchName={"B-Tech"} studentData={secondYearB-Tech} />
                        <StudentTable branchName={"MBA"} studentData={secondYearMBA} />
                        <StudentTable branchName={"BCA"} studentData={secondYearBCA} />
                        <StudentTable branchName={"Other"} studentData={secondYearOther} />
                      </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4" className='backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400'>
                    {/* 1st year  */}
                    <Accordion.Header>First Term</Accordion.Header>
                    <Accordion.Body>
                      <Accordion flush defaultActiveKey={['Computer']} className='flex flex-col gap-2'>
                        <StudentTable branchName={"MCA"} studentData={firstYearMCA} />
                        <StudentTable branchName={"B-Tech"} studentData={firstYearB-Tech} />
                        <StudentTable branchName={"MBA"} studentData={firstYearMBA} />
                        <StudentTable branchName={"BCA"} studentData={firstYearBCA} />
                        <StudentTable branchName={"Other"} studentData={firstYearOther} />
                      </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>


                </Accordion>
              </div>


            </div >
          </>
        )
      }
    </>
  )
}

export default StudentYearAndBranchView
