import transform from 'css3transform';
import React, {PureComponent} from 'react';
import AlloyFinger from '../AlloyFinger';
import resizeImage from '../utils/resizeImage';
import PropTypes from "prop-types";

const VERTICAL_RANGE = 50;
const BUFFER = 4;

export default class ImageController extends PureComponent {
    static propTypes = {
        onNextPic: PropTypes.func,
        onPrevPic: PropTypes.func,
        isPageButton: PropTypes.bool,
    };
    static defaultProps = {
        alt: 'picture',
        focused: false,
        isPageButton:true
    };
    
    state = {
        isLoaded: false,
    };
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        const {
            url,
        } = this.props;
        const loader = new Image();
        if (url) {
            new Promise((resolve, reject) => {
                loader.onload = resolve;
                loader.onerror = reject;
                loader.src = url;
            }).then(() => {
                if (!this.unMount) {
                    this.style = resizeImage(loader.naturalWidth, loader.naturalHeight);
                    this.setState({
                        isLoaded: true,
                    });
                }
            });
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.focused === true && this.props.focused === false) {
            this.reset();
        }
    }
    
    componentWillUnmount() {
        this.unMount = true;
    }
    
    initScale = 1;
    style = {};
    getImageEl = el => {
        if (el) {
            this.target = el;
            transform(el);
        }
    };
    
    checkPosition = (deltaX, deltaY) => {
        const {
            onGiveupControl,
        } = this.props;
        const {
            left,
            right,
            top,
            bottom,
        } = this.target.getBoundingClientRect();
        const {
            translateX,
            translateY,
            originX,
            originY,
            scaleX,
            scaleY,
        } = this.target;
        // If the image overflows or it moves back to center of screen, it can be moved.
        if (((deltaX <= 0 || left <= 0) && (deltaX >= 0 || right >= window.innerWidth))
            || Math.abs(translateX + deltaX - originX * scaleX)
            < Math.abs(translateX - originX * scaleX)) {
            this.target.translateX += deltaX;
        } else if (onGiveupControl) {
            if (Math.abs(deltaY) < BUFFER) { // optimize for looong picture
                onGiveupControl();
            }
        }
        if (((deltaY < 0 || top < VERTICAL_RANGE)
            && (deltaY > 0 || bottom > window.innerHeight - VERTICAL_RANGE))
            || Math.abs(translateY + deltaY - originY * scaleY)
            < Math.abs(translateY - originY * scaleY)) {
            this.target.translateY += deltaY;
        }
    };
    
    
    reset = () => {
        this.target.translateX = 0;
        this.target.translateY = 0;
        this.target.scaleX = 1;
        this.target.scaleY = 1;
        this.target.originX = 0;
        this.target.originY = 0;
    };
    
    handleMove = e => {
        e.preventDefault();
        window.requestAnimationFrame(() => this.checkPosition(
            parseInt(e.deltaX, 10),
            parseInt(e.deltaY, 10),
        ));
    };
    
    // Refer to https://github.com/AlloyTeam/AlloyCrop.
    handleMultipointStart = e => {
        const cr = this.target.getBoundingClientRect();
        const realX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
        const realY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
        const centerX = Math.min(
            Math.max(realX, cr.left),
            cr.left + cr.width,
        );
        const centerY = Math.min(
            Math.max(realY, cr.top),
            cr.top + cr.height,
        );
        const imgCenterX = cr.left + cr.width / 2;
        const imgCenterY = cr.top + cr.height / 2;
        const offX = centerX - imgCenterX;
        const offY = centerY - imgCenterY;
        const preOriginX = this.target.originX;
        const preOriginY = this.target.originY;
        this.target.originX = offX / this.target.scaleX;
        this.target.originY = offY / this.target.scaleY;
        this.target.translateX += offX - preOriginX * this.target.scaleX;
        this.target.translateY += offY - preOriginY * this.target.scaleX;
        this.initScale = this.target.scaleX;
    };
    
    handleDoubleTap = e => {
        if (this.target.scaleX > 1) {
            this.reset();
        } else {
            const cr = this.target.getBoundingClientRect();
            const imgCenterX = cr.left + cr.width / 2;
            const imgCenterY = cr.top + cr.height / 2;
            const centerX = Math.min(
                Math.max(e.origin[0], cr.left),
                cr.left + cr.width,
            );
            const centerY = Math.min(
                Math.max(e.origin[1], cr.top),
                cr.top + cr.height,
            );
            const offX = centerX - imgCenterX;
            const offY = centerY - imgCenterY;
            this.target.originX = offX;
            this.target.originY = offY;
            const newScale = Math.max(
                window.innerWidth / cr.width * 0.5,
                window.innerHeight / cr.height * 0.5,
                2,
            );
            this.target.scaleX = newScale;
            this.target.scaleY = newScale;
        }
    };
    
    handlePinch = e => {
        const scale = Math.max(Math.min(4, this.initScale * e.scale), 1);
        this.target.scaleX = scale;
        this.target.scaleY = scale;
    };
    
    handleTouchEnd = e => {
        e.preventDefault();
    };
    
    
    render() {
        const {
            isLoaded,
        } = this.state;
        const {
            url,
            alt,
            onGiveupControl,
            focused,
            onNextPic,
            onPrevPic,
            isPageButton,
            ...other
        } = this.props;
        return (
            isLoaded ? (
                <AlloyFinger
                    onTouchEnd={this.handleTouchEnd}
                    onMultipointStart={this.handleMultipointStart}
                    onPressMove={this.handleMove}
                    onDoubleTap={this.handleDoubleTap}
                    onPinch={this.handlePinch}>
                    <div className="image-slides-blackboard">
                        {isPageButton ? (<div style={{width: '50vw', height: '100vh', zIndex: '1', position: 'absolute', left: '0px'}}
                             className="leftcursor" onClick={onPrevPic}></div>
                        ) : ''}
                        <img
                            className="image-slides-content"
                            alt={alt}
                            src={url}
                            ref={this.getImageEl}
                            style={this.style}
                            {...other} />
                        {isPageButton ? (<div style={{width: '50vw', height: '100vh', zIndex: '1', position: 'absolute', right: '0px'}}
                             className="rightcursor" onClick={onNextPic}></div>) : ''}
                    </div>
                </AlloyFinger>
            ) : (
                <AlloyFinger onPressMove={this.handleMove}>
                    <div className="image-slides-blackboard">
                        <div className="image-slides-loading" key="loading" ref={this.getImageEl}>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>
                </AlloyFinger>
            )
        );
    }
}
