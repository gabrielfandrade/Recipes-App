import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ history }) {
  return (
    <div>
      <Header title="Profile" condition={ false } history={ history } />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Profile;
