const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5002;
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const { log, timeStamp } = require("console");
const { type } = require("os");

const db = "mongodb+srv://josephfrancizz001:HUaVG4h8HZhUJayp@cluster0.ftxc9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

//Multer Storage Config
const PATH = "./public/images/Images";
const upload = multer({
  storage: multer.diskStorage({
    destination: PATH,
    filename: function (req, file, cb) {
      let origialname = file.originalname;
      let ext = origialname.split(".").pop();
      let filename = origialname.split(".").slice(0, -1).join(".");
      cb(null, filename + "." + ext);
    },
  }),
});

app.listen(port, async () => {
  try {
    console.log(`Server is running at http://localhost:${port}`);
    await mongoose.connect(db);
    console.log("DB connection established");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});

//Admin Schema

const adminSchemaStucture = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const Admin = mongoose.model("admin", adminSchemaStucture);

// Admin Insert

app.post("/Admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // let admin = await Admin.findOne({ email })

    // if (admin) {
    //     return res
    //         .status(400)
    //         .json({ errors: [{ msg: 'Admin already exists' }] })
    // }

    let admin = new Admin({
      email,
      password,
    });

    await admin.save();

    res.json({ message: "Admin inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// select Admin

app.get("/Admin", async (req, res) => {
  const admin = await Admin.find();
  res.send({ admin });
});

// ************************************************************************************************************************************************

//Category Schema
const categorySchemaStructure = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("category", categorySchemaStructure);

//category
app.post("/Category", async (req, res) => {
  try {
    const { categoryname } = req.body;
    let category = new Category({
      categoryname,
    });
    await category.save();
    res.json({ message: "category inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/Category", async (req, res) => {
  try {
    const categorys = await Category.find();
    console.log("category is successfully retived", categorys);
    if (categorys.length !== 0) {
      res.json({ categorys });
    } else {
      res.json({ categorys: null });
    }
  } catch (error) {
    console.error("Error retrieving categoys:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/Category/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    const deleteCategory = await Category.findByIdAndDelete(Id);
    res.json({ message: "Category Deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ************************************************************************************************************************************************

//Course Schema
const courseSchemaStructure = new mongoose.Schema({
  coursename: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
});

const Course = mongoose.model("course", courseSchemaStructure);

//Course
app.post("/Course", async (req, res) => {
  console.log(req.body);
  const { coursename, categoryId } = req.body;
  try {
    let newCourse = new Course({
      coursename,
      categoryId,
    });

    await newCourse.save();
    res.json({ message: "Course inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//popoluate-course
app.get("/Course", async (req, res) => {
  try {
    const courses = await Course.find().populate("categoryId");
    console.log("successfully inserted", courses);
    if (courses.length !== 0) {
      res.json({ courses });
    } else {
      res.json({ courses: null });
    }
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/Course/:Id", async (req, res) => {
  try {
    const Id = req.params.Id;
    const deleteCourse = await Course.findOneAndDelete(Id);
    res.json({ message: "Course Deleted" });
  } catch (error) {
    console.error("Error deleteing Courses:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ************************************************************************************************************************************************

//Qualification Schema
const qualificationSchemaStructure = new mongoose.Schema({
  qualname: {
    type: String,
    required: true,
  },
});

const Qualification = mongoose.model(
  "qualification",
  qualificationSchemaStructure
);

//Qualification
app.post("/Qual", async (req, res) => {
  try {
    const { qualname } = req.body;
    let qualification = new Qualification({
      qualname,
    });
    await qualification.save();
    res.json({ message: "Qualification inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/Qual", async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    console.log("Qualification is successfully retived", qualifications);
    if (qualifications.length !== 0) {
      res.json({ qualifications });
    } else {
      res.json({ qualifications: null });
    }
  } catch (error) {
    console.error("Error retrieving qualification:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/Qual/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    const deleteQualifications = await Qualification.findByIdAndDelete(Id);
    res.json({ message: "Qualification Deleted" });
  } catch (error) {
    console.error("Error deleting qualification:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ************************************************************************************************************************************************

//District Schema
const districtSchemaStructure = new mongoose.Schema({
  districtname: {
    type: String,
    required: true,
  },
});
const District = mongoose.model("district", districtSchemaStructure);

//District
app.post("/District", async (req, res) => {
  try {
    console.log(req.body);
    //destructuring
    const { districtname } = req.body;
    let district = new District({
      districtname,
    });
    await district.save();
    res.json({ message: "district inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/District", async (req, res) => {
  try {
    const districts = await District.find();
    console.log("Places is successfully retived", districts);
    res.json({ districts });
  } catch (error) {
    console.error("Error retrieving places:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/District/:Id", async (req, res) => {
  try {
    const Id = req.params.Id;
    const deleteDistrict = await District.findByIdAndDelete(Id);
    res.json({ message: "District Deleted successfully", deleteDistrict });
  } catch (error) {
    console.error("Error deleteing Courses:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ************************************************************************************************************************************************

//place Schema
const placeSchemaStructure = new mongoose.Schema({
  placename: {
    type: String,
    required: true,
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "district",
    required: true,
  },
});
const Place = mongoose.model("place", placeSchemaStructure);

//place
app.post("/Place", async (req, res) => {
  console.log(req.body);
  const { placename, districtId } = req.body;
  try {
    let newPlace = new Place({
      placename,
      districtId,
    });

    await newPlace.save();
    res.json({ message: "Place inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/Place", async (req, res) => {
  try {
    const places = await Place.find().populate("districtId").exec();
    console.log("Places is successfully retived", places);
    res.json({ places });
  } catch (error) {
    console.error("Error retrieving places:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/Place/:Id", async (req, res) => {
  try {
    const Id = req.params.Id;
    const places = await Place.find({ districtId: Id })
      .populate("districtId")
      .exec();
    console.log("Places is successfully retived", places);
    res.json({ places });
  } catch (error) {
    console.error("Error retrieving places:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/Place/:Id", async (req, res) => {
  try {
    const Id = req.params.Id;
    const deletePlace = await Place.findByIdAndDelete(Id);
    res.json({ message: "Place Deleted" });
  } catch (error) {
    console.error("Error deleteing Courses:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ************************************************************************************************************************************************

//college Schema
const collegeSchemaStructure = new mongoose.Schema({
  collegename: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  proof: {
    type: String,
    required: true,
  },
  collegestatus: {
    type: Boolean,
    default: false,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "place",
    required: true,
  },
});
const College = mongoose.model("college", collegeSchemaStructure);

//college
app.post(
  "/College",
  upload.fields([
    { name: "collegePhoto", maxCount: 1 },
    { name: "collegeProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      var fileValue = JSON.parse(JSON.stringify(req.files));
      var photoimgsrc = `http://127.0.0.1:${port}/images/CollegeImages/${fileValue.collegePhoto[0].filename}`;
      var proofimgsrc = `http://127.0.0.1:${port}/images/ProofImages/${fileValue.collegeProof[0].filename}`;
      const {
        collegename,
        email,
        phone,
        password,
        address,
        photo,
        proof,
        placeId,
      } = req.body;
      const newCollege = new College({
        collegename,
        email,
        phone,
        password,
        address,
        photo: photoimgsrc,
        proof: proofimgsrc,
        placeId,
      });

      await newCollege.save();
      res.json({ message: "College inserted succesfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//populate college
app.get("/College", async (req, res) => {
  try {
    const colleges = await College.find().populate("placeId").exec();
    console.log("Places is successfully retived", colleges);
    res.json({ colleges });
  } catch (error) {
    console.error("Error retrieving places:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ***********************************************************************************************************************************************

//user Schema
const userSchemaStructure = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  userphone: {
    type: String,
    required: true,
  },
  userpassword: {
    type: String,
    required: true,
  },
  useraddress: {
    type: String,
    required: true,
  },
  userpincode: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  proof: {
    type: String,
    required: true,
  },
  userstatus: {
    type: Boolean,
    default: false,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "place",
    required: true,
  },
});

const User = mongoose.model("user", userSchemaStructure);

//user
app.post(
  "/User",
  upload.fields([
    { name: "userPhoto", maxCount: 1 },
    { name: "userProof", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log(req.body);
    var fileValue = JSON.parse(JSON.stringify(req.files));
    var photoimgsrc = `http://127.0.0.1:${port}/images/UserImages/${fileValue.userPhoto[0].filename}`;
    var proofimgsrc = `http://127.0.0.1:${port}/images/ProofImages/${fileValue.userProof[0].filename}`;
    const {
      username,
      useremail,
      userphone,
      userpassword,
      useraddress,
      userpincode,
      photo,
      proof,
      placeId,
    } = req.body;
    try {
      const newUser = new User({
        username,
        useremail,
        userphone,
        userpassword,
        useraddress,
        userpincode,
        photo: photoimgsrc,
        proof: proofimgsrc,
        placeId,
      });
      await newUser.save();
      res.json({ message: "User inserted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

//user Populate
app.get("/User/:id", async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id })
      .populate("placeId")
      .exec();
    console.log("Places is successfully retived", users);
    res.json({ users });
  } catch (error) {
    console.error("Error retrieving places:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/UserEdit/:id", async (req, res) => {
  const { id } = req.params;
  const { username, useremail, userphone, useraddress } = req.body;

  try {
    // Find the user by ID and update the fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        useremail,
        userphone,
        useraddress,
      },
      { new: true }
    );

    res.json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// *************************************************************************************************************************************************

//collegecourse Schema
const collegecourseSchemaStructure = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "college",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  collegecoursestatus: {
    type: Boolean,
    default: false,
  },
});
const Collegecourse = mongoose.model(
  "collegecourse",
  collegecourseSchemaStructure
);

//collegecourse Post
app.post("/CollegeCourse", async (req, res) => {
  console.log("hi");
  const { collegeId, courseId } = req.body;
  try {
    let newcollegecourse = new Collegecourse({
      collegeId,
      courseId,
    });

    await newcollegecourse.save();
    res.json({ message: "Inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//collegecourse populate
app.get("/CollegeCourse/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const collegecourses = await Collegecourse.find({collegeId:Id})
      .populate("courseId")
      .exec();
    console.log("successfully retrived", collegecourses);
    res.json({ collegecourses });
  } catch (error) {
    console.error("error", error);
    res.status(500).send("internal server error");
  }
});

app.delete("/CollegeCourse/:Id", async (req, res) => {
  try {
    const Id = req.params.Id;
    const deleteCollegeCourse = await Collegecourse.findByIdAndDelete(Id);
    res.json({ message: "CollegeCourse Deletedgggfgf" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ************************************************************************************************************************************************
// GuestLogin
app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ message: "Login successfully" }, req.body);
    const user = await User.findOne({
      useremail: email,
      userpassword: password,
    });
    const agency = await Agency.findOne({ email: email, password: password });
    const college = await College.findOne({ email: email, password: password });
    const admin = await Admin.findOne({ email: email, password: password });
    if (user) {
      res.send({
        id: user._id,
        login: "user",
      });
    } else if (agency) {
      res.send({
        id: agency._id,
        login: "agency",
      });
    } else if (college) {
      res.send({
        id: college._id,
        login: "college",
      });
    } else if (admin) {
      res.send({
        id: admin._id,
        login: "admin",
      });
    } else {
      res.send({
        id: user._id,
        login: "Invalid credential",
      });
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).send("internal server error");
  }
});
// ************************************************************************************************************************************************

//complaint Schema
const complaintSchemaStructure = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
});
const Complaint = mongoose.model("complaint", complaintSchemaStructure);

//complaint
app.post("/complaint", async (req, res) => {
  const { content, title, reply, userId } = req.body;
  try {
    let newcomplaint = new Complaint({
      content: content,
      reply: reply,
      title: title,
      userId: userId,
    });

    await newcomplaint.save();
    res.json({ message: "user inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//ComplaintReply
app.post("/complaintreply", async (req, res) => {
  const { reply, id } = req.body;
  try {
    Complaint.findByIdAndUpdate(id, { reply }, { new: true });
    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//complaint populate
app.get("/complaint", async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("userId").exec();
    console.log("successfully retrived", complaints);
    res.json(complaints);
  } catch (error) {
    console.error("error", error);
    res.status(500).send("internal server error");
  }
});
//  ***********************************************************************************************************************************************

//feedback
const feedbackSchemaStructure = new mongoose.Schema({
  // collegecourseId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'collegecourse',
  //     required: true
  // },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  feedbackcontent: {
    type: String,
    required: true,
  },
});
const Feedback = mongoose.model("feedback", feedbackSchemaStructure);

//feedback
app.post("/feedback", async (req, res) => {
  const { collegecourseId, userId, feedbackcontent, count } = req.body;
  try {
    let newfeedback = new Feedback({
      collegecourseId: collegecourseId,
      userId: userId,
      feedbackcontent: feedbackcontent,
      count: count,
    });

    await newfeedback.save();
    res.json({ message: " inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//feedback populate
app.get("/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("userId", "collegecourseId")
      .exec();
    console.log("successfully retrived", feedbacks);
    res.json(feedbacks);
  } catch (error) {
    console.error("error", error);
    res.status(500).send("internal server error");
  }
});

// **************************************************************************************************************************************

//coursebooking
const coursebookingSchemaStructure = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  guardianName: {
    type: String,
    required: true,
  },
  guardianPhone: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  proof: {
    type: String,
    required: true,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "place",
    required: true,
  },
  qualId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "qualification",
    required: true,
  },
  coursebookingstatus: {
    type: Number,
    enum: [0, 1, 2],
    default: 1,
  },
});
const Coursebooking = mongoose.model(
  "coursebooking",
  coursebookingSchemaStructure
);

//coursebooking
app.post(
  "/CourseBooking",
  upload.fields([{ name: "proof", maxCount: 1 }]),
  async (req, res) => {
    var fileValue = JSON.parse(JSON.stringify(req.files));
    var proofimgsrc = `http://127.0.0.1:${port}/images/ProofImages/${fileValue.proof[0].filename}`;
    const {
      name,
      address,
      phone,
      email,
      pincode,
      guardianName,
      guardianPhone,
      placeId,
      qualId,
    } = req.body;
    try {
      let newcoursebooking = new Coursebooking({
        name,
        address,
        phone,
        email,
        pincode,
        guardianName,
        guardianPhone,
        proof: proofimgsrc,
        placeId,
        qualId,
      });

      await newcoursebooking.save();
      res.json({ message: " inserted successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//coursebooking populate
app.get("/CourseBooking", async (req, res) => {
  console.log(req.body);
  try {
    const coursebookings = await Coursebooking.find()
      .populate("placeId")
      .exec();
    console.log("successfully retrived", coursebookings);
    res.json({ coursebookings });
  } catch (error) {
    console.error("error", error);
    res.status(500).send("internal server error");
  }
});

// Accept application route
app.put("/CourseBooking/:id/accept", async (req, res) => {
  const { id } = req.params;
  try {
    await Coursebooking.findByIdAndUpdate(
      id,
      { coursebookingstatus: 1 },
      { new: true }
    );
    res.json({ message: "Application accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error accepting application" });
  }
});

// Reject application route
app.put("/CourseBooking/:id/reject", async (req, res) => {
  const { id } = req.params;
  try {
    await Coursebooking.findByIdAndUpdate(
      id,
      { coursebookingstatus: 2 },
      { new: true }
    );
    res.json({ message: "Application rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error rejecting application" });
  }
});

//Accepted List populate
app.get("/AcceptedApplications", async (req, res) => {
  console.log(req.body);
  try {
    const acceptedApplications = await Coursebooking.find({
      coursebookingstatus: 1,
    })
      .populate("placeId")
      .exec();
    console.log("successfully retrived", acceptedApplications);
    res.json({ acceptedApplications });
  } catch (error) {
    console.error("error", error);
    res.status(500).send("internal server error");
  }
});

//Rejected List populate
app.get("/RejectedApplications", async (req, res) => {
  console.log(req.body);
  try {
    const rejectedApplications = await Coursebooking.find({
      coursebookingstatus: 2,
    })
      .populate("placeId")
      .exec();
    console.log("successfully retrived", rejectedApplications);
    res.json({ rejectedApplications });
  } catch (error) {
    console.error("error", error);
    res.status(500).send("internal server error");
  }
});

// *********************************************************************************************************************************************

//table agency
const agencySchemaStructure = new mongoose.Schema({
  agencyname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  proof: {
    type: String,
    required: true,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "place",
    required: true,
  },
});

const Agency = mongoose.model("agency", agencySchemaStructure);

//agency
app.post(
  "/Agency",
  upload.fields([
    { name: "agentPhoto", maxCount: 1 },
    { name: "agentProof", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log(req.body);
    var fileValue = JSON.parse(JSON.stringify(req.files));
    var photoimgsrc = `http://127.0.0.1:${port}/images/agencyImages/${fileValue.agentPhoto[0].filename}`;
    var proofimgsrc = `http://127.0.0.1:${port}/images/ProofImages/${fileValue.agentProof[0].filename}`;
    const {
      agencyname,
      email,
      phone,
      password,
      address,
      photo,
      proof,
      placeId,
    } = req.body;
    try {
      let newagency = new Agency({
        agencyname,
        email,
        phone,
        password,
        address,
        photo: photoimgsrc,
        proof: proofimgsrc,
        placeId,
      });
      await newagency.save();
      res.json({ messege: "Agency Inserted Successfully" });
    } catch (error) {
      console.error(error.messege);
      res.status(500).send("Server error");
    }
  }
);

//Agency Populate
app.get("/Agency", async (req, res) => {
  const id = req.params.id;
  try {
    const agency = await Agency.find(id).populate("placeId").exec();
    console.log("Places is successfully retived", agency);
    res.json({ agency });
  } catch (error) {
    console.error("Error retrieving places:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Change Password
app.patch("/updateChangePasswordAgency", async (req, res) => {
  // const id = req.params.id;
  const id = req.query.id;
  console.log(id);
  console.log(req.body);
  try {
    const { password } = req.body;
    const updatedAgency = await Agency.findByIdAndUpdate(
      id,
      {
        password,
      },
      { new: true }
    );
    res.json(updatedAgency);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// ********************************************************************************************************************************************

//package
const packageSchemaStructure = new mongoose.Schema({
  packagename: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agency",
  },
});

const Package = mongoose.model("package", packageSchemaStructure);

//post package

app.post(
  "/Package",
  upload.fields([{ name: "photo", maxCount: 1 }]),
  async (req, res) => {
    try {
      var fileValue = JSON.parse(JSON.stringify(req.files));
      var photoimgsrc = `http://127.0.0.1:${port}/images/packagesImages/${fileValue.photo[0].filename}`;
      const { packagename, details, price } = req.body;
      console.log(req.body);
      let newpackage = new Package({
        packagename: packagename,
        details: details,
        price: price,
        photo: photoimgsrc,
      });
      await newpackage.save();
      res.json({ message: "Packages Inset Successfully" });
    } catch (error) {
      console.error(err);
      res.status(500).send("server error");
    }
  }
);

//package populate
app.get("/Package", async (req, res) => {
  try {
    const packages = await Package.find().populate("agencyId");
    console.log("retrived successfully", packages);
    res.json({ packages });
  } catch (error) {
    console.error("error", error);
    res.status(500).send("internal server error");
  }
});

app.delete("/Package/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    const deletePackage = await Package.findByIdAndDelete(Id);
    res.json({ message: "Package Deleted" });
  } catch (error) {
    console.error("Error Deleting Package:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ************************************************************************************************************************************

//request
const requestSchemaStructure = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  description: {
    type: String,
  },
  proof: {
    type: String,
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "package",
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "place",
  },
  qualId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "qualification",
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 1,
  },
  bookslot: {
    type: String,
  },
});
const Request = mongoose.model("request", requestSchemaStructure);

//request
app.post(
  "/Request",
  upload.fields([{ name: "proof", maxCount: 1 }]),
  async (req, res) => {
    var fileValue = JSON.parse(JSON.stringify(req.files));
    var proofimgsrc = `http://127.0.0.1:${port}/images/ProofImages/P${fileValue.proof[0].filename}`;
    console.log(req.body);
    const {
      name,
      address,
      phone,
      email,
      description,
      proof,
      packageId,
      placeId,
      qualId,
      bookslot,
    } = req.body;
    try {
      let newrequest = new Request({
        name: name,
        address: address,
        phone: phone,
        email: email,
        description: description,
        proof: proofimgsrc,
        packageId: packageId,
        placeId: placeId,
        qualId: qualId,
        bookslot: bookslot,
      });
      1;
      await newrequest.save();
      res.json({ messege: "Inserted successfully" });
    } catch (error) {
      console.error("Error", error);
      res.status(500).send("Internal server error");
    }
  }
);

//populate request
app.get("/Request", async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("placeId")
      .populate("packageId")
      .populate("qualId")
      .exec();
    console.log("Retrived successfully", requests);
    res.json({ requests });
  } catch (error) {
    console.error("error", error);
    res.status(500).send("internal server error");
  }
});

//Time Slot
app.get("/Slot", async (req, res) => {
  try {
    const slots = await Request.find();
    console.log("category is successfully retived", slots);
    if (slots.length !== 0) {
      res.json({ slots });
    } else {
      res.json({ slots: null });
    }
  } catch (error) {
    console.error("Error retrieving categoys:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/Slot/:id", async (req, res) => {
  const { id } = req.params;
  const { bookslot } = req.body;
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { bookslot },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json({ message: "Bookslot updated successfully" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal server error");
  }
});

// ************************************************************************************************************************************
