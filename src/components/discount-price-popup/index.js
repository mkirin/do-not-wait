/**
* @author shelly
* @description 权限折
* @date 2017-06-6
**/

import React from 'react';
import {Modal, message, Alert} from 'antd';

import './discount_price_popup.css';
message.config({
	top: 300,
	duration: 1
});

class DiscountPricePopup extends React.Component {
  constructor(props){
    super(props);
    this.state={price:'', visible:false};
  };

// 点击确定按钮
  handleOk=()=>{
    if(this.state.price==='' || this.state.price===0){
      message.info("请输入正确的折扣")
    }else{
      if(this.props.onOk){
         this.props.onOk(this.state.price);
      }
     
    }
  }

// 点击数字键盘
 handleClick=(e)=> {
    let value=e.target.innerHTML;
    let inputVal=this.state.price;
    if(value>=0&&value<=9){
      inputVal = inputVal.concat(value);
    }else if(value==='.'){
        if(!inputVal.includes(".")){
              inputVal = inputVal.concat(value);
          }
    }
    this.setState({price:inputVal});
   
  }

// 点击退格
  handleBack=(e)=>{
      let inputVal=this.state.price;
      inputVal=inputVal.substring(0,inputVal.length-1);
      this.setState({price:inputVal});
  }

  handleCancel=()=>{
       if(this.props.onCancel){
          this.props.onCancel();
      }
  }

  render() {
    let  alertBlock;
    if(this.props.alert!==''){
        alertBlock = <Alert 
          message={this.props.alert} 
          type="warning" 
          showIcon 
          className="warning"
          closable
          onClose={()=>{

          }}
        />
    }else{
      alertBlock='';
    }
    return (

      <div id="combine-price">
        <Modal id="accredit-modal" title={this.props.title}
            visible={true} 
            maskClosable={false} 
            okText='确定' cancelText='放弃'
            width={510}
            height={546} 
            footer={null}
            onCancel={this.handleCancel}
            wrapClassName="combine-price-popup-modal"
        >
          <div className="alert">{alertBlock}</div>
          <input type="text" 
              value={this.state.price} 
              className="price-input" 
              placeholder="0"  
              onChange={(e)=>{
                  this.setState({price:e.target.price});
              }} 
          />
          
           
          <div id="num-key">
            <ul>
              <li className="number" onClick={this.handleClick}>1</li>
              <li className="number" onClick={this.handleClick}>2</li>
              <li className="number" onClick={this.handleClick}>3</li>
              <li className="back iconfont icon-order_btn_back" onClick={this.handleBack}></li>
              <li className="number" onClick={this.handleClick}>4</li>
              <li className="number" onClick={this.handleClick}>5</li>
              <li className="number" onClick={this.handleClick}>6</li>
              <li className="clear-all" onClick={()=>{
                  if(this.props.onCancel){
                      this.props.onCancel();
                  }
              }}>取消</li>
              <li className="number" onClick={this.handleClick}>7</li>
              <li className="number" onClick={this.handleClick}>8</li>
              <li className="number" onClick={this.handleClick}>9</li>
              <li className="cancle"></li>
              <li className="number" onClick={this.handleClick}>0</li>
              <li className="number" onClick={this.handleClick}>00</li>
              <li className="number" onClick={this.handleClick}>.</li>
              <li className="confirm" onClick={this.handleOk}>确定</li>
            </ul>
          </div>
         
        </Modal>
      </div>
    )
  }
}

export default DiscountPricePopup;