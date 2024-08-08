import { Text as PdfText } from '@react-pdf/renderer'
import React, { FC } from 'react'
import compose from '../styles/compose.ts'

interface Props {
  className?: string
  pdfMode?: boolean
  children?: string
}

const Text: FC<Props> = ({ className, pdfMode, children }) => {
  return (
    <>
      {pdfMode ? (
        <PdfText style={compose('span ' + (className ? className : ''))}>{children}</PdfText>
      ) : (
        <span className={'span ' + (className ? className : '')}>{children}</span>
      )}
    </>
  )
}

export default Text
