import React from "react";
import { Link } from "react-router-dom";

export const CardItem = ({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
  link,
}) => {
  return (
  <div className="card">
  {imgSrc && (
    <figure>
      <img src={imgSrc} alt={imgAlt} />
    </figure>
  )}
  <div className="px-4 py-6">
    {title && <h2 className="text-xl text-[#12486B] font-extrabold mb-4">{title}</h2>}
    {description && <p className="text-[#00704A] text-lg font-bold">{description}</p>}
    {buttonText && link && (
      <div className="flex justify-center mt-6">
        <Link to={link}>
          <button className="btn font-bold bg-[#2563eb] text-white hover:bg-blue-500 btn-wide">{buttonText}</button>
        </Link>
      </div>
    )}
  </div>
</div>
 );
};
