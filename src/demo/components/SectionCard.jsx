import React from "react";

const SectionCard = ({
  title,
  children,
  headerClassName = "bg-primary",
  textClassName = "text-white",
  animate = true,
}) => {
  return (
    <div className="row justify-content-center mb-5">
      <div className="col-md-10 col-lg-8">
        <div className={`card shadow ${animate ? "animate-on-scroll" : ""}`}>
          <div className={`card-header ${headerClassName} ${textClassName}`}>
            <h2 className="h4 mb-0">{title}</h2>
          </div>
          <div className="card-body p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
