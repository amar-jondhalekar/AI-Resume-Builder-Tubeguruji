import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = () => {
    setLoading(true); // Set loading to true before fetching
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        const data = resp.data.data;
        console.log(data);
        // Ensure data is an array or default to an empty array
        setResumeList(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error("Error fetching resumes:", error);
        setResumeList([]);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching
      });
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div className='grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      '>
        <AddResume />
        {loading ? ( // Show loading state
          [1, 2, 3, 4].map((item, index) => (
            <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse' key={index}></div>
          ))
        ) : resumeList.length > 0 ? resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={resume.id} refreshData={GetResumesList} />
        )) : (
          <div>No resumes found.</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
