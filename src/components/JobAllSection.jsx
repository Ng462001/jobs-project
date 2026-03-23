<<<<<<< HEAD
// components/JobAllSection.jsx
import React from 'react';
import { FaStar, FaBriefcase, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../css/jobAllSection.css';
=======
import React from 'react'
import { FaStar, FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import '../css/jobAllSection.css'
import { NavLink } from 'react-router-dom';

>>>>>>> 87b7e8a50e4a3eba55dbea518447bff41b837971

const JobAllSection = ({ jobsItem }) => {

  return (
<<<<<<< HEAD
    <NavLink to={`/jobs/${jobsItem.id}`} className="job-card-link">
      <div className={`job-card-modern `}>
        <div className="job-card-header">
          <div className="company-logo-wrapper">
            <img
              src={jobsItem.company_logo_url}
              alt="company logo"
              className="company-logo-modern"
            />
          </div>
          <div className="job-title-section">
            <h3 className="job-title-modern">{jobsItem.title}</h3>
            <div className="rating-container">
              <FaStar className="rating-star" />
              <span className="rating-value">{jobsItem.rating}</span>
            </div>
          </div>
        </div>

        <div className="job-details-modern">
          <div className="job-location-type">
            <div className="detail-item">
              <FaMapMarkerAlt className="detail-icon" />
              <span>{jobsItem.location}</span>
            </div>
            <div className="detail-item">
              <FaBriefcase className="detail-icon" />
              <span>{jobsItem.employment_type}</span>
            </div>
          </div>
          <div className="salary-modern">
            <span className="salary-value">{jobsItem.package_per_annum}</span>
          </div>
        </div>

        <div className="job-description-modern">
          <h4 className="description-title">Description</h4>
          <p className="description-text">{jobsItem.job_description}</p>
        </div>

        <div className="view-details">
          <span>View Details</span>
          <FaExternalLinkAlt className="view-icon" />
        </div>
      </div>
    </NavLink>
  );
};

export default JobAllSection;
=======
    <>
      <NavLink to={`/jobs/${jobsItem.id}`} style={{ textDecoration: "none", color: "black" }}>
        <li style={{ listStyle: "none" }} className='jobCard p-4 mb-3'>

          <div className='d-flex'>
            <img src={jobsItem.company_logo_url} width="10%" />
            <div className='ml-4'>
              <h2 className='jobTitle'>{jobsItem.title}</h2>
              <FaStar className="ratingIcon" />
              <span className='rating '>{jobsItem.rating}</span>
            </div>
          </div>

          <div className="mt-3 d-flex justify-content-between">
            <div>
              <FaLocationDot className="locationIcon text-danger" />
              <span className='fw-bold loction'>{jobsItem.location}</span>
              <FaBriefcase className="jobTypeIcon text-secondary" />
              <span className='fw-bold'>{jobsItem.employment_type}</span>
            </div>
            <h5 className='fw-bolder'>{jobsItem.package_per_annum}</h5>
          </div>

          <hr />

          <h5 className='fw-bold'>Description</h5>
          <p className="jobDec">{jobsItem.job_description}</p>

        </li>
      </NavLink>
    </>

  )
}

export default JobAllSection
>>>>>>> 87b7e8a50e4a3eba55dbea518447bff41b837971
