import React from 'react';
import { message } from 'antd';

const ToastComponent = ({ type, title, description }) => {
  React.useEffect(() => {
    const key = message[type]({
      content: (
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      ),
      duration: 3000, 
    });

    return () => {
      message.destroy(key);
    };
  }, [type, title, description]);

  return null;
};

export default ToastComponent;
