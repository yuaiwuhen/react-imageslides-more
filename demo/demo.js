import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ImageSlides from '../src';

const images = [
    "https://img-bcy-qn.pstatp.com/user/3313615/item/c0qsh/1aced03d341d4adfb353418411eca215.jpg/w650", "https://img-bcy-qn.pstatp.com/user/3313615/item/c0qsh/310bcfc2932a4c26b60fbaa0f155c40c.jpg/w650", "https://img-bcy-qn.pstatp.com/user/3313615/item/c0qsh/59c17924e45f42e68309d252dad1d2cf.jpg/w650", "https://img-bcy-qn.pstatp.com/user/3313615/item/c0qsh/83bcef68fa6d4c068be7f7f5ba1722e8.jpg/w650", "https://img-bcy-qn.pstatp.com/user/3313615/item/c0qsh/5e2483e39d944195813f4f4caffe1af9.jpg/w650"

];
const imagesPre = [
    "https://img-bcy-qn.pstatp.com/user/102227864682/item/c0qsh/46ef96d6876146b386e8bd8bd335de1a.jpg/w650", "https://img-bcy-qn.pstatp.com/user/102227864682/item/c0qsh/dfd0a0f781034d3397e5c384e53cd6ec.jpg/w650"
    , "https://img-bcy-qn.pstatp.com/user/102227864682/item/c0qsh/dbc1b2a288734e7583b3743ba4a4f690.jpg/w650"
    , "https://img-bcy-qn.pstatp.com/user/102227864682/item/c0qsh/ae9575060e24494ba978e177edcb90f5.jpg/w650"
    , "https://img-bcy-qn.pstatp.com/user/102227864682/item/c0qsh/005e8159017445a09286375bf8954920.jpg/w650"

];

const imagesNext = [
    "https://img-bcy-qn.pstatp.com/user/105015619949/item/c0qsh/8e2cd894caba4a01907869deb8488ce3.jpg/w650"
    , "https://img-bcy-qn.pstatp.com/user/105015619949/item/c0qsh/e142128caa464212bc25945941aa6cc0.jpg/w650"
    , "https://img-bcy-qn.pstatp.com/user/105015619949/item/c0qsh/c7db4d8a0d3247ee883313393a7cdbab.jpg/w650"
    , "https://img-bcy-qn.pstatp.com/user/105015619949/item/c0qsh/a24025374cb94ffda7fcb12ec0a9157f.jpg/w650"
    , "https://img-bcy-qn.pstatp.com/user/105015619949/item/c0qsh/dc92c10264e540c29731966dc6b1e8fd.jpg/w650"
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
