const FypSubmission = require('../Models/FypSubmission');
const Adviser = require('../Models/adviser');
const StudentDetail = require('../Models/studentDetail');

const getAllFypSubmissions = async (req, res) => {
  try {
    // 1. Fetch all FYP submissions and populate student basic info
    const submissions = await FypSubmission.find().populate("studentId", "name email");

    // 2. Enhance each submission with adviser info and student registration info
    const submissionsWithDetails = await Promise.all(
      submissions.map(async (submission) => {
        // Adviser (check if any group member has reserved slot)
        const adviser = await Adviser.findOne({
          slots: {
            $elemMatch: {
              $or: [
                { "reservedBy.reg1": { $in: submission.groupMembers } },
                { "reservedBy.reg2": { $in: submission.groupMembers } }
              ]
            }
          }
        });

        const adviserInfo = adviser
          ? {
              name: adviser.name,
              email: adviser.email,
              specialization: adviser.specialization,
            }
          : null;

        // Student Detail Info (registrationNumber, dept, year, batch)
        let studentDetail = null;
        if (submission.studentId?._id) {
          studentDetail = await StudentDetail.findOne({ userId: submission.studentId._id }).lean();
        }

        return {
          ...submission.toObject(),
          adviser: adviserInfo,
          studentInfo: studentDetail
            ? {
                registrationNumber: studentDetail.registrationNumber,
                department: studentDetail.department,
                year: studentDetail.year,
                batch: studentDetail.batch
              }
            : null
        };
      })
    );

    res.status(200).json({ success: true, data: submissionsWithDetails });
  } catch (error) {
    console.error("Error fetching all FYPs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch FYPs" });
  }
};

const getStudentFyp = async (req, res) => {
  try {
    const { studentIdOrReg } = req.params;

    // Step 1: Find student's registration number using the provided user _id
    const studentDetail = await StudentDetail.findOne({ userId: studentIdOrReg });

    if (!studentDetail) {
      return res.status(404).json({ success: false, message: "Student detail not found." });
    }

    const regNumber = studentDetail.registrationNumber;

    // Step 2: Fetch all FYPs where the student is owner or in group members
    const submissions = await FypSubmission.find({
      $or: [
        { studentId: studentIdOrReg },
        { groupMembers: { $in: [regNumber] } }
      ]
    }).populate("studentId", "name email");

    // Step 3: Attach adviser info for each submission
    const submissionsWithAdviser = await Promise.all(
      submissions.map(async (submission) => {
        const adviser = await Adviser.findOne({
          slots: {
            $elemMatch: {
              $or: [
                { "reservedBy.reg1": { $in: submission.groupMembers } },
                { "reservedBy.reg2": { $in: submission.groupMembers } }
              ]
            }
          }
        });

        const adviserInfo = adviser
          ? {
              name: adviser.name,
              email: adviser.email,
              specialization: adviser.specialization
            }
          : null;

        return {
          ...submission.toObject(),
          adviser: adviserInfo
        };
      })
    );

    // Step 4: Return to frontend
    res.status(200).json({
      success: true,
      data: submissionsWithAdviser
    });

  } catch (error) {
    console.error("Error fetching student's FYPs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch student's FYPs" });
  }
};
const getFilteredFyps = async (req, res) => {
  try {
    const { department, year } = req.query;
   console.log("Filtering FYPs for department:", department, "and year:", year);
   
    if (!department || !year) {
      return res.status(400).json({ success: false, message: "Department and year are required" });
    }

    const students = await StudentDetail.find({ department, year });
    const studentUserIds = students.map((s) => s.userId);

    const submissions = await FypSubmission.find({
      studentId: { $in: studentUserIds },
    }).populate("studentId", "name email");

    const enhanced = await Promise.all(
      submissions.map(async (submission) => {
        const adviser = await Adviser.findOne({
          slots: {
            $elemMatch: {
              $or: [
                { "reservedBy.reg1": { $in: submission.groupMembers } },
                { "reservedBy.reg2": { $in: submission.groupMembers } }
              ]
            }
          }
        });

        return {
          ...submission.toObject(),
          adviser: adviser
            ? {
                name: adviser.name,
                email: adviser.email,
                specialization: adviser.specialization,
              }
            : null,
        };
      })
    );

    res.status(200).json({ success: true, data: enhanced });
  } catch (error) {
    console.error("Error filtering FYPs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




module.exports = {
  getAllFypSubmissions,getStudentFyp,getFilteredFyps
};
