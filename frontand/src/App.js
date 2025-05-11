import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';  
import Home from './pages/home';
import ForgetPassword from './pages/forgetpassowrd/forgetpassword';
import RefreshHandler from './RefreshHandler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './admin/admindashboard/adminDashboard';
import TeacherDashboard from './teacher/teacherDashboard';
import About from './pages/about/about';
import AdviserSlots from './admin/adviser/adviserSlots';
import AdviserAvailiblity from './pages/adviser/AdviserAvailiblity';
import StudentGroups from './pages/fypList/fyplist';
import DataSet from './pages/datasets/dataSet';
import UserDashboard from './pages/userdashboard/userDashboard';
import AdvisorDetails from './pages/advisorDetails/advisorDetails';
import RequestUsers from './admin/requestUsers/requestUsers';
import Announcements from './admin/Announcements/Announcements';
import VerifiedOtp from './verifiedOtp/verifiedOtp';
import ProtectedRoute from './ProtectedRoute';
import Result from './teacher/result';
import FYPResult from './pages/result/fypresult';
import ZabAI from './pages/zabAI/zabAI';
import AddTeacher from './admin/addTeacher/AddTeacher';
import TeacherSlots from './teacher/teacherSlot';
import ResourceFile from './admin/ResourceFile/ResourceFile';
function App() {

  return (
    <div className="App">
      <RefreshHandler />
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<ProtectedRoute element={<Signup />} />} />
        <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
        <Route path="/forgetpassword" element={<ProtectedRoute element={<ForgetPassword />} />} />
        <Route path="/about" element={<About />} />
        <Route path="/verifiedotp" element={<VerifiedOtp />} />


        {/* User Routes */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} allowedRole="student" />} />
        <Route path="/adviserAvailibilty" element={<ProtectedRoute element={<AdviserAvailiblity />} allowedRole="student" />} />
        <Route path="/fypList" element={<ProtectedRoute element={<StudentGroups />} allowedRole="student" />} />
        <Route path="/advisordetails" element={<ProtectedRoute element={<AdvisorDetails />} allowedRole="student" />} />
        <Route path="/dataset" element={<ProtectedRoute element={<DataSet />} allowedRole="student" />} />
        <Route path="/fypresult" element={<ProtectedRoute element={<FYPResult />} allowedRole="student" />} />
        <Route path="/userdashboard" element={<ProtectedRoute element={<UserDashboard />} allowedRole="student" />} />

        {/* Admin Routes */}
        <Route path="/adminDashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRole="admin" />} />
        <Route path="/teacherDashboard" element={<ProtectedRoute element={<TeacherDashboard allowedRole="teacher" />} />} />
        <Route path="/request-users" element={<ProtectedRoute element={<RequestUsers />} allowedRole="admin" />} />
        <Route path="/noticeboard" element={<ProtectedRoute element={<Announcements />} allowedRole="admin" />} />
        <Route path="/adviserslist" element={<ProtectedRoute element={<AdviserSlots />} allowedRole="admin" />} />
        <Route path="/teacherslot" element={<ProtectedRoute element={<TeacherSlots />} allowedRole="teacher" />} />
        <Route path="/resourcefile" element={<ProtectedRoute element={<ResourceFile />} allowedRole="admin" />} />


        <Route path="/result" element={<ProtectedRoute element={<Result />} allowedRole="admin"/>} />
        <Route path="/addTeacher" element={<ProtectedRoute element={<AddTeacher />} allowedRole="admin"/>} />
        <Route path="/zabai" element={<ProtectedRoute element={<ZabAI />} allowedRole="student"/>} />

      </Routes>
    </div>
  );
} 

export default App;