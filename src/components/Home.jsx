import Navbar from "./Navbar";
import "../css/home.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categories, setCategories] = useState([
        { name: "Full Time", count: 0, icon: "💻", color: "#6c63ff", type: "FULLTIME" },
        { name: "Part Time", count: 0, icon: "⏰", color: "#ff6b6b", type: "PARTTIME" },
        { name: "Freelance", count: 0, icon: "💼", color: "#4ecdc4", type: "FREELANCE" },
        { name: "Internship", count: 0, icon: "🎓", color: "#ffe66d", type: "INTERNSHIP" }
    ]);

    // Fetch featured jobs and category counts
    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get("jwt-token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);

                // Fetch all jobs without employment type filter to get complete data
                const api = "https://apis.ccbp.in/jobs";
                const options = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await fetch(api, options);
                const data = await response.json();

                if (response.ok) {
                    // Set featured jobs (first 6 jobs)
                    setFeaturedJobs(data.jobs.slice(0, 6));

                    // Calculate category counts from all jobs
                    const categoryCounts = {
                        FULLTIME: 0,
                        PARTTIME: 0,
                        FREELANCE: 0,
                        INTERNSHIP: 0,
                        REMOTE: 0
                    };

                    data.jobs.forEach(job => {
                        if (!job.employment_type) return;

                        // Handle cases where API returns "Full Time" instead of "FULLTIME"
                        const empTypeKey = job.employment_type.toUpperCase().replace(/ /g, '');

                        if (categoryCounts.hasOwnProperty(empTypeKey)) {
                            categoryCounts[empTypeKey]++;
                        } else if (categoryCounts.hasOwnProperty(job.employment_type)) {
                            categoryCounts[job.employment_type]++;
                        }
                    });

                    // Update categories with actual counts
                    setCategories(prev => prev.map(cat => ({
                        ...cat,
                        count: categoryCounts[cat.type] || 0
                    })));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
                setCategoriesLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    // Animate numbers on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const statElements = document.querySelectorAll('.stat-number');
                        statElements.forEach((el) => {
                            const target = parseInt(el.getAttribute('data-target'));
                            let current = 0;
                            const increment = target / 50;
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    current = target;
                                    clearInterval(timer);
                                }
                                el.textContent = Math.floor(current).toLocaleString();
                            }, 20);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const statsContainer = document.querySelector('.hero-stats');
        if (statsContainer) observer.observe(statsContainer);

        return () => observer.disconnect();
    }, []);

    const handleCategoryClick = (categoryType) => {
        navigate(`/jobs?employment_type=${categoryType}`);
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                    <div className="animated-gradient"></div>
                </div>

                <div className="container hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="badge-icon">✨</span>
                            <span>Join 10,000+ professionals already hired</span>
                        </div>

                        <h1 className="hero-title">
                            Find Your{" "}
                            <br />
                            <span className="gradient-text">Dream Job</span>
                            <br />
                            Today

                        </h1>

                        <p className="hero-description">
                            Discover thousands of opportunities at the world's most innovative companies.
                            Join the next generation of tech leaders and disruptors.
                        </p>

                        <div className="hero-actions">
                            <button className="btn-primary" onClick={() => navigate('/jobs')}>
                                Browse Jobs
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="btn-secondary" onClick={() => {
                                document.getElementById('featured-jobs').scrollIntoView({ behavior: 'smooth' });
                            }}>
                                How it works
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number" data-target="500">500+</span>
                                <span className="stat-label">Active Startups</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat">
                                <span className="stat-number" data-target="10000">10k+</span>
                                <span className="stat-label">Open Positions</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat">
                                <span className="stat-number" data-target="1000">1000+</span>
                                <span className="stat-label">Hired Monthly</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Popular Categories</h2>
                        <p className="section-subtitle">Explore jobs by category</p>
                    </div>

                    {categoriesLoading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <div className="categories-grid">
                            {categories.map((category, index) => (
                                <div
                                    className="category-card"
                                    key={index}
                                    style={{ '--category-color': category.color }}
                                    onClick={() => handleCategoryClick(category.type)}
                                >
                                    <div className="category-icon">{category.icon}</div>
                                    <h3 className="category-name">{category.name}</h3>
                                    <span className="category-count">{category.count}+ jobs</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Featured Jobs Section */}
            <div className="featured-section" id="featured-jobs">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Jobs</h2>
                        <p className="section-subtitle">Hand-picked opportunities just for you</p>
                    </div>

                    {loading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <>
                            <div className="jobs-grid">
                                {featuredJobs.map((job) => (
                                    <div className="job-card" key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}>
                                        <div className="job-header">
                                            <div className="company-logo">
                                                <img src={job.company_logo_url} alt={job.company} style={{ width: '50px', height: '50px', borderRadius: '12px' }} />
                                            </div>
                                            <div className="job-info">
                                                <h3 className="job-title">{job.title}</h3>
                                                <p className="company-name">{job.company}</p>
                                            </div>
                                        </div>

                                        <div className="job-details">
                                            <div className="job-detail">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                                <span>{job.location}</span>
                                            </div>
                                            <div className="job-detail">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                                <span>{job.employment_type}</span>
                                            </div>
                                            <div className="job-detail salary">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                                <span>{job.package_per_annum}</span>
                                            </div>
                                        </div>

                                        <div className="job-tags">
                                            <span className="job-tag">{job.employment_type}</span>
                                            <span className="job-tag">{job.location}</span>
                                        </div>

                                        <button className="apply-btn">View Details</button>
                                    </div>
                                ))}
                            </div>

                            {featuredJobs.length === 0 && !loading && (
                                <div className="empty-state">
                                    <p>No jobs available at the moment.</p>
                                </div>
                            )}

                            <div className="view-all">
                                <button className="view-all-btn" onClick={() => navigate('/jobs')}>
                                    View All Jobs
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2 className="cta-title">Ready to start your journey?</h2>
                            <p className="cta-description">Join thousands of professionals who found their dream jobs through us</p>
                            <button className="cta-btn" onClick={() => navigate('/jobs')}>
                                Get Started Now
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
