import CoursesCarousel from '@components/CoursesCarousel';
import TopBar from '@components/TopBar';
import NavOne from '@components/NavOne';
import CoursesHightLight from '@components/CoursesHightLight';
import BestViewCategory from '@components/BestViewCategory';

function index() {
  return (
    <>
      <TopBar />
      <NavOne />
      <CoursesHightLight />
      <CoursesCarousel type="new" />
      <CoursesCarousel type="bestview" />
      <BestViewCategory />
    </>
  );
}

export default index;
