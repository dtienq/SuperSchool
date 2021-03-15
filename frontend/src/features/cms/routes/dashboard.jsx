import Dashboard from '@cmsviews/Dashboard/Dashboard.jsx';
import Buttons from '@cmsviews/Components/Buttons.jsx';
import GridSystem from '@cmsviews/Components/GridSystem.jsx';
import Panels from '@cmsviews/Components/Panels.jsx';
import SweetAlert from '@cmsviews/Components/SweetAlert.jsx';
import Notifications from '@cmsviews/Components/Notifications.jsx';
import Icons from '@cmsviews/Components/Icons.jsx';
import Typography from '@cmsviews/Components/Typography.jsx';
import RegularForms from '@cmsviews/Forms/RegularForms.jsx';
import ExtendedForms from '@cmsviews/Forms/ExtendedForms.jsx';
import ValidationForms from '@cmsviews/Forms/ValidationForms.jsx';
import Wizard from '@cmsviews/Forms/Wizard.jsx';
import RegularTables from '@cmsviews/Tables/RegularTables.jsx';
import ExtendedTables from '@cmsviews/Tables/ExtendedTables.jsx';
import ReactTables from '@cmsviews/Tables/ReactTables.jsx';
import GoogleMaps from '@cmsviews/Maps/GoogleMaps.jsx';
import FullScreenMap from '@cmsviews/Maps/FullScreenMap.jsx';
import VectorMap from '@cmsviews/Maps/VectorMap.jsx';
import Charts from '@cmsviews/Charts/Charts.jsx';
import Calendar from '@cmsviews/Calendar/Calendar.jsx';
import Widgets from '@cmsviews/Widgets/Widgets.jsx';
import UserProfile from '@cmsviews/Pages/UserProfile.jsx';
import TimelinePage from '@cmsviews/Pages/Timeline.jsx';
import RTLSupport from '@cmsviews/Pages/RTLSupport.jsx';
import UserRegister from '@cmsviews/Forms/UserRegister.jsx';
import pagesRoutes from './pages.jsx';
import CoursesList from '@cmsviews/CourseManagement/CoursesList';
import AddCourse from '@cmsviews/Forms/AddCourse.jsx';
import ListIcon from 'material-ui-icons/List';
// Users
import AdminTable from '@cmsviews/UsersManagement/AdminTable.jsx';
import StudentTable from '@cmsviews/UsersManagement/StudentTable.jsx';
import TeacherTable from '@cmsviews/UsersManagement/TeacherTable.jsx';
//New
import Profile from '@cmsviews/Pages/Profile.jsx';
// material-ui-icons
import DashboardIcon from 'material-ui-icons/Dashboard';
import Image from 'material-ui-icons/Image';
import Apps from 'material-ui-icons/Apps';
import ContentPaste from 'material-ui-icons/ContentPaste';
import GridOn from 'material-ui-icons/GridOn';
import Place from 'material-ui-icons/Place';
import WidgetsIcon from 'material-ui-icons/Widgets';
import Timeline from 'material-ui-icons/Timeline';
import DateRange from 'material-ui-icons/DateRange';
import GroupIcon from 'material-ui-icons/Group';
import MainCategoryTables from '@cmsviews/CategoryManagement/MainCategoryTables';
import SubCategoryTables from '@cmsviews/CategoryManagement/SubCategoryTables';
import UserTables from '@cmsviews/Tables/UserTables';
import CategoryForm from '@cmsviews/CategoryManagement/CategoryForm';

var pages = [
  {
    path: '/manager/timeline-page',
    name: 'Timeline Page',
    mini: 'TP',
    component: TimelinePage,
  },
  // User Info
  {
    path: '/manager/profile',
    name: 'Information',
    component: Profile,
  },
  //User Edit
  {
    path: '/manager/editprofile',
    name: 'Edit Information',
    component: UserProfile,
  },
  {
    path: '/manager/user-page',
    name: 'User Profile',
    mini: 'UP',
    component: UserProfile,
  },
  {
    path: '/manager/rtl/rtl-support-page',
    name: 'RTL Support',
    mini: 'RS',
    component: RTLSupport,
  },
].concat(pagesRoutes);

var dashRoutes = [
  {
    collapse: true,
    path: '/manager/users',
    name: 'Quản Lý Tài Khoản',
    state: 'openUsers',
    icon: GroupIcon,
    views: [
      {
        path: '/manager/users/admin',
        name: 'Tài khoản Admin',
        mini: 'AD',
        component: AdminTable,
      },
      {
        path: '/manager/users/teacher',
        name: 'Tài khoản Giáo viên',
        mini: 'TE',
        component: TeacherTable,
      },
      {
        path: '/manager/users/student',
        name: 'Tài khoản Học viên',
        mini: 'STU',
        component: StudentTable,
      },
      {
        path: '/manager/users/add-user',
        name: 'Tạo tài khoản',
        mini: 'RG',
        component: UserRegister,
      },
    ],
  },
  {
    collapse: true,
    path: '/manager/category',
    name: 'Quản lý danh mục',
    state: 'openCategory',
    icon: ContentPaste,
    views: [
      {
        path: '/manager/category/main-category',
        name: 'Danh mục chính',
        mini: 'MN',
        component: MainCategoryTables,
      },
      {
        path: '/manager/category/sub-category',
        name: 'Danh mục phụ',
        mini: 'SB',
        component: SubCategoryTables,
      },
      {
        path: '/manager/category/category-form',
        name: 'Điều chỉnh danh mục',
        mini: 'ED',
        component: CategoryForm,
      },
    ],
  },
  {
    path: '/manager/courses',
    name: 'Quản lý khóa học',
    icon: ListIcon,
    component: CoursesList,
  },
  {
    path: '/manager/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
  },
  {
    path: '/manager/add-course',
    name: 'Thêm khoá học',
    icon: DashboardIcon,
    component: AddCourse,
  },
  {
    collapse: true,
    path: '-page',
    name: 'Pages',
    state: 'openPages',
    icon: Image,
    views: pages,
  },

  {
    collapse: true,
    path: '/manager/forms',
    name: 'Forms',
    state: 'openForms',
    icon: ContentPaste,
    views: [
      {
        path: '/manager/forms/category-form',
        name: 'Điều chỉnh danh mục',
        mini: 'CAT',
        component: CategoryForm,
      },
      {
        path: '/manager/forms/regular-forms',
        name: 'Regular Forms',
        mini: 'RF',
        component: RegularForms,
      },
      {
        path: '/manager/forms/extended-forms',
        name: 'Extended Forms',
        mini: 'EF',
        component: ExtendedForms,
      },
      {
        path: '/manager/forms/validation-forms',
        name: 'Validation Forms',
        mini: 'VF',
        component: ValidationForms,
      },
      {
        path: '/manager/forms/wizard',
        name: 'Wizard',
        mini: 'W',
        component: Wizard,
      },
      {
        path: '/manager/forms/user-registation',
        name: 'Tạo tài khoản',
        mini: 'REG',
        component: UserRegister,
      },
    ],
  },
  {
    collapse: true,
    path: '/manager/tables',
    name: 'Tables',
    state: 'openTables',
    icon: GridOn,
    views: [
      {
        path: '/manager/tables/regular-tables',
        name: 'Regular Tables',
        mini: 'RT',
        component: RegularTables,
      },
      {
        path: '/manager/tables/extended-tables',
        name: 'Extended Tables',
        mini: 'ET',
        component: ExtendedTables,
      },
      {
        path: '/manager/tables/react-tables',
        name: 'React Tables',
        mini: 'RT',
        component: ReactTables,
      },
      //Category
      {
        path: '/manager/tables/maincategory-tables',
        name: 'Danh mục chính',
        mini: 'MC',
        component: MainCategoryTables,
      },
      //SubCategory
      {
        path: '/manager/tables/subcategory-tables',
        name: 'Danh mục phụ',
        mini: 'SC',
        component: SubCategoryTables,
      },
      //User
      {
        path: '/manager/tables/user-tables',
        name: 'Người dùng',
        mini: 'UR',
        component: UserTables,
      },
    ],
  },
  {
    collapse: true,
    path: '/manager/maps',
    name: 'Maps',
    state: 'openMaps',
    icon: Place,
    views: [
      {
        path: '/manager/maps/google-maps',
        name: 'Google Maps',
        mini: 'GM',
        component: GoogleMaps,
      },
      {
        path: '/manager/maps/full-screen-maps',
        name: 'Full Screen Map',
        mini: 'FSM',
        component: FullScreenMap,
      },
      {
        path: '/manager/maps/vector-maps',
        name: 'Vector Map',
        mini: 'VM',
        component: VectorMap,
      },
    ],
  },
  {
    path: '/manager/widgets',
    name: 'Widgets',
    icon: WidgetsIcon,
    component: Widgets,
  },
  {
    path: '/manager/charts',
    name: 'Charts',
    icon: Timeline,
    component: Charts,
  },
  {
    path: '/manager/calendar',
    name: 'Calendar',
    icon: DateRange,
    component: Calendar,
  },
  {
    redirect: true,
    path: '/',
    pathTo: '/manager/dashboard',
    name: 'Dashboard',
  },
];
export default dashRoutes;
