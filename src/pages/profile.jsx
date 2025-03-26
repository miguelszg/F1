import Navbar from '../layouts/navbar';
import '../css/profile.css';
import profile from '../assets/profile.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogout = (e) => {
        e.preventDefault();
        navigate('/');
    };
    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/home');
    };

    const handleSave= (e) => {
        e.preventDefault();
        navigate('/home');
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="page-container1">
            <Navbar />
            <div className="profile-content">
                <div className="profile-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="save-btn"onClick={handleSave}>Save</button>
                        </div>
                        <div className="logout-container">
                             <button type="button" className="logout-btn" onClick={handleLogout}>Log Out</button>
                        </div>
                    </form>
                </div>
                <div className="profile-image-container">
                    <img className='profile-image' src={profile} alt="Profile" />
                </div>
            </div>
        </div>
    );
}

export default Profile;