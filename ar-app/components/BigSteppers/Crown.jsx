import React from 'react';

const Crown = () => {
  return (
    <div style={{ margin: '0px', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%'}}>
        <a rel="ar" href="https://d13wrvtzk1buxr.cloudfront.net/usdz/BigSteppers/crown.usdz">
          <img style={{width: '20%'}} src='https://d13wrvtzk1buxr.cloudfront.net/usdz/BigSteppers/kendrick.png'/>
          <p style={{fontSize: '32pt', fontWeight: 'bolder' }}>THAT'S WHAT I CALL LOVE</p>
        </a>
      </div>
      <audio src='https://d13wrvtzk1buxr.cloudfront.net/usdz/BigSteppers/crown.mp3' controls autoPlay />
    </div>
  ); 
};

export default Crown;