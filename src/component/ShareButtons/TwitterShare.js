import { TwitterShareButton, TwitterIcon } from "react-share";
import React from "react";


const TwitterShare = ({ url, title, onSocialButtonClicked, socialType }) => {
    return (
        <TwitterShareButton
            url={`https://twitter.com/share?url=http%3A%2F%2Fsifatul.github.io%2F&text=Share%20and%20get%20amazing%20products`}
            title={title}
            onClick={() => onSocialButtonClicked(`${socialType} clicked.`)}
        >
            <TwitterIcon
                size={40}
                round
            />
        </TwitterShareButton>
    )
}

export default TwitterShare;