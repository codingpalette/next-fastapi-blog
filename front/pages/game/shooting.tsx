import React, {useEffect, useRef} from 'react'
import MainContainer from "../../containers/MainContainer";

const Shooting = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    start()
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');

    };
  }, [])

  const start = () => {
    const canvas: HTMLCanvasElement | null = canvasRef.current
    // canvas.width = innerWidth
    if (canvas) {
      const c: any = canvas.getContext('2d')

      class Player {
        private x: any;
        private y: any;
        private radius: any;
        private color: any;

        constructor(x:any, y: any, radius: any, color: any) {
          this.x = x
          this.y = y
          this.radius = radius
          this.color = color
        }

        draw() {
          c.beginPath()
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
          c.fillStyle = this.color
          c.fill()
        }
      }

      class Projectile {
        private x: any;
        private y: any;
        private radius: any;
        private color: any;

        constructor(x:any, y: any, radius: any, color: any, velocity: any) {
          this.x = x
          this.y = y
          this.radius = radius
          this.color = color
        }

        draw() {
          c.beginPath()
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
          c.fillStyle = this.color
          c.fill()
        }
      }

      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const player = new Player(x, y, 30, 'blue')
      player.draw()


    }
  }
  


  return(
    <>
      <MainContainer>
        <canvas id="canvas" ref={canvasRef} width="750px" height="500px" />
      </MainContainer>
    </>
  )
}

export default Shooting