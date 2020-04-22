import React from 'react'

export default function VideoInfo(props) {
  const { title, description } = props

  return (
    <div>
      <h1 className="h4">{title}</h1>
      <p className="text-muted mt-4">{description}</p>
    </div>
  )
}
