import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ImageSlides from '../src';

const images = [
    "https://img-bcy-qn.pstatp.com/user/3126641672067060/item/c0rhf/jody1acp63wxkfquwe9mk3xzehthdawn.jpg/w650",
    "https://img-bcy-qn.pstatp.com/user/3126641672067060/item/c0rhf/mojehs6zfi10izuq1ahwmgykojqeejbs.jpg/w650",
    "https://img-bcy-qn.pstatp.com/user/3126641672067060/item/c0rhf/txulrxof8cxpihezsgliboyzh3cae0cd.jpg/w650",
    "https://img-bcy-qn.pstatp.com/user/3126641672067060/item/c0rhf/fgs6tnzuslmkkkkdeudy6osxzsficev1.jpg/w650",
    "https://img-bcy-qn.pstatp.com/user/3126641672067060/item/c0rhf/uojnta4e17wxeoxchpiklvtvrvy11v0n.png/w650",
    "https://img-bcy-qn.pstatp.com/user/3126641672067060/item/c0rhf/rzbusuu320o9gzs5qdoiszttqaw6rfh6.jpg/w650",
    "https://img-bcy-qn.pstatp.com/user/3126641672067060/item/c0rhf/3lgxzdwlbxzuf1npejvekesuy9zdwbxv.jpg/w650",
    "https://img-bcy-qn.pstatp.com/user/3126641672067060/item/c0rhf/q3hsh1gkknjutj6aqvrt3jmupyfbgcnb.jpg/w650"
];
const imagesPre = [
        "http://imglf4.nosdn0.126.net/img/YnpDNTJBbW9xLzFmZXF5dTF2THJscmdEMzJkYWE4aFp1OHRNZk83czdIMjJWd1QwRGsyU1JBPT0.jpg?imageView&thumbnail=650x0&quality=100",
        "http://imglf6.nosdn0.126.net/img/YnpDNTJBbW9xLzFmZXF5dTF2THJsbDlsR0Z3N2tpR0FWU0doUFJaVm5PbTBOZHA1bHk5bkpBPT0.jpg?imageView&thumbnail=650x0&quality=100",
        "http://imglf4.nosdn0.126.net/img/YnpDNTJBbW9xLzFmZXF5dTF2THJscWVNWCtUc2JsVU5OTCtTYUpHa2U3Q0lBMCtmZ0FlYXR3PT0.jpg?imageView&thumbnail=650x0&quality=100",
        "http://imglf3.nosdn0.126.net/img/YnpDNTJBbW9xLzFmZXF5dTF2THJsaVMzMkMyMGZpMmVlVkxuU21mbDZuZXdjTUF4ZzR1K2ZnPT0.jpg?imageView&thumbnail=650x0&quality=100",
        "http://imglf6.nosdn0.126.net/img/YnpDNTJBbW9xLzFmZXF5dTF2THJsdEsram9BMTVCQWdpSGxPSzJ3ZU51bEd5ZDVhZ3JUTmR3PT0.jpg?imageView&thumbnail=650x0&quality=100",
        "http://imglf3.nosdn0.126.net/img/YnpDNTJBbW9xLzFmZXF5dTF2THJsdklCaHluUnZ6QytMclR6UTYxcTBiRlNvOEpNNTV1UCt3PT0.jpg?imageView&thumbnail=650x0&quality=100",
        "http://imglf6.nosdn0.126.net/img/YnpDNTJBbW9xLzFmZXF5dTF2THJsbnM0cnQwdFp1Zm9uY1JNWjlSV1U1MlVZaGtTSXg2Z0F3PT0.jpg?imageView&thumbnail=650x0&quality=100",
        "http://imglf5.nosdn0.126.net/img/YnpDNTJBbW9xLzFmZXF5dTF2THJsc3F2YyszS0xaZS9UTEo5aTJFQyt3bUhPeGlIbDU1Slh3PT0.jpg?imageView&thumbnail=650x0&quality=100",
        "http://imglf6.nosdn0.126.net/img/YnpDNTJBbW9xLzFmZXF5dTF2THJsdUNqRmRpQVFOMGpHTGI3cjFIdGNSeU9ZbjZSaGwxSWZnPT0.jpg?imageView&thumbnail=650x0&quality=100",
        "http://imglf4.nosdn0.126.net/img/YnpDNTJBbW9xLzFmZXF5dTF2THJsdUQxK3RRc1J6QkkyRWVncy93N0RCTWFyODBaV3FiZmVBPT0.jpg?imageView&thumbnail=650x0&quality=100"
    ];

const imagesNext = [
    "https://wx3.sinaimg.cn/large/006TwV90gy1g7lxlm83bnj316o1s0aya.jpg",
    "https://wx2.sinaimg.cn/large/006TwV90gy1g7lxldzeeaj316o1s0h7m.jpg",
    "https://wx1.sinaimg.cn/large/006TwV90gy1g7lxlrtj9kj31s016oh7r.jpg",
    "https://wx4.sinaimg.cn/large/006TwV90gy1g7lxlkp8lbj34dd2wxnpg.jpg",
    "https://wx3.sinaimg.cn/large/006TwV90gy1g7lxlqi56kj31s016o1kx.jpg",
    "https://wx1.sinaimg.cn/large/006TwV90gy1g7lxlp0twaj316o1s01kx.jpg",
    "https://wx3.sinaimg.cn/large/006TwV90gy1g7lxlswdfbj312x1md1kx.jpg",
    "https://wx3.sinaimg.cn/large/006TwV90gy1g7lxlu9ixfj31ov14kb0r.jpg",
    "https://wx1.sinaimg.cn/large/006TwV90gy1g7lxltk7w6j31g40yraqi.jpg"
];

class Demo extends Component {
    state = {
        isOpen: true,
        picList: images,
        index: 0
    };
    
    handleChange = (index) => {
        console.log(index);
        // this.setState({
        //     index: index
        // })
    }
    
    handleOpen = () => {
        this.setState({
            isOpen: true,
        });
    }
    handleClose = () => {
        this.setState({
            isOpen: false,
        });
    }
    
    handleNext = () => {
        console.log(this.state.index);
        this.setState({
            index: 0,
            picList: imagesNext
        })
    }
    
    handlePre = () => {
        console.log(this.state.index);
        this.setState({
            index: imagesPre.length - 1,
            picList: imagesPre
        })
    }
    
    render() {
        return (
            <div>
                <button onClick={this.handleOpen}>Open</button>
                <ImageSlides images={this.state.picList} isOpen={this.state.isOpen} onClose={this.handleClose}
                             index={this.state.index} onNext={this.handleNext} onPre={this.handlePre}
                             onChange={this.handleChange}/>
            </div>
        
        );
    }
}

ReactDOM.render(
    <Demo/>,
    document.getElementById('root'),
);
