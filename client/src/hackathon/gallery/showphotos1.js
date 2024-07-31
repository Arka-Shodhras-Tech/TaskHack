import LightGallery from 'lightgallery/react';
import React, { useEffect, useState } from 'react';

import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-rotate.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgRotate from 'lightgallery/plugins/rotate';
import lgShare from 'lightgallery/plugins/share';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Actions } from '../../actions/actions';
import { OpenFile } from '../../actions/openfile';
import './showphotos.css';

export const ShowGallery = () => {
    const [images, setImages] = useState([]);
    const teamcode = 1209;

    const fetchTeamPhotos = async () => {
        try {
            const res = await Actions.TeamsPhotos(teamcode);
            const photoUrls = await Promise.all(res?.data?.map(photo => OpenFile(photo)));
            setImages(photoUrls.map((url, index) => ({
                id: index,
                src: url,
                alt: `Photo ${index + 1}`
            })));
            if (!images) {
                fetchTeamPhotos()
            }
        } catch (error) {
            console.error('Error fetching team photos:', error);
        }
    };

    if (!images) {
        return (
            <h1>Please wait...</h1>
        )
    }

    useEffect(() => {
        fetchTeamPhotos();
    }, []);

    return (
        images ? <div className="App">
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
            >
                {images.map((image) => (
                    <a href={image?.src?.url} key={image.id}>
                        <img alt={image.alt} src={image?.src?.url} />
                    </a>
                ))}
            </LightGallery>
        </div> :
            <h1>Please wait...</h1>
    );
};