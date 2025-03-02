import React from 'react'
import { FaStar, FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import '../css/jobAllSection.css'
import { NavLink } from 'react-router-dom';


const JobAllSection = ({ jobsItem }) => {

  return (
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