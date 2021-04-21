import React from 'react'
import SocialLogin from 'react-social-login'

class SocialButton extends React.Component {
    render() {
        return (
            <span onClick={this.props.triggerLogin} {...this.props} className='link'>
                {this.props.children}
            </span>
        );
    }
}

export default SocialLogin(SocialButton);
