import React, { useState, useEffect } from 'react';
import { Container, Stack } from "react-bootstrap";

const Story = () => {
    return (
        <div style={{ display: 'flex', backgroundColor: 'green', height: '250px',justifyContent: 'center' }}>
        <div style={{ width: '680px' }}>
            <div style={{ backgroundColor: 'green', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div style={{ overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', display: 'flex', width: '100%' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ backgroundColor: 'greenyellow', width: '140px', height: '250px', borderRadius: '10px' }}></div>
                        <div style={{ backgroundColor: 'black', width: '140px', height: '250px', borderRadius: '10px' }}></div>
                        <div style={{ backgroundColor: 'blue', width: '140px', height: '250px', borderRadius: '10px' }}></div>
                        <div style={{ backgroundColor: 'burlywood', width: '140px', height: '250px', borderRadius: '10px' }}></div>
                        <div style={{ backgroundColor: 'burlywood', width: '140px', height: '250px', borderRadius: '10px' }}></div>
                        <div style={{ backgroundColor: 'burlywood', width: '140px', height: '250px', borderRadius: '10px' }}></div>
                        <div style={{ backgroundColor: 'burlywood', width: '140px', height: '250px', borderRadius: '10px' }}></div>
                        <div style={{ backgroundColor: 'burlywood', width: '140px', height: '250px', borderRadius: '10px' }}></div>
                        <div style={{ backgroundColor: 'burlywood', width: '140px', height: '250px', borderRadius: '10px' }}></div>
                        <div style={{ backgroundColor: 'burlywood', width: '140px', height: '250px', borderRadius: '10px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    )
}
export default Story;