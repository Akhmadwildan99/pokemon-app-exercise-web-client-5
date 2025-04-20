import {useContext}from'react';
import{ ThemeContext }from'../context/ThemeContext';

const ThemeToggle=()=>{
 const{theme,toggleTheme}=useContext(ThemeContext);
 return(
      <>
      {/* Tombol ganti tema */}
      <button onClick={toggleTheme}>
          Switch to&nbsp;{theme==='light'?'Dark':'Light'} Mode 🌙☀️  
      </button></>);
};

export default ThemeToggle;

