import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LeaderboardPage.css";
import logo from "../../assets/launchpad_logo.svg";

function LeaderboardPage() {
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

  const handleSubmitHire = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Hiring request submitted:", {
      candidate: selectedUser,
      ...hireFormData,
    });

    // Show success message or handle the response
    alert(
      `Your hiring request for ${selectedUser.full_name} has been submitted!`
    );
    handleCloseModal();
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

  return (
    <div className="leaderboard">
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <Link to="/">
            <img className="logo" src={logo} alt="LaunchPad Kerala logo" />
          </Link>
          <h1 className="cluster-title">
            {getClusterDisplayName()} Leaderboard
          </h1>
        </div>

        {loading ? (
          <div className="loading">Loading leaderboard data...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <>
            <div className="table-container">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>MUID</th>
                    <th>Category Karma</th>
                    <th>Total Karma</th>
                    <th>Interest Groups</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((user, index) => (
                    <tr
                      key={user.muid}
                      className={index < 3 ? `top-${index + 1}` : ""}
                    >
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>{user.full_name}</td>
                      <td>{user.muid}</td>
                      <td>{user.category_karma.toLocaleString()}</td>
                      <td>{user.total_karma.toLocaleString()}</td>
                      <td>
                        <div className="interest-groups">
                          {user.ig_data.map((ig) => (
                            <div key={ig.ig_id} className="interest-group">
                              <span className="ig-name">{ig.ig_name}</span>
                              <span className="ig-karma">
                                {ig.ig_karma.toLocaleString()}
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

            <div className="pagination">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Hire Me Modal */}
      {showHireModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Hire {selectedUser.full_name}</h2>
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
                    placeholder={`Tell us why you're interested in hiring ${selectedUser.full_name}`}
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
    </div>
  );
}

export default LeaderboardPage;
