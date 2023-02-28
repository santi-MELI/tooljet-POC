import React from 'react';

const Card = ({ title, src, handleClick, height = 50, width = 50, usePluginIcon = false }) => {
  const displayIcon = (src) => {
    return <img src={src} width={width} height={height} alt={title} />;
  };

  return (
    <div style={{ height: '112px', width: '164px' }} className="col-md-2 mb-4">
      <div
        className="card"
        role="button"
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
        data-cy={`data-source-${String(title).toLocaleLowerCase()}`}
      >
        <div style={!usePluginIcon ? { marginTop: '20px' } : {}} className="card-body">
          <center>
            {displayIcon(src)}
            <br></br>
            <br></br>
            <span>{title}</span>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Card;
