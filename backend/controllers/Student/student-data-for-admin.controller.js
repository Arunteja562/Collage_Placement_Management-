const User = require("../../models/user.model");
const Job = require("../../models/job.model");


const StudentDataYearBranchWise = async (req, res) => {
  try {
    // first year 
    const firstYearMCA = await User.find({ role: "student", "studentProfile.department": "MCA", "studentProfile.year": 1 });
    const firstYearBtech = await User.find({ role: "student", "studentProfile.department": "B-Tech", "studentProfile.year": 1 });
    const firstYearMBA = await User.find({ role: "student", "studentProfile.department": "MBA", "studentProfile.year": 1 });
    const firstYearBCA = await User.find({ role: "student", "studentProfile.department": "BCA", "studentProfile.year": 1 });
    const firstYearOther = await User.find({ role: "student", "studentProfile.department": "Other", "studentProfile.year": 1 });

    // second year 
    const secondYearMCA = await User.find({ role: "student", "studentProfile.department": "MCA", "studentProfile.year": 2 });
    const secondYearBtech = await User.find({ role: "student", "studentProfile.department": "B-Tech", "studentProfile.year": 2 });
    const secondYearMBA = await User.find({ role: "student", "studentProfile.department": "MBA", "studentProfile.year": 2 });
    const secondYearBCA = await User.find({ role: "student", "studentProfile.department": "BCA", "studentProfile.year": 2 });
    const secondYearOther = await User.find({ role: "student", "studentProfile.department": "Other", "studentProfile.year": 2 });

    // third year 
    const thirdYearMCA = await User.find({ role: "student", "studentProfile.department": "MCA", "studentProfile.year": 3 });
    const thirdYearBtech = await User.find({ role: "student", "studentProfile.department": "B-Tech", "studentProfile.year": 3 });
    const thirdYearMBA = await User.find({ role: "student", "studentProfile.department": "MBA", "studentProfile.year": 3 });
    const thirdYearBCA = await User.find({ role: "student", "studentProfile.department": "BCA", "studentProfile.year": 3 });
    const thirdYearOther = await User.find({ role: "student", "studentProfile.department": "Other", "studentProfile.year": 3 });

    // fourth year 
    const fourthYearMCA = await User.find({ role: "student", "studentProfile.department": "MCA", "studentProfile.year": 4 });
    const fourthYearBtech = await User.find({ role: "student", "studentProfile.department": "B-Tech", "studentProfile.year": 4 });
    const fourthYearMBA = await User.find({ role: "student", "studentProfile.department": "MBA", "studentProfile.year": 4 });
    const fourthYearBCA = await User.find({ role: "student", "studentProfile.department": "BCA", "studentProfile.year": 4 });
    const fourthYearOther = await User.find({ role: "student", "studentProfile.department": "Other", "studentProfile.year": 4 });

    return res.json({ firstYearComputer, firstYearMCA, firstYearMBA, firstYearBtech, firstYearDegree, secondYearComputer, secondYearMCA, secondYearMBA, secondYearBtech, secondYearDgree, thirdYearComputer, thirdYearMCA, thirdYearMBA, thirdYearBtech, thirdYearDegree, fourthYearComputer, fourthYearMCA, fourthYearMBA, fourthYearBtech, fourthYearDegree });
  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

const NotifyStudentStatus = async (req, res) => {
  try {
    const filteredStudents = await User.find({
      role: 'student',
      'studentProfile.appliedJobs.status': { $in: ['interview', 'hired'] }
    })
      .select('_id first_name last_name studentProfile.year studentProfile.department studentProfile.appliedJobs')
      .lean();

    const studentsWithJobDetails = [];

    for (const student of filteredStudents) {
      // Filter applied jobs with status 'interview' or 'hired'
      const appliedJobs = student.studentProfile.appliedJobs.filter(job => ['interview', 'hired'].includes(job.status));

      // Fetch job details for each jobId in the applied jobs
      const jobDetails = await Job.find({
        _id: { $in: appliedJobs.map(job => job.jobId) } // Match the job IDs
      })
        .populate('company', 'companyName')
        .select('company jobTitle _id') // Select company name and job title
        .lean();

      // Map through filtered applied jobs and add the job details (company and title)
      const jobsWithDetails = appliedJobs.map(job => {
        const jobDetail = jobDetails.find(jd => String(jd._id) === String(job.jobId)); // Match jobId
        return {
          status: job.status,
          companyName: jobDetail?.company?.companyName || 'Unknown Company',
          jobId: jobDetail?._id || 'Unknown JobId',
          jobTitle: jobDetail?.jobTitle || 'Unknown Job Title'
        };
      });

      // Push the student info along with only the filtered job details into the final array
      studentsWithJobDetails.push({
        _id: student._id,
        name: `${student.first_name} ${student.last_name}`,
        year: student.studentProfile.year,
        department: student.studentProfile.department,
        jobs: jobsWithDetails // Only the filtered jobs with status 'interview' or 'hired'
      });
    }
    return res.status(200).json({ studentsWithJobDetails });
  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}
module.exports = {
  StudentDataYearBranchWise,
  NotifyStudentStatus
};