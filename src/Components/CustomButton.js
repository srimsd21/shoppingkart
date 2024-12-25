import React from 'react';

function CustomButton({ isDisabled, loading, onClick }) {
  return (
    <button
      type="button"
      className={` py-2   w-100 ${isDisabled || loading ? 'btn-disabled' : 'submit-btn'}`}
      onClick={onClick}
      disabled={isDisabled || loading}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      )}
      Continue
    </button>
  );
}

export default CustomButton;
