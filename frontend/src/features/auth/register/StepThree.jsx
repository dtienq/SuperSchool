import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Row, Col, Spin } from 'antd';
import { Input, Form, Button } from '@features/auth/base/components';
import { RegisterStepThreeValidationSchema } from '@features/auth/base/yup';
import userApi from '@api/userApi';

const { FormItem } = Form;

const SPadding = styled.div`
  padding-top: ${(props) => props.size};
`;
const SButton = styled(Button)`
  font-weight: bold;
  border-radius: 6px;
  border: none;
  width: 99.8%;
  margin-left: 1px;
  height: 44px;
  color: #ffffff;
  @media (max-width: 414px) {
    padding-top: ${(<SPadding />)};
  }
`;

function StepThree({ onChangeTitle, currentEmail }) {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, errors, control } = useForm({
    validationSchema: RegisterStepThreeValidationSchema,
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const dataToSend = {
      username: data?.username,
      password: data?.password,
      email: currentEmail,
    };
    try {
      const res = await userApi.register(dataToSend);
      if (res.status) {
        localStorage.setItem('token', res?.access_token);
        localStorage.setItem('refresh_token', res?.refresh_token);
        window.location.href = '/';
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    onChangeTitle('Đăng ký thông tin người dùng');
  }, [onChangeTitle]);
  return (
    <Spin spinning={loading}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row style={{ maxWidth: 400 }} className="mx-auto">
          <Col className="w-100">
            <SPadding size="30px" />
            <FormItem
              as={<Input />}
              label="Tên người dùng"
              name="username"
              control={control}
              error={errors.username?.message}
              defaultValue=""
            />
            <SPadding size="30px" />
            <FormItem
              as={<Input.Password />}
              label="Mật khẩu"
              name="password"
              control={control}
              error={errors.password?.message}
              defaultValue=""
            />
            <SPadding size="30px" />
            <FormItem
              as={<Input.Password />}
              label="Nhập lại mật khẩu"
              name="repassword"
              control={control}
              error={errors.repassword?.message}
              defaultValue=""
            />
            <SPadding size="30px" />
            <SButton htmlType="submit" block>
              Hoàn thành
            </SButton>
            <SPadding size="32px" />
          </Col>
        </Row>
      </form>
    </Spin>
  );
}

export default StepThree;
