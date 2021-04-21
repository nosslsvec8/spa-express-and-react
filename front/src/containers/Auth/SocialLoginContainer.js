import React, {useCallback} from 'react';
import {useMutation} from 'react-query';
import {socialLoginRequest} from "../hooks/crud";
import SocialButton from "../../components/Buttons/SocialButton";

function SocialLoginContainer({provider, appId, buttonText}) {
    const {mutate: user} = useMutation(socialLoginRequest);

    const onSubmit = useCallback(async formData => {
        try {
            await user(formData);
        } catch (e) {
            console.log(e);
        }
    }, [user]);

    const handleSocialLoginFailure = (err) => {
        console.error(err)
    };

    return (
        <div>
            <SocialButton
                provider={provider}
                appId={appId}
                onLoginSuccess={onSubmit}
                onLoginFailure={handleSocialLoginFailure}
            >
                {buttonText}
            </SocialButton>
        </div>
    );
}

export default SocialLoginContainer;
