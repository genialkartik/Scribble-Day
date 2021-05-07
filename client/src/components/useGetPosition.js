import { useEffect, useState } from 'react';
import useWindowDimensions from './dimension';

export function getFontSize(fontsize, width){
  if(typeof(fontsize)==='string'){
    fontsize = parseFloat(fontsize.slice(0,-2))*16;
  }
  const getWidthPercen = ((100*width)/616);
  const newSize = ((fontsize*getWidthPercen)/100);
  if(newSize>fontsize){
    return fontsize;
  }else{
    return newSize;
  }
}

export function getConstantLeft(xHelperConstant, width){
  return ((0.0001864*width)+xHelperConstant);
} 

export function getLeft(xHelperConstant, width){
  return (width*getConstantLeft(xHelperConstant,width));
}

export function getConstantTop(yHelperConstant, height){
  return ((0.0002864*height)+yHelperConstant);
}

export function getTop(yHelperConstant, height){
  return (height*getConstantTop(yHelperConstant,height));
}

export default function useGetPosition(rootRef, selfRef){

  const { width: windowWidth } = useWindowDimensions();
  const [rootDimensions, setRootDimensions] = useState(null);
  const [selfDimensions, setSelfDimensions] = useState(null);

  useEffect(()=>{
    setRootDimensions(rootRef.current.getBoundingClientRect());
    setSelfDimensions(selfRef.current.getBoundingClientRect());
  },[windowWidth])

  function getXHelperConstant(){
    const rootWidth = rootDimensions ? rootDimensions.width : 0 ;
    const rootX = rootDimensions ? rootDimensions.x : 0;
    const selfX = selfDimensions ? selfDimensions.x : 0;
    return (((selfX - rootX)/rootWidth)-(0.0001864*rootWidth));
  }

  function getYHelperConstant(){
    const rootHeight = rootDimensions ? rootDimensions.height : 0;
    const rootY = rootDimensions ? rootDimensions.y : 0;
    const selfY = selfDimensions ? selfDimensions.y : 0;
    return (((selfY - rootY)/rootHeight)-(0.0002864*rootHeight));
  }

  function getValue(rootStart, selfStart, rootDim){
    return ((100/rootDim)*(selfStart - rootStart));
  }

  return {
    xHelperConstant: getXHelperConstant(), yHelperConstant: getYHelperConstant(),
    left: getValue(rootDimensions.x, selfDimensions.x, rootDimensions.width)
  }

}