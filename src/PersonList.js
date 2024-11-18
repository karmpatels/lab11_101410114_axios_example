import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './App.css';

class PersonList extends Component {
    state = {
        persons: [],
        showModal: false,
        selectedPerson: null
    };

    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
            .then(res => {
                console.log(res.data);
                const persons = res.data.results;
                this.setState({ persons });
            });
    }

    // Function to handle opening the modal and setting the selected person
    handleShowDetails = (person) => {
        this.setState({ showModal: true, selectedPerson: person });
    };

    // Function to handle closing the modal
    handleClose = () => {
        this.setState({ showModal: false, selectedPerson: null });
    };

    render() {
        const { persons, showModal, selectedPerson } = this.state;

        return (
            <div className="container">
                <h2 className="text-center mt-3">Agent List</h2>
                {persons.map((person, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-body d-flex align-items-center">
                            <img 
                                src={person.picture.large} 
                                alt={`${person.name.first} ${person.name.last}`} 
                                className="profile-img"
                            />
                            <div className="ml-3">
                                <h5 className="card-title">{person.name.title} {person.name.first} {person.name.last}</h5>
                                <p className="card-text">Username: {person.login.username}</p>
                                <p className="card-text">Gender: {person.gender.toUpperCase()}</p>
                                <p className="card-text">Email: {person.email}</p>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => this.handleShowDetails(person)}
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Modal for showing user details */}
                <Modal show={showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agent Details</Modal.Title>
                    </Modal.Header>
                    {selectedPerson && (
                        <Modal.Body>
                            <img 
                                src={selectedPerson.picture.large} 
                                alt={`${selectedPerson.name.first} ${selectedPerson.name.last}`} 
                                className="profile-img mb-3"
                            />
                            <h5>{selectedPerson.name.title} {selectedPerson.name.first} {selectedPerson.name.last}</h5>
                            <p><strong>Username:</strong> {selectedPerson.login.username}</p>
                            <p><strong>Gender:</strong> {selectedPerson.gender.toUpperCase()}</p>
                            <p><strong>Time Zone Description:</strong> {selectedPerson.location.timezone.description}</p>
                            <p><strong>Address:</strong> {selectedPerson.location.street.number} {selectedPerson.location.street.name}, 
                                    {selectedPerson.location.city}, {selectedPerson.location.state}, {selectedPerson.location.country} - 
                                    {selectedPerson.location.postcode}</p>
                            <p><strong>Email:</strong> {selectedPerson.email}</p>
                            <p><strong>Birth Date and Age:</strong> {new Date(selectedPerson.dob.date).toLocaleDateString()} ({selectedPerson.dob.age} years)</p>
                            <p><strong>Phone:</strong> {selectedPerson.phone}</p>
                            <p><strong>Cell:</strong> {selectedPerson.cell}</p>
                            <p><strong>Location:</strong> {selectedPerson.location.city}, {selectedPerson.location.state}, {selectedPerson.location.country}</p>
                            <p><strong>Registered Date:</strong> {new Date(selectedPerson.registered.date).toLocaleDateString()}</p>
                        </Modal.Body>
                    )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default PersonList;