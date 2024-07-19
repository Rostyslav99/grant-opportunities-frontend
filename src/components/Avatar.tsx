import {FC} from "react";
import classnames from 'classnames';

interface AvatarProps {
  size: "S" | "L";
  name: string;
}

export const Avatar: FC<AvatarProps> = ({ size,  name}) => {

  return <div className={classnames("bg-gray-300 text-orange-500 font-bold rounded-full flex justify-center items-center", {
    "text-lg h-10 w-10": size === "L",
    "text-md h-6 w-6": size === "S",
  })}>
    {name.slice(0, 1)}
  </div>
};
