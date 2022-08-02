import { FacebookShareButton, FacebookIcon } from "react-share";
import React from "react";

const FacebookShare = ({ url, title, onSocialButtonClicked, socialType }) => {
    return (
        <FacebookShareButton
            url={`https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttp%253A%252F%252Fsifatul.github.io%252F%26quote%3DShare%2Band%2Bget%2Bamazing%2Bproducts&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_GB`}
            quote={title}
            onClick={() => onSocialButtonClicked(`${socialType||'button'} clicked.`)}
        >
            <FacebookIcon
                size={40}
                round
            />
        </FacebookShareButton>
    )
}

export default FacebookShare