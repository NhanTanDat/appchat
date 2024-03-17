import React from "react";
import { Container,Form, Stack} from "react-bootstrap";
import { Link } from "react-router-dom";
import avarter from "../../../assets/avarter.svg";
const FeedThink = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center',paddingTop: '20px'}}>
    <div style={{ paddingTop: '10px', paddingLeft: '15px', paddingBottom: '10px', paddingRight: '15px', backgroundColor: 'gray', width: '680px', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '10px' }}>
            <Link to="" className="link-light text-decoration-none">
                <img src={avarter} alt="person-circle" height="40px" style={{ paddingRight: '10px' }} />
            </Link>
            <Form.Control placeholder="Đạt ơi bạn đang nghỉ gì thế ?" style={{ borderRadius: '25px', height: '40px', fontSize: '18px', fontWeight: '500' }} />
        </div>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'red' }} />
        <div style={{ display: 'flex', alignItems: 'center', height: '55px', paddingLeft: '23px' }}>
            <Stack direction="horizontal">
                <Link to="" className="link-light text-decoration-none" style={{ marginRight: '80px' }}>
                    <img src={avarter} alt="person-circle" height="25px" style={{ paddingRight: '5px' }} />
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>Video trực tiếp</span>
                </Link>
                <Link to="" className="link-light text-decoration-none" style={{ marginRight: '80px' }}>
                    <img src={avarter} alt="person-circle" height="25px" style={{ paddingRight: '5px' }} />
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>Ảnh/video</span>
                </Link>
                <Link to="" className="link-light text-decoration-none">
                    <img src={avarter} alt="person-circle" height="25px" style={{ paddingRight: '5px' }} />
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>Cảm xúc/hoạt động</span>
                </Link>
            </Stack>
        </div>
    </div>
</div>
           
        
    )
}
export default FeedThink;