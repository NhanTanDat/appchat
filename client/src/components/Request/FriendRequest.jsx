import React, { useState,useContext } from 'react';
import "./FriendRequest.css"
import { AuthContext } from "../../context/AuthContext";
const FriendRequest = ({ onClose, data ,datafriendRequests }) => {
    const {requestFriend,acceptFriendRequest} =
    useContext(AuthContext);
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        console.log("Dữ liệu tìm kiếm:", searchInput);
    };

    return (
        <div className="popup">
            <div className="popup-container">
                <div className="popup-content">
                    <div className="popup-button">
                        <div id="close-btn" onClick={onClose}>X</div>
                    </div>
                    <div className="content-reseach">
                        <input
                            style={{ width: "100%" }}
                            type="text"
                            value={searchInput}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại, email hoặc tên"
                        />
                    </div>
                    <div style={{ marginTop: "16px" }}>
                        <div>Lời mời kết bạn</div>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", maxHeight: "40vh", overflowY: "auto" }}>
                            {datafriendRequests && datafriendRequests.map((item, index) => (
                                <div key={index} style={{ width: "100%", display: "flex", marginTop: "16px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                        <img style={{ width: "40px", height: "40px", borderRadius:"50%" }} src={item.avatar}/>
                                            <div style={{ paddingLeft: "16px" }}>
                                                <div>{item.name}</div>
                                                <div>{item.email}</div>
                                            </div>
                                        </div>
                                        <div onClick={() => {acceptFriendRequest(item.id)
                                            window.location.reload()}}>Chấp nhận</div>
                                    </div>
                                </div>
                            ))}
                            {
                                datafriendRequests ? <></> : <div>Bạn không có lời mời kết bạn nào</div>
                            }
                        </div>
                    </div>
                    <div style={{ marginTop: "16px" }}>
                        <div>Có thể bạn quen biết</div>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", maxHeight: "40vh", overflowY: "auto" }}>
                            {data && data.map((item, index) => (
                                <div key={index} style={{ width: "100%", display: "flex", marginTop: "16px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img style={{ width: "40px", height: "40px", borderRadius:"50%" }} src={item.avatar}/>
                                            <div style={{ paddingLeft: "16px" }}>
                                                <div>{item.name}</div>
                                                <div>{item.email}</div>
                                            </div>
                                        </div>
                                        <div onClick={() => {requestFriend(item._id)
                                         window.location.reload()}}>Kết bạn</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                        <div style={{ marginRight: "10px" }} onClick={onClose}>Đóng</div>
                        <div onClick={handleSearch}>Tìm kiếm</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendRequest;
