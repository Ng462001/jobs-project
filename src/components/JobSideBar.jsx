// components/JobSideBar.jsx
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '../css/jobSideBar.css';

const JobSideBar = ({ changeEmpType, changeSalary, selectedEmpTypes = [], selectedSalary = "" }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("jwt-token");
    const fetchProfile = async () => {
      const api = "https://apis.ccbp.in/profile";
      const options = {
        method: "Get",
        headers: { Authorization: `Bearer ${token}` }
      };
      try {
        setLoading(true);
        const response = await fetch(api, options);
        const data = await response.json();
        if (response.ok === true) {
          setLoading(false);
          setData(data.profile_details);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  const employmentTypesList = [
    { label: 'Full Time', employmentTypeId: 'FULLTIME' },
    { label: 'Part Time', employmentTypeId: 'PARTTIME' },
    { label: 'Freelance', employmentTypeId: 'FREELANCE' },
    { label: 'Internship', employmentTypeId: 'INTERNSHIP' },
  ];

  const salaryRangesList = [
    { salaryRangeId: '1000000', label: '10 LPA and above' },
    { salaryRangeId: '2000000', label: '20 LPA and above' },
    { salaryRangeId: '3000000', label: '30 LPA and above' },
    { salaryRangeId: '4000000', label: '40 LPA and above' },
  ];

  const renderSalaryRangesTypes = () => (
    <div className="filter-section">
      <h3 className="filter-heading">💰 Salary Range</h3>
      <div className="filters-list">
        {salaryRangesList.map(eachRange => (
          <label key={eachRange.salaryRangeId} className="filter-option">
            <input
              type="radio"
              value={eachRange.salaryRangeId}
              name="salary ranges"
              onChange={handleOnSalaryChange}
              checked={selectedSalary === eachRange.salaryRangeId}
            />
            <span className="filter-label">{eachRange.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderEmploymentTypes = () => (
    <div className="filter-section">
      <h3 className="filter-heading">💼 Employment Type</h3>
      <div className="filters-list">
        {employmentTypesList.map(eachType => (
          <label key={eachType.employmentTypeId} className="filter-option">
            <input
              type="checkbox"
              value={eachType.employmentTypeId}
              onChange={handleOnChangeEmpType}
              checked={selectedEmpTypes.includes(eachType.employmentTypeId)}
            />
            <span className="filter-label">{eachType.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const handleOnChangeEmpType = (e) => changeEmpType(e);
  const handleOnSalaryChange = (e) => changeSalary(e);

  const profileDetails = () => (
    <div className={`profile-card`}>
      {loading ? (
        <div className='loader-container'>
          <div className='loader'></div>
        </div>
      ) : (
        <>
          <div className="profile-avatar">
            <img src={data.profile_image_url} className="profile-image" alt="profile" />
          </div>
          <h3 className="profile-name">{data.name}</h3>
          <p className="profile-bio">{data.short_bio}</p>
        </>
      )}
    </div>
  );

  return (
    <div className={`sidebar-container}`}>
      {profileDetails()}
      {renderEmploymentTypes()}
      {renderSalaryRangesTypes()}
    </div>
  );
};

export default JobSideBar;