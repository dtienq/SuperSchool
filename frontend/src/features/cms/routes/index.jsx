import Pages from '../layouts/Pages.jsx';
import RTL from '../layouts/RTL.jsx';
import Dashboard from '../layouts/Dashboard.jsx';

var indexRoutes = [
  { path: '/manager/pages', name: 'Pages', component: Pages },
  { path: '/manager', name: 'Home', component: Dashboard },
  { path: '/rtl', name: 'RTL', component: RTL },
];

export default indexRoutes;
