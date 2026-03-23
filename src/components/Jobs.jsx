// components/Jobs.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JobAllSection from "./JobAllSection";
import JobSideBar from "./JobSideBar";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import ScrollToTop from "./ScrollToTop";
import "../css/jobs.css";
import { FaSearch } from "react-icons/fa";

const Jobs = () => {
  const location = useLocation();
  const [allValues, setValues] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialEmpType = searchParams.get("employment_type") ? [searchParams.get("employment_type")] : [];

    return {
      jobsArr: [],
      empType: initialEmpType,
      minPackage: "",
      searchIn: ""
    };
  });
  const [loading, setLoading] = useState(false);
  const [emptyData, setEmptyData] = useState(0);

  useEffect(() => {
    const token = Cookies.get("jwt-token");
    const fetchJobs = async () => {
      const { empType, minPackage, searchIn } = allValues;
      const api = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPackage}&search=${searchIn}`;
      const options = {
        method: "Get",
        headers: { Authorization: `Bearer ${token}` }
      };
      try {
        setLoading(true);
        const response = await fetch(api, options);
        const data = await response.json();
        if (response.ok === true) {
          setEmptyData(data.jobs.length);
          setValues({ ...allValues, jobsArr: data.jobs });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [allValues.searchIn, allValues.empType, allValues.minPackage]);

  const getUserIn = (e) => {
    if (e.key === "Enter") {
      setValues({ ...allValues, searchIn: e.target.value });
    }
    if (e.target.value === "") {
      setValues({ ...allValues, searchIn: "" });
    }
  };

  const handleChangeEmpType = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setValues({ ...allValues, empType: [...allValues.empType, value] });
    } else {
      setValues({ ...allValues, empType: allValues.empType.filter(eachType => eachType !== value) });
    }
  };

  const handleChangeSalary = (e) => {
    setValues({ ...allValues, minPackage: e.target.value });
  };

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="jobs-page">
        <div className="jobs-container">
          <div className="jobs-sidebar">
            <JobSideBar
              changeEmpType={handleChangeEmpType}
              changeSalary={handleChangeSalary}
              selectedEmpTypes={allValues.empType}
              selectedSalary={allValues.minPackage}
            />
          </div>
          <div className="jobs-main">
            <div className="search-container-modern">
              <FaSearch className="search-icon-modern" />
              <input
                onKeyUp={getUserIn}
                type="search"
                className="search-input-modern"
                placeholder="Search for jobs by title, company, or keywords..."
              />
            </div>

            {loading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : emptyData === 0 ? (
              <div className="empty-state">
                <div className="empty-state-content">
                  <img src="/images/no-jobs-found.png" alt="No jobs found" className="empty-state-image" />
                  <h2 className="empty-state-title">No Jobs Found</h2>
                  <p className="empty-state-description">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
              </div>
            ) : (
              <div className="jobs-grid-modern">
                {allValues.jobsArr.map(eachJob => (
                  <JobAllSection key={eachJob.id} jobsItem={eachJob} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;