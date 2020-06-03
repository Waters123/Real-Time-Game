import React, { Component } from 'react';
import styled from 'styled-components';
import { CirclePicker } from 'react-color';

export class WhiteBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      drawing: false,
      currentColor: 'red'
    };

    this.whiteboard = React.createRef();

    this.props.socket.on('drawing', (data) => {
      let w = window.innerWidth;
      let h = window.innerHeight;

      if (!isNaN(data.x0 / w) && !isNaN(data.y0)) {
        this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
      }
    });
  }

  componentDidMount() {
    this.setState({
      whiteboard: this.whiteboard.current
    });
    this.whiteboard.current.style.height = window.innerHeight;
    this.whiteboard.current.style.width = window.innerWidth;

    this.whiteboard.current.addEventListener('mousedown', this.onMouseDown, false);
    this.whiteboard.current.addEventListener('mouseup', this.onMouseUp, false);
    this.whiteboard.current.addEventListener('mouseout', this.onMouseUp, false);
    this.whiteboard.current.addEventListener(
      'mousemove',
      this.throttle(this.onMouseMove, 5),
      false
    );

    this.whiteboard.current.addEventListener('touchstart', this.onMouseDown, false);

    this.whiteboard.current.addEventListener(
      'touchmove',
      this.throttle(this.onTouchMove, 5),
      false
    );

    this.whiteboard.current.addEventListener('touchend', this.onMouseUp, false);

    window.addEventListener('resize', this.onResize);
  }

  drawLine = (x0, y0, x1, y1, color, emit, force) => {
    let context = this.state.whiteboard.getContext('2d');
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    // if (force) {
    // 	context.lineWidth = 1.75 * (force * (force + 3.75));
    // }
    context.stroke();
    context.closePath();

    if (!emit) {
      return;
    }
    var w = window.innerWidth;
    var h = window.innerHeight;
    this.setState(() => {
      if (!isNaN(x0 / w)) {
        this.props.socket.emit('drawing', {
          x0: x0 / w,
          y0: y0 / h,
          x1: x1 / w,
          y1: y1 / h,
          color: color,
          force: force
        });

        return {
          cleared: false
        };
      }
    });
  };

  onMouseDown = (e) => {
    this.setState(() => {
      return {
        currentX: e.clientX,
        currentY: e.clientY,
        drawing: true
      };
    });
  };

  onMouseUp = (e) => {
    this.setState(() => {
      return {
        drawing: false,
        currentX: e.clientX,
        currentY: e.clientY
      };
    });
  };

  onMouseMove = (e) => {
    if (!this.state.drawing) {
      return;
    }

    this.setState(() => {
      return {
        currentX: e.clientX,
        currentY: e.clientY
      };
    }, this.drawLine(this.state.currentX, this.state.currentY, e.clientX, e.clientY, this.state.currentColor, true));
  };

  onTouchMove = (e) => {
    if (!this.state.drawing) {
      return;
    }

    this.setState(() => {
      this.drawLine(
        this.state.currentX,
        this.state.currentY,
        e.touches[0].clientX,
        e.touches[0].clientY,
        this.state.currentColor,
        true,
        e.touches[0].force
      );
      return {
        currentX: e.touches[0].clientX,
        currentY: e.touches[0].clientY
      };
    });
  };

  throttle = (callback, delay) => {
    let previousCall = new Date().getTime();
    return function () {
      let time = new Date().getTime();

      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  };

  clearBoard = () => {
    this.props.socket.emit('clear', this.state.room);
  };

  handleColor = (color) => {
    this.setState(() => {
      return {
        currentColor: color.hex
      };
    });
  };

  render() {
    return (
      <div>
        <div style={{ position: 'fixed', zIndex: 2, bottom: 0, right: 0 }}>
          <CirclePicker onChange={this.handleColor} />
        </div>

        <canvas
          style={{
            position: 'fixed',
            left: 0,
            zIndex: -1,
            overflow: 'hidden'
          }}
          width={'2000px'}
          height={'900px'}
          ref={this.whiteboard}
        ></canvas>
      </div>
    );
  }
}
