import React from "react";
import { Progress } from "antd";

function ProgressDemo() {
  return (
    <div>
      <Progress percent={50} />
      <Progress type="circle" percent={75} />
      <Progress type="dashboard" percent={30} />
    </div>
  );
}

export default ProgressDemo;