import React from 'react';

class Canvas extends React.Component {
  componentDidMount() {
    this.props.onRef(this);
    this.initializeCanvas();
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  initializeCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth * 0.7;
    ctx.canvas.height = window.innerHeight * 0.4;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '40px Arial';
    ctx.fillText(
      'Welcome to Musical Typewriter', 
      (ctx.canvas.width / 2) - 300, 175);
  }

  drawCircle(color) {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth * 0.7;
    ctx.canvas.height = window.innerHeight * 0.4;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    const mid = [
      Math.floor(Math.random() * ctx.canvas.width), 
      Math.floor(Math.random() * ctx.canvas.height)
    ];
    
    let radius = 0;

    function draw() {
      ctx.fillStyle = 'hsl(' + color++ + ', 100%, 55%, 0.1)'
      ctx.beginPath();
      ctx.arc(mid[0], mid[1], radius, 0, 2 * Math.PI, false)
      ctx.fill();
      radius += 2;
      if (radius <= ctx.canvas.width * 0.1) {
        requestAnimationFrame(draw);
      } else {  
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    }

    draw();
  }

  drawRainbow() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth * 0.7;
    ctx.canvas.height = window.innerHeight * 0.4;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    const mid = [
      ctx.canvas.width / 2, 
      ctx.canvas.height
    ];
    
    let radius = 0;
    let color = 0

    function draw() {
      ctx.fillStyle = 'hsl(' + color++ + ', 100%,55%)'
      ctx.beginPath();
      ctx.arc(mid[0], mid[1], radius, 0, 2 * Math.PI, false)
      ctx.fill();
      radius += 2;
      if (radius <= ctx.canvas.width * 0.68) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    }

    draw();
  }

  drawFire() {
    const ctx = this.refs.canvas.getContext("2d");
    const time = Date.now();
    ctx.canvas.width = window.innerWidth * 0.7;
    ctx.canvas.height = window.innerHeight * 0.4;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.globalCompositeOperation='lighter';

    const particles = [];
    const speed = 4;
    const size = 20;
    const max = 50;
    
    
    function Particle(x, y, dx, dy) {
      this.x = x;
      this.y = y;
      this.dx = dx; 
      this.dy = dy;
      this.life = 0;
    }

    const start = [
      Math.random() * ctx.canvas.width,
      ctx.canvas.height
    ]
    
    const startFire = () => {
      for (let i = 0; i < 10; i++) {
        const options = [
          start[0],
          start[1],
          (Math.random() * 2 * speed - speed) / 2,
          0 - Math.random() * 2 * speed
        ]
        
        let p = new Particle(...options);
        particles.push(p);
      }
        
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
      for (let i = 0; i < particles.length; i++) {
        ctx.fillStyle = "rgba(" + (260 - (particles[i].life * 2)) + "," + 
          ((particles[i].life * 2) + 50) + "," + (particles[i].life * 2) + 
          "," + (((max - particles[i].life) / max) * 0.4) + ")";
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, 
          (max-particles[i].life)/max*(size/2)+(size/2), 0, 2*Math.PI);
        ctx.fill();
        particles[i].x += particles[i].dx;
        particles[i].y += particles[i].dy;
        
        particles[i].life++;
        
        if (particles[i].life >= max) {
          particles.splice(i, 1);
          i--;
        }
      }
      if (Date.now() < time + 1500) {
        requestAnimationFrame(startFire)
      } else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    }

    startFire();
  }
  
  render() {

    return (
      <div className='canvas'>
        <canvas ref='canvas' width='0' height='0' />
      </div>
    );
  }
}

export default Canvas;
