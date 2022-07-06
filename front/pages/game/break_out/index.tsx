import React, {useEffect, useRef} from 'react'
import MainContainer from "../../../containers/MainContainer";
import {BallMovement} from "../../../components/game/BallMovement";
import data from '../../../lib/game/break_out/data'

const BreakOut = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx: any = canvas.getContext("2d")

        let {ballObj } = data
        
        ctx.clearRect(0,0, canvas.width, canvas.height)

        BallMovement(ctx, ballObj)
      }

      requestAnimationFrame(render)
    }
    render()

  }, [])

  return(
    <>
      <MainContainer>
        asdasd
      </MainContainer>
    </>
  )
}

export default BreakOut