import React from 'react';
import BB84Animation from '../Components/BB84Animation';
import ProtocolArticle from './ProtocolArticle';

const BB84Page = () => {
  return (
    <div className="bb84-page-container">
      <BB84Animation />
      <ProtocolArticle protocol="BB84" />
    </div>
  );
};

export default BB84Page;
