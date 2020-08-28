import React, { useRef, useState, useEffect } from 'react';

const Canvas = props => {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    let particleArr;

    // Constructor for particles
    function Particle(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    useEffect(() => {
        if (canvasRef.current) {
            const renderCtx = canvasRef.current.getContext('2d');

            if (renderCtx) {
                setContext(renderCtx);
            }
        }

        if (context) {
            Particle.prototype.draw = function () {
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                context.fillStyle = this.color;
                context.fill();
            }

            const test = new Particle(10, 10, 1, 1, 20, 'white');
            test.draw()
        }
    }, [context])


    // Constructor Function for Particles
    return (
        <div className="canvas-container">
            <canvas
                id="canvas"
                ref={canvasRef}
                width={500}
                height={500}
                style={{
                    border: '2px solid #000',
                    marginTop: 10,
                }}
            ></canvas>
        </div>
    )
}

export default Canvas;