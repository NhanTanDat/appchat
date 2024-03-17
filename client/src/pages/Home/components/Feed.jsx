import React from "react";
import Story from "./Story";
import FeedThink from "./FeedThink";
import Posts from "./Posts";

const Feed = () => {
    return (
        <div style={{flex: 6,height:'850px'}}>
            <div style={{  overflowY: 'auto',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none', height: '100%'}}>
                <div style={{ }}>
                    <Story></Story>
                    <FeedThink/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                </div>
            </div>
        </div>
    )
}

export default Feed;