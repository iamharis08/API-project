import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import '../SpotDetailsPage/SpotDetails.css';


function EditButton({ setShowEditModal, user}) {
    const handleClick = (e) => {
        e.preventDefault();
        setShowEditModal(true)
     
    }
    return (
        <div className="edit-spot-button" onClick={handleClick}>
            Edit
          </div>
    );
}

export default EditButton
