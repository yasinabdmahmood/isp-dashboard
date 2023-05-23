import React from 'react';
import { ColorRing } from 'react-loader-spinner'

function LoadingRing( props ) {
    return (
        <div>
            <ColorRing
                visible={props.loading}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={props.style}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
    );
}

LoadingRing.defaultProps = {
    loading: false,
    style: {
        position: 'absolute',
        left:'50%',
        top:'50%',
    },
  };

export default LoadingRing;