import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './noticeboard.css';

function NoticeBoard() {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/fetchAnnouncements');
                setAnnouncements(response.data.announcements);
            } catch (error) {
                console.error('Error fetching announcements:', error);
                setAnnouncements([]); 
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="notice-board">
            <h2>Notice Board</h2>
            <div className="notices">
                {announcements.map((announcement) => (
                    <div className="notice-item" key={announcement._id}>
                        <h4>{announcement.title}</h4>
                        <p>{announcement.description}</p>
                      
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NoticeBoard;
