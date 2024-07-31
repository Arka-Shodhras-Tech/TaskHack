import React, { useEffect, useState } from 'react';
import { Actions } from '../../actions/actions';
import './showphotos.css';
import { Authentication } from '../../actions/auth';

export const ShowGallery = () => {
    const [images, setImages] = useState([]);
    const fixedHeight = 500;
    const possibleWidths = [600, 500, 800, 550, 750];
    const { teamName } = Authentication()

    const ShowPhotos = async () => {
        try {
            const res = await Actions.ShowPhotos(teamName);
            const allPhotos = res?.data?.flatMap((val) =>
                val?.Links?.map((photo) => ({
                    id: photo?.id,
                    src: photo?.webViewLink,
                    alt: photo?.name,
                }))
            );
            setImages(allPhotos);
        } catch (error) {
            console.error('Failed to fetch photos', error);
        }
    };

    useEffect(() => {
        ShowPhotos();
    }, []);

    return (
        images.length > 0 ? (
            <>
                <h2 align="center">Hello Team, {teamName}</h2>
                <div className="collage-container">
                    {images.map((image) => {
                        const randomWidth = possibleWidths[Math.floor(Math.random() * possibleWidths.length)];
                        return (
                            <iframe
                                key={image.id}
                                title={image.alt}
                                src={`https://drive.google.com/file/d/${image.id}/preview`}
                                width="200%"
                                height="100vh"
                                frameBorder="0"
                                allowFullScreen
                                className="collage-item"
                                style={{
                                    width: `${randomWidth}px`,
                                    height: `${fixedHeight}px`,
                                    margin: '5px',
                                    objectFit: 'cover'
                                }}
                            />
                        );
                    })}
                </div>
            </>
        ) : (
            <h1>Please wait...</h1>
        )
    );
};
