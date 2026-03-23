// components/JobAllSection.jsx
import React from 'react';
import { FaStar, FaBriefcase, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../css/jobAllSection.css';

const JobAllSection = ({ jobsItem }) => {

  return (
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
