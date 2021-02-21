import React from 'react';
import coursesApi from '@api/coursesApi';
function index() {
  const handleClick = async () => {
    const data = await coursesApi.getTopViewCourses();
    console.log(data);
  };
  return (
    <div>
      <button onClick={handleClick}>get courses top view</button>
    </div>
  );
}

export default index;
