'use client'
import React from "react";


interface ColorFromHexcodeProps {
  color: string;
}

export default function ColorFromHexcode({ color }: ColorFromHexcodeProps) {
 
  return (<div className="w-12 h-12 rounded-md border border-neutral-300 cursor-pointer overflow-hidden" style={{backgroundColor: color}}></div>
  )
}