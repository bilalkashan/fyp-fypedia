const Adviser = require("../Models/adviser");
const Teacher = require("../Models/teacherDetail"); 
const UserModel = require("../Models/user");
const StudentDetail = require('../Models/studentDetail'); 
const adviser = require("../Models/adviser");

const addAdviser = async (req, res) => {
    const { name, email, specialization } = req.body;

    try {
        if (!name || !email || !specialization) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }

        const existingAdviser = await Adviser.findOne({ email });
        if (existingAdviser) {
            return res.status(400).json({ message: "Adviser with this email already exists", success: false });
        }

        const teacher = await UserModel.findOne({ email });
        if (!teacher || teacher.role !== "teacher") {
            return res.status(404).json({ message: "No teacher found with this email", success: false });
        }

        const defaultSlots = [
            { slotName: "Slot-I", status: "unavailable" },
            { slotName: "Slot-II", status: "unavailable" },
            { slotName: "Slot-III", status: "unavailable" },
            { slotName: "Slot-IV", status: "unavailable" }
        ];

        const adviser = new Adviser({
            name,
            email,
            specialization,
            teacherId: teacher._id,
            slots: defaultSlots
        });

        await adviser.save();

        res.status(201).json({ message: "Adviser added successfully", adviser, success: true });

    } catch (error) {
        console.error("Error adding adviser:", error);
        res.status(500).json({ message: "Error adding adviser", error });
    }
};


const updateSlots = async (req, res) => {
    try {
        const { adviserId, slotIndex } = req.params;
        const { status, reg1, reg2 } = req.body;

        // If reserving a slot, validate registration numbers
        if (status === "reserved") {
            if (!reg1 || !reg2) {
                return res.status(400).json({ success: false, message: "Both registration numbers are required." });
            }

            if (reg1 === reg2) {
                return res.status(400).json({ success: false, message: "Registration numbers must be different." });
            }

            // Check if both students exist
            const student1 = await StudentDetail.findOne({ registrationNumber: reg1 });
            const student2 = await StudentDetail.findOne({ registrationNumber: reg2 });

            if (!student1 || !student2) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Registration number${!student1 ? ` ${reg1}` : ''}${!student1 && !student2 ? ' and' : ''}${!student2 ? ` ${reg2}` : ''} not found in student records.` 
                });
            }

            // Check if already reserved with any adviser
            const advisers = await Adviser.find();
            for (let adviser of advisers) {
                for (let slot of adviser.slots) {
                    if (
                        slot.status === "reserved" &&
                        (slot.reservedBy?.reg1 === reg1 || slot.reservedBy?.reg2 === reg1 ||
                         slot.reservedBy?.reg1 === reg2 || slot.reservedBy?.reg2 === reg2)
                    ) {
                        const alreadyUsedReg = 
                            slot.reservedBy?.reg1 === reg1 || slot.reservedBy?.reg2 === reg1 ? reg1 : reg2;

                        return res.status(400).json({
                            success: false,
                            message: `Registration number ${alreadyUsedReg} is already reserved with another adviser.`
                        });
                    }
                }
            }
        }

        // Find adviser
        const adviser = await Adviser.findById(adviserId);
        if (!adviser) {
            return res.status(404).json({ success: false, message: "Adviser not found." });
        }

        // Update slot
        adviser.slots[slotIndex].status = status;
        adviser.slots[slotIndex].reservedBy = status === "reserved" ? { reg1, reg2 } : { reg1: null, reg2: null };

        await adviser.save();
        res.json({ success: true, message: "Slot updated successfully." });

    } catch (error) {
        console.error("Slot update error:", error);
        res.status(500).json({ success: false, message: "Internal server error during slot update." });
    }
};





const getAllAdvisers = async (req, res) => {
    try {
      const role = req.headers.role;
      const email = req.headers.email; // get email from header now
  
      let advisers;
      if (role === "teacher") {
        advisers = await Adviser.find({ email: email }); // Match by email
      } else {
        advisers = await Adviser.find(); // Admin sees all
      }
  
      res.status(200).json(advisers);
    } catch (error) {
      console.error("Error fetching advisers:", error);
      res.status(500).json({ message: "Error fetching advisers", success: false });
    }
  };
  
  

const deleteAdviser = async (req, res) => {
    const { id } = req.body;

    try {
        const adviser = await Adviser.findById(id);
        if (!adviser) {
            return res.status(404).json({ message: "Adviser not found" });
        }

        await Adviser.deleteOne({ _id: id });
        res.status(200).json({ message: "Adviser deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete adviser", error });
    }
};

module.exports = { addAdviser, updateSlots, getAllAdvisers, deleteAdviser };
