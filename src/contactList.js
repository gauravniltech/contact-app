import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class ContactList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }
    updateQuery(query){
        this.setState({
            query: query.trim()
        })
    }
    render() {
        const {query} = this.state
        const {contacts, onDeleteContact} = this.props
        const showingContacts = query === ''?contacts: contacts.filter(c=> c.name.toLowerCase().includes(query.toLowerCase()))
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input className='search-contacts' type='text' placeholder='Search Contact' value={this.state.query}
                    onChange={(event => this.updateQuery(event.target.value))}
                    />
                    <Link to='/create' className='add-contact'>Add Contact</Link>
                </div>
                {showingContacts.length !== contacts.length &&(
                    <div className='showing-contacts'>
                        <span>Now Showing {showingContacts.length} of {contacts.length}</span>
                        <button onClick={() => this.updateQuery('')}>Show All</button>
                    </div>
                ) }
                <ol className='contact-list'>
                    {showingContacts.map(((contact) => {
                        return (
                            <li key={contact.id} className='contact-list-item'>
                                <div className='contact-avatar' style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}>
                                </div>
                                <div className='contact-details'>
                                    <p>{contact.name}</p>
                                    <p>{contact.handle}</p>
                                </div>
                                <button className='contact-remove' onClick={() => onDeleteContact(contact)}>
                                    remove
                                </button>
                            </li>
                        )
                    }))}
                </ol>
            </div>
        )
    }
}

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired

}

export default ContactList
