import React, { useState,useContext } from 'react';
import "./ChatGroup.css"
import { AuthContext } from "../../context/AuthContext";
const ChatGroup = ({ onClose, friends  }) => {
    
    const [searchInput, setSearchInput] = useState("");
    const [listgroup, setlistgroup] = useState([]);

    const handleChange = (e) => {
        console.log(data);
    }
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
                        <div>Tạo nhóm</div>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", maxHeight: "40vh", overflowY: "auto" }}>
                            {listgroup && listgroup.map((item, index) => (
                                <div key={index} style={{ width: "100%", display: "flex", marginTop: "16px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img style={{ width: "24px", height: "24px" }} />
                                            <div style={{ paddingLeft: "16px" }}>
                                                <div>{item.name}</div>
                                                <div>{item.email}</div>
                                            </div>
                                        </div>
                                        <div onClick={() => setlistgroup(prevList => prevList.filter(member => member !== item))}>loại bỏ</div>
                                    </div>
                                </div>
                            ))}
                           
                        </div>
                    </div>
                    <div style={{ marginTop: "16px" }}>
                    <div>Bạn bè của bạn</div>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", maxHeight: "40vh", overflowY: "auto" }}>
                            {friends && friends.friends.map((item, index) => (
                                <div key={index} style={{ width: "100%", display: "flex", marginTop: "16px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img style={{ width: "24px", height: "24px" }} />
                                            <div style={{ paddingLeft: "16px" }}>
                                                <div>{item.name}</div>
                                                <div>{item.email}</div>
                                            </div>
                                        </div>
                                        <div onClick={() => {
                                        // Kiểm tra xem item đã tồn tại trong listgroup chưa
                                        if (!listgroup.includes(item)) {
                                            // Nếu chưa tồn tại, thêm vào mảng listgroup
                                            setlistgroup(prevList => [...prevList, item]);
                                        }
                                    }}>{setlistgroup[item] ? "Đã thêm" : "Thêm vào"}</div>
                                    </div>
                                </div>
                            ))}
                           
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                        <div style={{ marginRight: "10px" }} onClick={onClose}>Đóng</div>
                        <div onClick={()=>handleChange()}>Tạo Nhóm</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatGroup;
