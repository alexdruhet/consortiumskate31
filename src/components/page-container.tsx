import React, { FunctionComponent, ReactNode, PropsWithChildren } from 'react'

interface PropsType {
  children?: any;
  tag?: keyof JSX.IntrinsicElements;
}

//const PageContainer: FunctionComponent = ({ children, tag = 'div' }: PropsWithChildren<PropsType>) => {
//const PageContainer: FunctionComponent = ({ children, tag = 'div' }: PropsType) => {
const PageContainer: FunctionComponent<PropsType> = ({ children, tag = 'div' }: PropsType) => {
  const Tag = tag

  return (
    <Tag className="page-container">
      {children}
    </Tag>
  )
}

export default PageContainer
