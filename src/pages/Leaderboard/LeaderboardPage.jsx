import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./LeaderboardPage.css";
import Spinner from "../components/Spinner";

function LeaderboardPage() {
  // Existing state variables
  const { cluster } = useParams();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showHireModal, setShowHireModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hireFormData, setHireFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // New state for thanks modal
  const [showThanksModal, setShowThanksModal] = useState(false);

  // Other existing functions and useEffect...
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dev.mulearn.org/api/v1/launchpad/ig-leaderboard/?category=${cluster}&page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.hasError) {
          throw new Error(
            data.message?.general?.join(", ") || "Failed to fetch data"
          );
        }

        setLeaderboardData(data.response.data);
        setTotalPages(data.response.pagination.totalPages);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching leaderboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [cluster, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleHireClick = (user) => {
    setSelectedUser(user);
    setShowHireModal(true);
  };

  const handleCloseModal = () => {
    setShowHireModal(false);
    setSelectedUser(null);
    setHireFormData({
      companyName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHireFormData({
      ...hireFormData,
      [name]: value,
    });
  };

  // Updated submit handler to show thanks modal instead of alert
  const handleSubmitHire = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Hiring request submitted:", {
      candidate: selectedUser,
      ...hireFormData,
    });

    // Close hire modal and show thanks modal
    setShowHireModal(false);
    setShowThanksModal(true);

    // Automatically close thanks modal after 5 seconds
    setTimeout(() => {
      setShowThanksModal(false);
      setSelectedUser(null);
      setHireFormData({
        companyName: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 5000);
  };

  // Function to close thanks modal
  const handleCloseThanksModal = () => {
    setShowThanksModal(false);
    setSelectedUser(null);
    setHireFormData({
      companyName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  // Function to get the cluster display name
  const getClusterDisplayName = () => {
    switch (cluster) {
      case "coder":
        return "Coders";
      case "maker":
        return "Makers";
      case "manager":
        return "Managers";
      case "creative":
        return "Creative";
      default:
        return cluster;
    }
  };

  // Function to render profile picture or fallback icon
  // const renderProfilePicture = (user) => {
  //   if (user.profile_pic) {
  //     return (
  //       <img
  //         src={user.profile_pic}
  //         alt={`${user.full_name}'s profile`}
  //         className="profile-picture"
  //       />
  //     );
  //   } else {
  //     // Person circle icon as SVG
  //     return (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         className="profile-icon"
  //       >
  //         <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
  //         <path d="M12 15a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5s5 2.24 5 5a5 5 0 0 1-5 5z"></path>
  //         <path d="M18.13 17.83A9.36 9.36 0 0 1 12 20c-2.24 0-4.26-.84-5.85-2.19"></path>
  //       </svg>
  //     );
  //   }
  // };

  return (
    <div className="leaderboard">
      <div className="breadcrumb-navigation">
        <a href="/" className="breadcrumb-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="breadcrumb-icon"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Home</span>
        </a>
      </div>
      <div className="leaderboard-container">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <>
            <h1 className="cluster-title">{getClusterDisplayName()}</h1>

            <div className="table-controls">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="search-input"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="search-icon"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>

              <div className="pagination">
                <button
                  className="arrow-button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="arrow-icon"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="arrow-button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="arrow-icon"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Total Karma</th>
                    <th>Interest Groups</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData
                    .filter((user) =>
                      user.full_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((user, index) => (
                      <tr
                        key={user.muid}
                        className={index < 3 ? `top-${index + 1}` : ""}
                      >
                        <td>{(currentPage - 1) * 10 + index + 1}</td>

                        <td className="user_full_name">{user.full_name}</td>
                        <td>
                          {user.total_karma > 1000
                            ? `${(user.total_karma / 1000).toFixed(1)}K `
                            : user.total_karma}
                          <span
                            className={
                              "font-sans font-bold text-xl pl-1 -translate-y-1 text-[#1B1A1E]"
                            }
                          >
                            ϰ
                          </span>
                        </td>
                        <td>
                          <div className="interest-groups">
                            {user.ig_data.map((ig) => (
                              <div key={ig.ig_id} className="interest-group">
                                {/* Shorten and format the interest group name for better display */}
                                <span className="ig-name">
                                  {ig.ig_name ===
                                  "Internet Of Things (IOT) And Robotics"
                                    ? "IoT & Robotics"
                                    : ig.ig_name}
                                </span>
                                <span className="ig-karma">
                                  {ig.ig_karma > 1000
                                    ? `${(ig.ig_karma / 1000).toFixed(1)}K `
                                    : ig.ig_karma}
                                  <span className="font-sans font-bold text-lg pl-1 -translate-y-1 text-[#1B1A1E]">
                                    ϰ
                                  </span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>
                          <button
                            className="hire-button"
                            onClick={() => handleHireClick(user)}
                          >
                            Hire Me
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Hire Me Modal */}
      {showHireModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>
                <span className="hire-text">Hire</span> {selectedUser.full_name}
              </h2>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitHire}>
                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={hireFormData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={hireFormData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={hireFormData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={hireFormData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Thanks Modal for Employers */}
      {showThanksModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-container thanks-modal">
            <div className="modal-header">
              <h2>Thank You!</h2>
              <button className="modal-close" onClick={handleCloseThanksModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="thanks-content">
                <div className="thanks-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4caf50"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="thanks-check-icon"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="thanks-title">Request Received!</h3>
                <p className="thanks-message">
                  Thank you for your interest in recruiting talent from
                  Launchpad, {hireFormData.companyName}!
                </p>
                <button
                  className="close-thanks-button"
                  onClick={handleCloseThanksModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
