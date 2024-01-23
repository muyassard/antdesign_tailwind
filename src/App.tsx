import { useState } from "react";

import { Checkbox, Button, DatePicker, Form, Input, Progress, Select, Spin, Table, TimePicker } from "antd";
import { SmileFilled, UserOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

import "./index.css";

function App() {
  const columnData = [
    {
      key: "1",
      title: "Id",
      dataIndex: "id"
    },
    {
      key: "2",
      title: "User id",
      dataIndex: "userId",
      sorter: (record1: any, record2: any) => {
        return record1.userId - record2.userId;
      }
    },
    {
      key: "3",
      title: "Status",
      dataIndex: "completed",
      render: (completed: boolean) => {
        return <p>{completed ? "completed" : "in progress"}</p>;
      },
      filters: [
        { text: "completed", value: true },
        { text: "in progress", value: false }
      ],
      onFilter: (value: any, record: any) => {
        return record.completed === value;
      }
    }
  ];
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState<boolean>(true);

  fetch("https://jsonplaceholder.typicode.com/todos/")
    .then(res => res.json())
    .then(data => {
      setdataSource(data);
    })
    .catch()
    .finally(() => {
      setloading(false);
    });

  const [textLoading, settextLoading] = useState<boolean>(false);
  const [spin, setSpin] = useState<boolean>(true);
  const [percent, setPercent] = useState<number>(0);

  const increase = () => {
    setPercent(prevPercent => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };

  const decline = () => {
    setPercent(prevPercent => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };

  const onButton = () => {
    settextLoading(true);
    setTimeout(() => {
      settextLoading(false);
      setSpin(preValue => !preValue);
    }, 1000);
  };
  const strokeColor = { "0%": "#108ee9", "50%": "#87d068", "100%": "#108ee9" };

  const fruits = ["apple", "banana", "orange", "strawberry"];
  return (
    <div className="bg-violet-200 p-20 gap-10 grid grid-cols-3">
      <div className=" flex flex-col gap-10">
        <div className="data flex flex-col gap-5">
          <DatePicker picker="month" />
          <DatePicker.RangePicker />
          <TimePicker />
          <TimePicker.RangePicker />
        </div>

        <div className="spin flex flex-col gap-2">
          <Spin spinning={spin}>
            <div className=" text-lg p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta suscipit doloribus veniam
            </div>
          </Spin>
          <Button
            block
            icon={<SmileFilled className="text-violet-200" />}
            className="my-button w-32"
            loading={textLoading}
            onClick={onButton}
            type="primary"
          >
            click me
          </Button>
        </div>

        <div className="progress  flex flex-col items-center gap-2">
          <Progress percent={percent} status={percent === 0 ? "exception" : percent === 100 ? "success" : "active"} />
          <Progress
            type="circle"
            strokeColor={strokeColor}
            status={percent === 0 ? "exception" : percent === 100 ? "success" : "active"}
            percent={percent}
          />
          <Button.Group>
            <Button onClick={decline} icon={<MinusOutlined />} />
            <Button onClick={increase} icon={<PlusOutlined />} />
          </Button.Group>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <Input.Password
          className="w-full"
          disabled={false}
          allowClear
          prefix={<UserOutlined className="text-cyan-300" />}
          maxLength={10}
          type="password"
          placeholder="password"
        />
        <Select allowClear={false} maxTagCount={1} mode="multiple" placeholder="select fruits">
          {fruits.map((fruit, idx) => {
            return (
              <Select.Option value={fruit} key={fruit}>
                {fruit}
              </Select.Option>
            );
          })}
        </Select>
        <div className="form bg-indigo-300 p-5 rounded-lg">
          <Form
            autoComplete="off"
            labelCol={{ span: 10 }}
            onFinish={value => {
              console.log(value);
            }}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Enter your name",
                  min: 3,
                  whitespace: true
                }
              ]}
              hasFeedback
              label="Enter username"
              name="Username"
            >
              <Input placeholder="Enter username" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Enter your email",
                  whitespace: true,
                  type: "email"
                }
              ]}
              hasFeedback
              label="Enter email"
              name="email"
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Enter your birth date"
                }
              ]}
              hasFeedback
              label="Enter birthday"
              name="birthday"
            >
              <DatePicker placeholder="select birthday" className="w-full" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Enter your password",
                  whitespace: true,
                  min: 6
                }
              ]}
              hasFeedback
              dependencies={["password"]}
              label="Enter password"
              name="password"
            >
              <Input.Password placeholder="Enter password" maxLength={10} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Enter your confirm password",
                  whitespace: true,
                  min: 6
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("the two passwords that you entered does not match");
                  }
                })
              ]}
              hasFeedback
              dependencies={["password"]}
              label="Enter confirm password"
              name="confirmPassword"
            >
              <Input.Password placeholder="Enter confirm  password" maxLength={10} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  type: "url",
                  message: "please enter a valid url"
                }
              ]}
              hasFeedback
              label="Enter website url"
              name="websiteUrl"
            >
              <Input placeholder="Enter website url" />
            </Form.Item>
            <Form.Item>
              <Button className="bg-indigo-600 font-bold tracking-widest	" block type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="">
        <Table
          loading={loading}
          pagination={{ pageSize: 5 }}
          className="rounded-lg w-80"
          dataSource={dataSource}
          columns={columnData}
        ></Table>
      </div>
    </div>
  );
}

export default App;
