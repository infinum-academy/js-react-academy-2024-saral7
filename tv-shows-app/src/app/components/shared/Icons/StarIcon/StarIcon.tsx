import { Icon } from "@chakra-ui/react";
import { CheckCircleIcon} from '@chakra-ui/icons';
import { Fragment, useState } from "react";

export interface IStar {
   selected: boolean
}

export interface IStarProps {
   star: IStar
   onChange: (star : IStar) => void;
}


const urls = ['/images/star-white.png', 'images/star-yellow.png'];

export default function StarIcon({star, onChange} : IStarProps) {
   const imgUrl = (star.selected) ? urls[1] : urls[0];
   
   return <div>
         <img width={'32px'} src = {imgUrl} onClick={() => onChange(star)}/>
      </div>
}