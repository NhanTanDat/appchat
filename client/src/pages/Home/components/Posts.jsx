import React from "react";
import anh from "../../../assets/432738642_1508949396349173_8904474265655273318_n.jpg";
import avarter from "../../../assets/avarter.svg";
import tym from "../../../assets/Heart.svg";
import like from "../../../assets/ThumbsUp.svg";
import cm from "../../../assets/ChatCircle.svg";
import DotsThreeOutlineVertical from "../../../assets/DotsThreeOutlineVertical.svg";
import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";
const Posts = () => {
    return (
        <div style={{ display:'flex',paddingTop: '20px', justifyContent: 'center'}}>
            <div style={{ backgroundColor: 'red',  width:'680px' , borderRadius:'10px'}}>  
                <div style={{display: 'flex',justifyContent: 'space-between',padding:'10px'}}>
                    <Link to="/profile" className="link-light text-decoration-none" style={{ display: 'flex', marginRight: '80px' }}>
                        <img src={avarter} alt="person-circle" height="40px" style={{ paddingRight: '5px' }} />
                        <Stack style={{paddingTop: '3px'}}>
                            <a style={{ fontSize: '15px', fontWeight: '500' }}>Phương Thảo</a>
                            <a style={{ fontSize: '10px', fontWeight: '500' }}>9 giờ</a>
                        </Stack>
                    </Link>
                    <div style={{paddingTop: '10px'}}>
                        <img src={DotsThreeOutlineVertical} alt="person-circle" height="20px" style={{ paddingRight: '5px' }} />
                        <img src={DotsThreeOutlineVertical} alt="person-circle" height="20px" style={{ paddingRight: '5px' }} />
                    </div>
                </div>
                <div style={{ paddingLeft:'10px'}}>
                    <a style={{ fontSize: '15px', fontWeight: '600' }}>heheehehehehehehehehehuhhuhu hihi</a>
                </div>
                <div style={{ paddingTop:'5px'}}>
                    <img src={anh} alt="person-circle"  style={{ width:'100%' }} />
                </div>
                <div style={{ paddingTop:'5px', display: 'flex',justifyContent: 'space-between', padding: '10px'}}>
                    <a style={{ fontSize: '15px', fontWeight: '600' }}>11,7k lượt thích</a>
                    <div>
                        <a style={{ fontSize: '15px', fontWeight: '600' }}>56 bình luận</a>
                        <a style={{ fontSize: '15px', fontWeight: '600', paddingLeft: '10px'}}>11,7k lượt chia sẻ</a>
                    </div>
                </div>
                <div style={{ padding:'5px', display:'flex',justifyContent: 'center',gap: '120px'}}>
                        <div>
                            <img src={like} alt="person-circle" height="27px" style={{ paddingRight: '5px' }} />
                            <a style={{ fontSize: '15px', fontWeight: '600' }}>Thích</a>
                        </div>
                        <div>
                            <img src={cm} alt="person-circle" height="27px" style={{ paddingRight: '5px' }} />
                            <a style={{ fontSize: '15px', fontWeight: '600' }}>Bình luận</a>
                        </div>
                       <div>
                            <img src={tym} alt="person-circle" height="27px" style={{ paddingRight: '5px' }} />
                            <a style={{ fontSize: '15px', fontWeight: '600' }}>Chia sẽ</a>
                       </div>
                       
                </div>
            </div>
        </div>
    )
}
export default Posts;