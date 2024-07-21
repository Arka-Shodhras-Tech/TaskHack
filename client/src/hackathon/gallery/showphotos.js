import { useEffect, useState } from 'react';
import { Actions } from "../../actions/actions";
import { OpenFile } from "../../actions/openfile";
import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay'
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';

export const ShowGallery = () => {
    const [data, setData] = useState()
    let teamcode = 1209

    const Teamcodes = async () => {
        await Actions.TeamsPhotos(teamcode)
            .then((res) => {
                console.log(res)
                res?.data?.map(async (photo) => (
                    setData(await OpenFile(photo))
                ))
            })
            .catch((e) => console.log(e))
    }

    console.log(data)

    useEffect(() => {
        Teamcodes()
    }, [])

    return (
        <>
            <div className="App">
                <LightGallery
                    onInit={onInit}
                    speed={500}
                    plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
                >

                    {images.map((image, index) => {
                        return (
                            <a href={image.src} key={index}>
                                <img alt={image.alt} src={image.src} />
                            </a>
                        )
                    })}
                </LightGallery>
            </div>
        </>
    )
}