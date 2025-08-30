import type { FC } from "react";
import { Link } from "react-router";

interface Props {
  subTitle?: string;
}

export const CustomLogo: FC<Props> = ({ subTitle = "Shop" }) => {
  return (
    <Link to={"/"} className="flex items-center whitespace-nowrap">
      <span className="font-montserrat font-bold text-xl m-0 whitespace-nowrap">
        Teslo |
      </span>
      <p className="text-muted-foreground m-0 px-2 whitespace-nowrap">
        {subTitle}
      </p>
    </Link>
  );
};
