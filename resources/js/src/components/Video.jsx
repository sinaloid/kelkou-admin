import { useEffect } from "react";

export const Video = ({url}) => {
    useEffect(() => {}, [url]);
    return (
        <video controls width="100%" autoplay>
            <source src={url} type="video/mp4" />
            Votre navigateur ne prend pas en charge la balise vidéo.
        </video>
    );
};
