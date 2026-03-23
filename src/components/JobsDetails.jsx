import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { FaStar, FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Cookies from 'js-cookie'
import '../css/jobsDetail.css'
import Navbar from './Navbar';

const JobsDetails = () => {
  const { id } = useParams()
  const [jobsItem, setJobsItem] = useState({})
  const [loading, setLoading] = useState(true)
  const [similarJobs, setSimilarJobs] = useState({})

  useEffect(() => {

    const token = Cookies.get("jwt-token");

    const fetchJobsDetails = async () => {

      const api = `https://apis.ccbp.in/jobs/${id}`;

      const options = {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      try {
        setLoading(true);
        const response = await fetch(api, options);
        const data = await response.json();
        if (response.ok === true) {
          setLoading(false);
          setJobsItem(data.job_details);
          setSimilarJobs(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobsDetails();

  }, [id]);

  return (
    <>
      <Navbar />
      <div>
        {loading ?
          <div className='d-flex justify-content-center align-items-center' style={{ height: "75vh" }}>
            <div className='loader'></div>
          </div>
          :
          <div className="container py-5 mt-5">
            <div className='d-flex justify-content-center mt-3'>
              <div className='jobDetails-card w-100'>
                <div className='d-flex align-items-center mb-4'>
                  <img src={jobsItem.company_logo_url} width="80px" alt="logo" style={{ borderRadius: '12px', background: 'white', padding: '5px' }} />
                  <div className='ms-4'>
                    <h2 className='fw-bold text-white mb-2'>{jobsItem.title}</h2>
                    <div className="d-flex align-items-center">
                      <FaStar className="text-warning me-2" />
                      <span className='fw-bold text-secondary'>{jobsItem.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div className="d-flex gap-4">
                    <div className="d-flex align-items-center">
                      <FaLocationDot className="text-primary me-2" />
                      <span className='fw-bold text-secondary'>{jobsItem.location}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaBriefcase className="text-primary me-2" />
                      <span className='fw-bold text-secondary'>{jobsItem.employment_type}</span>
                    </div>
                  </div>
                  <h4 className='fw-bolder text-success m-0'>{jobsItem.package_per_annum}</h4>
                </div>

                <hr style={{ borderColor: 'var(--border-color)', margin: '20px 0' }} />

                <h4 className='fw-bold text-white mb-3'>Description</h4>
                <p className="jobDec">{jobsItem.job_description}</p>

                <div className="mt-5">
                  <h4 className='fw-bold text-white mb-4'>Skills</h4>
                  <ul className='skills-list'>
                    {jobsItem.skills.map((item) => (
                      <li key={item.name}>
                        <img src={item.image_url} alt={item.name} />
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className='similarJobs mt-5'>
              <h3 className='fw-bold text-white mb-4'>Similar Jobs</h3>
              <div className='row g-4'>
                {similarJobs.similar_jobs.map((item) => (
                  <div className="col-12 col-md-6" key={item.id}>
                    <NavLink className='similarjobsLink h-100' to={`/jobs/${item.id}`}>
                      <div className='similar-job-card h-100 m-0'>
                        <div className='d-flex align-items-center mb-3'>
                          <img src={item.company_logo_url} width="60px" alt="logo" style={{ borderRadius: '12px', background: 'white', padding: '5px' }} />
                          <div className='ms-3'>
                            <h4 className='fw-bold text-white mb-1'>{item.title}</h4>
                            <div className="d-flex align-items-center">
                              <FaStar className="text-warning me-2" />
                              <span className='fw-bold text-secondary'>{item.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3 d-flex gap-4">
                          <div className="d-flex align-items-center">
                            <FaLocationDot className="text-primary me-2" />
                            <span className='fw-bold text-secondary'>{item.location}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <FaBriefcase className="text-primary me-2" />
                            <span className='fw-bold text-secondary'>{item.employment_type}</span>
                          </div>
                        </div>

                        <hr style={{ borderColor: 'var(--border-color)', margin: '15px 0' }} />
                        <h5 className='fw-bold text-white mb-2'>Description</h5>
                        <p className='jobDec' style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.job_description}</p>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>

          </div>
        }
      </div>
    </>
  )
}

export default JobsDetails