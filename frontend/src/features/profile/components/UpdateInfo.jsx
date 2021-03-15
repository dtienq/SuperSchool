import React from 'react';
import { Input, Form, Button } from '@features/auth/base/components';
import { useForm } from 'react-hook-form';
import { REGEX_EMAIL } from '@constants';
import * as Yup from 'yup';
const { FormItem } = Form;

const UpdateInfoEndValSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Tên người dùng có ít nhất 3 ký tự')
    .required('Trường mật khẩu không thể bỏ trống'),
  email: Yup.string()
    .matches(REGEX_EMAIL, {
      message: 'Vui lòng nhập đúng định dạng email',
      excludeEmptyString: true,
    })
    .required('Trường email không thể bỏ trống'),
});

function UpdateInfo() {
  const { handleSubmit, control, errors } = useForm({
    validationSchema: UpdateInfoEndValSchema,
  });
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className="content-panel">
      <h1 className="title mb-5">Cập nhật thông tin cá nhân</h1>
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <fieldset className="fieldset">
          <div className="form-group">
            <div className="col-md-10 col-sm-9 col-xs-12 mb-5">
              <FormItem
                as={<Input />}
                label="Họ tên"
                name="username"
                control={control}
                error={errors.username?.message}
                defaultValue=""
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-10 col-sm-9 col-xs-12">
              <FormItem
                as={<Input />}
                label="Email"
                name="email"
                control={control}
                error={errors.email?.message}
                defaultValue=""
              />
            </div>
          </div>
        </fieldset>
        <hr />
        <div className="form-group">
          <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
            <Button htmlType="submit">Cập nhật</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateInfo;
