import React, { useState,useContext,useEffect } from 'react';
import './ProfileCard.css';
import { AuthContext } from "../../context/AuthContext";
import anhbia from '../../assets/2_1569228369739_53127.jpg'; 
import eidit from '../../assets/edit-2.svg';


const AccountInformation = () => {
    const { user,getUserInformation,userInfor } = useContext(AuthContext);

    
    useEffect(() => {
        getUserInformation(user._id)
      }, []);

    return (
        <div className="popup">
        <div className="popup-container">
            <div className="popup-content">
            <div className="profile-header">
                <span>Thông tin tài khoản</span>
            </div>
            <div >
            <img style={{width:"100%", height:"172px", marginTop:"16px"}} src={anhbia} alt="profile" />
            </div>
            <div className="profile-details">
                <div className="profile-picture">
                    <img src={userInfor?.avatar} alt="profile" />
                    <button className="profile-picture-edit">
                    <img src={eidit} />
                    </button>
                </div>
                <div className="profile-name">
                    <span>{userInfor?.name}</span>
                    <button className="profile-name-edit">
                        <img src={eidit} />
                    </button>
                </div>
                <div className="personal-info">
                    <div className="info-item">
                        <span className="info-label">Giới tính</span>
                        <span className="info-value">Nam</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Ngày sinh</span>
                        <span className="info-value">20 tháng 10, 1997</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Điện thoại</span>
                        <span className="info-value">{userInfor?.phone}</span>
                    </div>
                </div>
                <button className="update-button" style={{marginTop: "16px"}}>Cập nhật</button>
            </div>
        </div>
            </div>
        </div>
    

    );
}
export default AccountInformation;