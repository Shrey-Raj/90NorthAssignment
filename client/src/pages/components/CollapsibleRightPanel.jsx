import React from 'react';

const RightPanel = ({ users, userEmail, sendRequest, sentRequests }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title sora-semibold mb-4">Discover New Connections</h5>
        <ul className="list-group list-group-flush">
          {users
            .filter(user => user.email !== userEmail)
            .map(user => (
              <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={`https://i.pravatar.cc/40?u=${user.email}`} className="rounded-circle me-3" alt={user.username} />
                  <div>
                    <h6 className="mb-0 sora-medium">{user.username}</h6>
                    <small className="text-muted quicksand-regular">{user.email}</small>
                  </div>
                </div>
                <button
                  className={`btn btn-sm ${sentRequests.includes(user.id) ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => sendRequest(user.id)}
                  disabled={sentRequests.includes(user.id)}
                >
                  {sentRequests.includes(user.id) ? "Request Sent" : "Send Request"}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default RightPanel;

