import React from 'react';
import { Route, Link, NavLink } from  'react-router-dom';
import MessageContainer from './../message/message_container';
import ChatroomContainer from './../chatroom/chatroom_container';
import ChatroomModal from './../modal/chatroom_modal';
import DirectMessagingContainer from './../direct_messaging/direct_messaging_container';
import UserIndex from './user_index';
import DMMessageContainer from './../direct_messaging/dm_message_container';
import DMUserIndex from './../direct_messaging/dm_user_index';
import EditModal from './../modal/edit_modal';
import FontAwesome from 'react-fontawesome';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleClick() {
    this.props.requestLogout();
  }

  handleEdit() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  componentDidMount() {
    this.props.requestAllChatrooms();
  }

  render() {
    if (this.props.currentUser) {

      return (
      <div className="home_container">

        {/* Left to Right */}
        <div className="home_outer_sidebar_left">
          <div className="left_words">Direct Messaging</div>
          <div className="dms_wrapper">

          {/*DM Icon*/}
          { (this.props.directMessages.length > 0) ? (
              <NavLink to={`/direct_messages/${this.props.directMessages[0].id}`}>
                <div className="dms" ></div>
              </NavLink>
          ) : (
            <NavLink to={`/direct_messages`}>
              <div className="dms"></div>
            </NavLink>
          )}

        </div>

          <div className="left_words">Channels</div>
          <div className="channel_wrapper">

          {/* Chatroom Icon */}
          { (this.props.directMessages.length > 0) ? (
            <NavLink to={`/chatrooms/${this.props.chatrooms[0].id}`}>
              <div className="channels"></div>
            </NavLink>
          ) : (
            <NavLink to={`/chatrooms`}>
              <div className="channels"></div>
            </NavLink>
          )}
        </div>



        </div>


        {/* 2nd leftmost container (holds chatroom index or dm index) */}
        <div className="home_inner_sidebar_left">
          <Route path="/chatrooms" component={ ChatroomContainer } />
          <Route path="/direct_messages" component={ DirectMessagingContainer } />

          {/* User profile at the bottom of the index */}
          <div className="logout">
            <div className="user_info">
              <div className="icon_2" />

            <div className="username_and_id_wrapper">
              <span className="username">
                { this.props.currentUser.username }
              </span>
              <span className="userid">
                #{ this.props.currentUser.id }
              </span>
            </div>

            <EditModal
              isOpen={this.state.modalOpen}
              handleClose={this.handleEdit}
              currentUser={this.props.currentUser} />

            </div>

            <div className='edit-icon' onClick={ this.handleEdit }>
              <FontAwesome name='cog' size='2x' />
            </div>

            <button className="logout_button" onClick={ this.handleClick }>Logout</button>
          </div>
        </div>

        {/* Messages */}
        <div className="home_message_container">
          <ChatroomModal />
          <Route exact path="/chatrooms/:chatroomsId" component={ MessageContainer } />
          <Route exact path="/direct_messages/:directmessagesId" component={ DMMessageContainer } />
        </div>

        <div className="home_sidebar_right">
          <Route path="/chatrooms" component={ UserIndex } />
          <Route path="/direct_messages/:directmessagesId" component={ DMUserIndex } />
        </div>
        {/*Ends here*/}


      </div>
      );
    } else {
      return null;
    }
  }
}

export default Home;
