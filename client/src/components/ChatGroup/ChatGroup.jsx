import React, { useState,useContext,useRef } from 'react';
import "./ChatGroup.css"
import { AuthContext } from "../../context/AuthContext";
import icon2 from "../../assets/Frame 958477824.png"
const ChatGroup = ({ onClose, friends ,createGroupChat,user }) => {
    const fileInputRef = useRef(null);
   
    const [searchInput, setSearchInput] = useState("");
    const [nameGroup, setnameGroup] = useState("");
    const [listgroup, setlistgroup] = useState([user]);
    const [isshow, setisshow] = useState(false);
    const [img, setImg] = useState(null);

    const handleChange = () => {
        if (listgroup.length < 2 ){
            setisshow(true);
        }else{
            createGroupChat(listgroup,nameGroup,img);
            window.location.reload();
        }
    }
    const handleSearch = () => {
        setSearchInput(event.target.value);
    };
    const handleInputChange = (event) => {
        setnameGroup(event.target.value);
    };
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const getFileType = (fileName) => {
        const extension = fileName.split(".").pop().toLowerCase();
        if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
          console.log("image")
          return "image";
          
        } else if (["mp4", "avi", "mov", "wmv"].includes(extension)) {
          console.log("video")
          return "video";
          
        } else {
          console.log("unknown")
          return "unknown";
        }
      };
    const handleFileSelect = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
          const fileType = getFileType(file.name);
          if (fileType === "image") {
            setImg(file);
            console.log("img",img)
          } else if (fileType === "video") {
           
          } else {
            // Xử lý khi là tệp không xác định
          }
        }   
      };
    return (
        <div className="popup">
            <div className="popup-container">
                <div className="popup-content">
                    {friends ? (
                        <>
                    <div className="popup-button">
                        <div id="close-btn" onClick={onClose}>X</div>
                    </div>
                    <div  style={{ display:"flex", alignItems:"center", marginBottom:"16px"}}>
                    {img && (
                    <div>
                        <li style={{ position: "relative", display: "inline-block"}}>
                        <img src={URL.createObjectURL(img)}  style={{ borderRadius: "50%" ,width:"70px", height:"70px"}} />
                        <button
                            onClick={() => setImg(null)}
                            style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            border: "none",
                            cursor: "pointer"
                            }}
                        >
                            X
                        </button>
                        </li>
                    </div>
                    )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileSelect}
                            multiple
                            />
                        {img ? ("") : (<button className="file-btn" onClick={handleButtonClick}>
                            <img src={icon2} alt="file" />
                        </button>)}
                        
                        <div className="content-reseach"  style={{ width: "100%",paddingLeft:"16px"}}>
                            <input
                                style={{ width: "100%"}}
                                type="text"
                                value={nameGroup}
                                onChange={handleInputChange}
                                placeholder="Nhập tên nhóm"
                            />
                        </div>
                    </div>
                    <div className="content-reseach">
                        <input
                            style={{ width: "100%" }}
                            type="text"
                            value={searchInput}
                            onChange={handleSearch}
                            placeholder="Nhập số điện thoại, email hoặc tên"
                        />
                    </div>
                    <div style={{ marginTop: "16px" }}>
                        <div >Tạo nhóm</div>
                        {isshow === true ? (  <div  style={{ marginTop: "16px"}} >Bạn phải chọn ít nhất 2 người để tạo nhóm</div>):""}
                     
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", maxHeight: "40vh", overflowY: "auto" }}>
                        {listgroup && listgroup.map((item, index) => (
                            <div>
                            {index !== 0 && ( // Kiểm tra xem phần tử có phải là phần tử đầu tiên không
                                <div key={index} style={{ width: "100%", display: "flex", marginTop: "16px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                    <img style={{ width: "40px", height: "40px", borderRadius:"50%" }} src={item.avatar}/>
                                    <div style={{ paddingLeft: "16px" }}>
                                        <div>{item.name}</div>
                                        <div>{item.email}</div>
                                    </div>
                                    </div>
                                    <div onClick={() => setlistgroup(prevList => prevList.filter(member => member !== item))}>loại bỏ</div>
                                </div>
                                </div>
                                
                            )}
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
                                        <img style={{ width: "40px", height: "40px", borderRadius:"50%" }} src={item.avatar}/>
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
                    </>): <>Hãy kết bạn để tạo nhóm nhé !!</>}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                        <div style={{ marginRight: "10px" }} onClick={onClose}>Đóng</div>
                        {friends&& (<div onClick={()=> 
                        
                            handleChange()
                        }
                       
                        >Tạo Nhóm</div>)}
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default ChatGroup;
