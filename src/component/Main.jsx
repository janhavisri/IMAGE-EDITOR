import React, { useState,useEffect } from 'react'
import Resizer from "react-image-file-resizer";
import {LinkedinShareButton,WhatsappShareButton,TelegramShareButton}from 'react-share';
  import {
    TelegramIcon,
    WhatsappIcon,
    LinkedinIcon,

  } from 'react-share';
   import LinkedinShare from "./ShareButtons/LinkedinShare";
   import FacebookShare from "./ShareButtons/FacebookShare";
 import TwitterShare from "./ShareButtons/TwitterShare";
import './style/main.scss'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr'
import { CgMergeVertical, CgMergeHorizontal } from 'react-icons/cg'
import { IoMdUndo, IoMdRedo, IoIosImage } from 'react-icons/io'
import storeData from './LinkedList'
// const Main = () => {
    import Styles from './Styles/main.module.css';
    function ImageResize(props){
        
    const { title, socialTypes = ['facebook', 'twitter','linkedin'], style} = props;
    const copyToClipboard = (text) => {
        if (navigator && navigator.clipboard) navigator.clipboard.writeText(text)
            .then(() => { alert(`Copied!`) })
            .catch((error) => { alert(`Copy failed! ${error}`) });
    }
      const {imageToResize, onImageResized, resizeAspect, resizeQuality} = props;

    const [imageToResizeUrl, setImageToResizeUrl] = useState();
    const [imageToResizeWidth, setImageToResizeWidth] = useState();
    const [imageToResizeHeight, setImageToResizeHeight] = useState();
    const filterElement = [
        {
            name: 'brightness',
            maxValue: 200
        },
        {
            name: 'grayscale',
            maxValue: 200
        },
        {
            name: 'sepia',
            maxValue: 200
        },
        {
            name: 'saturate',
            maxValue: 200
        },
        {
            name: 'contrast',
            maxValue: 200
        },
        {
            name: 'hueRotate'
        }
    ]
    const [property, setProperty] = useState(
        {
            name: 'brightness',
            maxValue: 200
        }
    )
    const [details, setDetails] = useState('')
    const [crop, setCrop] = useState('')
    const [state, setState] = useState({
        image: '',
        brightness: 100,
        grayscale: 0,
        sepia: 0,
        saturate: 100,
        contrast: 100,
        hueRotate: 0,
        rotate: 0,
        vartical: 1,
        horizental: 1
    })
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const leftRotate = () => {
        setState({
            ...state,
            rotate: state.rotate - 90
        })

        const stateData = state
        stateData.rotate = state.rotate - 90
        storeData.insert(stateData)
    }

    const rightRotate = () => {
        setState({
            ...state,
            rotate: state.rotate + 90
        })
        const stateData = state
        stateData.rotate = state.rotate + 90
        storeData.insert(stateData)
    }
    const varticalFlip = () => {
        setState({
            ...state,
            vartical: state.vartical === 1 ? -1 : 1
        })
        const stateData = state
        stateData.vartical = state.vartical === 1 ? -1 : 1
        storeData.insert(stateData)
    }

    const horizentalFlip = () => {
        setState({
            ...state,
            horizental: state.horizental === 1 ? -1 : 1
        })
        const stateData = state
        stateData.horizental = state.horizental === 1 ? -1 : 1
        storeData.insert(stateData)
    }

    const redo = () => {
        const data = storeData.redoEdit()
        if (data) {
            setState(data)
        }
    }
    const undo = () => {
        const data = storeData.undoEdit()
        if (data) {
            setState(data)
        }
    }
    const imageHandle = (e) => {
        if (e.target.files.length !== 0) {

            const reader = new FileReader()

            reader.onload = () => {
                setState({
                    ...state,
                    image: reader.result
                })

                const stateData = {
                    image: reader.result,
                    brightness: 100,
                    grayscale: 0,
                    sepia: 0,
                    saturate: 100,
                    contrast: 100,
                    hueRotate: 0,
                    rotate: 0,
                    vartical: 1,
                    horizental: 1
                }
                storeData.insert(stateData)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    const imageCrop = () => {
        const canvas = document.createElement('canvas')
        const scaleX = details.naturalWidth / details.width
        const scaleY = details.naturalHeight / details.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')

        ctx.drawImage(
            details,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )

        const base64Url = canvas.toDataURL('image/jpg')

        setState({
            ...state,
            image: base64Url
        })
    }
    const saveImage = () => {
        const canvas = document.createElement('canvas')
        canvas.width = details.naturalHeight
        canvas.height = details.naturalHeight
        const ctx = canvas.getContext('2d')

        ctx.filter = `brightness(${state.brightness}%) brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg)`

        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(state.rotate * Math.PI / 180)
        ctx.scale(state.vartical, state.horizental)

        ctx.drawImage(
            details,
            -canvas.width / 2,
            -canvas.height / 2,
            canvas.width,
            canvas.height
        )

            
        const link = document.createElement('a')
        link.download = 'image_edit.jpg'
        link.href = canvas.toDataURL()
        link.click()
    }

    useEffect(() => {
        if (imageToResize) {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                setImageToResizeUrl(reader.result);
            });

            reader.readAsDataURL(imageToResize);
        }
    }, [imageToResize])
 useEffect(() => {
        if (imageToResize && imageToResizeWidth && imageToResizeHeight) {
            Resizer.imageFileResizer(
                imageToResize,
                imageToResizeWidth * resizeAspect,
                imageToResizeWidth * resizeAspect,
                "JPEG",
                resizeQuality,
                0,
                (uri) => {
                    onImageResized(uri)
                },
                "base64"
            );
        }
    }, [
        imageToResize, imageToResizeWidth, imageToResizeHeight,
        onImageResized, resizeAspect, resizeQuality
    ]);


 
    return (
        <div className='image_editor'>
            <div className="card">
                <div className="card_header">
                    <h2>------ Image Editor ------</h2>
                </div>
                <div className="card_body">
                    <div className="sidebar">
                        <div className="side_body">
                            <div className="filter_section">
                                <span>Filters</span>
                                <div className="filter_key">
                                    {
                                        filterElement.map((v, i) => <button className={property.name === v.name ? 'active' : ''} onClick={() => setProperty(v)} key={i} >{v.name}</button>)
                                    }
                                </div>
                            </div>
                            <div className="filter_slider">
                                <div className="label_bar">
                                    <label htmlFor="range">Rotate</label>
                                    <span>100%</span>
                                </div>
                                <input name={property.name} onChange={inputHandle} value={state[property.name]} max={property.maxValue} type="range" />
                            </div>
                            <div className="rotate">
                                <label htmlFor="">Rotate & Filp</label>
                                <div className="icon">
                                    <div onClick={leftRotate}><GrRotateLeft /></div>
                                    <div onClick={rightRotate}><GrRotateRight /></div>
                                    <div onClick={varticalFlip}><CgMergeVertical /></div>
                                    <div onClick={horizentalFlip}><CgMergeHorizontal /></div>
                                </div>
                            </div>
                        </div>
                        <div className="reset">
                           {/* <button >Reset</button>  */}
                            <button
onClick={ImageResize}
            onLoad= {(e) => {
                const img = e.target;
                setImageToResizeWidth(img.width);
                setImageToResizeHeight(img.height);
            }}
            
            crossOrigin="anonymous" 
            // to avoid CORS-related problems
        >Image Resize</button> 
                            <button onClick={saveImage} className='save'>Save Image</button>
                            {/* <button className='resize'>Resize Image</button> */}
                            
                        </div>
                    </div>
                    <div className="image_section">
                        <div className="image">
                            {
                                state.image ? <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                                    <img onLoad={(e) => setDetails(e.currentTarget)} style={{ filter: `brightness(${state.brightness}%) brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg)`, transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizental})` }} src={state.image} alt="" />
                                </ReactCrop> :
                                    <label htmlFor="choose">
                                        <IoIosImage />
                                        <span>Choose Image</span>
                                    </label>
                            }
                        </div>
            
                        <div className="image_select">
                        
                         {/* <img style={{width:"10%",height:"10%"}} src={Logo} alt="React Logo" /> */}
      
                            <button onClick={undo} className='undo'><IoMdUndo /></button>
                            <button onClick={redo} className='redo'><IoMdRedo /></button>
                            {
                                crop && <button onClick={imageCrop} className='crop'>Crop Image</button>
                            }
                            <label htmlFor="choose">Choose Image</label>
                            <input onChange={imageHandle} type="file" id='choose'/>
                            
                        </div>
                        {/* <div style={{marginLeft:"50%"}}>
                    <a href="https://www.linkedin.com/feed/">
                    <LinkedinIcon className="button"size={32} round={true} /></a>
                    <a href="https://web.whatsapp.com/"> <WhatsappIcon className="button"size={32} round={true} /></a>
                   <a href="https://telegram.org/android"> <TelegramIcon className="button"size={32} round={true} />
                   </a> </div>  */}
                   <div className={Styles.iconContainer} style={{marginLeft:"45%"}}>
                {Array.isArray(socialTypes) && socialTypes.map((type, idx) => (
                    <React.Fragment key={"social_item_" + idx}>
                        {type === 'facebook' && <FacebookShare {...props} />}
                        {type === 'twitter' && <TwitterShare {...props} />}
                        {type === 'linkedin' && <LinkedinShare  {...props} />}
                    </React.Fragment>
                ))}
                 
        

            </div>

                     </div>
          
                </div>
            </div>
        </div>
    )
                        
                                      
}
ImageResize.defaultProps = {
    onImageResized: () => {},
    resizeAspect: 0.5,
    resizeQuality: 100
}


export default ImageResize;