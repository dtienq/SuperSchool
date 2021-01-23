import { Spinner } from 'antd';
import './LoadingScreen.scss';

export default function index() {
  return (
    <div className="loading-screen">
      <Spinner color="primary" />
    </div>
  );
}
