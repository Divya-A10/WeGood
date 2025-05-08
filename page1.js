import React from 'react';

const Page1 = () => {
  return (
    <div style={{ width: 1434, height: 804, position: 'relative', background: '#6FA86A' }}>
      <div style={{ width: 1000, height: 42, paddingTop: 16, paddingBottom: 8, paddingRight: 8, left: 29, top: 0, position: 'absolute', background: '#6FA86A', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
        <div style={{ alignSelf: 'stretch', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '700', wordWrap: 'break-word' }}>
          6.How often do you feel anxious or worried?
        </div>
      </div>
      {/* Add the rest of the divs for options like Rarely or never, Sometimes, etc. */}
    </div>
  );
};

export default Page1;
