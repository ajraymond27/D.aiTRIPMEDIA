import React from 'react';

const Crown = () => {
  return (
    <div style={{ margin: '0px', overflow: 'hidden', textAlign: 'center', backgroundColor: 'black' }}>
      <div>
        <a rel="ar" href="https://d13wrvtzk1buxr.cloudfront.net/usdz/BigSteppers/crown.usdz">
          <p style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: '32pt', fontWeight: 'bolder' }}>WEAR THE CROWN</p>
        </a>
      </div>
      <audio src="https://d13wrvtzk1buxr.cloudfront.net/usdz/BigSteppers/crown.mp3" controls autoPlay />
    </div>
  ); 
};

export default Crown;