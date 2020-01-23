import React from 'react'
import './notification.scss'


const NotificationItem = () =>{
    return(
        <div className="notification__box">
            <div className="notification__wrapper">  
                {/* <img src="https://pbs.twimg.com/media/Cu0W9f5WIAAFupT.jpg" className="notification__img"/> */}
                <iframe src="https://gifer.com/embed/3z9a" width="480" height="240.000" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="notification__title">
                Ничего не найдено, попробуйте что-нибудь другое...
            </div>

        </div>
    )
}


export default NotificationItem