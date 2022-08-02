import { LinkedinShareButton, LinkedinIcon } from "react-share";
import React from "react";

const LinkedinShare = ({ url, title, onSocialButtonClicked, socialType }) => {
    return (
        <LinkedinShareButton
            url={`https://www.linkedin.com/shareArticle?url=http%3A%2F%2Fsifatul.github.io%2F&mini=true`}
            quote={title}
            onClick={() => onSocialButtonClicked(`${socialType||'button'} clicked.`)}
        >
            <LinkedinIcon
                size={40}
                round
            />
        </LinkedinShareButton>
    )
}

export default LinkedinShare;