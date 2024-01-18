import { useState } from "react";

import { Button, Form, Input, Select } from "antd";
import { SmileFilled, UserOutlined } from "@ant-design/icons";

import "./index.css";

function App() {
  const [loding, setLoading] = useState(false);

  const onButton = () => {
    console.log("onButton");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const fruits = ["apple", "banana", "orange", "strawberry"];
  return (
    <div className=" bg-violet-200 p-20  flex items-start flex-wrap gap-5">
        <Button
          icon={<SmileFilled className="text-violet-200" />}
          className="my-button w-32"
          loading={loding}
          onClick={onButton}
          type="primary"
        >
          click me
        </Button>
        <Input.Password
          className="w-72"
          disabled={false}
          allowClear
          prefix={<UserOutlined className="text-cyan-300" />}
          maxLength={10}
          type="password"
          placeholder="search"
        />
        <Select allowClear={false} maxTagCount={1} mode="multiple" placeholder="select fruits  " className="w-44">
          {fruits.map((fruit, idx) => {
            return (
              <Select.Option value={fruit} key={fruit}>
                {fruit}
              </Select.Option>
            );
          })}
        </Select>

        <Form>
          
        </Form>

    </div>
  );
}

export default App;
