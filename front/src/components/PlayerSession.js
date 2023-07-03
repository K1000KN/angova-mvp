import React, {useState, useEffect} from 'react';

var PlayerSession = ({ type, content, setAudioSrc, audioQuestion, audioExplaination }) => {
    const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  
    useEffect(() => {
        let intervalId;
        setAudioSrc(audioQuestion)
        if (type === "img" && content.length > 1) {
            intervalId = setInterval(() => {
                setCurrentSourceIndex(prevIndex => (prevIndex === 0 ? 1 : 0));
            }, 1000);
        }else{
            setCurrentSourceIndex(0); 
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [type, content]);

    let render;
    
    const currentSource = content[currentSourceIndex];
    render = <img className="imgResponsive" alt="road" src={currentSource} />;
    
    

    return (
        <> 
            {render}
        </>
        
    );
};

export default PlayerSession;